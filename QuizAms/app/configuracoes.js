import React, { useState } from "react";
import { View, Text, Switch, StyleSheet, TouchableOpacity } from "react-native";

export default function TelaConfiguracoes() {
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);
  const [modoEscuro, setModoEscuro] = useState(false);

  function toggleNotificacoes() {
    setNotificacoesAtivas((prev) => !prev);
  }

  function toggleModoEscuro() {
    setModoEscuro((prev) => !prev);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Configurações</Text>

      <View style={styles.opcao}>
        <Text style={styles.label}>Notificações</Text>
        <Switch
          value={notificacoesAtivas}
          onValueChange={toggleNotificacoes}
          thumbColor={notificacoesAtivas ? "#4caf50" : "#f4f3f4"}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
        />
      </View>

      <View style={styles.opcao}>
        <Text style={styles.label}>Modo Escuro</Text>
        <Switch
          value={modoEscuro}
          onValueChange={toggleModoEscuro}
          thumbColor={modoEscuro ? "#222" : "#f4f3f4"}
          trackColor={{ false: "#767577", true: "#000" }}
        />
      </View>

      <TouchableOpacity style={styles.botaoSair} onPress={() => alert("Sair da conta")}>
        <Text style={styles.textoBotao}>Sair da Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 30,
  },
  opcao: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  label: {
    fontSize: 18,
  },
  botaoSair: {
    marginTop: 40,
    backgroundColor: "#e53935",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
