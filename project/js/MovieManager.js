import { faBlackboard, faDisplay } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react'
import Movies from './Movies';




function MovieManager() {

    // const API = "https://dummyjson.com";
    const API = "http://localhost:3000";

    const [loaded, setLoaded] = useState(false)
    const [data, setData] = useState([])


    const [updateForm, setUpdateFrom] = useState(false)

    const [IdOfMovie, setIdOfMovie] = useState()

    useEffect(() => {
        fetch(`${API}/movies`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setLoaded(true)
            setData(data)
        })
        .catch(error => {
            console.log(error);
        });
    },[])

    const handleSold = (event, id) => {
        event.preventDefault();

        fetch(`${API}/movies/${id}`, {
            method: "DELETE"
          })
            .then(response => {
                setData(data)
            })
            .catch(error => {
              console.log(error);
            });
    }

    const showFormUpdate = (e, id) => {
        
        setIdOfMovie(id)
        
        setUpdateFrom(true)
    }   

  return (
    <>
    
    <div className='wrapper'> 
        {   loaded && data.length ? 
            data.map((el,index) => {

              return       <div key={index} className="card" >
                 <img className="card-img-top" src={el.image} alt="Card image cap"></img>
                 <div className="card-body">
                   <h1 className="card-title">{el.name}</h1>
                   <h2>{el.genres}</h2>
                   <p>Directed by: {el.directors}</p>
                   <button type="button" onClick={(event) => handleSold(event, el.id)}>Delete Movie</button>
                      <button onClick={(e) => showFormUpdate(e, el.id)} >Update Movie</button> 
                 </div>
               </div>
     
              
              
            })
            :
            <h1>Loading</h1>
        }    
     </div>

        {   updateForm ?

<Movies movieId={IdOfMovie} />
            : 
            null
          }   


     </>
  )
}


export default MovieManager
// <div key={index} > 
  //     <img src={el.image}></img>
  //        <h1>{el.name}</h1>
  //         <h3>{el.genres}</h3> 
  //         <p>Directed by: {el.directors}</p>
  
  //         <button type="button" onClick={(event) => handleSold(event, el.id)}>WATCH NOW</button>
  
  //         <button onClick={(e) => showFormUpdate(e, el.id)} >Update Movie</button> 
  //     </div>
  // (
    
    
    
    // )
              //   return       <div key={index} className="card" >
              //   <img className="card-img-top" src={el.image} alt="Card image cap"></img>
              //   <div className="card-body">
              //     <h1 className="card-title">{el.name}</h1>
              //     <h2>{el.genres}</h2>
              //     <p>Directed by: {el.directors}</p>
              //     <button type="button" onClick={(event) => handleSold(event, el.id)}>WATCH NOW</button>
              //        <button onClick={(e) => showFormUpdate(e, el.id)} >Update Movie</button> 
              //   </div>
              // </div>