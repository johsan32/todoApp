import LottieView from 'lottie-react-native';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

function HomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={require('../assets/images/home.png')}
          style={{width: 400, height: 400}}
        />
      </View>
      <View>
      <Text style={styles.textHead}>
          TODO APP BASIC
        </Text>
        <Text style={styles.textTitle}>
         (Async Storage)
        </Text>
      </View>
      <View style={styles.btnContainer}>
      <TouchableOpacity
          onPress={() => navigation.navigate('Todos')}
          style={styles.btnType}
         >
          {/* <Text style={styles.btnText}>Giriş</Text> */}
          <Icon name="apps-sharp" size={60} color="#900" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles= StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"space-between",
    alignItems:"center",
    padding:20,
    margin:20
  },
  btnContainer:{
    
    transform: [{rotate: '45deg'}]

  },
  textHead:{
    fontFamily:"Poppins-Black",
    fontWeight:"700",
    color:"#000",
    fontSize:32,
    textAlign:"center"
  },
  textTitle:{
    fontFamily:"Poppins-Regular",
    fontWeight:"500",
    color:"#C4C",
    fontSize:24,
    textAlign:"center",
    paddingVertical:20
  },

  btnType:{
    alignItems:"center",
    justifyContent:"center",
    borderRadius:5,
  },
  btnText:{
    color:"white",
    fontWeight:"600",
    fontFamily:"Poppins-Regular",
    fontSize:20
  },
})
export default HomeScreen;
