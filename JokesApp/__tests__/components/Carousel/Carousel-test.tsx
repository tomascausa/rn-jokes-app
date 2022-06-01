import 'react-native';
import React from 'react';
import Carousel from '../../../src/components/Carousel/Carousel';
import {Joke} from '../../../src/types/Joke';
import {fireEvent, render} from '@testing-library/react-native';
import renderer from 'react-test-renderer';

const jokes: Joke[] = [{id: '1', joke: 'test'}];

describe('<Carousel />', () => {
    it('renders correctly', () => {
        const json = renderer
            .create(<Carousel items={jokes} renderItem={jest.fn()} />)
            .toJSON();
        expect(json).toMatchSnapshot();
    });

    it('onIndexUpdate its triggered', async () => {
        const mockOnIndexUpdate = jest.fn();
        const {getByTestId} = render(
            <Carousel
                items={jokes}
                renderItem={jest.fn()}
                onIndexUpdate={mockOnIndexUpdate}
            />,
        );
        const toInteract = await getByTestId('flat-list');

        fireEvent.scroll(toInteract, {
            nativeEvent: {
                contentSize: {
                    height: 150,
                    width: 800,
                },
                contentOffset: {y: 0, x: 400},
                layoutMeasurement: {height: 150, width: 400},
            },
        });

        expect(mockOnIndexUpdate).toHaveBeenCalledTimes(1);
        expect(mockOnIndexUpdate).toHaveBeenCalledWith(1);
    });
});
