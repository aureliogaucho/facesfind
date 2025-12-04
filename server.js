const express = require('express')
const path = require('path')

const app = express()
app.use(express.json({ limit: '20mb' }))

app.post('/api/webhook', async (req, res) => {
  try {
    const upstream = process.env.WEBHOOK_UPSTREAM || 'https://poctypev.as2talks.com'
    const resp = await fetch(upstream, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    })
    const text = await resp.text()
    res.status(resp.status)
      .type(resp.headers.get('content-type') || 'application/json')
      .send(text)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.get('/healthz', (req, res) => res.send('ok'))

app.use(express.static(path.join(__dirname)))
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

const port = process.env.PORT || 8080
app.listen(port, () => console.log('FacesFind portal on :' + port))
