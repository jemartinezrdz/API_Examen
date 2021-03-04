//++++++INSERT+++++//
// fetch('http://201.132.203.2/RegistrarRecibo',{
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({"proveedor": 'TEST IIS', "monto": 2580, "moneda": 'MxN' , "comentario": 'PRUEBA DESDE IIS'}),
//         cache: 'no-cache'
//     })
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data) {
//         console.log('data = ', data);
//     })
//     .catch(function(err) {
//         console.error(err);
//     });
//++++++UPDATE+++++//
// fetch('http://201.132.203.2/ActualizarRecibo',{
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({"proveedor": 'TEST IIS MODIFY', "monto": 2580, "moneda": 'MxN' , "comentario": 'PRUEBA DESDE IIS MODIFY', "idRecibo":15}),
//         cache: 'no-cache'
//     })
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data) {
//         console.log('data = ', data);
//     })
//     .catch(function(err) {
//         console.error(err);
//     });
//++++++DELETE+++++//
fetch('http://201.132.203.2/BorrarRecibo',{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"idRecibo":15}),
        cache: 'no-cache'
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log('data = ', data);
    })
    .catch(function(err) {
        console.error(err);
    });
