import { useState, useEffect } from 'react';
import { cities } from '../constants'; // Importing the cities constant from a file
import { RideBike } from '../assets';
import { AiFillCaretDown } from 'react-icons/ai';
import { SlMagnifier } from 'react-icons/sl';

function Main() {
  const defaultCity = cities.find(city => city.name === '台北市'); // Find Taipei city object
  const [selectedCity, setSelectedCity] = useState(defaultCity); // 選取的城市，預設為台北市
  const [showDropdown, setShowDropdown] = useState(false); // 下拉式選單的顯示狀態，預設為隱藏
  const [selectedAreas, setSelectedAreas] = useState([]); // 選取的地區，預設為空陣列
  const [bikeData, setBikeData] = useState([]); // 儲存 YouBike 資料的狀態，預設為空陣列
  const [searchTerm, setSearchTerm] = useState(''); // 搜尋用詞的狀態，預設為空字串
  

  useEffect(() => {
    // 在這裡使用 fetch 從 YouBike API 取得資料
    fetch('https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json')
      .then(response => response.json())
      .then(data => {
        // 假設 API 回傳的資料是陣列，並包含 YouBike 站點的資訊
        setBikeData(data); // 將資料存入 state 中
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // 空陣列代表只在元件初次渲染時執行一次

  const handleCityChange = (city) => {
    setSelectedCity(city); // 選取新的城市，更新狀態
    setShowDropdown(false); // 選擇城市後，關閉下拉式選單
    setSelectedAreas([]); // 當更改城市時，重設選取的地區為空
  };
  

  const handleButtonClick = (event) => {
    event.preventDefault(); // 阻止預設行為（例如導覽行為）//防止按鈕點擊後觸發某些預設的瀏覽器行為，例如提交表單或是頁面跳轉。
    setShowDropdown(!showDropdown); // 更改下拉式選單的顯示狀態
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
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

   // Filter bikeData based on search term
   const filteredBikeData = bikeData.filter((site) => {
    // Replace 'sna' with the actual key containing station names, if different
    const stationName = site.sna || ''; // Replace 'sna' with the correct key
    return stationName.toLowerCase().includes(searchTerm.toLowerCase());
  });



  return (
    <section className="container mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold text-lime1">站點資訊</h1>
    <form className="mt-2 flex items-center ">
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
      <div className="mt-2 border border-boxcolor w-52 flex items-center bg-boxcolor rounded-md">
          <input
            type="search"
            id={`#${cities.id}`}
            name={`#${cities.name}`}
            value={searchTerm}
            onChange={handleSearch}
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
                className=""
              />
              <label htmlFor={area}>{area}</label>
            </div>
          ))}
        </div>
      )}

      {/* img zone */}
      <div className="hidden sm:block bg-white mx-24">
        <img src={RideBike} alt="bike" className="w-72 h-48 mx-20" />
      </div>
    </div>

    <div className='mt-8  w-full'>
      <table className='rounded-md bg-lime1 text-white text-lg'>
        <thead>
          <tr className='text-sm'>
            <th className="px-0 py-2">縣市</th>
            <th className="px-1 py-2">區域</th>
            <th className="px-1 py-2">場站名稱</th>
            <th className="px-1 py-2">可借車輛</th>
            <th className="px-1 py-2">可還空位</th>
          </tr>
        </thead>
        <tbody>
        {filteredBikeData.length > 0 ? (
              filteredBikeData.map((site) => (

                <tr key={site.sno} className='text-xs odd:bg-white even:bg-boxcolor text-gray-900 rounded-md'>
                  <td scope="row" className="px-3 py-2">{selectedCity.name}</td>
                  <td className="px-3 py-2">{site.sarea}</td>
                  <td className="px-3 py-2">{site.sna}</td>
                  <td className="px-3 py-2">{site.sbi}</td>
                  <td className="px-3 py-2">{site.bemp}</td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="5">資料載入中...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
    </section>
  );
}

export default Main;