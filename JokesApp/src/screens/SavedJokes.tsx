import React, {useContext} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    FlatList,
    Text,
    Dimensions,
} from 'react-native';
import {Context} from '../store/context';
import {Joke} from '../types/Joke';
import {GlobalStyles} from '../constants/styles';
import {CARD_COLORS} from '../utils/colors';
import JokeCard from '../components/UI/JokeCard';
import Separator from '../components/Carousel/Separator';

const {width} = Dimensions.get('window');

const Saved = () => {
    const context = useContext(Context);

    return (
        <SafeAreaView
            style={[
                styles.container,
                context.jokes.length === 0 ? styles.emptyContainer : null,
            ]}>
            {context.jokes.length === 0 ? (
                <Text style={styles.emptyMessage}>No saved jokes found</Text>
            ) : (
                <FlatList
                    data={context.jokes}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={Separator}
                    renderItem={({
                        item,
                        index,
                    }: {
                        item: Joke;
                        index: number;
                    }) => (
                        <JokeCard
                            data={item}
                            style={styles.cardContainer}
                            titleStyle={styles.cardTitle}
                            authorStyle={styles.cardAuthor}
                            itsRemovable={true}
                            backgroundColor={
                                CARD_COLORS[index % CARD_COLORS.length]
                            }
                        />
                    )}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        marginHorizontal: 20,
    },
    cardContainer: {
        maxWidth: width * 0.5 - 30,
        minHeight: 200,
        marginHorizontal: 5,
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
    cardTitle: {
        fontSize: 15,
        lineHeight: 20,
    },
    cardAuthor: {
        marginTop: 30,
        fontSize: 12,
    },
    emptyContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyMessage: {
        fontFamily: 'Roboto-Medium',
        fontSize: 25,
        textAlign: 'center',
    },
});

export default Saved;
