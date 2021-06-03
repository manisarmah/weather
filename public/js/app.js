console.log("Client side js file is loaded");

const searchForm=document.querySelector('form')
const search=document.querySelector('input')
const msg1=document.querySelector('#msg1')
const msg2=document.querySelector('#msg2')

const randomMsg=["You can tell the temperature by counting a cricket's chirps! ","Sandstorms can swallow up entire cities.","Dirt mixed with wind can make dust storms called black blizzards"
,"The coldest temperature ever officially recorded was -89.2°C","A mudslide can carry rocks, trees, vehicles and entire building","A heatwave can make train tracks bend!","Lightning often follows a volcanic eruption.",
"In July 2001 the rainfall in Kerala, India, was blood red!","Hurricanes can push more than 6m of water ashore."," A thunderstorm can produce 160kmph winds!"]


searchForm.addEventListener('submit',(e)=>{
e.preventDefault()
const location=search.value
const randomNo = Math.floor(Math.random()*10)

msg1.textContent="Loading..."
fetch('http://localhost:3000/weather?search='+location).then((response)=>{
    response.json().then((data)=>{
        console.log(data.error);
        if(data.error)
        {
            msg1.textContent=data.error
        }
        else{
      msg1.textContent=data.forecast
    msg2.textContent=data.location
}
    })
})
msg2.textContent="Fun Fact :"+randomMsg[randomNo]
})