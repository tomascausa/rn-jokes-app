import React from 'react';
import {MockedProvider} from '@apollo/client/testing';
import {JOKES_QUERY} from '../../src/utils/graphql/query';
import {fireEvent, render} from '@testing-library/react-native';
import {Context} from '../../src/store/context';
import {NavigationContainer} from '@react-navigation/native';
import renderer from 'react-test-renderer';
import Jokes from '../../src/screens/Jokes';

const mocks: any[] = [
    {
        request: {
            query: JOKES_QUERY,
        },
        result: {
            data: {
                joke: {
                    id: '1',
                    joke: 'Test',
                    permalink: 'https://example.com',
                },
            },
        },
    },
];

jest.mock('@fortawesome/react-native-fontawesome', () => ({
    FontAwesomeIcon: '',
}));

describe('<Jokes />', () => {
    test('renders correctly', () => {
        const component = (
            <MockedProvider mocks={mocks}>
                <NavigationContainer>
                    <Jokes />
                </NavigationContainer>
            </MockedProvider>
        );
        const json = renderer.create(component).toJSON();
        expect(json).toMatchSnapshot();
    });

    test('addJoke context method gets called when clicking Save button', async () => {
        const mockAddJoke = jest.fn();
        const component = (
            <MockedProvider mocks={mocks}>
                <Context.Provider
                    value={{
                        jokes: [],
                        removeJoke: jest.fn(),
                        addJoke: mockAddJoke,
                    }}>
                    <NavigationContainer>
                        <Jokes />
                    </NavigationContainer>
                </Context.Provider>
            </MockedProvider>
        );
        const {getByText} = await render(component);
        const toClick = await getByText('Save');

        fireEvent.press(toClick);

        expect(mockAddJoke).toHaveBeenCalledTimes(1);
    });
});
