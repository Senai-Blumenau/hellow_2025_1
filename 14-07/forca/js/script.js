 const palavras = ["FLOR", "FADA", "AMOR", "PAZ", "LUZ", "UNICO", "COR", "BOLA", "LUA", "SOL"];
    let palavraEscolhida = "";
    let letrasCorretas = [];
    let erros = 0;
    const maxErros = 5;

    function iniciarJogo() {
      palavraEscolhida = palavras[Math.floor(Math.random() * palavras.length)];
      letrasCorretas = [];
      erros = 0;
      atualizarPalavra();
      gerarTeclado();
      atualizarUnicornios();
      document.getElementById('mensagem').textContent = '';
    }

    function gerarTeclado() {
      const letrasDiv = document.getElementById("letras");
      letrasDiv.innerHTML = "";
      const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      alfabeto.forEach(letra => {
        const btn = document.createElement("button");
        btn.textContent = letra;
        btn.className = "letter-btn";
        btn.onclick = () => verificarLetra(letra, btn);
        letrasDiv.appendChild(btn);
      });
    }

    function atualizarPalavra() {
      const display = palavraEscolhida.split("").map(l => letrasCorretas.includes(l) ? l : "_").join(" ");
      document.getElementById("palavraEscondida").textContent = display;

      if (!display.includes("_")) {
        document.getElementById("mensagem").textContent = "🎉 Parabéns! Você salvou o unicórnio!";
        desativarTeclado();
      }
    }

    function verificarLetra(letra, btn) {
      btn.disabled = true;
      if (palavraEscolhida.includes(letra)) {
        letrasCorretas.push(letra);
        atualizarPalavra();
      } else {
        erros++;
        atualizarUnicornios();
        if (erros >= maxErros) {
          document.getElementById("mensagem").textContent = `😢 O unicórnio desapareceu! A palavra era: ${palavraEscolhida}`;
          desativarTeclado();
        }
      }
    }

    function atualizarUnicornios() {
      const coracoes = "🦄".repeat(maxErros - erros);
      document.getElementById("unicornios").textContent = coracoes;
    }

    function desativarTeclado() {
      document.querySelectorAll(".letter-btn").forEach(btn => btn.disabled = true);
    }

    function reiniciarJogo() {
      iniciarJogo();
    }

    iniciarJogo();