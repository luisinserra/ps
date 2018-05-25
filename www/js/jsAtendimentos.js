var apkDisplay = angular.module('exibeApk', []);
var apkCliente = angular.module('clienteApk', []);
var containerApp = angular.module('myApp',['clienteApk', 'exibeApk'])
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
});

apkCliente.controller('clienteCtrl', function($scope, servico, $http, $interval){
	console.log("Controller trabalhando");
	$scope.bc=goBuscaCliente;
	$scope.callDisplay=toDisplay;
	$scope.ide='um';

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
              putMemo('pessoas',$scope.retorno);
              $scope.callDisplay();
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
	              putMemo('pessoas',$scope.retorno);
	              $scope.callDisplay();
/*	              try {
	              	$scope.$apply();
	              } catch(e){}
*/	        }
	        conta++;
    	}, 100);
    	return $scope.retorno;
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


apkDisplay.service('servicoDisplay', function(){
	this.popula=function($scope){
		$scope.pessoas=getMemo('pessoas');
	}
});
apkDisplay.controller('displayCtrl', function($scope, servicoDisplay){
	console.log('disp');
	$scope.callDisplay=toDisplay;
	$scope.ide='dois';
});
