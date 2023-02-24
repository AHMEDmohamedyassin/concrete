//      slump               VB
// A : 0 - 10              12>         خلطة جافة جداا
// B : 10 - 30             6-12        خلطة جافة
// C : 30 - 60             3-6         خلطة لدنة
// D : 60 - 180            0-3         خلطة منهارة

// 1 slump function
// 2 VB function
// 3 waterAmount Function
// 4 interpolation function 
// 5 target stress Ftarget Function 
// 6 waterCementRatioTableStressFunction المقاومة المناطرة إلي م إلي س بنصف من الجدول
// 7 getWaterCementRatio  الحصول علي نسبة الماء إلي الأسمنت النهائية عن طريق إعطاء الدالة مقاومة الجدول و المقاومة المستهدفة
// 8 waterCementGraphFunction   دالة تحوي معادلات منحني العلاقة بين المقاومة و نسبة الماء إلي الأسمنت
// 9 solveEquation  حل المعادلات
// 10 finalFunction المعادلة النهائة لاستخراج النتائج
// 11 fineAggPresentageFromCourseAgg  دالة لمعرفة نسبة الركام الصغير من الركام الكبير

// sandGraphNumber       0 => رمل خشن
// sandGraphNumber       1 => رمل عادي
// sandGraphNumber       2 => رمل ناعم
// sandGraphNumber       3 => رمل ناعم جداا


// finalFunction('D' , 25 , true , false , 28 , 450 , 0 , 0 , 0)

let slump = ''
let fromNmmToKgCm = 10.19711013898661
let SGcement = 3.15
let SGlargAgg = 2.6
let SGsmallAgg = 2.5
let densityLargAgg = 1475
let densitySmallAgg = 1525

function slumpFunction (e){        // detect state from slump
    if(e <= 10) slump = 'A'
    else if(e <= 30 ) slump = 'B'
    else if(e <= 60) slump = 'C'
    else if(e <= 180) slump = 'D'

    return slump
}

function VBfunction(e){           // detect state from VB
    if(e > 12 ) slump = 'A'
    else if(e <= 12 || e > 6) slump = 'B'
    else if(e <= 6 || e > 3) slump = 'C'
    else if(e <= 3) slump = 'D'

    return slump
}

function waterAmount(size , isAggStateCrushed , slump){        // detect water amount (number , boolean , A/B/C/D string )
    // isAggStateCrushed = true   ركام مكسر
    let waterVOL = 0
    switch(slump){
        case 'A' :
            if(isAggStateCrushed){
                if(size <= 10){
                    waterVOL = 180
                }else if(size > 10 && size <= 20){
                    waterVOL = interpolationFunction(10 , 20 , size , 180 , 170)
                }else if (size > 20 && size <= 40){
                    waterVOL = interpolationFunction(20 , 40 , size , 170 , 155)
                }else{
                    waterVOL = 155
                }
            }else{
                if(size <= 10){
                    waterVOL = 150
                }else if(size > 10 && size <= 20){
                    waterVOL = interpolationFunction(10 , 20 , size , 150 , 135)
                }else if (size > 20 && size <= 40){
                    waterVOL = interpolationFunction(20 , 40 , size , 135 , 115)
                }else{
                    waterVOL = 115
                }
            }
            break;
        case 'B' :
            if(isAggStateCrushed){
                if(size <= 10){
                    waterVOL = 205
                }else if(size > 10 && size <= 20){
                    waterVOL = interpolationFunction(10 , 20 , size , 205 , 190)
                }else if (size > 20 && size <= 40){
                    waterVOL = interpolationFunction(20 , 40 , size , 190 , 175)
                }else{
                    waterVOL = 175
                }
            }else{
                if(size <= 10){
                    waterVOL = 180
                }else if(size > 10 && size <= 20){
                    waterVOL = interpolationFunction(10 , 20 , size , 180 , 160)
                }else if (size > 20 && size <= 40){
                    waterVOL = interpolationFunction(20 , 40 , size , 160 , 140)
                }else{
                    waterVOL = 140
                }
            }
            break;
        case 'C' :
            if(isAggStateCrushed){
                if(size <= 10){
                    waterVOL = 230
                }else if(size > 10 && size <= 20){
                    waterVOL = interpolationFunction(10 , 20 , size , 230 , 210)
                }else if (size > 20 && size <= 40){
                    waterVOL = interpolationFunction(20 , 40 , size , 210 , 190)
                }else{
                    waterVOL = 190
                }
            }else{
                if(size <= 10){
                    waterVOL = 205
                }else if(size > 10 && size <= 20){
                    waterVOL = interpolationFunction(10 , 20 , size , 205 , 180)
                }else if (size > 20 && size <= 40){
                    waterVOL = interpolationFunction(20 , 40 , size , 180 , 160)
                }else{
                    waterVOL = 160
                }
            }
            break;
        case 'D' :
            if(isAggStateCrushed){
                if(size <= 10){
                    waterVOL = 250
                }else if(size > 10 && size <= 20){
                    waterVOL = interpolationFunction(10 , 20 , size , 250 , 225)
                }else if (size > 20 && size <= 40){
                    waterVOL = interpolationFunction(20 , 40 , size , 225 , 205)
                }else{
                    waterVOL = 205
                }
            }else{
                if(size <= 10){
                    waterVOL = 225
                }else if(size > 10 && size <= 20){
                    waterVOL = interpolationFunction(10 , 20 , size , 225 , 195)
                }else if (size > 20 && size <= 40){
                    waterVOL = interpolationFunction(20 , 40 , size , 195 , 175)
                }else{
                    waterVOL = 175
                }
            }
            break;
    }
    return waterVOL
}

