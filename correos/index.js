import dotenv from 'dotenv'
dotenv.config()
console.log(`Environment: ${process.env.ENVIRONMENT}`)

import functions from "firebase-functions"
import app from "./src/app.js"

export const service_correo = functions.region('southamerica-east1').https.onRequest(app)