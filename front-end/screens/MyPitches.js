import {SafeAreaView,FlatList,TouchableOpacity,View,StyleSheet, Alert,Button } from 'react-native';
import PitchCard from '../components/PitchCard';
import { useState,useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import ip from '../global/ip';

export default function MyPitches({navigation,route}) {

  const [pitches, setPitches] = useState([
    { name: 'PRO-SPORT FOTBAL', location: 'DTR1', rate:200,latitude:45,longitutde:26},
    { name: 'ACS NEW TEAM', location: 'DTR2', rate: 200,latitude:45,longitutde:26},
    { name: 'TEREN GORJULUI', location: 'DTR3', rate: 200,latitude:45,longitutde:26},
  ]);

  const getPitches = async () => {
    try {
      const response = await fetch(
        `${ip}:8080/pitches`,
       
      );
      const json = await response.json();
      if(response.status===200){
       const filteredPitches = json.records.filter(entry => entry.ManagerUsername ===route.params.user);
       setPitches(filteredPitches);
      }
      else{
        if(response.status===404){
          console.log("Pitches not found");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
useEffect(() => {
  getPitches();
}, );
  return (
    <SafeAreaView >
      <Button color="green" title="Add Pitch" onPress={()=>{navigation.navigate("Edit Pitch",{item:{"ManagerUsername":route.params.user, "description": "", "imageLink": "", "location": "", "name": "", "rate": "","latitude":44.439663,"longitude":44.439663},action:'ADD'});}}/>
      <FlatList data={pitches} renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <PitchCard  item={item} />
          <TouchableOpacity onPress={() =>{
            console.log(item);
            navigation.navigate("Edit Pitch",{item,action:"EDIT"});}}>
            <MaterialIcons style={styles.icon} name="edit-note" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> Alert.alert('Confirm deletion', `Are you sure you want to delete this pitch?`,
           [{text: 'YES', onPress: () => fetch(`${ip}:8080/pitches/${item.id}`, {method: "DELETE",headers: 
           {"Content-type": "application/json; charset=UTF-8"}})},
            {text:'NO'}])}>
            <AntDesign style={styles.icon} name="delete" size={30} color="black" />
          </TouchableOpacity>
        </View>
      )} />
    </SafeAreaView>
  );
}

const styles=StyleSheet.create(
  { 
    itemContainer: {
    flex:1,
    flexDirection:'row',
    
  },

    icon:{
      padding:20,
      textAlign:'center',
      justifyContent:'center',
    },
  
});