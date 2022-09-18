import { Avatar, CardActions, CardHeader, IconButton, Typography } from '@material-ui/core'
import React from 'react'
import { useEffect, useState } from 'react'
import { deleteDoc, doc, onSnapshot } from 'firebase/firestore'

import {  Card, CardActionArea, Button, CardContent } from '@material-ui/core'
import { moviesCollectionRef } from '../lib/firestoreCollections'
import { db } from '../lib/init-firebase'
import { ArrowDownward, Favorite, HearingTwoTone, More, Share } from '@material-ui/icons'
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


  return (
   
      <div>
        <h4>Upcoming Events</h4>
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
                <a  style={{textDecoration: 'none'}} href={movie.data.link} rel="noreferrer" target='_blank'>
                 <CardHeader 
                    avatar={
                    <Avatar  arial-label="recipe" >
                        <img src={movie.data.url} style={{height: '50px', width: '50px', borderRadius: '50%'}} alt='image'/>
                    </Avatar>
                     }
                     title={movie.data.name}
                     subheader={movie.data.desc}
                     />
                </a>

                        <CardContent style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Typography variant='body2' color='text.secondar'>
                                    Date: 12/12/2021
                                </Typography>
                                <Typography variant='body2' color='text.secondar'>
                                Time: 2.30pm
                        </Typography>
                        </CardContent>
                        {/* <CardActions style={{paddingTop: '0px'}}>
                            <IconButton>
                                <ArrowDownward/>
                                <span style={{fontSize: '15px'}}>See more...</span>
                            </IconButton>
                        </CardActions> */}
            </Card>
            
            ))}
      </div>
         
      
  
  )
}

export default Client