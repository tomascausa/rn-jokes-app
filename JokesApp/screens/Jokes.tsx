import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View, StyleSheet, SafeAreaView, Pressable} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {Context} from '../store/context';
import {Joke} from '../types/Joke';
import Button from '../components/UI/Button';
import JokeCard from '../components/UI/JokeCard';
import Carousel from '../components/Carousel/Carousel';

const JOKES = [
    {
        id: 'j1',
        message: "Anyway. You're the designer and you know that to do best.",
        author: 'designhumour',
    },
    {
        id: 'j2',
        message:
            "Mmmh. Do you think it will be easy to read? Let's make it bigger 😂",
        author: 'designhumour',
    },
    {
        id: 'j3',
        message: "There's something that doesn't work. But I'm not sure what.",
        author: 'designhumour',
    },
    {
        id: 'j4',
        message: "Anyway. You're the designer and you know that to do best.",
        author: 'designhumour',
    },
    {
        id: 'j5',
        message: "There's something that doesn't work. But I'm not sure what.",
        author: 'designhumour',
    },
    {
        id: 'j6',
        message: "Anyway. You're the designer and you know that to do best.",
        author: 'designhumour',
    },
    {
        id: 'j7',
        message: "There's something that doesn't work. But I'm not sure what.",
        author: 'designhumour',
    },
    {
        id: 'j8',
        message: "Anyway. You're the designer and you know that to do best.",
        author: 'designhumour',
    },
];

const Jokes: React.FC = () => {
    const navigation = useNavigation();
    const context = useContext(Context);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleIndexUpdate = (index: number) => {
        setCurrentIndex(index);
    };

    const handleSaveJoke = () => {
        context.addJoke(JOKES[currentIndex]);
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
                <Carousel
                    items={JOKES}
                    renderItem={(scrollX: any, {item}: {item: Joke}) => (
                        <JokeCard data={item} />
                    )}
                    onIndexUpdate={handleIndexUpdate}
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
    carouselContainer: {
        flex: 1,
        marginTop: 40,
    },
    buttonContainer: {
        marginTop: 40,
        paddingHorizontal: 20,
    },
});

export default Jokes;
