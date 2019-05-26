const  express = require('express') 
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

mongoose.connect('mongodb://localhost/vue_demo', {useNewUrlParser: true})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', require('./router/index'))
app.use('/api', require('./router/movie'))

app.listen(3000)