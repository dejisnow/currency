import React from "react"


export function InputComp(values){
    let {
        listOfCurrencies,
        currentCurrency,
        
    } =values

    return(
    <div>
       
        <select  >
            {listOfCurrencies?listOfCurrencies.map(list =>(
                <option key ={list} value ={currentCurrency}>{list}</option>
            )): ""}
        </select>
        <input type='number' className='input' />


    </div>
    )
}
