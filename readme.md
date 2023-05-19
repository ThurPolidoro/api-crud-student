# Projeto CRUD de Estudante em Node com TypeScript

Este é um projeto que implementa operações CRUD (Create, Read, Update, Delete) para gerenciar dados de estudantes usando uma API REST. O projeto é desenvolvido em Node.js e utiliza TypeScript para uma melhor experiência de desenvolvimento e manutenção do código. Ele também é configurado com Docker para fornecer um ambiente de desenvolvimento consistente.

## Requisitos

Certifique-se de ter as seguintes dependências instaladas em sua máquina:
- Docker
- Docker Compose
- HeidiSQL (Ferramenta de Administração de MySQL)
- Insomnia

## Configuração
Siga as etapas abaixo para configurar e executar o projeto em seu ambiente Docker:

Clone este repositório para o diretório desejado:
```sh
git clone https://github.com/ThurPolidoro/api-crud-student.git
```

Navegue até o diretório do projeto:
```sh
cd api-crud-student
```

Execute o comando para clonar o .env.example nomeando o mesmo para .env
```sh
cp .env.example .env
```

Configure o arquivo .env com as informações do desejadas, para evitar possiveis conflitos por padrão deixei a porta MySQL na 3307.
```sh
MYSQL_HOST=localhost
MYSQL_DATABASE=api_crud_students
MYSQL_USER=root
MYSQL_PASS=2Uw7aE3gNvwDNI5Hob
MYSQL_PORT=3307
```

Execute o comando para construir os containers do Docker:
```sh
docker-compose build
```

Inicie os containers do Docker:
```sh
docker-compose up
```

Isso iniciará os containers Docker para o servidor Node.js, o banco de dados MySQL e o Redis.

Após a inicialização bem-sucedida, você deve está acessando o banco de dados e importando o arquivo `database.sql` localizado na pasta raiz do projeto.

A API estará disponível no seguinte endereço: http://localhost:3000

Endpoints da API
A API oferece os seguintes endpoints para manipulação dos dados de estudantes:

| Metódo | EndPoint | Descrição |
| ------ | ------ | ------ |
| GET | /v1/student | Obtém todos os estudantes cadastrados. |
| GET | /v1/student/:id | Obtém os detalhes de um estudante específico com base no ID fornecido. |
| POST | /v1/student | Cria um novo estudante. Os dados devem ser enviados no corpo da requisição. |
| PUT | /v1/student | Atualiza os dados de um estudante específico com base no ID fornecido. |
| DELETE | /v1/student | Exclui um estudante específico com base no ID fornecido. |

### Insomnia
O corpo das requisições se encontra dentro do insonmia, importe o arquivo `insomnia.json` dentro do mesmo para efetuar as requests de teste.

### Banco de Dados
O projeto utiliza um banco de dados MySQL para armazenar os dados dos estudantes. As informações de configuração do banco de dados podem ser encontradas no arquivo docker-compose.yml.

### Cache com Redis
Este projeto também possui a configuração básica para integrar o Redis como um cache para melhorar o desempenho da API. No entanto, a funcionalidade do Redis ainda não foi totalmente integrada. Você pode implementar o uso do Redis de acordo com as necessidades do seu projeto.

## Conclusão
Este projeto fornece uma estrutura básica para a criação de uma API REST de CRUD de estudantes em Node.js com TypeScript. Sinta-se à vontade para personalizar e expandir o projeto de acordo com seus requisitos específicos.

## Observação
O projeto não se encontra pronto no momento, o mesmo passará por diversas alterações para a integração do Redis e JWT.