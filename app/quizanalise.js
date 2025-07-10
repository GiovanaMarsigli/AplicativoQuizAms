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
    question: "O que é um sistema?",
    options: [
      "a) Conjunto de programas",
      "b) Banco de dados online",
      "c) Elementos interdependentes",
      "d) Processo técnico",
    ],
    correctIndex: 2,
  },
  {
    question: "O que é requisito funcional?",
    options: [
      "a) Regra de tempo do sistema",
      "b) Função que sistema faz",
      "c) Limitação do hardware",
      "d) Regra de estilo",
    ],
    correctIndex: 1,
  },
  {
    question: "O que é ator em caso de uso?",
    options: [
      "a) Módulo do sistema",
      "b) Usuário externo",
      "c) Banco de dados",
      "d) Variável externa",
    ],
    correctIndex: 1,
  },
  {
    question: "O que é diagrama de classes?",
    options: [
      "a) Hierarquia de usuários",
      "b) Modelo dos dados",
      "c) Classes, métodos e atributos",
      "d) Mapa de redes",
    ],
    correctIndex: 2,
  },
  {
    question: "O que é caso de uso?",
    options: [
      "a) Script de teste",
      "b) Cenário de interação",
      "c) Modelo de banco",
      "d) Conjunto de classes",
    ],
    correctIndex: 1,
  },
  {
    question: "Símbolo de decisão em atividade?",
    options: [
      "a) Retângulo",
      "b) Círculo",
      "c) Losango",
      "d) Seta",
    ],
    correctIndex: 2,
  },
  {
    question: "O que é requisito não funcional?",
    options: [
      "a) Funcionalidade obrigatória",
      "b) Regra de negócio",
      "c) Desempenho e segurança",
      "d) Bug do sistema",
    ],
    correctIndex: 2,
  },
  {
    question: "Para que serve a UML?",
    options: [
      "a) Documentar código",
      "b) Criar apps",
      "c) Modelar sistemas",
      "d) Testar softwares",
    ],
    correctIndex: 2,
  },
  {
    question: "O que é generalização na UML?",
    options: [
      "a) Agrupamento de tabelas",
      "b) Conexão entre atores",
      "c) Relação superclasse/sub",
      "d) Teste funcional",
    ],
    correctIndex: 2,
  },
  {
    question: "Método em itálico no diagrama?",
    options: [
      "a) Método de teste",
      "b) Método privado",
      "c) Método abstrato",
      "d) Método opcional",
    ],
    correctIndex: 2,
  },
  {
    question: "O que é herança O.O.?",
    options: [
      "a) Código duplicado",
      "b) Instância isolada",
      "c) Classe que herda outra",
      "d) Módulo de segurança",
    ],
    correctIndex: 2,
  },
  {
    question: "O que é caso de uso alternativo?",
    options: [
      "a) Fluxo de erro",
      "b) Caminho secundário",
      "c) Requisito opcional",
      "d) Bug esperado",
    ],
    correctIndex: 1,
  },
  {
    question: "O que é pacote na UML?",
    options: [
      "a) Grupo de atores",
      "b) Diretório de configs",
      "c) Agrupamento de classes",
      "d) Teste unitário",
    ],
    correctIndex: 2,
  },
  {
    question: "O que é associação UML?",
    options: [
      "a) Tipo de herança",
      "b) Conexão estrutural",
      "c) Método abstrato",
      "d) Interface de usuário",
    ],
    correctIndex: 1,
  },
  {
    question: "Multiplicidade 0..* significa?",
    options: [
      "a) Nenhuma ou várias",
      "b) Uma obrigatória",
      "c) Relação fixa dois",
      "d) Laço de repetição",
    ],
    correctIndex: 0,
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
