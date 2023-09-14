import React, { useState, useEffect } from 'react';
import { SearchBar, ListItem, Avatar } from '@rneui/themed';
import firestore from '@react-native-firebase/firestore';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Modal, Pressable, Alert } from 'react-native';

const Diseases = () => {
  const [search, setSearch] = useState('');
  const [searchedDisease, setSearchedDisease] = useState([]);
  const [loading, setLoading] = useState(true);
  const [diseases, setDiseases] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState(null); // New state for selected disease

  useEffect(() => {
    const subscriber = firestore()
      .collection('Disease')
      .onSnapshot((querySnapshot) => {
        const diseases = [];

        querySnapshot.forEach((documentSnapshot) => {
          diseases.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setDiseases(diseases);
        setLoading(false);
      });

    return () => subscriber();
  }, []);

  const updateSearch = (search) => {
    if (search) {
      setSearch(search);
      setSearchedDisease(
        diseases.filter((disease) => {
          return disease.name.toLowerCase().includes(search.toLowerCase());
        })
      );
    }
  };

  const openModal = (disease) => {
    setSelectedDisease(disease); // Set the selected disease
    setModalVisible(true);
  };

  return (
    <View style={styles.view}>
      <SearchBar
        containerStyle={{
          backgroundColor: 'white',
          borderColor: 'white',
          marginBottom: '5%',
        }}
        inputContainerStyle={{ backgroundColor: 'white' }}
        lightTheme={true}
        inputStyle={{ backgroundColor: 'white' }}
        showCancel={true}
        placeholder="Search any disease here..."
        onChangeText={updateSearch}
        value={search}
      />
      {loading ? (
        <ActivityIndicator size={'large'} style={{ marginTop: '20%' }} />
      ) : (
        <FlatList
          data={search !== '' ? searchedDisease : diseases}
          renderItem={({ item }) => (
            <ListItem
              bottomDivider
              style={{
                borderWidth: 2,
                borderColor: '#F39B97',
                borderRadius: 5,
                marginBottom: 5,
              }}
              onPress={() => openModal(item)} // Open the modal with the selected disease
            >
              <Avatar
                rounded
                source={require('../assets/coronavirus.png')}
              />
              <ListItem.Content>
                <ListItem.Title style={{ fontWeight: 'bold' }}>
                  {item.name}
                </ListItem.Title>
                <ListItem.Subtitle
                  style={{ color: '#09b8b8', fontWeight: 'bold' }}
                >
                  ({item.alternate})
                </ListItem.Subtitle>
                <ListItem.Subtitle style={{ color: '#c7716d' }}>
                  {item.use}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Disease Details:</Text>
            {selectedDisease && (
              <View>
                <Text style={styles.modalText}>Name: {selectedDisease.name}</Text>
                <Text style={styles.modalText}>Key: {selectedDisease.key}</Text>
                {/* Add more details as needed */}
              </View>
            )}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black'
  },
});

export default Diseases;
