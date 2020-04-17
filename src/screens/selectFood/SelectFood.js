import React, { useEffect, useState } from 'react';
import { StatusBar, Image, View, StyleSheet, Button, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import ToolBarDefault from '../../components/toolbar/ToolBarDefault';
import { HTTPService, ApiPath } from "../../data/services/HttpClient";
import { useFetch } from "../../customHook/useFetch";


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const screen = Dimensions.get("screen");

export default ({ navigation, style }) => {
  const [data, setData] = useState([])
  useEffect(() => {
    console.log(Dimensions.get('window').height, 'ss');
  }, [])

  const clickRightIcon = () => {
    navigation.openDrawer();
  }

  const clickLeftIcon = () => {
    console.log(screen);

  };
  return (
    <View style={{ flex: 1, backgroundColor: "orange" }}>
      <ToolBarDefault
        navigation={navigation}
        title="Select Food"
        rightIcon="menu"
        clickRightIcon={clickRightIcon}
        leftIcon="refresh"
        clickLeftIcon={clickLeftIcon}
      />
      <View style={{ flex: 1 ,flexWrap: "wrap"}}>
        <ScrollView
          horizontal={true}>
          <View style={{ flexDirection: "row", }}>
            {DATA.map(item => {
              return (<TouchableOpacity style={{ padding: 5, backgroundColor: "red", margin: 5, height: "20%",  }}>
                <Text>tat ca</Text>
              </TouchableOpacity>)
            })}
          </View>
        </ScrollView>
      </View>
      <View style={{ flex: 5, backgroundColor: "red" }}>
        <ScrollView style={{}}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "center", flex: 1 }}>
            <TouchableOpacity style={styles.foodItem} onPress={() => { }}>
              <Image
                source={{
                  uri: 'https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png',
                  height: 60,
                  width: "80%",
                }}
              />
              <Text>tat ca</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.foodItem}>
              <Image
                source={{
                  uri: 'https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png',
                  height: 60,
                  width: "80%",
                }}
              />
              <Text>tat ca</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.foodItem}>
              <Image
                source={{
                  uri: 'https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png',
                  height: 60,
                  width: "80%",
                }}
              />
              <Text>tat ca</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.foodItem}>
              <Image
                source={{
                  uri: 'https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png',
                  height: 60,
                  width: "80%",
                }}
              />
              <Text>tat ca</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.foodItem}>
              <Image
                source={{
                  uri: 'https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png',
                  height: 60,
                  width: "80%",
                }}
              />
              <Text>tat ca</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.foodItem}>
              <Image
                source={{
                  uri: 'https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png',
                  height: 60,
                  width: "80%",
                }}
              />
              <Text>tat ca</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.foodItem}>
              <Image
                source={{
                  uri: 'https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png',
                  height: 60,
                  width: "80%",
                }}
              />
              <Text>tat ca</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.foodItem}>
              <Image
                source={{
                  uri: 'https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png',
                  height: 60,
                  width: "80%",
                }}
              />
              <Text>tat ca</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.foodItem}>
              <Image
                source={{
                  uri: 'https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png',
                  height: 60,
                  width: "80%",
                }}
              />
              <Text>tat ca</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.foodItem}>
              <Image
                source={{
                  uri: 'https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png',
                  height: 60,
                  width: "80%",
                }}
              />
              <Text>tat ca</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.foodItem}>
              <Image
                source={{
                  uri: 'https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png',
                  height: 60,
                  width: "80%",
                }}
              />
              <Text>tat ca</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.foodItem}>
              <Image
                source={{
                  uri: 'https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png',
                  height: 60,
                  width: "80%",
                }}
              />
              <Text>tat ca</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.foodItem}>
              <Image
                source={{
                  uri: 'https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png',
                  height: 60,
                  width: "80%",
                }}
              />
              <Text>tat ca</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.foodItem}>
              <Image
                source={{
                  uri: 'https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png',
                  height: 60,
                  width: "80%",
                }}
              />
              <Text>tat ca</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.foodItem}>
              <Image
                source={{
                  uri: 'https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png',
                  height: 60,
                  width: "80%",
                }}
              />
              <Text>tat ca</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.foodItem}>
              <Image
                source={{
                  uri: 'https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png',
                  height: 60,
                  width: "80%",
                }}
              />
              <Text>tat ca</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.foodItem}>
              <Image
                source={{
                  uri: 'https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png',
                  height: 60,
                  width: "80%",
                }}
              />
              <Text>tat ca</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.foodItem}>
              <Image
                source={{
                  uri: 'https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png',
                  height: 60,
                  width: "80%",
                }}
              />
              <Text>tat ca</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>


    </View>

  );
};

const styles = StyleSheet.create({
  categoryItem: { alignItems: "center", backgroundColor: "white", paddingVertical: 10, borderRadius: 5, margin: 5, width: "22%" },
  foodItem: { backgroundColor: "white", alignItems: "center", borderWidth: 1, borderColor: "black", paddingVertical: 10, borderRadius: 5, margin: 6, width: "30%" }
});
