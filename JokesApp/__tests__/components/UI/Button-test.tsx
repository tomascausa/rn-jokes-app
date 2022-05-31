import 'react-native';
import React from 'react';
import Button from '../../../src/components/UI/Button';
import renderer from 'react-test-renderer';

describe('<Button />', () => {
    it('renders correctly', () => {
        const json = renderer.create(<Button>Test</Button>).toJSON();
        expect(json).toMatchSnapshot();
    });
});
