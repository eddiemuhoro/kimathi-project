import React, { useState } from 'react'
import { Button, TextField, FormControl, Typography} from '@material-ui/core'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../lib/init-firebase'
import {urlImage} from './images-firebase/ImageStore'
import { useEffect } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import firebase from 'firebase/compat/app';

const AddEvent = () => {
    const [name, setName]= useState('')
    const [desc, setDesc]= useState('')
    const [link, setLink]= useState('')
    const [time, setTime]= useState('')
    const [date, setDate]= useState('')
    const [organizer, setOrganizer]= useState('')
    const [venue, setVenue]= useState('')
    const [data, setData]= useState([]);
    const [isfile, setFile] = useState(null)

    
    const handleImageAsFile= (e)=>{
      setFile(e.target.files[0]);
    }

    const handleTime = (e)=>{
      setTime(e.target.value)
    }

    const handleDate = (e)=>{
      setDate(e.target.value)
    }

    //insert to firebase-----------------------
    const handleSubmit= async(e) => {
      try {
        e.preventDefault();
        let file = isfile;

          //storage for images
        const storage= getStorage();
        var storagePath = 'events/' + file.name;
        const storageRef = ref(storage, storagePath);
        const uploadTask = uploadBytesResumable(storageRef, file);

        //progress of upload
        uploadTask.on('state_changed', (snapshot)=>{
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is '+ progress + '% done');
        },
        (error) => {
          console.log(error)
        },
        ()=>{
          //get the image url
          getDownloadURL(uploadTask.snapshot.ref)
          .then((url)=>{
            console.log('file available at' , url);
            const moviesCollectionRef = collection(db, 'events')
            //add values to firestore firebase
            if(name=== '' || desc ===''){
              return
            }
             addDoc(moviesCollectionRef, {url, name , desc , link, time, date, organizer, venue})
             setFile(null);
          })
        }
        )
        alert('success')
      } catch (error) {
        throw error
      }
    }


  return (
    <div>
      
        <h4>Add Event</h4>
        <FormControl className='form-control'>
            
            <TextField 
            className='input'
            margin='dense'
            label='event name'
            title='event name'
            variant='outlined'
            placeholder='Movie Name'
            value={name}
             id="name" 
             type='text' 
             aria-describedby="my-helper-text"
              onChange={e => setName( e.target.value)} />

            <TextField
            margin='dense'
             variant='outlined'
                placeholder='Movie Description'
            title='desc'
             id="desc" 
             type='text' 
             aria-describedby="my-helper-text"
              label='Event Description'
              value= {desc}
              onChange={e => setDesc(e.target.value)} />

        <TextField
              margin='dense'
              variant='outlined'
              placeholder='Movie Description'
              title='link'
              id="link" 
              type='text' 
              aria-describedby="my-helper-text"
              label='link'
              value= {link}
              onChange={e => setLink(e.target.value)} />

         
            <TextField id='file' type="file" accept=".png, .jpg, .jpeg" onChange={handleImageAsFile} label='' variant='outlined' />

          {/* organizers. */}
            <TextField
            margin='dense'
            type='text'
            placeholder='Organizer Name'
            variant='outlined'
            label='Organizer Name'
            onChange={e => setOrganizer(e.target.value)}
            />


            {/* Time of the event */}
            <Typography variant='body' color='textSecondary' gutterBottom>
              Time of the event
            </Typography>
            <div className='time'>
              
               <TextField type='time'  margin='dense' variant='outlined' onChange={handleTime}/>
               <TextField type='date'  margin='dense' variant='outlined' onChange={handleDate}/>
            </div>
            {/* Venue of the event */}
            <TextField type='text' variant='outlined' margin='dense' label='venue' onChange={e => setVenue(e.target.value)} />

           <Button variant="contained" margin='dense' color="primary"  onClick={handleSubmit}>Submit</Button>
        </FormControl>
       
    </div>
  )
}

export default AddEvent