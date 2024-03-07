import {SafeAreaView,FlatList,TouchableOpacity,View,StyleSheet } from 'react-native';
import PitchCard from '../components/PitchCard';
import { useState,useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function MyPitches({navigation,route}) {

  const [pitches, setPitches] = useState([
    { name: 'PRO-SPORT FOTBAL', location: 'DTR1', rate:200},
    { name: 'ACS NEW TEAM', location: 'DTR2', rate: 200},
    { name: 'TEREN GORJULUI', location: 'DTR3', rate: 200},
  ]);

  const getPitches = async () => {
    try {
      const response = await fetch(
        `http://192.168.0.101:8080/pitches`,
       
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
      <FlatList data={pitches} renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <PitchCard  item={item} />
          <TouchableOpacity onPress={() =>{navigation.navigate("Edit Pitch",{item});}}>
            <MaterialIcons style={styles.icon} name="edit-note" size={30} color="black" />
          </TouchableOpacity>
          <AntDesign style={styles.icon} name="delete" size={30} color="black" />
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
  
})