function interpolationFunction(Xmin , Xmax , Xneed , Ymin , Ymax ){     // interpolation function 
    let Xratio = Math.abs(Xneed - Xmin) / Math.abs(Xmax - Xmin)
    let Yneed = (Ymax - Ymin) * Xratio + Ymin
    return Yneed
}

function targetStressFunction(Fcu , N , Sigma){    // Fcu unit is kg/cm2       // get target Stress
    // kg/cm2 = N/mm2 * 10.19711013898661
    let Ftarget = 0
    if(N > 40){
        if(Fcu < 20 * fromNmmToKgCm) Ftarget = Fcu + 5.5 * fromNmmToKgCm
        if(Fcu < 40 * fromNmmToKgCm && Fcu >= 20 * fromNmmToKgCm) Ftarget = Fcu + 6 * fromNmmToKgCm
        if(Fcu >= 40 * fromNmmToKgCm) Ftarget = Fcu + 6.5 * fromNmmToKgCm
    }else{
        if(Fcu < 20 * fromNmmToKgCm) Ftarget = Fcu + 8.5 * fromNmmToKgCm
        if(Fcu < 40 * fromNmmToKgCm && Fcu >= 20 * fromNmmToKgCm) Ftarget = Fcu + 10 * fromNmmToKgCm 
        if(Fcu >= 40 * fromNmmToKgCm) Ftarget = Fcu + (6 * fromNmmToKgCm  + 0.1 * Fcu)
    }

    if(Ftarget < ( Fcu + Sigma * 1.64 )) Ftarget = Fcu + Sigma * 1.64

    return Ftarget
}


function waterCementRatioTableStressFunction(isCementTypeRapid , isAggStateCrushed , day){          //     نسبة م إلي س
    // isAggStateCrushed = true             // مكسر
    // isCementTypeRapid = true           // سريع
    let Fcu = 0
    switch(day){
        case 3 :
            if(isCementTypeRapid){
                if(isAggStateCrushed) Fcu = 300
                else Fcu = 250
            }else{
                if(isAggStateCrushed) Fcu = 230
                else Fcu = 180
            }
            break;
        case 7 :
            if(isCementTypeRapid){
                if(isAggStateCrushed) Fcu = 400
                else Fcu = 340
            }else{
                if(isAggStateCrushed) Fcu = 330
                else Fcu = 270
            }
            break;
        case 28 :
            if(isCementTypeRapid){
                if(isAggStateCrushed) Fcu = 530
                else Fcu = 460
            }else{
                if(isAggStateCrushed) Fcu = 470
                else Fcu = 400
            }
            break;
        case 91 :
            if(isCementTypeRapid){
                if(isAggStateCrushed) Fcu = 600
                else Fcu = 530
            }else{
                if(isAggStateCrushed) Fcu = 550
                else Fcu = 480
            }
            break;
    }

    return Fcu
}

