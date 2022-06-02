/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useState, createContext, useEffect} from 'react';
import {Joke} from '../types/Joke';
import {JokeSchema} from '../realm/schema';
import Realm from 'realm';

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
    const [realm, setRealm] = useState<Realm>();
    const [jokes, setJokes] = useState<Joke[]>([]);

    useEffect(() => {
        const openRealm = async () => {
            const realmInstance = await Realm.open({schema: [JokeSchema]});

            if (realmInstance != null && !realmInstance.isClosed) {
                setRealm(realmInstance);

                const response = realmInstance
                    .objects<Joke>('Joke')
                    .map(value => {
                        return value.toJSON() as Joke;
                    });

                setJokes(response);
            }
        };

        openRealm();

        return () => {
            if (!!realm && !realm.isClosed) {
                realm.close();
            }
        };
    }, []);

    const addJoke = (joke: Joke) => {
        if (!jokes.includes(joke)) {
            realmAddJoke(joke);
            setJokes((items: Joke[]) => [...items, joke]);
        }
    };

    const removeJoke = (id: string) => {
        realmRemoveJoke(id);
        setJokes((items: Joke[]) =>
            items.filter((joke: Joke) => joke.id !== id),
        );
    };

    const realmAddJoke = (joke: Joke) => {
        if (!!realm && !realm.isClosed) {
            realm.write(() => {
                realm.create('Joke', joke);
            });
        }
    };

    const realmRemoveJoke = (id: string) => {
        if (!!realm && !realm.isClosed) {
            realm.write(() => {
                const joke = realm.objectForPrimaryKey<Joke>('Joke', id);
                realm.delete(joke);
            });
        }
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
