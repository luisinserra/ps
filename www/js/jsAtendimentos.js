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
});

apkCliente.controller('clienteCtrl', function($scope, servico, $http, $interval){
	console.log("Controller trabalhando");
	$scope.bc=goBuscaCliente;

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
              servico.displayInfo($scope);
              $interval.cancel($scope.intervalPromise);
          }
          conta++;
      }, 100);


	$scope.reLeitura=function(){
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
	        }
	        conta++;
    	}, 100);
    	return $scope.retorno;
	}
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
