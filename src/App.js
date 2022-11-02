
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
import Home from './Components/Client/Home';
//auth


function App() {
  const { user, loading, error } = useUserContext();
  return (
   <>
    <div className="App">


      {/* <Slideshow /> */}
      {/* {error && <p className="error">{error}</p>}
      {loading ? <h2>Loading...</h2> : <> {user ? ( <BrowserRouter>
      <Layout/>
        <Routes>
          <Route path="/" element={<AddResource/>}/>
          <Route path="movies" element={ <Realtime/> } />
          <Route path="movies" element={ <Client /> } />
          <Route path="contact" element={ <Contact/> } />
        </Routes>
      </BrowserRouter>) : <Auth />} </>} */}
{error && <p className="error">{error}</p>}
      {loading ? <h2>Loading...</h2> : <> {user ? ( 
      <>
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
            <div className='ttcont'>
              <div className='top-title'>
                  GDSC KIMATHI
              </div>
            </div> 
            </>
            ) : <Auth />} </>}
    </div>

   </>
  );
}

export default App;
