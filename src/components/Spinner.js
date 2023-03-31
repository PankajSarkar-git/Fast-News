import React from 'react'
import loading from './img/loading.gif';


function spinner() {
  return (
    <div className='text-center my-3'>
        <img className ="my-3" src={loading} alt="Loading" />
      </div>
  )
}

export default spinner

