import React from 'react';
import {MockedProvider} from '@apollo/client/testing';
import {NavigationContainer} from '@react-navigation/native';
import renderer from 'react-test-renderer';
import Saved from '../../src/screens/Saved';

describe('<Saved />', () => {
    test('renders correctly', () => {
        const component = (
            <MockedProvider>
                <NavigationContainer>
                    <Saved />
                </NavigationContainer>
            </MockedProvider>
        );
        const json = renderer.create(component).toJSON();
        expect(json).toMatchSnapshot();
    });
});
