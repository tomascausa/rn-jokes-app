import {useLazyQuery} from '@apollo/client';
import {useEffect, useState} from 'react';
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

    useEffect(() => {
        const fetchJokeHelper = async () => {
            const joke = await fetchJoke();

            if (joke.data) {
                setJokes([...jokes, joke.data.joke]);
            }
        };

        if (jokes.length < 4 && !loading) {
            fetchJokeHelper();
        }
    }, [setJokes, jokes, fetchJoke, loading]);

    return {jokes, loading: loading || jokes.length < 4};
};

export default useJokes;
