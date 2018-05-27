var apkDisplay = angular.module('exibeApk', []);
var apkCliente = angular.module('clienteApk', []);
var apkListaClientes=angular.module('listaClientesApk',[]);
var apkAtendimentos=angular.module('atendimentosApk',[]);
var containerApp = angular.module('myApp',['clienteApk', 'exibeApk', 'listaClientesApk','atendimentosApk']);
apkCliente.service('servico', function(){
	this.fnServico=function(parm,$scope){
		console.log('Serviço recebeu '+parm);
		$scope.nome=parm;
		try{
			$scope.$apply();
		} catch(e){}
		return 'Veio do serviço';
	}

	this.carregaClientes=function(parm, $http, $scope){
		var retorno={};
		var conta=0;
		var ok=new Boolean(false);
		var promise=$http.get("https://www.w3schools.com/angular/customers_mysql.php")
		.then(function (response){
			retorno=response.data.records;
			$scope.retorno=retorno;
		});
		return retorno;
	}

	this.displayInfo=function($scope){
		var dados=$scope.retorno;
		console.log("trabalhando...");
		for (var i = 0; i < dados.length; i++) {
			var pessoa=dados[i];
			var nome=pessoa.Name;
			var pais=pessoa.Country;
			var cidade=pessoa.City;
			console.log("Tratando "+nome+" de "+cidade+'-'+pais);
		}
		$scope.pessoas=$scope.retorno;
	}

	this.carregaAtendimentos=function(parm, indice, $http, $scope){
		var retorno={};
		var conta=0;
		var login=window.localStorage.getItem('userLogin');
    	var senha=window.localStorage.getItem('senha');
    	var urle="http://localhost:8080/geosmarty/getAtendimentosWS.html?Funcao=&login="+login+"&senha="+senha+"&codEmpresa="+parm+"&indice="+indice+"&utf=S";
    	console.log(urle);
		var promise=$http.get(urle)
		.then(function (response){
			retorno=response.data;
			retorno.erro='';
			retorno.codigo='200';
			$scope.retorno=retorno;
			console.log("retornou dados");
			console.log(retorno);
		}, function deuRuim(response) {
        	$scope.retorno = '{"erro":"Falhou","codigo":"'+response.status+'"}';
        	console.log("retornou erro");
    	});
		return retorno;
	}

	this.chamaListaClientes=function(parm, indice, $http, $scope){
		var config = {
                headers : {
                    'Accept': 'application/json;charset=utf-8',
                    'Accept-Charset':'charset=utf-8',
                    'Content-Type': 'application/json;charset=iso-8859-1'
                }
            }
		var retorno={};
		var login=window.localStorage.getItem('userLogin');
    	var senha=window.localStorage.getItem('senha');
		var negocio = "http://clevermidia.com.br/printsource/chooseFantasia.html";
		var parms="?Funcao=&login="+login+"&senha="+senha;
		parms+="&parm="+parm;
		var urle=negocio+parms;
		var promise=$http.get(urle, config)
		.then(function (response){
			retorno=response.data;
			retorno.erro='';
			retorno.codigo='200';
			$scope.retorno=retorno;
			console.log("retornou dados");
		}, function deuRuim(response) {
        	$scope.retorno = '{"erro":"Falhou","codigo":"'+response.status+'"}';
        	console.log("retornou erro");
    	});
    	return retorno;
	}
});

