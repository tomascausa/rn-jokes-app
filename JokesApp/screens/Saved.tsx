import React, {useContext} from 'react';
import {StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {Context} from '../store/context';
import {Joke} from '../types/Joke';
import JokeCard from '../components/UI/JokeCard';
import Separator from '../components/Carousel/Separator';

const Saved: React.FC = () => {
    const context = useContext(Context);

    return (
        <SafeAreaView style={styles.container}>
            <FlratList
                data={context.jokes}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={Separator}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 40,
        paddingHorizontal: 15,
    },
});

export default Saved;
