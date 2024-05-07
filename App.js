import React, {useState} from 'react'; 
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

export default function App() {
const [selectedImage, setSelectedImage] = useState(null)

let openImagePickerAsync = async () => {
  let permisionResult = await ImagePicker.requestCameraPermissionsAsync();
  if (permisionResult.granted === false) {
    alert( "permission to access camera is required");

    return;
  } 
  const pickerResult = await ImagePicker.launchImageLibraryAsync();
  if(pickerResult.canceled === true) {
    return;
  }
  setSelectedImage({ localurli: pickerResult.assets[0].uri } );
};
const openShareDialog = async ( ) => {
  if (!(await Sharing.isAvailableAsync())) {
    alert ('Sharing is not available on your plattfrom');
    return
  }
  await Sharing.shareAsync(selectedImage.localurli);
};

  return (
    <View style = {style.container}>
      {Platform.OS === "web" ? (
        <Text style={style.title}> not supported for plattfrom :)</Text>
      ) :(
        <>
          <Text style={style.title}> Pick an image </Text>
          <TouchableOpacity onPress={openImagePickerAsync}>
            <Image
              style={style.Image}
              source={{
                uri:
                selectedImage !== null
                ? selectedImage.localurli
                : "https://picsum.photos/200/200",
              }}/>
          </TouchableOpacity>
        </>
      )}
      {selectedImage ? (
          <TouchableOpacity onPress={openShareDialog} style={style.button}>
            <Text style={style.buttoText}>share this image</Text>
          </TouchableOpacity>

        ) : (
          <View/>
        )}
    </View>
  );
};

const style = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor : "pink",
  },
  Image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  title: {
    padding: 10,
    margin: 15,
    backgroundColor: "#ce93d8",
    borderRadius: 10 ,
  },
  button: {
    margin: 15,
   padding: 10,
   backgroundColor: "#ce93d8",
   borderRadius: 10, 
  }
   
})