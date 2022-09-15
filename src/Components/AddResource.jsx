import React, { useState } from 'react'
import { Button, TextField, FormControl} from '@material-ui/core'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../lib/init-firebase'
import {urlImage} from './images-firebase/ImageStore'
const AddResource = () => {
    const [name, setName]= useState('')
    const [desc, setDesc]= useState('')


    const handleSubmit=(e)=>{
        e.preventDefault()
      if(name === '' || desc === ''){
        return
      }
        const moviesCollectionRef = collection(db, 'movies')
        addDoc(moviesCollectionRef, {name , desc})
        alert('Movie added')
    }
    
  return (
    <div>
      
        <h4>Add Movie</h4>
        <FormControl>
            
            <TextField
            className='input'
            margin='dense'
            label='name'
            variant='outlined'
            placeholder='Movie Name'
            value={name}
             id="name" 
             type='text' 
             aria-describedby="my-helper-text"
              onChange={e => setName(e.target.value)} />

            <TextField
            margin='dense'
             variant='outlined'
                placeholder='Movie Description'
            title='desc'
             id="desc" 
             type='text' 
             aria-describedby="my-helper-text"
              label='desc'
              value= {desc}
              onChange={e => setDesc(e.target.value)} />

           <Button variant="contained" color="primary"  onClick={handleSubmit}>Add Movie</Button>
        </FormControl>
       
    </div>
  )
}

export default AddResource