function checaAcesso(){
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
	var mensagem ="Temos registros, saltar login...";
	if (n == 0){
		window.open('login.html','_top');
	} else {
		displayMenu();
	}
}
function displayMenu(){
	var tInicial=240;
	var top=tInicial;
    var parte='<span id="spanLin1" style="padding: 10px;position:absolute;width:350px;height:50px;top:'+top+'px;left:0px;right:0px;margin:auto;"><a href="javascript:goItem(1);" class="z" style="font-size: 25px;">Ordem de Serviço</a></span><br><br>';
    top+=50;
    parte+='<span id="spanLin2" style="padding: 10px;position:absolute;width:350px;height:50px;top:'+top+'px;left:0px;right:0px;margin:auto;"><a href="javascript:goItem(2);" class="z" style="font-size: 25px;">Checkin</a></span><br><br>';
    document.getElementById('spanResultado').innerHTML=parte;
    document.getElementById('spanLin1').classList.add('cantinhos');
    document.getElementById('spanLin2').classList.add('cantinhos');
}
function mataLogin(){
	db = window.openDatabase("DbPrintSource", "1.0", "DbPrintSource", 10);
	db.transaction(apagaRegistroExistente, erroOpen, apagaSucesso);
}
function apagaRegistroExistente(tx){
/*
	tx.executeSql('DELETE FROM login', [], function(_, result) {
  	(erroApaga || $.noop)(result);});
*/

		//tx.executeSql('CREATE TABLE IF NOT EXISTS login (id integer primary key, login text, senha text, nivel integer)');
		tx.executeSql('DELETE FROM login Where id=4');

		//tx.executeSql('SELECT * FROM login', [], apagaSucesso, erroApaga);

/*
	try {
		tx.executeSql('DELETE FROM login', erroApaga);
	} catch (e){
		console.log(e.message)
	}
	apagaSucesso('','');
*/	
}
function erroApaga(erro){
	alert("Erro apagando login..."+erro.code+":"+erro.message);
}
function apagaSucesso(){
	window.open('index.html');
}