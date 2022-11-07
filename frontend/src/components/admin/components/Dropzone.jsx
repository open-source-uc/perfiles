/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Dialog } from '@headlessui/react';

export default function Dropzone(props) {
  const onDrop = useCallback((uploadedFiles) => {
    uploadedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result;
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png'],
    },
    maxFiles: 1,
    onDrop,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path}
      {' '}
      -
      {' '}
      {file.size}
      {' '}
      bytes
    </li>
  ));

  // const reader = new FileReader();
  // reader.onload = () => {
  //   const binaryStr = reader.result;
  //   console.log('Will output file Str');
  //   console.log(binaryStr);
  // };
  // function activateLasers() {
  //   console.log('Will output file Str');
  //   console.log(files[0]);
  //   reader.readAsArrayBuffer(files[0]);
  // }

  return (
    <>
      <Dialog.Description>
        <div {...getRootProps({ className: 'p-2 dropzone border-dashed border-3' })}>
          <input {...getInputProps()} />
          <p>
            Arrastra la imagen del logro, o haz click para seleccionar archivos.
          </p>
          <p className="text-sm text-grey-400">
            (Solo se aceptan imágenes en formato .png)
          </p>
        </div>
      </Dialog.Description>
      <aside>
        <h4>Se subirá:</h4>
        <ul>{files}</ul>
      </aside>
      {/* <button type="button" onClick={activateLasers}>
        Activate Lasers
      </button> */}
    </>
  );
}
