import { useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const [file , setFile ] = useState(null);

  const handleFile = (e) =>{
    setFile(e.target.files[0]);
  }

  const handleSubmt = async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('profileImage' , file)

    try{
      const responce = await axios.post('http://localhost:3001/upload' , formData , {
        headers : {
          "Content-Type" : 'multipart/form-data'
        }
      }) 
    } 
    catch(e){
      console.log(e)
    }
  }
  
  return (
    <div className="App">
      <form>
          <input type='file' onChange={handleFile}></input>
          <button type='submit' onClick={handleSubmt}>Upload</button>
      </form>
    </div>
  );
}

export default App;
