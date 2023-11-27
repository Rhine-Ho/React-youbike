import React, { useState, useEffect } from 'react';

function Datalist() {
  const [bikeData, setBikeData] = useState([]);

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

  return (
    <>
      <div className='mt-2 overflow-y-scroll'>
        <table className='rounded-md bg-lime1 text-white h-16 text-lg justify-center'>
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
            {bikeData.map(site => (
              <tr key={site.sno} className='text-xs  odd:bg-white even:bg-boxcolor text-gray-900 rounded-md'>
                <td scope="row" className="px-3 py-2">{site.ar}</td>
                <td className="px-3 py-2">{site.sarea}</td>
                <td className="px-3 py-2">{site.sna}</td>
                <td className="px-3 py-2">{site.sbi}</td>
                <td className="px-3 py-2">{site.bemp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Datalist;
