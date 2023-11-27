import React, { useState } from 'react';
import { cities } from '../../constants'; // Importing the cities constant from a file

import { SlMagnifier } from "react-icons/sl";

function station() {
 
    return (
      <>
        <div className="w-1/3 flex items-center bg-boxcolor rounded-md">
            <input
                type="search"
                id={`#${cities.id}`}
                name={`#${cities.name}`}
                className="block p-2.5 w-full text-sm bg-boxcolor rounded-s-md text-gray-900 "
                placeholder="搜尋站點"
                    />
            <label 
                htmlFor={`#${cities.id}`} 
                className="relative top-0 end-0 h-full p-2.5 text-sm font-medium text-gray-300">
                <SlMagnifier className="w-4 h-4" aria-hidden="true" />
            </label>
        </div>
       
      </>
    )
  }
  
  export default station;
  