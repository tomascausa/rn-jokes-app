import React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import {GlobalStyles} from '../../constants/styles';

interface ButtonProps {
    children: any;
    mode?: string;
    onPress?: () => void;
}

const Button = ({children, mode, onPress}: ButtonProps) => {
    return (
        <View>
            <Pressable
                onPress={onPress}
                style={({pressed}) =>
                    pressed && mode !== 'link' && styles.pressed
                }>
                <View style={mode === 'link' ? styles.link : styles.button}>
                    <Text style={styles.buttonText}>{children}</Text>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
        backgroundColor: GlobalStyles.colors.black,
        borderRadius: 4,
    },
    link: {},
    button: {
        padding: 15,
        borderRadius: 8,
        shadowColor: GlobalStyles.colors.black,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: GlobalStyles.colors.black,
    },
    buttonText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        textAlign: 'center',
        color: GlobalStyles.colors.white,
    },
});

export default Button;
