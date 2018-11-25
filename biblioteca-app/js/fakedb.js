// declara um conjunto fake de dados para contatos
var dbfake = {
    "data": [
        {
            "id": 1,
            "ref": "213231",
            "nome": "Harry Potter: E a camara secreta",
            "autor": "J.K Rowling",
            "volume": "2",
            "classificacao": "n sei",
            "status": "Disponível",
            "imagem": "imgs/placeholder.gif"
        },
        {
            "id": 2,
            "ref": "21321",
            "nome": "Harry Potter: E a pedra filosofal",
            "autor": "J.K. Rowling",
            "volume": "1",
            "classificacao": "n sei",
            "status": "Emprestado",
            "imagem": "imgs/placeholder.gif"
        },
    ]
}

// Caso exista no Local Storage, recupera os dados salvos
var db = JSON.parse(localStorage.getItem('db'));
if (!db) {
    db = dbfake
};

// Exibe mensagem em um elemento de ID msg
function displayMessage(msg) {
    $('#msg').html('<div class="alert alert-warning">' + msg + '</div>');
}

function insertBook(book) {
    // Verifica se existe algum dado no LocalStorage
    if (db.data.length == 0) {
        var novoId = 1;
    } else {
        // Calcula novo Id a partir do último código existente no array
        var novoId = db.data[db.data.length - 1].id + 1;
    }

    let novoLivro = {
        "id": novoId,
        "ref": book.ref,
        "nome": book.nome,
        "autor": book.autor,
        "volume": book.volume,
        "classificacao": book.classificacao,
        "status": book.status,
        "imagem": book.img
    };

    // Insere o novo objeto no array
    db.data.push(novoLivro);
    displayMessage("Livro inserido com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('db', JSON.stringify(db));
}

function updateLivro(id, book) {
    // Localiza o indice do objeto a ser alterado no array a partir do seu ID
    let index = db.data.map(obj => obj.id).indexOf(id);

    // Altera os dados do objeto no array
    db.data[index].nome = book.nome;
    db.data[index].autor = book.autor;
    db.data[index].ref = book.ref;
    db.data[index].volume = book.volume;
    db.data[index].classificacao = book.classificacao;
    db.data[index].status = book.status;
    if (changed) {
        db.data[index].imagem = book.img;
        changed = false;
    }

    displayMessage("Livro alterado com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('db', JSON.stringify(db));
}

function deleteLivro(id) {
    // Filtra o array removendo o elemento com o id passado
    db.data = db.data.filter(function (element) { return element.id != id });

    displayMessage("Livro removido com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('db', JSON.stringify(db));
}