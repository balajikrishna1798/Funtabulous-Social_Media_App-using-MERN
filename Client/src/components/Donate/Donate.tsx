import React, { useState } from 'react'
import { payment } from '../../api';
import './Donate.css'
const Donate = () => {

    const user = JSON.parse(localStorage.getItem('profile'));
    const [quantity,setQuantity]:any = useState()
    const amount = 20;

    const handlePay = () =>{
       
        payment({amount,quantity}).then((res)=>{

            if(res.data.url){
        
                window.location.href = res.data.url
        
                console.log(res.data.url)
        
            }
        
        })
        
        .catch((err)=>{
        
            console.log(err.message);
        
        
        
           })
    }
  return (
    <div className='container donate position-fixed'>   
<input type="number" className='w-25 mt-4 form-control shadow-none' placeholder="Amount" value={amount} disabled></input><br/>
<input type="number" className='w-25 mt-1 form-control shadow-none' placeholder="Quantity" min="1" value={quantity} onChange={(e)=>setQuantity(e.target.value)}></input><br/>

<button className='p-1 btn btn-danger w-25' onClick={handlePay}>Button</button>
</div>
  )
}

export default Donate