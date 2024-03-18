import {SafeAreaView,FlatList, Text, View,TouchableOpacity,StyleSheet} from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddReservations({route}) {
  const [availableHours,setAvailableHours]=useState([{hour:'00:00'},{hour:'02:00'},{hour:'04:00'},{hour:'06:00'}
  ,{hour:'08:00'},{hour:'10:00'},{hour:'12:00'},{hour:'14:00'},{hour:'16:00'},{hour:'18:00'},{hour:'20:00'},{hour:'22:00'}]);
  const [listLength,setListLength]=useState(Math.ceil(availableHours.length/3))
  const [date, setDate] = useState(new Date());
  const [show,setShow]=useState(false);
  const onChange = (e, selectedDate) => {
    setShow(false);
    setDate(selectedDate);

  };
  console.log(listLength);
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
          <Text style={styles.hourCard}>{item.hour}</Text>
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