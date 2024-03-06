import {NavigationContainer} from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import Login from '../screens/Login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from '../screens/Main';
import UserReservations from '../screens/UserReservations';
import ManagerReservations from '../screens/ManagerReservations';
import MyPitches  from "../screens/MyPitches";
import { Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddReservations from '../screens/AddReservation';
import EditPitch from '../screens/EditPitch';
const Tab=createBottomTabNavigator();
function TabGroup(){
  return (
    <Tab.Navigator
    screenOptions={({navigation,route})=>({
        tabBarIcon:({color,focus,size})=>{
            if(route.name==="Main"){
                return (<Ionicons name="football" size={30} color={color} />);
            }
            if(route.name==="My Reservations"){
                return (<MaterialCommunityIcons name="account-clock" size={30} color={color} />);
            }
        },
        tabBarActiveTintColor:'#1DA1F2',
        tabBarInactiveTintColor:'#444',
        tabBarLabelStyle:styles.tabBarText,
        tabBarStyle:styles.tabBar,
        headerShown:false,
    })}>
      <Tab.Screen name='Main' component={UserStackGroup} />
      <Tab.Screen name='My Reservations' component={UserReservations}/>
    </Tab.Navigator>
  )
}
const Drawer=createDrawerNavigator();
function DrawerGroup(){
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Log-out" component={Login} drawerLockMode='locked-close' options={{headerShown:false}}/>
            <Drawer.Screen name="Pitches" component={TabGroup} options={{drawerItemStyle: { display: 'none' }}}/>
            <Drawer.Screen name="My Pitches" component={ManagerTabGroup} options={{drawerItemStyle: { display: 'none' }}}/>
        </Drawer.Navigator>
    )
}
const UserStack=createNativeStackNavigator();
function UserStackGroup(){
    return (
        <UserStack.Navigator>
            <UserStack.Screen name="Home" component={Main} options={{headerShown:false}}/>
            <UserStack.Screen name="AddReservation" component={AddReservations}/>
        </UserStack.Navigator>
    )
}
const ManagerTab=createBottomTabNavigator();
function ManagerTabGroup(){
  return (
    <ManagerTab.Navigator
    screenOptions={({navigation,route})=>({
        tabBarIcon:({color,focus,size})=>{
            if(route.name==="Main"){
                return (<Ionicons name="football" size={30} color={color} />);
            }
            if(route.name==="My Reservations"){
                return (<MaterialCommunityIcons name="account-clock" size={30} color={color} />);
            }
        },
        tabBarActiveTintColor:'#1DA1F2',
        tabBarInactiveTintColor:'#444',
        tabBarLabelStyle:styles.tabBarText,
        tabBarStyle:styles.tabBar,
        headerShown:false,
    })}>
      <ManagerTab.Screen name='Main' component={ManagerStackGroup} options={{ title: 'Pitches' }} />
      <ManagerTab.Screen name='My Reservations' component={ManagerReservations}/>
    </ManagerTab.Navigator>
  )
}
const ManagerStack=createNativeStackNavigator();
function ManagerStackGroup(){
    return (
        <ManagerStack.Navigator>
            <ManagerStack.Screen name="Home" component={MyPitches} options={{headerShown:false}}/>
            <ManagerStack.Screen name="Edit Pitch" component={EditPitch}/>
        </ManagerStack.Navigator>
    )
}
export default function Navigation(){
    return (
        <NavigationContainer>
            <DrawerGroup/>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    tabBarText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#444',
    letterSpacing: 1,
    },
    tabBar:{
        height:60,
        width:'100%',
      },
})
