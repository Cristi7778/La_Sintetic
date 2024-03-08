import {SafeAreaView, Text, View } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';
export default function UserReservations() {
  const {user}=useContext(UserContext);
  return (
    <SafeAreaView >
      <Text>{user}</Text>
    </SafeAreaView>
  );
}