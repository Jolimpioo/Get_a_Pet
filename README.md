# 🐾 Get a Pet

Uma plataforma web para conectar pets que precisam de um lar com pessoas dispostas a adotar. O projeto facilita o processo de adoção, permitindo que usuários cadastrem pets disponíveis e interessados possam manifestar interesse na adoção.

## 📋 Sobre o Projeto

Get a Pet é uma aplicação full-stack desenvolvida para tornar o processo de adoção de animais mais acessível e organizado. A plataforma permite que tutores cadastrem pets para adoção e que potenciais adotantes encontrem seu novo companheiro.

## ✨ Funcionalidades

- **Autenticação de Usuários**: Sistema completo de registro e login
- **Cadastro de Pets**: Usuários podem cadastrar pets disponíveis para adoção com fotos e informações detalhadas
- **Busca de Pets**: Navegação e busca por pets disponíveis para adoção
- **Sistema de Adoção**: Interessados podem agendar visitas e manifestar interesse na adoção
- **Perfil de Usuário**: Gerenciamento de informações pessoais e pets cadastrados
- **Dashboard**: Visualização e gerenciamento dos seus pets e solicitações de adoção

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js**: Ambiente de execução JavaScript
- **Express**: Framework web para Node.js
- **MongoDB**: Banco de dados NoSQL
- **Mongoose**: ODM para MongoDB
- **JWT**: Autenticação via JSON Web Tokens
- **Multer**: Upload de imagens
- **bcrypt**: Criptografia de senhas

### Frontend
- **React**: Biblioteca JavaScript para construção de interfaces
- **React Router**: Navegação entre páginas
- **CSS3**: Estilização

## 📁 Estrutura do Projeto

```
get-a-pet/
├── backend/
│   ├── controllers/     # Controladores da aplicação
│   ├── models/          # Modelos do banco de dados
│   ├── routes/          # Rotas da API
│   ├── helpers/         # Funções auxiliares
│   ├── public/          # Arquivos estáticos (imagens)
│   └── index.js         # Arquivo principal do servidor
│
└── frontend/
    ├── src/
    │   ├── components/  # Componentes React
    │   ├── context/     # Context API
    │   ├── hooks/       # Custom hooks
    │   ├── utils/       # Funções utilitárias
    │   └── App.js       # Componente principal
    └── public/          # Arquivos públicos
```

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 14 ou superior)
- MongoDB instalado e rodando
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Jolimpioo/Get_a_Pet.git
cd Get_a_Pet
```

2. Instale as dependências do backend:
```bash
cd backend
npm install
```

3. Instale as dependências do frontend:
```bash
cd ../frontend
npm install
```

4. Configure as variáveis de ambiente:

Crie um arquivo `.env` na pasta `backend` com as seguintes variáveis:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/getapet
JWT_SECRET=sua_chave_secreta_aqui
```

### Executando a Aplicação

1. Inicie o servidor backend:
```bash
cd backend
npm start
```

2. Em outro terminal, inicie o frontend:
```bash
cd frontend
npm start
```

3. Acesse a aplicação em `http://localhost:3000`

## 📡 Principais Rotas da API

### Autenticação
- `POST /users/register` - Registrar novo usuário
- `POST /users/login` - Login de usuário
- `GET /users/checkuser` - Verificar usuário autenticado

### Pets
- `GET /pets` - Listar todos os pets
- `GET /pets/:id` - Buscar pet por ID
- `POST /pets` - Cadastrar novo pet (autenticado)
- `PATCH /pets/:id` - Atualizar pet (autenticado)
- `DELETE /pets/:id` - Remover pet (autenticado)
- `PATCH /pets/schedule/:id` - Agendar visita (autenticado)
- `PATCH /pets/conclude/:id` - Concluir adoção (autenticado)

### Usuários
- `GET /users/:id` - Buscar usuário por ID
- `PATCH /users/edit/:id` - Editar usuário (autenticado)

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Jolimpioo**

- GitHub: [@Jolimpioo](https://github.com/Jolimpioo)

## 📞 Contato

Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para abrir uma issue no repositório.

---
