import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function TelaTenteNovamente() {
  const router = useRouter();
  const { pontuacao } = useLocalSearchParams();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/lontra-tente-novamente.png")}
        style={[
          styles.imagem,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
        resizeMode="contain"
      />

      <View style={styles.card}>
        <Text style={styles.texto}>Sua pontuação: </Text>
        <Text style={styles.pontuacao}> {pontuacao} </Text>

        <View style={styles.botoesContainer}>
          <TouchableOpacity
            onPress={() => router.replace("/quizdesign")}
            style={styles.botao}
          >
            <Image
              source={require("../assets/reiniciar.png")}
              style={styles.icone}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace("/")}
            style={styles.botao}
          >
            <Image
              source={require("../assets/home.png")}
              style={styles.icone}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6cc84",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  imagem: {
    width: 300,
    height: 300,
    position: "absolute",
    top: 120,
    zIndex: 2,
    alignSelf: "center",
  },

  card: {
    backgroundColor: "#FFE28C",
    paddingTop: 140,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderRadius: 32,
    alignItems: "center",
    width: "90%",
    minHeight: 300,
    zIndex: 1,
  },

  texto: {
    fontSize: 28,
    fontFamily: "PoppinsBold",
    color: "#333",
    marginTop: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },

  pontuacao: {
    fontSize: 32,
    fontFamily: "PoppinsBold",
    color: "#222",
    marginVertical: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  botoesContainer: {
    flexDirection: "row",
    gap: 20,
    marginTop: 16,
  },

  botao: {
    backgroundColor: "#FABB00",
    paddingVertical: 18,
    paddingHorizontal: 22,
    borderRadius: 18,
  },

  icone: {
    width: 40,
    height: 40,
  },
});
