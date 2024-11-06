import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location'; // Make sure this import is correct

const MapScreen = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [dataLoggerLocations, setDataLoggerLocations] = useState([
    { id: '1', latitude: 14.688445, longitude: 120.957051, title: 'Data Logger 1', description: 'Status: Good' },
    { id: '2', latitude: 14.714729, longitude: 120.973008, title: 'Data Logger 2', description: 'Status: Good' },
    { id: '3', latitude: 14.706994, longitude: 120.960775, title: 'Data Logger 3', description: 'Status: Needs Maintenance' },
    // Add more data logger locations here
  ]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  if (!userLocation) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    ); // Show a loading indicator
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={userLocation}
      showsUserLocation={true}
    >
      {dataLoggerLocations.map(logger => (
        <Marker
          key={logger.id}
          coordinate={{ latitude: logger.latitude, longitude: logger.longitude }}
          title={logger.title}
          description={logger.description}
          image={require('../assets/LoggerIcon.png')}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapScreen;