import {StyleSheet, Text, View } from 'react-native';
import {globalStyles} from '../styles/globalStyles';
import { useEffect, useState } from 'react';
import ip from '../global/ip';

export default function ReservationCard({item}){
    const date=item.Date.substring(0, 10);
    const hour=item.Date.substring(11,16);
    const [location,setLocation]=useState();
    const [name,setName]=useState();
    const getDetails = async () => {
        try {
          const response = await fetch(
            `${id}:8080/pitches/${item.PitchId}`,
           
          );
          const json = await response.json();
          if(response.status===200){
            setName(json.pitch.name);
            setLocation(json.pitch.location);
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
        getDetails();
      }, []);
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.paragraph}>{name}</Text>
            <Text style={globalStyles.paragraph}>{location}</Text>
            <Text style={globalStyles.paragraph}>{date}</Text>
            <Text style={globalStyles.paragraph}>{hour}</Text>
        </View>
    )
};

const styles=StyleSheet.create({
    location:{
        flexDirection:"row",
    },
})