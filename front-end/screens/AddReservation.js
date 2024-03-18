import {SafeAreaView,FlatList, Text, View,TouchableOpacity,StyleSheet} from 'react-native';
import React, { useState,useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import ip from '../global/ip';

export default function AddReservations({route}) {
  const [availableHours,setAvailableHours]=useState(['00:00','02:00','04:00','06:00'
  ,'08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00']);
  const [listLength,setListLength]=useState(Math.ceil(availableHours.length/3))
  const [date, setDate] = useState(new Date());
  const [show,setShow]=useState(false);
  const onChange = (e, selectedDate) => {
    setShow(false);
    setDate(selectedDate);

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
  })
  return (
    <SafeAreaView >
      <View>
      <Text>{route.params.item.name}</Text>
      </View>
      <View>
      {show &&<DateTimePicker
        value={date}
        mode={"date"}
        is24Hour={true}
        onChange={onChange}
      />
      }
      <TouchableOpacity onPress={()=>{setShow(true)}}>
      <Text>{date.toDateString()}</Text>
      </TouchableOpacity>
      </View>
      <View >
      <FlatList contentContainerStyle={{alignSelf: 'flex-start'}}
      numColumns={listLength}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      data={availableHours} renderItem={({ item }) => (
        <TouchableOpacity >
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