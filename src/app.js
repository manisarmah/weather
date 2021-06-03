const path= require('path')
const hbs=require('hbs')
const geocode = require('./utils/geocode')
const forecast=require('./utils/forecast')
const express = require("express")
const app= express()

//paths

const publicDirectory=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,"../templates/partials")

//setting up

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//static
app.use(express.static(publicDirectory));

app.get('',(req,res)=>{
res.render('index',{
    title:"Weather App",
    name:"Manish"
})
})
app.get('/about',(req,res)=>{
res.render('about',{
    title:"About",
    name:"Manish"
})
})
app.get('/help',(req,res)=>{
res.render('help',{
    title:"Help",
    name:"Manish"
})
})

app.get('/weather',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error:"This is an error"
        })
    }
geocode(req.query.search,(error,{latitude,longitude,location}={})=>{
if(error)
res.send({error})
else
{
    forecast(latitude,longitude,(error,forecastData)=>{
        if(error)
        res.send({error})
        else{
            res.send({
                forecast:forecastData,
                location,
                address:req.query.search
            })
        }
    })

}

})    
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:"404",
        name:"Manish",
        errorMsg:"Help Article Not Found"
    })
})

app.get('*',(req,res)=>{
res.render('error',{
    title:"404",
    name:"Manish",
    errorMsg:"Page Not Found"
})
})

app.listen(3000,()=>{
    console.log("Server is working on localhost:3000");
})