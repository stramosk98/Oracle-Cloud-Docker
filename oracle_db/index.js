const readline = require('readline');
const oracledb = require('oracledb');

async function createConnection() {
    try {
        const connection = await oracledb.getConnection({
            user: 'username',
            password: 'password',
            connectionString: 'connection string'
        });
        return connection;
    } catch (err) {
        console.error('Erro ao estabelecer conexão com o banco de dados Oracle: ', err);
    }
}

async function newUser(connection, user, senha, tel, mail) {
    try {
        const result = await connection.execute(`INSERT INTO usuarios (name, senha, telefone, email) 
        VALUES (:1, :2, :3, :4)`, [user, senha, tel, mail]);
        connection.commit()
        console.log(result.rowsAffected, 'Registro Incluido'); 
    } catch (err) {
        console.error('Erro ao incluir dado na tabela usuário: ', err);
    }
}

async function deleteUser(connection, user) {
    try {
        const result = await connection.execute(`DELETE FROM usuarios WHERE name = :1`, [user]);
        connection.commit()
        console.log(result.rowsAffected, 'Registro excluído'); 
    } catch (err) {
        console.error('Erro ao excluir dados na tabela usuário: ', err);
    }
}

async function authenticator(connection, user, senha) {
    try {
        const result = await connection.execute(`SELECT * FROM usuarios WHERE name = :1 AND senha = :2`, [user, senha]);
        
        if (result.rows && result.rows.length > 0) {
            console.log('Usuário autenticado!');
            return true;
        } else {
            console.log('Usuário não encontrado ou credenciais incorretas.');
            return false;
        }
    } catch (err) {
        console.error('Erro ao consultar tabela de usuários: ', err);
        return false;
    }
}

async function showUser(connection, user) {
    try {
        const result = await connection.execute(`SELECT name, telefone, email FROM usuarios where name = :1`, [user], { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT });
        const rs = result.resultSet; let row;
        while ((row = await rs.getRow())) {
            console.log(row);
        }
        await rs.close();
    } catch (err) {
        console.error('Erro ao listar dados na tabela usuários: ', err);
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function options(connection, user) {
    rl.question('Digite uma opção (excluir, sair): ', async (opc) => {
        if(opc === 'excluir') {
            rl.question('Deseja exluir seu usuário? (y|n): ', async (del) => {
                if(del === 'y'){
                    await deleteUser(connection, user);
                    login();
                } else {
                    options();
                }
            });
        } else if (opc === 'sair'){
            login();
        }
    });
}

async function login() {
    const connection = await createConnection();
    rl.question('Faça: (login) ou (cadastro) ', async (opcao) => {
        if(opcao === 'login') { 
            rl.question('Digite o username: ', async (user) => {
                rl.question('Digite a senha: ', async (senha) => {
                    const authenticated = await authenticator(connection, user, senha);
                    if (authenticated) {
                        await showUser(connection, user);
                        options(connection, user)
                    } else {
                        console.log('Usuário não autenticado.');
                    }
                });
            });
        } else if (opcao === 'cadastro') {
            rl.question('Digite o username: ', async (user) => {
                rl.question('Digite a senha: ', async (senha) => {
                    rl.question('Digite o telefone: ', async (tel) => {
                        rl.question('Digite e email: ', async (mail) => {
                            const addUser = await newUser(connection, user, senha, tel, mail);
                            await showUser(connection, user);
                            options(connection, user)
                        });
                    });
                });
            });
        } else {
            login();
        }
    });  
}

login();