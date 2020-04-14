import React, { useEffect } from 'react';
import { StatusBar, Image, View, StyleSheet, Button, Text } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import DialogManager from '../../components/dialog/DialogManager';
// import { RootSiblingPortal, RootSiblings } from 'react-native-root-siblings';

//const Realm = require('realm');

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

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <Button onPress={() => setCount(c => c + 1)} title="Update count" />
  //     ),
  //   });
  // }, [navigation, setCount]);
  return (
    // <RootSiblingPortal>
    <View
      // color="#88B04B"
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}>
      {/* <StatusBar /> */}
      {/* <Icon
          name='ios-person'
          color="blue"
          size={25}
        /> */}
      <Text>
        New video comming soon
      </Text>
      <Button
        title="nba"
      // onPress={() => {
      //   sibling.update(<View
      //     style={{ top: 10, right: 10, bottom: 10, left: 10, backgroundColor: 'blue' }}
      //   />);
      //   console.log('dialog');
      // }}
      ></Button>
    </View>
    // </RootSiblingPortal>
  );
};