function getWaterCementRatio (Ftable , Ftarget){

    let smallestDiff = 100000
    let diffCurve = 0

    for(let i = 0 ; i < 9 ; i ++){
        let difference = Math.abs(Ftable - waterCementGraphFunction(i , 0.5))

        if(difference < smallestDiff) {
            smallestDiff = difference
            diffCurve = i
        }
    }

    let ymax = waterCementGraphFunction(diffCurve , 0.5)
    let ymin = waterCementGraphFunction(diffCurve + 1 , 0.5)
    let diff = Math.abs(ymax - ymin)
    let ratioFromYmin = (Ftable - ymin) / diff
    let xmax = solveEquation(diffCurve , Ftarget)
    let xmin = solveEquation(diffCurve + 1 , Ftarget)
    let waterCementRatio = xmin + Math.abs(xmax - xmin) * ratioFromYmin
    // console.log(ratioFromYmin , diffCurve , xmin, xmax , xmin + (xmax - xmin) * ratioFromYmin)

    return waterCementRatio
}

function waterCementGraphFunction(graphNumber , x){        // water cement ratio graph equations
    let y = [
        102.67 * Math.pow(x , 2) - 236.98 * x + 161.39 ,
        105.34 * Math.pow(x , 2) - 230.17 * x + 147.43 ,
        129.9 * Math.pow(x , 2) - 252.68 * x + 142.78 ,
        -86.593 * Math.pow(x , 3) + 280.97 * Math.pow(x , 2) - 326.93 * x + 143.66  ,
        -167.6 * Math.pow(x , 3) + 449.25 * Math.pow(x , 2) - 424.88 * x + 151.09 ,
        -207.41 * Math.pow(x , 3) + 509.46 * Math.pow(x , 2) - 434.78 * x + 136.34 ,
        -196.22 * Math.pow(x , 3) + 463.4 * Math.pow(x , 2) - 379.22 * x + 113.37 ,
        -120.94 * Math.pow(x , 3) + 296.86 * Math.pow(x , 2) - 250.79 * x + 76.813 ,
        133.1 * Math.pow(x , 4) - 434.19 * Math.pow(x , 3) + 540.58 * Math.pow(x , 2) - 307.04 * x + 70.07 
    ]
    return y[graphNumber] * fromNmmToKgCm
}

function solveEquation(graphNumber , Ftarget){      // solving water cement ratio equations any equation function
    let minDiffValue = 10000
    let tryWaterCement = 0.2
    let finalWaterCement = 0.2
    let y = 0 

    do{
        y = waterCementGraphFunction(graphNumber , tryWaterCement)
        if(Math.abs(Ftarget - y) < minDiffValue){
            minDiffValue = Math.abs(Ftarget - y)
            finalWaterCement = tryWaterCement
        }
        tryWaterCement = tryWaterCement + 0.01

    }while(tryWaterCement < 0.9)

    return finalWaterCement
}

