import './index.scss'
const Select = ({handleStationSearch, handleStationSearchBlur, stationSearch, suggestedStations, handleSuggestionClick ,showSuggestions}) => {

    return (
        <div className='selectBar'>
                <select className='area' data-placeholder='選擇縣市'>
                <option>選擇縣市</option>
                <option>台北市</option>
                </select>
                <div style={{"position":"relative"}}>
                <input type="text"  value={stationSearch} onChange={handleStationSearch}  /> 
                 {showSuggestions &&suggestedStations.length > 0 && (
                    <ul>
                        {suggestedStations.map((suggestion, index) => (
                        <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion}
                        </li>
                        ))}
                    </ul>
                    )}
                </div>
        </div>
        
    );
}

export default Select;
