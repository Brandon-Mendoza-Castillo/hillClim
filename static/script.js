function llenarCampos() {
    let select = document.getElementById("ciudadSelect");
    let valor = select.value;

    if (valor) {
        let [latitud, longitud] = valor.split(",");
        document.getElementById("latitud").value = latitud;
        document.getElementById("longitud").value = longitud;
    } else {
        document.getElementById("latitud").value = "";
        document.getElementById("longitud").value = "";
    }
}

function enviarDatos() {
    const ciudad = document.getElementById("ciudadSelect").selectedOptions[0].text;
    const latitud = document.getElementById("latitud").value;
    const longitud = document.getElementById("longitud").value;

    if (!ciudad || !latitud || !longitud) {
        alert("Selecciona una ciudad primero.");
        return;
    }

    const payload = {
        coord: {
            [ciudad]: [parseFloat(latitud), parseFloat(longitud)]
        }
    };

    fetch('/tsp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("respuesta").innerHTML = `
            <h3>Respuesta de la API:</h3>
            <pre>${JSON.stringify(data, null, 2)}</pre>
        `;
    })
    .catch(error => console.error('Error:', error));
}
