import React, {useContext} from 'react';
import {
    Text,
    View,
    StyleSheet,
    StyleProp,
    ViewStyle,
    TextStyle,
    Pressable,
    Animated,
} from 'react-native';
import {GlobalStyles} from '../../constants/styles';
import {Joke} from '../../types/Joke';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {Context} from '../../store/context';

interface JokeCardProps {
    data: Joke;
    style?: StyleProp<ViewStyle>;
    animatedStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    authorStyle?: StyleProp<TextStyle>;
    itsRemovable?: boolean;
    backgroundColor?: string;
}

interface AuthorProps {
    label: string;
    style: any;
}

const Author = ({label, style}: AuthorProps) => {
    return <Text style={style}>@{label}</Text>;
};

const JokeCard = ({
    data,
    style,
    animatedStyle,
    titleStyle,
    authorStyle,
    itsRemovable,
    backgroundColor,
}: JokeCardProps) => {
    const context = useContext(Context);
    let authorElement;
    let removeIconElement;

    const handleRemoveJoke = (id: string) => {
        context.removeJoke(id);
    };

    if (data.permalink) {
        authorElement = (
            <Author
                label={'designhumor'}
                style={[styles.author, authorStyle]}
            />
        );
    }

    if (itsRemovable) {
        removeIconElement = (
            <View style={styles.trashIcon}>
                <Pressable onPress={handleRemoveJoke.bind(this, data.id)}>
                    <FontAwesomeIcon
                        icon={faTrashCan}
                        color={'white'}
                        size={15}
                    />
                </Pressable>
            </View>
        );
    }

    return (
        <View>
            <Animated.View
                style={[
                    animatedStyle,
                    styles.container,
                    style,
                    {backgroundColor, shadowColor: backgroundColor},
                ]}>
                <Text style={[styles.title, titleStyle]}>{data.joke}</Text>
                {authorElement}
                {removeIconElement}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
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
    trashIcon: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
});

export default JokeCard;
