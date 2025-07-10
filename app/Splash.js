import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Image, StyleSheet, Dimensions } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Poppins_800ExtraBold } from "@expo-google-fonts/poppins";

const { height } = Dimensions.get("window");

export default function SplashAnimation() {
  const translateY = useRef(new Animated.Value(height)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const router = useRouter();
  const { destino } = useLocalSearchParams(); // pega qual quiz deve abrir depois

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        router.push(destino); // vai pro quiz correto
      }, 2000);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz AMS</Text>
      <Text style={styles.subtitle}>Quem não compila, trava.{"\n"}Bora pro quiz?</Text>

      <Animated.Image
        source={require("../assets/lontrinha.png")}
        style={[styles.image, { transform: [{ translateY }], opacity }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbe2a4",
    justifyContent: "center",
    alignItems: "center",
  },
 title: {
  fontSize: 36,
  fontFamily: "PoppinsBold", // Fonte Poppins Bold
  color: "#333",
},
subtitle: {
  fontSize: 16,
  fontFamily: "Poppins", // Fonte Poppins Regular ou SemiBold (se quiser mais destaque)
  textAlign: "center",
  color: "#555",
  marginVertical: 12,
},

  image: {
    width: 350,
    height: 350,
    position: "absolute",
    bottom: 0,
  },
});
