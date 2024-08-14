const { Nuxt } = require('nuxt')
const config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
nuxt.listen(process.env.PORT, process.env.HOST)