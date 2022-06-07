import React, {FC, useState} from 'react';
import {View, Animated, StyleSheet, Dimensions} from 'react-native';
import Paginator from './Paginator';

interface CarouselProps {
    items: any[];
    renderItem: any;
    isLoading: boolean;
    onIndexUpdate?: (number: number) => void;
    onFetchMore?: () => void;
}

const {width} = Dimensions.get('window');

const Carousel = ({
    items,
    renderItem,
    isLoading = false,
    onIndexUpdate,
    onFetchMore,
}: CarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const [
        onEndReachedCalledDuringMomentum,
        setOnEndReachedCalledDuringMomentum,
    ] = useState(true);

    const onEndReached = () => {
        if (!onEndReachedCalledDuringMomentum && onFetchMore) {
            if (onFetchMore) {
                onFetchMore();
            }
            setOnEndReachedCalledDuringMomentum(true);
        }
    };

    return (
        <View
            style={[
                styles.carouselContainer,
                isLoading ? styles.carouselLoading : null,
            ]}>
            <Animated.FlatList
                testID={'carousel__flat-list'}
                data={items}
                renderItem={renderItem.bind(this, scrollX)}
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={32}
                pagingEnabled
                keyExtractor={(_, index) => index.toString()}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: false},
                )}
                onEndReachedThreshold={0.3}
                onMomentumScrollBegin={() => {
                    setOnEndReachedCalledDuringMomentum(false);
                }}
                onMomentumScrollEnd={event => {
                    if (onIndexUpdate) {
                        let index = Math.ceil(
                            event.nativeEvent.contentOffset.x / width,
                        );

                        if (currentIndex < 3) {
                            setCurrentIndex(currentIndex + 1);
                        } else {
                            setCurrentIndex(0);
                        }

                        onIndexUpdate(index);
                    }
                }}
                onEndReached={onEndReached.bind(this)}
            />
            {!isLoading && <Paginator currentIndex={currentIndex} />}
        </View>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
    },
    carouselLoading: {
        opacity: 0.3,
    },
});

export default Carousel;
