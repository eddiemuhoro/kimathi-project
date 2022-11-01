
import './App.css'
import './index.css'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Grid } from '@material-ui/core';
import { useUserContext } from './Components/Authentication/context/userContext';
import Auth from './Components/Authentication/components/auth';

import NavBar from './Components/Layout/NavBar';
import All from './DynamicRouting/All';
import Single from './DynamicRouting/Single';
import Client from './Components/Client';
import AddResource from './Components/AddResource';
import AddNews from './Components/AddNews';
import Resources from './Components/Client/Resources';
import Slideshow from './Components/Client/Slider';
import News from './Components/Client/News';
import Leads from './Components/Client/Leads';
function App() {
  const { user, loading, error } = useUserContext();
  return (
   <>
    <div className="App">


      {/* <Slideshow /> */}

      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Client/>}/>
          <Route path="resource" element={ <Resources /> } />
          <Route path="news" element={ <News/> } />
        </Routes>

      </BrowserRouter>
      <div className='leads-info'>
              <Leads/>
            </div>
    </div>

   </>
  );
}

export default App;
