import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ImageSelector from '../../components/image-selector/image-selector.component';
import LocationPicker from '../../components/location-picker/location-picker.component';
import COLORS from '../../constants/colors';

import {addLocation} from '../../redux/locations/locations.thunks';
import {selectNewLocationSelectedLocation} from '../../redux/new-location/new-location.selectors';

const NewLocationScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const selectedLocation = useSelector(selectNewLocationSelectedLocation);
  const [titleValue, setTitleValue] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [position, setPosition] = useState('');

  useEffect(() => {
    if (selectedLocation) {
      setPosition({
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
      });
    }
  }, [selectedLocation]);

  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  const saveLocationHandler = () => {
    if (!titleValue) {
      Alert.alert('Invalid title.', 'Input the valid location title!', [
        {
          text: 'OK',
        },
      ]);
      return;
    }

    if (!position) {
      Alert.alert('Select geolocation.', 'No geolocation selected.', [
        {
          text: 'OK',
        },
      ]);
      return;
    }

    dispatch(
      addLocation({
        title: titleValue,
        location: position,
        imagePath: imageUri,
      }),
    );
    navigation.navigate('locations');
  };

  const imageTakenHandler = (uri) => {
    setImageUri(uri);
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <ImageSelector onImageTaken={imageTakenHandler} />
        <LocationPicker />
        <Text style={styles.label}>Title</Text>
        <TextInput
          onChangeText={titleChangeHandler}
          value={titleValue}
          style={styles.textInput}
        />
        <Button
          title="Save location"
          onPress={saveLocationHandler}
          color={COLORS.primary}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 20,
  },
  label: {
    marginTop: 20,
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    marginBottom: 15,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 5,
  },
});

export default NewLocationScreen;
