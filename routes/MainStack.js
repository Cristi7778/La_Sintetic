import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Main from '../screens/Main';
import Reservations from '../screens/Reservations';

const screens = {
  Main: {
    screen: Main,
  },
  Reservations: {
    screen: Reservations,
  },
};

const MainStack = createStackNavigator(screens);

export default createAppContainer(MainStack);