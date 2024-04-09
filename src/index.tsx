import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Changed import statements
import reportWebVitals from './reportWebVitals';
import Admin from './admin';
import About from './about';
import Home from './home';
import { Sign } from 'crypto';


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} /> {}     
      <Route path="/admin" element={<Admin />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
