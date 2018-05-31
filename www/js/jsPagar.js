var apkPagar = angular.module('pagarApk', ['']);
apkPagar.service('servicosPesquisa', function(){
	console.log('serviço rodando');
	this.goBuscaForn=function(){
		var escopo=getScopo('topo');var $http=escopo.http;
		var parm=escopo.tForn;
		if (parm == undefined){
			parm="";
		}
		var urle="http://clevermidia.com.br/printsource/chooseNomeFornecedorWS.html?Funcao=";
		var parms="&login="+window.localStorage.getItem('userLogin');
    	parms+="&senha="+window.localStorage.getItem('senha');
	    parms+="&parm="+parm;
	    parms+="&utf=S";
	    urle+=parms;
	    var retorno='';
	    var promise=$http.get(urle)
		.then(function (response){
			retorno={"erro":"","codigo":"200"};
			escopo.retorno=retorno;
			alert("Retornou dados");
		}, function deuRuim(response) {
        	escopo.retorno = '{"erro":"Falhou","codigo":"'+response.status+'"}';
        	console.log("retornou erro");
        	var msg="Erro: "+retorno.erro+"\nCódigo: "+retorno.codigo;
        	alert(msg);
    	});
		return retorno;
	}
});
apkPagar.controller('pagarCtrl', function($scope, servicosPesquisa, $http){
	console.log("Controller acionada");
	$scope.http=$http;
	$scope.goBuscaForn=servicosPesquisa.goBuscaForn;
	$scope.indice=0;
	console.log("indice setado");
});
