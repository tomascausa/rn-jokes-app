import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Pressable,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {Context} from '../store/context';
import {Joke} from '../types/Joke';
import {GlobalStyles} from '../constants/styles';
import {CARD_COLORS} from '../utils/colors';
import Button from '../components/UI/Button';
import JokeCard from '../components/UI/JokeCard';
import Carousel from '../components/Carousel/Carousel';
import useJokes from '../hooks/useJokes';

const {width} = Dimensions.get('window');

const Jokes = () => {
    const navigation = useNavigation();
    const context = useContext(Context);
    const {jokes, loading, fetchMore} = useJokes();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [indicatorIndex, setIndicatorIndex] = useState(0);

    const handleRenderJokeCard = (
        scrollX: any,
        {item, index}: {item: Joke; index: number},
    ) => {
        const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
        ];
        const outputRange = ['0deg', '0deg', '20deg'];
        const translateX = scrollX.interpolate({
            inputRange,
            outputRange,
        });

        return (
            <JokeCard
                data={item}
                style={[styles.cardContainer]}
                animatedStyle={{
                    transform: [{rotateZ: translateX}],
                }}
                titleStyle={styles.cardTitle}
                authorStyle={styles.cardAuthor}
                backgroundColor={CARD_COLORS[index % CARD_COLORS.length]}
            />
        );
    };

    const handleIndexUpdate = (index: number) => {
        setCurrentIndex(index);
        setIndicatorIndex(index % 4);
    };

    const handleSaveJoke = () => {
        context.addJoke(jokes[currentIndex]);
    };

    const handleFetchMore = () => {
        fetchMore(jokes);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    Saved: {context.jokes.length}
                </Text>
                <Pressable
                    style={styles.headerHeart}
                    onPress={() => navigation.navigate('SavedJokes')}>
                    <FontAwesomeIcon icon={faHeart} color={'red'} size={28} />
                </Pressable>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    Things you can say to annoy designers.
                </Text>
            </View>
            <View style={styles.carouselContainer}>
                {loading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" />
                    </View>
                )}
                <Carousel
                    items={jokes}
                    isLoading={loading}
                    indicatorIndex={indicatorIndex}
                    renderItem={handleRenderJokeCard}
                    onIndexUpdate={handleIndexUpdate}
                    onFetchMore={handleFetchMore}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button onPress={() => handleSaveJoke()}>Save</Button>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 60,
        paddingVertical: 40,
        marginHorizontal: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },
    headerText: {
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
        fontWeight: '500',
    },
    headerHeart: {
        marginLeft: 8,
    },
    titleContainer: {
        marginTop: 15,
        paddingHorizontal: 25,
    },
    title: {
        fontFamily: 'Roboto-Bold',
        fontSize: 36,
        fontWeight: '700',
        textAlign: 'center',
        lineHeight: 45,
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    carouselContainer: {
        flex: 1,
        marginTop: 40,
    },
    cardContainer: {
        width: width - 50,
        marginHorizontal: 20,
        marginBottom: 30,
        paddingTop: 60,
        paddingBottom: 30,
        paddingHorizontal: 20,
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
        fontSize: 30,
        lineHeight: 42,
    },
    cardAuthor: {
        fontSize: 25,
    },
    buttonContainer: {
        marginTop: 40,
        paddingHorizontal: 20,
    },
});

export default Jokes;
