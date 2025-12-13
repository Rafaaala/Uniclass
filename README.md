# 🗺️ Uniclass

> Um sistema de mapeamento funcional e personalizado para localização e navegação em campus universitário.

![Status do Projeto](https://img.shields.io/badge/status-finalizado-green)
![Licença](https://img.shields.io/badge/license-GPLv3-blue)

## 📖 Sobre o Projeto

O **Uniclass** é uma aplicação desenvolvida para auxiliar estudantes, funcionários e visitantes a se localizarem dentro do campus universitário. O sistema oferece uma visão vetorizada do campus, permitindo rotas precisas e o gerenciamento de eventos, avisos e sugestões através de uma API robusta.

---

## 🚀 Guia de Início Rápido para o Servidor Express

Este guia conciso ajudará você a colocar o servidor **Express** em funcionamento rapidamente.

### 📋 Pré-requisitos

Certifique-se de ter instalado na sua máquina:
* [Node.js](https://nodejs.org/) (versão LTS recomendada)
* **npm** (instalado automaticamente com o Node.js)

### 🛠️ Configuração Inicial e Credenciais

Siga estas etapas para configurar o ambiente e o acesso ao Firebase:

1.  **Instalar Dependências:**
    Execute o comando abaixo na raiz do projeto para baixar as dependências listadas no `package.json`:
    ```bash
    npm install
    ```

2.  **Configuração do Firebase Admin SDK:**
    O servidor precisa de permissão para acessar seu projeto Firebase.
    * Obtenha o **Arquivo de Chave Privada** (`.json`) no console do Firebase.
    * Crie uma pasta chamada `config/` na raiz do projeto.
    * Mova o arquivo baixado para esta pasta e renomeie-o para **`firebase-credentials.json`**.
    
    > **Caminho final:** `seu-projeto/config/firebase-credentials.json`

3.  **Variáveis de Ambiente (.env):**
    * Crie uma cópia do arquivo de exemplo:
        ```bash
        cp .env.example .env
        ```
    * Edite o arquivo `.env` com suas configurações reais:
        ```env
        PORT=3000
        # Adicione outras chaves necessárias aqui
        ```

### ▶️ Iniciar o Servidor

* **Modo de Desenvolvimento** (com *hot-reload* via nodemon):
    ```bash
    npm run dev
    ```

* **Modo de Produção:**
    ```bash
    npm start
    ```

O servidor estará rodando em: `http://localhost:3000` (ou na porta definida no seu `.env`).

---

## 🛣️ Motor de Rotas (GraphHopper)

O projeto utiliza uma instância local do GraphHopper para calcular as rotas de navegação dentro do campus.

### Pré-requisitos
* **Java (JRE/JDK):** Certifique-se de ter o Java instalado (versão 11 ou superior recomendada).
  ```bash
  java -version
  
### 🛠️ Como Rodar o GraphHopper

    java -Ddw.graphhopper.graph.location=graph-cache-unipe -Ddw.graphhopper.customprofiles.profiles=custom_model.yml -jar graphhopper-web-10.0.jar server config-example.yml

---
## 📚 Documentação da API

A API é organizada em recursos aninhados sob a estrutura principal de instituições. Abaixo estão os detalhes dos **endpoints** e os formatos **JSON** (`req.body`) esperados.

### 1. Instituições

| Método | Rota | Descrição | Sucesso |
| :--- | :--- | :--- | :--- |
| `POST` | `/instituicoes` | Cria uma nova instituição. | `201 CREATED` |
| `GET` | `/instituicoes` | Retorna todas as instituições. | `200 OK` |
| `GET` | `/instituicoes/:id` | Retorna uma instituição por ID. | `200 OK` |
| `PATCH` | `/instituicoes/:id` | Atualiza dados da instituição. | `200 OK` |
| `DELETE` | `/instituicoes/:id` | Exclui uma instituição. | `204 NO CONTENT` |

**Formatos JSON (Payloads):**
* **POST:** `{"nome": "string", "logoUrl": "string", "mapaUrl": "string"}`
* **PATCH:** `{"nome"?: "string", "logoUrl"?: "string", ...}` (Qualquer subconjunto dos campos)

---

### 2. Locais (Aninhado em Instituições)

| Método | Rota | Descrição | Sucesso |
| :--- | :--- | :--- | :--- |
| `POST` | `/instituicoes/:instId/locais` | Cria um novo local. | `201 CREATED` |
| `GET` | `/instituicoes/:instId/locais` | Lista locais da instituição. | `200 OK` |
| `GET` | `/instituicoes/:instId/locais/:locId` | Detalhes de um local. | `200 OK` |
| `PATCH` | `/instituicoes/:instId/locais/:locId` | Atualiza um local. | `200 OK` |
| `DELETE` | `/instituicoes/:instId/locais/:locId` | Remove um local. | `204 NO CONTENT` |

**Formatos JSON (Payloads):**
* **POST:**
    ```json
    {
      "nome": "Auditório A",
      "tipo": "Sala de Aula",
      "bloco": "B",
      "coordenadas": "GeoPoint",
      "mapaXY": {"x": 10, "y": 20},
      "acessivel": true
    }
    ```

---

### 3. Usuários

| Método | Rota | Descrição | Sucesso |
| :--- | :--- | :--- | :--- |
| `POST` | `/instituicoes/:instId/usuarios` | Registra novo usuário. | `201 CREATED` |
| `GET` | `/instituicoes/:instId/usuarios` | Lista usuários. | `200 OK` |
| `GET` | `/instituicoes/:instId/usuarios/:usrId` | Busca usuário por ID. | `200 OK` |
| `PATCH` | `/instituicoes/:instId/usuarios/:usrId` | Atualiza usuário. | `200 OK` |
| `DELETE` | `/instituicoes/:instId/usuarios/:usrId` | Remove usuário. | `204 NO CONTENT` |

**Formatos JSON (Payloads):**
* **POST / PATCH:** `{"nome": "string", "email": "string", "tipoAcesso": "string", "curso": "string"}`

---

### 4. Eventos

| Método | Rota | Descrição | Sucesso |
| :--- | :--- | :--- | :--- |
| `POST` | `/instituicoes/:instId/eventos` | Cria evento. | `201 CREATED` |
| `GET` | `/instituicoes/:instId/eventos` | Lista eventos. | `200 OK` |
| `GET` | `/instituicoes/:instId/eventos/:evtId` | Detalhes do evento. | `200 OK` |
| `PATCH` | `/instituicoes/:instId/eventos/:evtId` | Atualiza evento. | `200 OK` |
| `DELETE` | `/instituicoes/:instId/eventos/:evtId` | Remove evento. | `204 NO CONTENT` |

**Formatos JSON (Payloads):**
* **POST:**
    ```json
    {
      "instituicaoId": "string",
      "localId": "string",
      "titulo": "Workshop",
      "data": "2024-12-25T14:00:00Z",
      "tipo": "Acadêmico",
      "descricao": "Detalhes..."
    }
    ```

---

### 5. Sugestões

| Método | Rota | Descrição | Sucesso |
| :--- | :--- | :--- | :--- |
| `POST` | `/instituicoes/:instId/sugestoes` | Envia sugestão. | `201 CREATED` |
| `GET` | `/instituicoes/:instId/sugestoes` | Lista sugestões. | `200 OK` |
| `PATCH` | `/instituicoes/:instId/sugestoes/:sugId` | Atualiza status/dados. | `200 OK` |
| `DELETE` | `/instituicoes/:instId/sugestoes/:sugId` | Remove sugestão. | `204 NO CONTENT` |

**Formatos JSON (Payloads):**
* **POST:** `{"titulo": "string", "descricao": "string", "tipo": "Manutenção", "status": "Aberto", "localizacao": "GeoPoint", "usuarioId": "string"}`

---

### 6. Avisos

| Método | Rota | Descrição | Sucesso |
| :--- | :--- | :--- | :--- |
| `POST` | `/instituicoes/:instId/avisos` | Cria aviso. | `201 CREATED` |
| `GET` | `/instituicoes/:instId/avisos` | Lista avisos. | `200 OK` |
| `PATCH` | `/instituicoes/:instId/avisos/:avsId` | Atualiza aviso. | `200 OK` |
| `DELETE` | `/instituicoes/:instId/avisos/:avsId` | Remove aviso. | `204 NO CONTENT` |

**Formatos JSON (Payloads):**
* **POST:**
    ```json
    {
      "usuarioId": "string",
      "usuarioNome": "Coordenação",
      "titulo": "Feriado",
      "mensagem": "Não haverá aula.",
      "prioridade": "Alta",
      "cursoAlvo": ["Engenharia", "Design"]
    }
    ```

---

## 🛠️ Tecnologias Utilizadas

* **Frontend:** Leaflet, Leaflet Routing Machine, HTML5/CSS3.
* **Backend:** Node.js, Express, TypeScript.
* **Banco de Dados/Auth:** Firebase (Admin SDK).
* **GIS:** QGIS.

---

## 📝 Licença

Este projeto está licenciado sob a **GNU General Public License v3.0 (GPLv3)**.

Isso significa que você é livre para usar, modificar e distribuir este software, desde que qualquer versão modificada ou derivada também seja distribuída sob a mesma licença (GPLv3) e com o código aberto.

Para detalhes completos, consulte o arquivo [LICENSE](LICENSE) ou visite [gnu.org/licenses/gpl-3.0](https://www.gnu.org/licenses/gpl-3.0.en.html).

**Nota para uso comercial:** Se você deseja utilizar este código em um produto proprietário (fechado) ou comercial, entre em contato com o autor para negociar uma licença comercial separada.