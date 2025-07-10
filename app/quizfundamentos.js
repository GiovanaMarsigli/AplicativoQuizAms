import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";

const questions = [
  {
    question: "Qual a função dos periféricos?",
    options: [
      "a) Controlar o processador",
      "b) Gerenciar a memória RAM",
      "c) Gerenciar entrada e saída",
      "d) Criar redes internas",
    ],
    correctIndex: 2,
  },
  {
    question: "O que é sistema operacional?",
    options: [
      "a) Antivírus de fábrica",
      "b) Hardware principal",
      "c) Programa que gerencia o PC",
      "d) Site de atualizações",
    ],
    correctIndex: 2,
  },
  {
    question: "O que é barramento no PC?",
    options: [
      "a) Processador de vídeo",
      "b) Armazenamento de dados",
      "c) Comunicação interna",
      "d) Controle de impressora",
    ],
    correctIndex: 2,
  },
  {
    question: "Quem foi a 1ª programadora?",
    options: [
      "a) Alan Turing",
      "b) Charles Babbage",
      "c) Ada Lovelace",
      "d) Grace Hopper",
    ],
    correctIndex: 2,
  },
  {
    question: "Qual componente inicia o PC?",
    options: [
      "a) CPU",
      "b) Cache",
      "c) UEFI/BIOS",
      "d) SSD",
    ],
    correctIndex: 2,
  },
  {
    question: "Diferença RAM e ROM?",
    options: [
      "a) RAM permanente, ROM volátil",
      "b) RAM só para gráficos",
      "c) RAM temporária, ROM fixa",
      "d) RAM só para sistema",
    ],
    correctIndex: 2,
  },
  {
    question: "O que é processador?",
    options: [
      "a) Memória interna",
      "b) Unidade gráfica",
      "c) Executa cálculos e instruções",
      "d) Controla energia",
    ],
    correctIndex: 2,
  },
  {
    question: "Qual rede criou a internet?",
    options: [
      "a) BITNET",
      "b) ARPANET",
      "c) NSFNET",
      "d) WWW",
    ],
    correctIndex: 1,
  },
  {
    question: "O que é bit?",
    options: [
      "a) Software de segurança",
      "b) Tipo de memória",
      "c) Menor unidade: 0 ou 1",
      "d) Processador secundário",
    ],
    correctIndex: 2,
  },
  {
    question: "Função do sistema de arquivos?",
    options: [
      "a) Executa programas",
      "b) Organiza dados",
      "c) Protege contra vírus",
      "d) Cria interface gráfica",
    ],
    correctIndex: 1,
  },
  {
    question: "O que é memória ROM?",
    options: [
      "a) Memória apagável",
      "b) Armazena arquivos",
      "c) Instruções para iniciar",
      "d) Armazena programas",
    ],
    correctIndex: 2,
  },
  {
    question: "O que é hardware?",
    options: [
      "a) Parte lógica",
      "b) Programas instalados",
      "c) Parte física",
      "d) Só placa-mãe",
    ],
    correctIndex: 2,
  },
  {
    question: "O que é software?",
    options: [
      "a) Parte física",
      "b) Equipamentos conectados",
      "c) Programas e sistemas",
      "d) Só sistema operacional",
    ],
    correctIndex: 2,
  },
  {
    question: "Qual o 1º computador eletrônico?",
    options: [
      "a) Colossus",
      "b) UNIVAC",
      "c) ENIAC",
      "d) IBM 701",
    ],
    correctIndex: 2,
  },
  {
    question: "O que é dado em informática?",
    options: [
      "a) Informação útil",
      "b) Número bruto",
      "c) Apenas imagens",
      "d) Informações organizadas",
    ],
    correctIndex: 1,
  },
];


