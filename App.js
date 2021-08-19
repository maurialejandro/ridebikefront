import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, Alert, FlatList } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default function App() {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getDiciplines = async () => {
    try{
      //peticion HTTTP 
      var request = new XMLHttpRequest();
      request.onreadystatechange = (e) => {  
        if (request.readyState !== 4){    
          return;   
        }

        if (request.status === 200) {
            console.log('success', request.responseText);
            const DATA = request.responseText;
            
        } else {    
            console.warn('error');  
        }};
  
        request.open('GET', 'http://172.20.10.3:8000/list-diciplines');
        request.send();
    }catch{
      console.error(error);
    }finally{
      setLoading(false)
    }
  };
  useEffect(() => {
    getDiciplines();
  }, []);

  return (
    <View style={styles.container}>
      
      <FlatList
        data={data}
        
        keyExtractor={({ id }, index) => id}
        renderItem= {({ item }) => (
          <Text> {item.name}, {item.description} </Text>
        
          )}
      />
      <Text style={styles.text}>X app</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },  
});
