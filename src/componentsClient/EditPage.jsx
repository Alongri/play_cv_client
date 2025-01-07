import React from 'react'

const EditPage = () => {
  return (
    <div className='container d-flex justify-content-center flex-wrap w-75 col-10'>
        <h1 className='w-100 text-center'>Edit Page</h1>
        <div className='w-75 bg-info'>1</div>
        <div className='d-flex justify-content-between w-100 bg-dark'>
          <button className='btn btn-success float-start'><i class="bi bi-arrow-left"></i></button>
          <div>hi</div>
          <button className='btn btn-success'><i class="bi bi-arrow-right"></i></button>
        </div>
    </div>
  )
}

export default EditPage