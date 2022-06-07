import React from 'react';
import {MockedProvider} from '@apollo/client/testing';
import {NavigationContainer} from '@react-navigation/native';
import renderer from 'react-test-renderer';
import SavedJokes from '../../src/screens/SavedJokes';

describe('<Saved />', () => {
    test('renders correctly', () => {
        const component = (
            <MockedProvider>
                <NavigationContainer>
                    <SavedJokes />
                </NavigationContainer>
            </MockedProvider>
        );
        const json = renderer.create(component).toJSON();
        expect(json).toMatchSnapshot();
    });
});
