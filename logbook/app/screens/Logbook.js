import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, Keyboard, ScrollView  } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useNavigation  } from '@react-navigation/native';
import {  Button,  } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from "date-fns";

export default function App() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [lat, setLat] = useState('-');
    const [long, setLng] = useState('-');
    const [data, setData] = useState([]);
    const [heading, setHeading] = useState('-');
    const [speed, setSpeed] = useState('-');
    const [sent, setSent] = useState(false);
    const [add, setAdd] = useState(true);
    const db = SQLite.openDatabase('test11db.db');
    const navigation = useNavigation()
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('datetime');
    const [date2, setDate2] = useState('');
    const [show, setShow] = useState(false);

    //Päivämäärän ja ajan muokkaus
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
      };
    const tets = () => {
    setDate2(format(date, 'dd.MM.yyyy HH:mm'));
    setShow(false);
    }
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
    const showDatepicker = () => {
      showMode('datetime');
    };
  
    //SQLite toiminnot
    useEffect(() => {
      db.transaction(tx => {
        tx.executeSql('create table if not exists list(id integer primary key not null, title text, body text, lat real, long real, speed real, heading real, date string);');
      }); updateList();
    }, []);
    const saveItem = () => {
      db.transaction(tx => {
        tx.executeSql('insert into list (title, body, lat, long, speed, heading, date) values (?, ?, ?, ?, ?, ?, ?);',
            [title, body, lat, long, speed, heading, date2]);
        }, null, updateList
      )
    }
    const updateList = () => {
      db.transaction(tx => {
        tx.executeSql('select * from list;', [], (_, { rows }) =>
          setData(rows._array)
        );  
      });
    }
    const deleteItem = (id) => {
      db.transaction(
        tx => {
          tx.executeSql('delete from list where id =?', [id]);
        }, null, updateList
      )
    };

    //Paikan haku
    const getLocation = async () => {
      let { status } = await Location.requestPermissionsAsync();
      if(status !== 'granted') {
        Alert.alert('Ei pääsyä sjaintiin');
      } else {
        let location= await Location.getCurrentPositionAsync({});
        setLat((location.coords.latitude).toFixed(5));
        setLng((location.coords.longitude).toFixed(5));
        console.log(lat)
        console.log(long)
      }
    };

    //Suunnan ja npeusden haku [hakee myös sijainnin]
    const getSpeedHeading = async () => {
      let { status } = await Location.requestPermissionsAsync({accuracy: Location.Accuracy.Balanced});
      if(status !== 'granted') {
        Alert.alert('Ei pääsyä sjaintiin');
      } else {
        let location= await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Balanced});
        console.log(location.coords.speed);
        console.log(location.coords.heading);
        if (location.coords.speed > 0 && location.coords.heading > 0){
          setSpeed((location.coords.speed).toFixed(1));
          setHeading((location.coords.heading).toFixed(1));
        } else {
          setSpeed(0);
          setHeading('puuttuu');
        }
      }
    };
    // Lomakkeen tietojen tyhjennys
    const clear = () => {
      setLat('-');
      setLng('-');
      setSpeed('-');
      setHeading('-');
      setSent(false);
      setAdd(true);
      setDate2('');
      setTitle('');
      setBody('');
    }
    //Painikkeiden disaplointi
    const disable = () => {
      setSent(true);
      setShow(false);
      setAdd(false);
    }

    return (
      <View style={styles.container}>
        <View style={styles.list}>
          <TextInput style={styles.textInput}
            placeholder='Mitä?' label='Päivä ja Aika'
            clearButtonMode = "while-editing" returnKeyType='done'
            onChangeText={title => setTitle(title)}
            value={title}
          /> 
          
          <TextInput style={styles.textInput2}
            multiline
            blurOnSubmit
            placeholder='Kuvaa tapahtuma?' label='Tapahtuma'
            clearButtonMode = "always" returnKeyType="done"
            onChangeText={body => setBody(body)}
            value={body}
            onSubmitEditing={()=>{Keyboard.dismiss()}}
          />
        </View> 
        <View>
          <View style={styles.buttons}>  
            <Button raised 
              icon ={{name: 'access-time', color: 'steelblue'}} 
              type="outline"
              buttonStyle={{ width: 175}}
              onPress={tets} title="Lisää" />
            <Button raised
              icon ={{name: 'access-time', color: 'steelblue'}} 
              type="outline"
              buttonStyle={{ width: 175}}
              onPress={showDatepicker} title="Muuta" />
          </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="compact"
                onChange={onChange}
              />
            )}   
        </View>
        <View style={styles.buttons}>
          <Button raised
            icon ={{name: 'add-location', color: 'steelblue'}}
            type="outline"
            buttonStyle={{ width: 175}}
            title="Sijainti" onPress={getLocation}/>
          <Button raised
            icon ={{name: 'rowing', color: 'steelblue'}}
            type="outline"
            buttonStyle={{ width: 175}}
            title='Suunta ja nopeus' onPress={getSpeedHeading}></Button>
        </View>
        
        <ScrollView style={styles.text}>
          <View style={styles.textItems}>
            <Text style={{fontSize: 20, textDecorationLine: 'underline'}}>
              Otsikko:
            </Text>
            <Text style={{fontSize: 20,}}>
              {title} {"\n"}
            </Text>
            <Text style={{fontSize: 18, textDecorationLine: 'underline'}}>
              Tapahtuma:
            </Text>
            <Text style={{fontSize: 18, fontWeight: '400'}}>
              {body}{"\n"} 
            </Text>
            <Text style={{fontSize: 14, fontWeight: '400'}}> 
              Latitudi: {lat} Longitudi: {long}{"\n"}
              Suunta: {heading} Nopeus: {speed}{"\n"}
              Päiväys ja aika: {date2}
            </Text>
          </View>
        </ScrollView>

        <View style={styles.buttons}>
          <Button raised 
            icon ={{name: 'save', color: 'steelblue'}}
            type="outline"
            buttonStyle={{ width: 175}}
            disabled = {sent}
            onPress={() => { saveItem(); disable();}} 
          />
          <Button raised 
            icon ={{name: 'note-add',color: 'steelblue'}}
            type="outline"
            buttonStyle={{ width: 175}}
            disabled = {add}
            onPress={() => {clear();}} 
          />
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#d5eaf2',
      alignContent: 'center',
      alignItems: 'center'
    },
    top: {
      height: 50, 
      width: '100%',
      backgroundColor: 'green'
    },
    textInput: {
      fontSize: 20,
      width: '100%',
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      backgroundColor: "#e8f4f8",
    },
    textInput2: {
      fontSize: 16,
      width: '100%',
      height: 210,
      backgroundColor: "#e8f4f8",
    },
    text: {
      flex:1, 
      width:'90%',
      backgroundColor: '#e8f4f8'
    },
    textItems: {
      margin: 20
    },
    buttons: {
      backgroundColor: '#add8e6',
      flexDirection: 'row',
      margin: 8
    },
    list: {
      flex:1, 
      width:'90%',
    },
  });