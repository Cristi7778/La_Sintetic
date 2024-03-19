import {SafeAreaView,Alert,FlatList, Text, View,TouchableOpacity,StyleSheet} from 'react-native';
import React, { useState,useEffect,useContext } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import ip from '../global/ip';
import { UserContext } from '../contexts/UserContext';

export default function AddReservations({route}) {
  const [availableHours,setAvailableHours]=useState(['00:00','02:00','04:00','06:00'
  ,'08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00']);
  const [listLength,setListLength]=useState(Math.ceil(availableHours.length/3))
  const [date, setDate] = useState(new Date());
  const [show,setShow]=useState(false);
  const {user}=useContext(UserContext);
  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
    setShow(false);

  };
  const openPicker = () => {
    setShow(true);
  };
  const getReservations = async () => {
    try {
      const response = await fetch(
        `${ip}:8080/reservations`,
       
      );
      const json = await response.json();
      if(response.status===200){
        const filteredReservations = json.records.filter(entry =>{
          return entry.PitchId===route.params.item.id && (new Date(entry.Date)).toISOString().slice(0,10)===date.toISOString().slice(0,10);
      })
      const busyHours=new Array();
      for (var i = 0; i< filteredReservations.length; i++) {
        busyHours.push(filteredReservations[i].Date.slice(11,16));
    }
      setAvailableHours(subtractArrays(['00:00','02:00','04:00','06:00'
      ,'08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00'],busyHours));
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
  function subtractArrays(arr1, arr2) {
    return arr1.filter(item =>{ 
       return !arr2.includes(item)});
}
  useEffect(() => {
    setListLength(Math.ceil(availableHours.length/3));
  }, [availableHours]);
  useEffect(()=>{
    getReservations();
  },[date])
  
  return (
    <SafeAreaView >
      <View>
      <Text>{route.params.item.name}</Text>
      </View>
      <TouchableOpacity onPress={openPicker}>
      <Text>{date.toDateString()}</Text>
      </TouchableOpacity>
      <View>
      {show &&<DateTimePicker
        value={date}
        mode={"date"}
        onChange={onChange}
      />
      }
      </View>
      <View >
      <FlatList contentContainerStyle={{alignSelf: 'flex-start'}}
      numColumns='3'
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      data={availableHours} renderItem={({ item }) => (
        <TouchableOpacity onPress={()=>{
          Alert.alert('Confirm reservation', `Do you want to create a reservation for ${route.params.item.name} located at
           ${route.params.item.location} at ${item},${date.toDateString()}?`,
          [{text: 'YES',onPress: async ()=>{
            const body={
              "Date" : `${date.toISOString().slice(0,11)}${item}${date.toISOString().slice(16,)}`,
              "UserUsername" : user,
              "PitchId" : route.params.item.id}
            await fetch(`${ip}:8080/reservations`, {method: "POST",body: JSON.stringify(body),headers: 
                       {"Content-type": "application/json; charset=UTF-8"}});
          }},
           {text:'NO'}])
        }}>
          <Text style={styles.hourCard}>{item}</Text>
        </TouchableOpacity>
      )} />
    </View>
    </SafeAreaView>
      
  );
};
export const styles= StyleSheet.create({
  hourCard:{
    backgroundColor:'orange',
    borderColor:'black',
    margin:3,
    fontSize:24,
    borderRadius:12,
    padding:6,
  },
});