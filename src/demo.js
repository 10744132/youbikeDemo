import React, { useState, useEffect, memo } from 'react';
import Select from './components/select/Select';
const Demo = () => {
    const [citySearch, setCitySearch] = useState('');
  const [stationSearch, setStationSearch] = useState('');
  const [cities, setCities] = useState([]);
  const [stations, setStations] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectAllCities, setSelectAllCities] = useState(false);
  const [suggestedStations, setSuggestedStations] = useState([]);

  useEffect(() => {
    // 获取台北市YouBike实时站点信息的API调用
    fetch('https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json')
      .then(response => response.json())
      .then(data => {
        // 提取縣市清單
        const cityList = [...new Set(data.map(item => item.sarea))];
        setCities(cityList);
        // 提取站點清單
        setStations(data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, []);

  useEffect(() => {
    // 根据输入的站点搜索值，过滤匹配的站点名称作为建议
    const filteredStations = stations.filter(station =>
      station.sna.toLowerCase().includes(stationSearch.toLowerCase()) && (selectedCities.length === 0 || selectedCities.includes(station.sarea))
    );
    const suggestedNames = filteredStations.map(station => {
      const stationName = station.sna.replace('YouBike2.0_', '');
      return stationName;
    });
    setSuggestedStations(suggestedNames);
  }, [stationSearch, stations, selectedCities]);

  const handleCitySearch = (event) => {
    setCitySearch(event.target.value);
  };

  const handleStationSearch = (event) => {
    setStationSearch(event.target.value);
  };

  const handleCityCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedCities([...selectedCities, value]);
    } else {
      setSelectedCities(selectedCities.filter(city => city !== value));
    }
  };

  const handleSelectAllCities = (event) => {
    const checked = event.target.checked;
    setSelectAllCities(checked);
    if (checked) {
      setSelectedCities(cities);
    } else {
      setSelectedCities([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setStationSearch(suggestion);
  };

  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  const filteredStations = stations.filter(station =>
    station.sna.toLowerCase().includes(stationSearch.toLowerCase()) && (selectedCities.length === 0 || selectedCities.includes(station.sarea))
  );
  const handleStationSearchBlur = () => {
    setSuggestedStations([]); // 清空建议值数组
  };
  return (
    <div>
      <h1>台北市YouBike站點資訊</h1>
      <div>
        <h2>縣市搜尋</h2>
        <input type="text" placeholder="輸入縣市名稱" value={citySearch} onChange={handleCitySearch} />
        <div>
          <label>
            <input type="checkbox" checked={selectAllCities} onChange={handleSelectAllCities} />
            全選
          </label>
          {filteredCities.map((city, index) => (
            <label key={index}>
              <input
                type="checkbox"
                value={city}
                checked={selectedCities.includes(city)}
                onChange={handleCityCheckboxChange}
              />
              {city}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h2>站點搜尋</h2>
        <input type="text" placeholder="輸入站點名稱" value={stationSearch} onChange={handleStationSearch}  onBlur={handleStationSearchBlur} />
        {suggestedStations.length > 0 && memo(
          <ul>
            {suggestedStations.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <table>
          <thead>
            <tr>
              <th>站點名稱</th>
              <th>緯度</th>
              <th>經度</th>
            </tr>
          </thead>
          <tbody>
            {filteredStations.map((station, index) => (
              <tr key={index}>
                <td>{station.sna.replace('YouBike2.0_', '')}</td>
                <td>{station.lat}</td>
                <td>{station.lng}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default Demo;