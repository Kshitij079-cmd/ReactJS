import React,{useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../State'

const Shop = () => {
  const dispatch = useDispatch()
  const { withdrawMoney, depositMoney } = bindActionCreators(actionCreators, dispatch)
  const state = useSelector(
    (state) => state.amount
  )
  return (
  
    <div><h1>Buy adibas shoes worth 450rs</h1>
      <button className="btn btn-primary" onClick={()=>withdrawMoney(150)}disabled={state===0}>-</button>
      Add this item to cart
      <button className="btn btn-primary" onClick={()=>depositMoney(150)}>+</button>
    </div>

  )
}

export default Shop
