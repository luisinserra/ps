var apkCliente = angular.module('clienteApk', []);
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
		var retorno='';
		$http.get("https://www.w3schools.com/angular/customers_mysql.php")
		.then(function (response){
			retorno=response.data.records;
			$scope.retorno=retorno;
		});
		return retorno;
	}
});

apkCliente.controller('clienteCtrl', function($scope, servico, $http){
	console.log("Controller trabalhando");
	$scope.bc=goBuscaCliente;

	$scope.trazListaClientes=function(){
		var resposta=servico.carregaClientes('kk',$http, $scope);
		var inter = setInterval(function(){console.log($scope.retorno);clearInterval(inter)}, 5000);
	}
});
function goBuscaCliente(){
	console.log("Buscar Cliente");
	var inter = setInterval(rodar, 500);
	putMemo('inter',inter);
}
function rodar(){
	console.log('vai ir...');
	vaiNome('foi');
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

var inter = setInterval(function(){kk=angular.element(document.getElementById('idScopo'));sc=kk.scope();sc.trazListaClientes();clearInterval(inter)}, 5000);
//sc.trazListaClientes();