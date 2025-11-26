## 🚀 Guia de Início Rápido para o Servidor Express

Este guia conciso ajudará você a colocar o servidor **Express** em funcionamento rapidamente.

---

### 📋 Pré-requisitos

Certifique-se de ter o **Node.js** e o **npm** (que acompanha o Node.js) instalados na sua máquina.

---

### ⚙️ Configuração Inicial

Siga estas etapas para configurar o ambiente e instalar as dependências:

1.  **Instalar Dependências:**
    Execute o comando abaixo no terminal, na raiz do projeto, para baixar todas as dependências listadas no arquivo `package.json` e criar a pasta **`node_modules`**:
    ```bash
    npm install
    ```

2.  **Configurar Variáveis de Ambiente:**
    O projeto utiliza o arquivo **`.env`** para armazenar variáveis de ambiente sensíveis (como portas, chaves secretas ou URLs de banco de dados).

    * Crie uma cópia do arquivo de exemplo **`.env.example`** e renomeie-a para **`.env`**:
        ```bash
        cp .env.example .env
        ```
    * **Importante:** Edite o novo arquivo **`.env`** e substitua os valores _placeholder_ pelas suas configurações reais, se necessário.

---

### ▶️ Iniciar o Servidor

Após a instalação e a configuração, você pode iniciar o servidor:

1.  **Modo de Desenvolvimento (Development):**
    Geralmente, utiliza-se uma ferramenta como o **`nodemon`** para reiniciar automaticamente o servidor após cada alteração no código. Verifique o seu arquivo `package.json` para o comando exato, que normalmente é:
    ```bash
    npm run dev
    ```

2.  **Modo de Produção (Production):**
    Para rodar o servidor em um ambiente de produção (sem o `nodemon`), utilize o comando `start`:
    ```bash
    npm start
    ```

---

### 🌐 Acessar o Servidor

O servidor Express estará agora em execução. Você pode acessá-lo no seu navegador ou via ferramentas como o Postman na porta especificada no seu arquivo `.env` (geralmente **`http://localhost:3000`** ou similar).