import React, {useContext} from 'react';
import {
    Text,
    View,
    StyleSheet,
    StyleProp,
    ViewStyle,
    TextStyle,
    Pressable,
} from 'react-native';
import {GlobalStyles} from '../../constants/styles';
import {Joke} from '../../types/Joke';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {Context} from '../../store/context';

export type JokeCardProps = {
    data: Joke;
    style?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    authorStyle?: StyleProp<TextStyle>;
    itsRemovable?: boolean;
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
    itsRemovable = false,
}) => {
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
        <View style={[styles.container, style]}>
            <Text style={[styles.title, titleStyle]}>{data.joke}</Text>
            {authorElement}
            {removeIconElement}
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
