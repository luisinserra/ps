var apkNovoAtd = angular.module('novoAtdApk', []);
var apkMostraAtd = angular.module('mostraAtdApk', []);
apkNovoAtd.service('servicos', function(){
	this.initBusca=function(){
		window.localStorage.setItem('indice',0);
		var escopo=getScopo('topo');
		escopo.goBuscaFantasia();
	}

	this.goBuscaFantasia=function(){
		var escopo=getScopo('topo');var $http=escopo.http;
		var parm=escopo.tParm;
		escopo.indice=window.localStorage.getItem('indice');
		var urle="http://clevermidia.com.br/printsource/chooseFantasia.html?Funcao=";
		var parms="&login="+window.localStorage.getItem('userLogin');
    	parms+="&senha="+window.localStorage.getItem('senha');
    	parms+="&parm="+parm;
    	parms+="&indice="+escopo.indice;
	    parms+="&utf=S";
	    urle+=parms;
	    var retorno='';
	    var promise=$http.get(urle)
		.then(function (response){
			retorno=response.data;
			retorno.erro='';
			retorno.codigo='200';
			escopo.retorno=retorno;
			var clientes=retorno.registros;
			var tInicial=290;
			for (var i = 0; i < clientes.length; i++) {
				clientes[i].tope=tInicial;
				tInicial+=50;
			}
			escopo.clientes=clientes;
			escopo.mais=retorno.mais;
			var n=0;
			try {
				n=clientes.length;
			} catch(e){}
			n--;
			if (n > 0){
				n=230+(n*50);
				document.getElementById('grandeCantonado').style.height=n+'px';
			}
			document.getElementById('idListaClientes').style.display='block';
		}, function deuRuim(response) {
        	escopo.retorno = '{"erro":"Falhou","codigo":"'+response.status+'"}';
        	console.log("retornou erro");
    	});
		return retorno;
	}

	this.pegaCliente=function(codigo){
		var escopo=getScopo('topo');var $http=escopo.http;
		var urle="http://clevermidia.com.br/printsource/getRegistroWS.html?Funcao=";
		var parms="&login="+window.localStorage.getItem('userLogin');
    	parms+="&senha="+window.localStorage.getItem('senha');
    	parms+="&nomeClasse=GtEmpresas";
    	parms+="&valor="+codigo;
	    parms+="&campo=id";
	    parms+="&tipoCampo=String";
	    parms+="&utf=S";
	    urle+=parms;
	    var retorno='';
	    var promise=$http.get(urle)
		.then(function (response){
			retorno=response.data;
			retorno.erro='';
			retorno.codigo='200';
			escopo.retorno=retorno;
			var empresa=getJson(retorno.registros);
			putMemo('empresa',empresa);
			escopo.empresa=empresa;
			escopo.getContatosEmpresa();
		}, function deuRuim(response) {
        	escopo.retorno = '{"erro":"Falhou","codigo":"'+response.status+'"}';
        	console.log("retornou erro");
    	});
		return retorno;
	}

	this.getContatosEmpresa=function(){
		document.getElementById('divListaContatos').style.display='block';
		var escopo=getScopo('topo');var $http=escopo.http;
		var codigo=escopo.empresa.id;
		var urle="http://clevermidia.com.br/printsource/getContatosDaEmpresa.html?Funcao=";
		var parms="&login="+window.localStorage.getItem('userLogin');
    	parms+="&senha="+window.localStorage.getItem('senha');
	    parms+="&codEmpresa="+codigo;
	    parms+="&utf=S";
	    urle+=parms;
	    var retorno='';
	    var promise=$http.get(urle)
		.then(function (response){
			retorno=response.data;
			retorno.erro='';
			retorno.codigo='200';
			escopo.retorno=retorno;
			putMemo('retorno',retorno);
			var contatos=retorno.registros;
			putMemo('contatos',contatos);
			//escopo.contatos=contatos;
			document.getElementById('divPesqFantasia').style.display='none';
			document.getElementById('idListaClientes').style.display='none';
			document.getElementById('divListaContatos').style.display='block';
			document.getElementById('divListaStatus').style.display='none';
			escopo.exibeContatos();
		}, function deuRuim(response) {
        	escopo.retorno = '{"erro":"Falhou","codigo":"'+response.status+'"}';
        	console.log("retornou erro");
    	});
		return retorno;
	}

	this.exibeContatos=function(){
		var escopo=getScopo('topo');
		var contatos=getMemo('contatos');
		escopo.contatos=contatos;
	}

	this.gotContato=function(){
		var escopo=getScopo('topo');
		var codContato=escopo.cbContatos;
		if (codContato == undefined){
			alert("Escolha um contato");
		} else {
			var contatos=getMemo('contatos');
			putMemo('Angular','topo');
			var contato=getJsonByCampo(contatos,"id",codContato);
			escopo.contato=contato;
			putMemo('contato',contato);
			document.getElementById('divListaContatos').style.display='none';
			escopo.getListaStatus();
		}
	}

	this.getListaStatus=function(){
		var escopo=getScopo('topo');var $http=escopo.http;
		var urle="http://clevermidia.com.br/printsource/ajax/getListaTabelaWS.html?Funcao=";
		var parms="&login="+window.localStorage.getItem('userLogin');
    	parms+="&senha="+window.localStorage.getItem('senha');
	    parms+="&nomeTabela=GtStatusAtendimento";
	    parms+="&campoSort=nome";
	    parms+="&utf=S";
	    urle+=parms;
	    var retorno='';
	    var promise=$http.get(urle)
		.then(function (response){
			retorno=response.data;
			retorno.erro='';
			retorno.codigo='200';
			escopo.retorno=retorno;
			putMemo('retorno',retorno);
			escopo.states=retorno.registros;
			document.getElementById('divPesqFantasia').style.display='none';
			document.getElementById('idListaClientes').style.display='none';
			document.getElementById('divListaContatos').style.display='none';
			document.getElementById('divListaStatus').style.display='block';
		}, function deuRuim(response) {
        	escopo.retorno = '{"erro":"Falhou","codigo":"'+response.status+'"}';
        	console.log("retornou erro");
    	});
		return retorno;
	}

	this.gotAtendimento=function(){
		var escopo=getScopo('topo');var $http=escopo.http;
		var codStatus=escopo.cbStatus;
		if (codStatus == undefined){
			alert("Escolha um status");
		} else if (escopo.tDesc == undefined){
			alert("Descreva o atendimento");
		} else {
			var codCliente=escopo.contato.id;
			var dataHora=escopo.tData.formatData();
			var texto=escopo.tDesc;
			var codStatus=escopo.cbStatus;
			var urle="http://clevermidia.com.br/printsource/gravaNovoAtendimentoWS.html?Funcao=";
			var parms="&login="+window.localStorage.getItem('userLogin');
	    	parms+="&senha="+window.localStorage.getItem('senha');
		    parms+="&codCliente="+codCliente;
		    parms+="&datahora="+dataHora+' 00:00';
		    parms+="&texto="+texto;
		    parms+="&codStatus="+codStatus;
		    urle+=parms;
		    var retorno='';
		    var promise=$http.get(urle)
			.then(function (response){
				retorno={"erro":"","codigo":"200"};
				escopo.retorno=retorno;
				alert("Atendimento gravado com sucesso");
				escopo.cancelaAtendimento();
			}, function deuRuim(response) {
	        	escopo.retorno = '{"erro":"Falhou","codigo":"'+response.status+'"}';
	        	console.log("retornou erro");
	        	var msg="Erro: "+retorno.erro+"\nCódigo: "+retorno.codigo;
	        	alert(msg);
	    	});
			return retorno;
		}
	}
});
apkNovoAtd.controller('novoAtdCtrl', function($scope, servicos, $http){
	$scope.goBuscaFantasia=servicos.goBuscaFantasia;
	$scope.initBusca=servicos.initBusca;
	$scope.pgCli=pgCli;
	$scope.pegaCliente=servicos.pegaCliente;
	$scope.getContatosEmpresa=servicos.getContatosEmpresa;
	$scope.exibeContatos=servicos.exibeContatos;
	$scope.gotContato=servicos.gotContato;
	$scope.getListaStatus=servicos.getListaStatus;
	$scope.cancelaAtendimento=cancelaAtendimento;
	$scope.gotAtendimento=servicos.gotAtendimento;
	$scope.tData=new Date();
	$scope.http=$http;

});

function pgCli(parm){
	var indice=window.localStorage.getItem('indice');
	indice=parseInt(indice,10);
	if (parm == 'V'){
		indice--;
	} else {
		indice++;
	}
	window.localStorage.setItem('indice',indice);
	var escopo=getScopo('topo');
	escopo.goBuscaFantasia();
}

function cancelaAtendimento(){
	location.href="atendimentos.html";
}
