const request=require("request")

const forecast=(lat,long,callback)=>{
const url="http://api.weatherstack.com/current?access_key=c71a34f5deaa28b03a1c12bfd0dce29e&query="+encodeURIComponent(lat)+","+encodeURIComponent(long)
request({url,json:true},(error,{body}={})=>{
    if(error)
    {
callback("No internet connection",undefined)
    }
    else if(body.error)
    {
    callback("Wrong Search, Try Again!",undefined)
    }
    else{
        callback(undefined,
            " Temperature : "+body.current.temperature+" °C, "+body.current.weather_descriptions

        )
    }

})
}
module.exports=forecast