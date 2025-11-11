import React from 'react'

const PrintComponentBadge = ({ badgeText}) => {
  return (
    <div className={`flex items-center justify-center w-full my-[2rem]`}>
        <div className="badge">{badgeText}</div>
    </div>
  )
}

export default PrintComponentBadge