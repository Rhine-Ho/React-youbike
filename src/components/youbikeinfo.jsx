import React, { useState } from 'react';
import { cities } from '../constants'; // Importing the cities constant from a file
import { RideBike } from '../assets';
import { SlMagnifier } from 'react-icons/sl';
import { AiFillCaretDown } from 'react-icons/ai';
import { DataList } from './items';

function Main() {
  const defaultCity = cities.find(city => city.name === '台北市'); // Find Taipei city object
  const [selectedCity, setSelectedCity] = useState(defaultCity);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedAreas, setSelectedAreas] = useState([]);

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setShowDropdown(false); // Close dropdown after selecting a city
    setSelectedAreas([]); // Reset selected areas when changing the city
  };

  const handleButtonClick = (event) => {
    event.preventDefault(); // Prevent default behavior (e.g., navigation)
    setShowDropdown(!showDropdown);
  };

  const handleAreaChange = (area) => {
    const updatedAreas = [...selectedAreas];
    if (updatedAreas.includes(area)) {
      const index = updatedAreas.indexOf(area);
      updatedAreas.splice(index, 1);
    } else {
      updatedAreas.push(area);
    }
    setSelectedAreas(updatedAreas);
  };

  const handleSelectAll = () => {
    if (selectedAreas.length === selectedCity.areas.length) {
      setSelectedAreas([]); // Deselect all if all are currently selected
    } else {
      setSelectedAreas([...selectedCity.areas]); // Select all areas
    }
  };


  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-lime1">站點資訊</h1>
      <form className="mt-2 flex items-center">
        {/* city drop down options */}
        <div className="w-1/4 mr-2">
          <button
            className="inline-flex w-44 justify-around gap-x-1.5 pl-6 rounded-md bg-boxcolor px-3 py-2 mt-2 text-sm font-semibold text-gray-900 shadow-sm ring-inset ring-gray-300 hover:bg-gray-50 focus:ring-2 focus:outline-none focus:ring-gray-300 cursor-pointer"
            onClick={handleButtonClick}
          >
            {selectedCity ? selectedCity.name :'Select City'}
            <AiFillCaretDown className="mt-1.5 h-3 w-3" aria-hidden="true" />
          </button>
        </div>
        {/* Search input */}
        <div className="mt-2 border border-boxcolor w-52 flex items-center bg-boxcolor rounded-md">
          <input
            type="search"
            id={`#${cities.id}`}
            name={`#${cities.name}`}
            className="block p-2 w-full text-sm bg-boxcolor rounded-s-md text-gray-900 "
            placeholder="搜尋站點"
          />
          <label htmlFor={`#${cities.id}`} className="relative p-2.5 text-sm font-medium text-gray-300">
            <SlMagnifier className="w-4 h-4" aria-hidden="true" />
          </label>
        </div>
      </form>
      {showDropdown && (
        <div className="z-20 relative right-0 mt-1 w-1/4 bg-boxcolor rounded-md shadow-l ring-1 ring-black ring-opacity-5">
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

<div className='flex justify-between h-full '>
        {/* checkbox */}

      {/* City areas checkboxes */}
      {selectedCity && (
        <div>
          <div className="p-1 my-3 flex items-center">
            {/* Select All checkbox */}
            <input
              type="checkbox"
              id="selectAll"
              checked={selectedAreas.length === selectedCity.areas.length}
              onChange={handleSelectAll}
              className="mr-2"
            />
            <label htmlFor="selectAll">Select All</label>
          </div>

          {/* Individual area checkboxes */}
          {selectedCity.areas.map((area) => (
            <div key={area} className="inline-flex p-1 items-center ">
              <input
                type="checkbox"
                id={area}
                name={area}
                checked={selectedAreas.includes(area)}
                onChange={() => handleAreaChange(area)}
                className="mr-3"
              />
              <label htmlFor={area}>{area}</label>
            </div>
          ))}
        </div>
      )}
        

        {/* img zone */}
        <div className="bg-white mx-24">
          <img src={RideBike} alt="bike" className="w-72 h-48 mx-20" />
        </div>
      </div>


      <div>
        <DataList></DataList>
      </div>
    </section>
  );
}

export default Main;
