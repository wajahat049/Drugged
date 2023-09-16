import React, {useState, useEffect} from 'react';
import {SearchBar, ListItem, Avatar} from '@rneui/themed';
import firestore from '@react-native-firebase/firestore';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  Alert,
} from 'react-native';

const Diseases = () => {
  const [search, setSearch] = useState('');
  const [searchedDisease, setSearchedDisease] = useState([]);
  const [loading, setLoading] = useState(true);
  const [diseases, setDiseases] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState(null); // New state for selected disease
  const [diseaseConsultants, setDiseaseConsultants] = useState([]); // New state for selected disease

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

    return () => subscriber();
  }, []);

  const updateSearch = search => {
    if (search) {
      setSearch(search);
      setSearchedDisease(
        diseases.filter(disease => {
          return disease.name.toLowerCase().includes(search.toLowerCase());
        }),
      );
    }
  };

  const openModal = disease => {
    setSelectedDisease(disease); // Set the selected disease
    setModalVisible(true);
  };

  const getConsultants = item => {
    const list = [];
    console.log('II', item);
    item?.Consultant?.map(docs => {
      firestore()
        .collection('Consultants')
        .doc(docs)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            console.log('ASASS', documentSnapshot.data());
            setDiseaseConsultants(oldArray => [
              ...oldArray,
              documentSnapshot.data(),
            ]);
          }
        });
    });
    // setDiseaseConsultants(list);
    openModal();
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
        lightTheme={true}
        inputStyle={{backgroundColor: 'white'}}
        showCancel={true}
        placeholder="Search any disease here..."
        onChangeText={updateSearch}
        value={search}
      />
      {loading ? (
        <ActivityIndicator size={'large'} style={{marginTop: '20%'}} />
      ) : (
        <FlatList
          style={{marginBottom: '20%'}}
          data={search !== '' ? searchedDisease : diseases}
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
              }}
              onPress={() => openModal(item)} // Open the modal with the selected disease
            >
              <Avatar
                size={'medium'}
                rounded
                source={require('../assets/coronavirus.png')}
              />
              <ListItem.Content>
                <ListItem.Title style={{fontWeight: 'bold', fontSize: 17}}>
                  {item.name}
                </ListItem.Title>
                <ListItem.Subtitle style={{color: '#09b8b8'}}>
                  Description of disease
                </ListItem.Subtitle>
                <ListItem.Subtitle style={{color: '#c7716d'}}>
                  {item.use}
                </ListItem.Subtitle>
                <Pressable
                  style={[styles.buttonClose]}
                  onPress={() => getConsultants(item)}>
                  <Text style={styles.textStyle}>Show Consultants</Text>
                </Pressable>
              </ListItem.Content>
            </ListItem>
          )}
        />
      )}

      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Consultants</Text>
            <FlatList
              data={diseaseConsultants}
              renderItem={({item}) => (
                <ListItem
                  bottomDivider
                  style={{
                    borderWidth: 2,
                    borderColor: '#F39B97',
                    borderRadius: 7,
                    margin: 5,
                    // width: '200%',
                  }}>
                  <ListItem.Content>
                    <ListItem.Title style={{fontWeight: 'bold', fontSize: 15}}>
                      {item.name}
                    </ListItem.Title>
                    <ListItem.Subtitle style={{color: '#09b8b8'}}>
                      {item.qualifications}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={{color: '#c7716d'}}>
                      {item.clinic}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              )}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                setDiseaseConsultants([]);
              }}>
              <Text style={styles.textStyle}>Close</Text>
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
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    height: '90%',
    // borderWidth: 5,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    marginTop: 20,
  },
  buttonOpen: {
    backgroundColor: '#F39B97',
  },
  buttonClose: {
    backgroundColor: '#F39B97',
    borderRadius: 5,
    padding: 6,
    elevation: 5,
    // marginTop: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default Diseases;
