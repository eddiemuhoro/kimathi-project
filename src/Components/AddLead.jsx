import React, { useState } from 'react'
import { Button, TextField, FormControl, Typography} from '@material-ui/core'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../lib/init-firebase'
import {urlImage} from './images-firebase/ImageStore'
import { useEffect } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import firebase from 'firebase/compat/app';

const AddLead = () => {
    const [name, setName]= useState('')
    const [role, setDesc]= useState('')
    const [phone, setLink]= useState('')
    const [email, setEmail]= useState('')
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
        var storagePath = 'leads/' + file.name;
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
          .then((imageUrl)=>{
            console.log('file available at' , imageUrl);
            const resourceCollectionRef = collection(db, 'leads')
            //add values to firestore firebase
            if(name=== '' || role ===''){
              return
            }
             addDoc(resourceCollectionRef, {imageUrl, name , role , phone, email})
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
      
        <h4>Add Lead</h4>
        <FormControl className='form-control'>
            
            <TextField 
            required
            className='input'
            margin='dense'
            label='Lead name'
            variant='outlined'
            placeholder='Name'
            value={name}
             id="name" 
             type='text' 
             aria-describedby="my-helper-text"
              onChange={e => setName( e.target.value)} />

            <TextField
            margin='dense'
             variant='outlined'
                placeholder=' Role'
            title='desc'
             id="role" 
             type='text' 
             aria-describedby="my-helper-text"
              label="Lead's role"
              value= {role}
              onChange={e => setDesc(e.target.value)} />

        <TextField
              margin='dense'
              variant='outlined'
              placeholder='Phone number' 
              title='link'
              id="link" 
              type='text' 
              aria-describedby="my-helper-text"
              label='Phone number'
              value= {phone}
              onChange={e => setLink(e.target.value)} />

        <TextField
              margin='dense'
              variant='outlined'
              title='email'
              id="email" 
              type='email' 
              aria-describedby="my-helper-text"
              label='Email'
                value= {email}
              onChange={e => setEmail(e.target.value)} />

         
            <TextField id='file' type="file" accept=".png, .jpg, .jpeg" onChange={handleImageAsFile} label='' variant='outlined' />


           <Button variant="contained" margin='dense' color="primary"  onClick={handleSubmit}>Submit</Button>
        </FormControl>
       
    </div>
  )
}

export default AddLead