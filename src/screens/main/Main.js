import React from 'react';
import { StatusBar, Image, View, StyleSheet, Button, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import DialogManager from '../../components/dialog/DialogManager';
import { RootSiblingPortal, RootSiblings } from 'react-native-root-siblings';


export default ({ navigation, style }) => {
  let sibling = new RootSiblings(<View
    style={{ top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'red' }}
  />);
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
    <RootSiblingPortal>
      <View
        // color="#88B04B"
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          ...style,
        }}>
        {/* <StatusBar /> */}
        <Icon
          name='ios-person'
          color="blue"
          size={25}
        />
        <Text>
          New video comming soon
      </Text>
        <Button
          title="nba"
          onPress={() => {
            sibling.update(<View
              style={{ top: 10, right: 10, bottom: 10, left: 10, backgroundColor: 'blue' }}
            />);
            console.log('dialog');
          }}
        ></Button>
      </View>
    </RootSiblingPortal>
  );
};
