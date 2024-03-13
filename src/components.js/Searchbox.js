import React, {useContext,useState,useEffect} from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import {ContextApi} from "./ContextApi";
import { useNavigate, useLocation} from "react-router-dom";
import '../cssFiles.js/browse.css'

function Searchbox(props) {
  
  const a = useContext(ContextApi);
  let navigate = useNavigate();
  const [interactions, setinteractions] = useState([])
  
  useEffect(() => {
    const newArray=[]
    a?.interactions?.map((item,index)=>{
      const data={
        id:index,
        name:item.name,
        pattern:item.pattern
      }
      newArray.push(data)
    })
    setinteractions(newArray)
  }, [a])
  
  
  // note: the id field is mandatory
  
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    // console.log(string, results)
  }
  
  const handleOnSelect = (item) => {
    // the item selected
    if(props?.edit){
      navigate(`../EditInteraction/${a.interactions[item.id].urlSlug}`, {state: a.interactions[item.id]})
    }else{
      navigate(`../Browse/${a.interactions[item.id].urlSlug}-${a.interactions[item.id]._id}`, {state: a.interactions[item.id]})
      
    }
    console.log(item)
  }
  
  const formatResult = (item) => {
    
    const isMobile = window.innerWidth <= 767;
    return (
      <>
      <div style={{display:'block', cursor:'pointer'}}>

        <span style={{ textAlign: 'left', fontStyle:"sans-serif", fontSize:"12px",fontWeight:'bolder' }}>{item.name}</span>
        {!isMobile && <small style={{ float: 'right', fontWeight:'bold', color:'gray', marginRight:"10px" }}>{item.pattern}</small>}
      </div>
      </>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='searc1'>
          <ReactSearchAutocomplete
            items={interactions}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            formatResult={formatResult}
          />
        </div>
      </header>
    </div>
  )
}

export default Searchbox