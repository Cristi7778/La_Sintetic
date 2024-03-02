import {Text, View } from 'react-native';
import {globalStyles} from '../styles/globalStyles';

export default function PitchCard({item}){
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.paragraph}>{item.name}</Text>
            <Text style={globalStyles.paragraph}>{item.location}</Text>
            <Text style={globalStyles.paragraph}>{item.rate}</Text>
        </View>
    )
};