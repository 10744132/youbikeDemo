
import React,{useState,useEffect} from 'react';
import './index.scss'

import Select from '../../components/select/Select';
import Frame from '../../img/Frame.png'
const Site = () => {
  const [citySearch, setCitySearch] = useState('');
  const [stationSearch, setStationSearch] = useState('');
  const [cities, setCities] = useState([]);
  const [stations, setStations] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectAllCities, setSelectAllCities] = useState(false);
  const [suggestedStations, setSuggestedStations] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false); 
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
    setShowSuggestions(true); 
  };

  const handleCityCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedCities([...selectedCities, value]);

    } else {
      setSelectedCities(selectedCities.filter(city => city !== value));
    }
    setShowSuggestions(false); 
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
  setShowSuggestions(false); 
};

  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  const filteredStations = stations.filter(station =>
    station.sna.toLowerCase().includes(stationSearch.toLowerCase()) && (selectedCities.length === 0 || selectedCities.includes(station.sarea))
  );
  const handleStationSearchBlur = () => {
    setSuggestedStations([]); 
  };
  
    return (
      <div className="site">
        <h1 className="title">站點資訊 </h1> 

        <Select showSuggestions={showSuggestions} handleStationSearch={handleStationSearch} handleStationSearchBlur={handleStationSearchBlur} stationSearch={stationSearch} suggestedStations={suggestedStations} handleSuggestionClick={handleSuggestionClick} />
  
        <div className="middle">
          <div className="left">
            <div>
              <input type="checkbox" id="all" name="all" checked={selectAllCities} onChange={handleSelectAllCities} />
              <label htmlFor="all">全部選取</label>
            </div>
            <div className="boxes">
            {filteredCities.map((city, index) => (
                <div className="item" key={index}>
                <input
                key={index}
                type="checkbox"
                value={city}
                checked={selectedCities.includes(city)}
                onChange={handleCityCheckboxChange}
                />
                 <label key={index}>{city}</label>
                </div>

          ))}          
            </div>
          </div>
          <div className="right">
            <img src={Frame} alt="" />
          </div>
        </div>
        <table className="table">
        <thead>
            <tr >
              <th>縣市</th>
              <th>區域</th>
              <th>站點名稱</th>
              <th className='car'>可借車輛</th>
              <th className='null'>可還空位</th>
            </tr>
        </thead>    
            <tbody>
            {filteredStations.map((station, index) => (
              <tr key={index}>
                <td>台北市</td>
                <td>{station.sarea}</td>
                <td>{station.sna.replace('YouBike2.0_', '')}</td>
                <td className='car'>{station.sbi}</td>
                <td className='null'>{station.bemp}</td>
              </tr>
            ))}
            </tbody>
        </table>
      </div>
    );
}


export default Site;
