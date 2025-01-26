import React from 'react'
import { IoMdSearch } from "react-icons/io";

const SearchInput = () => {
  return (
    <div className='flex  border border-gray-300 p-2 w-[150px] sm:w-[250px] md:w-[400px] lg:w-[600px] rounded-3xl'>
      <input 
        type="text" 
        placeholder="Search" 
        className=' w-[30px]  
                    sm:w-[120px]
                    md:w-[280px]
                    lg:w-[500px]
                    focus:outline-none 
                    focus:ring-0 focus:border-gray-300 ml-2'/>
    <IoMdSearch size={20} className='ml-20 cursor-pointer'/>
    </div>
  )
}

export default SearchInput
