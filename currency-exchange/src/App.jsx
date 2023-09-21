
import './App.css'
import { Route, Routes } from 'react-router-dom';
import ConverterMainPage from './components/ConverterMainPage/ConverterMainPage';
import MenuBar from './components/MenuBar/MenuBar';
import MyWalletContainer from './components/MyWallet/MyWalletContainer';
import ChartPage from './components/ChartPage/ChartPage';
import AboutPage from './components/AboutPage/AboutPage';



function App() {



  return (
    <>
    <div>
      <MenuBar />
      <section>
        <div className="container">
          <Routes>
            <Route path="/" element={<ConverterMainPage />}></Route>
            <Route path="/mywallet" element={<MyWalletContainer />}></Route>
            <Route path="/chartpage" element={<ChartPage />}></Route>
            <Route path="/about" element={<AboutPage />}></Route>
          </Routes>
        </div>
      </section>
    </div>
    </>
  )
}

export default App

