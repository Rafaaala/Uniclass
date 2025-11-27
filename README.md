## 🚀 Guia de Início Rápido para o Servidor Express

Este guia conciso ajudará você a colocar o servidor **Express** em funcionamento rapidamente.

---

### 📋 Pré-requisitos

Certifique-se de ter o **Node.js** e o **npm** (que acompanha o Node.js) instalados na sua máquina.

---

### 🛠️ Configuração Inicial do Servidor e Credenciais

Siga estas etapas para configurar o ambiente, instalar as dependências e preparar o acesso ao Firebase:

1.  **Instalar Dependências:**
    [cite_start]Execute o comando abaixo no terminal, na raiz do projeto, para baixar todas as dependências listadas no arquivo `package.json` e criar a pasta **`node_modules`**[cite: 31].
    ```bash
    npm install
    ```

2.  **Configuração do Firebase Admin SDK (Credenciais)**:
    O servidor precisa acessar seu projeto Firebase.
    * **Obtenha o Arquivo de Chave Privada** (arquivo JSON) do seu console Firebase.
    * Crie uma pasta chamada **`config/`** na raiz do seu projeto.
    * Mova o arquivo JSON baixado para a pasta `config/` e **renomeie-o** para **`firebase-credentials.json`**.
    
    > **Estrutura esperada:** `/seu-projeto/config/firebase-credentials.json`

3.  **Configurar Variáveis de Ambiente (`.env`):**
    O projeto utiliza o arquivo **`.env`** para armazenar variáveis de ambiente.

    * Crie uma cópia do arquivo de exemplo **`.env.example`** e renomeie-a para **`.env`**:
        ```bash
        cp .env.example .env
        ```
    * **Importante:** Edite o novo arquivo **`.env`** e substitua os valores _placeholder_ pelas suas configurações reais, incluindo a porta em que o servidor irá rodar.
        
        ```env
        # Exemplo de conteúdo do .env
        PORT=3000
        # Outras variáveis, se necessário...
        ```

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

### 📚 Documentação da API e Formatos JSON (Payloads)

A API é dividida em diferentes recursos, todos aninhados sob o recurso principal `instituicoes`. A seguir, estão os **endpoints** e os formatos **JSON** (`req.body`) esperados pelo servidor para a criação (`POST`) e atualização (`PATCH`) de recursos.

### 1. Instituições

| Método | Caminho da Rota | Descrição | Status Sucesso |
| :--- | :--- | :--- | :--- |
| [cite_start]`POST` [cite: 166] | `/instituicoes` | Cria uma nova instituição. | [cite_start]`201 CREATED` [cite: 38, 39] |
| [cite_start]`GET` [cite: 164] | `/instituicoes` | Retorna todas as instituições. | [cite_start]`200 OK` [cite: 46] |
| [cite_start]`GET` [cite: 165] | `/instituicoes/:id` | Retorna uma instituição por ID. | [cite_start]`200 OK` [cite: 43] |
| [cite_start]`PATCH` [cite: 167] | `/instituicoes/:id` | Atualiza campos específicos da instituição. | [cite_start]`200 OK` [cite: 52] |
| [cite_start]`DELETE` [cite: 168] | `/instituicoes/:id` | Exclui uma instituição. | [cite_start]`204 NO CONTENT` [cite: 56] |

#### 📝 Formatos JSON para Instituições

| Requisição | Interface DTO | JSON (Payload) |
| :--- | :--- | :--- |
| **`POST /instituicoes`** | `InstituicaoCreateInput` | [cite_start]`{"nome": "string", "logoUrl": "string", "mapaUrl": "string"}` [cite: 4, 5] |
| **`PATCH /instituicoes/:id`** | `InstituicaoUpdateInput` | [cite_start]**Qualquer subconjunto** dos campos de `Instituicao`[cite: 9]: `{"nome"?: "string", "logoUrl"?: "string", "mapaUrl"?: "string", "configuracoes"?: {"key": "value"}}` |

---

### 2. Locais (Aninhado)

| Método | Caminho da Rota | Descrição | Status Sucesso |
| :--- | :--- | :--- | :--- |
| [cite_start]`POST` [cite: 171] | `/instituicoes/:instituicaoId/locais` | Cria um novo local na instituição. | [cite_start]`201 CREATED` [cite: 61, 62] |
| [cite_start]`GET` [cite: 169] | `/instituicoes/:instituicaoId/locais` | Retorna todos os locais da instituição. | [cite_start]`200 OK` [cite: 70] |
| [cite_start]`GET` [cite: 170] | `/instituicoes/:instituicaoId/locais/:localId` | Retorna um local por ID. | [cite_start]`200 OK` [cite: 66] |
| [cite_start]`PATCH` [cite: 172] | `/instituicoes/:instituicaoId/locais/:localId` | Atualiza campos específicos do local. | [cite_start]`200 OK` [cite: 74] |
| [cite_start]`DELETE` [cite: 173] | `/instituicoes/:instituicaoId/locais/:localId` | Exclui um local. | [cite_start]`204 NO CONTENT` [cite: 78] |

