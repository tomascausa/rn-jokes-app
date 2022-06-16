import React, {useRef} from 'react';
import {View, Animated, StyleSheet, ViewToken} from 'react-native';
import Paginator from './Paginator';

interface CarouselProps {
    items: any[];
    renderItem: any;
    isLoading: boolean;
    indicatorIndex: number;
    onIndexUpdate?: (number: number) => void;
    onFetchMore?: () => void;
}

const Carousel = ({
    items,
    renderItem,
    isLoading = false,
    indicatorIndex,
    onIndexUpdate,
    onFetchMore,
}: CarouselProps) => {
    const scrollX = React.useRef(new Animated.Value(0)).current;

    const onEndReached = () => {
        if (onFetchMore) {
            onFetchMore();
        }
    };

    const onViewableItemsChanged = React.useRef(
        ({changed}: {changed: ViewToken[]}) => {
            if (changed && changed.length > 0 && onIndexUpdate) {
                onIndexUpdate(changed[0].index || 0);
            }
        },
    );

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 90,
        waitForInteraction: true,
        minimumViewTime: 5,
    });

    return (
        <View
            style={[
                styles.carouselContainer,
                isLoading ? styles.carouselLoading : null,
            ]}>
            <Animated.FlatList
                testID={'flatList'}
                data={items}
                renderItem={renderItem.bind(this, scrollX)}
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={64}
                pagingEnabled
                keyExtractor={(_, index) => index.toString()}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: false},
                )}
                onViewableItemsChanged={onViewableItemsChanged.current}
                viewabilityConfig={viewabilityConfig.current}
                onEndReached={onEndReached.bind(this)}
            />
            {!isLoading && <Paginator currentIndex={indicatorIndex} />}
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
