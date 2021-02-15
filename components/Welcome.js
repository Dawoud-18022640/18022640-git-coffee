import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, FlatList, ToastAndroid, ActivityIndicator  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Welcome extends Component{

  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
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
        <ScrollView>
          <Text style={styles.Title}>Welcome</Text>
        </ScrollView>

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

export default Welcome;
