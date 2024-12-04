import { Provider } from 'react-redux';
import Header from './components/Header/Header'
import {store} from './store';
import {Route, Routes, Router, BrowserRouter } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage'
import RegisterPage from './components/RegisterPage/RegsiterPage'

function App() {
  return (
    <Provider store = {store}>
    <BrowserRouter>
      <div className='App'>
        App
          <Header />
          <Routes>
            <Route path="/" element={<HomePage/>}/> 
            {/* <Route path="/login" element={<LoginPage/>}/> */}
            <Route path="/register" element={<RegisterPage/>}/>
          </Routes>
      </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
