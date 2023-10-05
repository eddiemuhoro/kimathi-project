import { onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { newsCollectionRef } from '../../lib/firestoreCollections'
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
        <h4>News</h4>
        <div>
                        <h4>No news has been posted yet</h4>
                    </div>
        <div className='resource-elements'>
           
                 
                
            {news.map((resource, index)=>(
                <div className='resource-info'>
                   
                        <image>
                            <img src={resource.data.imageUrl} alt={resource.data.name}/>
                        </image>
                        
                    <section style={{marginLeft:'20px'}}>
                        <h4>{resource.data.name}</h4>
                        <p>{resource.data.description}</p>
                    </section>
                    {/* <a href={resource.data.link} rel="noreferrer" target='_blank'>Link</a> */}
                    {/* <Button variant='contained' color='secondary' onClick={() => deleteMovie(resource.id)}>Delete</Button> */}

                </div>
            ))}
        </div>
       
    </div>
  )
}

export default News