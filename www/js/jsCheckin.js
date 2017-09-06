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
}