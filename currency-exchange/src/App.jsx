import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import ConverterMainPage from './components/ConverterMainPage/ConverterMainPage';
import MenuBar from './components/MenuBar/MenuBar';
import MyWalletContainer from './components/MyWallet/MyWalletContainer';
import ChartPage from './components/ChartPage/ChartPage';


function App() {

 

  return (
    <>
      <MenuBar />
      <section className="section">
        <div className="container">
          <Routes>
            <Route path="/mainpage" element={<ConverterMainPage />}></Route>
            <Route path="/mywallet" element={<MyWalletContainer />}></Route>
            <Route path="/chartpage" element={<ChartPage />}></Route>
          </Routes>
        </div>
      </section>
    </>
  )
}

export default App

