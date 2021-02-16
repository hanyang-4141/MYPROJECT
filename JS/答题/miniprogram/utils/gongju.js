// 保留小数位数
let keepTwoDecimal = (num,int)=>{
  var result = parseFloat(num)
  let beishu = 10 ** int
  if (isNaN(result)){
    alert('参数错误')
    return false
  }
  result = Math.round(num * beishu) /beishu
  return result
}
// 毫安值->温度
let MVToTemp = V =>{
  let C0=[0,25.08355,0.07860106,-0.2503131,0.0831527,-0.01228034,0.0009804036,-0.0000441303,0.000001057734,-0.00000001052755]
  let C1=[-131.8058,48.30222,-1.646031,0.05464731,-0.0009650715,0.000008802193,-0.0000000311081]
  let C2=[0,25.173462,-1.1662878,-1.0833638,-0.8977354,-0.37342377,-0.086632643,-0.010450598,-0.00051920577]
  let temp=0.0
  // let V = this.data.currentMV
  if (V < 0){
    for(let i=0; i<9; i++){
      temp = temp + C2[i] * (V**i)
    }
  }        
  else if (V >= 0 && V < 20.644){
    for(let i=0; i<10; i++){
      temp=temp+C0[i] * (V**i)
    }      
  }       
  else if (V>=20.644){
    for(let i=0; i<7; i++){
      temp=temp+C1[i] * (V**i)
    }      
  }      
  return keepTwoDecimal(temp, 3)
}

// 温度->毫安值
let TempToMV = temperature =>{   
  // let temperature = this.data.currentTemp
  let C = [-1.7600413686E1,3.8921204975E1,1.8558770032E-2,-9.9457592874E-5,3.1840945719E-7,-5.6072844889E-10,5.6075059059E-13,-3.2020720003E-16,9.7151147152E-20,-1.2104721275E-23]
  let C0 = [3.9450128025E1, 2.3622373598E-2, -3.2858906784E-4, -4.9904828777E-6, -6.7509059173E-8,-5.7410327428E-10, -3.1088872894E-12, -1.0451609365E-14, -1.9889266878E-17, -1.6322697486E-20]
  let a0 =1.185976E2
  let a1 = -1.183432E-4
  let V = 0
  if (temperature < 0)
  {
    for(let i=0; i<10; i++)
    {
      V = V + C0[i] * (temperature**(i+1)) 
    }
    // console.log(this.keepTwoDecimal(V/1000,3));      
    // return 0
  }        
  else
  {
    for(let i = 0; i < 10; i++)
    {
      V = V + C[i] * (temperature**i)
    }
    V = V + a0 * Math.exp(a1 * ((temperature-126.9686)**2))   
    // console.log(V/1000);
    // return V
  }
  return keepTwoDecimal(V/1000,3)
}

// 温度->电阻
let TempToResist = Temp => {    
  const A = 3.9083e-3
  const B = -5.775e-7
  const C = -4.183e-12 
  let Resist = 0   
  // let Temp = this.data.currentTemp_R   
  if (Temp >= -200 && Temp < 0){
    Resist=100*(1+A*Temp+B*(Temp**2)+C*(Temp-100)*(Temp**3))
  }
  else if (Temp>=0 && Temp<=850){
    Resist=100*(1+A*Temp+B*Temp*Temp)
  }
  else{
    return false
  }  
  // console.log(this.keepTwoDecimal(Resist,2));
  
  return keepTwoDecimal(Resist,3)
}

// 电阻->温度
let ResistToTemp = Resist => {
  const A = 3.9083e-3
  const B = -5.775e-7
  const C = -4.183e-12 
  // let Resist = this.data.currentResist
  let ft0=(Resist/100-1)/A
  let ft = 0
  if (Resist >= 18.52 && Resist < 100){
    for(let i=0; i<50; i++){
      ft=ft0+(Resist-100*(1+ A * ft0 + B * (ft0**2) - 100 * C * (ft0 **3) + C * (ft0 **4)))/(100 * (A + 2 * B * ft0 - 300 * C * (ft0 **2) + 4 * C * (ft0 **3)))
          if (Math.abs(ft-ft0)<0.001){
            break
          }
          else{
            ft0=ft
          }
    }
  }
  else if (Resist >=100 && Resist <= 390.481){
    for(let i=0; i<50; i++){
      ft=ft0 + (Resist - 100 * (1 + A * ft0 + B * (ft0**2)))/(100 * (A + 2 * B * ft0))
          if (Math.abs(ft-ft0)<0.001){
            break
          }
          else{
            ft0=ft
          }
    }
  }
  else{
    return null
  }
  // console.log(this.keepTwoDecimal(ft,2));
  return keepTwoDecimal(ft,3)
}



module.exports = {
  keepTwoDecimal: keepTwoDecimal,
  MVToTemp: MVToTemp,
  TempToMV: TempToMV,
  TempToResist: TempToResist,
  ResistToTemp: ResistToTemp
}