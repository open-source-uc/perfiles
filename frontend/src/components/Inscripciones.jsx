import React from 'react';

export default function Inscripciones() {
  return (
    <section className="styleword">
      <h1>Guía de inscripción</h1>
      <p>
        Una vez por semestre se realiza un proceso de Onboarding en el cual
        los aspirantes a integrantes de OSUC deben completar una serie de
        tareas para poder ser aceptados en la comunidad.
      </p>
      <p>
        El proceso de Onboarding durara una semana en la cual se realizaran
        una serie de charlas, talleres, reuniones y desafios interesantes.
      </p>
      <p>
        Para poder participar en el proceso del proximo Onboarding debes
        completar el formulario de inscripción que se encuentra en el
        siguiente link:
      </p>
      <p>
        <a href="www">Formulario de inscripción</a>
      </p>
      <p>
        Una vez completado el formulario, puedes esperar a que el equipo de
        coordinadores te contacte por correo para informarte de las fechas o
        puedes estar atento a nuestras redes sociales.
      </p>
      <h2>Links de interes</h2>
      <p>
        Si tienes alguna duda, puedes contactarte a traves de alguna de
        nuestras redes, tales como Telegram o Discord.
      </p>
      <iframe title="linksOSUC" id="linksOSUC" src="https://links.osuc.dev" />
      <h2>Roles en la comunidad</h2>
      <p>
        Los roles en OSUC no te impiden participar en las actividades y
        proyectos de la comunidad, pero si definimos un antes y un despues
        para hacer un seguimiento efectivo.
      </p>
      <figure>
        <img
          src="/assets/images/flujo-de-miembros.svg"
          alt="Flujo de miembros"
        />
        <figcaption>Flujo de miembros</figcaption>
      </figure>
    </section>

  );
}
