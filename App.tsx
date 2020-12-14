import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";

const ROUTE = [
  {
    id: 1,
    lat: 0,
    long: 0,
    direction: "left",
    severity: "easy",
  },
  {
    id: 2,
    lat: 0,
    long: 0,
    direction: "right",
    severity: "sharp",
  },
];

export default function App() {
  const [location, setLocation] = useState({
    lat: 0,
    long: 0,
  });
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        lat: location.coords.latitude,
        long: location.coords.longitude,
      });
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>latitude: {location?.lat}</Text>
      <Text style={styles.paragraph}>longitude: {location?.long}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#1F2A33",
  },
  paragraph: { fontSize: 50, paddingLeft: 20, color: "#fff" },
});