#### 📝 Formatos JSON para Locais

| Requisição | Interface DTO | JSON (Payload) |
| :--- | :--- | :--- |
| **`POST /locais`** | `LocalCreateInput` | [cite_start]`{"nome": "string", "tipo": "string", "bloco": "string", "coordenadas": GeoPoint, "mapaXY": Map<string, number>, "acessivel": boolean}` [cite: 5, 6] |
| **`PATCH /locais/:localId`** | `LocalUpdateInput` | [cite_start]**Qualquer subconjunto** dos campos de `Local`[cite: 10]: `{"nome"?: "string", "tipo"?: "string", "bloco"?: "string", "coordenadas"?: GeoPoint, "mapaXY"?: Map<string, number>, "acessivel"?: boolean}` |

---

### 3. Usuários (Aninhado)

| Método | Caminho da Rota | Descrição | Status Sucesso |
| :--- | :--- | :--- | :--- |
| [cite_start]`POST` [cite: 175] | `/instituicoes/:instituicaoId/usuarios` | Cria um novo usuário na instituição. | [cite_start]`201 CREATED` [cite: 82] |
| [cite_start]`GET` [cite: 174] | `/instituicoes/:instituicaoId/usuarios` | Retorna todos os usuários. | [cite_start]`200 OK` [cite: 90] |
| [cite_start]`GET` [cite: 176] | `/instituicoes/:instituicaoId/usuarios/:usuarioId` | Retorna um usuário por ID. | [cite_start]`200 OK` [cite: 86] |
| [cite_start]`PATCH` [cite: 177] | `/instituicoes/:instituicaoId/usuarios/:usuarioId` | Atualiza campos específicos do usuário. | [cite_start]`200 OK` [cite: 94] |
| [cite_start]`DELETE` [cite: 178] | `/instituicoes/:instituicaoId/usuarios/:usuarioId` | Exclui um usuário. | [cite_start]`204 NO CONTENT` [cite: 98] |

#### 📝 Formatos JSON para Usuários

| Requisição | Interface DTO | JSON (Payload) |
| :--- | :--- | :--- |
| **`POST /usuarios`** | [cite_start]`UsuarioCreateInput` [cite: 33] | [cite_start]`{"nome": "string", "email": "string", "tipoAcesso": "string", "curso": "string"}` [cite: 28, 29] |
| **`PATCH /usuarios/:usuarioId`** | [cite_start]`UsuarioUpdateInput` [cite: 33] | [cite_start]`{"nome": "string", "email": "string", "tipoAcesso": "string", "curso": "string"}` [cite: 30, 31] |

---

### 4. Eventos (Aninhado)

| Método | Caminho da Rota | Descrição | Status Sucesso |
| :--- | :--- | :--- | :--- |
| [cite_start]`POST` [cite: 180] | `/instituicoes/:instituicaoId/eventos` | Cria um novo evento. | [cite_start]`201 CREATED` [cite: 103] |
| [cite_start]`GET` [cite: 179] | `/instituicoes/:instituicaoId/eventos` | Retorna todos os eventos. | [cite_start]`200 OK` [cite: 111] |
| [cite_start]`GET` [cite: 181] | `/instituicoes/:instituicaoId/eventos/:eventoId` | Retorna um evento por ID. | [cite_start]`200 OK` [cite: 107] |
| [cite_start]`PATCH` [cite: 182] | `/instituicoes/:instituicaoId/eventos/:eventoId` | Atualiza campos específicos do evento. | [cite_start]`200 OK` [cite: 115] |
| [cite_start]`DELETE` [cite: 183] | `/instituicoes/:instituicaoId/eventos/:eventoId` | Exclui um evento. | [cite_start]`204 NO CONTENT` [cite: 119] |

#### 📝 Formatos JSON para Eventos

