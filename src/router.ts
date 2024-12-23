import { Router } from "express" // Configurar un objeto con todas las rutas que podemos agregar a la app principal
import { body } from "express-validator"
import {
    createAccount,
    getUser,
    getUserByHandle,
    login,
    searchByHandle,
    updateProfile,
    uploadImage,
} from "./handlers"
import { handleInputsErrors } from "./middleware/validation"
import { authenticate } from "./middleware/auth"

const router = Router()

// ROUTING
// Autenticación y Registro
router.post(
    "/auth/register",
    // Validator se ejecuta aca para no ejecutar el código si antes no se pasa la validación
    body("handle").notEmpty().withMessage("El Handle no puede ir vacio"),
    body("name").notEmpty().withMessage("El Name no puede ir vacio"),
    body("email").isEmail().withMessage("E-mail no valido"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("El Password debe tener mínimo 8 caracteres"),
    handleInputsErrors,
    createAccount
)

router.post(
    "/auth/login",
    body("email").isEmail().withMessage("E-mail no válido"),
    body("password").notEmpty().withMessage("El password es obligatorio"),

    login
)

router.get("/user", authenticate, getUser)

router.patch(
    "/user",
    body("handle").notEmpty().withMessage("El Handle no puede ir vacio"),
    handleInputsErrors,
    authenticate,
    updateProfile
)

router.post("/user/image", authenticate, uploadImage)

router.get("/:handle", getUserByHandle)

router.post(
    "/search",
    body("handle").notEmpty().withMessage("El handle no puede ir vacio"),
    handleInputsErrors,
    searchByHandle
)

export default router
