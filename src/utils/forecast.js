const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/942fe58e9d3014f3b28ef8dcdcb421d7/'+latitude+','+longitude+'?units=si&lang=ar'
    request({
    url,
    json: true
},(error, {body})=>{
    if (error) {
        callback('unable to connect to weather services',undefined)   
    }else if(body.error){
        callback('Unable to find location',undefined)
    }else{
        callback(undefined,body.daily.data[0].summary + '. the temperature outside is : '+body.currently.temperature);  
    }
})

}

module.exports = forecast