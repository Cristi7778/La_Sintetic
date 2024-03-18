import {SafeAreaView, Text, View,FlatList,TouchableOpacity,Alert,StyleSheet} from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { useContext, useState,useEffect } from 'react';
import ReservationCard from '../components/ReservationCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ip from '../global/ip';
export default function UserReservations() {
  const {user}=useContext(UserContext);
  const [reservations,setReservations]=useState();
  const getReservations = async () => {
    try {
      const response = await fetch(
        `${ip}:8080/reservations`,
       
      );
      const json = await response.json();
      if(response.status===200){
       const filteredReservations = json.records.filter(entry =>{
          return entry.UserUsername===user;
       })
       setReservations(filteredReservations);
      }
      else{
        if(response.status===404){
          console.log("Reservations not found");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
useEffect(() => {
  getReservations();
}, );
  return (
    <SafeAreaView >
      <FlatList data={reservations} renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <ReservationCard item={item} />
          <TouchableOpacity onPress={()=> Alert.alert('Confirm deletion', `Are you sure you want to delete this reservation?`,
           [{text: 'YES', onPress: () => fetch(`${ip}:8080/reservations/${item.ID}`, {method: "DELETE",headers: 
           {"Content-type": "application/json; charset=UTF-8"}})},
            {text:'NO'}])}>
            <MaterialCommunityIcons style={styles.icon} name="cancel" size={24} color="red" />
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