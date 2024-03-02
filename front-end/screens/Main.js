import {SafeAreaView,FlatList,TouchableOpacity,Text } from 'react-native';
import PitchCard from '../components/PitchCard';
import { useState } from 'react';

export default function Main({navigation}) {

  const [pitches, setPitches] = useState([
    { name: 'PRO-SPORT FOTBAL', location: 'DTR1', rate:200},
    { name: 'ACS NEW TEAM', location: 'DTR2', rate: 200},
    { name: 'TEREN GORJULUI', location: 'DTR3', rate: 200},
  ]);

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