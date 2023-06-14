import { myModel } from "../models/model.js";
import { handleErrors } from "../database/errors.js";
import bcrypt from "bcrypt";
import { signJWT, verifyAndDecodeJWT } from "../middlewares/jwtMiddleware.js";



const createNewUser = async (req, res) => {
  const { email, password, rol, lenguage } = req.body;
  try {
    const result = await myModel.addNewUser({ email, password, rol, lenguage });
    return res.status(201).json({ ok: true, message: "Nuevo usuario agregado", result })
  } catch (error) {
    const { status, message } = handleErrors(error.code)
    console.log("error: ", status, " - ", message)
    return res.status(status).json({ ok: false, result: message })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // validar datos requeridos 
    if (!email || !password) {
      throw { message: "email y la constraseña requeridos" };
    }

    const dbUserPassword = await myModel.getExistentUser(email)

    const validatePassword = await bcrypt.compare(password, dbUserPassword);

    // validacion contraseña
    if (validatePassword == false) {
      throw { message: "Contraseña incorrecta del usuario" };
    }

    const token = signJWT({ email })
    res.status(201).json(token)

  } catch (error) {
    console.log(error)
    res.status(error.code || 500).send(error) // RESPUESTA SERVIDOR ERROR CREDENCIALES
  }
}

const getUsers = async (req, res) => {
  try {
    const rows = await myModel.getUserInfo(req.email)
    res.json(rows[0])
  } catch (error) {
    console.log(error)
    res.status()
  }
}

export const myController = { createNewUser, loginUser, getUsers }