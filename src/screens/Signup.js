import React from 'react';
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
// import storage from '@react-native-firebase/storage';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import firestore from '@react-native-firebase/firestore';
import {useState, useEffect} from 'react';
import * as Animatable from 'react-native-animatable';

const Signup = props => {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [PasswordConfirm, setPasswordConfirm] = useState('');

  // state for disable button
  const [disable, setDisable] = useState(true);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Submit = () => {
    if (Name != '' && Email != '' && Password != '' && PasswordConfirm != '') {
      if (Password !== PasswordConfirm)
        return ToastAndroid.show(
          'Password and Confirm Password do not match',
          ToastAndroid.SHORT,
        );

      firestore()
        .collection('Users')
        .doc(Email.split('@')[0])
        .set({
          name: Name,
          email: Email,
          password: Password,
        })
        .then(e => {
          ToastAndroid.show('Signup Successfully!', ToastAndroid.SHORT);
          setTimeout(() => {
            props.navigation.navigate('Login');
          }, 2000);
        })
        .catch(() => {
          ToastAndroid.show(
            'An error occured during signup',
            ToastAndroid.SHORT,
          );
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
        source={require('../assets/Drugged_Logo-removebg.png')}
        style={{
          width: '60%',
          height: '30%',
          marginBottom: '10%',
          marginTop: '2%',
        }}></Animatable.Image>

      <Text style={styles.logo}>WELCOME</Text>

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
        <View style={{alignItems: 'center'}}>
          {/* <Text style={styles.text}>Password</Text> */}
          <TextInput
            secureTextEntry={true}
            keyboardType="default"
            style={styles.input}
            onChangeText={e => {
              setPasswordConfirm(e);
            }}
            // value={number}
            placeholder="Confirm your Password"
          />
        </View>

        <View style={styles.button}>
          <Button
            color="#F39B97"
            title="Submit"
            style={{borderRadius: 200}}
            onPress={() => Submit()}
          />
        </View>
        <View>
          <Text
            onPress={() => {
              props.navigation.navigate('Login');
            }}
            style={styles.text}>
            Already have an account?{' '}
            <Text style={{color: '#43e8e8'}}>Login</Text>{' '}
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
    backgroundColor: '#b5f4f5',
  },
  logo: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#F39B97',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
  text: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f0776e',
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: '35%',
    paddingRight: '35%',
  },
});

export default Signup;
