// ---- SEÇÃO DE MÚSICA ----

var ritmos = {
  samba: {
    titulo: "Samba",
    descricao: "O samba nasceu no Rio de Janeiro no início do século XX com forte influência africana. Em 2003, foi declarado Patrimônio Cultural Imaterial da Humanidade pela UNESCO.",
    artistas: "Artistas famosos: Cartola, Zeca Pagodinho, Beth Carvalho, Alcione."
  },
  forro: {
    titulo: "Forró",
    descricao: "O forró é o ritmo mais famoso do Nordeste brasileiro. Foi popularizado por Luiz Gonzaga e é muito presente nas festas juninas de todo o país.",
    artistas: "Artistas famosos: Luiz Gonzaga, Dominguinhos, Falamansa."
  },
  bossa: {
    titulo: "Bossa Nova",
    descricao: "A Bossa Nova surgiu no final dos anos 1950 no Rio de Janeiro, misturando samba com jazz. A música 'Garota de Ipanema' é uma das mais tocadas no mundo.",
    artistas: "Artistas famosos: Tom Jobim, João Gilberto, Vinícius de Moraes."
  },
  axe: {
    titulo: "Axé",
    descricao: "O axé é um gênero musical baiano que mistura ritmos africanos e caribenhos. Foi muito popular nos anos 1990 e ainda é muito tocado no carnaval da Bahia.",
    artistas: "Artistas famosos: Ivete Sangalo, Daniela Mercury, Margareth Menezes."
  }
};

function mostrarInfo(ritmo) {
  var info = ritmos[ritmo];
  document.getElementById("ritmo-titulo").textContent = info.titulo;
  document.getElementById("ritmo-descricao").textContent = info.descricao;
  document.getElementById("ritmo-artistas").textContent = info.artistas;
  document.getElementById("info-ritmo").style.display = "block";
}


var perguntas = [
  {
    pergunta: "Qual é o prato considerado o prato nacional do Brasil?",
    opcoes: ["Moqueca", "Feijoada", "Churrasco", "Coxinha"],
    correta: 1
  },
  {
    pergunta: "Qual ritmo brasileiro foi declarado Patrimônio da Humanidade pela UNESCO?",
    opcoes: ["Forró", "Axé", "Samba", "Bossa Nova"],
    correta: 2
  },
  {
    pergunta: "Em qual cidade ocorre a maior Oktoberfest fora da Alemanha?",
    opcoes: ["Curitiba", "Porto Alegre", "Joinville", "Blumenau"],
    correta: 3
  },
  {
    pergunta: "O acarajé é típico de qual estado?",
    opcoes: ["Pernambuco", "Ceará", "Bahia", "Maranhão"],
    correta: 2
  },
  {
    pergunta: "Quantas vezes o Brasil ganhou a Copa do Mundo?",
    opcoes: ["3 vezes", "4 vezes", "5 vezes", "6 vezes"],
    correta: 2
  }
];

var perguntaAtual = 0;
var pontuacao = 0;
var respondeu = false;

function carregarPergunta() {
  var p = perguntas[perguntaAtual];
  document.getElementById("numero-pergunta").innerHTML = "<strong>Pergunta " + (perguntaAtual + 1) + " de " + perguntas.length + "</strong>";
  document.getElementById("pergunta-texto").textContent = p.pergunta;
  document.getElementById("feedback-quiz").textContent = "";
  document.getElementById("btn-proxima").style.display = "none";
  respondeu = false;

  var container = document.getElementById("opcoes-quiz");
  container.innerHTML = "";

  for (var i = 0; i < p.opcoes.length; i++) {
    var btn = document.createElement("button");
    btn.className = "opcao";
    btn.textContent = p.opcoes[i];
    btn.setAttribute("data-index", i);
    btn.onclick = verificarResposta;
    container.appendChild(btn);
  }
}

function verificarResposta(event) {
  if (respondeu) return;
  respondeu = true;

  var indice = parseInt(event.target.getAttribute("data-index"));
  var p = perguntas[perguntaAtual];
  var botoes = document.querySelectorAll(".opcao");

  botoes.forEach(function(btn) {
    btn.disabled = true;
  });

  botoes[p.correta].classList.add("certa");

  if (indice === p.correta) {
    pontuacao++;
    document.getElementById("feedback-quiz").textContent = "Resposta correta.";
    document.getElementById("feedback-quiz").style.color = "green";
  } else {
    botoes[indice].classList.add("errada");
    document.getElementById("feedback-quiz").textContent = "Resposta errada. A certa era: " + p.opcoes[p.correta];
    document.getElementById("feedback-quiz").style.color = "red";
  }

  document.getElementById("btn-proxima").style.display = "inline-block";
}

function proximaPergunta() {
  perguntaAtual++;
  if (perguntaAtual < perguntas.length) {
    carregarPergunta();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("resultado-final").style.display = "block";

  var msg = "";
  if (pontuacao === 5) {
    msg = "Parabéns! Você acertou todas as " + pontuacao + " perguntas! 🏆";
  } else if (pontuacao >= 3) {
    msg = "Muito bem! Você acertou " + pontuacao + " de 5 perguntas.";
  } else {
    msg = "Você acertou " + pontuacao + " de 5 perguntas. Estude mais sobre o Brasil!";
  }

  document.getElementById("texto-resultado").textContent = msg;
}

function reiniciarQuiz() {
  perguntaAtual = 0;
  pontuacao = 0;
  document.getElementById("quiz-container").style.display = "block";
  document.getElementById("resultado-final").style.display = "none";
  carregarPergunta();
}

carregarPergunta();

document.getElementById("form-contato").addEventListener("submit", function(event) {
  event.preventDefault();

  var nome = document.getElementById("nome").value;
  var email = document.getElementById("email").value;
  var mensagem = document.getElementById("mensagem").value;

  if (nome === "" || email === "" || mensagem === "") {
    document.getElementById("msg-status").textContent = "Por favor, preencha todos os campos.";
    document.getElementById("msg-status").style.color = "red";
    return;
  }

  document.getElementById("msg-status").textContent = "Mensagem enviada com sucesso! Obrigado, " + nome + "!";
  document.getElementById("msg-status").style.color = "green";
  document.getElementById("form-contato").reset();
});
