function dizerOla() {
    let nome = prompt("Informe seu nome: ")
 document.writeln("Olá! "+nome);
 alert("Olá no alert "+ nome)
} 


 document.getElementById("form").addEventListener("submit", function(event) {
      event.preventDefault(); // impede o envio tradicional
      const nome = document.getElementById("nome").value;
      const sobrenome = document.getElementById("sobrenome").value;

      document.writeln("Seu nome é: "+ nome+"<br>")
      document.writeln("Seu sobrenome é: "+sobrenome+"<br>")
      document.writeln("Seu nome completo é: "+ nome+" "+sobrenome+"<br>")

    });
 