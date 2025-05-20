import React from 'react'
import BlogList from '../component/BlogList';

const AllBlogs:React.FC= () => {
  return (
    <div className='max-w-[800px] w-full flex justify-center mx-auto p-4'>
      <BlogList/>
    </div>
  )
}

export default AllBlogs; 
