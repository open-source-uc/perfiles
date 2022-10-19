import React from 'react';
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';

export default function ImageAudioVideo() {
  const getUploadParams = ({ meta }) => {
    const url = 'https://httpbin.org/post';
    return { url, meta: { fileUrl: `${url}/${encodeURIComponent(meta.name)}` } };
  };

  const handleChangeStatus = ({ meta }, status) => {
    // Do nothing
  };

  const handleSubmit = (files, allFiles) => {
    allFiles.forEach((f) => f.remove());
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="image/*"
      inputContent={(files, extra) => (extra.reject ? 'Solamente imágenes en formato .png' : 'Arrastrar Archivos')}
      styles={{
        dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
        inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
      }}
    />
  );
}