function finalFunction (slump , aggSize , isAggStateCrushed , isCementTypeRapid , day , Fcu , N , Sigma , sandGraphNumber = 'empty'){
    let Ftarget = targetStressFunction(Fcu , N , Sigma)
    let water = waterAmount(aggSize , isAggStateCrushed , slump)
    let tableStress = waterCementRatioTableStressFunction(isCementTypeRapid , isAggStateCrushed , day)
    let WCratio = getWaterCementRatio(tableStress , Ftarget)
    let cement = water/ WCratio

    if(water / WCratio  > 450){
        cement = 450
        water = WCratio * cement
    }

    if(sandGraphNumber == 'empty'){
        if(slump == 'A') sandGraphNumber = 3
        else if(slump == 'B') sandGraphNumber = 2
        else if(slump == 'C') sandGraphNumber = 1
        else if(slump == 'D') sandGraphNumber = 0
    }

    let totalAggVol = 1000 - ( cement/SGcement + water)
    let fineAggVol =  fineAggPresentageFromCourseAgg(slump , aggSize , sandGraphNumber , WCratio)  * totalAggVol
    let largAggVol = totalAggVol - fineAggVol

    console.log(`Fcu stress is    ${Fcu} kg/cm2    target stress is   ${Ftarget} kg/cm2  , water amount is    ${water} liter   , wc ratio is     ${WCratio}      , cement amount is     ${cement} kg  , total aggreget volume    ${totalAggVol} liter , fine aggreget volume     ${fineAggVol} liter  , larg aggreget Volume    ${largAggVol} liter`)

    return {
        Fcu : Fcu ,
        Ftarget : Ftarget ,
        water : water ,
        WC : WCratio ,
        cement : cement ,
        totalAggVol : totalAggVol ,
        fineAggVol : fineAggVol ,
        largAggVol : largAggVol 
    }
}



