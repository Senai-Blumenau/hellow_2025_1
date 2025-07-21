

    // Lista de pares: expressões e resultados
    const pares = [
      { pergunta: "2 + 3", resposta: "5" },
      { pergunta: "7 - 2", resposta: "5" },
      { pergunta: "4 × 2", resposta: "8" },
      { pergunta: "9 ÷ 3", resposta: "3" },
      { pergunta: "6 + 1", resposta: "7" },
      { pergunta: "10 - 4", resposta: "6" },
      { pergunta: "3 × 3", resposta: "9" },
      { pergunta: "8 ÷ 2", resposta: "4" }
    ];

    // Monta um array com todos os valores (perguntas e respostas)
    const cards = [...pares.map(p => p.pergunta), ...pares.map(p => p.resposta)];

    // Embaralha o array
    const embaralhado = cards.sort(() => Math.random() - 0.5);

    const grid = document.getElementById("grid");

    let firstCard = null;
    let secondCard = null;
    let lock = false;
    let matchedCount = 0;

    // Adiciona as cartas no grid
    embaralhado.forEach((valor, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.valor = valor;
      card.innerText = "";
      card.dataset.index = index;
      card.addEventListener("click", handleClick);
      grid.appendChild(card);
    });

    function handleClick(e) {
      const clicked = e.target;

      if (lock || clicked.classList.contains("matched") || clicked === firstCard) return;

      clicked.classList.add("revealed");
      clicked.innerText = clicked.dataset.valor;

      if (!firstCard) {
        firstCard = clicked;
      } else {
        secondCard = clicked;
        lock = true;

        // Verifica se é um par válido
        if (éPar(firstCard.dataset.valor, secondCard.dataset.valor)) {
          firstCard.classList.add("matched");
          secondCard.classList.add("matched");
          matchedCount += 2;

          if (matchedCount === embaralhado.length) {
            document.getElementById("mensagem").innerText = "Parabéns! Você encontrou todos os pares! 🎉";
          }

          resetTurno();
        } else {
          // Se não for par, esconde as cartas
          setTimeout(() => {
            firstCard.classList.remove("revealed");
            secondCard.classList.remove("revealed");
            firstCard.innerText = "";
            secondCard.innerText = "";
            resetTurno();
          }, 1000);
        }
      }
    }

    // Função que verifica se dois valores são par (expressão + resultado)
    function éPar(valor1, valor2) {
      return pares.some(par =>
        (par.pergunta === valor1 && par.resposta === valor2) ||
        (par.pergunta === valor2 && par.resposta === valor1)
      );
    }

    function resetTurno() {
      firstCard = null;
      secondCard = null;
      lock = false;
    }