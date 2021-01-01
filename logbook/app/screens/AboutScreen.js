import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon, Button } from 'react-native-elements';

export default function AboutScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Image style={styles.logo} source={require('../assets/anchor.png')}/>
                <Text style={styles.heading}>Lokikirja</Text>
            </View>
            <View style={styles.text}>
                <Text style={{fontSize: 24}}> Mobiiliohjelmoinin harjoitustyö {'\n'}</Text>
                <Text style={{fontSize: 22, textDecorationLine: 'underline'}}>Lokikirja </Text>
                <View style={styles.textLine}>
                    <Icon name='map' color='#205567'/><Text> Näytä merkintä kartalla</Text>
                </View>
                <View style={styles.textLine}>
                    <Icon name='mail' color='#3286a3'/><Text> Tallenna merkinnän tiedot sähköpostiin</Text>
                </View>
                <View style={styles.textLine}>
                    <Icon name='delete' color='#ff00ff'/><Text> Poista merkintä</Text>
                </View>
                <View style={styles.textLine}>
                    <Icon name='note-add' color='#3286a3'/><Text> Lisää uusi merkintä</Text>
                </View>
                <View style={styles.textLine}>
                    <Icon name='send' color='#3286a3'/><Text> Avaa sähköpostin lähetys</Text>
                </View>
                <Text style={{fontSize: 18, textDecorationLine: 'underline', marginTop: 15}}>Uuden merkinnän lisäys: </Text>
                
                <View style={styles.textLine}>
                    <Icon name='access-time' color='#3286a3'/><Text> Muuta ja/tai tallenna päiväys ja aika</Text>
                </View>
                <View style={styles.textLine}>
                    <Icon name='add-location' color='#3286a3'/><Text> Lisää sijainti (lat, long) merkintään</Text>
                </View>
                <View style={styles.textLine}>
                    <Icon name='rowing' color='#3286a3'/><Text> Lisää suunta ja nopeus merkintään</Text>
                </View>
                <View style={styles.textLine}>
                    <Icon name='save' color='#3286a3'/><Text> Tallenna merkintä</Text>
                </View>
                
                <Text style={{fontSize: 22, textDecorationLine: 'underline', marginTop: 15, marginBottom: 10}}>Merivaroitukset</Text>
                <Text style={{marginBottom: 10}}>Varoitustiedot haetaan digitraffic.fi -palvelusta.</Text>
                <Text>Varoitusta painamalla se näytetään kartalla.</Text>
            </View>    
            <View style={styles.bottom}>
                <Text> {"\u00a9"} Tuomas Martikainen, 2020</Text>
            </View>       
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f3f9fb',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    top: {
        top: 50,
        height: 75, 
        width: '100%',
        backgroundColor: '#c6e3ed',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 50,
        height: 50
    },
    heading: {
        fontSize: 36,
        fontWeight: 'bold',
        marginLeft: 30
    },
    text: {
        flex: 1,
        top: 60,
        width: '95%',
        backgroundColor: "#f3f9fb",
    },
    textLine: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 10,
    },
    bottom: {
        height: 35, 
        width: '100%',
        backgroundColor: '#c6e3ed',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',        
    }

  });
