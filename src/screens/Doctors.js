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
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [diseases, setDiseases] = useState([]); // Initial empty array of users

  useEffect(() => {
    const subscriber = firestore()
      .collection('Disease')
      .onSnapshot(querySnapshot => {
        const diseases = [];

        querySnapshot.forEach(documentSnapshot => {
          diseases.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setDiseases(diseases);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const updateSearch = search => {
    setSearch(search);
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
          data={diseases}
          renderItem={({item}) => (
            <ListItem
              bottomDivider
              style={{
                borderWidth: 2,
                borderColor: '#F39B97',
                borderRadius: 5,
                marginBottom: 5,
              }}>
              <Avatar rounded source={require('../assets/coronavirus.png')} />
              <ListItem.Content>
                <ListItem.Title style={{fontWeight: 'bold'}}>
                  {item.name}
                </ListItem.Title>
                <ListItem.Subtitle
                  style={{color: '#09b8b8', fontWeight: 'bold'}}>
                  ({item.alternate})
                </ListItem.Subtitle>
                <ListItem.Subtitle style={{color: '#c7716d'}}>
                  {item.use}
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
