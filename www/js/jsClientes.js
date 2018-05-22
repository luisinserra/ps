function goBuscaRazao(){//document.getElementById('divResultado').style.display='none';
	var nome=document.getElementById('tParm').value;
	url='http://mensagemvirtual.com.br/foraEmpsOS.html';
	url="http://localhost:8080/geosmarty/ajax/chooseRazao.jsonx?parm="+nome;
	var negocio='http://printsource.jelasticlw.com.br/gestor/chooseFantasia';
	var negocio = "http://clevermidia.com.br/printsource/chooseFantasia";
	document.getElementById('spanSaida').innerHTML='';
    var funcao='';
    putMemo('encoda','S');
    var parms="&parm="+nome;
    parms+="&login="+window.localStorage.getItem('userLogin');
    parms+="&senha="+window.localStorage.getItem('senha');
    putMemo('retornoAx', 'exibeResultados');
    chamaJSon(negocio,funcao,parms);
}

function exibeResultados(dados){
	empresas=dados.registros;
	putMemo('empresas',empresas);
	var n=empresas.length;
	var tInicial=240;
	for (var i = 0; i < n; i++){
		var empresa=empresas[i];
		var codigo=empresa.id;
        var nome=empresa.fantasia;
        var top=tInicial+(i*50);
        var parte='<span id="spanLin'+i+'" style="padding: 10px;position:absolute;width:350px;height:50px;top:'+top+'px;left:0px;right:0px;margin:auto;"><a href="javascript:getEmpresa('+codigo+');" class="z" style="font-size: 25px;">'+nome+'</a></span><br><br>';
        document.getElementById('spanSaida').innerHTML+=parte;
        var elemento=document.getElementById('spanLin'+i);
        elemento.classList.add('cantinhos');
	}
}
function getEmpresa(codigo){
	window.localStorage.setItem('idEmpresa',codigo);
	var fantasia='';
	var empresas=getMemo('empresas');
	for (var i = 0; i < empresas.length; i++){
		var empresa=empresas[i];
		var cod=empresa.id;
		if (cod == codigo){
			fantasia=empresa.fantasia;
		}
	}
	window.localStorage.setItem('fantasia',fantasia);
	window.open('ClienteShow.html','_top');
}

