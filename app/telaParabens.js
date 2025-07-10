import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import ConfettiCannon from "react-native-confetti-cannon";

export default function TelaParabens() {
  const router = useRouter();
  const { pontuacao } = useLocalSearchParams();

  const fadeAnim = useRef(new Animated.Value(0)).current;  // opacidade inicial 0
  const scaleAnim = useRef(new Animated.Value(0.5)).current; // escala inicial 0.5

  const [showConfetti, setShowConfetti] = useState(false);

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
    ]).start(() => {
      setShowConfetti(true);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/parabens-lontra.png")}
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
      <Text style={styles.texto}>Sua pontuação:</Text>
      <Text style={styles.pontuacao}>{pontuacao}</Text>


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

      {showConfetti && (
        <ConfettiCannon
          count={100}
          origin={{ x: -10, y: 0 }}
          fadeOut={true}
          autoStart={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "#f6cc84",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: 60, // aumenta o espaçamento superior
  paddingHorizontal: 20, // mantém o espaçamento lateral
},

imagem: {
  width: 300,
  height: 300,
  position: "absolute",
  top: 120,                // ajusta verticalmente
  zIndex: 2,
  alignSelf: "center",
},

card: {
  backgroundColor: "#FFE28C",
  paddingTop: 140,        // espaço para a imagem que está por cima
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
  textShadowColor: 'rgba(0, 0, 0, 0.3)',  // sombra preta com 30% de opacidade
  textShadowOffset: { width: 2, height: 2 }, // deslocamento da sombra
  textShadowRadius: 4, // espalhamento da sombra
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
  paddingVertical: 18,   // aumenta altura
  paddingHorizontal: 22, // aumenta largura
  borderRadius: 18,      // arredondamento proporcional
},

icone: {
  width: 40,   // aumenta ícone
  height: 40,
},

});
