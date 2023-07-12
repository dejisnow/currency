
import './App.css';
import { InputComp } from './input-component';
import './currency checker.css';
import {useEffect,useState} from 'react';
import images from './img/1479693931556105309-128.png'


import { ImgComp } from './imgComp';

const ratesAPI = 'http://api.exchangeratesapi.io/v1/latest?access_key=8e6944764ada511be75222352bed9266'


function App() {
const [currencyList ,setCurrencyList]= useState([])
const [firstCurrency, setFirstCurrency] =useState()
const [nextCurrency, setNextCurrency] =useState()



useEffect(()=>{
  fetch(ratesAPI).then(response=>response.json()).then(data=>{
    let currencyKeys = Object.keys(data.rates)
    console.log(currencyKeys)
   
    function indexOfUSD(x,y){
      if(x)
      
      return x.indexOf(y)
    }
    function indexOfNGN(x,y){
      if(x)
      
      return x.indexOf(y)
    }

    let indexOfusd =indexOfUSD(currencyKeys,"USD")
    let indexOfngn =indexOfNGN(currencyKeys,"NGN")
    
    setCurrencyList([...Object.keys(data.rates)])
    setFirstCurrency(Object.keys(data.rates)[indexOfusd])

    setNextCurrency(Object.keys(data.rates)[indexOfngn])
   
  })
},[]


)
  return (
    <div className='main-container'>
      <h1>Currency Checker</h1>
      <main className='main'>
        <div className='container'>  
            <InputComp listOfCurrencies={currencyList} currentCurrency ={firstCurrency} />
            <span> <a href="https://www.flaticon.com/free-icons/more"></a>  </span>
            <InputComp listOfCurrencies={currencyList} currentCurrency={nextCurrency} />
        </div> 
          
      </main>
      <footer>
        <img src={images}></img></footer> 
    </div>
 
  );
}

export default App;
