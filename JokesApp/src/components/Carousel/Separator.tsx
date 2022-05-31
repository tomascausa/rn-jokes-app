import React from 'react';
import {View, StyleSheet} from 'react-native';

const Separator: React.FC = () => {
    return <View style={styles.container} />;
};

const styles = StyleSheet.create({
    container: {
        width: 10,
        height: 10,
    },
});

export default Separator;
