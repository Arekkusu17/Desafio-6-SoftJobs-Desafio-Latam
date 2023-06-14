import jwt from 'jsonwebtoken';
import { config } from "dotenv";
config();


// asignacion de token para la Autorizacion a rutas restringidas
//const token=Jwt.sign({ email }, "az_AZ") //PAYLOAD Y LLAVE SECRETA
export const signJWT = ({ email }) => {
  try {
    const token = jwt.sign({ email }, process.env.JWT_PASSWORD);
    // console.log("Token: ", token);
    return token

  } catch (error) {
    throw { code: error.code }
  }
}


export const verifyAndDecodeJWT = (req, res, next) => {
  try {
    const bearerHeaders = req.headers.authorization;
    if (!bearerHeaders) {
      throw { message: "Token con formato Bearer es requerido" };
    }

    const token = bearerHeaders.split(" ")[1];
    console.log(token)
    jwt.verify(token, process.env.JWT_PASSWORD)
    const payload = jwt.decode(token)
    console.log(payload)
    req.email = payload.email

    next()
  } catch (error) {
    console.log("aqui?")
    console.log(error)
  }
}
