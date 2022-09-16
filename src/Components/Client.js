import { Avatar, CardActions, CardHeader, IconButton, Typography } from '@material-ui/core'
import React from 'react'
import { useEffect, useState } from 'react'
import { deleteDoc, doc, onSnapshot } from 'firebase/firestore'

import {  Card, CardActionArea, Button, CardContent } from '@material-ui/core'
import { moviesCollectionRef } from '../lib/firestoreCollections'
import { db } from '../lib/init-firebase'
import { Favorite, HearingTwoTone, Share } from '@material-ui/icons'
const Client = () => {
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
        <h4>Resources</h4>
        {movies.map(movie=>(
            
            <Card style={{margin: '20px'}}>
                {/* <CardActionArea>
                    <CardContent>
                        <Avatar/>
                        <Typography variant='h5' component='h2'>
                            {movie.data.name}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            {movie.data.desc}
                        </Typography>
                    </CardContent>
                </CardActionArea> */}
                 <CardHeader
                    avatar={
                    <Avatar  arial-label="recipe">
                        <img src={movie.data.url} style={{height: '50px', width: '50px', borderRadius: '50%'}} />
                    </Avatar>
                     }
                     title={movie.data.name}
                     subheader={movie.data.desc}
                     />

            </Card>
            ))}
      </div>
         
      
  
  )
}

export default Client