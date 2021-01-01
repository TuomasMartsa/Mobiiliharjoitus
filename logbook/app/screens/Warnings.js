import React, { useState, useEffect } from 'react';
import { Alert, View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { Header, Icon, Input, Button, ListItem  } from 'react-native-elements';
import { useNavigation  } from '@react-navigation/native';

import { format } from "date-fns";


function warnings(props) {
    const [warnings, setWarnings] = useState('');
    const navigation = useNavigation();
    const [coordinates, setCoordinates] = useState([]);
    const [lat, setLat] = useState([]);
    const [lng, setLng] = useState([]);


    const getWarnings = () => {
        const url = 'https://meri.digitraffic.fi/api/v1/nautical-warnings/published';
        fetch(url)
        .then((responce) => responce.json())
        .then((responceJson) => {
            setWarnings(responceJson);
            const features = responceJson.features
            for(var i=0;i<features.length;i++){
                setCoordinates(features[i].geometry.coordinates);
                setLat(features[i].geometry.coordinates[1]);
                setLng(features[i].geometry.coordinates[0]);
            }
        })
        .catch((error) => {
            Alert.alert('Error', error)
        });
        console.log(warnings);
    }
    useEffect(() => {
    getWarnings();
     }, []);

    

    return (
        <View>
            <FlatList 
                keyExtractor={(item, id) => String(id)}
                renderItem={({item}) => {
                return (
                    <ListItem bottomDivider
                    onPress={() => navigation.navigate('Kartta', {muisti: item})}
                    >
                        <ListItem.Content>
                            <ListItem.Title>{item.properties.number}. {item.properties.areasFi} {"\n"}{item.properties.locationFi}</ListItem.Title>
                            <ListItem.Subtitle>{item.properties.contentsFi}{"\n"}{"\n"}
                            {'Paikassa ' + (item.geometry.coordinates[1]).toFixed(2) + '\u00B0' + 'N'}
                            {', ' + (item.geometry.coordinates[0]).toFixed(2)+ '\u00B0' + 'E'}{"\n"}{item.properties.creationTime}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                    );
                }}
                data={warnings.features} 
            />
        </View>
    );
}

export default warnings;