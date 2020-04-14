import React, { useEffect, useState } from 'react';
import { StatusBar, Image, View, StyleSheet, Button, Text } from 'react-native';
import ToolBarDefault from '../../components/toolbar/ToolBarDefault';
import { HTTPService } from "../../services/HttpService";
import { ApiPath } from "../../services/ApiPath";
import { useFetch } from "../../customHook/useFetch";

<<<<<<< HEAD
//const Realm = require('realm');
=======
>>>>>>> 563edb33a2e0d11cf2fd5496f25f218aa729e163

const Realm = require('realm');
// Define your models and their properties
const CarSchema = {
  name: 'Car',
  properties: {
    make: 'string',
    model: 'string',
    miles: { type: 'int', default: 0 },
  }
};
const PersonSchema = {
  name: 'Person',
  properties: {
    name: 'string',
    birthday: 'date',
    cars: 'Car[]', // a list of Cars
    picture: 'data?'  // optional property
  }
};

export default ({ navigation, style }) => {

<<<<<<< HEAD
  //useEffect(() => {
  //   Realm.open({ schema: [CarSchema, PersonSchema] })
  //     .then(realm => {
  //       // Create Realm objects and write to local storage
  //       realm.write(() => {
  //         const myCar = realm.create('Car', {
  //           make: 'Honda',
  //           model: 'Civic',
  //           miles: 1000,
  //         });
  //         myCar.miles += 20; // Update a property value
  //       });

  //       // Query Realm for all cars with a high mileage
  //       const cars = realm.objects('Car').filtered('miles > 1000');
  //       alert(cars.length)
  //       // Will return a Results object with our 1 car
  //       cars.length // => 1
=======
  // const [data, loading] = useFetch(
  //   "https://jsonplaceholder.typicode.com/photos?albumId=1"
  // );

  useEffect(() => {
    // const getServerEvent = () => {
    //   new HTTPService().setPath(ApiPath.SERVEREVENTS).GET().then(res => {
    //     console.log(res, 'aaaaaaaaaaaaaaaaaaaaaaaaa');
    //   })
    // }
    // getServerEvent();
    console.log(new HTTPService().setPath(ApiPath.SERVEREVENTS),'ss');
    
  },[])

  useEffect(() => {
    Realm.open({ schema: [CarSchema, PersonSchema] })
      .then(realm => {
        // Create Realm objects and write to local storage
        realm.write(() => {
          const myCar = realm.create('Car', {
            make: 'Honda',
            model: 'Civic',
            miles: 1000,
          });
          myCar.miles += 20; // Update a property value
        });

        // Query Realm for all cars with a high mileage
        const cars = realm.objects('Car').filtered('miles > 1000');
        // alert(cars.length)
        // Will return a Results object with our 1 car
        cars.length // => 1
>>>>>>> 563edb33a2e0d11cf2fd5496f25f218aa729e163

  //       // Add another car
  //       realm.write(() => {
  //         const myCar = realm.create('Car', {
  //           make: 'Ford',
  //           model: 'Focus',
  //           miles: 2000,
  //         });
  //       });

  //       // Query results are updated in realtime
  //       cars.length // => 2

<<<<<<< HEAD
  //       // Remember to close the realm when finished.
  //       realm.close();
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, [])
  // let sibling = new RootSiblings(<View
  //   style={{ top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'red' }}
  // />);
  // let dialog = new DialogManager();
  //  const [count, setCount] = React.useState(0);
=======
        // Remember to close the realm when finished.
        realm.close();
      })
      .catch(error => {
        console.log(error);
      });
  }, [])
>>>>>>> 563edb33a2e0d11cf2fd5496f25f218aa729e163

  const clickRightIcon = () => {
    navigation.openDrawer();
  }

  const clickLeftIcon = () => {
    console.log("A");

  }
  //  const [count, setCount] = React.useState(0);
  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <Button onPress={() => setCount(c => c + 1)} title="Update count" />
  //     ),
  //   });
  // }, [navigation, setCount]);
  return (
    <View>
      <ToolBarDefault
        navigation={navigation}
        title="Main"
        rightIcon="menu"
        clickRightIcon={clickRightIcon}
        leftIcon="refresh"
        clickLeftIcon={clickLeftIcon}
      />
      <View></View>
    </View>
  );
};
