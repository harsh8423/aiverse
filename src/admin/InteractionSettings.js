import React, { useState } from 'react'
import AddInteraction from './components/AddInteraction'
import EditInteraction from './components/EditInteraction'

export default function InteractionSettings(props) {

  const {Admin}= props
  const [pageState, setpageState] = useState("")
  return (
    <div className='caontainer'>
      <div className='row'>
        <div className='col-12'>
        <div className='mt-4' style={{display:'flex', alignItems:'center'}}>
            <div onClick={()=>{setpageState('addInteraction')}} style={{cursor:'pointer',padding:'3px 10px',borderRadius:'12px', boxShadow:'0 1px 20px -6px #f6f0ff)', backgroundColor:'#f6f0ff', color:'#a884db', fontWeight:300, fontSize:'16px', margin:'0px 5px'}}>Add Interaction</div>
            <div onClick={()=>{setpageState('editInteraction')}} style={{cursor:'pointer',padding:'3px 10px',borderRadius:'12px', boxShadow:'0 1px 20px -6px #f6f0ff)', backgroundColor:'#f6f0ff', color:'#a884db', fontWeight:300, fontSize:'16px', margin:'0px 5px'}}>Edit Interaction</div>
          </div>
        </div>
        <div className='col-12'>
          {pageState==="addInteraction" && <AddInteraction industryx={Admin.industry} patternx={Admin.pattern} appNamex={Admin.appName}/>}
          {pageState==="editInteraction" && <EditInteraction industryx={Admin.industry} patternx={Admin.pattern} appNamex={Admin.appName}/>}
        </div>
      </div>
    </div>
  )
}
