function goAcesso(){
	db = window.openDatabase("DbPrintSource", "1.0", "DbPrintSource", 10);
	db.transaction(setDB, erroOpen, sucesso);
}
function erroOpen(erro){
	alert("Erro set database..."+erro.code+":"+erro.message);
}
function sucesso(){
	checaLogin();
}
function setDB(tx){
	tx.executeSql('CREATE TABLE IF NOT EXISTS login (id integer primary key, login text, senha text, nivel integer)');
}

function checaLogin(){
    db.transaction(getRegistro, errorCheca);
}
function errorCheca(erro){
	alert("Erro lendo registros..."+erro.code+":"+erro.message);
}
function getRegistro(tx){
	tx.executeSql('SELECT * FROM login', [], loginSucesso, erroLogin);
}
function erroLogin(erro){
	alert("Erro lendo login..."+erro.code+":"+erro.message);
}
function loginSucesso(tx, results){
	var n=results.rows.length;
	var mensagem ="Temos "+n+" registros, saltar login...";
	if (n == 0){
		window.open('login.html','_top');
	} else {
		window.open('menu.html','_top');
	}
}
function goLogin(){
	var login=document.getElementById('tLogin').value;
	var senha=document.getElementById('tSenha').value;
	if (login == ''){
		alert("Informe o login");
		document.getElementById('tLogin').focus();
	} else if (senha == ''){
		alert("Informe a senha");
		document.getElementById('tSenha').focus();
	} else {
		var negocio='http://printsource.jelasticlw.com.br/gestor/loginPrintSourceMobile';
	    var funcao='';
	    var parms="&login="+login+"&senha="+senha;
	    putMemo('retornoAx', 'retornoLogin');
	    chamaJSon(negocio,funcao,parms);
	}
}
function retornoLogin(dados){
	var erro=dados.erro;
	if (erro != ''){
		alert("Erro: "+erro);
	} else {
		var codUser=dados.codUser;
		var nivel=dados.nivel;
		var userLogin=dados.userLogin;
		var senha=dados.senha;
		var senha=dados.senha;
		window.localStorage.setItem("codUser",codUser);
		window.localStorage.setItem("nivel",nivel);
		window.localStorage.setItem("userLogin",userLogin);
		db = window.openDatabase("DbPrintSource", "1.0", "DbPrintSource", 10);
		db.transaction(gravaDb, erroGrava, sucessoGrava);
	}
}
function erroGrava(erro){
	alert("Erro inicio gravacao..."+erro.code+":"+erro.message);
}
function sucessoGrava(){
	alert("Gravação realizada com sucesso");
	window.open('menu.html','_top');
}
function gravaDb(tx){
	var codUser=localStorage.getItem("codUser");
	var login=localStorage.getItem("userLogin");
	var nivel=localStorage.getItem("nivel");
	tx.executeSql('INSERT INTO login (id, login, senha, nivel) VALUES ('+codUser+', "'+login+'","'+senha+'",'+nivel+')');
}