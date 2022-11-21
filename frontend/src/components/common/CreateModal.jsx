/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, {
  useEffect, useContext, useState, Fragment,
} from 'react';
import { Helmet } from 'react-helmet';
import { Tab, Dialog, Transition } from '@headlessui/react';

function FormProyectos({ isOpen, setIsOpen }) {
  return (
    <>
      <p>TODO: crear formulario con framgent</p>
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
                  className="text-lg font-medium leading-6 text-gray-900 my-2"
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