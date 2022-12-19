import React, {useState} from 'react'


const Movies = (props) => {

  const API = "http://localhost:3000";

  const [name, setName] = useState("")
  const [genres, setGenres] = useState("")
  const [directors,setDirectors ] = useState("")
  const [image,setImage ] = useState("")
  const [dergo, setDergo] = useState(false);

  const data = {
    name: name,
    genres: genres,
    image: image,
    directors: directors
  };
  
  const update = async (e) =>{
    
    e.preventDefault();
    
    console.log(props.movieId);
    
   await fetch(`${API}/movies/${props.movieId}`, {
      method: "PUT",
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

  return (
    <>
    <form onSubmit={update}>
  
    <input type="text" placeholder="name" value={name} onChange={(e)=> setName(e.target.value)}/>

    <input type="text" placeholder="genres" value={genres} onChange={(e)=> setGenres(e.target.value)}/>

    <input type="text"  placeholder="directors" value={directors} onChange={(e)=> setDirectors(e.target.value)}/>

    <input type="text"  placeholder="image" value={image} onChange={(e)=> setImage(e.target.value)}/>


    <input type="submit" name="button" value="submit" />
    </form>
  </>
  )
}

export default Movies