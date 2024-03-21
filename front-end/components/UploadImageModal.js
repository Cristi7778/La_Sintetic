import { Modal, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import { globalStyles } from '../global/globalStyles';


export default function UploadImageModal({modalOpen,setImage,setModalOpen}){
    const uploadImage= async(mode)=>{
        try{
          let result={};
          if(mode==='gallery'){
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            result=await ImagePicker.launchImageLibraryAsync({
              mediaTypes:ImagePicker.MediaTypeOptions.Images,
              allowsEditing:true,
              quality:1
            });
          }
          else{
            await ImagePicker.requestCameraPermissionsAsync();
            result=await ImagePicker.launchCameraAsync({cameraType:ImagePicker.CameraType.back,allowsEditing:true,quality:1});
            
          }
          if(!result.canceled){
            await saveImage(result.assets[0].uri);
          }
        }
        catch(error){
          console.log(error);
        }
      }
      const saveImage=async(image)=>{
        try{
          setImage(image);
          setModalOpen(false);
        }
        catch(error){
          console.log(error);
        }
      }
    return (
        <View>
            <Modal visible={modalOpen}>
                <View>
                    <TouchableOpacity onPress={uploadImage}>
                        <MaterialIcons name="camera-alt" size={40} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{uploadImage("gallery")}}>
                        
                        <MaterialIcons name="attach-file" size={40} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setModalOpen(false)}}>
                        <MaterialIcons name="cancel" size={40} color="black" />
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}