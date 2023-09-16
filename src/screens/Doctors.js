import React, {useState, useEffect} from 'react';
import {SearchBar, ListItem, Avatar} from '@rneui/themed';
import firestore from '@react-native-firebase/firestore';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';

const Doctors = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [searchedDoctors, setSearchedDoctors] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Consultants')
      .onSnapshot(querySnapshot => {
        const doctors = [];

        querySnapshot.forEach(documentSnapshot => {
          doctors.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setDoctors(doctors);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const updateSearch = search => {
    if (search) {
      setSearch(search);
      setSearchedDoctors(
        doctors.filter(doctor => {
          return (
            doctor.name.toLowerCase().includes(search.toLowerCase()) ||
            doctor.clinic.toLowerCase().includes(search.toLowerCase())
          );
        }),
      );
    }
  };

  return (
    <View style={styles.view}>
      <SearchBar
        containerStyle={{
          backgroundColor: 'white',
          borderColor: 'white',
          marginBottom: '5%',
        }}
        inputContainerStyle={{backgroundColor: 'white'}}
        // leftIconContainerStyle={{backgroundColor: 'white'}}
        // rightIconContainerStyle={{backgroundColor: 'white'}}
        // cancelButtonTitle="Cancel"
        lightTheme={true}
        inputStyle={{backgroundColor: 'white'}}
        showCancel={true}
        placeholder="Search any doctor here..."
        onChangeText={updateSearch}
        value={search}
      />
      {loading ? (
        <ActivityIndicator size={'large'} style={{marginTop: '20%'}} />
      ) : (
        <FlatList
          data={search !== '' ? searchedDoctors : doctors}
          style={{marginBottom: '20%'}}
          renderItem={({item}) => (
            <ListItem
              bottomDivider
              style={{
                borderWidth: 2,
                borderColor: '#F39B97',
                borderRadius: 7,
                margin: 5,
                marginBottom: 7,
                padding: 1,
              }}>
              <Avatar
                size={'medium'}
                rounded
                source={require('../assets/doctor.png')}
              />
              <ListItem.Content>
                <ListItem.Title style={{fontWeight: 'bold', fontSize: 18}}>
                  {item.name}
                </ListItem.Title>
                <ListItem.Subtitle
                  style={{color: '#09b8b8', fontWeight: 'bold'}}>
                  ({item.clinic})
                </ListItem.Subtitle>
                <ListItem.Subtitle style={{color: '#c7716d'}}>
                  {item.qualifications
                    ? item.qualifications
                    : item.qualification}
                </ListItem.Subtitle>
                <ListItem.Subtitle style={{color: '#c7716d'}}>
                  {item.days}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 10,
  },
});

export default Doctors;
