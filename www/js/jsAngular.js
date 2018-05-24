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
});
apkCliente.controller('clienteCtrl', function($scope, servico){
	console.log("Controller trabalhando");
	$scope.nome='ttt';
	putMemo('ca','la');
	$scope.goBuscaCliente=goBuscaCliente;
	$scope.bc=goBuscaCliente;
	putMemo('co',$scope);

		var resposta=servico.fnServico('toma serviço',$scope);
		console.log(resposta);


	$scope.poeNome=function(valor){
		var co=angular.element(document.getElementById('idScopo')).scope();
		var resposta=servico.fnServico(valor,$scope);
		console.log(resposta);
	}
});
function goBuscaCliente(){
	console.log("Buscar Cliente");
	//apkCliente.$scope.nome='kkk';
/*
	var co=angular.element(document.getElementById('idScopo')).scope();
	co.$apply(function(){co.nome='111';});
*/
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
kk=angular.element(document.getElementById('idScopo'));
sc=kk.scope();
