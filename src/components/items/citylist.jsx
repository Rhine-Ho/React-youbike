import React, { useState } from 'react';
import { cities } from '../../constants'; // Importing the cities constant from a file
import { AiFillCaretDown } from "react-icons/ai";

function citylist() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setShowDropdown(false); // Close dropdown after selecting a city
  };

  const handleButtonClick = (event) => {
    event.preventDefault(); // Prevent default behavior (e.g., navigation)
    setShowDropdown(!showDropdown);
  };
   
  return (
   <>
   <div className=''>
      <h1 className="text-2xl font-bold text-lime1">
        站點資訊
      </h1>
      {/* city drop down options */}
      <div >
        <button
          className=" inline-flex w-44 justify-around gap-x-1.5 pl-6 rounded-md bg-boxcolor px-3 py-2 mt-2 text-sm font-semibold text-gray-900 shadow-sm ring-inset ring-gray-300 hover:bg-gray-50 focus:ring-2 focus:outline-none focus:ring-gray-300 cursor-pointer"
          onClick={handleButtonClick}
        >
          {selectedCity ? selectedCity.name : 'Select City'}
          <AiFillCaretDown className="mt-1.5 h-3 w-3" aria-hidden="true" />
        </button>
        {showDropdown && (
          <div className="z-10 right-0 mt-2 w-1/4 bg-boxcolor rounded-md shadow-l ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {cities.map((city) => (
                <div key={city.id} role="none">
                  <button
                    type="button"
                    className="block w-full py-2 px-4 text-left hover:bg-gray-100"
                    onClick={() => handleCityChange(city)}
                  >
                    {city.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
    
  );
}

export default citylist;
