import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity,StyleSheet,ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LogInScreen extends Component{

  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
    }
  }

  logIn = async () => {

    return fetch("http://10.0.2.2:3333/api/1.0.0/user/login" , {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then((response) => {
      if(response.status === 200){
        return response.json()
      }
       else if (response.status ===400){
        throw 'Invalid email or password';
      }
      else{response.status ===500
        throw 'Server error';
      }

    })
    .then(async(responseJson) => {
    //  console.log(responseJson);
      await AsyncStorage.setItem('@session_token', responseJson.token);
      await AsyncStorage.setItem('@user_id', JSON.stringify(responseJson.id))
      this.props.navigation.navigate("Welcome");


    })
    .catch((error) => {
      console.log(error);
      ToastAndroid.show(error, ToastAndroid.SHORT);
    })
    //Validation here...
  }

  render(){
    return(
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.Title}>Log in</Text>

          <View style={styles.container}>
            <Text style={styles.Text}>Email:</Text>
            <TextInput
              placeholder="enter email..."
              style={styles.TextInput}
              onChangeText={(email) => this.setState({email})}
              value={this.state.Email}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.Text}>Password:</Text>
            <TextInput
              placeholder="enter password..."
              style={styles.TextInput}
              secureTextEntry
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
            />
          </View>

          <View style={styles.container}>
            <TouchableOpacity
              style={styles.ButtonShape}
              onPress={() => this.logIn()}
            >
              <Text style={styles.ButtonText}>Log In</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({

  container: {
    padding: 10
  },

  Title : {
    color:'steelblue',
    backgroundColor:'lightblue',
    padding:10,
    fontSize:25,

  },

  ButtonShape : {
    backgroundColor:'lightblue',
    padding:10,
    alignItems:'center'

  },

  ButtonText : {
    fontSize:20,
    fontWeight:'bold',
    color:'steelblue'

  },

  TextInput: {
    borderWidth:1,
    borderColor: 'lightblue',
    borderRadius:5

  }
});

export default LogInScreen;
