export const depositMoney = (amount)=>{
    //will add money in balance
   
    return(dispatch)=>{ //return function which has some amout to add in account
        dispatch({
            type:'deposit',
            payload:amount,
        } 
    )
    }
}
export const withdrawMoney = (amount)=>{
    //will subtract money from balance
    return(dispatch)=>{ //return function which has some amout to add in account
        dispatch({
            type:'withdraw',
            payload:amount,
        })
    }

}