import React from 'react'
import { useParams } from 'react-router'
const Single = () => {
  const params= useParams()
  console.log('PARAMS;',params.userId);
  return (
    <div>Single</div>
  )
}

export default Single