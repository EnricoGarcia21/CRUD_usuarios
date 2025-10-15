function backTest() {
    fetch("http://localhost:8080/apis/user/get-all")
        .catch(error => document.getElementById("layout").innerHTML = "sem conexao")
}


function cadUsuario() {
    const formUser = document.forms.user;
    const user = {
        id: formUser.id.value, // Adiciona o id para PUT
        nome: formUser.nome.value,
        login: formUser.login.value,
        senha: formUser.passwd.value,
        nivel: formUser.nivel.value
    };
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify(user);

    let url = "http://localhost:8080/apis/user";
    let method = "POST";

    // Se tem id, é edição (PUT)
    if (formUser.id.value) {
        method = "PUT";
    }

    const requestOptions = {
        method: method,
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(url, requestOptions)
        .then((response) => {
            if (!response.ok) throw new Error("Erro ao salvar usuário");
            return response.json();
        })
        .then((result) => {
            formUser.reset();
            carregarTabela();
        })
        .catch((error) => alert(error));
}



function carregarTabela(){
    let linhaTab="";

    fetch("http://localhost:8080/apis/user/get-all")
    .then((response) => response.json())
    .then((result) => {
        for(let u of result){
            linhaTab+=`<tr>
        <td>${u.id}</td>
        <td>${u.nome}</td>
        <td>${u.login}</td>
        <td>${u.senha}</td>
        <td>${u.nivel}</td>
        <td onclick='apagar(${u.id})'><i class="fa-solid fa-trash-can"></i></td>
        <td onclick='alterar(${u.id})'><i class="fa-regular fa-pen-to-square"></i></td>
    </tr>`;
        }
        document.getElementById("dados").innerHTML=linhaTab;
    })
  .catch((error) => document.getElementById("dados").innerHTML=error);
}


function apagar(id) {
    if (confirm("Deseja apagar o usuário de id " + id + "?")) {
        fetch("http://localhost:8080/apis/user/" + id, { method: "DELETE" })
            .then((response) => response.text())
            .then((result) => {
                carregarTabela();
            })
            .catch((error) => alert("Erro ao apagar"));
    }
}

function alterar(id) {
    fetch("http://localhost:8080/apis/user/get-by-id/" + id)
        .then((response) => response.json())
        .then((result) => {
            const formUser = document.forms.user;
            formUser.id.value = result.id;
            formUser.nome.value = result.nome;
            formUser.login.value = result.login;
            formUser.passwd.value = result.senha;
            formUser.nivel.value = result.nivel;
        })
        .catch((error) => document.getElementById("dados").innerHTML = error);
}