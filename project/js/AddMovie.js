import React, { useEffect, useState } from 'react'

function MovieManager() {

const API = "http://localhost:3000";

const [name, setName] = useState("")
const [genres, setGenres] = useState("")
const [directors, setDirectors] = useState("")
const [image, setImage] = useState("")

const [data, setData] = useState([])
const [dergo, setDergo] = useState(false);

const randomId = Math.floor(Math.random() * 10000).toFixed(0)

const handleSubmit = (event) => {
event.preventDefault();
setDergo(true)

}

const postForm = async () => {

    const data = {
    id: parseInt(randomId).toString(),
    name: name,
    genres: genres,
    image : image,
    directors: directors
    }
   

    await fetch(`${API}/movies`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
    "Content-Type": "application/json"
    }
    })
    .then(response => response.json())
    .then(data => {
    console.log(data);
    })
    .catch(error => {
    console.log(error);
    });

}



useEffect(() => {
if(dergo === true) {
postForm();

} else {
return
}

},[dergo])


return (
<>
  <form onSubmit={handleSubmit} className='forma'>
    <input type="text" placeholder="Type the name of the movie"  value={name} onChange={(e)=> setName(e.target.value)}/><br/>
    <input type="text" placeholder="Choose the genres" value={genres} onChange={(e)=> setGenres(e.target.value)}/><br/>
    <input type="text" placeholder="Made By" value={directors} onChange={(e)=> setDirectors(e.target.value)}/><br/>
    <input type="text" placeholder="Image" value={image} onChange={(e)=> setImage(e.target.value)}/><br/>
    <button type="submit" name="button" value="submit">Submit</button>
  </form>
  
 


</>
)
}

export default MovieManager