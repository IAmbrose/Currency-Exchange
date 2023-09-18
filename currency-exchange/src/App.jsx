import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import ConverterMainPage from './components/ConverterMainPage/ConverterMainPage';
import MenuBar from './components/MenuBar/MenuBar';


function App() {

 

  return (
    <>
      <MenuBar />
      <section className="section">
        <div className="container">
          <Routes>
            <Route path="/mainpage" element={<ConverterMainPage />}></Route>
          </Routes>
        </div>
      </section>
    </>
  )
}

export default App

