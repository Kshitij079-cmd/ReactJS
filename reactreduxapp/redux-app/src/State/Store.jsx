import { configureStore } from '@reduxjs/toolkit'
// import { createStore, applyMiddleware } from 'redux'// depreciated way

// import thunk from 'edux-thunk' //thunk is included in configureStore
import  reducers  from "./reducer/"

const store = configureStore(
    {
        reducer: reducers,
        //check ./reducer/index.js

    }
)
// const store = createStore(
//     reducers, {}, applyMiddleware(thunk)
// )
export default store;