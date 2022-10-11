//             *************************  GAMA
function getAdmin() {
    $.ajax({
        url: 'http://localhost:8080/api/Admin/all',
        type : 'GET',
        dataType : 'json',
        success : function(resultado) {
            pintarAdmin(resultado);
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

function pintarAdmin(items){
    let myTable ="<table class=\"table text-center table-striped\">";
    myTable += "<tr><th>ID</th><th>PASSWORD</th><th>NAME</th><th>EMAIL</th></tr>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].idAdmin+"</td>";
        myTable+="<td>"+items[i].password+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].email+"</td>";
        myTable+="<td> <button class=\"btn btn-success\" onclick='borrarGama("+items[i].idAdmin+")'>Borrar</button>";
        myTable+="<td> <button class=\"btn btn-success\" onclick='getDetailGama("+items[i].idAdmin+")'>Actualizar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoAdmin").empty();
    $("#resultadoAdmin").append(myTable);
}

function getAdminInfo(){
    let idAdmin=$("#idAdmin").val();
    let password=$("#password").val();
    let name=$("#name").val();
    let email=$("#email").val();

    let admin={
        idAdmin:idAdmin,
        password:password,
        name:name,
        email:email,
    };

    return admin;
}
function cleanInputsA(){
    $("#idAdmin").val("");
    $("#password").val("");
    $("#name").val("");
    $("#email").val("");
}

function inputsAdmin(admin){
    $("#idAmin").val(parseInt(cs[i].idAdmin));
    $("#password").val(admin[0].password);
    $("#name").val(admin[0].name);
    $("#email").val(admin[0].email);
}

function guardarAdmin(){
    let data=getAdminInfo();
    let dataToSend=JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);
    $.ajax({
        url:'http://localhost:8080/api/Admin/save',
        type : 'POST',
        contentType : 'application/json',
        data:dataToSend,
        success : function(respuesta) {
            cleanInputsA();
            getAdmin();
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        }
    });

}

function editarAdmin(){
    let data=getAdminInfo();
    let dataToSend=JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);

    $.ajax({
        url:'http://localhost:8080/api/Admin/update',
        type : 'PUT',
        contentType : 'application/json',
        data:dataToSend,
        success : function(respuesta) {
            cleanInputsG();
            getGama();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

function getDetailAdmin(idAdmin){
    console.log(idAdmin);

    $.ajax({
        url : 'http://localhost:8080/api/Admin/'+idGama,
        type : 'GET',
        dataType : 'json',
        contentType : 'application/json',
        success : function(respuesta) {
            inputsAdmin(respuesta)
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

function borrarGama(idAdmin){
    let data={id:idAdmin};
    let dataToSend=JSON.stringify(data);
    $.ajax({
        url:'http://localhost:8080/api/Admin/'+idAdmin,
        type : 'DELETE',
        contentType : 'application/json',
        data:dataToSend,
        success : function(respuesta) {
            cleanInputsA();
            getAdmin();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}
