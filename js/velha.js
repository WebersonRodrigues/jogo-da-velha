// Criando um módulo para deixar o código privado.
(()=>{

    // Declarando variáveis e objetos utilizados para o jogo.
    const TEXTO_USUARIO_X = 'Usuário X:  ';
    const TEXTO_USUARIO_O = 'Usuário O:  ';

    let jogadorAtual = {};
    let jogadas = [];
    let emJogo = false;
    let jogo = {
        jogada1: document.querySelector('.jogo-velha-1'),
        jogada2: document.querySelector('.jogo-velha-2'),
        jogada3: document.querySelector('.jogo-velha-3'),
        jogada4: document.querySelector('.jogo-velha-4'),
        jogada5: document.querySelector('.jogo-velha-5'),
        jogada6: document.querySelector('.jogo-velha-6'),
        jogada7: document.querySelector('.jogo-velha-7'),
        jogada8: document.querySelector('.jogo-velha-8'),
        jogada9: document.querySelector('.jogo-velha-9')
    }

    let jogadorX = {
        nome:'',
        valor: 'X',
        pontos: 0
    }

    let jogadorO = {
        nome:'',
        valor: 'O',
        pontos: 0
    }

    var opcoes = {
        divOpcoesJogo : document.querySelector('.opcoes-jogo'),
        usuarioX : document.getElementById('usuario-x'),
        usuarioO : document.getElementById('usuario-o'),
        btnJogar : document.getElementById('btn-jogar')
    };

    var painel = {
        painelOpcoesJogo : document.querySelector('.painel-opcoes'),
        nomeX : document.getElementById('painel-usuario-x-nome'),
        nomeO : document.getElementById('painel-usuario-o-nome'),
        pontosX : document.getElementById('painel-usuario-x-pontos'),
        pontosO : document.getElementById('painel-usuario-o-pontos'),
        nomeProximoJogador: document.getElementById('proximo-jogador')
    };

    // Capturando os eventos de click
    opcoes.btnJogar.addEventListener('click', () => {

        jogadorX.nome = opcoes.usuarioX.value;
        jogadorO.nome = opcoes.usuarioO.value;

        if(!jogadorX.nome || !jogadorO.nome){
            alert('Favor informar os usuarios X e O para iniciar o jogo.');
            return;
        }

        // Alterar os nomes dos jogadores...
        painel.nomeX.textContent = TEXTO_USUARIO_X + jogadorX.nome;
        painel.nomeO.textContent = TEXTO_USUARIO_O + jogadorO.nome;

        jogadorAtual = jogadorX;
        painel.nomeProximoJogador.textContent = jogadorAtual.nome;
        emJogo = true;

        // Aqui tenho que esconder as opções e mostrar o painel.
        opcoes.divOpcoesJogo.classList.add('esconder');
        painel.painelOpcoesJogo.classList.remove('esconder');
    });


    jogo.jogada1.addEventListener('click', (e)=>{
        jogada(e, 1);
    });

    jogo.jogada2.addEventListener('click', (e)=>{
        jogada(e, 2);
    });

    jogo.jogada3.addEventListener('click', (e)=>{
        jogada(e, 3);
    });

    jogo.jogada4.addEventListener('click', (e)=>{
        jogada(e, 4);
    });

    jogo.jogada5.addEventListener('click', (e)=>{
        jogada(e, 5);
    });

    jogo.jogada6.addEventListener('click', (e)=>{
        jogada(e, 6);
    });

    jogo.jogada7.addEventListener('click', (e)=>{
        jogada(e, 7);
    });

    jogo.jogada8.addEventListener('click', (e)=>{
        jogada(e, 8);
    });

    jogo.jogada9.addEventListener('click', (e)=>{
        jogada(e, 9);
    });


    // Funções utilizadas no jogo

    function  validarJogada(){
       let valor = jogadorAtual.valor;

       if(_estrategia_1(valor) ||
          _estrategia_2(valor) || 
          _estrategia_3(valor) ||
          _estrategia_4(valor) ||
          _estrategia_5(valor) ||
          _estrategia_6(valor) ||
          _estrategia_7(valor) ||
          _estrategia_8(valor)){

            return true;
        }

        return false;      
    }

    function _estrategia_1(valor){
        return (jogadas[1] == valor && jogadas[2] == valor && jogadas[3] == valor);
    }
    function _estrategia_2(valor){
        return (jogadas[4] == valor && jogadas[5] == valor && jogadas[6] == valor);
    }
    function _estrategia_3(valor){
        return (jogadas[7] == valor && jogadas[8] == valor && jogadas[9] == valor);
    }
    function _estrategia_4(valor){
        return (jogadas[1] == valor && jogadas[4] == valor && jogadas[7] == valor);
    }
    function _estrategia_5(valor){
        return (jogadas[2] == valor && jogadas[5] == valor && jogadas[8] == valor);
    }
    function _estrategia_6(valor){
        return (jogadas[3] == valor && jogadas[6] == valor && jogadas[9] == valor);
    }
    function _estrategia_7(valor){
        return (jogadas[1] == valor && jogadas[5] == valor && jogadas[9] == valor);
    }
    function _estrategia_8(valor){
        return (jogadas[3] == valor && jogadas[5] == valor && jogadas[7] == valor);
    }


    function _marcarJogada(e, indice){
        e.target.textContent = jogadorAtual.valor;
        jogadas[indice] = jogadorAtual.valor;
    }


    function jogada(e, indice){

        if(!emJogo || e.target.textContent){
            return;
        }

        _marcarJogada(e, indice);


        if(validarJogada()){
           
            setTimeout(() =>{
                alert(`Parabéns, jogador ${jogadorAtual.nome} acaba de marcar ponto. \\o/`);
                _atualizarPainel();
                _reiniciarJogo();
            }, 100)      
          
            return;
        }

        if(jogadas.filter(e => e).length == 9){

            setTimeout(()=>{
                alert('Deu velha ...');
                _reiniciarJogo();
            },100)
  
            return;
        }
        
        // Continuar jogando.
        jogadorAtual = (jogadorAtual == jogadorX) ? jogadorO : jogadorX;

        painel.nomeProximoJogador.textContent = jogadorAtual.nome;
    }

    function _reiniciarJogo(){

        jogadas = [];
        jogo.jogada1.textContent = '';
        jogo.jogada2.textContent = '';
        jogo.jogada3.textContent = '';
        jogo.jogada4.textContent = '';
        jogo.jogada5.textContent = '';
        jogo.jogada6.textContent = '';
        jogo.jogada7.textContent = '';
        jogo.jogada8.textContent = '';
        jogo.jogada9.textContent = '';
    }

    function _atualizarPainel(){

        jogadorAtual.pontos += 1;

        if(jogadorAtual.valor == "X"){
            painel.pontosX.textContent = jogadorAtual.pontos;
        }else{
            painel.pontosO.textContent = jogadorAtual.pontos;
        }

        jogadorAtual = (jogadorAtual == jogadorX) ? jogadorO : jogadorX;
        painel.nomeProximoJogador.textContent = jogadorAtual.nome;
    }
 
})()