export default function QuizScreen() {
  const router = useRouter();

  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(120);
  const [lives, setLives] = useState(3);
  const [lontraTriste, setLontraTriste] = useState(false);
  const [score, setScore] = useState(0);

  const animations = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const lontraAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const embaralhar = (array) => [...array].sort(() => Math.random() - 0.5);
    setShuffledQuestions(embaralhar(questions));
  }, []);

  useEffect(() => {
    if (secondsLeft === 0 || lives === 0) {
      const pontuacaoFinal = Math.round(score);
      router.push({
        pathname: "/telaTenteNovamente",
        params: { pontuacao: pontuacaoFinal.toString() },
      });
      return;
    }
    const timerId = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [secondsLeft, lives]);

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const animarLontraTriste = () => {
    setLontraTriste(true);
    Animated.sequence([
      Animated.timing(lontraAnim, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(lontraAnim, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(lontraAnim, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(lontraAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    setTimeout(() => setLontraTriste(false), 2000);
  };

  const perderVida = () => {
    if (lives > 0) {
      animarLontraTriste();
      Animated.timing(animations[lives - 1], {
        toValue: -30,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setLives((prev) => prev - 1));
    }
  };

  const responderPergunta = (indexSelecionado) => {
  const perguntaAtual = shuffledQuestions[currentQuestionIndex];
  const pontosPorQuestao = 100 / shuffledQuestions.length;

  // Calcula pontuação com base no clique atual, sem depender do estado `score`
  let novaPontuacao = score;
  if (indexSelecionado === perguntaAtual.correctIndex) {
    novaPontuacao += pontosPorQuestao;
  } else {
    perderVida();
  }

  const proxima = currentQuestionIndex + 1;

  if (proxima < shuffledQuestions.length) {
    setScore(novaPontuacao); // atualiza o estado para visualizações futuras
    setCurrentQuestionIndex(proxima);
  } else {
    const pontuacaoFinal = Math.round(novaPontuacao); // agora corretamente 100 se acertar tudo

    if (pontuacaoFinal >= 70) {
      router.push({
        pathname: "/telaParabens",
        params: { pontuacao: pontuacaoFinal.toString() },
      });
    } else {
      router.push({
        pathname: "/telaTenteNovamente",
        params: { pontuacao: pontuacaoFinal.toString() },
      });
    }
  }
};


  if (shuffledQuestions.length === 0) return null;

  const perguntaAtual = shuffledQuestions[currentQuestionIndex];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.questionBox}>
          <Text style={[styles.questionCounter, { fontFamily: "PoppinsBold" }]}>
            {currentQuestionIndex + 1} | {shuffledQuestions.length}
          </Text>
        </View>
        <Text style={[styles.title, { fontFamily: "Poppins" }]}>Perguntas</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.timerLivesContainer}>
          <Image
            source={require("../assets/clock.png")}
            style={{ width: 20, height: 20, marginRight: 6 }}
          />
          <Text style={[styles.timer, { fontFamily: "Poppins" }]}>
            {formatTime(secondsLeft)}
          </Text>
          <View style={styles.heartsContainer}>
            {Array.from({ length: 3 }).map((_, index) => {
              if (index >= lives) return null;
              return (
                <Animated.Image
                  key={index}
                  source={require("../assets/heart.png")}
                  style={[styles.heart, { transform: [{ translateY: animations[index] }] }]}
                />
              );
            })}
          </View>
        </View>

        <Text style={[styles.questionText, { fontFamily: "PoppinsBold" }]}>
          {perguntaAtual.question}
        </Text>

        {perguntaAtual.options.map((opcao, index) => (
          <TouchableOpacity
            key={index}
            style={styles[`option${String.fromCharCode(65 + index)}`]}
            onPress={() => responderPergunta(index)}
          >
            <Text style={[styles.optionText, { fontFamily: "PoppinsBold" }]}>
              {opcao}
            </Text>
          </TouchableOpacity>
        ))}

        <Animated.Image
          source={
            lontraTriste
              ? require("../assets/lontra_triste.png")
              : require("../assets/lontra.png")
          }
          style={[styles.lontra, { transform: [{ translateX: lontraAnim }] }]}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF7EC",
    padding: 16,
    alignItems: "center",
  },

  header: {
    width: "100%",
    backgroundColor: "#faba01",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: "relative",
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 30,
    height: 140,
  },

  questionBox: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  questionCounter: {
    fontSize: 24,
    color: "#555",
  },

  title: {
    fontSize: 16,
    color: "#ffffff",
    marginTop: 4,
  },

  body: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
  },

  timerLivesContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 16,
  },

  timer: {
    fontSize: 16,
    color: "#555",
    marginLeft: 5,
  },

  heartsContainer: {
    flexDirection: "row",
    marginLeft: 140,
  },

  heart: {
    width: 24,
    height: 24,
    marginHorizontal: 5,
  },

  questionText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 24,
  },

  optionA: {
    backgroundColor: "#D93900",
    padding: 12,
    borderRadius: 20,
    width: "80%",
    marginBottom: 12,
  },

  optionB: {
    backgroundColor: "#3B5B85",
    padding: 12,
    borderRadius: 20,
    width: "80%",
    marginBottom: 12,
  },

  optionC: {
    backgroundColor: "#B6D300",
    padding: 12,
    borderRadius: 20,
    width: "80%",
    marginBottom: 12,
  },

  optionD: {
    backgroundColor: "#FFD233",
    padding: 12,
    borderRadius: 20,
    width: "80%",
    marginBottom: 12,
  },

  optionText: {
    color: "#ffffff",
    fontSize: 14,
    textAlign: "center",
  },

  lontra: {
    width: 350,
    height: 350,
    marginTop: -10,
    marginLeft: 80,
    resizeMode: "contain",
  },
});
