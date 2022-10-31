import { Avatar, CardActions, CardHeader, IconButton, Typography } from '@material-ui/core'
import React from 'react'
import { useEffect, useState } from 'react'
import { deleteDoc, doc, onSnapshot } from 'firebase/firestore'

import {  Card, CardActionArea, Button, CardContent } from '@material-ui/core'
import { moviesCollectionRef } from '../lib/firestoreCollections'
import { db } from '../lib/init-firebase'
import { ArrowDownward, Favorite, HearingTwoTone, More, Share } from '@material-ui/icons'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Leads from './Client/Leads'
const Client = () => {
    const params= useParams()
    console.log('PARAMS;',params.userId);

    const [movies, setMovies] = useState([])


    useEffect(()=>{
        const unSubscribe= onSnapshot( moviesCollectionRef, snapshot=>{
            setMovies(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
        })

        return ()=>{
            unSubscribe()
        }
    }, [])

    const found = movies.find(movie =>{
        return movie.id === params.id
    })

    console.log(found);


  return (
   
      <div className='events-container'>
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
                                <div>

                                    <Typography variant='body2' color='text.secondar'>
                                        Date: 12/12/2021
                                    </Typography>
                                    <Typography variant='body2' color='text.secondar'>
                                    Time: 2.30pm
                                     </Typography>
                                </div>
                                <div>
                                    <Typography variant='body2' color='text.secondary'>
                                        {movie.data.desc}
                                    </Typography>
                                </div>
                            </CardContent>

                </Card>
        
            ))}

            <div className='leads-info'>
              <Leads/>
            </div>
      </div>
         
      
  
  )
}

export default Client