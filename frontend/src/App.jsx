import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Books from './pages/books/Books';
import RegisterOrLogin from './pages/registerOrLogin/RegisterOrLogin';
import Homepage from './pages/homePage/Homepage';

function App() {

  return (
    <>
      <BrowserRouter>
       <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path='/login' element={<RegisterOrLogin pageName={'login'} />}/>
          <Route path='/register' element={<RegisterOrLogin pageName={'register'}/>}/>
          <Route path='/books' element={<Books />}/>
       </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