apkCliente.controller('clienteCtrl', function($scope, servico, $http, $interval){
	console.log("Controller trabalhando");
	$scope.bc=goBuscaCliente;
	$scope.callDisplay=toDisplay;
	$scope.buscaCliente=chamaListaCliente;
	$scope.exibeListaClientes=exibeListaClientes;
	$scope.exibeAtendimentos=exibeAtendimentos;
	$scope.ide='um';
	$scope.valor='200';
	$scope.mais=0;
	$scope.indice=0;

	$scope.reLeitura=function(){
		var parm=$scope.nome;
		if (parm == undefined){
			parm='';
		}
		if (parm != ''){
			window.localStorage.setItem('indice',0);
			$scope.buscaCliente();
		} else {
			var resposta=servico.carregaClientes('kk',$http, $scope);
			var n=0;
			var conta=0;
			$scope.intervalPromise = $interval(function(){
				try {
					n=$scope.retorno.length;
				} catch(e){}
		        if (n > 0 || conta > 20)
		        {
		              console.log($scope.retorno);
		              $interval.cancel($scope.intervalPromise);
		              putMemo('pessoas',$scope.retorno);
		              $scope.callDisplay();
		        }
		        conta++;
	    	}, 100);
	    	return $scope.retorno;
		}
	}

	$scope.chamaAtendimentos=function(parm, indice){
		var resposta=servico.carregaAtendimentos(parm, indice, $http, $scope);
		var n=0;
		var conta=0;
		$scope.intervalPromise = $interval(function(){
			try {
				n=$scope.retorno.mais.length;
			} catch(e){}
	        if (n > 0 || conta > 50)
	        {
	              console.log($scope.retorno);
	              $interval.cancel($scope.intervalPromise);
	              putMemo('atendimentos',$scope.retorno);
	              $scope.exibeAtendimentos();
	        }
	        conta++;
    	}, 100);
    	return $scope.retorno;
	}

	$scope.chamaListaClientes=function(parm){
		var indice=window.localStorage.getItem('indice');
		var resposta=servico.chamaListaClientes(parm, indice, $http, $scope);
		var n=0;
		var conta=0;
		$scope.intervalPromise = $interval(function(){
			try {
				n=$scope.retorno.codigo.length;
				n+=$scope.retorno.erro.length;
			} catch(e){}
	        if (n > 0 || conta > 50)
	        {
	              console.log($scope.retorno);
	              $interval.cancel($scope.intervalPromise);
	              putMemo('clientes',$scope.retorno);
	              $scope.exibeListaClientes();
	        }
	        conta++;
    	}, 100);
    	return $scope.retorno;
	}

	//$scope.reLeitura();
});
function goBuscaCliente(){
	console.log("Buscar Cliente");
	var inter = setInterval(rodar, 500);
	putMemo('inter',inter);
}
function rodar(){
	console.log('vai ir...');
	vaiNome2('foi');
	var inter=getMemo('inter');
	clearInterval(inter);
}

function vaiNome(parm){
	var co=angular.element(document.getElementById('idScopo')).scope();
	co.$apply(function(){co.nome=parm;});
}

function vaiNome2(parm){
	var co=angular.element(document.getElementById('idScopo')).scope();
	co.nome=parm;
	co.$apply();
}


function toDisplay(){
	var pessoas=getMemo('pessoas');
	console.log('vou mostrar pessoas...');
	console.log(pessoas);
	var scopo2=angular.element(document.getElementById('idScopo2'));
	var sc=scopo2.scope();
	sc.pessoas=pessoas;
	//sc.$apply();
}
function chamaListaCliente(){
	console.log("Vai procurar um cliente");
	var co=angular.element(document.getElementById('idScopo')).scope();
	var parm=co.nome;
	getListaClientes(parm);
/*
	console.log("Procurando "+parm);
	window.localStorage.setItem('indice',0);
	co.chamaListaClientes(parm);
*/	
}
function exibeListaClientes(){
	var resposta=getMemo('clientes');
	if (resposta.erro != ''){
		alert("Erro: "+erro);
	} else if (resposta.registros.length == 0){
		alert("Nenhum registro encontrado");
	} else {
		var escopo=angular.element(document.getElementById('idScopoListaClientes')).scope();
		var clientes=resposta.registros;
		var tInicial=290;
		for (var i = 0; i < clientes.length; i++) {
			clientes[i].tope=tInicial;
			tInicial+=50;
		}
		escopo.clientes=clientes;
		document.getElementById('idScopo2').style.display='none';
		document.getElementById('idScopoListaClientes').style.display='block';
		//escopo.$apply();
	}
}

