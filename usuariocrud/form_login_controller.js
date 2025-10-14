function cadUsuario(){
   const formUser=document.forms.user;
   const user=new Object();
   user.nome=formUser.nome.value;
   user.login=formUser.login.value;
   user.senha=formUser.passwd.value;
   user.nivel=formUser.nivel.value;
   const myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/json");
   const raw = JSON.stringify(user);

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch("http://localhost:8080/apis/add-user", requestOptions)
    .then((response) => response.json())
    .then((result) => {
        formUser.reset();
       
        carregarTabela();
    })
    .catch((error) => console.error(error));
}



function carregarTabela(){
    let linhaTab="";

    fetch("http://localhost:8080/apis/get-all")
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