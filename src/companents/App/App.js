import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import InnPage from '../InnPage/InnPage';
import MainPage from '../MainPage/MainPage';

function App() {
  return (
    <div className="body">
      <div className='page'>
        <Header />
        <main className='main'>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/inn' element={<InnPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
