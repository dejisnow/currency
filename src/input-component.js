import React from "react"


export function InputComp(values){
    let {
        listOfCurrencies,
        currentCurrency,
        handleChange,
        inputAmount,
        inputChange,
        
    } =values

 

    
        

    

    return(
    <div>
       
        <select value={currentCurrency} onChange={handleChange} >
            {listOfCurrencies.map(list =>(
                <option key ={list} value ={list}>{list}</option>
            ))}
        </select>
        <input type='number' className='input' value = {inputAmount} onChange={inputChange}/>


    </div>
    )
}
