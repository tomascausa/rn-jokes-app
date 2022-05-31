import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    StyleProp,
    ViewStyle,
    TextStyle,
} from 'react-native';
import {GlobalStyles} from '../../constants/styles';
import {Joke} from '../../types/Joke';

export type JokeCardProps = {
    data: Joke;
    style?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    authorStyle?: StyleProp<TextStyle>;
};

export type AuthorProps = {
    label: string;
    style: any;
};

const Author: React.FC<AuthorProps> = ({label, style}) => {
    return <Text style={style}>@{label}</Text>;
};

const JokeCard: React.FC<JokeCardProps> = ({
    data,
    style,
    titleStyle,
    authorStyle,
}) => {
    let authorElement;

    if (data.permalink) {
        authorElement = (
            <Author
                label={data.permalink}
                style={[styles.author, authorStyle]}
            />
        );
    }

    return (
        <View style={[styles.container, style]}>
            <Text style={[styles.title, titleStyle]}>{data.joke}</Text>
            {authorElement}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontFamily: 'Roboto-Medium',
        textAlign: 'center',
        color: GlobalStyles.colors.white,
    },
    author: {
        fontFamily: 'NanumPenOTF',
        textAlign: 'center',
        color: GlobalStyles.colors.white,
    },
});

export default JokeCard;
