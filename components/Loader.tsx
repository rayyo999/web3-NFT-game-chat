import React from 'react'

const Loader = () => {
  return (
    <div
      className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent'
      role='status'
    >
      <span className='hidden'>Loading...</span>
    </div>
  )
}

export default Loader
