import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ActivityIndicator, Image, View, StyleSheet, Picker, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import realmStore from '../../data/realm/RealmStore';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import Images from '../../theme/Images';
import dialogManager from '../../components/dialog/DialogManager';
import { currencyToString } from '../../common/Utils';
import ToolBarSelectFood from './ToolBarSelectFood';
// import ModalDropdown from 'react-native-modal-dropdown';


const limit = 20;
export default ({ navigation, style }) => {
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [category, setCategory] = useState([])
  const [product, setProduct] = useState([])
  const [skip, setSkip] = useState(0)
  const [numColumns, setNumColumns] = useState(1)
  const count = useRef(0)

  const { deviceType, orientaition } = useSelector(state => {
    console.log("useSelector state ", state);
    return state.Common
  });

  useEffect(() => {
    const onOrientationChange = () => {
      dialogManager.showLoading()
      if (orientaition == 'PORTRAIT') {
        setNumColumns(1)
      } else if (orientaition == 'LANDSCAPE') {
        setNumColumns(4)
      }
      dialogManager.hiddenLoading()
    }
    onOrientationChange()
  }, [orientaition])

  useEffect(() => {
    const getCategories = async () => {
      console.log('getCategories');
      let results = await realmStore.queryCategories()
      console.log(JSON.parse(JSON.stringify(results[0])), 'getCategories');
      setCategory(results)
    }
    getCategories()
  }, [])

  const getProducts = useCallback(async () => {
    dialogManager.showLoading();
    console.log('getProducts');
    let results = await realmStore.queryProducts().then(res => res.slice(skip, skip + limit));
    count.current = results.length
    setProduct([...product, ...results])
    setIsLoadMore(false)
    dialogManager.hiddenLoading();
  }, [skip])

  useEffect(() => {
    getProducts()
  }, [getProducts])



  const loadMore = (info) => {
    console.log(info, 'loadMore');
    if (count.current > 0) {
      setIsLoadMore(true)
      setSkip((prevSkip) => prevSkip + limit);
    }
  }

  const renderCateItem = (item) => {
    return orientaition == "LANDSCAPE" ?
      (
        <TouchableOpacity key={item.Id.toString()} style={{ backgroundColor: "white", width: 200, height: "100%", justifyContent: "center", alignItems: "center", borderRadius: 10, marginHorizontal: 5 }}>
          <Text numberOfLines={2} style={{ color: "orange", fontWeight: "bold", textTransform: "uppercase", textAlign: "center", paddingHorizontal: 5 }}>{item.Name}</Text>
        </TouchableOpacity>
      )
      :
      (
        <TouchableOpacity key={item.Id} style={{ backgroundColor: "white", width: 100, height: "100%", justifyContent: "center", alignItems: "center", borderRadius: 10, marginHorizontal: 5 }}>
          <Text numberOfLines={2} style={{ color: "orange", fontWeight: "bold", textTransform: "uppercase", textAlign: "center", paddingHorizontal: 5 }}>{item.Name}</Text>
        </TouchableOpacity>
      )
  }

  const renderProductItem = (item) => {
    return orientaition == "LANDSCAPE" ?
      (
        <TouchableOpacity key={item.Id.toString()} style={{ width: "24%", backgroundColor: "white", marginHorizontal: 3, marginBottom: 10, borderRadius: 10 }} onPress={() => { }}>
          <View style={{}}>
            <Image
              style={{ height: deviceType == "PHONE" ? 100 : 150, width: "100%", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
              source={JSON.parse(item.ProductImages).length > 0 ? { uri: JSON.parse(item.ProductImages)[0].ImageURL } : Images.default_food_image}
            />
            <View style={{ marginLeft: 10 }}>
              <Text numberOfLines={3} style={{ textTransform: "uppercase", fontWeight: "bold", paddingVertical: 5 }}>{item.Name}</Text>
              <Text style={{ paddingVertical: 5, fontStyle: "italic" }}>{currencyToString(item.Price)}</Text>
            </View>
          </View>

        </TouchableOpacity>
      )
      :
      (
        <TouchableOpacity style={{ flex: 1, flexDirection: "row", backgroundColor: "white", paddingVertical: 10, margin: 5, borderRadius: 10 }}>
          <Image
            style={{ height: 70, width: 70, borderRadius: 50 }}
            source={JSON.parse(item.ProductImages).length > 0 ? { uri: JSON.parse(item.ProductImages)[0].ImageURL } : Images.default_food_image}
          />
          <View style={{ flexDirection: "column", flex: 2, marginLeft: 10, justifyContent: "center" }}>
            <Text numberOfLines={3} style={{ textTransform: "uppercase", fontWeight: "bold" }}>{item.Name}</Text>
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
        {/* <View style={{ flex: 1, marginHorizontal: 5 }}>
          <TouchableOpacity style={{ borderRadius: 10, backgroundColor: "orange", height: "100%", justifyContent: "center", }}>
            <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", }}>All</Text>
          </TouchableOpacity>
        </View> */}
        <View style={{ flex: 6, }}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={category}
            renderItem={({ item }) => renderCateItem(item)}
            keyExtractor={item => item.Id}
          />
          {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ flexWrap: "wrap", }}>
              {category.map(item => {
                return renderCateItem(item);
              })}
            </View>
          </ScrollView> */}
        </View>
      </View>
      <View style={{ flex: 5, }}>
        <View style={{ flex: 1, justifyContent: "center", }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={product}
            key={numColumns}
            numColumns={numColumns}
            renderItem={({ item }) => renderProductItem(item)}
            keyExtractor={item => item.Id}
            onEndReachedThreshold={0.5}
            onEndReached={(info) => { loadMore(info) }}
          />
        </View>
      </View>
      {isLoadMore ? <ActivityIndicator color="orange" /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
});
