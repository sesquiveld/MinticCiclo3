//             *************************  GAMA
function getGama() {
    $.ajax({
        url: 'http://localhost:8080/api/Gama/all',
        type : 'GET',
        dataType : 'json',
        success : function(gamas) {
            pintarGama(gamas);
        /*    let cs=gamas;
            $("#resultadoGama").empty();
            for(let i=0;i<cs.length;i++){
                let k=cs[i].idGama+" "+cs[i].name+" "+cs[i].description+" <button onclick='borrarGama("+cs[i].idGama+")'>borrar</button>";
                k+=" <button onclick='getDetailGama("+cs[i].idGama+")'>actualizar</button><br>"
                $("#resultadoGama").append(k);
            }*/

        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

function pintarGama(items){
    let myTable ="<table class=\"table text-center table-striped\">";
    myTable += "<tr><th>ID</th><th>NAME</th><th>DESCRIPTION</th><th>BORRAR</th><th>ACTUALIZAR</th></tr>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].idGama+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].description+"</td>";
        myTable+="<td> <button class=\"btn btn-success\" onclick='borrarGama("+items[i].idGama+")'>Borrar</button>";
        myTable+="<td> <button class=\"btn btn-success\" onclick='getDetailGama("+items[i].idGama+")'>Actualizar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoGama").empty()
    $("#resultadoGama").append(myTable);
}

function getGamaInfo(){
    let idGama=$("#idGama").val();
    let name=$("#nameGama").val();
    let description=$("#descriptionG").val();

    let gamas={
        idGama:idGama,
        name:name,
        description:description,
    };

    return gamas;
}
function cleanInputsG(){
    $("#idGama").val("");
    $("#nameGama").val("");
    $("#descriptionG").val("");
}

function inputsG(gama){
    $("#idGama").val(parseInt(cs[i].idGama));
    $("#nameGama").val(gama[0].name);
    $("#descriptionG").val(gama[0].description);
}

function guardarGama(){
    let data=getGamaInfo();
    let dataToSend=JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);
    $.ajax({
        url:'http://localhost:8080/api/Gama/save',
        type : 'POST',
        contentType : 'application/json',
        data:dataToSend,
        success : function(gamas) {
            cleanInputsG();
            getGama();
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        }
    });

}

function editarGama(){
    let data=getGamaInfo();
    let dataToSend=JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);

    $.ajax({
        url:'http://localhost:8080/api/Gama/update',
        type : 'PUT',
        contentType : 'application/json',
        data:dataToSend,
        success : function(gamas) {
            cleanInputsG();
            getGama();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

function getDetailGama(idGama){
    console.log(idGama);

    $.ajax({
        url : 'http://localhost:8080/api/Gama/'+idGama,
        type : 'GET',
        dataType : 'json',
        contentType : 'application/json',
        success : function(gama) {
            inputsG(gama)
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

function borrarGama(idGama){
    let data={id:idGama};
    let dataToSend=JSON.stringify(data);
    $.ajax({
        url:'http://localhost:8080/api/Gama/'+idGama,
        type : 'DELETE',
        contentType : 'application/json',
        data:dataToSend,
        success : function(gamas) {
            cleanInputsG();
            getGama();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

//   *******************************************CAR

function getCars(){
    $.ajax({
        url:'http://localhost:8080/api/Car/all',
        type : 'GET',
        dataType : 'json',
        success : function(resultado) {
            pintarCar(resultado);
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });

}

function pintarCar(items){
    let myTable ="<table class=\"table text-center table-striped\">";
    myTable += "<tr><th>ID</th><th>NAME</th><th>BRAND</th><th>YEAR</th><th>DESCRIPTION</th><th>GAMA</th><th>BORRAR</th><th>ACTUALIZAR</th></tr>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].idCar+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].brand+"</td>";
        myTable+="<td>"+items[i].year+"</td>";
        myTable+="<td>"+items[i].description+"</td>";
        myTable+="<td>"+items[i].gama.name+"</td>";
        myTable+="<td> <button class=\"btn btn-success\" onclick='deleteCar("+items[i].idGama+")'>Borrar</button>";
        myTable+="<td> <button class=\"btn btn-success\" onclick='getDetailCar("+items[i].idGama+")'>Actualizar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").empty()
    $("#resultado").append(myTable);
}

function getCarInfo(){
    let idCar=$("#id").val();
    let name=$("#name").val();
    let brand=$("#brand").val();
    let year=$("#year").val();
    let description=$("#description").val();
    let idGama=$("#idGamaC").val();

    let car={
        idCar:idCar,
        name:name,
        brand:brand,
        year:year,
        description:description,
        "gama":{"idGama":idGama}
    };

    return car;
}
function cleanInputsC(){
    $("#id").val("");
    $("#name").val("");
    $("#brand").val("");
    $("#year").val("");
    $("#description").val("");
    $("#idGamaC").val("");
}

function saveCar(){
    let data=getCarInfo();
    let dataToSend=JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);
    $.ajax({
        url:'http://localhost:8080/api/Car/save',
        type : 'POST',
        contentType : 'application/json',
        data:dataToSend,
        success : function(resultado) {
            cleanInputsC();
            getCars();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}


function updateCar(){
    let data=getCarInfo();
    let dataToSend=JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);

    $.ajax({
        url:'http://localhost:8080/api/Car/update',
        type : 'PUT',
        contentType : 'application/json',
        data:dataToSend,
        success : function(cars) {
            cleanInputsC();
            getCars();
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        }
    });

}

function getDetailCar(idCar){

    $.ajax({
        url : 'http://localhost:8080/api/Car/'+idCar,
        type : 'GET',
        dataType : 'json',
        success : function(resultado) {
            let cs=resultado;

            $("#id").val(cs[0].idCar);
            $("#brand").val(cs[0].brand);
            $("#year").val(cs[0].year);
            $("#description").val(cs[0].description);
            $("#idGamaC").val(cs[0].idGama);

        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

function deleteCar(idCar){
    let data={id:idCar};
    let dataToSend=JSON.stringify(data);
    $.ajax({
        url:'http://localhost:8080/api/Car/'+idCar,
        type : 'DELETE',
        contentType : 'application/json',
        data:dataToSend,
        success : function(resultado) {
            cleanInputsC();
            getCars();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

// *************************************************************************
//          ************************************CLIENT
function infoClient(){
    $.ajax({
        url:'http://localhost:8080/api/Client/all',
        type:"GET",
        datatype:"JSON",
        success : function(clients) {
            pintarClient(clients)
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        }
    });

}

function pintarClient(items){
    let myTable ="<table class=\"table text-center table-striped\">";
    myTable += "<tr><th>ID</th><th>EMAIL</th><th>PASSWORD</th><th>NAME</th><th>AGE</th><th>BORRAR</th><th>ACTUALIZAR</th></tr>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].idClient+"</td>";
        myTable+="<td>"+items[i].email+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].age+"</td>";
        myTable+="<td> <button class=\"btn btn-success\" onclick='borrarClient("+items[i].idGama+")'>Borrar</button>";
        myTable+="<td> <button class=\"btn btn-success\" onclick='getDetailClient("+items[i].idGama+")'>Actualizar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#clients").empty()
    $("#clients").append(myTable);
}
function getClientInfo(){
    let id=$("#idClient").val();
    let email=$("#emailClient").val();
    let password=$("#password").val();
    let name=$("#nameClient").val();
    let age=$("#ageClient").val();

    let client={
        idClient:id,
        email:email,
        password:password,
        name:name,
        age:age
    };

    return client;
}
function cleanInputs(){
    $("#idClient").val("");
    $("#emailClient").val("");
    $("#password").val("");
    $("#nameClient").val("");
    $("#ageClient").val("");
}

function guardarClient(){
    let data=getClientInfo();
    let dataToSend=JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);

    $.ajax({
        url : 'http://localhost:8080/api/Client/save',
        type : 'POST',
        contentType : 'application/json',
        data:dataToSend,
        success : function(clients) {
            cleanInputs();
            infoClient();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}


function editarClient(){
    let data=getClientInfo();
    let dataToSend=JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);

    $.ajax({
        url : 'http://localhost:8080/api/Client/update',
        type : 'PUT',
        contentType : 'application/json',
        data:dataToSend,
        success : function(clients) {
            cleanInputs();
            infoClient();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

function getDetailClient(idClient){

    $.ajax({
        url : 'http://localhost:8080/api/Client/'+idClient,
        type : 'GET',
        dataType : 'json',
        success : function(Client) {
            let cs=Client;

            $("#idClient").val(cs[0].idClient);
            $("#emailClient").val(cs[0].email);
            $("#password").val(cs[0].password);
            $("#nameClient").val(cs[0].name);
            $("#ageClient").val(cs[0].age);

        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

function borrarClient(idClient){
    let myDataM = {
        id: idClient
    };
    let dataToSend = JSON.stringify(myDataM);
   // let data={idClient:idClient};
   // let dataToSend=JSON.stringify(data);
    $.ajax({
        url : 'http://localhost:8080/api/Client/'+idClient,
        type : 'DELETE',
        contentType : 'application/json',
        data:dataToSend,
        success : function(clients) {
            cleanInputs();
            infoClient()();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

// ********************************************MESSAGE

function infoMsg(){
    $.ajax({
        url:'http://localhost:8080/api/Message/all',
        type : 'GET',
        dataType : 'json',
        success : function(message) {
           pintarMsg(message)
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}

function pintarMsg(items){
    let myTable ="<table class=\"table text-center table-striped\">";
    myTable += "<tr><th>ID</th><th>MESSAGE</th><th>CLIENTE</th><th>CAR</th><th>BORRAR</th><th>ACTUALIZAR</th></tr>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].idMessage+"</td>";
        myTable+="<td>"+items[i].messageText+"</td>";
        myTable+="<td>"+items[i].client.name+"</td>";
        myTable+="<td>"+items[i].car.name+"</td>";
        myTable+="<td> <button class=\"btn btn-success\" onclick='borrarMsg("+items[i].idGama+")'>Borrar</button>";
        myTable+="<td> <button class=\"btn btn-success\" onclick='getDetailMsg("+items[i].idGama+")'>Actualizar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoM").empty()
    $("#resultadoM").append(myTable);
}

function getMsgInfo(){
    let idMessage=$("#idMessage").val();
    let messageText=$("#messageText").val();
    let idClient=$("#idClientM").val();
    let idCar=$("#idCarM").val();

    let message={
        idMessage:idMessage,
        messageText:messageText,
        "client":{"idClient":idClient},
        "car":{"idCar":idCar}
    };

    return message;
}
function cleanInputsMsg(){
    $("#idMessage").val("");
    $("#messageText").val("");
    $("#idClientM").val("");
    $("#idCarM").val("");

}

function guardarMsg(){
    let data=getMsgInfo();
    let dataToSend=JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);
    $.ajax({
        url : 'http://localhost:8080/api/Message/save',
        type : 'POST',
        contentType : 'application/json',
        data:dataToSend,
        success : function(resultadoM) {
            cleanInputsMsg();
            infoMsg();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });

}


function editarMsg(){
    let data=getMsgInfo();
    let dataToSend=JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);

    $.ajax({
        url:'http://localhost:8080/api/Message/update',
        type : 'PUT',
        contentType : 'application/json',
        data:dataToSend,
        success : function(resultadoM) {
            cleanInputsMsg();
            infoMsg();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });

}

function getDetailMsg(idMessage) {

    $.ajax({
        url: 'http://localhost:8080/api/Message/'+idMessage,
        type: 'GET',
        dataType: 'json',
        success: function (Message) {
            let cs = Message;

            $("#idMessage").val(cs[0].idMessage);
            $("#messageText").val(cs[0].messageText);
            $("#idClientM").val(cs[0].idClient);
            $("#idCarM").val(cs[0].idCar);

        },
        error: function (xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}
function borrarMsg(idMessage) {
    let data={id:idMessage};
    let dataToSend=JSON.stringify(data);

    $.ajax({
        url: 'http://localhost:8080/api/Message/'+idMessage,
        type : 'DELETE',
        contentType : 'application/json',
        data:dataToSend,
        success : function(resultadoM) {
            cleanInputsMsg();
            infoMsg();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });

}
// ****************************Reservation *********************

function infoReservation(){

    $.ajax({
        url : 'http://localhost:8080/api/Message/all',
        type : 'GET',
        dataType : 'json',
        success : function(reservation) {
            pintarReservation(reservation)
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}


function pintarReservation(items){
    let myTable ="<table class=\"table text-center table-striped\">";
    myTable += "<tr><th>ID</th><th>START DATE</th><th>DEVOLUTION DATE</th><th>STATUS</th><th>CAR</th><th>CLIENT</th><th>SCORE</th><th>BORRAR</th><th>ACTUALIZAR</th></tr>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].idReservation+"</td>";
        myTable+="<td>"+items[i].startDate+"</td>";
        myTable+="<td>"+items[i].devolutionDate+"</td>";
        myTable+="<td>"+items[i].status+"</td>";
        myTable+="<td>"+items[i].car.name+"</td>";
        myTable+="<td>"+items[i].client.name+"</td>";
        //myTable+="<td>"+items[i].score+"</td>";
        myTable+="<td> <button class=\"btn btn-success\" onclick='borrarReservation("+items[i].idGama+")'>Borrar</button>";
        myTable+="<td> <button class=\"btn btn-success\" onclick='getDetailReservation("+items[i].idGama+")'>Actualizar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoR").empty()
    $("#resultadoR").append(myTable);
}
function getReservationInfo(){
    let idReservation=$("#idReservation").val();
    let startDate=$("#startDate").val();
    let devolutionDate=$("#devolutionDate").val();
    let status=$("#status").val();
    let idClient=$("#idClientR").val();
    let idCar=$("#idCarR").val();

    let reservation={
        idReservation:idReservation,
        startDate:startDate,
        devolutionDate:devolutionDate,
        status:status,
        client:{"idClient":idClient},
        car:{"idCar":idCar}

    };
    return reservation;
}

function cleanInputsR(){
    $("#idReservation").val("");
    $("#startDate").val("");
    $("#devolutionDate").val("");
    $("#status").val("");
    $("#idClientR").val("");
    $("#idCarR").val("");
}

function guardarReservation(){

    let data=getReservationInfo();
    let dataToSend=JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);

    $.ajax({
        url : 'http://localhost:8080/api/Reservation/save',
        type : 'POST',
        contentType : 'application/json',
        data:dataToSend,
        success : function(response) {
            cleanInputsR();
            infoReservation();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });

}

function borrarReservation(idReservation){

    let data={id:idReservation};
    let dataToSend=JSON.stringify(data);
    $.ajax({
        url : 'http://localhost:8080/api/Gama/'+idReservation,
        type : 'DELETE',
        contentType : 'application/json',
        data:dataToSend,
        success : function(resultadoR) {
            cleanInputsR();
            infoReservation();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

function editarReservation(){

    let data=getReservationInfo();
    let dataToSend=JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);

    $.ajax({
        url : 'http://localhost:8080/api/Reservation/update',
        type : 'PUT',
        contentType : 'application/json',
        data:dataToSend,
        success : function(resultadoR) {
            cleanInputsR();
            infoReservation();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });

}
function getDetailReservation(idReservation){

    $.ajax({
        url : 'http://localhost:8080/api/Reservation'+"/"+idReservation,
        type : 'GET',
        dataType : 'json',
        success : function(postReservation) {
            let cs=postReservation;

            $("#idReservation").val(cs[0].idReservation);
            $("#startDate").val(cs[0].startDate);
            $("#devolutionDate").val(cs[0].devolutionDate);
            $("#status").val(cs[0].status);
            $("#idClientR").val(cs[0].idClient);
            $("#idCarR").val(cs[0].idCar);

        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

//***********************************************************************************************
// ****************************************   SCORE

function getScores(){
    $.ajax({
        url:'http://localhost:8080/api/Score/all',
        type : 'GET',
        dataType : 'json',
        success : function(resultado) {
            pintarScore(resultado);
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });

}

function pintarScore(items){
    let myTable ="<table class=\"table text-center table-striped\">";
    myTable += "<tr><th>ID</th><th>STARS</th><th>MESSAGE</th><th>RESERVATION</th><th>BORRAR</th><th>ACTUALIZAR</th></tr>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].idScore+"</td>";
        myTable+="<td>"+items[i].star+"</td>";
        myTable+="<td>"+items[i].message+"</td>";
        myTable+="<td>"+items[i].idReservation+"</td>";
      //  myTable+="<td> <button class=\"btn btn-success\" onclick='deleteScore("+items[i].idScore+")'>Borrar</button>";
      //  myTable+="<td> <button class=\"btn btn-success\" onclick='getDetailScore("+items[i].idScore+")'>Actualizar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoS").empty()
    $("#resultadoS").append(myTable);
}

function getScoreInfo(){
    let idScore=$("#idScoreS").val();
    let star=$("#stars").val();
    let message=$("#messageS").val();
    let idReservation=$("#idReservationS").val();

    let score={
        idScore:idScore,
        star:star,
        message:message,
        "reservation":{"idReservation":idReservation}
    };

    return score;
}
function cleanInputsS(){
    $("#idScoreS").val("");
    $("#stars").val("");
    $("#messageS").val("");
    $("#idReservationS").val("");
}

function saveScore(){
    let data=getScoreInfo();
    let dataToSend=JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);
    $.ajax({
        url:'http://localhost:8080/api/Score/save',
        type : 'POST',
        contentType : 'application/json',
        data:dataToSend,
        success : function(resultado) {
            cleanInputsS();
            getScores();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}


function updateScore(){
    let data=getScoreInfo();
    let dataToSend=JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);

    $.ajax({
        url:'http://localhost:8080/api/Score/update',
        type : 'PUT',
        contentType : 'application/json',
        data:dataToSend,
        success : function(score) {
            cleanInputsS();
            getScores();
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        }
    });

}

function getDetailScore(idScore){

    $.ajax({
        url : 'http://localhost:8080/api/Score/'+idScore,
        type : 'GET',
        dataType : 'json',
        success : function(resultado) {
            let cs=resultado;

            $("#id").val(cs[0].idScore);
            $("#brand").val(cs[0].star);
            $("#year").val(cs[0].message);
            $("#description").val(cs[0].idReservation);

        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}

function deleteScore(idScore){
    let data={id:idScore};
    let dataToSend=JSON.stringify(data);
    $.ajax({
        url:'http://localhost:8080/api/Score/'+idScore,
        type : 'DELETE',
        contentType : 'application/json',
        data:dataToSend,
        success : function(resultado) {
            cleanInputsS();
            getScores();
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });
}
