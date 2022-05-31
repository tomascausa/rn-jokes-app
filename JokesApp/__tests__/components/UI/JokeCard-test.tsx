import 'react-native';
import React from 'react';
import JokeCard from '../../../src/components/UI/JokeCard';
import {Joke} from '../../../src/types/Joke';
import renderer from 'react-test-renderer';

describe('<JokeCard />', () => {
    it('renders correctly', () => {
        const testData: Joke = {
            id: '1',
            joke: 'test',
        };
        const json = renderer.create(<JokeCard data={testData} />).toJSON();
        expect(json).toMatchSnapshot();
    });
});
