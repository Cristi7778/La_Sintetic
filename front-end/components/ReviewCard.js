import {StyleSheet, Text, View } from 'react-native';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import { globalStyles } from '../global/globalStyles';
export default function ReviewCard({item}){
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{item.UserUsername}</Text>
            <StarRatingDisplay
                starSize={32}
                rating={item.Rating}
            />
            <Text style={styles.text}>{item.Details}</Text>
        </View>
    )
};

const styles=StyleSheet.create({
    container:{
        backgroundColor:'white',
        borderColor:'grey',
        borderRadius:8,
        borderWidth:3,
        marginHorizontal:12
    },
    text:{
        fontSize:20,
        paddingHorizontal:8,
        paddingVertical:4
    },
    title:{
        fontSize:14,
        paddingHorizontal:8,
        paddingVertical:4
    },
})