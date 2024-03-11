import React, { useState } from 'react'
import ChangePass from './components/ChangePass'
import AddFilter from './components/AddFilter'

export default function AdminSettings(props) {

  const {Admin}= props
  const [pageState, setpageState] = useState("")
  return (
    <div>
      <div className='container'>
        <div className='row'>
            <div className='col-12'>
                <div className='mt-4' style={{display:'flex', alignItems:'center'}}>
                    <div onClick={()=>{setpageState('ChangePass')}} style={{cursor:'pointer',padding:'3px 10px',borderRadius:'12px', boxShadow:'0 1px 20px -6px #f6f0ff)', backgroundColor:'#f6f0ff', color:'#a884db', fontWeight:300, fontSize:'16px', margin:'0px 5px'}}>Change Password</div>
                    <div onClick={()=>{setpageState('Addfilter')}} style={{cursor:'pointer',padding:'3px 10px',borderRadius:'12px', boxShadow:'0 1px 20px -6px #f6f0ff)', backgroundColor:'#f6f0ff', color:'#a884db', fontWeight:300, fontSize:'16px', margin:'0px 5px'}}>Add Filter</div>
                </div>
                {pageState==='ChangePass' && <ChangePass password={Admin.pass}/>}
                {pageState==='Addfilter' && <AddFilter industry={Admin.industry} pattern={Admin.pattern} appName={Admin.appName}/>}
            </div>
        </div>
        
      </div>
    </div>
  )
}
