/* eslint-disable prettier/prettier */
import React, {useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  ToastAndroid,
  Animated,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
// import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import firestore from '@react-native-firebase/firestore';
import {useState, useEffect} from 'react';
// import storage from '@react-native-firebase/storage';
import * as Animatable from 'react-native-animatable';
const Login = props => {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  // state for disable button
  const [disable, setDisable] = useState(true);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Submit = () => {
    console.log('LOGIN');
    if (Name != '' && Email != '' && Password != '') {
      firestore()
        .collection('Users')
        .doc(Email.split('@')[0])
        .get()
        .then(documentSnapshot => {
          console.log('User exists: ', documentSnapshot.exists);

          if (documentSnapshot.exists) {
            if (Password !== documentSnapshot.data().password)
              return ToastAndroid.show(
                'Incorrect Password',
                ToastAndroid.SHORT,
              );
            ToastAndroid.show('Login Successfully!', ToastAndroid.SHORT);
            setTimeout(() => {
              props.navigation.navigate('Home');
            }, 2000);
            console.log('User data: ', documentSnapshot.data());
          } else {
            ToastAndroid.show('Please Signup First', ToastAndroid.SHORT);
          }
        });
    } else {
      ToastAndroid.show('Fill all the fields', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={{alignItems: 'center'}}>
      <Animatable.Image
        animation="zoomIn"
        duration={3000}
        source={require('../assets/Drugged_Logo.jpg')}
        style={{
          width: '50%',
          height: '30%',
          marginBottom: '1%',
          marginTop: '5%',
        }}></Animatable.Image>

      <Text style={styles.logo}>WELCOME BACK</Text>

      <Animatable.View animation="fadeInUpBig" duration={2000}>
        <View style={{alignItems: 'center'}}>
          {/* <Text style={styles.text}>Name</Text> */}
          <TextInput
            keyboardType="default"
            style={styles.input}
            onChangeText={e => {
              setName(e);
            }}
            // value={number}
            placeholder="Enter your Name"
          />
        </View>
        <View style={{alignItems: 'center'}}>
          {/* <Text style={styles.text}>Email</Text> */}
          <TextInput
            keyboardType="email-address"
            style={styles.input}
            onChangeText={e => {
              setEmail(e);
            }}
            // value={number}
            placeholder="Enter your Email"
          />
        </View>
        <View style={{alignItems: 'center'}}>
          {/* <Text style={styles.text}>Password</Text> */}
          <TextInput
            secureTextEntry={true}
            keyboardType="default"
            style={styles.input}
            onChangeText={e => {
              setPassword(e);
            }}
            // value={number}
            placeholder="Enter your Password"
          />
        </View>

        <View style={styles.button}>
          <Button
            color="#F39B97"
            title="Submit"
            style={{borderRadius: 300}}
            onPress={() => Submit()}
          />
        </View>
        <View>
          <Text
            onPress={() => {
              props.navigation.navigate('Signup');
            }}
            style={styles.text}>
            Don't have an account?{' '}
            <Text style={{color: '#43e8e8'}}>Signup</Text>{' '}
          </Text>
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 10,
    borderWidth: 1,
    padding: 10,
    height: 45,
    width: 300,
    borderRadius: 30,
    backgroundColor: '#befafa',
  },
  logo: {
    textAlign: 'center',
    fontSize: 30,
    // marginTop: 10,
    fontWeight: 'bold',
    color: '#F39B97',
    marginBottom: 20,
  },
  text: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F39B97',
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: '35%',
    paddingRight: '35%',

    // alignItems:"center",
    // textAlign:"center"
  },
});

export default Login;
