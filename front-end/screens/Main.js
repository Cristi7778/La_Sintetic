import {SafeAreaView,FlatList,TouchableOpacity,Text } from 'react-native';
import PitchCard from '../components/PitchCard';
import { useState,useEffect } from 'react';
import ip from '../global/ip';

export default function Main({navigation}) {

  const [pitches, setPitches] = useState([
    { name: 'PRO-SPORT FOTBAL', location: 'DTR1', rate:200},
    { name: 'ACS NEW TEAM', location: 'DTR2', rate: 200},
    { name: 'TEREN GORJULUI', location: 'DTR3', rate: 200},
  ]);

  const getPitches = async () => {
    try {
      const response = await fetch(
        `${ip}:8080/pitches`,
       
      );
      const json = await response.json();
      if(response.status===200){
        setPitches(json.records);
        
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
useEffect(() => {
  navigation.setOptions({
    drawerItemStyle: { display: 'auto' }
  });
}, [navigation]);
  return (
    <SafeAreaView >
      <FlatList data={pitches} renderItem={({ item }) => (
        <TouchableOpacity onPress={() =>{navigation.navigate("AddReservation",{item});}}>
          <PitchCard item={item} />
        </TouchableOpacity>
      )} />
    </SafeAreaView>
  );
}