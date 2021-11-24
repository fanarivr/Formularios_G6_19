var UrlGetpedidos = 'http://34.68.196.220:90/G6_19/Pedidos/Controller/ma_pedidos.php?op=Getpedidos';
var UrlPostpedidos ='http://34.68.196.220:90/G6_19/Pedidos/Controller/ma_pedidos.php?op=InsertPedidos';
var UrlPostIDpedidos ='http://34.68.196.220:90/G6_19/Pedidos/Controller/ma_pedidos.php?op=GetPedido';
var UrlPutpedidos ='http://34.68.196.220:90/G6_19/Pedidos/Controller/ma_pedidos.php?op=UpdatePedidos';
var UrlDeletePedido ='http://34.68.196.220:90/G6_19/Pedidos/Controller/ma_pedidos.php?op=EliminarPedidos';
$(document).ready(function() {
    CargarPedidos();
    
});

function CargarPedidos() {
    $.ajax({
       url: UrlGetpedidos,
        type: 'GET',
        datatype: 'JSON',
        success: function(response) {
            var MiItems = response;
            var Valores = '';

            for (i = 0; i < MiItems.length; i++) {
                Valores += '<tr>' +
                    '<td>' + MiItems[i].ID + '</td>' +
                    '<td>' + MiItems[i].ID_SOCIO + '</td>' +
                    '<td>' + MiItems[i].FECHA_PEDIDO + '</td>' +
                    '<td>' + MiItems[i].DETALLE + '</td>' +
                    '<td>' + MiItems[i].SUB_TOTAL + '</td>' +
                    '<td>' + MiItems[i].TOTAL_ISV + '</td>' +
                    '<td>' + MiItems[i].TOTAL + '</td>' +
                    '<td>' + MiItems[i].FECHA_ENTREGA + '</td>' +
                    '<td>' + MiItems[i].ESTADO + '</td>' +
                    '<td>' +
                    '<button class=" btn btn-outline-warning" onclick="CargarID('+ MiItems[i].ID + ')">Editar</button>' +
                    '<button class="btn btn-outline-danger" onclick="DeletePedidos('+ MiItems[i].ID + ')">Eliminar</button>' +
                    '</td>' +
                    '</tr>';
                $('.pedidos').html(Valores);

            }
        }
    });
}

function AgregarPedido(){
    var datospedidos = {
        ID: $('#ID').val(), 
        ID_SOCIO: $('#idsocio').val(),
        FECHA_PEDIDO: $('#fechapedido').val(),
        DETALLE: $('#detalle').val(),
       SUB_TOTAL: $('#subtotal').val(),
        TOTAL_ISV: $('#Totalisv').val(),
        TOTAL: $('#total').val(),
        FECHA_ENTREGA: $('#Fechaentrega').val(),
        ESTADO: $('#estado').val()
    };

    var datospedidosjson = JSON.stringify(datospedidos);

    $.ajax({
         url: UrlPostpedidos,
         type: 'POST',
         data: datospedidosjson,
         datatype: 'JSON',
         contentType:'application/json',
        success: function(response) {
            console.log(response);
        }
    });
    alert("Pedido Agregado")
}

function CargarID(Idpedidos){
    var datosIdpedidos={
        id:Idpedidos
    };
     var datosIdpedidosjson = JSON.stringify(datosIdpedidos);
    
    $.ajax({
        url: UrlPostIDpedidos,
        type: 'POST',
        data: datosIdpedidosjson,
        datatype: 'JSON',
        contentType:'application/json',
       success: function(response) {
        var MiItems = response;
        $('#ID').val(MiItems[0].ID);
        $('#idsocio').val(MiItems[0].ID_SOCIO);
        $('#fechapedido').val(MiItems[0].FECHA_PEDIDO);
        $('#detalle').val(MiItems[0].DETALLE);
        $('#subtotal').val(MiItems[0].SUB_TOTAL);
        $('#Totalisv').val(MiItems[0].TOTAL_ISV);
        $('#total').val(MiItems[0].TOTAL);
        $('#Fechaentrega').val(MiItems[0].FECHA_ENTREGA);
        $('#estado').val(MiItems[0].ESTADO);
        var btnactualizar = '<input type="submit" id="btnActalizar" onclick="ActualizarPedidos('+ MiItems[0].ID +' )" value="Actualizar Pedido" class="btn btn-primary">'
        $('.button').html(btnactualizar);
       }
   });
}

function ActualizarPedidos(Idpedidos){
    var datospedidos = {
        id:Idpedidos,
        ID: $('#ID').val(), 
        ID_SOCIO: $('#idsocio').val(),
        FECHA_PEDIDO: $('#fechapedido').val(),
        DETALLE: $('#detalle').val(),
       SUB_TOTAL: $('#subtotal').val(),
        TOTAL_ISV: $('#Totalisv').val(),
        TOTAL: $('#total').val(),
        FECHA_ENTREGA: $('#Fechaentrega').val(),
        ESTADO: $('#estado').val()
    };

    var datospedidosjson = JSON.stringify(datospedidos);

    $.ajax({
         url: UrlPutpedidos,
         type: 'PUT',
         data: datospedidosjson,
         datatype: 'JSON',
         contentType:'application/json',
        success: function(response) {
            console.log(response);
        }
    });
    alert("Pedido Actualizado")
}

function DeletePedidos(Idpedidos) {
    var datospedidos = {
        ID:Idpedidos,
        ID_SOCIO: $('#idsocio').val(),
        FECHA_PEDIDO: $('#fechapedido').val(),
        DETALLE: $('#detalle').val(),
       SUB_TOTAL: $('#subtotal').val(),
        TOTAL_ISV: $('#Totalisv').val(),
        TOTAL: $('#total').val(),
        FECHA_ENTREGA: $('#Fechaentrega').val(),
        ESTADO: $('#estado').val()
    };
    var datospedidosjson = JSON.stringify(datospedidos);

    $.ajax({
        url: UrlDeletePedido,
        type: 'DELETE',
        data: datospedidosjson,
        datatype: 'JSON',
        contentType:'application/json',
        success: function(response) {
            console.log(response);
        }
    });
    alert("Pedido Eliminado");
}