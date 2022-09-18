import React, { useState } from 'react'
import { Button, TextField, FormControl, Typography} from '@material-ui/core'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../lib/init-firebase'
import {urlImage} from './images-firebase/ImageStore'
import { useEffect } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import firebase from 'firebase/compat/app';

const AddResource = () => {
    const [name, setName]= useState('')
    const [desc, setDesc]= useState('')
    const [link, setLink]= useState('')

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
        var storagePath = 'resources/' + file.name;
        const storageRef = ref(storage, storagePath);
        const uploadTask = uploadBytesResumable(storageRef, file);

        //progress of uploads
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
            const resourceCollectionRef = collection(db, 'todos')
            //add values to firestore firebase
            if(name=== '' || desc ===''){
              return
            }
             addDoc(resourceCollectionRef, {url, name , desc })
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
      
        <h4>Add Resource</h4>
        <FormControl>
            
            <TextField 
            className='input'
            margin='dense'
            label='Resource name'
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
             id="resource" 
             type='text' 
             aria-describedby="my-helper-text"
              label='Resource Description'
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


           <Button variant="contained" margin='dense' color="primary"  onClick={handleSubmit}>Submit</Button>
        </FormControl>
       
    </div>
  )
}

export default AddResource