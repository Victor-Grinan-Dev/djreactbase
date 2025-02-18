import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [release_year, setRelease_year] = useState(0);
  const [newTitle, setNewTitle] = useState('');
  const [newRelease_year, setNewRelease_year] = useState(0);

  useEffect(() => {
    fetchBooks();
  }, [])
  
  const fetchBooks = async () => {
    try{
      const response = await fetch('http://127.0.0.1:8000/api/books/');
      const data = await response.json()
      setBooks(data)
      // console.log(data)
    }catch(error){
      console.log(error)
    }
  }

  const addBook = async (e) => {
    e.preventDefault()
    const bookData = {
      title,
      release_year:release_year,
    }
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/create/", {
        method:"POST",
        headers: {
          'Content-Type':'application/json',
        },
        body:JSON.stringify(bookData)
      }) 
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }finally{
      fetchBooks();
    }
  }

  const editBook = async (id) => {
    const bookData = {
      title:newTitle,
      release_year:newRelease_year,
    }
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/detail/${id}`, {
        method:"PUT",
        headers: {
          'Content-Type':'application/json',
        },
        body:JSON.stringify(bookData)
      }) 
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }finally{
      fetchBooks();
    }
  }

  const deleteBook = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/detail/${id}`, {
        method:"DELETE",
        headers: {
          'Content-Type':'application/json',
        },
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
        <input type="number" placeholder='Release year' onChange={(e)=>setRelease_year(e.target.value)} />
        <button>Add book</button>
      </form>
      <ol>
        {books && books.map((b,i)=>(
            <li key={i} >
              <p>"{b.title}", released in {b.release_year}  <input type="text" placeholder='New title' onChange={(e)=>setNewTitle(e.target.value)}/> <input type="number" placeholder='Release year' onChange={(e)=>setNewRelease_year(e.target.value)} /> <button onClick={()=>editBook(b.id)}>edit</button> <button onClick={()=>deleteBook(b.id)}>X</button></p>
            </li>
        ))}
      </ol>

    </>
  )
}

export default App;
