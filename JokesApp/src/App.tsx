import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ApolloProvider} from '@apollo/client';
import {client} from './utils/graphql/client';
import Jokes from './screens/Jokes';
import SavedJokes from './screens/SavedJokes';
import ContextProvider from './store/context';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <ApolloProvider client={client}>
            <ContextProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen
                            name="Jokes"
                            component={Jokes}
                            options={{headerShown: false}}
                        />
                        <Stack.Screen
                            name="SavedJokes"
                            component={SavedJokes}
                            options={{title: 'Saved'}}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </ContextProvider>
        </ApolloProvider>
    );
};

export default App;
