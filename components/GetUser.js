import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, FlatList, ToastAndroid, ActivityIndicator, Button  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class GetUser extends Component{

  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      UserInfoList: [],

    }
  }
componentDidMount() {
  this.unsubscribe = this.props.navigation.addListener('focus', () => {
    this.checkLoggedIn();
  });

}

componentWillUnmount() {
  this.unsubscribe();
}

getData = async () => {
  const value = await AsyncStorage.getItem('@session_token');
  const id = await AsyncStorage.getItem('@user_id');
  //console.log(id);
  return fetch("http://10.0.2.2:3333/api/1.0.0/user/" + id, {
    'headers': {
      'X-Authorization' : value
    },

  })
  .then((response) => {
    if(response.status === 200){
      return response.json()
    //  console.log(response.json(id));
    }
     else if (response.status ===401){
      ToastAndroid.show("You are not logged in", ToastAndroid.SHORT);
      this.props.navigation.navigate("Log in");
    }
    else{
      throw 'Something went wrong';
    }

  })
  .then(async(responseJson) => {
  //  console.log(responseJson);

    this.setState({
      isLoading: false,
      UserInfoList : responseJson

    })

  })
  .catch((error) => {
    console.log(error);
    ToastAndroid.show(error, ToastAndroid.SHORT);
  })
  }

  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if (value == null) {
      this.props.navigation.navigate("Log in");
      ToastAndroid.show("You need to be logged in to view this page",ToastAndroid.LONG);
    }else {
       this.setState({
         isLoading : false

       })
    }
  };

  render() {
    if(this.state.isLoading){
      return(
        <View>
          <ActivityIndicator
            size="large"
            color="#00ff00"
          />
        </View>
      );
    }else {
      return (
        <View>
          <Text style={styles.Title}>Get User</Text>

          <FlatList
        data={this.state.UserInfoList}
        renderItem={({item}) => (
          <View>
          <Text>{item.first_name}</Text>
          </View>





)}
      />



          <View style={styles.container}>
            <TouchableOpacity
              style={styles.ButtonShape}
              onPress={() => this.getData()}
            >
              <Text style={styles.ButtonText}>Get User</Text>
            </TouchableOpacity>
          </View>

        </View>

    );
    }

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

  }

});

export default GetUser;
