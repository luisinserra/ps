function goBuscaContato(){
	var parm=document.getElementById('tParm').value;
	var negocio='http://clevermidia.com.br/printsource/chooseApelido';
	var funcao='';
    var parms="&login="+window.localStorage.getItem('userLogin');
    parms+="&senha="+window.localStorage.getItem('senha');
    parms+="&parm="+parm;
    putMemo('encoda',true);
    putMemo('retornoAx', 'trouxeContatos');
    chamaJSon(negocio,funcao,parms);
}
function trouxeContatos(dados){
	var contatos=dados.registros;
	putMemo('contatos',contatos);
	var n=dados.registros.length;
	putMemo('nContatos',n);
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
		putMemo('gotPraLista',1);
		var codigo=getMemo('contatos')[k].id;
		window.localStorage.setItem('idContato',codigo);
		getEmpresa();
	} else {
		displayContatos();
	}
}
function displayContatos(){
	document.getElementById('spanSaida').innerHTML='';
	var contatos=getMemo('contatos');
	var n=contatos.length;
	var tInicial=240;
	for (var i = 0; i < n; i++){
		var contato=contatos[i];
		var codigo=contato.id;
        var nome=contato.nome;
        var empresa=contato.empresa;
        if (empresa.length > 6){
        	empresa=empresa.substring(0,6)+'...';
        }
        nome+='-'+empresa;
        var top=tInicial+(i*50);
        var parte='<span id="spanLin'+i+'" style="padding: 10px;position:absolute;width:350px;height:50px;top:'+top+'px;left:0px;right:0px;margin:auto;"><a href="javascript:getContato('+codigo+');" class="z" style="font-size: 25px;">'+nome+'</a></span><br><br>';
        document.getElementById('spanSaida').innerHTML+=parte;
        var elemento=document.getElementById('spanLin'+i);
        elemento.classList.add('cantinhos');
	}
}
function getContato(codigo){
	window.localStorage.setItem('idContato',codigo);
	var apelido='';
	var contatos=getMemo('contatos');
	for (var i = 0; i < contatos.length; i++){
		var contato=contatos[i];
		var cod=contato.id;
		if (cod == codigo){
			var xContato=JSON.stringify(contato);
			window.localStorage.setItem('xContato',xContato);
		}
	}
	getEmpresa();
}
function getTelefones(){
	var conta=getMemo('conta');
	conta=""+conta;
	var contato=conta.getKContato();
	var negocio='http://clevermidia.com.br/printsource/getFonesContato';
	var funcao='';
    var parms="&login="+window.localStorage.getItem('userLogin');
    parms+="&senha="+window.localStorage.getItem('senha');
    parms+="&codContato="+window.localStorage.getItem('idContato');
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
	var xContato=window.localStorage.getItem('xContato');
	var contato=JSON.parse(xContato);
	contato.fones=xFones;
	xContato=JSON.stringify(contato);
	window.localStorage.setItem('xContato',xContato);
}
function getEmpresa(){
	var negocio='http://clevermidia.com.br/printsource/ajax/getAtributoDeClasseWS';
	var funcao='';
    var parms="&login="+window.localStorage.getItem('userLogin');
    parms+="&senha="+window.localStorage.getItem('senha');
    parms+="&nomeTabela=GtContatosEmpresa";
    parms+="&id="+window.localStorage.getItem('idContato');
    parms+="&atributo=gtEmpresa";
    putMemo('encoda',true);
    var retorno='gotEmpresa';
    if (ckTem('gotPraLista')){
    	retorno='putEmpresaLista';
    	delMemo('gotPraLista');
    }
    putMemo('retornoAx', retorno);
    chamaJSon(negocio,funcao,parms);
}
function gotEmpresa(dados){
	var empresa = dados.registros[0];
	window.localStorage.setItem('idEmpresa',empresa.id);
	location.href="ClienteShow.html";
}
function putEmpresaLista(dados){
	var empresa = dados.registros[0];
	var k=getMemo('conta');
	var contatos=getMemo('contatos');
	var contato=contatos[k];
	contato.empresa=empresa.fantasia;
	contatos[k]=contato;
	putMemo('contatos',contatos);
	k=parseInt(k,10);
	k++;
	putMemo('conta',k);
	iterateContatos();
}