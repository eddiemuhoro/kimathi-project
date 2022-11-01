import { LinkedIn, Twitter, WhatsApp } from '@material-ui/icons'
import { onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { leadsCollectionRef, moviesCollectionRef } from '../../lib/firestoreCollections'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'


const Leads = () => {

    const [leads, setLeads] = useState([])


    useEffect(()=>{
        const unSubscribe= onSnapshot( leadsCollectionRef, snapshot=>{
            setLeads(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
        })

        return ()=>{
            unSubscribe()
        }
    }, [])
  return (
    <div>
        <h1>Leads</h1>

        <div className='lead-info'>
                <img src='https://upload.wikimedia.org/wikipedia/commons/d/d6/Sundar_pichai.png' alt='lead'/>
                <h5>Sundar Pichai</h5>
                <h4>GDSC Lead</h4>
                <social className='leads-social-icons'>
                    <WhatsApp/>
                    <LinkedIn/>
                    <Twitter/>
                </social>
                <hr></hr>
            </div>

        <Slide>
           {leads.map(lead => (
            <div className='lead-info'>
                <img src={lead.data.imageUrl} alt={lead.data.name}/>
                <h5>{lead.data.name}</h5>
                <h4>{lead.data.role}</h4>
                <social className='leads-social-icons'>
                    <WhatsApp/>
                    <LinkedIn/>
                    <Twitter/>
                </social>
                <hr></hr>
            </div>
          
           ))}
        </Slide>
      
    </div>
  )
}

export default Leads