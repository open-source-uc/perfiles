export default function handleError(err) {
  if (err.response) {
    return `El servidor respondió con un error (${err.response.status}).`;
  } if (err.request) {
    return 'No se pudo conectar con el servidor.';
  }
  return 'Ocurrió un error desconocido al cargar los miembros.';
}
