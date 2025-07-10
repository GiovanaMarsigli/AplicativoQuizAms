// app/_layout.tsx
import React from "react";
import { Slot } from "expo-router";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { View, Text, ActivityIndicator } from "react-native";

import AudioProvider from "../components/AudioProvider";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Poppins: Poppins_400Regular,
    PoppinsSemiBold: Poppins_600SemiBold,
    PoppinsBold: Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Carregando fontes...</Text>
      </View>
    );
  }

  return (
    <AudioProvider>
      <Slot />
    </AudioProvider>
  );
}
