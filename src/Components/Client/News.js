import { onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { newsCollectionRef, resourcesCollectionRef } from '../../lib/firestoreCollections'
import Leads from './Leads'

const News = () => {

    const [news, setNews] = useState([])


    useEffect(()=>{
        const unSubscribe= onSnapshot( newsCollectionRef, snapshot=>{
            setNews(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
        })

        return ()=>{
            unSubscribe()
        }
    }, [])
  return (
    <div className='events-container'>
        <h1>Resources</h1>
        <div className='resource-elements'>
            {news.map((resource, index)=>(
                <div className='resource-info'>
                   
                        <image>
                            <img src={resource.data.imageUrl} alt={resource.data.name}/>
                        </image>
                        
                    <section style={{marginLeft:'20px'}}>
                        <h4>{resource.data.title}</h4>
                        <p>{resource.data.description}</p>
                    </section>
                    {/* <a href={resource.data.link} rel="noreferrer" target='_blank'>Link</a> */}
                    {/* <Button variant='contained' color='secondary' onClick={() => deleteMovie(resource.id)}>Delete</Button> */}

                </div>
            ))}
        </div>
        <div className='leads-info'>
              <Leads/>
        </div>
    </div>
  )
}

export default News