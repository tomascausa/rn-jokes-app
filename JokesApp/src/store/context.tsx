import React, {FC, useState, createContext} from 'react';
import {Joke} from '../types/Joke';

interface Props {
    jokes: Joke[];
    addJoke: (joke: Joke) => void;
    removeJoke: (id: string) => void;
}

export const Context = createContext<Props>({
    jokes: [],
    addJoke: (joke: Joke) => {},
    removeJoke: (id: string) => {},
});

const ContextProvider: FC = ({children}) => {
    const [jokes, setJokes] = useState<Joke[]>([]);

    const addJoke = (joke: Joke) => {
        if (!jokes.includes(joke)) {
            setJokes((items: Joke[]) => [...items, joke]);
        }
    };

    const removeJoke = (id: string) => {
        setJokes((items: Joke[]) =>
            items.filter((joke: Joke) => joke.id !== id),
        );
    };

    return (
        <Context.Provider
            value={{
                jokes,
                removeJoke,
                addJoke,
            }}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
