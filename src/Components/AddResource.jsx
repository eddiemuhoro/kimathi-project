import React, { useState } from 'react'
import { Button, TextField, FormControl} from '@material-ui/core'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../lib/init-firebase'
import {urlImage} from './images-firebase/ImageStore'
import { useEffect } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import firebase from 'firebase/compat/app';

const AddResource = () => {
    const [name, setName]= useState('')
    const [desc, setDesc]= useState('')
    const [data, setData]= useState([]);

    const [isfile, setFile] = useState(null)
    const handleImageAsFile= (e)=>{
      setFile(e.target.files[0]);
    }

    //insert to firebase-----------------------
    const handleSubmit= async(e) => {
      try {
        e.preventDefault();
        let file = isfile;
          //storage for images
        const storage= getStorage();
        var storagePath = 'images/' + file.name;

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
            const moviesCollectionRef = collection(db, 'movies')
            //add values to firestore firebase
             addDoc(moviesCollectionRef, {url, name , desc})
            setFile(null);
          })
        }
        )
        alert('success')
      } catch (error) {
        throw error
      }
    }





    // const handleSubmit=(e)=>{
    //     e.preventDefault()
    //   if(name === '' || desc === ''){
    //     return
    //   }
    //     const moviesCollectionRef = collection(db, 'movies')
    //     addDoc(moviesCollectionRef, {name , desc})
    //     alert('Movie added')
    // }
    
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
              onChange={e => setName( e.target.value)} />

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

            <input type="file" accept=".png, .jpg, .jpeg" onChange={handleImageAsFile} />

           <Button variant="contained" color="primary"  onClick={handleSubmit}>Add Movie</Button>
        </FormControl>
       
    </div>
  )
}

export default AddResource