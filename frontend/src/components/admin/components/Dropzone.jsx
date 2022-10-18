/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDropzone } from 'react-dropzone';

export default function Dropzone(props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

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

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}
