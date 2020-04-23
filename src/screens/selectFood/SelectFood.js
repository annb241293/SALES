import React, { useEffect, useState, useRef, useCallback } from 'react';
import { StatusBar, Image, View, StyleSheet, Button, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import realmStore from '../../data/realm/RealmStore';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import Images from '../../theme/Images';
import dialogManager from '../../components/dialog/DialogManager';
import { currencyToString } from '../../common/Utils';
import ToolBarSelectFood from './ToolBarSelectFood';

const limit = 40;
export default ({ navigation, style }) => {
  const [isLoadMore, setIsLoadMore] = useState(true)
  const [category, setCategory] = useState([])
  const [product, setProduct] = useState([])
  const [skip, setSkip] = useState(0)
  const [numColumns, setNumColumns] = useState(1)
  const isMount = useRef(true)

  const { deviceType, orientaition } = useSelector(state => {
    console.log("useSelector state ", state);
    return state.Common
  });
  useEffect(() => {
    onOrientationChange = () => {
      if (orientaition == 'PORTRAIT') {
        setNumColumns(1)
      } else if (orientaition == 'LANDSCAPE') {
        setNumColumns(4)
      }
    }
    onOrientationChange()
  }, [orientaition])

  useEffect(() => {
    dialogManager.showLoading()
    const getCategories = async () => {
      console.log('getCategories');
      let results = await realmStore.queryCategories()
      setCategory(results)
    }
    getCategories()
    dialogManager.hiddenLoading()
  }, [])

  const getProducts = useCallback(async () => {
    dialogManager.showLoading()
    console.log('getProducts');
    let results = await realmStore.queryProducts();
    setProduct([...product, ...results])
    dialogManager.hiddenLoading()
  }, [skip])

  useEffect(() => {
    getProducts()
  }, [getProducts])



  const loadMore = () => {
    setSkip((prevSkip) => prevSkip + limit)
  }

  const renderCateItem = (item) => {
    return orientaition == "LANDSCAPE" ?
      (
        <TouchableOpacity key={item.Id} style={{ backgroundColor: "white", width: 100, height: "100%", justifyContent: "center", alignItems: "center", borderRadius: 10, marginHorizontal: 5 }}>
          <Text numberOfLines={1} style={{ color: "orange", fontWeight: "bold", textTransform: "uppercase" }}>{item.Name}</Text>
        </TouchableOpacity>
      )
      :
      (
        <TouchableOpacity key={item.Id} style={{ backgroundColor: "white", width: 100, height: "100%", justifyContent: "center", alignItems: "center", borderRadius: 10, marginHorizontal: 5 }}>
          <Text numberOfLines={1} style={{ color: "orange", fontWeight: "bold", textTransform: "uppercase" }}>{item.Name}</Text>
        </TouchableOpacity>
      )
  }

  const renderProductItem = (item) => {
    return orientaition == "LANDSCAPE" ?
      (
        <TouchableOpacity style={{ width: "24%", backgroundColor: "white", marginHorizontal: 3, marginBottom: 10, borderRadius: 10 }} onPress={() => { }}>
          <View style={{}}>
            <Image
              style={{ height: 100, width: "100%", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
              source={Images.default_food_image}
            />
            <Text numberOfLines={1} style={{ textTransform: "uppercase", }}>{item.Name}</Text>
            <Text style={{ paddingVertical: 5, fontStyle: "italic" }}>{currencyToString(item.Price)}</Text>
          </View>

        </TouchableOpacity>
      )
      :
      (
        <TouchableOpacity style={{ flex: 1, flexDirection: "row", backgroundColor: "white", paddingVertical: 10, marginVertical: 5, borderRadius: 10 }}>
          <Image
            style={{ height: 70, width: 70, borderRadius: 50 }}
            source={JSON.parse(item.ProductImages).length > 0 ? { uri: JSON.parse(item.ProductImages)[0].ImageURL } : Images.default_food_image}
          />
          <View style={{ flexDirection: "column", flex: 2, marginLeft: 10, justifyContent: "center" }}>
            <Text numberOfLines={3} style={{ textTransform: "uppercase", }}>{item.Name}</Text>
            <Text style={{ paddingVertical: 5, fontStyle: "italic" }}>{currencyToString(item.Price)}</Text>
          </View>
          <View style={{ flex: 1.5 }}></View>
        </TouchableOpacity>
      );
  }

  return (
    <View style={{ flex: 1, }}>
      <ToolBarSelectFood
      />
      <View style={{ flex: orientaition == 'LANDSCAPE' ? 1 : 0.5, flexDirection: "row", marginVertical: 5, }}>
        <View style={{ flex: 6, }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ flexWrap: "wrap", }}>
              {category.map(item => {
                return renderCateItem(item);
              })}
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={{ flex: 5, }}>
        <View style={{ flex: 1 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={product}
            key={numColumns}
            numColumns={numColumns}
            renderItem={({ item }) => renderProductItem(item)}
            keyExtractor={item => item.Id}
            onEndReached={(info) => { loadMore() }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
});