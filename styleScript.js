let FcuInput = document.getElementById('Fcu')
let aggSizeInput = document.getElementById('aggSize')
let isAggStateCrushedInput = document.getElementById('isAggStateCrushed')
let isCementTypeRapidInput = document.getElementById('isCementTypeRapid')
let slumpInput = document.getElementById('slump')
let daysInput = document.getElementById('days')
let sigmaInput = document.getElementById('sigma')
let sandInput = document.getElementById('sand')
let numberOfDoing = 0
let mixture = document.getElementById('mixture')
let doneButton = document.getElementById('doneButton')
let FtargetOutput = document.getElementById('FtargetOutput') 
let waterOutput = document.getElementById('waterOutput') 
let cementOutput = document.getElementById('cementOutput') 
let WCoutput = document.getElementById('WCoutput') 
let totalAggVolOutput = document.getElementById('totalAggVolOutput') 
let largAggVolOutput = document.getElementById('largAggVolOutput') 
let smallAggVolOutput = document.getElementById('smallAggVolOutput') 
let cementDensity = document.getElementById('cementDensity')
let largAggdensity = document.getElementById('largAggdensity')
let largAggspecificweight = document.getElementById('largAggspecificweight')
let smallAggdensity = document.getElementById('smallAggdensity')
let smallAggspecificweight = document.getElementById('smallAggspecificweight')
let waterOutputPrecentage = document.getElementById('waterOutputPrecentage')
let waterOutputMeterPrecentage = document.getElementById('waterOutputMeterPrecentage')
let cementOutputPrecentage = document.getElementById('cementOutputPrecentage')
let largAggVolMeterPrecentage = document.getElementById('largAggVolMeterPrecentage')
let largAggVolLiterPrecentage = document.getElementById('largAggVolLiterPrecentage')
let smallAggVolMeterPrecentage = document.getElementById('smallAggVolMeterPrecentage')
let smallAggVolLiterPrecentage = document.getElementById('smallAggVolLiterPrecentage')
let efficiency = document.getElementById('efficiency')

document.querySelectorAll('input[name="numberOfdoing"]').forEach( ele => {
     ele.addEventListener('click' , () => {
        document.querySelectorAll('input[name="numberOfdoing"]').forEach( e => { if(e.checked) numberOfDoing = e.value })
     })
})

doneButton.addEventListener('click' , () => {
    let mustAvailableElement = [cementDensity , FcuInput , aggSizeInput  ,largAggdensity,largAggspecificweight,smallAggdensity,smallAggspecificweight , mixture]
    for(let i = 0 ; i < mustAvailableElement.length ; i ++){
        if(mustAvailableElement[i].value == '')  {
            mustAvailableElement[i].classList.add('inputAnimation')
            // window.scrollTo({top : 0 , behavior:"smooth"})
            mustAvailableElement[i].scrollIntoView({behavior:"smooth"})
            setTimeout(()=>{mustAvailableElement[i].classList.remove('inputAnimation')} , 2000)
            return
        }  
    }
    
    let theFinalResult = finalFunction(slumpInput.value , 
        parseInt(aggSizeInput.value) , 
        isAggStateCrushedInput.checked , 
        isCementTypeRapidInput.checked ,
        parseInt(daysInput.value) , 
        parseInt(FcuInput.value) , 
        parseInt(numberOfDoing) ,
        parseInt(sigmaInput.value) , 
        parseInt(sandInput.value))

        FtargetOutput.innerHTML = theFinalResult.Ftarget.toFixed(3)
        waterOutput.innerHTML = theFinalResult.water.toFixed(3)
        cementOutput.innerHTML = theFinalResult.cement.toFixed(3)
        WCoutput.innerHTML = theFinalResult.WC.toFixed(3)
        totalAggVolOutput.innerHTML = theFinalResult.totalAggVol.toFixed(3)
        largAggVolOutput.innerHTML = theFinalResult.fineAggVol.toFixed(3)    
        smallAggVolOutput.innerHTML = theFinalResult.largAggVol.toFixed(3)

        thequantities = quantitiesTransform(theFinalResult.cement , cementDensity , theFinalResult.largAggVol , largAggdensity.value , largAggspecificweight.value , theFinalResult.fineAggVol , smallAggdensity.value , smallAggspecificweight.value , theFinalResult.water , mixture.value)
        console.log(thequantities)
        
        waterOutputPrecentage.innerHTML = thequantities.waterLiter.toFixed(3)
        waterOutputMeterPrecentage.innerHTML = thequantities.waterMeter.toFixed(3)
        cementOutputPrecentage.innerHTML = thequantities.Cement
        largAggVolMeterPrecentage.innerHTML = thequantities.largAggMeter.toFixed(3)
        largAggVolLiterPrecentage.innerHTML = thequantities.largAggLiter.toFixed(3)
        smallAggVolMeterPrecentage.innerHTML = thequantities.smallAggMeter.toFixed(3)
        smallAggVolLiterPrecentage.innerHTML = thequantities.smallAggLiter.toFixed(3)
        efficiency.innerHTML = thequantities.efficiency.toFixed(3)
})