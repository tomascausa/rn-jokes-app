import React from 'react';
import {Animated, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const Paginator = ({scrollX, itemsQty}: {scrollX: any; itemsQty: number}) => {
    return (
        <Animated.View style={styles.stepperContainer}>
            {Array(itemsQty < 4 ? itemsQty : 4)
                .fill(1)
                .map((_, i) => {
                    const inputRange = [
                        (i - 1) * width,
                        i * width,
                        (i + 1) * width,
                    ];

                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.2, 1, 0.2],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View
                            style={[styles.step, {opacity}]}
                            key={i}
                        />
                    );
                })}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    stepperContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 35,
    },
    step: {
        width: 50,
        height: 5,
        marginHorizontal: 8,
        backgroundColor: 'black',
        borderRadius: 8,
    },
});

export default Paginator;
