
function traerReporte(){
    let fechaInicio = document.getElementById("startDate").value;
    let fechaFin= document.getElementById("devolutionDate").value;
    $.ajax({
        url:'http://localhost:8080/api/Reservation/report-dates/'+fechaInicio+fechaFin,
        type : 'GET',
        dataType : 'json',
        success : function(resultado) {
            pintarReportes(resultado);
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });

}

function pintarReportes(items){
    let myTable ="<table class=\"table text-center table-striped\">";
    myTable += "<tr><th>TOTAL</th><th>"+items.length+"</th></tr>";
    myTable += "<tr><th>ID</th><th>START DATE</th><th>FINISH DATE</th></tr>";
    for(i=0;i<items.length;i++){
        start = items[i].startDate;
        fin = items[i].finishDate;
        myTable+="<tr>";
        myTable+="<td>"+items[i].idReservation+"</td>";
        myTable+="<td>"+start.slice(0,10)+"</td>";
        myTable+="<td>"+fin.slice(0,10)+"</td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#reporteF").empty()
    $("#reporteF").append(myTable);
}


function traerReservas(){
    $.ajax({
        url:'http://localhost:8080/api/Reservation/report-dates_total/',
        type : 'GET',
        dataType : 'json',
        success : function(resultado) {
            pintarReservas(resultado);
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });

}

function pintarReservas(items){
    myTable += "<tr><th>COMPLETED</th><th>CANCELLED</th></tr>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].completed+"</td>";
        myTable+="<td>"+items[i].cancelled+"</td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#completedVsCancelled").empty()
    $("#completedVsCancelled").append(myTable);
}


function topClients(){
    $.ajax({
        url:'http://localhost:8080/api/Reservation/report-clients/',
        type : 'GET',
        dataType : 'json',
        success : function(resultado) {
            pintarTopClients(resultado);
        },
        error : function(xhr, status) {
            alert('ha ocurrido un problema');
        }
    });

}

function pintarTopClients(items){
    myTable += "<tr><th>IDCLIENT</th><th>NAME</th><th>RESERVAS</th></tr>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].idClient+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#completedVsCancelled").empty()
    $("#completedVsCancelled").append(myTable);
}
