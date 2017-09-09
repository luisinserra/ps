function goBuscaRazao(){
	//document.getElementById('divResultado').style.display='none';
	var nome=document.getElementById('tParm').value;
	var url = "http://clever-jetserver.rhcloud.com/crmws/ajax/chooseRazao.jsonx?parm="+nome;
	url='http://mensagemvirtual.com.br/foraEmpsOS.html';
	var negocio='http://mensagemvirtual.com.br/foraEmpsOS';
    var funcao='';
    var parms="&parm="+nome;
    putMemo('retornoAx', 'exibeResultados');
    chamaJSon(negocio,funcao,parms);
}

function exibeResultados(dados){
	empresas=dados.registros;
	var n=empresas.length;
	var tInicial=240;
	for (var i = 0; i < n; i++){
		var empresa=empresas[i];
		var codigo=empresa.id;
        var nome=empresa.fantasia;
        var top=tInicial+(i*50);
        var parte='<span id="spanLin'+i+'" style="padding: 10px;position:absolute;width:350px;height:50px;top:'+top+'px;left:0px;right:0px;margin:auto;"><a href="javascript:getEmpresa('+codigo+');" class="z" style="font-size: 25px;">'+nome+'</a></span><br><br>';
        document.getElementById('spanSaida').innerHTML+=parte;
        var elemento=document.getElementById('spanLin'+i);
        elemento.classList.add('cantinhos');
	}
}
function getEmpresa(codigo){
	window.localStorage.setItem('idEmpresa',codigo);
}