function fineAggPresentageFromCourseAgg(slump , aggSize , graphNumber , WCratio){   // graphNumber start with zero note plz
    let presentage = 0
    let presentage2 = 0
    function x_10mm__0_10mm (n , x){
        let y = [
            27.766 * x + 42.573 ,
            22.664 * x + 35.121 ,
            17.715 * x + 28.609 ,
            16.073 * x + 22.093 ,
            14.353 * x + 19.664 ,
        ]
        return y[n]
    }
    function x_20mm__0_10mm (n , x){
        let y = [
            26.254 * x + 29.228 , 
            21.368 * x + 23.661 , 
            16.44 * x + 20.149 , 
            13.1 * x + 17.142 , 
            11.564 * x + 14.62 ,
        ]
        return y[n] 
    }
    function x_40mm__0_10mm (n , x){
        let y = [
            25.632 * x + 23.144 , 
            19.881 * x + 18.882 , 
            16.531 * x + 14.911 , 
            16.575 * x + 10.874 , 
            14.937 * x + 8.3463 ,
        ]
        return y[n]         
    }
    function x_10mm__10_30mm (n , x){
        let y = [
            26.595 * x + 45.991 ,
            21.566 * x + 37.526 ,
            18.142 * x + 29.632 ,
            14.874 * x + 24.575 ,
            13.163 * x + 21.119 ,
        ]
        return y[n]        
    }
    function x_20mm__10_30mm (n , x){
        let y = [
            26.879 * x + 31.901 ,
            25.193 * x + 24.411 ,
            16.812 * x + 21.93 ,
            15.095 * x + 17.473 ,
            13.493 * x + 14.928 ,
        ]
        return y[n]        
    }
    function x_40mm__10_30mm (n , x){
        let y = [
            28.154 * x + 24.579 , 
            20.833 * x + 21.235 , 
            16.661 * x + 17.008 , 
            14.785 * x + 13.674 , 
            11.776 * x + 12.444 ,
        ]
        return y[n]         
    }
    function x_10mm__30_60mm (n , x){
        let y = [
            25.042 * x + 50.659 ,
            21.711 * x + 40.595 ,
            16.569 * x + 33.171 ,
            15.021 * x + 27.607 ,
            13.359 * x + 23.096 ,
        ]
        return y[n]        
    }
    function x_20mm__30_60mm (n , x){
        let y = [
            25.461 * x + 36.342 , 
            22.33 * x + 29.246 , 
            17.245 * x + 23.798 , 
            13.981 * x + 19.789 , 
            9.0406 * x + 19.25 ,
        ]
        return y[n]         
    }
    function x_40mm__30_60mm (n , x){
        let y = [
            25.649 * x + 29.179 ,
            19.035 * x + 26.198 ,
            15.765 * x + 20.213 ,
            14.214 * x + 15.637 ,
            12.503 * x + 13.192 ,
        ]
        return y[n]        
    }
    function x_10mm__60_180mm (n , x){
        let y = [
            24.875 * x + 57.32 ,
            21.527 * x + 46.386 ,
            16.419 * x + 37.014 ,
            12.914 * x + 31.196 ,
            13.155 * x + 26.102 ,
        ]
        return y[n]        
    }
    function x_20mm__60_180mm (n , x){
        let y = [
            26.552 * x + 42.956 ,
            21.648 * x + 35.471 ,
            18.162 * x + 27.598 ,
            14.99 * x + 23.508 ,
            14.879 * x + 19.519 ,
        ]
        return y[n]        
    }
    function x_40mm__60_180mm (n , x){
        let y = [
            25.593 * x + 36.182 ,
            17.373 * x + 31.647 ,
            14.013 * x + 24.72 ,
            10.705 * x + 21.822 ,
            12.152 * x + 16.44 ,
        ]
        return y[n]        
    }

    if(aggSize <= 10){
        switch(slump){
            case 'A':
                presentage = ( x_10mm__0_10mm(graphNumber , WCratio) + x_10mm__0_10mm(graphNumber + 1 , WCratio) ) / 2
                break;
            case 'B':
                presentage = ( x_10mm__10_30mm(graphNumber , WCratio) + x_10mm__10_30mm(graphNumber + 1 , WCratio) ) / 2
                break;
            case 'C':
                presentage = ( x_10mm__30_60mm(graphNumber , WCratio) + x_10mm__30_60mm(graphNumber + 1 , WCratio) ) / 2
                break;
            case 'D':
                presentage = ( x_10mm__60_180mm(graphNumber , WCratio) + x_10mm__60_180mm(graphNumber + 1 , WCratio) ) / 2
                break;
        }

        return presentage / 100      // returning value

    }else if(aggSize > 10 && aggSize <= 20){
        switch(slump){
            case 'A':
                presentage = ( x_10mm__0_10mm(graphNumber , WCratio) + x_10mm__0_10mm(graphNumber + 1 , WCratio) ) / 2
                break;
            case 'B':
                presentage = ( x_10mm__10_30mm(graphNumber , WCratio) + x_10mm__10_30mm(graphNumber + 1 , WCratio) ) / 2
                break;
            case 'C':
                presentage = ( x_10mm__30_60mm(graphNumber , WCratio) + x_10mm__30_60mm(graphNumber + 1 , WCratio) ) / 2
                break;
            case 'D':
                presentage = ( x_10mm__60_180mm(graphNumber , WCratio) + x_10mm__60_180mm(graphNumber + 1 , WCratio) ) / 2
                break;
        }
        switch(slump){
            case 'A':
                presentage2 = ( x_20mm__0_10mm(graphNumber , WCratio) + x_20mm__0_10mm(graphNumber + 1 , WCratio) ) / 2
                break;
            case 'B':
                presentage2 = ( x_20mm__10_30mm(graphNumber , WCratio) + x_20mm__10_30mm(graphNumber + 1 , WCratio) ) / 2
                break;
            case 'C':
                presentage2 = ( x_20mm__30_60mm(graphNumber , WCratio) + x_20mm__30_60mm(graphNumber + 1 , WCratio) ) / 2
                break;
            case 'D':
                presentage2 = ( x_20mm__60_180mm(graphNumber , WCratio) + x_20mm__60_180mm(graphNumber + 1 , WCratio) ) / 2
                break;
        }

        return interpolationFunction(10 , 20 , aggSize , presentage , presentage2) / 100

    }else if(aggSize <= 40 && aggSize > 20){
        switch(slump){
            case 'A':
                presentage = ( x_20mm__0_10mm(graphNumber , WCratio) + x_20mm__0_10mm(graphNumber + 1 , WCratio) ) / 2
                break;
            case 'B':
                presentage = ( x_20mm__10_30mm(graphNumber , WCratio) + x_20mm__10_30mm(graphNumber + 1 , WCratio) ) / 2
                break;
            case 'C':
                presentage = ( x_20mm__30_60mm(graphNumber , WCratio) + x_20mm__30_60mm(graphNumber + 1 , WCratio) ) / 2
                break;
            case 'D':
                presentage = ( x_20mm__60_180mm(graphNumber , WCratio) + x_20mm__60_180mm(graphNumber + 1 , WCratio) ) / 2
                break;
        }
        switch(slump){
            case 'A':
                presentage2 = ( x_40mm__0_10mm(graphNumber , WCratio) + x_40mm__0_10mm(graphNumber + 1 , WCratio) ) / 2
                break;
            case 'B':
                presentage2 = ( x_40mm__10_30mm(graphNumber , WCratio) + x_40mm__10_30mm(graphNumber + 1 , WCratio) ) / 2
                break;
            case 'C':
                presentage2 = ( x_40mm__30_60mm(graphNumber , WCratio) + x_40mm__30_60mm(graphNumber + 1 , WCratio) ) / 2
                break;
            case 'D':
                presentage2 = ( x_40mm__60_180mm(graphNumber , WCratio) + x_40mm__60_180mm(graphNumber + 1 , WCratio) ) / 2
                break;
        }

        return interpolationFunction(20 , 40 , aggSize , presentage , presentage2) / 100
    }else{
        switch(slump){
            case 'A':
                presentage = ( x_40mm__0_10mm(graphNumber , WCratio) + x_40mm__0_10mm(graphNumber + 1 , WCratio) ) / 2
                break;
            case 'B':
                presentage = ( x_40mm__10_30mm(graphNumber , WCratio) + x_40mm__10_30mm(graphNumber + 1 , WCratio) ) / 2
                break;
            case 'C':
                presentage = ( x_40mm__30_60mm(graphNumber , WCratio) + x_40mm__30_60mm(graphNumber + 1 , WCratio) ) / 2
                break;
            case 'D':
                presentage = ( x_40mm__60_180mm(graphNumber , WCratio) + x_40mm__60_180mm(graphNumber + 1 , WCratio) ) / 2
                break;
        }

        return presentage / 100
    }

    
}

