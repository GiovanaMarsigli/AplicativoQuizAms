import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';

const LoadingPage = ({ navigation }) => {
  useEffect(() => {
    // Simula carregamento (substitua por lógica real se precisar)
    const timer = setTimeout(() => {
      navigation.replace('/index'); // Vai para a tela principal sem voltar
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/loading-logo.png')} // Coloque sua imagem aqui
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.progressBar}>
        <View style={styles.progressFill} />
      </View>
      <Text style={styles.loadingText}>Loading</Text>
    </View>
  );
};

export default LoadingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef6e9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  progressBar: {
    width: 200,
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    width: '70%',
    height: '100%',
    backgroundColor: '#f6cc84',
  },
 loadingText: {
  fontSize: 14,
  color: '#555',
  fontFamily: 'PoppinsBold',
},

});
