// Photos.js
import React from "react";
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useFetch } from "./customHook/useFetch";
function Photos() {
    const [data, loading] = useFetch(
        "https://jsonplaceholder.typicode.com/photos?albumId=1"
    );
    return (
        <ScrollView style={{maxHeight: 600}}>
            <Text>Photos</Text>
            {loading ? (
                <Text>"Loading..."</Text>
            ) : (
                    <View>
                        {data.map(({ id, title, url }) => (
                            <View key={id}>
                                <Image style={{width: 200, height: 100}} source={{ uri: url }} />
                            </View>
                        ))}
                    </View>
                )}
        </ScrollView>
    );
}
export default Photos;