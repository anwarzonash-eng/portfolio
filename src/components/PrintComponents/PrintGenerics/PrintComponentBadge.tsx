import React from 'react'

const PrintComponentBadge = ({ badgeText }) => {
  return (
    <div className={`flex items-center justify-center w-full mt-[2rem] mb-[1rem]`}>
      <div className="badge">{badgeText}</div>
    </div>
  )
}

export default PrintComponentBadge