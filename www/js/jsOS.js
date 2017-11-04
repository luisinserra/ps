function goBuscaRazao(){
	//document.getElementById('divResultado').style.display='none';
	var nome=document.getElementById('tParm').value;
	url='http://mensagemvirtual.com.br/foraEmpsOS.html';
	url="http://localhost:8080/geosmarty/ajax/chooseRazao.jsonx?parm="+nome;
	var negocio='http://printsource.jelasticlw.com.br/gestor/chooseFantasia';
	var negocio = "http://clevermidia.com.br/printsource/chooseFantasia";
	document.getElementById('spanSaida').innerHTML='';
    var funcao='';
    putMemo('encoda','S');
    var parms="&parm="+nome;
    parms+="&login="+window.localStorage.getItem('userLogin');
    parms+="&senha="+window.localStorage.getItem('senha');
    putMemo('retornoAx', 'exibeResultados');
    chamaJSon(negocio,funcao,parms);
}

function exibeResultados(dados){
	empresas=dados.registros;
	putMemo('empresas',empresas);
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
	var fantasia='';
	var empresas=getMemo('empresas');
	for (var i = 0; i < empresas.length; i++){
		var empresa=empresas[i];
		var cod=empresa.id;
		if (cod == codigo){
			fantasia=empresa.fantasia;
		}
	}
	window.localStorage.setItem('fantasia',fantasia);
	window.open('OS2.html','_top');
}

function getOeses(){
	var idEmpresa=window.localStorage.getItem('idEmpresa');
	var url = 'http://clever-jetserver.rhcloud.com/gestor/getOrdensCliente.html?login=Luis&senha=kkk&idCliente='+idEmpresa;
	url='http://localhost:8080/geosmarty/getOrdensCliente.html?login=Luis&senha=kkk&idCliente='+idEmpresa;
	var negocio='http://clevermidia.com.br/printsource/getOrdensCliente';
	var funcao='';
	putMemo('encoda',true);
    var parms="&login="+window.localStorage.getItem('userLogin');
    parms+="&senha="+window.localStorage.getItem('senha');
    parms+="&idCliente="+idEmpresa;
    putMemo('retornoAx', 'listaOesses');
    chamaJSon(negocio,funcao,parms);
}
function listaOesses(dados){
	var fantasia=window.localStorage.getItem('fantasia');
	document.getElementById('spanRazao').innerHTML=fantasia;
	var os=dados.registros;
	window.localStorage.setItem('oesses',JSON.stringify(os));
	var n=os.length;
	for (var i = os.length - 1; i >= 0; i--) {
		var data=os[i].data;
		var motivo=os[i].motivo;
		var status=os[i].status;
		var causaDefeito=os[i].causaDefeito;
		var obs=os[i].obs;
		var prazoAtendimento=os[i].prazoAtendimento;
		var codigo=os[i].id;
		var tInicial=240;
		var top=tInicial+(i*100);
        var parte='<span id="spanLin'+i+'" style="padding: 10px;position:absolute;width:350px;height:100px;top:'+top+'px;left:0px;right:0px;margin:auto;">';
        parte+='<a href="javascript:getOs('+codigo+');" class="z" style="font-size: 25px;"><B>O.S.</B> '+codigo+' '+data+'</a><br>';
        parte+='<a href="javascript:getOs('+codigo+');" class="z" style="font-size: 20px;">'+motivo+'</a><br>';
        parte+='<a href="javascript:getOs('+codigo+');" class="z" style="font-size: 20px;">'+status+'</a></span><br><br>';
        document.getElementById('spanSaida').innerHTML+=parte;
        var elemento=document.getElementById('spanLin'+i);
        elemento.classList.add('cantinhos');
	}
}
function getOs(codigo){
	window.localStorage.setItem('idOS',codigo);
	window.open('OS3.html','_top');
}
function trazOs(){
	var fantasia=window.localStorage.getItem('fantasia');
	document.getElementById('spanRazao').innerHTML=fantasia;
	var oesses=window.localStorage.getItem('oesses');
	oesses=JSON.parse(oesses);
	var idOS=window.localStorage.getItem('idOS');
	for (var i = oesses.length - 1; i >= 0; i--) {
		var id=oesses[i].id;
		if (id == idOS){
			var jsos=JSON.stringify(oesses[i]);
			window.localStorage.setItem('os',jsos);
		}
	}
	putDadosOS();
}
function putDadosOS(){
	var js=window.localStorage.getItem('os');
	var os=JSON.parse(js);
	document.getElementById('spNos').innerHTML='No. '+os.numero;
	document.getElementById('spData').innerHTML=os.data;
	document.getElementById('spStat').innerHTML=os.status;
	document.getElementById('spMotivo').innerHTML=os.motivo;
	document.getElementById('spPrazo').innerHTML=os.prazoAtendimento;
	document.getElementById('spDefeito').innerHTML=os.causaDefeito;
	document.getElementById('spObs').innerHTML=os.obs;
	document.getElementById('spanSaida').style.display='block';
}
function listaEquipamentos(dados){
	var impressora=dados.registros;
	var n=impressora.length;
	for (var i = impressora.length - 1; i >= 0; i--) {
		var fabricante=impressora[i].localCompra;
		var marca=impressora[i].marca;
		var modelo=impressora[i].modelo;
		var numeroSerie=impressora[i].numeroSerie;
	}
}
