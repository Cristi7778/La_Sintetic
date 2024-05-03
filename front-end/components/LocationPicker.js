import { React, useState } from 'react'
import { Image,Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import MapView from 'react-native-maps'
import marker from "../assets/locationMarker.png"

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;
const windowWidth = Dimensions.get('window').width;
export default function LocationPicker({lat,long,setLat,setLong}){
    const [region, setRegion] = useState({
        latitudeDelta,
        longitudeDelta,
        latitude: lat,
        longitude: long,
    });
    const [mapReady,setMapReady]=useState(false);

    onRegionChange = region => {
        setRegion(region);
        setLat(region.latitude);
        setLong(region.longitude);
        console.log(region.latitude,region.longitude);
    };
    onMapLayout = () => {
        setMapReady(true);
      };
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={region}
                onRegionChangeComplete={onRegionChange}
                onMapReady={onMapLayout}
            />
            {mapReady &&
            <View style={styles.markerFixed}>
                <Image style={styles.marker} source={marker} />
            </View> }
        </View>
    )
}
const styles = StyleSheet.create({
    map: {
        width:windowWidth*2/3,
        height:windowWidth*2/3,
    },
    container:{
        width:windowWidth*2/3,
        height:windowWidth*2/3,
        marginTop:windowWidth/6,
        marginLeft:windowWidth/6,
        marginRight:windowWidth/6,
    },
    markerFixed: {
        left: '50%',
        marginLeft: -24,
        marginTop: -44,
        position: 'absolute',
        top: '50%'
    },
    marker: {
        height: 48,
        width: 48
    },
    footer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        bottom: 0,
        position: 'absolute',
        width: '100%'
    },
    region: {
        color: '#fff',
        lineHeight: 20,
        margin: 20
    }
})