import React, { useState } from 'react';
import {Button, Text, View,StyleSheet, TextInput } from 'react-native';

export default function Login({navigation}) {
  const [username, setUsername] = useState(' ');
  const [password, setPassword] = useState(' ');
  return (  
    <View style={styles.container} >
      <Text style={styles.titleText}>Login Screen</Text>
      <TextInput style={styles.input}
      placeholder='Your username'
      onChangeText={(value) => setUsername(value)}
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
          navigation.navigate("Pitches");
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