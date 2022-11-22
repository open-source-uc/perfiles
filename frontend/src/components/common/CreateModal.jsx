/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, {
  useEffect, useContext, useState, Fragment,
} from 'react';
import { Helmet } from 'react-helmet';
import {
  Formik, Form, Field, ErrorMessage, FieldArray,
} from 'formik';
import * as Yup from 'yup';
import { Tab, Dialog, Transition } from '@headlessui/react';

function FormProyectos({ isOpen, setIsOpen }) {
  return (
    <>

      <Formik
        initialValues={{
          projectName: '',
          projectDescription: '',
          projectHashtags: [{ hashtag: '' }],
          friends: [
            {
              name: '',
              email: '',
            },
          ],
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
          projectHashtags: Yup.array()
            .of(Yup.string())
            .min(1, 'Debe tener al menos 1 hashtag')
            .max(5, 'Debe tener 5 hashtags o menos')
            .required('Requerido'),
          projectRepo: Yup.string()
            .max(200, 'Debe tener 200 caracteres o menos'),
          projectAccess: Yup.string()
            .required('Requerido'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >

        <Form className="w-full">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="projectName" className="text-sm font-medium text-gray-700">
                Nombre del proyecto
              </label>
              <Field name="projectName" type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-osuc-black-1" />
              <ErrorMessage name="projectName" component="div" className="text-xs text-red-500" />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="projectDescription" className="text-sm font-medium text-gray-700">
                Descripción del proyecto
              </label>
              <Field name="projectDescription" as="textarea" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-osuc-black-1" />
              <ErrorMessage name="projectDescription" component="div" className="text-xs text-red-500" />
            </div>

            {({ values }) => (
              <Form>
                <FieldArray name="friends">
                  {({ insert, remove, push }) => (
                    <div>
                      {values.friends.length > 0
                  && values.friends.map((friend, index) => (
                    <div className="row" key={index}>
                      <div className="col">
                        <label htmlFor={`friends.${index}.name`}>Name</label>
                        <Field
                          name={`friends.${index}.name`}
                          placeholder="Jane Doe"
                          type="text"
                        />
                        <ErrorMessage
                          name={`friends.${index}.name`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                      <div className="col">
                        <label htmlFor={`friends.${index}.email`}>Email</label>
                        <Field
                          name={`friends.${index}.email`}
                          placeholder="jane@acme.com"
                          type="email"
                        />
                        <ErrorMessage
                          name={`friends.${index}.name`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                      <div className="col">
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => remove(index)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                      <button
                        type="button"
                        className="secondary"
                        onClick={() => push({ name: '', email: '' })}
                      >
                        Add Friend
                      </button>
                    </div>
                  )}
                </FieldArray>
                <button type="submit">Invite</button>
              </Form>
            )}

            <div className="flex flex-col space-y-2">
              <label htmlFor="projectRepo" className="text-sm font-medium text-gray-700">
                Repositorio del proyecto
              </label>
              <Field name="projectRepo" type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-osuc-black-1" />
              <ErrorMessage name="projectRepo" component="div" className="text-xs text-red-500" />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="projectAccess" className="text-sm font-medium text-gray-700">
                Apertura del proyecto
              </label>
              <Field name="projectAccess" as="select" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-osuc-black-1">
                <option value="" disabled selected>Selecciona una opción</option>
                <option value="OPEN">Aceptar nuevos miembros</option>
                <option value="APPROVAL">Por solicitud</option>
                <option value="CLOSED">No aceptar nuevos miembros</option>
              </Field>
              <ErrorMessage name="projectAccess" component="div" className="text-xs text-red-500" />
            </div>
          </div>
        </Form>
      </Formik>

      <div className="flex mb-2 mt-4">
        <button
          type="submit"
          className="block mx-auto inset-x-0 mt-4 bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsOpen(false)}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="block mx-auto inset-x-0 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsOpen(false)}
        >
          Enviar
        </button>
      </div>
    </>
  );
}

function FormIdeas({ isOpen, setIsOpen }) {
  return (
    <>
      <p>TODO: crear formulario Con framgent</p>
      <button
        type="submit"
        className="block mx-auto inset-x-0 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsOpen(false)}
      >
        Enviar
      </button>
    </>
  );
}

function CreateModal({
  isOpen, setIsOpen, title, formulario,
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
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
          <div className="flex min-h-full items-center justify-center p-5 text-center">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-3 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium leading-6 text-gray-900 mt-2 mb-4"
                >
                  {title}
                </Dialog.Title>
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
};
