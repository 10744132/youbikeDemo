import './App.scss';
import Header from './components/header/Header';
import SiteData from './pages/sitedata/SiteData';
import Demo from './demo';
import Site from './pages/sitedata/Site';
import {Routes,
  Route} from 'react-router-dom';
function App() {
  return (
    <>
    <div className="App">
    <Header/>
    </div>
    <Routes>
      <Route exact path="/" element={<Site />} />
      <Route  path="/use"  element={<Site />}/>
      <Route  path="/act"  element={<Site />}/>
      <Route  path="/news" element={<Site />} />
      <Route  path="/pay" element={<Site />} />
    </Routes>
    </>
  );
}

export default App;
