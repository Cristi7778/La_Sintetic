import {SafeAreaView, Text, View } from 'react-native';

export default function AddReservations({route}) {
  return (
    <SafeAreaView >
      <Text>{route.params.item.name}</Text>
    </SafeAreaView>
  );
}