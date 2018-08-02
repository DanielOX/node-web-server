const express = require('express')
const hbs = require('hbs')
const app = express()
const fs = require('fs')

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getcurentDate',() => {
     return new Date().getFullYear()
})
hbs.registerHelper('screamIt',(text) => {
   return text.toUpperCase()
})

app.use((req,res,next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method}: ${req.url}`;
    fs.appendFileSync('server.log',log + '\n');
    console.log(log)
    next(); 
})
app.use((req,res,next) => {
    res.render('maintenance.hbs');
})



app.set('view engine','hbs')
app.get('/', (req,res) => {
     res.render('home.hbs',{
         pageTitle:'Home',
         welcomeGreetings:'Welcome to my page'
     })
})




app.listen(3000,() => {
    console.log('server is up and running on port 3000')
})