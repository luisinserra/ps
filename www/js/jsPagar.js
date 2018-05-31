var apkPagar = angular.module('pagarApk', ['ngRoute']);
apkPagar.config(function($routeProvider){
	$routeProvider
    .when("/", {
        templateUrl : "templates/pagar/rowPesq.html"
    })
    .when("/listaFornecedores", {
        templateUrl : "templates/pagar/listaFornecedores.html"
    });
});
apkPagar.service('servicosPesquisa', function(){
	this.goBuscaForn=function(){
		var escopo=getScopo('divPesqPagar');var $http=escopo.http;
		var parm=escopo.tForn;
		if (parm == undefined){
			parm="";
		}
		var urle="http://localhost:8080/geosmarty/chooseNomeFornecedorWS.html?Funcao=";
		var parms="&login="+window.localStorage.getItem('userLogin');
    	parms+="&senha="+window.localStorage.getItem('senha');
	    parms+="&parm="+parm;
	    parms+="&utf=S";
	    urle+=parms;
	    var retorno='';
	    var promise=$http.get(urle)
		.then(function (response){
			retorno={"erro":"","codigo":""};
			escopo.retorno=retorno;
			retorno=response.data;
			var fornecedores=retorno.registros;
			var tInicial=290;
			for (var i = 0; i < fornecedores.length; i++) {
				fornecedores[i].tope=tInicial;
				tInicial+=50;
			}
			escopo.fornecedores=fornecedores;
			var fundo=160;
			var n=fornecedores.length;
			n--;
			fundo+=n*50;
			document.getElementById('canto').style.height=fundo+'px';
			location.href="pagar.html#!/listaFornecedores";
		}, function deuRuim(response) {
			retorno={"erro":"Falhou","codigo":response.status};
        	escopo.retorno = retorno;
        	console.log("retornou erro");
        	var msg="Erro: "+retorno.erro+"\nCódigo: "+retorno.codigo;
        	alert(msg);
    	});
		return retorno;
	}

	this.pegaFornecedor=function(codigo){
		var escopo=getScopo('divPesqPagar');
		var fornecedores=escopo.fornecedores;
		putMemo('Angular','divPesqPagar');
		var fornecedor=getJsonByCampo(fornecedores,"id",codigo);
		alert("Escolheu "+fornecedor.nome);
		escopo.tForn=fornecedor.nome;
		escopo.fornecedor=fornecedor;
		location.href="pagar.html#!";
	}
});
apkPagar.controller('pagarCtrl', function($scope, servicosPesquisa, $http){
	$scope.http=$http;
	$scope.goBuscaForn=servicosPesquisa.goBuscaForn;
	$scope.indice=0;
	$scope.pegaFornecedor=servicosPesquisa.pegaFornecedor;
	$scope.filtroForn='';
	$scope.filtroInicio='';
	$scope.filtroFim='';
});

