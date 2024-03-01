import {Button, Text, View,StyleSheet } from 'react-native';

export default function Login({navigation}) {
  return (
    <View style={styles.container} >
      <Text>Login Screen</Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate("Pitches")}
      />
    </View>
  );
}

const styles = StyleSheet.create({ 
  titleText: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#333',
},
paragraph: {
  marginVertical: 8,
  lineHeight: 20,
},
container: {
  flex: 1,
  padding: 20,
},
input: {
  borderWidth: 1,
  borderColor: '#ddd',
  padding: 10,
  fontSize: 18,
  borderRadius: 6,
},
})