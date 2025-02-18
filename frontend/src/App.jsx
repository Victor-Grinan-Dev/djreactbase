import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [released, setReleased] = useState(0);

  useEffect(() => {
    fetchBooks();
  }, [])
  
  const fetchBooks = async () => {
    try{
      const response = await fetch('http://127.0.0.1:8000/api/books/');
      const data = await response.json()
      setBooks(data)
    }catch(error){
      console.log(error)
    }
  }

  const addBook = async (e) => {
    e.preventDefault()
    const bookData = {
      title,
      release_year:released,
    }
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/create/", {
        method:"POST",
        headers: {
          'Content-Type':'application/json',
        },
        body:JSON.stringify(bookData)
      }) 
    } catch (error) {
      console.log(error)
    }finally{
      fetchBooks();
    }
  }

  return (
    <>
      <h1>book website</h1>

      <form onSubmit={addBook}>
        <input type="text" placeholder='Title' onChange={(e)=>setTitle(e.target.value)}/>
        <input type="number" placeholder='Release year' onChange={(e)=>setReleased(e.target.value)} />
        <button>Add book</button>
      </form>
      <ol>
        {books && books.map((b,i)=>(
            <li key={i} >
              <p>"{b.title}", released in {b.release_year}</p> <input type="text" placeholder='New title'/>
            </li>
        ))}
      </ol>

    </>
  )
}

export default App;
