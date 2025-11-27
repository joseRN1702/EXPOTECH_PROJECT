# Projeto Semestral Node

Este projeto é uma aplicação Node.js desenvolvida com TypeScript, que implementa uma API para gerenciar clientes, funcionários e ordens de serviço.

## Estrutura do Projeto

A estrutura do projeto é a seguinte:

```
projeto-semestral-node
├── src
│   ├── app.ts                     # Inicializa a aplicação Express e configura middleware
│   ├── server.ts                  # Inicia o servidor e escuta em uma porta especificada
│   ├── routes                     # Contém as definições de rotas
│   │   └── index.ts               # Define as rotas da aplicação e conecta aos controladores
│   ├── controllers                # Contém os controladores da aplicação
│   │   ├── ClienteController.ts    # Controlador para gerenciar clientes
│   │   ├── FuncionarioController.ts # Controlador para gerenciar funcionários
│   │   └── OrdemServicoController.ts # Controlador para gerenciar ordens de serviço
│   ├── services                   # Contém a lógica de negócios
│   │   ├── ClienteService.ts       # Lógica de negócios para clientes
│   │   ├── FuncionarioService.ts   # Lógica de negócios para funcionários
│   │   └── OrdemServicoService.ts   # Lógica de negócios para ordens de serviço
│   ├── repositories                # Contém os repositórios de dados
│   │   ├── ClienteRepository.ts     # Acesso a dados para clientes
│   │   ├── FuncionarioRepository.ts  # Acesso a dados para funcionários
│   │   └── OrdemServicoRepository.ts  # Acesso a dados para ordens de serviço
│   ├── models                     # Contém os modelos da aplicação
│   │   ├── Cliente.ts              # Modelo de cliente
│   │   ├── Funcionario.ts          # Modelo de funcionário
│   │   ├── OrdemServico.ts          # Modelo de ordem de serviço
│   │   └── TipoServico.ts          # Modelo de tipo de serviço
│   ├── dtos                       # Contém os Data Transfer Objects
│   │   ├── request                 # Estruturas de requisição
│   │   │   ├── PostClienteRequest.ts # Requisição para criar um cliente
│   │   │   ├── PostFuncionarioRequest.ts # Requisição para criar um funcionário
│   │   │   └── PostOrdemServicoRequest.ts # Requisição para criar uma ordem de serviço
│   │   └── response                # Estruturas de resposta
│   │       ├── GetClienteResponse.ts # Resposta para obter um cliente
│   │       ├── GetFuncionarioResponse.ts # Resposta para obter um funcionário
│   │       ├── GetOrdemServicoResponse.ts # Resposta para obter uma ordem de serviço
│   │       └── GetTipoServicoResponse.ts # Resposta para obter um tipo de serviço
│   ├── mappers                    # Contém os mapeadores
│   │   ├── OrdemServicoMapper.ts    # Mapeador para ordens de serviço
│   │   └── TipoServicoMapper.ts     # Mapeador para tipos de serviço
│   ├── config                     # Contém configurações da aplicação
│   │   ├── database.ts             # Inicializa a conexão com o banco de dados
│   │   └── env.ts                  # Configurações de variáveis de ambiente
│   └── utils                      # Contém utilitários
│       └── validation.ts           # Funções utilitárias para validação de dados
├── test                            # Contém os testes da aplicação
│   └── ProjetoSemestralApplication.test.ts
├── package.json                    # Configuração do npm
├── tsconfig.json                   # Configuração do TypeScript
├── ormconfig.json                  # Configurações do ORM
├── .env.example                    # Exemplo de variáveis de ambiente
└── README.md                       # Documentação do projeto
```

## Como Executar o Projeto

1. Clone o repositório:
   ```
   git clone <URL_DO_REPOSITORIO>
   cd projeto-semestral-node
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Configure as variáveis de ambiente copiando o arquivo `.env.example` para `.env` e ajustando conforme necessário.

4. Inicie o servidor:
   ```
   npm run start
   ```

## Testes

Para executar os testes, utilize o comando:
```
npm run test
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.