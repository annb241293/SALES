import React, { useEffect, useState } from 'react';
import { StatusBar, Image, View, StyleSheet, Button, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import ToolBarDefault from '../../components/toolbar/ToolBarDefault';
import { HTTPService, ApiPath } from "../../data/services/HttpClient";
import { useFetch } from "../../customHook/useFetch";

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
      <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity style={styles.categoryItem}>
          <Text>tat ca</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem}>
          <Text>tat ca</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem}>
          <Text>tat ca</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem}>
          <Text>tat ca</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem}>
          <Text>tat ca</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem}>
          <Text>tat ca</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem}>
          <Text>tat ca</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem}>
          <Text>tat ca</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ marginTop: 20 }}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
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
        </View>
      </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  categoryItem: { alignItems: "center", backgroundColor: "white", paddingVertical: 10, borderRadius: 5, margin: 5, width: "22%" },
  foodItem: { backgroundColor: "white", alignItems: "center", borderWidth: 1, borderColor: "black", paddingVertical: 10, borderRadius: 5, margin: 6, width: "30%" }
});
