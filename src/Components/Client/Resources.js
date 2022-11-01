import { Button } from '@material-ui/core'
import { deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { leadsCollectionRef, resourcesCollectionRef } from '../../lib/firestoreCollections'
import { db } from '../../lib/init-firebase'
import Leads from './Leads'

const Resources = () => {
    //delete
    const deleteMovie= (id)=>{ 
        const docRef = doc(db, 'resources', id)
        deleteDoc(docRef)
        .then( ()=> alert('Resource deleted'))
        .catch(error => console.log(error.message))
    }



    const [resources, setResources] = useState([])


    useEffect(()=>{
        const unSubscribe= onSnapshot( resourcesCollectionRef, snapshot=>{
            setResources(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
        })

        return ()=>{
            unSubscribe()
        }
    }, [])
  return (
    <div className='events-container'>
        <h1>Resources</h1>
        <div className='resource-elements'>
            {resources.map((resource, index)=>(
                <div className='resource-info'>
                    <section>
                        <image>
                            <img src={resource.data.imageUrl} alt={resource.data.name}/>
                        </image>
                        <h4>{resource.data.title}</h4>
                    </section>
                    <p>{resource.data.description}</p>
                    {/* <a href={resource.data.link} rel="noreferrer" target='_blank'>Link</a> */}
                    {/* <Button variant='contained' color='secondary' onClick={() => deleteMovie(resource.id)}>Delete</Button> */}

                </div>
            ))}
        </div>
      
    </div>
  )
}

export default Resources