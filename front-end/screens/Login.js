import React, { useState,useEffect,useContext } from 'react';
import {Button, Text, View,StyleSheet, TextInput,Alert} from 'react-native';
import { UserContext } from '../contexts/UserContext';
import ip from '../global/ip';
export default function Login({navigation}) {
  const [username, setUsername] = useState(' ');
  const [password, setPassword] = useState(' ');
  const {setUser}=useContext(UserContext);
  const getUserByUsername = async (user) => {
    try {
      const response = await fetch(
        `${ip}:8080/users/${user}`,
       
      );
      const json = await response.json();
      if(response.status===200){
        if(json.user.password===password){
          navigation.navigate("Pitches");
        }
        else{
          Alert.alert('Log-in error', 'Creditentials do not match', [
            
            {text: 'OK',},
          ]);
        }
      }
      else{
        const response2 = await fetch(
          `${ip}:8080/managers/${user}`,
         
        );
        const json2 = await response2.json();
        if(response2.status===200){
          if(json2.manager.password===password){
            navigation.navigate('My Pitches', {
              screen: 'Main',
              params: {
                screen: 'Home',
                params: {
                  user:username
                },
              },
            });
          }
          else{
            Alert.alert('Log-in error', 'Creditentials do not match', [
              
              {text: 'OK',},
            ]);
          }
        }

        if(response.status===404&& response2.status===404){
          console.log("user not found");
          Alert.alert('Log-in error', 'Username was not found', [
            {text: 'OK',},
          ]);
      
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  
  return (  
    <View style={styles.container} >
      <Text style={styles.titleText}>Login Screen</Text>
      <TextInput style={styles.input}
      placeholder='Your username'
      onChangeText={(value) => {setUsername(value);
      setUser(value);}}
      />
      <TextInput style={styles.input}
      placeholder='Your password'
      secureTextEntry={true}
      onChangeText={(value) => setPassword(value)}
      />
      <Button color='teal'
        title="Login"
        onPress={() => {
          console.log(username,password);
          getUserByUsername(username);
        }}
      />
      <Button color='teal'
        title="Register"
        onPress={() => {
          navigation.navigate('Register');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({ 
  titleText: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#333',
  margin:10,
},
paragraph: {
  marginVertical: 8,
  lineHeight: 20,
},
container: {
  flex: 1,
  padding: 20,
  justifyContent:'center',
  textAlign:"center",
},
input: {
  borderWidth: 1,
  borderColor: '#ddd',
  padding: 10,
  fontSize: 18,
  borderRadius: 10,
  marginBottom:15,
},
})
