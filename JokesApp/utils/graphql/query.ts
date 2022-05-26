import {gql} from '@apollo/client';

export const JOKES_QUERY = gql`
    query {
        joke {
            id
            joke
            permalink
        }
    }
`;
