let jogo;

const elementos = {
  telaInicial: document.getElementById('inicial'),
  telaJogo: document.getElementById('jogo'),
  telaCadastro: document.getElementById('cadastro'),
  telaMensagem: document.querySelector('.mensagem'),
  textoMensagem: document.querySelector('.mensagem .texto'),
  teclado: document.querySelector('.teclado'),
  palavra: document.querySelector('.palavra'),
  dica: document.getElementById('dica'),
  formulario : document.querySelector('.form'),
  botoes: {
    facil: document.querySelector('.botao-facil'),
    medio: document.querySelector('.botao-medio'),
    dificil: document.querySelector('.botao-dificil'),
    menu: document.querySelector('.menu'),
    cadastrar: document.querySelector('.cadastrar'),
    adicionarPalavra: document.querySelector('.botao-cadastro'),
  },
  boneco: [
    document.querySelector('.boneco-cabeca'),
    document.querySelector('.boneco-corpo'),
    document.querySelector('.boneco-braco-esquerdo'),
    document.querySelector('.boneco-braco-direito'),
    document.querySelector('.boneco-perna-esquerda'),
    document.querySelector('.boneco-perna-direita'),
  ],
};

const palavras = {
  facil: [{valor: 'anciã', dica: 'mulher de idade avançada, respeitável'}, 
  {valor: 'série', dica: 'classe, categoria'}, 
  {valor: 'morte', dica: 'fim da vida'}, 
  {valor: 'maior', dica: 'que supera outro em quantidade, grandeza'},
  {valor: 'noite', dica: 'horário em que está escuro'},
  {valor: 'ímpar', dica: 'número não divisível por 2'},
  {valor: 'salvo', dica: 'algo preservado, intacto'},
  {valor: 'vetor', dica: 'na informática, estrutura que armazena um conjunto de dados'},
  {valor: 'pizza', dica: 'alimento de forma redonda de origem italiana'},
  {valor: 'sagaz', dica: 'pessoa que não se deixa ser enganada'},],

  medio: [{valor: 'cônjuge', dica: 'pessoa com quem se tem uma relação semelhante ao casamento'},
  {valor: 'exceção', dica: 'ruptura de regra ou norma'},
  {valor: 'efêmero', dica: 'que tem curta duração, temporário'},
  {valor: 'prolixo', dica: 'que usa palavras em excesso'},
  {valor: 'idílico', dica: 'que resulta de um sonho, de um devaneio, de uma utopia'},
  {valor: 'análogo', dica: 'que é semelhante, idêntico a outra coisa ou pessoa'},
  {valor: 'caráter', dica: 'formação moral, índole'},
  {valor: 'genuíno', dica: 'algo verdadeiro, puro, correto'},
  {valor: 'estória', dica: 'texto popular, narrativa infantil'},
  {valor: 'sublime', dica: 'que transcende o humano, não é ordinário, comum'},],

  dificil: [{valor: 'concepção', dica: 'conhecimento sobre algo, ideia'},
  {valor: 'plenitude', dica: 'condição daquilo que está completo, inteiro, sem espaço'},
  {valor: 'essencial', dica: 'algo muito necessário, fundamental'},
  {valor: 'hipócrita', dica: 'pessoa que finge sentir o que não sente, falso'},
  {valor: 'perspicaz', dica: 'que possui inteligência e sagacidade'},
  {valor: 'paradigma', dica: 'padrão já estabelecido, norma'},
  {valor: 'dicotomia', dica: 'oposição entre duas coisas, ex: o bem e o mal'},
  {valor: 'hegemonia', dica: 'influência absoluta, liderança ou superioridade'},
  {valor: 'ratificar', dica: 'validar um ato ou compromisso'},
  {valor: 'propósito', dica: 'aquilo que se busca realizar, alcançar'},],
};

const cadastrarPalavra = () => {
  elementos.telaInicial.style.display = 'none';
  elementos.telaCadastro.style.display = 'flex';
  elementos.textoMensagem.textContent = 'Voltar ao menu'
  elementos.botoes.menu.style.display = 'flex';
  elementos.botoes.cadastrar.style.display = 'none';
}

const novoJogo = () => {
  jogo = {
    dificuldade: undefined,
    palavra: {
      original: undefined,
      semAcentos: undefined,
      tamanho: undefined,
    },
    acertos: undefined,
    jogadas: [],
    chances: 6,

    definirPalavra: function (palavra, dica) {
      elementos.dica.textContent = `Dica: ${dica}.`
      this.palavra.original = palavra;
      this.palavra.tamanho = palavra.length;
      this.acertos = '';
      this.palavra.semAcentos = this.palavra.original.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      for (let i = 0; i < this.palavra.tamanho; i++) {
        this.acertos += ' ';
      }
    },
    jogar: function (letraJogada) {
      let acertou = false;
      for (let i = 0; i < this.palavra.tamanho; i++) {
        const letra = this.palavra.semAcentos[i].toLowerCase();
        if (letra === letraJogada.toLowerCase()) {
          acertou = true;
          this.acertos = replace(this.acertos, i, this.palavra.original[i]);
        }
      }
      if (!acertou) {
        this.chances--;
      }
      return acertou;
    },
    ganhou: function () {
      return !this.acertos.includes(' ');
    },
    perdeu: function () {
      return this.chances <= 0;
    },
    acabou: function () {
      return this.ganhou() || this.perdeu();
    },
  };

  elementos.formulario.reset();
  
  elementos.botoes.menu.style.display = 'none';
  elementos.botoes.cadastrar.style.display = 'flex';

  elementos.dica.style.display = 'none';
  elementos.telaInicial.style.display = 'flex';
  elementos.telaJogo.style.display = 'none';
  elementos.telaCadastro.style.display = 'none';
  elementos.telaMensagem.style.display = 'flex';
  elementos.telaMensagem.classList.remove('mensagem-vitoria');
  elementos.telaMensagem.classList.remove('mensagem-derrota');
  elementos.textoMensagem.textContent = 'Cadastrar Palavra';
  for (const parte of elementos.boneco) {
    parte.classList.remove('escondido');
    parte.classList.add('escondido');
  }

  criarTeclado();
};

