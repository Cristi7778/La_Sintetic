import {SafeAreaView, Text, View,TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddReservations({route}) {
  const [date, setDate] = useState(new Date());
  const [show,setShow]=useState(false);
  const onChange = (e, selectedDate) => {
    setShow(false);
    setDate(selectedDate);

  };
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
    </SafeAreaView>
      
  );
};