| Requisição | Interface DTO | JSON (Payload) |
| :--- | :--- | :--- |
| **`POST /eventos`** | [cite_start]`EventoCreateInput` [cite: 34] | [cite_start]`{"instituicaoId": "string", "localId": "string", "titulo": "string", "data": Date, "tipo": "string", "descricao": "string"}` [cite: 16, 17] |
| **`PATCH /eventos/:eventoId`** | [cite_start]`EventoUpdateInput` [cite: 34] | [cite_start]`{"localId": "string", "titulo": "string", "data": Date, "tipo": "string", "descricao": "string"}` [cite: 18, 19] |

---

### 5. Sugestões (Aninhado)

| Método | Caminho da Rota | Descrição | Status Sucesso |
| :--- | :--- | :--- | :--- |
| [cite_start]`POST` [cite: 185] | `/instituicoes/:instituicaoId/sugestoes` | Cria uma nova sugestão. | [cite_start]`201 CREATED` [cite: 123] |
| [cite_start]`GET` [cite: 184] | `/instituicoes/:instituicaoId/sugestoes` | Retorna todas as sugestões. | [cite_start]`200 OK` [cite: 131] |
| [cite_start]`GET` [cite: 186] | `/instituicoes/:instituicaoId/sugestoes/:sugestaoId` | Retorna uma sugestão por ID. | [cite_start]`200 OK` [cite: 127] |
| [cite_start]`PATCH` [cite: 187] | `/instituicoes/:instituicaoId/sugestoes/:sugestaoId` | Atualiza campos específicos. | [cite_start]`200 OK` [cite: 135] |
| [cite_start]`DELETE` [cite: 188] | `/instituicoes/:instituicaoId/sugestoes/:sugestaoId` | Exclui uma sugestão. | [cite_start]`204 NO CONTENT` [cite: 139] |

#### 📝 Formatos JSON para Sugestões

| Requisição | Interface DTO | JSON (Payload) |
| :--- | :--- | :--- |
| **`POST /sugestoes`** | [cite_start]`SugestaoCreateInput` [cite: 35] | [cite_start]`{"instituicaoId": "string", "titulo": "string", "descricao": "string", "tipo": "string", "status": "string", "localizacao": GeoPoint, "fotoUrl": "string", "usuarioId": "string"}` [cite: 22, 23] |
| **`PATCH /sugestoes/:sugestaoId`** | [cite_start]`SugestaoUpdateInput` [cite: 35] | [cite_start]`{"instituicaoId": "string", "titulo": "string", "descricao": "string", "tipo": "string", "status": "string", "localizacao": GeoPoint, "fotoUrl": "string", "usuarioId": "string"}` [cite: 26, 27] |

---

### 6. Avisos (Aninhado)

| Método | Caminho da Rota | Descrição | Status Sucesso |
| :--- | :--- | :--- | :--- |
| [cite_start]`POST` [cite: 190] | `/instituicoes/:instituicaoId/avisos` | Cria um novo aviso. | [cite_start]`201 CREATED` [cite: 143] |
| [cite_start]`GET` [cite: 189] | `/instituicoes/:instituicaoId/avisos` | Retorna todos os avisos. | [cite_start]`200 OK` [cite: 151] |
| [cite_start]`GET` [cite: 191] | `/instituicoes/:instituicaoId/avisos/:avisoId` | Retorna um aviso por ID. | [cite_start]`200 OK` [cite: 147] |
| [cite_start]`PATCH` [cite: 192] | `/instituicoes/:instituicaoId/avisos/:avisoId` | Atualiza campos específicos do aviso. | [cite_start]`200 OK` [cite: 155] |
| [cite_start]`DELETE` [cite: 193] | `/instituicoes/:instituicaoId/avisos/:avisoId` | Exclui um aviso. | [cite_start]`204 NO CONTENT` [cite: 159] |

#### 📝 Formatos JSON para Avisos

| Requisição | Interface DTO | JSON (Payload) |
| :--- | :--- | :--- |
| **`POST /avisos`** | [cite_start]`AvisoCreateInput` [cite: 36] | [cite_start]`{"usuarioId": "string", "usuarioNome": "string", "titulo": "string", "mensagem": "string", "prioridade": "string", "cursoAlvo": ["string"]}` [cite: 12, 13] |
| **`PATCH /avisos/:avisoId`** | [cite_start]`AvisoUpdateInput` [cite: 36] | [cite_start]**Qualquer subconjunto** dos campos: `{"titulo"?: "string", "mensagem"?: "string", "prioridade"?: "string", "cursoAlvo"?: ["string"]}` [cite: 14, 15] |

---

### 🌐 Acessar o Servidor

O servidor Express estará agora em execução. Você pode acessá-lo no seu navegador ou via ferramentas como o Postman na porta especificada no seu arquivo `.env` (geralmente **`http://localhost:3000`** ou similar).