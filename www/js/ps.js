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
	tx.executeSql('CREATE TABLE IF NOT EXISTS login (id integer primary key, login text, senha text)');
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
	var mensagem ="Temos registros, saltar login...";
	if (n == 0){
		mensagem="Sem registros, vamos para o login...";
	}
	alert("Registros: "+n);
	alert(mensagem);
}