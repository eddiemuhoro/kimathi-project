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

    const [query, setQuery]= useState('')
  return (
    <div className='events-container'>
        <h4>Resources</h4>
        <input type='text' placeholder='search' onChange={(e)=> setQuery(e.target.value)} />
        <div className='resource-elements'>
            {resources.filter(resource => resource.data.title.toLowerCase().includes(query)
            ).map((resource, index)=>(
                <div className='resource-info'>
                    <section>
                        <image>
                            <img src={resource.data.imageUrl} alt={resource.data.name}/>
                        </image>
                        
                    </section>
                    <div >
                        <a href={resource.data.link} rel="noreferrer" target='_blank'><h4>{resource.data.title}</h4></a>
                        
                        <p>{resource.data.description}</p>
                    </div>
                    {/* <a href={resource.data.link} rel="noreferrer" target='_blank'>Link</a> */}
                    {/* <Button variant='contained' color='secondary' onClick={() => deleteMovie(resource.id)}>Delete</Button> */}

                </div>
            ))}
        </div>
      
    </div>
  )
}

export default Resources