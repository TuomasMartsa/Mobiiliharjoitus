import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, StyleSheet, View, Image, Text, Pressable } from 'react-native';
import { useNavigation  } from '@react-navigation/native';

import { Icon } from 'react-native-elements';



function welcomeScreen(props) {

    const navigation = useNavigation()
    
    return (
        <ImageBackground 
        style={styles.background}
        source={require('../assets/kartta2.png')}>
        <View style={styles.logoContainer}> 
            <Image style={styles.logo} source={require('../assets/anchor.png')}/>
            <Text style={styles.heading}>LOKIKIRJA</Text>
        </View>
        
        <Pressable style={styles.addButton} onPress={() => navigation.navigate('Lokikirja', {screen: 'Kirjoita', initial: false,})}>
            <Icon name='note-add' color= '#153944' size ={46} style={{justifyContent: "center"}}></Icon>
            <Text style={{fontSize:24, fontWeight:'500', color: '#153944'}}>Lisää merkintä</Text>
        </Pressable>
        <Pressable style={styles.warningButton} onPress={() => navigation.navigate('Merivaroitukset')}>
            <Icon name='warning' color= '#c400c4' size ={46} ></Icon> 
            <Text style={{fontSize:24, fontWeight:'500', color: '#c400c4'}}>Merivaroitukset</Text>
        </Pressable>
        <StatusBar style="auto" />

        </ImageBackground>   
    );
}

const styles = StyleSheet.create({
    background:  {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    warningButton: {
        position: 'absolute',
        top: 540, 
        width: '90%',
        height: 70,
        backgroundColor: '#3b9fc1',
        opacity: 0.8,
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: 'row',
    },
    logo: {
        width: 150,
        height: 150,
    },
    logoContainer: {
        position: 'absolute',
        top: 110,  
        alignItems: 'center'
    },
    addButton: {
        position: 'absolute',
        color: '#102c35',
        top: 450, 
        width: '90%',
        height: 70,
        backgroundColor: '#add8e6',
        opacity: 0.8,
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: 'row'
    },
    heading: {
        fontSize: 36,
        fontWeight: 'bold'
    }
})
export default welcomeScreen;