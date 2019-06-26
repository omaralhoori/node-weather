const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine','hbs')
app.use(express.static(publicDir))

app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) =>{
    res.render('index',{
        title: 'Weather App',
        name: 'Omar'
    })
})
app.get('/about', (req, res) =>{
    res.render('about',{
        title: 'About App',
        name: 'Omar'
    })
})
app.get('/help', (req, res) =>{
    res.render('help',{
        title: 'help Page',
        name: 'Omar'
    })
})
app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address,(error, {latitude,longitude,location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location,
                forecast: forecastData
            })
          })
    })

})

app.get('/product',(req, res)=>{
    res.send({
        product: []
    })
})

app.get('/help/*',(req, res) => {
    res.render('404',{
        title: '404',
        name: 'omar',
        errorMessage: 'Help article not found'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title:'404',
        name: 'Omar',
        errorMessage: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server is Up on port '+port+'.')
})