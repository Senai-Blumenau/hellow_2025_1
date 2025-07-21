
    const palavras = ["ESCOLA", "GATO", "MAÇÃ", "PROJETO", "FELICIDADE", "LOGICA", "FORCA"];
    let palavra = "";
    let letrasCertas = [];
    let erros = 0;
    const maxErros = 6;

    const bonecos = [
      `
        
        
        
        
        
        
      `,
      `
        
        
        
        
        _____
      `,
      `
        |
        |
        |
        |
        |_____
      `,
      `
        _______
        |/
        |
        |
        |
        |_____
      `,
      `
        _______
        |/   |
        |    O
        |
        |
        |_____
      `,
      `
        _______
        |/   |
        |    O
        |   /|\\
        |   /
        |_____
      `,
      `
        _______
        |/   |
        |    O
        |   /|\\
        |   / \\
        |_____
      `
    ];

    function escolherPalavra() {
      palavra = palavras[Math.floor(Math.random() * palavras.length)].toUpperCase();
      letrasCertas = [];
      erros = 0;
      atualizarPalavra();
      atualizarBoneco();
      gerarTeclado();
      document.getElementById("mensagem").textContent = "";
    }

    function atualizarPalavra() {
      const display = palavra.split("").map(l => letrasCertas.includes(l) ? l : "_").join(" ");
      document.getElementById("palavra").textContent = display;

      if (!display.includes("_")) {
        document.getElementById("mensagem").textContent = "🎉 Parabéns! Você venceu!";
        desativarTeclado();
      }
    }

    function gerarTeclado() {
      const teclado = document.getElementById("teclado");
      teclado.innerHTML = "";
      const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

      alfabeto.forEach(letra => {
        const btn = document.createElement("button");
        btn.textContent = letra;
        btn.onclick = () => verificarLetra(letra, btn);
        teclado.appendChild(btn);
      });
    }

    function verificarLetra(letra, btn) {
      btn.disabled = true;
      if (palavra.includes(letra)) {
        letrasCertas.push(letra);
        atualizarPalavra();
      } else {
        erros++;
        atualizarBoneco();
        if (erros >= maxErros) {
          document.getElementById("mensagem").textContent = `💀 Fim de jogo! A palavra era: ${palavra}`;
          desativarTeclado();
        }
      }
    }

    function atualizarBoneco() {
      document.getElementById("boneco").textContent = bonecos[erros];
    }

    function desativarTeclado() {
      document.querySelectorAll(".teclado button").forEach(btn => btn.disabled = true);
    }

    function reiniciarJogo() {
      escolherPalavra();
    }

    escolherPalavra();