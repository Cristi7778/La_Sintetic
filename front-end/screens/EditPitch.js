import { useState } from 'react';
import {SafeAreaView, Text,TextInput, View,Button, Alert,Image,StyleSheet, ScrollView} from 'react-native';
import ip from '../global/ip';
import LocationPicker from '../components/LocationPicker';
import { AwsOptions } from "../global/aws";
import { RNS3 } from "react-native-aws3";
import UploadImageModal from '../components/UploadImageModal';
import getDistance from '../components/DistanceCalculator';
import RecommandationModal from '../components/RecommandationModal';
export default function EditPitch({navigation,route}) {
  const [item, setItem] = useState(route.params.item);
  const [name, setName] = useState(item.name);
  const [location, setLocation] = useState(item.location);
  const [rate, setRate] = useState(item.rate);
  const [description, setDescription] = useState(item.description);
  const [latitude,setLatitude]=useState(item.latitude);
  const [longitude,setLongitude]=useState(item.longitude);
  const [image,setImage]=useState(item.imageLink);
  const [modalOpen,setModalOpen]=useState(false);
  const [recommandationModal,setRecommandationModal]=useState(false);
  return (
    <ScrollView>
    <SafeAreaView>
      <View style={styles.label}>
        <Text style={styles.text}>Name:</Text>
        <TextInput name="Name" label='Name' placeholder="Pitch Name" defaultValue={item.name} onChangeText={(value)=>setName(value)}/>
      </View>
      <View style={styles.label}>
        <Text style={styles.text}>Location:</Text>
        <TextInput name="Location" placeholder="Pitch Location" defaultValue={item.location} onChangeText={(value)=>setLocation(value)}/>
      </View>
      <View style={styles.label}>
        <Text style={styles.text}>Rate:</Text>
        <TextInput name="Rate"  placeholder="Pitch Rate" defaultValue={item.rate.toString()} keyboardType='numeric' onChangeText={(value)=>setRate(value)}/>
      </View>
      <View style={styles.label}>
        <Text style={styles.text}>Description:</Text>
        <TextInput name="Description" placeholder="Pitch Description" defaultValue={item.description} onChangeText={(value)=>setDescription(value)}/>
      </View>
      <View style={styles.button}>
      <Button
      color="teal"
      title='Select Picture'
      onPress={()=>{setModalOpen(true)}}/>
      </View>
      <LocationPicker lat={latitude} long={longitude} setLat={setLatitude} setLong={setLongitude}/>
      <View style={styles.button}>
        <Button
        color="teal"
        title='Get price recommandation'
        onPress={()=>{
         setRecommandationModal(true);
        }}/>
      </View>
      <View style={styles.button}>
        <Button color="red" title="Cancel" onPress={()=>{
          navigation.pop();
         }}/>
      </View>
      <UploadImageModal modalOpen={modalOpen} setModalOpen={setModalOpen} setImage={setImage}/>
      <RecommandationModal recommandationModal={recommandationModal} distance={getDistance(latitude,longitude,44.43574915559583, 26.10172023823842)} setRecommandationModal={setRecommandationModal}/>
      <View style={styles.button}>
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
                      uri:image,
                      name:'imagine'+item.name,
                      type:'image/png'
                    }
                    imageLink='';
                    await RNS3.put(file,AwsOptions).then((response)=>{
                      imageLink=response.body.postResponse.location;
                    });
                    item.imageLink=imageLink;
                    if(route.params.action==="EDIT"){
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
      </View>
    </SafeAreaView>
    </ScrollView>
  );
}
const styles=StyleSheet.create({
  button:{
      marginVertical:4,
      marginHorizontal:50,
  },
  label:{
    flexDirection: 'row',
  },
  text:{
    fontWeight:'bold',
    fontSize:16,
    margin:3
  }
})