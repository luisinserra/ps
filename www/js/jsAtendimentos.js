var apkDisplay = angular.module('exibeApk', []);
var apkCliente = angular.module('clienteApk', []);
var apkListaClientes=angular.module('listaClientesApk',[]);
var containerApp = angular.module('myApp',['clienteApk', 'exibeApk', 'listaClientesApk']);
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
    	var urle="http://localhost:8080/geosmarty/getAtendimentosWS.html?Funcao=&login="+login+"&senha="+senha+"&codEmpresa="+parm+"&indice="+indice;
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
	$scope.ide='um';
	$scope.valor='200';

	$scope.reLeitura=function(){
		var parm=$scope.nome;
		if (parm == undefined){
			parm='';
		}
		if (parm != ''){
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

	$scope.reLeitura();
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
		var tInicial=240;
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
	var negocio = "http://clevermidia.com.br/printsource/chooseFantasia";
    var funcao='';
    putMemo('encoda','S');
    putMemo('desvio','exibir');
    var parms="&parm="+parm;
    parms+="&login="+window.localStorage.getItem('userLogin');
    parms+="&senha="+window.localStorage.getItem('senha');
    putMemo('retornoAx', 'trouxeResultados');
    chamaJSon(negocio,funcao,parms);
}
function trouxeResultados(dados){
	var clientes=dados.registros;
	var escopo=angular.element(document.getElementById('idScopoListaClientes')).scope();
	var tInicial=240;
	for (var i = 0; i < clientes.length; i++) {
		clientes[i].tope=tInicial;
		tInicial+=50;
	}
	escopo.clientes=clientes;
	document.getElementById('idScopo2').style.display='none';
	document.getElementById('idScopoListaClientes').style.display='block';
	escopo.$apply();
}
function exibir(){
	var dados=getMemo('dados');
	trouxeResultados(dados);
}
function getEmpresa(codigo){
	var dados=getMemo('dados');
	var escopo=angular.element(document.getElementById('idScopo')).scope();
	escopo.chamaAtendimentos(codigo,0);
	//var clientes=dados.registros;
	//var cliente=getJsonByCampo(clientes,'id',codigo);

}
function diz(parm){
	alert('kkk: '+parm);
	getEmpresa(parm);
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
	$scope.fala=diz;
});

//apkListaClientes.controller('listaClientesCtrl', function($scope){$scope.ide='3';});