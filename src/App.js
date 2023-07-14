
import './App.css';
import { InputComp } from './input-component';
import './currency checker.css';
import {useEffect,useState} from 'react';
import transfer_svg from './img/undraw_transfer_money_re_6o1h.svg'
import wallet_svg from './img/undraw_wallet_re_cx9u.svg'


const ratesAPI = 'http://api.exchangeratesapi.io/v1/latest?access_key=8e6944764ada511be75222352bed9266'



function App() {
const [currencyList ,setCurrencyList]= useState([])
const [firstCurrency, setFirstCurrency] =useState()
const [nextCurrency, setNextCurrency] =useState()
const [inputChange, setInputChange]= useState(true)
const [currencyAmount , setCurrencyAmount] = useState(1)
const [currentExchangeRate, setcurrentExchangeRate] = useState()



let firstInput, nextInput ;
if(inputChange){
  firstInput = currencyAmount
  nextInput = currencyAmount * currentExchangeRate
}else{
  nextInput = currencyAmount
  firstInput = currencyAmount / currentExchangeRate
}



useEffect(()=>{
  fetch(ratesAPI).then(response=>response.json()).then(data=>{

    let firstInputCurrency =Object.keys(data.rates)[150]
    let nextInputCurrency = Object.keys(data.rates)[106]
 
    console.log(Object.keys(data.rates["USD"]))
    setCurrencyList([data.rates,...Object.keys(data.rates)])
    setFirstCurrency(firstInputCurrency)
    setNextCurrency(nextInputCurrency)
    setcurrentExchangeRate(data.rates[nextInputCurrency])
   
  })
},[])

useEffect(()=>{
  if (firstCurrency !== null && nextCurrency !== null){
fetch(`${ratesAPI}?base=${firstCurrency}&symbols=${nextCurrency}`)
.then(response=> response.json())
.then(data =>
 
  setcurrentExchangeRate(data.rates[nextCurrency]))

  } 
},[firstCurrency, nextCurrency])

function changeInFirstInput(e){
  setCurrencyAmount(e.target.value)
  setInputChange(true)

}
function changeInNextInput(e){
  setCurrencyAmount(e.target.value)
  setInputChange(false)

}
  return (
    <div className='main-container'>
      <h1>Currency Checker</h1>
      <main className='main'>
        <div className='container'>  
            <InputComp listOfCurrencies={currencyList} 
           handleChange={e=> setFirstCurrency(e.target.value)}
            currentCurrency ={firstCurrency} 
            inputAmount = {firstInput}
            inputChange={changeInFirstInput}
            />
            <span> <a href="https://www.flaticon.com/free-icons/more"></a>  </span>

            <InputComp listOfCurrencies={currencyList}
            handleChange={(e=>  setNextCurrency(e.target.value))}
             currentCurrency={nextCurrency}
             inputAmount = {nextInput}
             inputChange={changeInNextInput}
             />
        </div> 
        <img className='transferSvg' src={transfer_svg}></img>
       
      </main>
      <footer>
      <img src={wallet_svg}></img>
        </footer> 
    </div>
 
  );
}

export default App;


//`${ratesAPI}?base=${firstCurrency}&symbols=${nextCurrency}`
//`http://api.exchangeratesapi.io/v1/convert?access_key=8e6944764ada511be75222352bed9266&from=${firstCurrency}&to${nextCurrency}&amount=2