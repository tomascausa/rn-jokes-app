/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Jokes from './screens/Jokes';
import Saved from './screens/Saved';
import ContextProvider from './store/context';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <ContextProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Jokes"
                        component={Jokes}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen name="Saved" component={Saved} />
                </Stack.Navigator>
            </NavigationContainer>
        </ContextProvider>
    );
};

export default App;
