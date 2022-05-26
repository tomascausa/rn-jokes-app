import React from 'react';
import {View, StyleSheet} from 'react-native';

const Separator: React.FC = () => {
    return <View style={styles.container} />;
};

const styles = StyleSheet.create({
    container: {
        width: 20,
        height: 20,
    },
});

export default Separator;
