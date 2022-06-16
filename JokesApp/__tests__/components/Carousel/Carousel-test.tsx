import 'react-native';
import React from 'react';
import {Joke} from '../../../src/types/Joke';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import Carousel from '../../../src/components/Carousel/Carousel';
import renderer from 'react-test-renderer';

const jokes: Joke[] = [
    {id: 'j1', joke: 'Joke 1'},
    {id: 'j2', joke: 'Joke 2'},
];

const indexChange = jest.fn();
const fetchNextJokes = jest.fn();

describe('<Carousel />', () => {
    it('renders correctly', () => {
        const json = renderer
            .create(
                <Carousel
                    isLoading={false}
                    indicatorIndex={0}
                    items={jokes}
                    renderItem={jest.fn()}
                />,
            )
            .toJSON();
        expect(json).toMatchSnapshot();
    });

    it('onFetchMore gets invoked when end reached', async () => {
        const {getByTestId} = render(
            <Carousel
                items={jokes}
                onIndexUpdate={indexChange}
                onFetchMore={fetchNextJokes}
                indicatorIndex={0}
                isLoading={false}
                renderItem={jest.fn()}
            />,
        );

        const toScroll = await getByTestId('flatList');
        fireEvent.scroll(toScroll, {
            nativeEvent: {
                contentOffset: {
                    y: 0,
                    x: 500,
                },
                contentSize: {
                    height: 100,
                    width: 500,
                },
                layoutMeasurement: {
                    height: 100,
                    width: 100,
                },
            },
        });

        await waitFor(() => {
            expect(fetchNextJokes).toHaveBeenCalledTimes(1);
        });
    });
});
