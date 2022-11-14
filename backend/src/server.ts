import app from './'
import * as dotenv from 'dotenv'
dotenv.config()

const PORT_SERVER = process.env.PORT
app.listen(PORT_SERVER, () => console.log(`Rodando o back-end na porta ${PORT_SERVER}`))