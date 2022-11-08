/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Dialog } from '@headlessui/react';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';

function DropzoneUploaderLayout({
  input, previews, submitButton, dropzoneProps, files, extra: { maxFiles },
}) {
  return (
    <>
      {previews}

      <div {...dropzoneProps}>
        {files.length < maxFiles && input}
      </div>
    </>
  );
}

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

export default function BadgeCreate() {
  const [image, setImage] = useState(null);
  const handleFileChangeStatus = ({ meta }, status) => {
    if (status === 'done') {
      getBase64FromUrl(meta.previewUrl).then((r) => setImage(r));
    }
  };

  return (
    <section className="admin-box admin-achievements">
      <div className="prose">
        <h2 className="admin-box__title">Crear un logro</h2>
      </div>
    </section>
  );
}
