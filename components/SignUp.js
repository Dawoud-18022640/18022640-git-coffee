import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid  } from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';



class SignupScreen extends Component{

  constructor(props){
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    }
  }
  signup = () => {
      //Validation Here
      return fetch("http://10.0.2.2:3333/api/1.0.0/user" , {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      })
      .then((response) => {
        if(response.status === 201){
          return response.json()
        }
         else if (response.status ===400){
          throw 'Failed Validation';
        }
        else{
          throw 'Something went wrong';
        }

      })
      .then((responseJson) => {
        console.log("User created with ID" , responseJson);
        this.props.navigation.navigate("Log in");
        ToastAndroid.show("User created", ToastAndroid.SHORT);

      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      })
  }

  render(){
    const nav = this.props.navigation;
    return(
      <View>
        <ScrollView>
          <Text style={styles.title}>Create an account</Text>

          <View style={styles.formItem}>
            <Text style={styles.formLabel}>First Name:</Text>
            <TextInput
              placeholder="enter first name..."
              style={styles.formInput}
              onChangeText={(first_name) => this.setState({first_name})}
              value={this.state.first_name}
            />
          </View>

          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Last Name:</Text>
            <TextInput
              placeholder="enter last name..."
              style={styles.formInput}
              onChangeText={(last_name) => this.setState({last_name})}
              value={this.state.last_name}
            />
          </View>

          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Email:</Text>
            <TextInput
              placeholder="enter email..."
              style={styles.formInput}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />
          </View>

          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Password:</Text>
            <TextInput
              placeholder="enter password..."
              style={styles.formInput}
              secureTextEntry
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
            />
          </View>

          <View style={styles.formItem}>
            <TouchableOpacity
              style={styles.formTouch}
              onPress={() => this.signup()}
            >
              <Text style={styles.formTouchText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  title: {
    color:'steelblue',
    backgroundColor:'lightblue',
    padding:10,
    fontSize:25
  },
  formItem: {
    padding:20
  },
  formLabel: {
    fontSize:15,
    color:'steelblue'
  },
  formInput: {
    borderWidth:1,
    borderColor: 'lightblue',
    borderRadius:5
  },
  formTouch: {
    backgroundColor:'lightblue',
    padding:10,
    alignItems:'center'
  },
  formTouchText: {
    fontSize:20,
    fontWeight:'bold',
    color:'steelblue'
  }
})

export default SignupScreen;
