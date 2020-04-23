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







// import React, { useEffect, useState } from 'react';
// import { StatusBar, Image, View, StyleSheet, Button, Text, ScrollView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
// import ToolBarDefault from '../../components/toolbar/ToolBarDefault';
// import ToolBarSelectFood from './ToolBarSelectFood';
// import { HTTPService, URL, getHeaders } from "../../data/services/HttpService";
// import { ApiPath } from "../../data/services/ApiPath";
// import { FlatList } from 'react-native-gesture-handler';
// import { useSelector } from 'react-redux';
// import Images from '../../theme/Images';

// let numColumns = 3;

// export default ({ navigation, style }) => {
//   const [loading, setLoading] = useState(true)
//   const [category, setCategory] = useState([])
//   const [product, setProduct] = useState([])

//   const { deviceType, orientaition } = useSelector(state => {
//     console.log("useSelector state ", state);
//     return state.Common
//   });

//   useEffect(() => {
//     const getCategories = () => {
//       let cateParams = {};
//       new HTTPService().setPath('api/categories/sync').GET(cateParams).then(res => {
//         res.Data.splice(0, 1, { Id: -1, Name: "All" })
//         const results = res.Data.map(item => {
//           item.isSelected = false;
//           return item
//         })
//         setCategory(results)
//       })
//     }
//     const getProducts = () => {
//       let productParams = {};
//       new HTTPService().setPath('api/products/sync').GET(productParams).then(res => {
//         const results = res.Data.map(item => {
//           item.quantity = 0;
//           return item
//         })
//         console.log(res.Data[0], 'sadasdasdasd');
//         setProduct(results)
//         setLoading(false)
//       })
//     }
//     getCategories();
//     getProducts();
//   }, [])

//   const renderCateItem = (item) => {
//     return (
//       <TouchableOpacity key={item.Id} style={{ backgroundColor: item.isSelected ? "orange" : "white", margin: 5, justifyContent: "center", alignItems: "center", borderRadius: 10, paddingVertical: 20, marginTop: 0 }}
//         onPress={() => {
//           const index = getIndex(category, item)
//           category[index].isSelected = !category[index].isSelected;
//           setCategory([...category])
//         }}
//       >
//         <Text numberOfLines={3} style={{ color: !item.isSelected ? "orange" : "white", textAlign: "center", fontWeight:"bold" }}>{item.Name}</Text>
//       </TouchableOpacity>
//     );
//   }

//   const getIndex = (arr, item) => {
//     const index = arr.findIndex(
//       arrItem => arrItem.Id == item.Id
//     );
//     return index;
//   }

//   const handleButtonIncrease = (item) => {
//     const index = getIndex(product, item)
//     product[index].quantity += 1;
//     setProduct([...product])
//   }

//   const handleButtonDecrease = (item) => {
//     const index = getIndex(product, item);
//     product[index].quantity -= 1;
//     setProduct([...product])
//   }

//   const renderProductItem = (item) => {
//     return (
//       <TouchableWithoutFeedback style={{}} onPress={() => handleButtonIncrease(item)}>
//         <View style={{ alignItems: "center", backgroundColor: "white", flex: 1, margin: 5, marginTop: 0, marginBottom: 20, }}>
//           <Image
//             style={{ height: 100, width: '100%', alignItems: "center", }}
//             source={item.ProductImages.length > 0 ? { uri: item.ProductImages[0].ImageURL } : Images.default_food_image}
//           />
//           <Text>{item.Name}</Text>
//           <Text>{item.Price}</Text>
//           {item.quantity > 0 ?
//             <View style={{ position: "absolute", right: 0, justifyContent: "space-between", flexDirection: "row", width: "100%", top: 0 }}>
//               <TouchableOpacity onPress={() => handleButtonIncrease(item)}>
//                 <Text style={{ backgroundColor: "orange", textAlign: "center", padding: 10 }}>+</Text>
//               </TouchableOpacity>
//               <Text style={{ borderWidth: 1, padding: 10 }}>{item.quantity}</Text>
//               <TouchableOpacity onPress={() => handleButtonDecrease(item)}>
//                 <Text style={{ backgroundColor: "orange", textAlign: "center", padding: 10 }}>-</Text>
//               </TouchableOpacity>
//             </View>
//             :
//             null}
//         </View>

//       </TouchableWithoutFeedback>
//     );
//   }

//   return (
//     <View style={{ flex: 1, }}>
//       <ToolBarSelectFood
//         product={product}
//         navigation={navigation}
//         title="Select Food"
//         rightIcon="keyboard-backspace"
//         clickRightIcon={() => { navigation.goBack() }}
//         leftIcon="cart"
//         clickLeftIcon={() => { }}
//       />
//       <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
//         <View style={{ flex: 1, }}>
//           <FlatList
//             removeClippedSubviews={true}
//             extraData={category.isSelected}
//             keyExtractor={item => item.Id}
//             showsVerticalScrollIndicator={false}
//             data={category}
//             renderItem={({ item }) => renderCateItem(item)} />
//         </View>
//         {loading ?
//           <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
//             <Text>loading</Text>
//           </View>
//           :
//           <View style={{ flex: 3 }}>
//             <FlatList
//               removeClippedSubviews={true}
//               showsVerticalScrollIndicator={false}
//               keyExtractor={item => item.Id}
//               numColumns={numColumns}
//               data={product}
//               extraData={product.quantity}
//               renderItem={({ item }) => renderProductItem(item)}
//             />
//           </View>}
//       </View>



//     </View>

//   );
// };

// const styles = StyleSheet.create({
// });
