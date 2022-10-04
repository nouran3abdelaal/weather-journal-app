/* Global Variables */
const apiKey = 'b4c0410797703defa52994dd9b7563a3&units=imperial';
const baseURL = "https://api.openweathermap.org/data/2.5/weather?";
//http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}
let fullURL_Zip;
let lon;
let lat;
let temperature="";
let content;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

//GET Route II: Client Side
const getLatLon = async()=>{
    console.log(fullURL_Zip)

    const respose = await fetch(fullURL_Zip)
    console.log(respose)
    try{
        const data = await respose.json();
         lat = await data.lat;
         lon = await data.lon;
         console.log(lat+lon)
        //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
        //const resWeather = await fetch(baseURL+"lat="+lat+"&lon="+lon+"&appid="+apiKey);
       
        

        console.log("data of lon lot api "+JSON.stringify(data));
 
    }
    catch(err){
        console.log(err)
    }

}

const getWeather = async()=>{
    console.log(lat+" ",lon)
    const res =  await fetch(baseURL+"lat="+lat+"&lon="+lon+"&appid="+apiKey)
    console.log(res)
    try{
        const weather = await res.json();
        console.log("weather "+JSON.stringify(weather));
        return weather;

    }
    catch(err){
        console.log(err)

    }
}

//POST Route
const postData = async ()=>{
    await fetch("/postProjectData",{
        method :"POST",
        headers : {
            "Content-Type" : "application/json"

        },
        body : JSON.stringify({
            date: newDate,
            temperature,
            content
        })
    })

}
//GET Route II: Client Side
const getDataOpject = async ()=>{
    const res = await fetch("/getProjectData");
    const data = await res.json();
    console.log(JSON.stringify(data) +"  data from the get end point");
    return data;

}

const performAction =async ()=>{
    const zipCode = document.getElementById("zip").value;
    content = document.getElementById("feelings").value;
    if(!zipCode){
        alert("Please Enter a Zip code");
        return;
    }
     fullURL_Zip = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode}&appid=b4c0410797703defa52994dd9b7563a3`;
     getLatLon()
    .then(()=>{
        getWeather()
        .then((data)=>{
            temperature=data.main.temp
            console.log("temperature is: "+temperature)
    
        })
        .then(()=>{
            postData()
            .catch(err=>{
                console.log("error happened  "+ err);
            })
        })
        .then(
            getDataOpject()
        )
    })
    
    
    .catch(err=>{
        console.log("error happened  "+ err);
    })
     //console.log("whather>>>>>> "+getWeather(baseURL));


}

document.getElementById("generate").addEventListener("click",performAction);

// 