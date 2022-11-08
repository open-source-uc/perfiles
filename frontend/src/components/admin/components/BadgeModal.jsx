/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import axios from 'axios';

const getBase64FromUrl = async (url) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
};

function DropzoneUploaderLayout({
  input, previews, submitButton, dropzoneProps, files, extra: { maxFiles },
}) {
  return (
    <div {...dropzoneProps}>
      {previews}
      {input && files.length < maxFiles}
    </div>
  );
}

export default function BadgeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [blob, setBlob] = useState(null);
  const [image, setImage] = useState(null);
  const [expiresCheck, setExpiresCheck] = useState(false);
  const [pointsOverride, setPointsOverride] = useState(false);

  // Open modal with button
  function openModal() {
    setIsOpen(true);
  }

  const uploadedImage = null;
  const handleFileChangeStatus = ({ meta }, status) => {
    if (status === 'done') {
      getBase64FromUrl(meta.previewUrl).then((r) => setImage(r));
    }
  };

  // Handle form submit (as an uncontrolled form)
  function handleSubmitForm(event) {
    event.preventDefault();
    // console.debug('handleSubmitForm');

    // Get form data
    const formData = new FormData(event.target);
    const entries = formData.entries();
    const data = Object.fromEntries(entries);

    // Get file data
    if (!image) {
      // eslint-disable-next-line no-alert
      alert('No image uploaded');
    }

    // Send request
    axios.put('/api/achievements', {
      ...data,
      image,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    // Close modal
    setIsOpen(false);
    // eslint-disable-next-line no-alert
    alert('Logro creado exitosamente.');
  }

  return (
    <>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center">
            <Dialog.Panel className="w-full max-w-sm rounded bg-white prose p-5">
              <Dialog.Title className="mb-0">Crear logro</Dialog.Title>
              {/* An input form for the badge name */}
              <form onSubmit={handleSubmitForm}>
                <div className="flex flex-col">
                  <label htmlFor="badgeName" className="mt-4">
                    Nombre del logro
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="badgeName"
                    className="border border-gray-300 rounded-md p-2"
                  />
                </div>
                {/* An input form for the badge description */}
                <div className="flex flex-col">
                  <label htmlFor="badgeDescription" className="mt-4">
                    Descripción del logro
                  </label>
                  <textarea
                    name="description"
                    id="badgeDescription"
                    className="border border-gray-300 rounded-md p-2"
                  />
                </div>
                {/* An input form for the badge type */}
                <div className="flex flex-col">
                  <label htmlFor="badgeType" className="mt-4">
                    Tipo de logro
                  </label>
                  <select
                    name="type"
                    id="badgeType"
                    className="border border-gray-300 rounded-md p-2"
                  >
                    <option value="PARTICIPATION">PARTICIPATION</option>
                    <option value="BY_REQUEST">BY_REQUEST</option>
                    <option value="MANUAL">MANUAL</option>
                    <option value="MYSTERIOUS">MYSTERIOUS</option>
                    <option value="AUTOMATIC">AUTOMATIC</option>
                  </select>
                </div>
                {/* An input form for the badge level */}
                <div className="flex flex-col">
                  <label htmlFor="badgeLevel" className="mt-4">
                    Nivel del logro
                  </label>
                  <select
                    name="level"
                    id="badgeLevel"
                    className="border border-gray-300 rounded-md p-2"
                  >
                    <option value="BRONZE">BRONZE</option>
                    <option value="SILVER">SILVER</option>
                    <option value="GOLD">GOLD</option>
                    <option value="PLATINUM">PLATINUM</option>
                  </select>
                </div>
                {/* A checkbox to toggle the badge expiration date visibility */}
                <div className="flex flex-row items-center mt-4">
                  <input
                    type="checkbox"
                    name="expires"
                    id="badgeExpiration"
                    className="border border-gray-300 rounded-md p-2 mr-2"
                    onChange={() => setExpiresCheck(!expiresCheck)}
                  />
                  <label htmlFor="badgeExpiration" className="">
                    Expira
                  </label>
                </div>
                {/* An input form for the badge expiration date */}
                {expiresCheck && (
                <div className="flex flex-col">
                  <label htmlFor="badgeExpirationDate" className="mt-4">
                    Fecha de expiración del logro (Opcional)
                    <input
                      type="date"
                      name="expiresAt"
                      id="badgeExpirationDate"
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </label>
                </div>
                )}
                {/* A checkbox to toggle the badge points override visibility */}
                <div className="flex flex-row items-center mt-4">
                  <input
                    type="checkbox"
                    name="override"
                    id="badgePoints"
                    className="border border-gray-300 rounded-md p-2 mr-2"
                    onChange={() => setPointsOverride(!pointsOverride)}
                  />
                  <label htmlFor="badgePoints" className="">
                    Hardcodear cantidad de puntos
                  </label>
                </div>
                {/* An input form for the badge points override */}
                {pointsOverride && (
                <div className="flex flex-col">
                  <label htmlFor="badgePointsOverride" className="mt-4">
                    Hardcodeo de puntos a otorgar (Opcional)
                    <input
                      type="number"
                      name="pointsOverride"
                      id="badgePointsOverride"
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </label>
                </div>
                )}
                {/* An input form for the badge image */}
                <div className="flex flex-col">
                  <label htmlFor="badgeImage" className="mt-4">
                    Chapita para el logro
                    {/* Dropzone start */}
                    <Dropzone
                      getUploadParams={() => ({ url: 'https://httpbin.org/post' })}
                      LayoutComponent={DropzoneUploaderLayout}
                      onChangeStatus={handleFileChangeStatus}
                      accept="image/png"
                      maxSizeBytes={1000000}
                      inputContent={(files, extra) => (extra.reject ? 'Solamente imágenes en formato PNG' : 'Arrastrar archivos')}
                      maxFiles={1}
                      submitButtonDisabled={(files) => files.length < 1}
                      styles={{
                        dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
                        inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
                      }}
                    />
                  </label>
                  {/* Dropzone end */}
                  {/* A send button */}
                  <button
                    type="submit"
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
      {/* This opens the modal */}
      <button type="button" onClick={openModal}>Crear logro</button>
    </>
  );
}
