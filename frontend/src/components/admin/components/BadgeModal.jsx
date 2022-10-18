/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-unresolved */
import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function BadgeModal() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog.Panel>
        <Dialog.Title>Deactivate account</Dialog.Title>
        <Dialog.Description>
          This will permanently deactivate your account
        </Dialog.Description>

        <p>
          Are you sure you want to deactivate your account? All of your data
          will be permanently removed. This action cannot be undone.
        </p>

        <button type="button" onClick={() => setIsOpen(false)}>Deactivate</button>
        <button type="button" onClick={() => setIsOpen(false)}>Cancel</button>
      </Dialog.Panel>
    </Dialog>
  );
}
