import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView  } from 'react-native';

class HomeScreen extends Component{
  render(){
    const navigation = this.props.navigation;

    return(
        <ScrollView>
          <Text style={styles.Title}>Welcome</Text>

          <View style={styles.container}>
            <TouchableOpacity
              style={styles.ButtonShape}
              onPress={() => navigation.navigate("Sign up")}
            >
              <Text style={styles.ButtonText}>Sign up</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <TouchableOpacity
              style={styles.ButtonShape}
              onPress={() => navigation.navigate("Log in")}
            >
              <Text style={styles.ButtonText}>Log in</Text>
            </TouchableOpacity>
          </View>


        </ScrollView>
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

  }

});

export default HomeScreen;
