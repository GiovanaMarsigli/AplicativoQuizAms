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
    question: "O que é um algoritmo?",
    options: [
      "a) Um tipo de hardware",
      "b) Um sistema operacional",
      "c) Passos para resolver",
      "d) Um erro de código",
    ],
    correctIndex: 2,
  },
  {
    question: "O que é um loop?",
    options: [
      "a) Erro que trava o sistema",
      "b) Código roda só uma vez",
      "c) Função que gera relatório",
      "d) Repetição condicional",
    ],
    correctIndex: 3,
  },
  {
    question: "O que é a estrutura for?",
    options: [
      "a) Um tipo de dado",
      "b) Erro de sintaxe",
      "c) Laço de repetição",
      "d) Um comentário",
    ],
    correctIndex: 2,
  },
  {
    question: "O que é pseudocódigo?",
    options: [
      "a) Código falso",
      "b) Texto da lógica",
      "c) Um erro comum",
      "d) Linguagem gráfica",
    ],
    correctIndex: 1,
  },
  {
    question: "O que são variáveis?",
    options: [
      "a) Comandos fixos",
      "b) Blocos de repetição",
      "c) Espaços para dados",
      "d) Métodos de estilo",
    ],
    correctIndex: 2,
  },
  {
    question: "Por que indentação importa?",
    options: [
      "a) Afeta desempenho",
      "b) Melhora legibilidade",
      "c) É opcional sempre",
      "d) Reduz memória",
    ],
    correctIndex: 1,
  },
  {
    question: "Para que serve a tag div?",
    options: [
      "a) Mostrar imagens",
      "b) Criar botões",
      "c) Agrupar elementos",
      "d) Gerar listas",
    ],
    correctIndex: 2,
  },
  {
    question: "O que faz alert()?",
    options: [
      "a) Fecha navegador",
      "b) Mostra aviso",
      "c) Cria nova aba",
      "d) Envia mensagem",
    ],
    correctIndex: 1,
  },
  {
    question: "Como mudar fundo no CSS?",
    options: [
      "a) set-color",
      "b) bg-color",
      "c) background-color",
      "d) color-bg",
    ],
    correctIndex: 2,
  },
  {
    question: "O que é um vetor?",
    options: [
      "a) Código que repete",
      "b) Botão de entrada",
      "c) Guarda valores",
      "d) Tipo de layout",
    ],
    correctIndex: 2,
  },
  {
    question: "Qual JOIN mostra só pares?",
    options: [
      "a) LEFT JOIN",
      "b) RIGHT JOIN",
      "c) FULL JOIN",
      "d) INNER JOIN",
    ],
    correctIndex: 3,
  },
  {
    question: "O que faz o SELECT?",
    options: [
      "a) Exclui dados",
      "b) Atualiza registros",
      "c) Consulta dados",
      "d) Cria tabela",
    ],
    correctIndex: 2,
  },
  {
    question: "System.out.println() é?",
    options: [
      "a) Cria variável",
      "b) Mostra mensagem",
      "c) Salva arquivo",
      "d) Fecha sistema",
    ],
    correctIndex: 1,
  },
  {
    question: "O que é um método?",
    options: [
      "a) Tipo de variável",
      "b) Erro de código",
      "c) Executa tarefa",
      "d) Banco de dados",
    ],
    correctIndex: 2,
  },
  {
    question: "O que é CRUD?",
    options: [
      "a) Copiar, Rodar, Usar",
      "b) Criar, Ler, Atualizar, Deletar",
      "c) Codificar, Refatorar",
      "d) Carregar, Revisar",
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
