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
    <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around', height:'100%'}}>
       

        <div className='lead-info'>
        <h1>Leads</h1>
                <img src='https://firebasestorage.googleapis.com/v0/b/apt-rite-346310.appspot.com/o/EcoVille%2Fscaled_image_picker1666901294178754526.jpg?alt=media&token=1367b1f3-10d3-42d6-a42f-dce96113ce56' alt='lead'/>
                <h5>Emilio Kariuki</h5>
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
                <image className='leadImg'>

                <img src={lead.data.imageUrl} alt={lead.data.name}/>
                </image>
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