import {SafeAreaView,Alert,FlatList, Text, View,TouchableOpacity,StyleSheet,Image,Dimensions, ScrollView, TextInput, Button} from 'react-native';
import React, { useState,useEffect,useContext } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import ip from '../global/ip';
import { UserContext } from '../contexts/UserContext';
import MapView,{Marker} from 'react-native-maps';
import StarRating, {StarRatingDisplay} from 'react-native-star-rating-widget';
import ReviewCard from '../components/ReviewCard';

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;
const windowWidth = Dimensions.get('window').width;
export default function AddReservations({route}) {
  const [availableHours,setAvailableHours]=useState(['00:00','02:00','04:00','06:00'
  ,'08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00']);
  const [listLength,setListLength]=useState(Math.ceil(availableHours.length/3))
  const [date, setDate] = useState(new Date());
  const [show,setShow]=useState(false);
  const [region, setRegion] = useState({
    latitudeDelta,
    longitudeDelta,
    latitude: route.params.item.latitude,
    longitude:route.params.item.longitude,
});
const image=route.params.item.imageLink;
const [rating, setRating] = useState(route.params.item.rating);
const [newRating, setNewRating] = useState(0);
const [newReview,setNewReview]=useState();
const [reviews,setReviews]=useState('');
  const {user}=useContext(UserContext);
  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
    setShow(false);

  };
  const openPicker = () => {
    setShow(true);
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
  const getReviews=async()=>{
    try {
      const response = await fetch(
        `${ip}:8080/reviews`,
       
      );
      const json = await response.json();
      if(response.status===200){
        const filteredReviews = json.records.filter(entry =>{
          return entry.PitchId===route.params.item.id;
      })
      setReviews(filteredReviews)
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
  const addReview= async()=>{
    if(newReview.length>0&&newRating>0){

    }
    else{

    }
  }
  useEffect(() => {
    setListLength(Math.ceil(availableHours.length/3));
  }, [availableHours]);
  useEffect(()=>{
    getReservations();
  },[date])
  useEffect(()=>{
    getReviews();
}, [])
  return (
    <ScrollView>
    <SafeAreaView style={styles.page}>
      <View>
      <Text style={styles.title}>{route.params.item.name}</Text>
      <Text style={styles.text}>{route.params.item.description}</Text>
      <Text style={styles.text}>Rate:{route.params.item.rate}RON/HR</Text>
      </View>
      <TouchableOpacity onPress={openPicker}>
      <Text style={styles.text}>Choose a date:{date.toDateString()}</Text>
      </TouchableOpacity>
      <View>
      {show &&<DateTimePicker
        value={date}
        mode={"date"}
        onChange={onChange}
      />
      }
      </View>
      <View >
      <FlatList contentContainerStyle={{alignSelf: 'flex-start'}}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      data={availableHours} renderItem={({ item }) => (
        <TouchableOpacity onPress={()=>{
          Alert.alert('Confirm reservation', `Do you want to create a reservation for ${route.params.item.name} located at
           ${route.params.item.location} at ${item},${date.toDateString()}?`,
          [{text: 'YES',onPress: async ()=>{
            const body={
              "Date" : `${date.toISOString().slice(0,11)}${item}${date.toISOString().slice(16,)}`,
              "UserUsername" : user,
              "PitchId" : route.params.item.id}
            await fetch(`${ip}:8080/reservations`, {method: "POST",body: JSON.stringify(body),headers: 
                       {"Content-type": "application/json; charset=UTF-8"}});
          }},
           {text:'NO'}])
        }}>
          <Text style={styles.hourCard}>{item}</Text>
        </TouchableOpacity>
      )} />
    </View>
    <Image src={image} alt={image} style={styles.image}></Image> 
    <Text style={styles.text}>{route.params.item.location}</Text>
      <MapView region={region} style={styles.map}>
        <Marker coordinate={region} title='Marker'/>
      </MapView>
      <View style={styles.ratingView}>
        <StarRatingDisplay
        rating={rating}
        starSize={42}
        />
        <Text style={styles.ratingText}>({rating})</Text>
      </View>
      <View style={styles.addRating}>
        <Text style={styles.reviewTitle}>Add a review</Text>
        <View style={styles.reviewStars}>
          <StarRating
          starSize={32}
          rating={newRating}
          onChange={setNewRating}
          />
        </View>
        <TextInput
        name="Review" placeholder="Write a review.." value={newReview} onChangeText={setNewReview} style={styles.input}
        />
        <TouchableOpacity style={styles.button}onPress={addReview}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList contentContainerStyle={{alignSelf: 'flex-start'}}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      data={reviews} renderItem={({ item }) => (
        <ReviewCard
          item={item}
        />
        )} />
    </SafeAreaView>
    </ScrollView>
  );
};
export const styles= StyleSheet.create({
  page:{
    backgroundColor: '#b9e4d6',
    
  },
  text:{
    fontSize:20,
    marginHorizontal:12,
    color:'#595959',
  },
  hourCard:{
    backgroundColor:'#13a015',
    borderColor:'black',
    margin:3,
    fontSize:24,
    borderRadius:12,
    padding:6,
  },
  title:{
    textAlign:'center',
    fontSize:30,
    color:'#595959',
  },
  map: { 
    borderWidth:8,
    borderColor:'black',
    width:windowWidth*5/6,
    height:windowWidth*10/18,
    margin:windowWidth/12,
  },
  image:{
    borderWidth:4,
    borderColor:'gray',
    marginHorizontal:windowWidth/12,
    marginVertical:windowWidth/24,
    width:windowWidth*5/6,
    height:windowWidth*9/10,
  },
  ratingView:{
    flexDirection:"row",
    marginBottom:12
  },
  ratingText:{
    fontSize:30,
  },
  addRating:{
    backgroundColor:'white',
    margin:18,
    borderColor:'grey',
    borderRadius:8,
    borderWidth:3,
  },
  reviewTitle:{
    textAlign:'center',
    fontSize:18,
    fontWeight:'bold',
    color:'#595959',
    margin:4
  },
  reviewStars:{
    textAlign:'center',
    margin:4
  },
  button:{
    alignItems: 'flex-end',
    marginVertical:6,
    marginHorizontal:8,
  },
  buttonText:{
    fontSize:18,
    backgroundColor:'#2c9abf',
    padding:8,
    fontWeight:'bold',
    borderRadius:14 
  },
  input:{
    fontSize:16,
    marginHorizontal:8,
  }
});