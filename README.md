# 🚀 MotionCSS AI

Transforme ideias em animações CSS usando linguagem natural com Inteligência Artificial.

---

## 💡 Por que esse projeto existe?

Criar animações CSS do zero pode ser demorado, técnico e pouco intuitivo, especialmente para iniciantes.

O MotionCSS AI resolve esse problema permitindo que qualquer pessoa descreva uma animação em linguagem natural e receba código funcional instantaneamente, com preview em tempo real.

---

## 🧠 Sobre o projeto

O MotionCSS AI é uma aplicação full stack que converte descrições em linguagem natural em animações CSS funcionais.

Exemplo:

**Input:**
> "botão pulsando em vermelho com glow"

**Output:**
✔ Código HTML + CSS  
✔ Animação pronta  
✔ Preview em tempo real  

---

## ✨ Funcionalidades

- 🎯 Geração de animações via IA
- ⚡ Preview instantâneo
- 📋 Botão de copiar código
- 🔁 Geração de variações
- 🎨 Interface moderna estilo SaaS
- 🔒 Backend com proteção de API key

---

## 🛠️ Tecnologias utilizadas

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)

### Backend
- Node.js
- Express
- CORS
- dotenv

### Inteligência Artificial
- API LLM (Groq / LLaMA 3.3)

---

## 🧩 Arquitetura

```text
Frontend (UI)
   ↓
Backend (Node.js)
   ↓
API de IA (Groq)
```

---

## 🚀 Como rodar

### Backend

1. Abra terminal em `Backend`
2. Instale dependências:
   ```bash
   npm install
   ```
3. Configure `groq.env` com sua chave:
   ```dotenv
   GROQ_API_KEY=sua_chave_aqui
   ```
4. Inicie:
   ```bash
   node server.js
   ```

### Frontend

1. Abra `Frontend/index.html` em um servidor estático.
2. Acesse `http://localhost:5500`.

---

## 📌 Endpoints

- `GET /health` — checa status do backend.
- `POST /generate` — gera CSS a partir de prompt JSON `{ "prompt": "..." }`.

---

## 💬 Observações

- Use o console do navegador para ver erros de rede.
- Se aparecer `No Listener: tabs:outgoing.message.ready`, é aviso de extensão/devtools, não do seu app.
- Mantenha `groq.env` fora do controle de versão (`.gitignore` já trata isso).

- `Backend/` - servidor Node.js Express que faz proxy para API Groq (Llama)
- `Frontend/` - interface estática HTML/CSS/JS

## Configuração

1. Instale Node.js (já deve estar instalado).
2. Abra terminal em `Backend`.
3. Copie a chave para `Backend/groq.env`:

```dotenv
GROQ_API_KEY=seu_token_aqui
```

4. Instale dependências:

```bash
cd Backend
npm install
```

## Executando

1. No `Backend`:

```bash
cd Backend
node server.js
```

2. No `Frontend` (estático):

```bash
cd Frontend
# use qualquer servidor estático; exemplo com Node:
node -e "const http=require('http');const fs=require('fs');const p=require('path');const d=process.cwd();http.createServer((r,s)=>{let u=new URL(r.url,'http://localhost');let f=p.join(d,u.pathname=="/"?"/index.html":u.pathname);fs.readFile(f,(e,b)=>{if(e){s.writeHead(404);s.end('404');return;}let ext=p.extname(f);let c='text/plain';if(ext=='.html') c='text/html'; if(ext=='.css') c='text/css'; if(ext=='.js') c='application/javascript'; s.writeHead(200,{'Content-Type':c});s.end(b);});}).listen(5500,()=>console.log('frontend 5500'))"
```

3. Abra no navegador `http://localhost:5500`.

## Uso

- Digite um prompt em linguagem natural no textarea.
- Clique em "Gerar animação".
- O CSS gerado aparece no painel e no iframe de preview.

## Endpoints

- `GET /health` - verifica status do backend.
- `POST /generate` - gera CSS a partir de prompt JSON `{ "prompt": "..." }`.

## Observações

- O projeto já adiciona `.gitignore` para `node_modules`, `.env`, `groq.env`.
- Caso use o navegador e veja erro de devtools `No listener: tabs:outgoing.message.ready`, é aviso de extensão/dev-server, não do app.

---

Feito para ficar limpo e bem estruturado.
