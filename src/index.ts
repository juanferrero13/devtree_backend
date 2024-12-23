import colors from "colors"
import server from "./server"

// process.env.PORT: Utilizo variables de entorno cuando la aplicacion se suba a producción y me asignen un puerto, o en su defecto el puerto que especifico yo mismo
const port = process.env.PORT || 4000

server.listen(port, () => {
    console.log(colors.blue.italic("Servidor escuchando en el PUERTO:"), port)
})
