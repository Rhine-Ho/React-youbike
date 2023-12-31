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
    const updatedAreas = [...selectedAreas]; // 創建已選取地區的新陣列
  
    if (updatedAreas.includes(area)) {
      // 如果已選取地區陣列包含這個地區
      const index = updatedAreas.indexOf(area); // 找到這個地區在陣列中的索引
      updatedAreas.splice(index, 1); // 從陣列中移除這個地區
    } else {
      updatedAreas.push(area); // 否則，將這個地區加入到已選取地區的陣列中
    }
  
    setSelectedAreas(updatedAreas); // 更新選取的地區狀態
  };
  
  const handleSelectAll = () => {
    if (selectedAreas.length === selectedCity.areas.length) {
      setSelectedAreas([]); // 如果所有地區都已選取，則取消選取所有地區
    } else {
      setSelectedAreas([...selectedCity.areas]); // 否則選取所有地區
    }
  };
  const handleSearch = (event) => {//接收事件作為參數
    setSearchTerm(event.target.value);//事件中獲取搜索框中的值 (event.target.value)，並將其設定為 searchTerm 狀態的新值。
  };

// 根據搜尋詞和選取的地區過濾 YouBike 資料
const filteredBikeData = bikeData.filter((site) => {
  const stationName = site.sna || 'undefined'; // 替換 'sna' 為正確的鍵值
  const isNameMatch = stationName.toLowerCase().includes(searchTerm.toLowerCase());

  const isAreaMatch = selectedAreas.length === 0 || selectedAreas.includes(site.sarea);
  // 若沒有選取的地區或是選取的地區包含站點的 .sarea，則回傳 true

  return isNameMatch && isAreaMatch;
  // 回傳站點名稱和地區是否符合搜尋條件
});




  return (
    <section className="container mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold text-lime1">站點資訊</h1>
    <div className='sm:flex sm:flex-col w-1/2'>
    <form className="mt-2 flex flex-col sm:flex-row  ">
      {/* city drop down options */}
      <div className="mr-2">
        <button
          className="inline-flex w-48 justify-around gap-x-1.5 pl-6 rounded-md bg-boxcolor px-3 py-2 mt-2 text-sm font-semibold text-gray-900 shadow-sm ring-inset ring-gray-300 hover:bg-gray-50 focus:ring-2 focus:outline-none focus:ring-gray-300 cursor-pointer"
          onClick={handleButtonClick}
        >
          {selectedCity ? selectedCity.name :'Select City'}
          <AiFillCaretDown className="mt-1.5 h-3 w-3" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-2 border border-boxcolor flex items-center bg-boxcolor rounded-md sm:w-1/2">
          <input
            type="search"
            id={`#${cities.id}`}
            name={`#${cities.name}`}
            value={searchTerm}
            onChange={handleSearch}
            className="block p-2 text-sm bg-boxcolor rounded-s-md text-gray-900 w-64"
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
      </div>

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
            <label htmlFor="selectAll"className="font-semibold text-md tracking-wider">全部選取</label>
          </div>

          {/* Individual area checkboxes */}
          {selectedCity.areas.map((area) => (
            <div key={area} className="inline-flex p-1 items-center sm:flex-wrap pr-20 py-5">
              <input
                type="checkbox"
                id={area}
                name={area}
                checked={selectedAreas.includes(area)}
                onChange={() => handleAreaChange(area)}
                className="text-md"
              />
              <label htmlFor={area} className="ml-2 font-semibold text-md tracking-wider">{area}</label>
            </div>
          ))}
        </div>
      )}
    

      {/* img zone */}
      <div className="hidden sm:block bg-white mx-24 justify-center items-center">
        <img src={RideBike} alt="bike" className=" mx-5" />
      </div>
    </div>

    <div className='mt-8 w-full max-w-full overflow-hidden'>
  <div className='max-h-96 overflow-y-scroll'>
    <table className='rounded-md bg-lime1 text-white text-lg w-full'>
      <thead>
        <tr className='text-sm'>
          <th className="px-1 py-2">縣市</th>
          <th className="px-1 py-2">區域</th>
          <th className="px-1 py-2">場站名稱</th>
          <th className="px-1 py-2">可借車輛</th>
          <th className="px-1 py-2">可還空位</th>
        </tr>
      </thead>
      <tbody className="w-full">
        {filteredBikeData.length > 0 ? (
          filteredBikeData.map((site) => (
            <tr
              key={site.sno}
              className='rounded-b-md text-xs odd:bg-white even:bg-gray-200 text-gray-900 rounded-md'
            >
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
</div>

    </section>
  );
}

export default Main;