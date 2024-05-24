import { useState } from 'react';
import {SafeAreaView, Text,TextInput, View,Button, Alert,Image} from 'react-native';
import ip from '../global/ip';
import LocationPicker from '../components/LocationPicker';
import { AwsOptions } from "../global/aws";
import { RNS3 } from "react-native-aws3";
import UploadImageModal from '../components/UploadImageModal';
import {globalStyles} from '../global/globalStyles';
export default function EditPitch({navigation,route}) {
  const [item, setItem] = useState(route.params.item);
  const [name, setName] = useState(item.name);
  const [location, setLocation] = useState(item.location);
  const [rate, setRate] = useState(item.rate);
  const [description, setDescription] = useState(item.description);
  const [latitude,setLatitude]=useState(item.latitude);
  const [longitude,setLongitude]=useState(item.longitude);
  const [image,setImage]=useState('');
  const [modalOpen,setModalOpen]=useState(false);
  
  return (
    <SafeAreaView>
      <TextInput name="Name"  placeholder="Pitch Name" defaultValue={item.name} onChangeText={(value)=>setName(value)}/>
      <TextInput name="Location" placeholder="Pitch Location" defaultValue={item.location} onChangeText={(value)=>setLocation(value)}/>
      <TextInput name="Rate"  placeholder="Pitch Rate" defaultValue={item.rate.toString()} keyboardType='numeric' onChangeText={(value)=>setRate(value)}/>
      <TextInput name="Description" placeholder="Pitch Description" defaultValue={item.description} onChangeText={(value)=>setDescription(value)}/>
      <Button
      title='Select Picture'
      onPress={()=>{setModalOpen(true)}}/>
      <LocationPicker lat={latitude} long={longitude} setLat={setLatitude} setLong={setLongitude}/>
      <Button color="red" title="Cancel" onPress={()=>{
        navigation.pop();
      }}/>
      <UploadImageModal modalOpen={modalOpen} setModalOpen={setModalOpen} setImage={setImage}/>
     
      <Button color="green" title="Save" onPress={async()=>{
          if (name.length>0)
          {   item.name=name;
              if(location.length>0){
                item.location=location;
                if(rate.length>0 || rate>0){
                  item.rate=rate;
                  if(description.length>0){
                    item.description=description;
                    console.log(item);
                    console.log(route.params);
                    item.longitude=longitude;
                    item.latitude=latitude;
                    item.inside=false;
                    const file={
                      //uri:result.assets[0].uri,
                      uri:image,
                      name:'imagine'+Math.floor(Math.random() * (100000  + 1)).toString(),
                      type:'image/png'
                    }
                    imageLink='';
                    await RNS3.put(file,AwsOptions).then((response)=>{
                      console.log(response);
                      imageLink=response.body.postResponse.location;
                    });
                    item.imageLink=imageLink;
                    if(route.params.action==="EDIT"){
                      console.log(item);
                      fetch(`${ip}:8080/pitches/${item.id}`, {method: "PUT",body: JSON.stringify(item),headers: 
                      {"Content-type": "application/json; charset=UTF-8"}});
                    }
                    else{
                      if(route.params.action==="ADD"){
                        fetch(`${ip}:8080/pitches/`, {method: "POST",body: JSON.stringify(item),headers: 
                        {"Content-type": "application/json; charset=UTF-8"}});
                      }
                    }
                    navigation.pop();
                  }
                  else{
                    Alert.alert('Edit error', 'Description is not valid.' [{text: 'OK'}]);
                  }              
                }
                else{
                  Alert.alert('Edit error', 'Rate is not valid.' [{text: 'OK'}]);
                }
              }
              else{
                Alert.alert('Edit error', 'Location is not valid.' [{text: 'OK'}]);
              }

          }
          else{
            Alert.alert('Edit error', 'Name is not valid.' [{text: 'OK'}]);
          }
      }
      }/>
    </SafeAreaView>
  );
}