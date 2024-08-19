
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TopNav from './Component/TopNav';
import Home from './Component/Home';
import NavContext from './context/navContext';

function App() {
  const routing = createBrowserRouter([{
    path: '/',
    element: (<>
    <TopNav />
    <div className="App">
        <Home/>
    </div>
    </>

    )
  }])
  return (
  <NavContext>
<div className=''>
  <RouterProvider router={routing} />
</div>
  </NavContext>
  );
}

export default App;
