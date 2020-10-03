const express = require('express')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))


//--Rotas
app.use('/user', require('./app/routers/user'))
app.use('/consultas', require('./app/routers/consulta'))
app.use('/auth', require('./app/controllers/authController'))

app.listen(PORT, () => {
    console.log("servidor rodando...")
})