function getCliente(){
	var idEmpresa=window.localStorage.getItem('idEmpresa');
	var url = 'http://clever-jetserver.rhcloud.com/gestor/getOrdensCliente.html?login=Luis&senha=kkk&idCliente='+idEmpresa;
	url='http://localhost:8080/geosmarty/getOrdensCliente.html?login=Luis&senha=kkk&idCliente='+idEmpresa;
	var negocio='http://clevermidia.com.br/printsource/ajax/getRegistroWS.jsonx';
	var funcao='';
	//putMemo('encoda',true);
    var parms="&nosuf=S&login="+window.localStorage.getItem('userLogin');
    parms+="&senha="+window.localStorage.getItem('senha');
    parms+="&valor="+idEmpresa;
    parms+="&nomeClasse=GtEmpresas";
    parms+="&campo=id";
    parms+="&tipoCampo=String";
    putMemo('retornoAx', 'exibeCliente');
    chamaJSon(negocio,funcao,parms);
}
function exibeCliente(dados){
	var empresa=getJson(dados);
	var xEmpresa=JSON.stringify(empresa);
	window.localStorage.setItem('xEmpresa',xEmpresa);
	var negocio='http://clevermidia.com.br/printsource/getEnderecoPrincipal';
	var funcao='';
    var parms="&login="+window.localStorage.getItem('userLogin');
    parms+="&senha="+window.localStorage.getItem('senha');
    parms+="&codEmpresa="+empresa.id;
    putMemo('encoda',true);
    putMemo('retornoAx', 'pegaEnderecoPrincipal');
    chamaJSon(negocio,funcao,parms);
}
function pegaEnderecoPrincipal(dados){
	var xEmpresa=window.localStorage.getItem('xEmpresa');
	var empresa=JSON.parse(xEmpresa);
	var ender=dados.registros[0];
	var razao=empresa.razaoSocial;
	empresa.endTipoLogradouro=ender.tipoLogradouro;
	empresa.endLogradouro=ender.logradouro;
	empresa.endNumero=ender.numero;
	empresa.endComplemento=ender.complemento;
	empresa.endCidade=ender.cidade;
	empresa.endEstado=ender.estado;
	empresa.endComplemento=ender.complemento;
	document.getElementById('spanRazao').innerHTML=razao;
	document.getElementById('spanDDD').innerHTML=empresa.dddPABX;
	document.getElementById('spanFone').innerHTML=empresa.pabx;
	var endereco=empresa.endTipoLogradouro+' '+empresa.endLogradouro+', '+empresa.endNumero;
	if (endereco == 'null null, null'){
		endereco='';
	}
	var complemento='';
	if (empresa.endComplemento != '' && empresa.endComplemento != 'null'){
		complemento=' - '+empresa.endComplemento;
	}
	endereco+=complemento;
	document.getElementById('spanEndereco').innerHTML=endereco;

	var cidade=empresa.endCidade;
	var estado='';
	if (empresa.endEstado != ''){
		estado='-'+empresa.endEstado;
	}
	cidade+=estado;
	document.getElementById('spanCidade').innerHTML=cidade;
	document.getElementById('spanContato').innerHTML=empresa.contatoEmpresa;
	var cargo=empresa.cargoContato;
	if (cargo == 'null'){
		cargo='';
	}
	var depto=empresa.deptoContato;
	if (depto == 'null'){
		depto='';
	}
	document.getElementById('spanCargo').innerHTML=cargo;
	document.getElementById('spanDepto').innerHTML=depto;

	getContatosEmpresa();
}
function getContatosEmpresa(){
	var xEmpresa=window.localStorage.getItem('xEmpresa');
	var empresa=JSON.parse(xEmpresa);
	var codigo=empresa.id;
	var negocio='http://clevermidia.com.br/printsource/getContatosDaEmpresa';
	var funcao='';
    var parms="&login="+window.localStorage.getItem('userLogin');
    parms+="&senha="+window.localStorage.getItem('senha');
    parms+="&codEmpresa="+empresa.id;
    putMemo('encoda',true);
    putMemo('retornoAx', 'gotContatosEmpresa');
    chamaJSon(negocio,funcao,parms);
}
function gotContatosEmpresa(dados){
	var contatos=dados.registros;
	putMemo('nContatos',contatos.length);
	var xContatos=JSON.stringify(contatos);
	window.localStorage.setItem('xContatos',xContatos);
	var n=dados.registros.length;
	if (n > 0){
		putMemo('conta',0);
		iterateContatos();
	}
}
function iterateContatos(){
	var k=getMemo('conta');
	k=parseInt(k,10);
	var n=getMemo('nContatos');
	n=parseInt(n,10);
	if (k < n){
		getTelefones();
	} else {
		finalizaContatos();
	}
}
function getTelefones(){
	var conta=getMemo('conta');
	conta=""+conta;
	var contato=conta.getKContato();
	var negocio='http://clevermidia.com.br/printsource/getFonesContato';
	var funcao='';
    var parms="&login="+window.localStorage.getItem('userLogin');
    parms+="&senha="+window.localStorage.getItem('senha');
    parms+="&codContato="+contato.id;
    putMemo('encoda',true);
    putMemo('retornoAx', 'gotTelefones');
    chamaJSon(negocio,funcao,parms);
}
function gotTelefones(dados){
	var fones=dados.registros;
	var xFones='';
	var n=fones.length;
	for (var i = 0; i < fones.length; i++) {
		var fone=fones[i];
		if (xFones != ''){
			xFones+='<br>';
		}
		var linha=fone.tipo+' ('+fone.ddd+') '+fone.fone+' '+fone.obs;
		xFones+=linha;
	}
	var conta=getMemo('conta');
	conta=""+conta;
	var contato=conta.getKContato();
	contato.fones=xFones;
	var xContatos=window.localStorage.getItem('xContatos');
	var contatos=JSON.parse(xContatos);
	var k=getMemo('conta');
	k=parseInt(k,10);
	contatos[k]=contato;
	xContatos=JSON.stringify(contatos);
	window.localStorage.setItem('xContatos',xContatos);
	k++;
	putMemo('conta',k);
	iterateContatos();
}
String.prototype.getKContato = function(){
	var n=this;
	var xContatos=window.localStorage.getItem('xContatos');
	var contatos=JSON.parse(xContatos);
	return contatos[n];
}
function finalizaContatos(){
	document.getElementById('ifraContatos').style.display='block';
	document.getElementById('ifraContatos').src='ClientesContatos.html';
}
function mostraContatos(){
	var xContatos=window.localStorage.getItem('xContatos');
	var contatos=JSON.parse(xContatos);
	var lenTab=555*(contatos.length);
	var parte='<table style="margin-left: 40px;">';
	parte+='<tr>';
	for (var i = 0; i < contatos.length; i++) {
		var contato=contatos[i];
		var apelido=contato.apelido;
		var cargo=contato.cargo;
		var depto=contato.depto;
		var email=contato.email;
		var fones=contato.fones;
		var nome=contato.nome;
		parte+='<td>';
		parte+='<table style="width: 555px; margin-left: 40px;">';
		parte+='<tr>';
		parte+='<td>';
		parte+='<B>Nome</B>';
		parte+='</td>';
		parte+='<td style="width: 400px;">';
		parte+=nome;
		parte+='</td>';
		parte+='</tr>';
		parte+='<tr>';
		parte+='<td>';
		parte+='<B>Apelido</B>';
		parte+='</td>';
		parte+='<td style="width: 400px;">';
		parte+=apelido;
		parte+='</td>';
		parte+='</tr>';
		parte+='<tr>';
		parte+='<td>';
		parte+='<B>Depto</B>';
		parte+='</td>';
		parte+='<td style="width: 400px;">';
		parte+=depto;
		parte+='</td>';
		parte+='</tr>';
		parte+='<tr>';
		parte+='<td>';
		parte+='<B>Cargo</B>';
		parte+='</td>';
		parte+='<td style="width: 400px;">';
		parte+=cargo;
		parte+='</td>';
		parte+='</tr>';
		parte+='<tr>';
		parte+='<td>';
		parte+='<B>Email</B>';
		parte+='</td>';
		parte+='<td style="width: 400px;">';
		parte+=email;
		parte+='</td>';
		parte+='</tr>';
		parte+='<tr>';
		parte+='<td>';
		parte+='<B>Telefone</B>';
		parte+='</td>';
		parte+='<td style="width: 400px;">';
		parte+=fones;
		parte+='</td>';
		parte+='</tr>';
		parte+='</table>';
		parte+='<td width="80">';
		parte+='&nbsp;';
		parte+='</td>';
	}
	parte+='</tr>';
	parte+='</table>';
	document.getElementById('spanContatos').innerHTML=parte;
}
