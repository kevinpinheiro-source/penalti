// ===== BANCO DE PERGUNTAS (Ensino Fundamental) =====
const perguntas = [
  // Matemática
  { pergunta: "Quanto é 7 + 5?", opcoes: ["10", "12", "13", "11"], correta: 1 },
  { pergunta: "Quanto é 9 × 3?", opcoes: ["27", "18", "24", "30"], correta: 0 },
  { pergunta: "Quanto é 15 − 8?", opcoes: ["6", "7", "8", "5"], correta: 1 },
  { pergunta: "Quanto é 6 × 4?", opcoes: ["20", "22", "24", "26"], correta: 2 },
  { pergunta: "Quanto é 20 ÷ 4?", opcoes: ["4", "5", "6", "3"], correta: 1 },
  { pergunta: "Qual número vem depois de 29?", opcoes: ["28", "30", "31", "39"], correta: 1 },
  { pergunta: "Quanto é 8 + 7?", opcoes: ["14", "15", "16", "13"], correta: 1 },
  { pergunta: "Quanto é 100 − 25?", opcoes: ["65", "75", "85", "70"], correta: 1 },
  { pergunta: "Qual é a metade de 18?", opcoes: ["8", "9", "10", "7"], correta: 1 },
  { pergunta: "Quanto é 3 × 8?", opcoes: ["21", "24", "27", "18"], correta: 1 },

  // Português
  { pergunta: "Qual é o plural de 'casa'?", opcoes: ["casas", "casães", "casaes", "casás"], correta: 0 },
  { pergunta: "Qual palavra é um substantivo?", opcoes: ["correr", "bonito", "escola", "rapidamente"], correta: 2 },
  { pergunta: "Qual é o contrário de 'quente'?", opcoes: ["morno", "frio", "quente", "quente"], correta: 1 },
  { pergunta: "Complete: O menino _____ bola.", opcoes: ["chuta", "chutar", "chutou", "chutando"], correta: 0 },
  { pergunta: "Qual palavra rima com 'bola'?", opcoes: ["casa", "escola", "gato", "livro"], correta: 1 },
  { pergunta: "Qual é a sílaba tônica de 'janela'?", opcoes: ["ja", "ne", "la", "jane"], correta: 1 },
  { pergunta: "Qual é o feminino de 'gato'?", opcoes: ["gata", "gatas", "gatinha", "gatoa"], correta: 0 },
  { pergunta: "Quantas letras tem a palavra 'futebol'?", opcoes: ["6", "7", "8", "9"], correta: 1 },

  // Ciências e Conhecimentos Gerais
  { pergunta: "Quantos planetas existem no Sistema Solar?", opcoes: ["7", "8", "9", "10"], correta: 1 },
  { pergunta: "Qual animal é um mamífero?", opcoes: ["peixe", "cobra", "cachorro", "pássaro"], correta: 2 },
  { pergunta: "De que cor é o Sol?", opcoes: ["azul", "verde", "amarelo", "roxo"], correta: 2 },
  { pergunta: "Qual é o maior oceano da Terra?", opcoes: ["Atlântico", "Índico", "Pacífico", "Ártico"], correta: 2 },
  { pergunta: "Quantas patas tem uma aranha?", opcoes: ["6", "8", "4", "10"], correta: 1 },
  { pergunta: "O que as plantas precisam para crescer?", opcoes: ["só água", "luz e água", "só terra", "só vento"], correta: 1 },
  { pergunta: "Qual é o planeta mais próximo do Sol?", opcoes: ["Terra", "Vênus", "Mercúrio", "Marte"], correta: 2 },
  { pergunta: "Quantos continentes existem?", opcoes: ["5", "6", "7", "8"], correta: 2 },

  // História / Geografia do Brasil
  { pergunta: "Qual é a capital do Brasil?", opcoes: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"], correta: 2 },
  { pergunta: "Em que continente fica o Brasil?", opcoes: ["África", "Ásia", "América", "Europa"], correta: 2 },
  { pergunta: "Qual é a cor da bandeira do Brasil junto com o verde?", opcoes: ["vermelho", "amarelo", "azul", "branco"], correta: 1 },
  { pergunta: "Quem descobriu o Brasil?", opcoes: ["Cristóvão Colombo", "Pedro Álvares Cabral", "Vasco da Gama", "Magalhães"], correta: 1 },
];

// ===== ESTADO DO JOGO =====
let golsJogador = 0;
let golsGoleiro = 0;
let rodadaAtual = 1;
const TOTAL_RODADAS = 5;
let perguntaAtual = null;
let perguntasUsadas = [];
let podeChutar = false;

// ===== ELEMENTOS =====
const telaInicio = document.getElementById("tela-inicio");
const telaJogo = document.getElementById("tela-jogo");
const telaFinal = document.getElementById("tela-final");
const btnComecar = document.getElementById("btn-comecar");
const btnReiniciar = document.getElementById("btn-reiniciar");
const textoPergunta = document.getElementById("texto-pergunta");
const opcoesDiv = document.getElementById("opcoes");
const escolhaDirecao = document.getElementById("escolha-direcao");
const areaPergunta = document.getElementById("area-pergunta");
const feedback = document.getElementById("feedback");
const goleiro = document.getElementById("goleiro");
const bola = document.getElementById("bola");
const golsJogadorEl = document.getElementById("gols-jogador");
const golsGoleiroEl = document.getElementById("gols-goleiro");
const numRodadaEl = document.getElementById("num-rodada");

// ===== EVENTOS =====
btnComecar.addEventListener("click", iniciarJogo);
btnReiniciar.addEventListener("click", reiniciarJogo);

document.querySelectorAll(".btn-dir").forEach(btn => {
  btn.addEventListener("click", () => {
    if (!podeChutar) return;
    const direcao = btn.dataset.dir;
    realizarChute(direcao);
  });
});

// ===== FUNÇÕES =====
function iniciarJogo() {
  golsJogador = 0;
  golsGoleiro = 0;
  rodadaAtual = 1;
  perguntasUsadas = [];
  atualizarPlacar();
  mostrarTela(telaJogo);
  novaRodada();
}

function reiniciarJogo() {
  mostrarTela(telaInicio);
}

function mostrarTela(tela) {
  [telaInicio, telaJogo, telaFinal].forEach(t => t.classList.remove("ativa"));
  tela.classList.add("ativa");
}

function atualizarPlacar() {
  golsJogadorEl.textContent = golsJogador;
  golsGoleiroEl.textContent = golsGoleiro;
  numRodadaEl.textContent = rodadaAtual;
}

function embaralhar(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function escolherPergunta() {
  const disponiveis = perguntas.filter((_, i) => !perguntasUsadas.includes(i));
  if (disponiveis.length === 0) {
    perguntasUsadas = [];
    return escolherPergunta();
  }
  const indiceOriginal = perguntas.indexOf(disponiveis[Math.floor(Math.random() * disponiveis.length)]);
  perguntasUsadas.push(indiceOriginal);
  return perguntas[indiceOriginal];
}

function novaRodada() {
  // Reset visual
  goleiro.className = "goleiro";
  bola.className = "bola-jogo";
  bola.style.left = "";
  bola.style.bottom = "";
  bola.style.transform = "";
  bola.style.opacity = "";
  feedback.classList.add("escondido");
  escolhaDirecao.classList.add("escondido");
  areaPergunta.classList.remove("escondido");
  podeChutar = false;

  perguntaAtual = escolherPergunta();
  textoPergunta.textContent = perguntaAtual.pergunta;

  // Embaralha opções
  const indices = [0, 1, 2, 3];
  const indicesEmbaralhados = embaralhar(indices);
  const opcoesEmbaralhadas = indicesEmbaralhados.map(i => perguntaAtual.opcoes[i]);
  const novaCorreta = indicesEmbaralhados.indexOf(perguntaAtual.correta);

  opcoesDiv.innerHTML = "";
  opcoesEmbaralhadas.forEach((texto, i) => {
    const btn = document.createElement("button");
    btn.className = "btn-opcao";
    btn.textContent = texto;
    btn.addEventListener("click", () => responder(i, novaCorreta));
    opcoesDiv.appendChild(btn);
  });
}

function responder(escolhida, correta) {
  const botoes = opcoesDiv.querySelectorAll(".btn-opcao");
  botoes.forEach(b => b.disabled = true);

  if (escolhida === correta) {
    botoes[escolhida].classList.add("correta");
    setTimeout(() => {
      areaPergunta.classList.add("escondido");
      escolhaDirecao.classList.remove("escondido");
      podeChutar = true;
    }, 700);
  } else {
    botoes[escolhida].classList.add("errada");
    botoes[correta].classList.add("correta");
    setTimeout(() => {
      areaPergunta.classList.add("escondido");
      realizarChute(null, true); // errou a pergunta
    }, 1200);
  }
}

function realizarChute(direcaoJogador, errouPergunta = false) {
  podeChutar = false;
  escolhaDirecao.classList.add("escondido");

  const direcoes = ["esquerda", "centro", "direita"];
  const direcaoGoleiro = direcoes[Math.floor(Math.random() * 3)];

  let ehGol = false;
  if (errouPergunta) {
    ehGol = false;
  } else {
    ehGol = direcaoJogador !== direcaoGoleiro || Math.random() > 0.45;
  }

  goleiro.classList.add(`dive-${direcaoGoleiro}`);

  bola.classList.add("chutando");
  setTimeout(() => {
    if (ehGol) {
      bola.classList.add(`gol-${direcaoJogador || "centro"}`);
    } else {
      bola.classList.add(`defesa-${direcaoGoleiro}`);
    }
  }, 50);

  setTimeout(() => {
    if (ehGol) {
      golsJogador++;
      mostrarFeedback("🎉 GOOOOL!!! ⚽", "gol");
    } else {
      golsGoleiro++;
      if (errouPergunta) {
        mostrarFeedback("❌ Errou a pergunta! Defesa do goleiro!", "erro");
      } else {
        mostrarFeedback("🧤 DEFESA INCRÍVEL!", "defesa");
      }
    }
    atualizarPlacar();

    setTimeout(() => {
      if (rodadaAtual >= TOTAL_RODADAS) {
        finalizarJogo();
      } else {
        rodadaAtual++;
        novaRodada();
      }
    }, 1800);
  }, 700);
}

function mostrarFeedback(texto, tipo) {
  feedback.textContent = texto;
  feedback.className = `feedback ${tipo}`;
  feedback.classList.remove("escondido");
}

function finalizarJogo() {
  document.getElementById("final-jogador").textContent = golsJogador;
  document.getElementById("final-goleiro").textContent = golsGoleiro;

  const titulo = document.getElementById("titulo-final");
  const mensagem = document.getElementById("mensagem-final");
  const estrelas = document.getElementById("estrelas");

  if (golsJogador > golsGoleiro) {
    titulo.textContent = "🏆 Você Venceu!";
    mensagem.textContent = `Parabéns! Você marcou ${golsJogador} gols e mostrou que sabe muito!`;
    estrelas.textContent = "⭐⭐⭐⭐⭐";
  } else if (golsJogador === golsGoleiro) {
    titulo.textContent = "🤝 Empate!";
    mensagem.textContent = `Bom jogo! Você e o goleiro ficaram empatados em ${golsJogador} gols.`;
    estrelas.textContent = "⭐⭐⭐";
  } else {
    titulo.textContent = "💪 Continue Tentando!";
    mensagem.textContent = `O goleiro ganhou desta vez (${golsGoleiro}×${golsJogador}). Pratique mais e volte mais forte!`;
    estrelas.textContent = "⭐⭐";
  }

  mostrarTela(telaFinal);
}
