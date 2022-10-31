import React from 'react'
import { Link } from 'react-router-dom'

const All = () => {
    const countries=[
        {
            name: 'Afghanistan',
        },
        {
            name: 'Albania',
        },
        {
            name: 'Algeria',
        },
    ]
  return (
    <div>
        <ul>
            {countries.map(country=>(
                <Link to={`/country/${country.name}`}>
                    <li>{country.name}</li>
                </Link>
            ))}
        </ul>
    </div>
  )
}

export default All