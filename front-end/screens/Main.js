import {SafeAreaView,FlatList,TouchableOpacity,Text,StyleSheet } from 'react-native';
import PitchCard from '../components/PitchCard';
import { useState,useEffect } from 'react';
import ip from '../global/ip';
import RNPickerSelect from 'react-native-picker-select';
export default function Main({navigation}) {

  const [pitches, setPitches] = useState([
    { name: 'PRO-SPORT FOTBAL', location: 'DTR1', rate:200},
    { name: 'ACS NEW TEAM', location: 'DTR2', rate: 200},
    { name: 'TEREN GORJULUI', location: 'DTR3', rate: 200},
  ]);
  const sortChange = (value)=>{
    console.log(value)
    console.log(pitches)
    if(value=='rating'){
      sortedPitches = [...pitches].sort((a, b) => b.rating - a.rating);
     
    }
    if(value=='price'){
      sortedPitches = [...pitches].sort((a, b) => a.rate - b.rate);
    }
    setPitches(sortedPitches);
    console.log(pitches);
  }
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
},[] );
useEffect(() => {
  navigation.setOptions({
    drawerItemStyle: { display: 'auto' }
  });
}, [navigation]);
  return (
    <SafeAreaView >
      <RNPickerSelect
          onValueChange={(value) => sortChange(value)}
          title='Sort by'
          items={[
            { label: 'Price', value: 'price' },
            { label: 'Rating', value: 'rating' },
        ]}
        style={pickerSelectStyles}
        placeholder={{
          label: 'Select a sorting option...',
          value: null,
          color: '#9EA0A4', // Placeholder text color
        }}
      />
      <FlatList data={pitches} renderItem={({ item }) => (
        <TouchableOpacity onPress={() =>{navigation.navigate("AddReservation",{item});}}>
          <PitchCard item={item} />
        </TouchableOpacity>
      )} />
    </SafeAreaView>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, 
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, 
  },
});