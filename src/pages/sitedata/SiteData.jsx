import React,{useState,useEffect} from 'react';
import './index.scss'

import Select from '../../components/select/Select';
import Frame from '../../img/Frame.png'
const SiteData = () => {
    const [all, setAll] =useState(false);
    const [search,setSearch] =useState([]);
    const [data,setData] =useState([]);
    const [site ,setSite] =useState([]); 
    useEffect(()=>{
        getApi()
    },[])
    const getApi = async()=>{
        const check = localStorage.getItem('bike');
        if(check){
            setData(JSON.parse(check));
        }else{
        const api = await fetch(`https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json`)
        const info =await api.json();
        localStorage.setItem("bike",JSON.stringify(info));
        setData(info)
        
        }
    }
    const HandleAll = () =>{
      setAll(!all)
    }
    const siteSearch = data.filter((item)=>item.sna===site)
    const areaSearch= data.filter((item)=>item.sarea===site)

    return (
      <div className="site">
        <h1 className="title">站點資訊 </h1> 

        <Select setSearch={setSearch} search={search} data={data} setData={setData} site={site} setSite={setSite} />
  
        <div className="middle">
          <div className="left">
            <div>
              <input type="checkbox" id="all" name="all" value="all" onClick={HandleAll} />
              <label htmlFor="all">全部選取</label>
            </div>
            <div className="boxes">
              <div className="item">
                <input type="checkbox" id="大安區" name="大安區" value="大安區" onChange={e => setSite(e.currentTarget.value)} />
                <label htmlFor="大安區">大安區</label>
              </div>
              <div className="item">
                <input type="checkbox" id="松山區" name="松山區" value="松山區" onChange={e => setSite(e.currentTarget.value)}/>
                <label htmlFor="松山區">松山區</label>
              </div>
              <div className="item">
                <input type="checkbox" id="大同區" name="大同區" value="大同區" onChange={e => setSite(e.currentTarget.value)}/>
                <label htmlFor="大同區">大同區</label>
              </div>
              <div className="item">
                <input type="checkbox" id="文山區" name="文山區" value="文山區" onChange={e => setSite(e.currentTarget.value)} />
                <label htmlFor="文山區">文山區</label>
              </div>
              <div className="item">
                <input type="checkbox" id="士林區" name="士林區" value="士林區" onChange={e => setSite(e.currentTarget.value)}/>
                <label htmlFor="士林區">士林區</label>
              </div>
              <div className="item">
                <input type="checkbox" id="南港區" name="南港區" value="南港區" onChange={e => setSite(e.currentTarget.value)}/>
                <label htmlFor="南港區">南港區</label>
              </div>
              <div className="item">
                <input type="checkbox" id="中正區" name="中正區" value="中正區" onChange={e => setSite(e.currentTarget.value)}/>
                <label htmlFor="中正區">中正區</label>
              </div>
              <div className="item">
                <input type="checkbox" id="中山區" name="中山區" value="中山區" onChange={e => setSite(e.currentTarget.value)} />
                <label htmlFor="中山區">中山區</label>
              </div>
              <div className="item">
                <input type="checkbox" id="內湖區" name="內湖區" value="內湖區" onChange={e => setSite(e.currentTarget.value)}/>
                <label htmlFor="內湖區">內湖區</label>
              </div>
              <div className="item">
                <input type="checkbox" id="北投區" name="北投區" value="北投區" onChange={e => setSite(e.currentTarget.value)}/>
                <label htmlFor="北投區">北投區</label>
              </div>
              <div className="item">
                <input type="checkbox" id="信義區" name="信義區" value="信義區" onChange={e => setSite(e.currentTarget.value)}/>
                <label htmlFor="信義區">信義區</label>
              </div>
              <div className="item">
                <input type="checkbox" id="萬華區" name="萬華區" value="萬華區" onChange={e => setSite(e.currentTarget.value)} />
                <label htmlFor="萬華區">萬華區</label>
              </div>
              <div className="item">
                <input type="checkbox" id="臺大專區" name="臺大專區" value="臺大專區" onChange={e => setSite(e.currentTarget.value)}/>
                <label htmlFor="臺大專區">臺大專區</label>
              </div>
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
            {
              all ? (
                data.map((item)=>{
                  return(
                  <tr key={item.sno}>
                  <td>台北市</td>
                  <td>{item.sarea}</td>
                  <td>{item.sna}</td>
                  <td className='car'>{item.sbi}</td>
                  <td className='null'>{item.bemp}</td>
                </tr>
                  )
                })
                ) :
                (
                siteSearch.map((item)=>{
                return(
                  <tr  key={item.sno}>
                  <td>台北市</td>
                  <td>{item.sarea}</td>
                  <td>{item.sna}</td>
                  <td className='car'>{item.sbi}</td>
                  <td className='null'>{item.bemp}</td>
                </tr>
                )
              })
                  
               )                       
            }
            {           
              areaSearch.map((item)=>{
                return(
                  <tr  key={item.sno}>
                  <td>台北市</td>
                  <td>{item.sarea}</td>
                  <td>{item.sna}</td>
                  <td className='car'>{item.sbi}</td>
                  <td className='null'>{item.bemp}</td>
                </tr>
                )
              })
            }
            </tbody>
        </table>
      </div>
    );
}

export default SiteData;
