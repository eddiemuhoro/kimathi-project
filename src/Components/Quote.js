import React from 'react'

const Quote = ({quote}) => {
  return (
    <div className='quote'>
      
       <h1>{quote.creator}</h1>
       <div>
           <h3>{quote.message}</h3>
           <p>{quote.tags}</p>
       </div>
    </div>
  )
}

export default Quote