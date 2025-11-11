import React from 'react'

const PrintComponentTitle = ({title}) => {
  return (
    <h2
        className={`text-heading leading-[3.56rem] text-[3.67rem] font-medium  my-[2rem] text-center`}
      >
        {title}
      </h2>
  )
}

export default PrintComponentTitle