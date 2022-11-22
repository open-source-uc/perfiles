export default function handleError(err) {
  if (err.response) {
    let message = '';
    if (err.response?.data?.message) {
      message = err.response.data.message;
    } else {
      message = 'error inesperado';
    }
    return `El servidor respondió con un error (${err.response.status}): ${message}.`;
  } if (err.request) {
    return 'No se pudo conectar con el servidor.';
  }
  return 'Ocurrió un error desconocido al cargar los miembros.';
}
