/* eslint-disable react-hooks/exhaustive-deps */
import {useLazyQuery} from '@apollo/client';
import {useCallback, useEffect, useState} from 'react';
import {JOKES_QUERY} from '../utils/graphql/query';
import {Joke} from '../types/Joke';

interface JokesQueryResponse {
    joke: Joke;
}

const useJokes = () => {
    const [jokes, setJokes] = useState<Joke[]>([]);

    const [fetchJoke, {loading}] = useLazyQuery<JokesQueryResponse>(
        JOKES_QUERY,
        {
            fetchPolicy: 'network-only',
        },
    );

    const handleFetch = useCallback(
        async (currentJokes?: Joke[]) => {
            let newJokes: Joke[] = [];
            const fetchedJokes: Joke[] = [];

            for (let i = 0; i < 9; i++) {
                const joke = await fetchJoke();

                if (joke.data) {
                    fetchedJokes.push(joke.data.joke);
                }
            }

            if (currentJokes) {
                newJokes = [...newJokes, ...currentJokes];
            } else {
                newJokes = [...newJokes, ...jokes];
            }

            setJokes([...newJokes, ...fetchedJokes]);
        },
        [jokes, setJokes, fetchJoke],
    );

    const fetchMore = useCallback((oldJokes: Joke[]) => {
        handleFetch(oldJokes);
    }, []);

    useEffect(() => {
        handleFetch();
    }, []);

    return {
        jokes: jokes,
        loading: loading,
        fetchMore,
    };
};

export default useJokes;
