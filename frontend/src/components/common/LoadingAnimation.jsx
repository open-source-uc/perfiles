import React from 'react';
import { Grid } from 'react-loader-spinner';

export default function LoadingAnimation() {
  return (
    <div className="text-center mx-auto h-[50vh] flex flex-col items-center justify-center">
      <Grid height="80" width="80" color="" ariaLabel="grid-loading" radius="12.5" wrapperStyle={{}} wrapperClass="fill-black dark:fill-white" visible />
      <p className="text-2xl font-bold mt-12">Cargando...</p>
    </div>
  );
}
