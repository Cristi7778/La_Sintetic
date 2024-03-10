import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import {React,useMemo,  useState } from 'react';
import * as Yup from 'yup';
import RadioGroup from 'react-native-radio-buttons-group';

const signUpSchema = Yup.object().shape({
  username: Yup.string().min(6,'Username must have at least 6 characters').required('Username cannot be invalid'),
  email: Yup.string().required('Email Cannot Be Empty').min(10,'Email must have at least 10 characters'),
  password: Yup.string().min(6, 'Password Must have a minimum of 6 Characters').required('Password Cannot Be Empty'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Please Enter Password Again!'),
  phone: Yup.number().min(10,'Phone number must haved 10 digits').required('Phone number cannot be empty'),
});

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedId, setSelectedId] = useState();
  const radioButtons = useMemo(() => ([
      {
          id: '1', 
          label: 'I want to look for pitches to book',
          value: 'user',
      },
      {
          id: '2',
          label: 'I want to register my pitches for rental',
          value: 'manager'
      }
  ]), []);
  

  const signUp = async () => {
    try {
      await signUpSchema.validate({username, password, confirmPassword, email,phone }, { abortEarly: false });
      
      setErrors({});
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      if (error instanceof Yup.ValidationError) {
        const yupErrors = {};
        error.inner.forEach((innerError) => {
          yupErrors[innerError.path] = innerError.message;
        });
        setErrors(yupErrors);
      }
    }
  };
  const registerUser = async () =>{
    const body={"username" : username,
    "password" : password,
    "email" : email,
    "phone" : phone}
    try {
      const response = await fetch(
        `http://192.168.0.100:8080/users/${username}`,
      );
      const json = await response.json();
      if(response.status===404 && json.message==='user not found.'){
        const response2 = await fetch(
            `http://192.168.0.100:8080/managers/${username}`,
          );
          const json2 = await response2.json();
          if(json2.status===404 && json.message==='manager not found.'){
          await fetch(`http://192.168.0.100:8080/users`, {method: "POST",body: JSON.stringify(body),headers: 
                        {"Content-type": "application/json; charset=UTF-8"}});
          }
          else{
            Alert.alert("Register error","Username is already in use.");
          }
      }
      else{
        Alert.alert("Register error","Username is already in use.");
      }
    }
    catch (error) {
      console.error(error);
    }
  };
  const registerManger = async () =>{
    const body={"username" : username,
    "password" : password,
    "email" : email,
    "phone" : phone}
    try {
      const response = await fetch(
        `http://192.168.0.100:8080/managers/${username}`,
      );
      const json = await response.json();
      if(response.status===404 && json.message==='manager not found.'){
        const response2 = await fetch(
            `http://192.168.0.100:8080/users/${username}`,
          );
          const json2 = await response2.json();
          if(json2.status===404 && json.message==='user not found.'){
          await fetch(`http://192.168.0.100:8080/managers`, {method: "POST",body: JSON.stringify(body),headers: 
                        {"Content-type": "application/json; charset=UTF-8"}});
          }
          else{
            Alert.alert("Register error","Username is already in use.");
          }
      }
      else{
        Alert.alert("Register error","Username is already in use.");
      }
    }
    catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.centered}>

      <TextInput name="Username" style={styles.inputBox} placeholder="Your username" value={username} onChangeText={setUsername} />
      {errors.username && <Text style={styles.textWarning}>{errors.username}</Text>}  

     
      <TextInput name="Password" style={styles.inputBox} placeholder="Your password" value={password} onChangeText={setPassword} secureTextEntry />
      {errors.password && <Text style={styles.textWarning}>{errors.password}</Text>}

      <TextInput name="ConfirmPassword" style={styles.inputBox} placeholder="Confirm your password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
      {errors.confirmPassword && <Text style={styles.textWarning}>{errors.confirmPassword}</Text>}

      <TextInput name="Email" style={styles.inputBox} placeholder="Your email" value={email} onChangeText={setEmail} />
      {errors.email && <Text style={styles.textWarning}>{errors.email}</Text>}

      <TextInput name="Phone" style={styles.inputBox} placeholder="Your phone number" value={phone} onChangeText={setPhone} />
      {errors.phone && <Text style={styles.textWarning}>{errors.phone}</Text>}

      <RadioGroup 
            radioButtons={radioButtons} 
            onPress={setSelectedId}
            selectedId={selectedId}
      />
      <Button title="Register" onPress={()=>{signUp();
      if(success){
        console.log(selectedId);
        if(selectedId==='1'){
          registerUser();
        }
        else if(selectedId==='2'){
          registerManger();
        }
      }
      }} />
    </View>
  );
};
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  inputBox: {
    fontSize: 20,
    color: 'black'
  },
  textNormal: {
    fontSize: 20,
    color: 'black'
  },
  textTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    paddingBottom: 15,
    paddingTop: 15
  },
  textWarning: {
    fontSize: 10,
    color: 'red',
    paddingBottom: 5,
    paddingTop: 5
  },
  textSuccess: {
    fontSize: 24,
    color: 'green',
    fontWeight: 'bold',
    paddingBottom: 5,
    paddingTop: 5
  },
});