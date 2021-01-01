import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, FlatList,  SafeAreaView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Header, Icon, Input, Button, ListItem  } from 'react-native-elements';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { useNavigation  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as MailComposer from 'expo-mail-composer';

const Stack = createStackNavigator();

export default function App({route, navigation}) {
  
  const { data } = route.params;
  const [bodi, setBodi] = useState('');
  const [subject, setSubject] = useState('');
  console.log(bodi);

  async function sendEmailAsync() {
  let result = await MailComposer.composeAsync({
    recipients: ['tuomas.martikainen@elisanet.fi'],
    subject: subject,
    body: bodi,
  });
}

  
  console.log('add+ ' + data)
    return (
      <View style={{marginTop: 20, marginLeft: 15, MarginRight: 15}}>
      <FlatList 
        keyExtractor= {item => item.id.toString()}
        data={data}
        renderItem={({item}) =>
          <View>
            <Text>
              {item.product}, {"\n"}
            </Text>
            <Text>
              {item.amount} {"\n"}{item.lat} {item.long} {"\n"}
            </Text>
            <Icon name='map' color='green'  onPress={() => navigation.navigate('Map', {lati: item})}/>
            <Icon name='mail' color='green' onPress={() => {setBodi(item.amount); setSubject(item.product); }} />
            
          </View>
        }
      />
            <View style={styles.container}>
              
        <Text style={styles.paragraph}>Open the mail composer!</Text>
        <Button title="lähetä" onPress={sendEmailAsync} />
      </View>
    </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      backgroundColor: '#fff',
      alignContent: 'center'
    },

  });