import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Dropzone from './Dropzone';

export default function BadgeModal() {
  const [isOpen, setIsOpen] = useState(true);

  return (

    <Transition
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      as={Fragment}
    >
      <Dialog
        onClose={() => setIsOpen(false)}
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center">
            <Dialog.Panel className="w-full max-w-sm rounded bg-white prose p-5">
              <Dialog.Title>Crear logro</Dialog.Title>
              <Dropzone />
              {/* ... */}
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
