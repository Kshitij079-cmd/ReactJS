// eslint-disable-next-line no-undef
//defined the tasked perfomed by reducer function
const reducer = (state=0, action)=>{
 if(action.type==="deposit"){
    return state+action.payload;
    }
 else if(action.type==="withdraw"){
    return state-action.payload;
    }
else{
    return state;
}
} 
export default reducer