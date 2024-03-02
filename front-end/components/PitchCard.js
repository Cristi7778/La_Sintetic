import {StyleSheet, Text, View } from 'react-native';
import {globalStyles} from '../styles/globalStyles';
import { MaterialIcons } from '@expo/vector-icons';

export default function PitchCard({item}){
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.paragraph}>{item.name}</Text>
            <View style={styles.location}>
                <MaterialIcons name="location-pin" size={24} color="black" />
                <Text style={globalStyles.paragraph}>{item.location}</Text></View>
            <Text style={globalStyles.paragraph}>{item.rate}</Text>
        </View>
    )
};

const styles=StyleSheet.create({
    location:{
        flexDirection:"row",
    },
})