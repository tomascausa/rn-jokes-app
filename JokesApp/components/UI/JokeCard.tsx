import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {GlobalStyles} from '../../constants/styles';
import {Joke} from '../../types/Joke';

export type JokeCardProps = {
    data: Joke;
    mode?: string;
};

export type AuthorProps = {
    label: string;
    style: any;
};

const {width} = Dimensions.get('window');

const Author: React.FC<AuthorProps> = ({label, style}) => {
    return <Text style={style}>@{label}</Text>;
};

const JokeCard: React.FC<JokeCardProps> = ({data, mode}) => {
    let authorElement;

    if (data.permalink) {
        authorElement = (
            <Author
                label={data.permalink}
                style={mode === 'small' ? styles.smallAuthor : styles.author}
            />
        );
    }

    return (
        <View
            style={mode === 'small' ? styles.smallContainer : styles.container}>
            <Text style={mode === 'small' ? styles.smallTitle : styles.title}>
                {data.joke}
            </Text>
            {authorElement}
        </View>
    );
};

const styles = StyleSheet.create({
    smallContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginHorizontal: 10,
        paddingTop: 35,
        paddingHorizontal: 15,
        paddingBottom: 20,
        shadowColor: GlobalStyles.colors.primary,
        shadowOffset: {
            width: 0,
            height: 15,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 15,
        borderRadius: 8,
        backgroundColor: GlobalStyles.colors.primary,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width - 50,
        marginHorizontal: 20,
        paddingTop: 80,
        paddingBottom: 30,
        paddingHorizontal: 20,
        borderRadius: 8,
        backgroundColor: GlobalStyles.colors.primary,
    },
    title: {
        fontFamily: 'Roboto-Medium',
        fontSize: 30,
        fontWeight: '500',
        lineHeight: 42,
        textAlign: 'center',
        color: GlobalStyles.colors.white,
    },
    smallTitle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
        fontWeight: '500',
        lineHeight: 20,
        textAlign: 'center',
        color: GlobalStyles.colors.white,
    },
    smallAuthor: {
        marginTop: 60,
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        textAlign: 'center',
        color: GlobalStyles.colors.white,
    },
    author: {
        marginTop: 120,
        fontFamily: 'NanumPenOTF',
        fontSize: 28,
        textAlign: 'center',
        color: GlobalStyles.colors.white,
    },
});

export default JokeCard;
