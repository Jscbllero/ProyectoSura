import { traerMedicos } from "../../services/"

document.addEventListener("DOMContentLoaded", () => {
    traerMedicos()
        .then(function (respuestaBack) {
            console.log(respuestaBack)
            mostrarTabla(respuestaBack);
        })
        .catch(function (error) {
            console.error(error);
        })
})

function mostrarTabla(medicos) {
    let cuerpoTabla = document.querySelector("table tbody");
    cuerpoTabla.innerHTML = "";

    medicos.forEach((medico) => {
        let fila = document.createElement("tr");
        fila.setAttribute("data-bs-toggle", "modal");
        fila.setAttribute("data-bs-target", "#ventanaModal");
        fila.setAttribute("id", `med-${medico.id}`);
        fila.innerHTML = `
            <td> ${medico.nombre} </td>
            <td> ${medico.especialidad} </td>
            <td> ${medico.ips} </td>
            <td> ${medico.telefono} </td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

let cuerpoTabla = document.querySelector("table tbody");
cuerpoTabla.addEventListener("click", (event) => {
    console.log(event.target.parentElement.id)
    if (event.target.parentElement.id.startsWith("med-")) {
        mostrarMedicoModal(event.target.parentElement.id.slice(4));
    }
})

function mostrarMedicoModal(id) {
    let nombreMedico=document.getElementById("nombremedico");
    let matriculaProfesionalMedico=document.getElementById("matriculamedico");
    let especialidadMedico=document.getElementById("especialidadmedico");
    let salarioMedico=document.getElementById("salariomedico");
    let ipsMedico=document.getElementById("ipsmedico");
    let correoMedico=document.getElementById("correomedico");
    let telefonoMedico=document.getElementById("telefonomedico");
    let direccionMedico=document.getElementById("direccionmedico");
    let disponibleFinDeSemanaMedico=document.getElementById("disponibilidadmedico");


    traerMedicos()
        .then(function (respuestaBack) {
            console.log(respuestaBack);
            let medico = respuestaBack.find((medico) => medico.id == id);
            nombreMedico.textContent = medico.nombre;
            especialidad.value = medico.especialidad;
            ips.value = medico.ips;
            matriculaProfesional.value = medico.matriculaProfesional;
            salario.value = medico.salario;
            correo.value = medico.correo;
            telefono.value = medico.telefono;
            direccion.value = medico.direccion;
            disponibleFinDeSemana.checked = medico.disponibleFinDeSemana;
        
        })
        .catch(function (error) {
            console.error(error);
        })
}