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
import Button from '../components/UI/Button';
import JokeCard from '../components/UI/JokeCard';
import Carousel from '../components/Carousel/Carousel';
import useJokes from '../hooks/useJokes';

const {width} = Dimensions.get('window');

const Jokes: React.FC = () => {
    const navigation = useNavigation();
    const context = useContext(Context);
    const {jokes, loading, fetchMore} = useJokes();
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleIndexUpdate = (index: number) => {
        setCurrentIndex(index);
    };

    const handleSaveJoke = () => {
        context.addJoke(jokes[currentIndex]);
    };

    const handleFetchMore = () => {
        fetchMore();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    Saved: {context.jokes.length}
                </Text>
                <Pressable
                    style={styles.headerHeart}
                    onPress={() => navigation.navigate('Saved')}>
                    <FontAwesomeIcon icon={faHeart} color={'red'} size={28} />
                </Pressable>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    Things you can say to annoy designers.
                </Text>
            </View>
            <View style={styles.carouselContainer}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" />
                    </View>
                ) : (
                    <Carousel
                        items={jokes}
                        renderItem={(scrollX: any, {item}: {item: Joke}) => (
                            <JokeCard
                                data={item}
                                style={styles.cardContainer}
                                titleStyle={styles.cardTitle}
                                authorStyle={styles.cardAuthor}
                            />
                        )}
                        onIndexUpdate={handleIndexUpdate}
                        onFetchMore={handleFetchMore}
                    />
                )}
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
