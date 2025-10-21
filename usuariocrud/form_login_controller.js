function backTest() {
    fetch("http://localhost:8080/apis/user/get-all")
        .catch(error => document.getElementById("layout").innerHTML = "<p>sem conexao</p>");
}

function cadUsuario() {
    const formUser = document.forms.user;
    const user = {};
    user.id = formUser.id.value;
    user.nome = formUser.nome.value;
    user.login = formUser.login.value;
    user.senha = formUser.passwd.value;
    user.nivel = formUser.nivel.value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const token = localStorage.getItem("token");
    if (token) myHeaders.append("Authorization", token);

    const raw = JSON.stringify(user);
    const requestOptions = { method: "POST", headers: myHeaders, body: raw, redirect: "follow" };

    fetch("http://localhost:8080/apis/user", requestOptions)
        .then((response) => {
            if (!response.ok) throw new Error("Erro ao cadastrar usuário");
            return response.json().catch(() => ({}));
        })
        .then((result) => {
            formUser.reset();
            carregarTabela();
        })
        .catch((error) => {
            console.error(error);
            alert("Erro ao cadastrar usuário");
        });
}

function carregarTabela() {
    const myHeaders = new Headers();
    const token = localStorage.getItem("token");
    if (token) myHeaders.append("Authorization", token);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    let linhaTab = "";

    fetch("http://localhost:8080/apis/user/get-all", requestOptions)
        .then((response) => {
            if (!response.ok) throw new Error("Erro ao carregar usuários");
            return response.json();
        })
        .then((result) => {
            if (!Array.isArray(result) || result.length === 0) {
                document.getElementById("dados").innerHTML = "<tr><td colspan='7'>Nenhum usuário encontrado</td></tr>";
                return;
            }
            for (let u of result) {
                linhaTab += `<tr>
    <td>${u.id}</td>
    <td>${u.nome}</td>
    <td>${u.login}</td>
    <td>${u.senha}</td>
    <td>${u.nivel}</td>
    <td onclick="apagar(${u.id})"><i class="fa-solid fa-trash-can"></i></td>
    <td onclick="alterar(${u.id})"><i class="fa-regular fa-pen-to-square"></i></td>
</tr>`;
            }
            document.getElementById("dados").innerHTML = linhaTab;
        })
        .catch((error) => {
            console.error(error);
            document.getElementById("dados").innerHTML = `<tr><td colspan='7'>${error.message}</td></tr>`;
        });
}

function apagar(id) {
    const myHeaders = new Headers();
    const token = localStorage.getItem("token");
    if (token) myHeaders.append("Authorization", token);

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
    };
    if (confirm("Deseja apagar o usuário de id " + id + "?")) {
        fetch("http://localhost:8080/apis/user/" + id, requestOptions)
            .then((response) => {
                if (!response.ok) throw new Error("Erro ao apagar usuário");
                return response.text().catch(() => "");
            })
            .then((result) => {
                carregarTabela();
            })
            .catch((error) => {
                console.error(error);
                alert("Erro ao apagar");
            });
    }
}

function alterar(id) {
    const myHeaders = new Headers();
    const token = localStorage.getItem("token");
    if (token) myHeaders.append("Authorization", token);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };
    fetch("http://localhost:8080/apis/user/get-by-id/" + id, requestOptions)
        .then((response) => {
            if (!response.ok) throw new Error("Erro ao buscar usuário");
            return response.json();
        })
        .then((result) => {
            const formUser = document.forms.user;
            formUser.id.value = result.id || "";
            formUser.nome.value = result.nome || "";
            formUser.login.value = result.login || "";
            formUser.passwd.value = result.senha || "";
            formUser.nivel.value = result.nivel || "";
        })
        .catch((error) => {
            console.error(error);
            document.getElementById("dados").innerHTML = `<tr><td colspan='7'>${error.message}</td></tr>`;
        });
}