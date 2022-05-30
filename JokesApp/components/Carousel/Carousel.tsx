import React, {FC} from 'react';
import {View, Animated, StyleSheet, Dimensions} from 'react-native';
import Paginator from './Paginator';

interface Props {
    items: any[];
    renderItem: any;
    onIndexUpdate?: (number: number) => void;
    onFetchMore?: () => void;
}

const {width} = Dimensions.get('window');

const Carousel: FC<Props> = ({
    items,
    renderItem,
    onIndexUpdate,
    onFetchMore,
}) => {
    const scrollX = React.useRef(new Animated.Value(0)).current;

    return (
        <View style={styles.carouselContainer}>
            <Animated.FlatList
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
                onMomentumScrollEnd={event => {
                    if (onIndexUpdate) {
                        let index = Math.ceil(
                            event.nativeEvent.contentOffset.x / width,
                        );
                        onIndexUpdate(index);
                    }
                }}
                onEndReached={() => {
                    if (onFetchMore) {
                        onFetchMore();
                    }
                }}
            />
            <Paginator scrollX={scrollX} itemsQty={items.length} />
        </View>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
    },
});

export default Carousel;