function quantitiesTransform(cement , cementDensity , largAggVol , largAggDensity , largAggSpecificWeight , smallAggVol , smallAggDensity , smallAggSpecificWeight , water , size){
    let cementSacsFunction = detectSacsofCement(size , cement)
    let newCement = cementSacsFunction.cementSacs
    let ratio = cementSacsFunction.ratio
    // let quality = (largAggVol * size + smallAggVol * size + water * size + (cement / cementDensity) )
    return {
        Cement : newCement ,
        largAggLiter : largAggVol * ratio ,
        smallAggLiter : smallAggVol * ratio ,
        waterLiter : water * ratio ,
        largAggMeter : largAggVol * ratio *  largAggDensity / largAggSpecificWeight,
        smallAggMeter : smallAggVol * ratio *  smallAggDensity / smallAggSpecificWeight,
        waterMeter : water * ratio * Math.pow(10 , -3),
        efficiency : ratio / size
    }
}

function detectSacsofCement(size , mainCement){
    let ratio 
    let cementSacs
    let newCement = mainCement * size / 50
    let roundNewCement = Math.round(newCement)
    if(roundNewCement > newCement){
        if(newCement / roundNewCement  > 0.95){
            ratio = newCement / (mainCement / 50)
            cementSacs = roundNewCement
        }else{
            cementSacs = roundNewCement - 0.5
            ratio = cementSacs / (mainCement / 50)
        }
    }else{
        if(newCement / (roundNewCement + 0.5) > 0.95){
            ratio = newCement / (mainCement / 50)
            cementSacs = roundNewCement + 0.5
        }else{
            cementSacs = roundNewCement
            ratio = cementSacs / (mainCement / 50 )
        }
    }

    return {cementSacs , ratio}
}