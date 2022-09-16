
import { Typography } from '@material-ui/core'
import React from 'react'
import { useEffect, useState } from 'react'
import { deleteDoc, doc, onSnapshot } from 'firebase/firestore'

import {  Card, CardActionArea, Button, CardContent } from '@material-ui/core'
import { moviesCollectionRef } from '../lib/firestoreCollections'
import { db } from '../lib/init-firebase'
const Realtime = () => {
    
    const [movies, setMovies] = useState([])

    useEffect(()=>{
        const unSubscribe= onSnapshot( moviesCollectionRef, snapshot=>{
            setMovies(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
        })
        return ()=>{
            unSubscribe()
        }
    }, [])

    const deleteMovie = (id)=>{
        deleteDoc(doc(db, 'movies', id))
        .then(()=> alert('Movie deleted'))
        .catch(error => console.log(error.message))
    }

  return (
   
      <div>
        <h4>Movies</h4>

        {movies.map(movie=>(
            
            <Card>
                <CardActionArea>
                    <CardContent>
                        <Typography variant='h5' component='h2'>
                            {movie.data.name}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            {movie.data.desc}
                        </Typography>

                            <img src={movie.data.url} alt='image' style={{height: '100px'}}></img>

                        <Button variant='contained' color='secondary' onClick={() => deleteMovie(movie.id)}>Delete</Button>
                    </CardContent>
                </CardActionArea>
                
            </Card>
            ))}
      </div>
         
      
  
  )
}

export default Realtime