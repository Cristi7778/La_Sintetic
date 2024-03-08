import {StyleSheet, Text, View } from 'react-native';
import {globalStyles} from '../styles/globalStyles';

export default function ReservationCard({item}){
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.paragraph}>Location</Text>
            <Text style={globalStyles.paragraph}>Date</Text>
            <Text style={globalStyles.paragraph}>Time</Text>
        </View>
    )
};

const styles=StyleSheet.create({
    location:{
        flexDirection:"row",
    },
})