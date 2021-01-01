import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet } from 'react-native';


function MapScreen({route, navigation}) {
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');

    const { muisti } = route.params;
        
    const region  = {
        latitude: Number(lat),
        longitude: Number(lng),
        latitudeDelta: 0.295,
        longitudeDelta: 0.095
      };
    const coordinates = {
        latitude: Number(lat),
        longitude: Number(lng),
      }

    useEffect(() => {
            setLat(Number(muisti.geometry.coordinates[1]));
            setLng(Number(muisti.geometry.coordinates[0]));
            //console.log('coords ' + 'coordinates' + ', ' + lat +', '+lng);    
      });
    
    return (
        <MapView style={styles.map}
          region = {region}
          >
        <Marker
            image={require('../assets/warning.png')}
            coordinate={coordinates }
            title={muisti.properties.locationFi} 
            description={muisti.properties.tooltip}
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