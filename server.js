const express = require('express')
const path = require('path')

const app = express()
app.use(express.json({ limit: '20mb' }))

// demo removido: sem proxy de webhook

app.get('/healthz', (req, res) => res.send('ok'))

app.use(express.static(path.join(__dirname)))
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

const port = process.env.PORT || 8080
app.listen(port, () => console.log('FacesFind portal on :' + port))
