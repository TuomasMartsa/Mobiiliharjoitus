import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useNavigation  } from '@react-navigation/native';
import { Icon, Button } from 'react-native-elements';

import * as MailComposer from 'expo-mail-composer';

export default function App() {
    const [data, setData] = useState([]);
    const [bodi, setBodi] = useState('');
    const [subject, setSubject] = useState('');
 
    const db = SQLite.openDatabase('test11db.db');
    const navigation = useNavigation()
  
    //Sivun tietojen päivitys
    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        updateList();
      });
      return unsubscribe;
    }, [navigation]);
    
    //SQLite toiminnot, hae tiedot viimeisin ensimmäisenä
    const updateList = () => {
      db.transaction(tx => {
        tx.executeSql('select * from list order by id desc;', [], (_, { rows }) =>
          setData(rows._array)
        ); 
      });
    }
    // poista merkintä
    const deleteItem = (id) => {
      db.transaction(
        tx => {
          tx.executeSql('delete from list where id =?', [id]);
        }, null, updateList
      )
    };

    const confirmDelete = (id) =>
      Alert.alert(
        "Vahvista",
        "Haluatko poistaa merkinnän?",
        [
          { text: "Peru",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => deleteItem(id) }
        ],
        { cancelable: false }
      );

    //Sähköpostin lähetys
    async function sendEmailAsync() {
      let result = await MailComposer.composeAsync({
        recipients: ['mikko.martikainen@acme.fi'],
        subject: subject,
        body: bodi,
      });
    }

    const listSeparator = () => {
      return (
        <View
          style={{
            height: 3,
            width: "95%",
            backgroundColor: "#fff",
            marginLeft: "2%"
          }}
        />
      );
    };

    return (
      <View style={styles.container}>
        <View style={styles.list}>
          <FlatList 
            keyExtractor= {item => item.id.toString()}
            data={data}
            style={styles.listItems}
            ItemSeparatorComponent= {listSeparator}
            renderItem={({item}) =>
              <View >
                <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 5}}>
                  {item.title} {"\n"}
                </Text>
                <Text style={{fontSize: 18, fontWeight: '400', marginLeft: 5}}>
                  {item.body}{"\n"} 
                </Text>
                <Text style={{fontSize: 16, fontWeight: '300', marginLeft: 5}}>
                  Lat: {item.lat}{'\u00B0'} Long: {item.long}{'\u00B0'} {"\n"}
                  Suunta: {item.heading} Nopeus: {item.speed} {"\n"}
                  Päiväys ja aika: {item.date}
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                    <Icon name='map' color='#205567'  onPress={() => navigation.navigate('Lokikartta', {lati: item})}/>
                    <Icon name='mail' color='#3286a3' 
                      onPress={() => {setSubject(item.title); 
                        if (item.lat !== '-'){
                          setBodi(item.body + '\n\n Paikassa: ' + item.lat + '\u00B0N, ' +  item.long + '\u00B0E\n\n' + item.date);
                        } else {setBodi(item.body + '\n\n'+ item.date);}  
                      }}
                    />
                    <Icon name='delete' color='#ff00ff'  onPress={() => confirmDelete(item.id)}/>
                </View>
              </View>
            }
          />
        </View>

        <View style={styles.buttons}>
          <Button raised style={styles.buttonItem} loadingProps={{ animating: true }} type="outline" icon ={{name: 'note-add', color: 'steelblue'}} title="Lisää merkintä" onPress={() => navigation.navigate('Kirjoita')} />
          <Button raised style={styles.buttonItem} loadingProps={{ animating: true }} type="outline" icon ={{name: 'send', color: 'steelblue'}} title="lähetä tiedot" onPress={sendEmailAsync} />
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignContent: 'center',
      alignItems: 'center'
    },
    top: {
      height: 50, 
      width: '100%',
      backgroundColor: 'green'
    },
    list: {
      flex:1, 
      backgroundColor: '#f3f9fb',
    },
    listItems: {
      margin: 20
    },
    buttons: {
      padding: 10,
      justifyContent: 'space-around',
      flexDirection: 'row',
      backgroundColor: '#c6e3ed',
      width: '100%'
    },
    buttonItem: {
      margin: 5,
    },
    text: {
      flex:1, 
      width:'95%',
      borderColor: 'gray',
      borderWidth: 0.5,
      backgroundColor: 'skyblue'
    },
    textItems: {
      margin: 20
    },
  });