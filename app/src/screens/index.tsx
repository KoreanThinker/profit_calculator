import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import HomeScreen from './HomeScreen'
import StockListScreen from './StockListScreen'
import SettingScreen from './SettingScreen';

const Stack = createStackNavigator();


const AppContainer = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}
                initialRouteName='Home'
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="StockList" component={StockListScreen} />
                <Stack.Screen name="Setting" component={SettingScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default AppContainer