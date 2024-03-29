/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, {
  useEffect, useContext, useState, Fragment,
} from 'react';
import { Helmet } from 'react-helmet';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { Tab, Dialog, Transition } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import handleError from '../../utils/error-handler';

function FormProyectos({ isOpen, setIsOpen }) {
  // Handle form submit (as an uncontrolled form)
  function handleSubmitForm(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    // eslint-disable-next-line no-console
    console.log(data);
    // Send request
    axios.put(`${import.meta.env.VITE_BASE_API_URL}/projects`, {
      ...data,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => {
      // eslint-disable-next-line no-alert
      alert('Logro creado exitosamente!');
    }).catch((err) => {
      const errorMsg = handleError(err);
      // eslint-disable-next-line no-alert
      alert(errorMsg);
    });

    // Close modal

    // eslint-disable-next-line no-alert
  }
  return (
    <div className="p-3">

      <Formik
        initialValues={{
          projectName: '',
          projectDescription: '',
          projectHashtags: '',
          projectRepo: '',
          projectAccess: '',
        }}
        validationSchema={Yup.object({
          projectName: Yup.string()
            .max(50, 'Debe tener 50 caracteres o menos')
            .required('Requerido'),
          projectDescription: Yup.string()
            .max(500, 'Debe tener 200 caracteres o menos')
            .required('Requerido'),
          projectHashtags: Yup.string()
            .min(1, 'Debe tener al menos 1 hashtag')
            .max(50, 'No abuses de los hashtags!')
            .required('Requerido'),
          projectRepo: Yup.string()
            .max(200, 'Debe tener 200 caracteres o menos'),
          projectAccess: Yup.string()
            .required('Requerido'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // eslint-disable-next-line no-alert
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >

        {/* eslint-disable-next-line react/jsx-no-bind */}
        <Form onSubmit={handleSubmitForm} className="w-full">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="projectName" className="text-sm font-medium">
                Nombre del proyecto
              </label>
              <Field name="name" type="text" placeholder="Members OSUC" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-osuc-black-1" />
              <ErrorMessage name="name" component="div" className="text-xs text-red-500" />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="projectDescription" className="text-sm font-medium">
                Descripción del proyecto
              </label>
              <Field name="description" as="textarea" placeholder="Plataforma para recopilar ideas y ganar chapitas" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-osuc-black-1" />
              <ErrorMessage name="description" component="div" className="text-xs text-red-500" />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="projectHashtags" className="text-sm font-medium ">
                Hashtags
              </label>
              <Field name="hashtags" type="text" placeholder="#UC #OSUC #React" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-osuc-black-1" />
              <ErrorMessage name="hashtags" component="div" className="text-xs text-red-500" />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="repo" className="text-sm font-medium">
                Repositorio del proyecto
              </label>
              <Field name="repo" type="text" placeholder="https://github.com/open-source-uc/perfiles" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-osuc-black-1" />
              <ErrorMessage name="repo" component="div" className="text-xs text-red-500" />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="access" className="text-sm font-medium">
                Apertura del proyecto
              </label>
              <Field name="access" as="select" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-osuc-black-1">
                <option value="" disabled selected>Selecciona una opción</option>
                <option value="OPEN">Aceptar nuevos miembros</option>
                <option value="APPROVAL">Por solicitud</option>
                <option value="CLOSED">No aceptar nuevos miembros</option>
              </Field>
              <ErrorMessage name="access" component="div" className="text-xs text-red-500" />
            </div>
          </div>
          <div className="flex mb-2 mt-4">
            <button
              type="button"
              className="block text-white mx-auto inset-x-0 mt-4 bg-gray-400 hover:bg-gray-600 font-bold py-2 px-4 rounded"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="block mx-auto text-white inset-x-0 mt-4 bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
              onClick={() => setIsOpen(false)}
            >
              Enviar
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

function FormIdeas({ isOpen, setIsOpen }) {
  return (
    <>
      <p>TODO: crear formulario Con framgent</p>
      <button
        type="submit"
        className="block mx-auto inset-x-0 mt-4 bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
        onClick={() => setIsOpen(false)}
      >
        Enviar
      </button>
    </>
  );
}

function InfoBadge({ DataBadge }) {
  return (
    <div className="">
      <div className="flex flex-row justify-center item-center px-3 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
        <h3>{DataBadge.name}</h3>
      </div>
      <div className="relative grid gap-8 p-3 lg:grid-cols-2 ">
        <p className="text-xs">{DataBadge.description}</p>
        <p>
          <StarIcon className="inline-block mr-2 h-5" />
          {DataBadge.levelName}
          {' '}
          {/* {DataBadge.level.name} */}
        </p>
      </div>
    </div>
  );
}

function CreateModal({
  isOpen, setIsOpen, title, formulario,
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={() => setIsOpen(false)}>
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="z-50 my-20 inline-block w-full h-full max-w-md text-sm transform overflow-hidden font-light text-gray-500 duration-300 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                {/* className="w-64 h-full max-w-md transform overflow-hidden rounded-2xl bg-white p-3 text-left align-middle shadow-xl transition-all" */}
                {/* si existe title */}
                {title && (
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900 mt-2 mb-4 dark:text-white"
                  >
                    {title}
                  </Dialog.Title>
                )}
                { formulario }
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export {
  CreateModal,
  FormProyectos,
  FormIdeas,
  InfoBadge,
};
