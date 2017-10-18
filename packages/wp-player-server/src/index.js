const AWS = require('aws-sdk')
const credentials = require('../credential.json')
const http = require('http')
const querystring = require('querystring')
const url = require('url')
require('isomorphic-fetch')

AWS.config.update(credentials)

const Polly = new AWS.Polly({
  signatureVersion: 'v4',
  region: credentials.region
})

// http server
const PORT = 3000
const server = http.createServer()
server
  .on('request', (req, res) => {
    const { pathname: route, query } = url.parse(req.url)
    const { text, protocol, host, slug } = querystring.parse(query)
    console.log({ route })
    if (route == '/mp3' && text) {
      const decodedText = new Buffer(
        text.split(' ').join('+'),
        'base64'
      ).toString('utf8')
      const params = {
        Text: decodedText,
        OutputFormat: 'mp3',
        VoiceId: 'Mizuki'
      }

      Polly.synthesizeSpeech(params, (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' })
          res.write('500 unknown internal error')
          res.end()
        } else {
          const { ContentType, AudioStream, RequestCharacters } = data
          console.log(`transformed ${RequestCharacters} characters`)
          res.writeHead(200, { 'Content-Type': ContentType })
          res.write(AudioStream)
          res.end()
        }
      })
    } else if (route == '/wp_mp3' && protocol && host && slug) {
      const url = `${protocol}//${host}/wp-json/wp/v2/posts?slug=${slug}`
      console.log(url)

      fetch(url)
        .catch(e => console.log(e))
        .then(response => response.json())
        .then(data => {
          const text = data[0].content.rendered
            .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
            .replace(/\n/g, '')
          const params = {
            Text: text,
            OutputFormat: 'mp3',
            VoiceId: 'Mizuki'
          }
          Polly.synthesizeSpeech(params, (err, data) => {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'text/plain' })
              res.write('500 unknown internal error')
              res.end()
            } else {
              const { ContentType, AudioStream, RequestCharacters } = data
              console.log(`transformed ${RequestCharacters} characters`)
              res.writeHead(200, { 'Content-Type': ContentType })
              res.write(AudioStream)
              res.end()
            }
          })
        })
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.write('404 not found')
      res.end()
    }
  })
  .listen(PORT)
