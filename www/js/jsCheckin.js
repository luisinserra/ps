function getCoordenadas(){
    navigator.geolocation.getCurrentPosition(onSuccesso, onErro);
}
function onErro(erro){
    var msg="Erro ["+erro.code+"] "+erro.message;
    alert(msg);
}
function onSuccesso(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var msg="Coordenadas: "+latitude+" x "+longitude;
    alert(msg);
    var codUser=localStorage.getItem("codUser");
    enviaCoordenadas(codUser,latitude,longitude);
}
function enviaCoordenadas(codUser,latitude,longitude){
    var negocio='http://clevermidia.com.br/printsource/ws/postCoordenadas';
    var funcao='';
    var parms="&idUsuario="+codUser+"&longitude="+longitude+"&latitude="+latitude;
    putMemo('retornoAx', 'retornoEnviaCoordenadas');
    chamaJSon(negocio,funcao,parms);
}
function retornoEnviaCoordenadas(dados){
    var erro=dados.erro;
    if (erro != ''){
        alert("Erro: "+erro);
    } else {
        alert("Checkin efetuado com sucesso");
    }
}