const criarTeclado = () => {
  const letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  elementos.teclado.textContent = '';
  for (const letra of letras) {
    const button = document.createElement('button');
    button.appendChild(document.createTextNode(letra.toUpperCase()));
    button.classList.add(`botao-${letra}`);

    elementos.teclado.appendChild(button);

    button.addEventListener('click', () => {
      if (!jogo.jogadas.includes(letra) && !jogo.acabou()) {
        const acertou = jogo.jogar(letra);
        jogo.jogadas.push(letra);
        button.classList.add(acertou ? 'certo' : 'errado');
        mostrarPalavra();

        if (!acertou) {
          mostrarErro();
        }

        if (jogo.ganhou()) {
          mostrarMensagem(true);
        } else if (jogo.perdeu()) {
          mostrarMensagem(false);
        }
      }
    });
  }
};

const mostrarErro = () => {
  const parte = elementos.boneco[5 - jogo.chances];
  parte.classList.remove('escondido');
};

const mostrarMensagem = vitoria => {
  const mensagem = vitoria ? '<p>Parabéns!</p><p>Você GANHOU!</p>' : '<p>Que pena!</p><p>Você PERDEU!</p>';
  elementos.textoMensagem.innerHTML = mensagem;
  elementos.telaMensagem.style.display = 'flex';  
  elementos.botoes.menu.style.display = 'flex';
  elementos.botoes.cadastrar.style.display = 'none';
  elementos.telaMensagem.classList.add(`mensagem-${vitoria ? 'vitoria' : 'derrota'}`);
};

const sortearPalavra = () => {
  const i = Math.floor(Math.random() * palavras[jogo.dificuldade].length);
  const palavra = palavras[jogo.dificuldade][i].valor;
  const dica = palavras[jogo.dificuldade][i].dica;
  jogo.definirPalavra(palavra, dica);

  console.log(jogo.palavra.original);
 

  return jogo.palavra.original;
};

const mostrarPalavra = () => {
  elementos.palavra.textContent = '';
  for (let i = 0; i < jogo.acertos.length; i++) {
    const letra = jogo.acertos[i].toUpperCase();
    elementos.palavra.innerHTML += `<div class="letra-${i}">${letra}</div>`;
  }
};

const iniciarJogo = dificuldade => {
  jogo.dificuldade = dificuldade;
  elementos.telaInicial.style.display = 'none';
  elementos.telaJogo.style.display = 'flex';
  elementos.dica.style.display = 'flex';
  elementos.telaMensagem.style.display = 'none';

  sortearPalavra();
  mostrarPalavra();

};

const adicionarPalavra = () => {

  const novaPalavra = document.getElementById('nova-palavra').value;
  const novaDica = document.getElementById('nova-dica').value;
  const novaDificuldade = document.getElementById('nova-dificuldade').value;

  if(!novaPalavra || !novaDica || novaDificuldade == 'vazio'){
    alert("Erro! Alguma informação está vazia!");
    
  }else if((novaPalavra.length != 5 && novaDificuldade == 'facil') || 
           (novaPalavra.length != 7 && novaDificuldade == 'medio') ||
           (novaPalavra.length != 9 && novaDificuldade == 'dificil')){
    alert("Erro! O número de letras da palavra não corresponde à dificuldade selecionada!");
  }else{
    if(novaDificuldade == 'facil'){
      palavras.facil.push({valor: novaPalavra, dica: novaDica});
      console.log(palavras.facil);
      alert("Palavra adicionada com sucesso!");
    }
    if(novaDificuldade == 'medio'){
      palavras.medio.push({valor: novaPalavra, dica: novaDica});
      console.log(palavras.medio);
      alert("Palavra adicionada com sucesso!"); 
    }
    if(novaDificuldade == 'dificil'){
      palavras.dificil.push({valor: novaPalavra, dica: novaDica});
      console.log(palavras.dificil);
      alert("Palavra adicionada com sucesso!");      
    }
    novoJogo();
  }
}

const replace = (str, i, newChar) => str.substring(0, i) + newChar + str.substring(i + 1);

elementos.botoes.facil.addEventListener('click', () => iniciarJogo('facil'));
elementos.botoes.medio.addEventListener('click', () => iniciarJogo('medio'));
elementos.botoes.dificil.addEventListener('click', () => iniciarJogo('dificil'));

elementos.botoes.cadastrar.addEventListener('click', () => cadastrarPalavra());
elementos.botoes.menu.addEventListener('click', () => novoJogo());

elementos.botoes.adicionarPalavra.addEventListener('click', () => adicionarPalavra());

novoJogo();
