import { useState } from 'react';
import {SafeAreaView, Text,TextInput, View,Button, Alert} from 'react-native';


export default function EditPitch({navigation,route}) {
  const [item, setItem] = useState(route.params.item);
  const [name, setName] = useState(item.name);
  const [location, setLocation] = useState(item.location);
  const [rate, setRate] = useState(item.rate);
  const [description, setDescription] = useState(item.description);
  return (
    <SafeAreaView >
      <TextInput name="Name"  defaultValue={item.name} onChangeText={(value)=>setName(value)}/>
      <TextInput name="Location"  defaultValue={item.location} onChangeText={(value)=>setLocation(value)}/>
      <TextInput name="Rate"  defaultValue={item.rate.toString()} keyboardType='numeric' onChangeText={(value)=>setRate(value)}/>
      <TextInput name="Description"  defaultValue={item.description} onChangeText={(value)=>setDescription(value)}/>
      <Button color="red" title="Cancel" onPress={()=>{
        navigation.pop();
      }}/>
      <Button color="green" title="Save" onPress={()=>{
          if (name.length>0)
          {   item.name=name;
              if(location.length>0){
                item.location=location;
                if(rate.length>0 || rate>0){
                  item.rate=rate;
                  if(description.length>0){
                    item.description=description;
                    console.log(item);
                    fetch(`http://192.168.0.101:8080/pitches/${item.id}`, {method: "PUT",body: JSON.stringify(item),headers: 
                    {"Content-type": "application/json; charset=UTF-8"}});
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