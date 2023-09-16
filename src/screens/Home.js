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
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Home = props => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View>
      <Text style={styles.logo}>DRUGGED</Text>

      <Animatable.View animation="bounceIn" duration={2000}>
        <View
          style={{
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
            flex: 1,
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Doctors')}
            style={styles.box}>
            <Image
              style={styles.image}
              source={require('../assets/doctor.png')}
            />
            <Text style={styles.Image_Heading}>Doctors</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Medicines')}
            style={styles.box}>
            <Image
              style={styles.image}
              source={require('../assets/drugs.png')}
            />
            <Text style={styles.Image_Heading}>Medicines</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
            flex: 1,
            marginTop: 200,
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Diseases')}
            style={styles.box}>
            <Image
              style={styles.image}
              source={require('../assets/coronavirus.png')}
            />
            <Text style={styles.Image_Heading}>Diseases</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Stores')}
            style={styles.box}>
            <Image
              style={styles.image}
              source={require('../assets/drugstore.png')}
            />
            <Text style={styles.Image_Heading}>Medical Stores</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    shadowColor: 'grey',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6.27,
    elevation: 10,
    height: 150,
    marginTop: 200,
    width: 150,
    // padding: 20,
    borderRadius: 18,
    backgroundColor: 'white',
    // borderWidth: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
  },
  logo: {
    textAlign: 'center',
    fontSize: 60,
    fontWeight: 'bold',
    color: '#F39B97',
    margin: 20,
    marginBottom: 50,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  Image_Heading: {
    color: '#F39B97',
    textAlign: 'center',
    marginTop: 7,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Home;
