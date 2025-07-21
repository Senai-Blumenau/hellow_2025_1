
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let gameActive = true;

    const winningCombinations = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    function checarVencedor() {
      for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          gameActive = false;
          message.textContent = `🎉 Vitória do jogador ${board[a]}!`;
          return;
        }
      }

      if (!board.includes("")) {
        gameActive = false;
        message.textContent = "Empate! 😅";
      }
    }

    function clicarCelula(e) {
      const index = e.target.dataset.index;
      if (board[index] !== "" || !gameActive) return;

      board[index] = currentPlayer;
      e.target.textContent = currentPlayer;
      checarVencedor();

      if (gameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent = `Vez de: ${currentPlayer}`;
      }
    }

    function reiniciarJogo() {
      board = ["", "", "", "", "", "", "", "", ""];
      gameActive = true;
      currentPlayer = "X";
      message.textContent = `Vez de: ${currentPlayer}`;
      cells.forEach(cell => cell.textContent = "");
    }

    cells.forEach(cell => cell.addEventListener('click', clicarCelula));
