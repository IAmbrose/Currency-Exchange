import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState({})

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        `https://api.frankfurter.app/2020-01-01..2020-01-31`
      );
      const data = await response.json();
      setCount(data);
      console.log(data)
    };
    fetchUsers();
  }, []);

  return (
    <>
      <h1>Project API Testing</h1>
    </>
  )
}

export default App

