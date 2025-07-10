import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";

export default function Home() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFF7EC" }}>
  <View style={styles.header}>
  <View style={styles.avatarWrapper}>
    <Image source={require("../assets/avatar.png")} style={styles.avatar} />
  </View>
</View>
<Text style={styles.welcome}>Bem vindo(a) ao Quiz AMS!</Text>


      <View style={styles.grid}>
       <CategoryCard
  title="Programação 
  e Algoritmo"
  image={require("../assets/web.png")}
  onPress={() => router.push({ pathname: "/Splash", params: { destino: "/quizprogramacao" } })}
/>
<CategoryCard
  title="Design Digital"
  image={require("../assets/design.png")}
  onPress={() => router.push({ pathname: "/Splash", params: { destino: "/quizdesign" } })}
/>
<CategoryCard
  title="Análise e Projetos 
  de Sistemas "
  image={require("../assets/tec.png")}
  onPress={() => router.push({ pathname: "/Splash", params: { destino: "/quizanalise" } })}
/>
<CategoryCard
  title="Fundamentos 
  da Informática"
  image={require("../assets/fundamentos.png")}
  onPress={() => router.push({ pathname: "/Splash", params: { destino: "/quizfundamentos" } })}
/>

      </View>

<View style={styles.navBar}>
    <TouchableOpacity onPress={() => router.replace("/")}>
      <Image source={require("../assets/home.png")} style={styles.icon} />
    </TouchableOpacity>

    <TouchableOpacity onPress={() => router.push("/configuracoes")}>
      <Image source={require("../assets/settings.png")} style={styles.icon} />
    </TouchableOpacity>
  </View>
    </ScrollView>
  );
}

function CategoryCard({ title, image, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={image} style={styles.cardImage} />
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
  alignItems: "center",
  justifyContent: "flex-end", // posiciona o avatar mais próximo da borda inferior
  height: 140,                // altura fixa para o topo colorido
  backgroundColor: "#f6cc84", // laranja claro
  borderBottomLeftRadius: 30,
  borderBottomRightRadius: 30,
  position: "relative",
},

avatarWrapper: {
  position: "absolute",
  bottom: -40, // faz o avatar "descer" sobrepondo a área clara
  width: 100,
  height: 100,
  borderRadius: 50,
  backgroundColor: "#fff",
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 0, // opcional, já tem o branco
},

avatar: {
  width: 150,
  height: 80,
  borderRadius: 40,
},
  welcome: {
    fontFamily: "PoppinsBold",
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginTop: 50, // garante espaçamento após o avatar
  },

  grid: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-around",
  paddingVertical: 30,
},

card: {
  width: 150,
  height: 180,
  borderRadius: 20,
  alignItems: "center",
  justifyContent: "center",
  margin: 10,

  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 5,
  elevation: 4,
},

cardImage: {
  width: 140,       // aumentada
  height: 140,      // aumentada
  marginBottom: 12,
  resizeMode: "contain",
  borderRadius: 30
},

cardText: {
  fontFamily: "PoppinsBold", // agora em bold
  fontSize: 14,              // levemente maior
  textAlign: "center",
  color: "#333",
},

 navBar: {
  position: "absolute",      // Fixa na tela
  bottom: -80,                // Distância da parte inferior
  alignSelf: "center",       // Centraliza horizontalmente
  flexDirection: "row",
  justifyContent: "space-around",
  backgroundColor: "#f6cc84",
  width: 280,                // Largura menor que a tela
  paddingVertical: 16,
  paddingHorizontal: 20,
  borderRadius: 40,          // Arredondada total
  elevation: 6,              // Sombra Android
  shadowColor: "#000",       // Sombra iOS
  shadowOpacity: 0.1,
  shadowRadius: 4,
},

icon: {
  width: 40,
  height: 40,
  tintColor: "#7B3F00", // marrom escuro como na imagem
},

});
