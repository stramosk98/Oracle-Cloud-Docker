## Autonomous database Oracle

- Necessário uma conta na oracle;
- Crie um autonomous database no site da oracle, guarde o username e password;
- Na sessão de Network do database edite o Acess Control List e inclua seu ip;
- Em Mutual TLS deixa como 'Not Required;
- Na aba de Database Connection, copie a Connection string gerada;
- Vá na aba de Database Actions dentro do banco criado e em SQL;

### Crie uma tabela de usuários 
``` CREATE TABLE usuarios ( id NUMBER GENERATE BY DEFAULT ON NULL AS IDENTIFY, nome VARCHAR(100), senha VARCHAR(20), telefone VARCHAR(20), email VARCHAR(100) ) ```

- Após a criação do banco e tabela usuários

### Baixe este repositório
``` git clone https://github.com/stramosk98/Oracle-Cloud-Docker.git ```

- Altere os parâmetros para seus dados de 'username' 'senha' e 'connectionString' cadastrados ao criar o database;

### Dentro do diretório oracle_db Construa a imagem docker 
``` docker build -t node_db . ```

### inicie um docker usando a imagem criada 
``` docker run -it --name=autonomous-db_container node_db ```

- É possível logar, cadastrar, visualizar e excluir o usuário logado.


## Bucket Oracle

- Necessário uma conta na oracle;
- Crie um bucket no site da oracle em Storage>>Buckets;
- Altere o bucket para acesso público;
- Faça upload dos arquivos que desejar;
- copie o link dos arquivos;

### Baixe este repositório
``` git clone https://github.com/stramosk98/Oracle-Cloud-Docker.git ```

- Modifique os links do arquivo index.html para os links dos arquivos que você criou;
- Altere o código para seu objetivo de aplicação;

### Dentro do diretório bucket-OCI Construa a imagem docker 
``` docker build -t my-apache . ```

### Inicie um docker usando a imagem criada 
``` docker run -d -p 8080:80 --name=bucket_container my-apache ```

- Acesse http://localhost:8080