function getListaClientes(parm){
	var indice=window.localStorage.getItem('indice');
	var negocio = "http://clevermidia.com.br/printsource/chooseFantasia";
	negocio = "http://localhost:8080/geosmarty/chooseFantasia";
    var funcao='';
    putMemo('encoda','S');
    putMemo('desvio','exibir');
    var parms="&parm="+parm;
    parms+="&login="+window.localStorage.getItem('userLogin');
    parms+="&senha="+window.localStorage.getItem('senha');
    parms+="&indice="+indice;
    putMemo('retornoAx', 'trouxeResultados');
    chamaJSon(negocio,funcao,parms);
}
function trouxeResultados(dados){
	var clientes=dados.registros;
	var mais=dados.mais;
	var indice=window.localStorage.getItem('indice');
	var escopo=angular.element(document.getElementById('idScopoListaClientes')).scope();
	var tInicial=260;
	for (var i = 0; i < clientes.length; i++) {
		clientes[i].tope=tInicial;
		tInicial+=50;
	}
	escopo.clientes=clientes;
	escopo.mais=mais;
	escopo.indice=indice;
	document.getElementById('idScopo2').style.display='none';
	document.getElementById('idScopoListaClientes').style.display='block';
	escopo.$apply();
	var n=0;
	try {
		n=clientes.length;
	} catch(e){}
	n--;
	if (n > 0){
		n=210+(n*50);
		document.getElementById('grandeCantonado').style.height=n+'px';
	}
}
function exibir(){
	var dados=getMemo('dados');
	trouxeResultados(dados);
}
function getEmpresa(codigo){
	var dados=getMemo('dados');
	var escopo=angular.element(document.getElementById('idScopo')).scope();
	escopo.chamaAtendimentos(codigo,0);
}
function getCliente(parm){
	window.localStorage.setItem('indiceAtd',0);
	getEmpresa(parm);
}
function pgCli(parm){
	var indice=window.localStorage.getItem('indice');
	indice=parseInt(indice,10);
	if (parm == 'V'){
		indice--;
	} else {
		indice++;
	}
	window.localStorage.setItem('indice',indice);
	var co=angular.element(document.getElementById('idScopo')).scope();
	var parm=co.nome;
	getListaClientes(parm);
}


function exibeAtendimentos(){
	console.log("exibeAtendimentos mudando de escopo...");
	var escopo=getScopo('idScopoAtendimentos');
	escopo.exibeAtendimentos();
}
function pgAtd(parm){
	var indice=window.localStorage.getItem('indiceAtd');
	indice=parseInt(indice,10);
	if (parm == 'V'){
		indice--;
	} else {
		indice++;
	}
	window.localStorage.setItem('indiceAtd',indice);
	var co=getScopo('idScopoAtendimentos');
	//var parm=co.nome;
	//getListaClientes(parm);
}

apkDisplay.service('servicoDisplay', function(){
	this.popula=function($scope){
		$scope.pessoas=getMemo('pessoas');
	}
});
apkDisplay.controller('displayCtrl', function($scope, servicoDisplay){
	console.log('disp');
	$scope.callDisplay=toDisplay;
	
	$scope.valor='13100.50';
	$scope.data=new Date();
});


apkListaClientes.controller('listaClientesCtrl', function($scope){
	console.log('controller listaClientes');
	$scope.ide='três';
	$scope.tInicial=240;
	$scope.pegaCliente=getCliente;
	$scope.pgCli=pgCli;
});



