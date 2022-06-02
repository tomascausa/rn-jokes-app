import 'react-native';
import React from 'react';
import Carousel from '../../../src/components/Carousel/Carousel';
import {Joke} from '../../../src/types/Joke';
import renderer from 'react-test-renderer';

const jokes: Joke[] = [
    {id: 'j1', joke: 'Joke 1'},
    {id: 'j2', joke: 'Joke 2'},
];

describe('<Carousel />', () => {
    it('renders correctly', () => {
        const json = renderer
            .create(<Carousel items={jokes} renderItem={jest.fn()} />)
            .toJSON();
        expect(json).toMatchSnapshot();
    });
});
