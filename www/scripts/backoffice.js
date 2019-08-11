function login() {
    var login = prompt("Introduza a password");
    if(login){
        localStorage.setItem("password", "" + window.btoa(login)); // colocar a password em base64
        window.location = "/admin/";
    }
}

function checkAdmin() {
    var password = localStorage.getItem("password");
    if (window.atob(password) != "admin") { //desincriptar a password e compara-la
        document.write("<b style='color:darkred'>Erro 401: Acesso não autorizado</b>"); //se nao for igual á password, ele dá uma pagina de erro
    }
}