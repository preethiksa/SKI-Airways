import React from 'react'
import Book from './Book'
import Foot from './Foot'

export default function Flightbook() {
  return (
    <div>
      <div className='bodyclr'>
        <h4 className='bdybok'>Book Flight Tickets Online</h4>
      </div>
      <Book/>
      <Foot/>
    </div>
  )
}
