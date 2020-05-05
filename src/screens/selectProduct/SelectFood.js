import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ActivityIndicator, Image, View, StyleSheet, Picker, Text, ScrollView, Dimensions, TouchableOpacity, CheckBox } from 'react-native';
import realmStore from '../../data/realm/RealmStore';
import { FlatList } from 'react-native-gesture-handler';
import dialogManager from '../../components/dialog/DialogManager';
import ProductsItem from './ProductsItem';
import { Constant } from '../../common/Constant';

export default (props) => {
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [category, setCategory] = useState([])
  const [product, setProduct] = useState([])
  const [skip, setSkip] = useState(0)
  const [listCateId, setListCateId] = useState([])
  const [listProducts, setListProducts] = useState([])
  const count = useRef(0)
  console.log(props.valueSearch, 'valueSearch');


  useEffect(() => {
    setListProducts(props.listProducts)
  }, [props.listProducts])

  useEffect(() => {
    const getCategories = async () => {
      let newCategories = [];
      console.log('getCategories');
      let results = await realmStore.queryCategories()
      results.forEach(item => {
        newCategories.push(item)
      })
      setCategory(newCategories)
    }
    getCategories()
  }, [])

  const getProducts = useCallback(async () => {
    let newProducts = [];
    dialogManager.showLoading();
    console.log('getProducts');
    let results = await realmStore.queryProducts().then(res => res.slice(skip, skip + Constant.LOAD_LIMIT));
    count.current = results.length
    results.forEach(item => {
      item.Quantity = 0;
      newProducts.push(item)
    })
    setProduct([...product, ...newProducts])
    console.log("getProducts newProducts ", newProducts);
    setIsLoadMore(false)
    dialogManager.hiddenLoading();
  }, [skip])


  useEffect(() => {
    getProducts()
  }, [getProducts])


  useEffect(() => {
    if (listCateId.length == 0) {
      setSkip(0)
    } else {
      let filterProducts = product.filter(product => listCateId.includes(product.Id))
      setProduct(filterProducts)
    }
  }, [listCateId])

  const loadMore = (info) => {
    console.log(info, 'loadMore');
    if (count.current > 0) {
      setIsLoadMore(true)
      setSkip((prevSkip) => prevSkip + Constant.LOAD_LIMIT);
    }
  }


  const onClickCate = (item, index) => {
    console.log(index);

    if (item.Id == listCateId[0]) {
      setListCateId([])
    } else {
      setListCateId([item.Id])
    }
  }

  const onClickProduct = (item, index) => {
    let exist = false;
    listProducts.forEach(listProduct => {
      if (listProduct.Id === item.Id) {
        listProduct.Quantity++
        exist = true;
      }
    })
    if (exist) {
      props.outputListProducts([...listProducts])
    } else {
      item.Quantity = 1
      listProducts.push(item)
      props.outputListProducts([...listProducts])
    }
    setProduct([...product])
  }

  const handleButtonIncrease = (item, index) => {
    console.log('handleButtonIncrease', item, index);
    product[index].Quantity += 1;
    setProduct([...product])
  }

  const handleButtonDecrease = (item, index) => {
    console.log('handleButtonIncrease', item, index);
    product[index].Quantity -= 1;
    setProduct([...product])
  }

  const CheckItemExistInProducts = (arr, arrItem) => {
    let exist = false
    arr.forEach(item => {
      if (item.Id == arrItem.Id) {
        exist = true
      }
    })
    return exist
  }


  const renderCateItem = (item, index) => {
    return (
      <TouchableOpacity onPress={() => onClickCate(item, index)} key={item.Id.toString()} style={[styles.renderCateItem, { backgroundColor: item.Id == listCateId[0] ? "orange" : "white" }]}>
        <Text numberOfLines={2} style={[styles.textRenderCateItem, { color: item.Id == listCateId[0] ? "white" : "orange" }]}>{item.Name}</Text>
      </TouchableOpacity>
    );
  }



  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.5, flexDirection: "row", marginVertical: 10, marginHorizontal: 2 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            extraData={listCateId}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={category}
            renderItem={({ item, index }) => renderCateItem(item, index)}
            keyExtractor={item => item.Id}
          />
        </View>
      </View>

      <View style={{ flex: 5, }}>
        <View style={{ flex: 1, }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={product}
            key={props.numColumns}
            numColumns={props.numColumns}
            renderItem={({ item, index }) => <ProductsItem
              CheckItemExistInProducts={CheckItemExistInProducts(listProducts, item)}
              item={item}
              index={index}
              onClickProduct={onClickProduct}
              handleButtonDecrease={handleButtonDecrease}
              handleButtonIncrease={handleButtonIncrease}
            />}
            keyExtractor={item => item.Id}
            extraData={product.Quantity}
            onEndReached={(info) => { loadMore(info) }}
          />
        </View>
      </View>
      {isLoadMore ? <ActivityIndicator style={{ position: "absolute", right: 5, bottom: 5 }} color="orange" /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  renderCateItem: { justifyContent: "center", alignItems: "center", paddingHorizontal: 5, marginLeft: 5, width: 150 },
  textRenderCateItem: { fontWeight: "bold", textTransform: "uppercase", textAlign: "center", },
  button: { borderWidth: 1, padding: 20, borderRadius: 10 },
});
