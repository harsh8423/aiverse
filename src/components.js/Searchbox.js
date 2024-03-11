import React, {useContext,useState,useEffect} from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import {ContextApi} from "./ContextApi";
import { useNavigate, useLocation} from "react-router-dom";

function Searchbox(props) {
  
  const a = useContext(ContextApi);
  let navigate = useNavigate();
  const [interactions, setinteractions] = useState([])

  useEffect(() => {
    const newArray=a?.interactions
    newArray?.map((item,index)=>{
      item.id=index
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
      navigate(`../EditInteraction/${item.urlSlug}`, {state: item})
    }else{
      navigate(`../Browse/${item.urlSlug}-${item._id}`, {state: item})

    }
    console.log(item)
  }

  const formatResult = (item) => {
    
    return (
      <>
      <div style={{display:'block', cursor:'pointer'}}>

        <span style={{ textAlign: 'left', fontStyle:"sans-serif", fontSize:"12px",fontWeight:'bolder' }}>{item.name}</span>
        <small style={{ float: 'right', fontWeight:'bold', color:'gray', marginRight:"10px" }}>{item.pattern}</small>
      </div>
      </>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: 400 }}>
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