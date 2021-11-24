var UrlGetfacturas = 'http://34.68.196.220:90/G6_19/Facturas/Controller/ma_facturas.php?op=GetFacturas';
var UrlPostfacturas ='http://34.68.196.220:90/G6_19/Facturas/Controller/ma_facturas.php?op=InsertFactura';
var UrlPostIDfacturas ='http://34.68.196.220:90/G6_19/Facturas/Controller/ma_facturas.php?op=GetFactura';
var UrlPutfacturas ='http://34.68.196.220:90/G6_19/Facturas/Controller/ma_facturas.php?op=UpdateFactura';
var UrlDeletefactura ='http://34.68.196.220:90/G6_19/Facturas/Controller/ma_facturas.php?op=EliminarFactura';
$(document).ready(function() {
    CargarFacturas();
});

function CargarFacturas() {
    $.ajax({
       url: UrlGetfacturas,
        type: 'GET',
        datatype: 'JSON',
        success: function(response) {
            var MiItems = response;
            var Valores = '';

            for(i=0;i< MiItems.length; i++){
                Valores +='<tr>'+
               ' <td>'+MiItems[i].ID+'</td>'+
                '<td>'+MiItems[i].NUMERO_FACTURA+'</td>'+
                '<td>'+MiItems[i].ID_SOCIO+'</td>'+
                '<td>'+MiItems[i].FECHA_FACTURA+'</td>'+
                '<td>'+MiItems[i].DETALLE+'</td>'+
                '<td>'+MiItems[i].SUB_TOTAL+'</td>'+
                '<td>'+MiItems[i].TOTAL_ISV+'</td>'+
                '<td>'+MiItems[i].TOTAL+'</td>'+
                '<td>'+MiItems[i].FECHA_VENCIMIENTO+'</td>'+
                '<td>'+MiItems[i].ESTADO+'</td>'+
                '<td>' +
                '<button class="btn btn-warning" onclick="CargarID('+ MiItems[i].ID + ')">Editar</button>' +
                '<button class="btn btn-danger" onclick="EliminarFactura('+ MiItems[i].ID + ')">Eliminar</button>' +
                '</td>' +
                '</tr>';
            $('.Facturas').html(Valores);

            }
        }
    });
}

function AgregarFactura(){
    var datosfacturas= {
        ID: $('#ID').val(), 
        NUMERO_FACTURA: $('#numerofactura').val(),
        ID_SOCIO:$("#Idsocio").val(),
        FECHA_FACTURA: $('#FechaFactura').val(),
        DETALLE: $('#Detalle').val(),
        SUB_TOTAL: $('#Subtotal').val(),
        TOTAL_ISV: $('#Totalisv').val(),
        TOTAL: $('#Total').val(),
        FECHA_VENCIMIENTO: $('#FechaVencimiento').val(),
        ESTADO: $('#estado').val()
    };

    var datosfacturasjson = JSON.stringify(datosfacturas);

    $.ajax({
         url: UrlPostfacturas,
         type: 'POST',
         data: datosfacturasjson,
         datatype: 'JSON',
         contentType:'application/json',
        success: function(response) {
            console.log(response);
        }
    });
    alert("Factura Agregado")
}

function CargarID(Idfacturas){
    var datosIdfacturas={
        id:Idfacturas
    };
     var datosIdfacturasjson = JSON.stringify(datosIdfacturas);
    
    $.ajax({
        url: UrlPostIDfacturas,
        type: 'POST',
        data: datosIdfacturasjson,
        datatype: 'JSON',
        contentType:'application/json',
       success: function(response) {
        var MiItems = response;
            $('#ID').val(MiItems[0].ID);
            $('#numerofactura').val(MiItems[0].NUMERO_FACTURA);
            $('#Idsocio').val(MiItems[0].ID_SOCIO);
            $('#FechaFactura').val(MiItems[0].FECHA_FACTURA);
            $('#Detalle').val(MiItems[0].DETALLE);
            $('#Subtotal').val(MiItems[0].SUB_TOTAL);
            $('#Totalisv').val(MiItems[0].TOTAL_ISV);
            $('#Total').val(MiItems[0].TOTAL);
            $('#FechaVencimiento').val(MiItems[0].FECHA_VENCIMIENTO);
            $('#estado').val(MiItems[0].ESTADO);
            var btnactualizar = '<input type="submit" id="btnActalizar" onclick="ActualizarFacturas('+ MiItems[0].ID +' )" value="Actualizar Factura" class="btn btn-primary">'
            $('.button').html(btnactualizar);
       }
   });
}



function ActualizarFacturas(Idfacturas){
    var datosfacturas = {
        ID:Idfacturas,
        NUMERO_FACTURA:$('#numerofactura').val(),
        ID_SOCIO:$('#Idsocio').val(),
        FECHA_FACTURA:$('#FechaFactura').val(),
        DETALLE:$('#Detalle').val(),
        SUB_TOTAL:$('#Subtotal').val(),
        TOTAL_ISV:$('#Totalisv').val(),
        TOTAL:$('#Total').val(),
        FECHA_VENCIMIENTO:$('#FechaVencimiento').val(),
        ESTADO:$('#estado').val()
    };
    var datosfacturasjson = JSON.stringify(datosfacturas);

    $.ajax({
         url: UrlPutfacturas,
         type: 'PUT',
         data: datosfacturasjson,
         datatype: 'JSON',
         contentType:'application/json',
        success: function(response) {
            console.log(response);
        }
    });
    alert("Factura Actualizado");
}

function EliminarFactura(Idfacturas) {
    var datosfacturas = {
        ID:Idfacturas,
        NUMERO_FACTURA: $('#numerofactura').val(),
        ID_SOCIO: $("#Idsocio").val(),
        FECHA_Factura: $('#FechaFactura').val(),
        DETALLE: $('#Detalle').val(),
        SUB_TOTAL: $('#Subtotal').val(),
        TOTAL_ISV: $('#Totalisv').val(),
        TOTAL: $('#Total').val(),
        FECHA_VENCIMIENTO: $('#FechaVencimiento').val(),
        ESTADO: $('#estado').val()
    };
    var datosfacturasjson = JSON.stringify(datosfacturas);

    $.ajax({
        url: UrlDeletefactura,
        type: 'DELETE',
        data: datosfacturasjson,
        datatype: 'JSON',
        contentType:'application/json',
        success: function(response) {
            console.log(response);
        }
    });
    alert("Factura Eliminado");
}



