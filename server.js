const express = require('express')
const path = require('path')

const app = express()
app.use(express.json({ limit: '20mb' }))

// demo removido: sem proxy de webhook

app.get('/healthz', (req, res) => res.send('ok'))

app.get('/find', async (req, res) => {
  try {
    const r = await fetch('https://as2cloud.online/facesfind.html')
    if (!r.ok) {
      res.status(502).send('upstream error')
      return
    }
    const html = await r.text()
    res.set('Content-Type', 'text/html; charset=utf-8')
    res.send(html)
  } catch (e) {
    res.status(500).send('fetch failed')
  }
})

app.use(express.static(path.join(__dirname)))
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

const port = process.env.PORT || 8080
app.listen(port, () => console.log('FacesFind portal on :' + port))
