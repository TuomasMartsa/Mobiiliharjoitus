import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet} from 'react-native';

function MapScreen({route, navigation}) {

    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const { lati } = route.params;
      
    const region  = {
        latitude: Number(lat),
        longitude: Number(lng),
        latitudeDelta: 0.195,
        longitudeDelta: 0.095
      };
    const coordinates = {
        latitude: Number(lat),
        longitude: Number(lng),
      }

    useEffect(() => {
           setLat(lati.lat);
           setLng(lati.long);
      });

    
    return (
        <MapView style={styles.map}
          region = {region}
        >
        <Marker
            coordinate={coordinates}
            image={require('../assets/place.png')}
            title={lati.title}
            description={lati.body}
        />
        </MapView>
    );
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      map: {
        flex: 1,
        width: '100%',
        height: '100%'
      }, 
})

export default MapScreen;