import React from 'react';
import {Animated, StyleSheet} from 'react-native';

interface PaginatorProps {
    currentIndex: number;
}

const Paginator = ({currentIndex}: PaginatorProps) => {
    return (
        <Animated.View style={styles.stepperContainer}>
            <>
                {Array(4)
                    .fill(1)
                    .map((_, i) => {
                        return (
                            <Animated.View
                                style={[
                                    styles.step,
                                    i === currentIndex
                                        ? styles.activeStep
                                        : null,
                                ]}
                                key={i}
                            />
                        );
                    })}
            </>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    stepperContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    step: {
        width: 50,
        height: 5,
        marginHorizontal: 8,
        backgroundColor: 'black',
        borderRadius: 8,
        opacity: 0.3,
    },
    activeStep: {
        opacity: 1,
    },
});

export default Paginator;
