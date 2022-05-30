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
    const [currentJokes, setCurrentJokes] = useState<Joke[]>([]);
    // const [fetchMore, setFetchMore] = useState(false);

    const [fetchJoke, {loading}] = useLazyQuery<JokesQueryResponse>(
        JOKES_QUERY,
        {
            fetchPolicy: 'network-only',
        },
    );

    const handleFetch = useCallback(async () => {
        const fetchedJokes: Joke[] = [];

        for (let i = 0; i < 4; i++) {
            const joke = await fetchJoke();

            if (joke.data) {
                fetchedJokes.push(joke.data.joke);
            }
        }

        setJokes([...jokes, ...fetchedJokes]);
        setCurrentJokes(fetchedJokes);
    }, [jokes, setJokes, fetchJoke]);

    // const fetchMore = useCallback(() => {
    //     setCurrentJokes([]);
    //     handleFetch();
    // }, []);

    const fetchMore = useCallback(() => {
        setCurrentJokes([]);
        handleFetch();
    }, []);

    useEffect(() => {
        handleFetch();
    }, []);

    // useEffect(() => {
    //     if (fetchMore) {
    //         handleFetch();
    //         setFetchMore(false);
    //     }
    // }, [fetchMore, handleFetch]);

    return {
        jokes: currentJokes,
        loading: loading || currentJokes.length < 4,
        fetchMore,
    };
};

export default useJokes;
