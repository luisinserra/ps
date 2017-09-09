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
	tx.executeSql('CREATE TABLE IF NOT EXISTS login (id integer primary key, login text, senha text, nivel integer, base text)');
}

function checaLogin(){
    db.transaction(getRegistro, errorCheca);
}
function errorCheca(erro){
	alert("Erro lendo registros..."+erro.code+":"+erro.message);
}
function getRegistro(tx){
	tx.executeSql('SELECT * FROM users', [], loginSucesso, erroLogin);
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
		negocio='http://mensagemvirtual.com.br/foraLoginJson';
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
		var base=dados.base;
		var userLogin=document.getElementById('tLogin').value;
		var senha=document.getElementById('tSenha').value;
		window.localStorage.setItem("codUser",codUser);
		window.localStorage.setItem("nivel",nivel);
		window.localStorage.setItem("userLogin",userLogin);
		window.localStorage.setItem("base",base);
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
	var base=localStorage.getItem("base");
	var base=localStorage.getItem("base");
	tx.executeSql('CREATE TABLE IF NOT EXISTS users (id integer primary key, login text, nivel text, base text)');
	var sql='INSERT INTO users (id, login, nivel, base) VALUES ('+codUser+', '+"'"+login+"'"+',"'+nivel+'",'+"'"+base+"'"+')';
	tx.executeSql(sql);
	//tx.executeSql(sql,feito,erroSql);
	//tx.executeSql(sql,erroSql, function() { alert('added row'); });
	//alert("Inseriu");
}
function feito(tx,results){
	alert("feito, "+results.rows.length);
}
function erroSql(erro){
	alert("Erro inserindo..."+erro.code+":"+erro.message);
}