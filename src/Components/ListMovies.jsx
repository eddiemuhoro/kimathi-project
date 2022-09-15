import React from 'react'
import { useEffect, useState } from 'react'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../lib/init-firebase'
import { Button, Card, CardActionArea, CardActions, CardContent, CircularProgress, Typography } from '@material-ui/core'
import Realtime from './Realtime'
const ListMovies = () => {
    const [movies, setMovies] = useState([])

    useEffect(()=>{
         getMovies()
    }, [])

    useEffect(()=>{
        console.log(movies)
    },[movies])

    const getMovies= ()=>{
        const movieCollectionRef = collection(db, 'movies')
        getDocs(movieCollectionRef)
        .then(responce=>{
            
            const movs = responce.docs.map(doc=>({
                data:doc.data(),
                 id: doc.id,
                }))
                
             setMovies(movs)
        })
        .catch(error => console.log(error.message))
    }

    const deleteMovie= (id)=>{ 
        const docRef = doc(db, 'movies', id)
        deleteDoc(docRef)
        .then( ()=> alert('Movie deleted'))
        .catch(error => console.log(error.message))
    }
  return (
    <div>
        <button style={{margin: '20px'}} onClick={()=> getMovies()}>Refresh</button>
        
            <h4>Movies</h4>
            {movies.map(movie=>(
            
            <Card >
                <CardActionArea >
                    <CardContent >
                        <Typography variant='h5' component='h2' color='text.primary'>
                            {movie.data.name}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            {movie.data.desc}
                        </Typography>
                        <Button variant='contained' color='secondary' onClick={() => deleteMovie(movie.id)}>Delete</Button>
                    </CardContent>
                </CardActionArea>
            </Card>
            ))}
        
    </div>
  )
}

export default ListMovies