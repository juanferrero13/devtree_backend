import { CorsOptions } from "cors"

export const corsConfig: CorsOptions = {
    // Origin es la url de donde hacemos la petición (desde el frontend en este caso)
    origin: function (origin, callback) {
        const whiteList = [process.env.FRONTEND_URL]

        if (process.argv[2] === "--api") {
            whiteList.push(undefined)
        }

        if (whiteList.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Error de CORS"))
        }
    },
}
