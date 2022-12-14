import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Disclaimer from '../Disclaimer/Disclaimer';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import InnPage from '../InnPage/InnPage';
import MainPage from '../MainPage/MainPage';
import TransparentBuisness from '../TransparentBuisness/TransparentBuisness';

function App() {
  return (
    <div className="body">
      <div className='page'>
        <Header />
        <main className='main'>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/inn' element={<InnPage />} />
            <Route path='/buisness' element={<TransparentBuisness />} />
          </Routes>
        </main>
        <Footer />
        <Disclaimer />
      </div>
    </div>
  );
}

export default App;
