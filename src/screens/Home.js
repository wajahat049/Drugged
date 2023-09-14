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
    // shadowColor: '#43e8e8',
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 8.3,
    // elevation: 3,
    height: 150,
    marginTop: 200,
    width: 150,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 90,
    height: 90,
  },
  logo: {
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    color: '#F39B97',
    margin: 20,
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
