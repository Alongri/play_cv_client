import React from 'react'

const EditDialog = ({isEditing, setIsEditing, selectedImg}) => {
  return (
    <div onClick={() => {setIsEditing(!isEditing)}} className='container position-absolute border shadow-lg position-fixed h-75 bg-body d-flex flex-wrap justify-content-center rounded-5 position-relative'>
      <h1 className='w-100 text-center'>Edit Dialog</h1>
      <div style={{ fontSize: "200px" }}>{selectedImg}</div>
      <div className='position-absolute end-0 top-0 d-flex gap-3 px-3'>
        <button style={{ fontSize: "60px" }} className='btn'><i className="bi bi-check-circle"></i></button>
        <button style={{ fontSize: "60px" }} className='btn'><i className="bi bi-x-circle"></i></button>
      </div>
    </div>
  )
}

export default EditDialog
