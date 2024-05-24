import {StyleSheet, Text, View,Image } from 'react-native';
import {globalStyles} from '../global/globalStyles';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect,useState } from 'react';
export default function PitchCard({item}){
    const image=item.imageLink;
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.paragraph}>{item.name}</Text>
            <View style={styles.location}>
                <MaterialIcons name="location-pin" size={24} color="black" />
                <Text style={globalStyles.paragraph}>{item.location}</Text></View>
            <Text style={globalStyles.paragraph}>{item.rate}</Text>
            <Image src={image} alt={image} style={globalStyles.image}></Image>
        </View>
    )
};

const styles=StyleSheet.create({
    location:{
        flexDirection:"row",
    },
})