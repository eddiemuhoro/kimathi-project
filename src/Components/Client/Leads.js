import { LinkedIn, Twitter, WhatsApp } from '@material-ui/icons'
import { onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { leadsCollectionRef, moviesCollectionRef } from '../../lib/firestoreCollections'

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
        <div>
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
        </div>
      
    </div>
  )
}

export default Leads