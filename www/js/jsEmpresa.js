function carregaEmpresa(){
	var codigo=window.localStorage.getItem('idEmpresa');
	var negocio='http://clevermidia.com.br/printsource/ajax/getRegistroWS.jsonx';
    var funcao='';
    var parms="&login="+window.localStorage.getItem('userLogin');
    parms+="&senha="+window.localStorage.getItem('senha');
    parms+="&nosuf=S&valor="+codigo+'&nomeClasse=GtEmpresas&campo=id&tipoCampo=String';
    putMemo('retornoAx', 'retornoCarregaEmpresa');
    chamaJSon(negocio,funcao,parms);
}
function retornoCarregaEmpresa(dados){
	empresa=getJson(dados);
	if (empresa.email == 'null'){empresa.email='';}
	if (empresa.website == 'null'){empresa.website='';}
	if (empresa.contatoEmpresa == 'null'){empresa.contatoEmpresa='';}
	if (empresa.cargoContato == 'null'){empresa.cargoContato='';}
	if (empresa.deptoContato == 'null'){empresa.deptoContato='';}
	if (empresa.emailContato == 'null'){empresa.emailContato='';}
	if (empresa.pabx == 'null'){empresa.pabx='';}
	if (empresa.obs == 'null'){empresa.obs='';}

    document.getElementById('eRazao').innerHTML=empresa.razaoSocial;
    document.getElementById('tFanta').innerHTML=empresa.fantasia;
    document.getElementById('tEmail').innerHTML=empresa.email;
    document.getElementById('tSite').innerHTML=empresa.website;
    document.getElementById('tContato').innerHTML=empresa.contatoEmpresa;
    document.getElementById('tCargo').innerHTML=empresa.cargoContato;
    document.getElementById('tDepto').innerHTML=empresa.deptoContato;
    document.getElementById('tMC').innerHTML=empresa.emailContato;
    document.getElementById('tPabx').innerHTML=empresa.pabx;
    document.getElementById('tObs').innerHTML=empresa.obs;
}