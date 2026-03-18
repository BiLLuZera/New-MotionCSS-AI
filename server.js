import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: "groq.env" });

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const SYSTEM_PROMPT = `Você é um gerador de código HTML + CSS para animações.

REGRAS:
- Responda apenas com código puro
- Nunca use markdown ou crases
- Sempre comece com <style> e depois HTML
- O código deve funcionar no navegador
- Centralize o elemento na tela

ANIMAÇÕES:
- quicando → translateY
- girando → rotate
- piscando → opacity
- glow → box-shadow
- gradiente → linear-gradient
`;

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/generate", async (req, res) => {
  const prompt = req.body?.prompt;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt é obrigatório" });
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: "GROQ_API_KEY não configurada" });
  }

  try {
    const resposta = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: `
Você é um gerador de código HTML + CSS para animações.

REGRAS:
- Responda apenas com código puro
- Nunca use markdown ou crases
- Sempre comece com <style> e depois HTML
- O código deve funcionar no navegador
- Centralize o elemento na tela

ANIMAÇÕES:
- quicando → translateY
- girando → rotate
- piscando → opacity
- glow → box-shadow
- gradiente → linear-gradient
`
            },
            {
              role: "user",
              content: prompt
            }
          ]
        })
      }
    );

    if (!resposta.ok) {
      const texto = await resposta.text();
      console.error("Erro externo:", resposta.status, texto);
      return res
        .status(resposta.status)
        .json({ error: "Erro na API externa", details: texto, status: resposta.status });
    }

    const data = await resposta.json();
    const resultado = data?.choices?.[0]?.message?.content;
    if (!resultado) {
      return res.status(500).json({ error: "Resposta inválida da API externa", details: data });
    }

    res.json({ css: resultado });
  } catch (erro) {
    console.error("Erro no servidor:", erro);
    res.status(500).json({ error: erro.message || "Erro interno no servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});