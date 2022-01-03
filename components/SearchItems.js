import {FlatList, Spinner} from 'native-base';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {searchNextItems, selectItem} from '../features/itemSlice';
import GameCard from '../components/GameCard';
import AnimeCard from '../components/AnimeCard';

export default function SearchItems({data, navigation, type, search}) {
  const {lastSearchItem, searchLastVisible} = useSelector(selectItem);
  const dispatch = useDispatch();
  const getNextSearchItems = async () => {
    if (!lastSearchItem) {
      dispatch(
        searchNextItems({
          type: type,
          search: search,
          startAfter: searchLastVisible,
          lastItem: lastSearchItem,
        }),
      );
    }
  };

  return (
    <FlatList
      data={data}
      renderItem={({item}) =>
        type === 'anime' ? (
          <AnimeCard navigation={navigation} item={item} />
        ) : (
          <GameCard navigation={navigation} item={item} />
        )
      }
      keyExtractor={item => item.id}
      onEndReached={() => getNextSearchItems()}
      onEndReachedThreshold={0.01}
      scrollEventThrottle={150}
      ListFooterComponent={!lastSearchItem && <Spinner />}
    />
  );
}
