const botao = document.getElementById("generate");
const botaoVar = document.getElementById("variations");
const promptInput = document.getElementById("prompt");
const blocoCodigo = document.getElementById("code");
const preview = document.getElementById("preview");
const botaoCopy = document.getElementById("copy");

async function gerarCodigo(promptExtra = "") {
  let prompt = promptInput.value.trim();
  if (promptExtra) prompt += ` ${promptExtra}`;

  if (!prompt) {
    blocoCodigo.textContent = "Digite algo primeiro 😅";
    return;
  }

  botao.innerText = "Gerando...";
  botao.disabled = true;

  try {
    const resposta = await fetch("http://localhost:3001/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const dados = await resposta.json();
    if (!resposta.ok) {
      const msg = dados?.error || "Erro na API";
      blocoCodigo.textContent = `Erro: ${msg}`;
      return;
    }

    const resultado = dados.css || "Erro ao gerar 😢";
    blocoCodigo.textContent = resultado;
    preview.srcdoc = resultado;
  } catch (erro) {
    console.error("Erro fetch:", erro);
    blocoCodigo.textContent = "Erro ao gerar código 😢";
  } finally {
    botao.innerText = "Gerar animação";
    botao.disabled = false;
  }
}

botao.addEventListener("click", () => gerarCodigo());

botaoVar.addEventListener("click", () => {
  gerarCodigo("gere 3 variações diferentes");
});

botaoCopy.addEventListener("click", () => {
  navigator.clipboard.writeText(blocoCodigo.textContent);
  botaoCopy.innerText = "Copiado!";
  setTimeout(() => {
    botaoCopy.innerText = "Copiar código";
  }, 1500);
});