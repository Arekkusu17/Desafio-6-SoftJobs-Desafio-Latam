

export const reportQuery = async (req, res, next) => {
  const url = req.url
  console.log(`
  Hoy ${new Date()}
  Se ha recibido una consulta en la ruta ${url}`)
  next() // informa el codigo y continua al siguiente bloque
}