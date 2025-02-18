import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, [])
  

  const fetchBooks = async () => {
    try{
      const response = await fetch('http://127.0.0.1:8000/api/books/');
      const data = await response.json()
      console.log(data)
    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
      <h1>book website</h1>

      <form>
        <input type="number" placeholder='Title' />
        <input type="text" placeholder='Release year' />
        <button>Add book</button>
      </form>
    </>
  )
}

export default App;
