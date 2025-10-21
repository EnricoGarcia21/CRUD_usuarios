function Logar() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
    "login": document.forms[0].login.value,
    "senha": document.forms[0].senha.value
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://localhost:8080/acesso/logar", requestOptions)
        .then((response) =>{
            if(response.ok)
                return response.text();
            else
                throw new Error("Erro ao efetuar login");
        })
        .then((token) =>{
            localStorage.setItem("token", token);
            console.log(token)
            window.location.href = "form_login.html"
        })
        .catch((error) => console.error(error));
        
    
    
}