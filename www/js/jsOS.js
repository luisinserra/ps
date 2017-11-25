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
	getEquiposOrdem();
}

function getEquiposOrdem()
{
	var oesses=window.localStorage.getItem('oesses');
	oesses=JSON.parse(oesses);
	var idOS=window.localStorage.getItem('idOS');
	var negocio='http://clevermidia.com.br/printsource/equipamentosOrdem';
	var funcao='';
	putMemo('encoda',true);
    var parms="&login="+window.localStorage.getItem('userLogin');
    parms+="&senha="+window.localStorage.getItem('senha');
    parms+="&idOrdem="+idOS;
    putMemo('retornoAx', 'gotListaEquipos');
    chamaJSon(negocio,funcao,parms);
}
function gotListaEquipos(dados){
	var eqs=dados.registros;
	window.localStorage.setItem('equipos',JSON.stringify(eqs));
}
function completaEquipamentos(){
	putMemo('conta',0);
	iterateEquipos();
}
function iterateEquipos(){
	var eqs=window.localStorage.getItem('equipos');
	eqs=JSON.parse(eqs);
	var k=getMemo('conta');
	k=parseInt(k,10);
	if (k < eqs.length){
		complementaEq();
	} else {
		finalisouFab();
	}
}
function getEqCorrente(){
	var eqs=window.localStorage.getItem('equipos');
	eqs=JSON.parse(eqs);
	var k=getMemo('conta');
	k=parseInt(k,10);
	var equipamento=eqs[k];
	return equipamento;
}
function complementaEq(){
	var eq=getEqCorrente();
	var negocio='http://clevermidia.com.br/printsource/ajax/getAtributoDeClasse';
    var funcao='funcao';
    var parms='&nomeTabela=GtEquipamentos&id='+eq.id+'&atributo=gtFabricante';
    putMemo('retornoAx', 'retornoGotFab');
    chamaJSon(negocio,funcao,parms);
}
function retornoGotFab(dados){
	var fab=dados.registros[0];
	console.log("Fabricante: "+fab.nome);
	var eqs=window.localStorage.getItem('equipos');
	eqs=JSON.parse(eqs);
	var k=getMemo('conta');
	k=parseInt(k,10);
	eqs[k].fabricante=fab.nome;
	window.localStorage.setItem('equipos',JSON.stringify(eqs));
	nexEquipo();
}
function nexEquipo(){
	var k=getMemo('conta');
	k=parseInt(k,10);
	k++;
	putMemo('conta',k);
	iterateEquipos();
}
function finalisouFab(){
	console.log("Fabricantes colocados");
	completaEqTipo();
}
function completaEqTipo(){
	putMemo('conta',0);
	iterateEqTipos();
}
function iterateEqTipos(){
	var eqs=window.localStorage.getItem('equipos');
	eqs=JSON.parse(eqs);
	var k=getMemo('conta');
	k=parseInt(k,10);
	if (k < eqs.length){
		getTipoEq();
	} else {
		finalizouTipos();
	}
}
function getTipoEq(){
	var eq=getEqCorrente();
	var negocio='http://clevermidia.com.br/printsource/ajax/getAtributoDeClasse';
    var funcao='funcao';
    var parms='&nomeTabela=GtEquipamentos&id='+eq.id+'&atributo=gtTipoEquipamento';
    putMemo('retornoAx', 'retornoGotTipo');
    chamaJSon(negocio,funcao,parms);
}
function retornoGotTipo(dados){
	var tipo=dados.registros[0];
	console.log("Tipo: "+tipo.nome);
	var eqs=window.localStorage.getItem('equipos');
	eqs=JSON.parse(eqs);
	var k=getMemo('conta');
	k=parseInt(k,10);
	eqs[k].tipo=tipo.nome;
	window.localStorage.setItem('equipos',JSON.stringify(eqs));
	nexEqTipo();
}
function nexEqTipo(){
	var k=getMemo('conta');
	k=parseInt(k,10);
	k++;
	putMemo('conta',k);
	iterateEqTipos();
}
function finalizouTipos(){
	console.log("Tipos Finalizados");
	completaEqLocal();
}
function completaEqLocal(){
	putMemo('conta',0);
	iterateEqLocal();
}
function iterateEqLocal(){
	var eqs=window.localStorage.getItem('equipos');
	eqs=JSON.parse(eqs);
	var k=getMemo('conta');
	k=parseInt(k,10);
	if (k < eqs.length){
		getLocalEq();
	} else {
		finalizouLocais();
	}
}
function getLocalEq(){
	var eq=getEqCorrente();
	var negocio='http://clevermidia.com.br/printsource/ajax/getAtributoDeClasse';
    var funcao='funcao';
    var parms='&nomeTabela=GtEquipamentos&id='+eq.id+'&atributo=gtEquipamentoLocalizacao';
    putMemo('retornoAx', 'retornoGotLocal');
    chamaJSon(negocio,funcao,parms);
}
function retornoGotLocal(dados){
	var local=dados.registros[0];
	console.log("Local: "+local.departamento);
	var eqs=window.localStorage.getItem('equipos');
	eqs=JSON.parse(eqs);
	var k=getMemo('conta');
	k=parseInt(k,10);
	eqs[k].localizacao=local.departamento;
	window.localStorage.setItem('equipos',JSON.stringify(eqs));
	nexEqLocal();
}
function nexEqLocal(){
	var k=getMemo('conta');
	k=parseInt(k,10);
	k++;
	putMemo('conta',k);
	iterateEqLocal();
}
function finalizouLocais(){
	console.log("Locais finalizados");
}
function abreFrameEqs(){
	document.getElementById('ifraEqs').style.display='block';
	document.getElementById('ifraEqs').src='OS4.html';
}

function trazEquipos(){
	var eqs=window.localStorage.getItem('equipos');
	eqs=JSON.parse(eqs);
	var descricao=eqs[0].descricao;
	document.getElementById('spEqDesc').innerHTML=descricao;
	var descricao2=eqs[1].descricao;
	document.getElementById('spEqDesc1').innerHTML=descricao2;
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
