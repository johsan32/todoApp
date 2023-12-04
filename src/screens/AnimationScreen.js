import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const AnimationScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={{margin:20, padding:20}}>
        <Text  style={{margin:20, padding:20}}>AnifgfgfgfmationScreedfdn</Text>
      </View>
      <TouchableOpacity style={{borderColor:"red", borderWidth:2, padding:30}}>
        <Text></Text>
      <LottieView
        source={require('../assets/animations/anime.json')}
        autoPlay 
      />
</TouchableOpacity>

      <View>
        <Text  style={{margin:20, padding:20}}>AnimationScgfgfreen2fgfg</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={{backgroundColor: 'red', padding: 20, width:150, alignSelf:"center"}}>
        <Text>Home</Text>
      </TouchableOpacity>


      
      <LottieView
        source={require('../assets/animations/intro-anime.json')}
        autoPlay
      />
    </View>
  );
};

export default AnimationScreen;

const styles = StyleSheet.create({});
