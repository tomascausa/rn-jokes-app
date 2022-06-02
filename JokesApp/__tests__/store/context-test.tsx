import React from 'react';
import {Pressable, Text} from 'react-native';
import ContextProvider, {Context} from '../../src/store/context';
import renderer from 'react-test-renderer';
import {fireEvent, render} from '@testing-library/react-native';

const mockJoke = {
    id: '1',
    joke: 'Joke',
    permalink: '1',
};

describe('App Context', () => {
    test('Renders correctly', () => {
        const component = renderer.create(
            <ContextProvider>
                <Context.Consumer>
                    {value => (
                        <>
                            <Text>Jokes: {value.jokes.length}</Text>
                        </>
                    )}
                </Context.Consumer>
            </ContextProvider>,
        );
        expect(component.toJSON()).toMatchSnapshot();
    });

    // test('Default state on savedJokes', () => {
    //     const {getByText} = render(
    //         <AppContextProvider>
    //             <AppContext.Consumer>
    //                 {value => (
    //                     <OpenSansText>
    //                         savedJokes: {value.savedJokes.length}
    //                     </OpenSansText>
    //                 )}
    //             </AppContext.Consumer>
    //         </AppContextProvider>,
    //     );
    //     expect(getByText('savedJokes: 0')).toBeTruthy();
    // });

    // test('saveJoke function updates savedJokes correctly', () => {
    //     const {getByTestId, getByText} = render(
    //         <AppContextProvider>
    //             <AppContext.Consumer>
    //                 {value => (
    //                     <>
    //                         <OpenSansText>
    //                             savedJokes: {value.savedJokes.length}
    //                         </OpenSansText>
    //                         <Pressable
    //                             onPress={value.saveJoke.bind(this, mockJoke)}
    //                             testID={'press-save'}>
    //                             <OpenSansText>Press Save</OpenSansText>
    //                         </Pressable>
    //                     </>
    //                 )}
    //             </AppContext.Consumer>
    //         </AppContextProvider>,
    //     );
    //     expect(getByText('savedJokes: 0')).toBeTruthy();
    //     fireEvent(getByTestId('press-save'), 'press');
    //     expect(getByText('savedJokes: 1')).toBeTruthy();
    // });

    // test('removeJoke function updates savedJokes correctly', () => {
    //     const {getByText, getByTestId} = render(
    //         <AppContextProvider>
    //             <AppContext.Consumer>
    //                 {value => (
    //                     <>
    //                         <OpenSansText>
    //                             savedJokes: {value.savedJokes.length}
    //                         </OpenSansText>
    //                         <Pressable
    //                             onPress={value.saveJoke.bind(this, mockJoke)}
    //                             testID={'press-save'}>
    //                             <OpenSansText>Press Save</OpenSansText>
    //                         </Pressable>
    //                         <Pressable
    //                             onPress={value.removeJoke.bind(this, '1')}
    //                             testID={'press-delete'}>
    //                             <OpenSansText>Press Delete</OpenSansText>
    //                         </Pressable>
    //                     </>
    //                 )}
    //             </AppContext.Consumer>
    //         </AppContextProvider>,
    //     );
    //     expect(getByText('savedJokes: 0')).toBeTruthy();
    //     fireEvent(getByTestId('press-save'), 'press');
    //     expect(getByText('savedJokes: 1')).toBeTruthy();
    //     fireEvent(getByTestId('press-delete'), 'press');
    //     expect(getByText('savedJokes: 0')).toBeTruthy();
    // });
});