apkAtendimentos.service('servicosAtendimentos', function(){
	this.exibeAtendimentos=function($scope){
		var dados=getMemo('atendimentos');
		var erro=dados.erro;
		if (erro != ''){
			alert("Erro: "+erro);
		} else {
			var atendimentos=dados.registros;
			$scope=getScopo('idScopoAtendimentos');
			$scope.putEmpresaAtendimentos();
		}
	}
	this.putEmpresaAtendimentos=function(){
		putMemo('conta',0);
		$scope=getScopo('idScopoAtendimentos');
		$scope.iterateAtendimentos();
	}
	this.iterateAtendimentos=function(){
		var atendimentos=getMemo('atendimentos').registros;
		var k=atendimentos.length;k=parseInt(k,10);
		var conta=getMemo('conta');conta=parseInt(conta,10);
		if (conta < k){
			$scope.trataAtendimentoEmpresa();
		} else {
			$scope.finalizaAtendimentoEmpresa();
		}
	}
	this.trataAtendimentoEmpresa=function(){
		$http=$scope.http;
		var conta=getMemo('conta');conta=parseInt(conta,10);
		var atendimentos=getMemo('atendimentos').registros;
		var atendimento=atendimentos[conta];
		var codigo=atendimento.id;
		var urle="http://localhost:8080/geosmarty/ajax/getAtributoDeClasseWS.html?Funcao=";
		var parms="&login="+window.localStorage.getItem('userLogin');
    	parms+="&senha="+window.localStorage.getItem('senha');
	    parms+="&id="+codigo;
	    parms+="&nomeTabela=GtAtendimentos";
	    parms+="&atributo=gtCliente";
	    parms+="&utf=S";
	    urle+=parms;
	    var promise=$http.get(urle)
		.then(function (response){
			retorno=response.data;
			retorno.erro='';
			retorno.codigo='200';
			$scope.retorno=retorno;
			console.log("retornou dados");
			var apelido=retorno.registros[0].apelido;
			$scope.pegaEmpresaDoContato();
		}, function deuRuim(response) {
        	$scope.retorno = '{"erro":"Falha buscando contato do atendimento.","codigo":"'+response.status+'"}';
        	console.log("retornou erro");
    	});
	}
	this.pegaEmpresaDoContato=function(){
		var conta=getMemo('conta');conta=parseInt(conta,10);
		var dados=getMemo('atendimentos');
		var atendimentos=getMemo('atendimentos').registros;
		var atendimento=atendimentos[conta];
		var contato=$scope.retorno.registros[0];
		putMemo('contato',contato);
		$http=$scope.http;
		var codigo=contato.id;
		var urle="http://localhost:8080/geosmarty/ajax/getAtributoDeClasseWS.html?Funcao=";
		var parms="&login="+window.localStorage.getItem('userLogin');
    	parms+="&senha="+window.localStorage.getItem('senha');
	    parms+="&id="+codigo;
	    parms+="&nomeTabela=GtContatosEmpresa";
	    parms+="&atributo=gtEmpresa";
	    parms+="&utf=S";
	    urle+=parms;
	    var promise=$http.get(urle)
		.then(function (response){
			retorno=response.data;
			retorno.erro='';
			retorno.codigo='200';
			$scope.retorno=retorno;
			console.log("retornou dados");
			atendimento.apelidoContato=contato.apelido;
			atendimento.nomeContato=contato.nome;
			atendimento.fantasia=retorno.registros[0].fantasia;
			atendimento.razao=retorno.registros[0].razaoSocial;
			atendimentos[conta]=atendimento;
			dados.registros=atendimentos;
			putMemo('atendimentos',dados);
			conta++;
			putMemo('conta',conta);
			$scope.iterateAtendimentos();
		}, function deuRuim(response) {
        	$scope.retorno = '{"erro":"Falha buscando contato do atendimento.","codigo":"'+response.status+'"}';
        	console.log("retornou erro");
    	});
	}
	this.finalizaAtendimentoEmpresa=function(){
		console.log("Finalizou colocação de empresa no atendimento");
		var escopo=getScopo('idScopoAtendimentos');
		var atendimentos=getMemo('atendimentos').registros;
		escopo.atendimentos=atendimentos;
		document.getElementById('idScopo2').style.display='none';
		document.getElementById('idScopoListaClientes').style.display='none';
		document.getElementById('idScopoAtendimentos').style.display='block'
	}
});
apkAtendimentos.controller('atendimentosCtrl', function($scope, servicosAtendimentos, $http){
	console.log('controller atendimentos');
	$scope.ide='quatro';
	$scope.exibeAtendimentos=servicosAtendimentos.exibeAtendimentos;
	$scope.putEmpresaAtendimentos=servicosAtendimentos.putEmpresaAtendimentos;
	$scope.iterateAtendimentos=servicosAtendimentos.iterateAtendimentos;
	$scope.trataAtendimentoEmpresa=servicosAtendimentos.trataAtendimentoEmpresa;
	$scope.finalizaAtendimentoEmpresa=servicosAtendimentos.finalizaAtendimentoEmpresa;
	$scope.pegaEmpresaDoContato=servicosAtendimentos.pegaEmpresaDoContato;
	$scope.http=$http;
});
