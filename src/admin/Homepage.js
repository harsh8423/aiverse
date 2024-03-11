import React, { useEffect, useState } from 'react'
import AdminSettings from './AdminSettings'
import InteractionSettings from './InteractionSettings'
import { toast, Toaster } from "react-hot-toast";
import Responses from './Responses';
import lock from "../images/lock.png"
import ChangelogSettings from './ChangelogSettings';


export default function Homepage() {

  const [checkpass, setcheckpass] = useState("")
  const [pageStateX, setpageStateX] = useState(false)
  
  const [Admin, setAdmin] = useState(null)
  const [pageState, setpageState] = useState("")
  const getData = async()=>{
        
    const response = await fetch("http://localhost:5000/api/getAdmin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const json = await response.json();
    if (json.success) {
      console.log(json);

      localStorage.setItem("admin", JSON.stringify(json.data));
      setAdmin(json.data)
      
    }

    if (!json.success) {
      toast.error("Error in getting Admin data");
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const onSubmit=() =>{

    if(checkpass){
      if(checkpass==Admin?.pass){
        toast.success("Login Successfull");
        setpageStateX(true)
      }else{
        toast.error("Wrong Password");
      }
    }
  }
  

  return (
    <div>
      <Toaster toastOptions={{ duration: 2000 }} />
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', color:'white', backgroundColor:'#A884DB',padding:'10px 40px'}}>
        <div style={{fontWeight:'900', fontSize:'22px'}}>AIverse</div>
        <div style={{fontWeight:'600', fontSize:'18px'}}>Admin Panel</div>
      </div>
      <div className='container'>
        {pageStateX? (
          <div className='row'>
              <div className='col-12 mt-2' style={{display:'flex', alignItems:'center'}}>
                  <div className='m-2' onClick={()=>{setpageState('interactions')}} style={{borderRadius:'12px', boxShadow:'0 1px 20px -6px #a884db)', backgroundColor:'#a884db', color:'white', padding:'6px 28px', fontWeight:700, fontSize:'18px', cursor:'pointer'}}>Interactions</div>
                  <div className='m-2' onClick={()=>{setpageState('Changelog')}} style={{borderRadius:'12px', boxShadow:'0 1px 20px -6px #a884db)', backgroundColor:'#a884db', color:'white', padding:'6px 28px', fontWeight:700, fontSize:'18px', cursor:'pointer'}}>Changelog</div>
                  <div className='m-2' onClick={()=>{setpageState('admin')}} style={{borderRadius:'12px', boxShadow:'0 1px 20px -6px #a884db)', backgroundColor:'#a884db', color:'white', padding:'6px 28px', fontWeight:700, fontSize:'18px', cursor:'pointer'}}>Admin</div>
                  <div className='m-2' onClick={()=>{setpageState('responses')}} style={{borderRadius:'12px', boxShadow:'0 1px 20px -6px #a884db)', backgroundColor:'#a884db', color:'white', padding:'6px 28px', fontWeight:700, fontSize:'18px', cursor:'pointer'}}>Responses</div>
              </div>
              {pageState==='admin' && <div className='col-12'><AdminSettings Admin={Admin}/></div>}
              {pageState==='interactions' && <div className='col-12'><InteractionSettings Admin={Admin}/></div>}
              {pageState==='responses' && <div className='col-12'><Responses/></div>}
              {pageState==='Changelog' && <div className='col-12'><ChangelogSettings/></div>}
              <div className='col-12'></div>
          </div>
        ):(
          <div className='row'>
            <div className='col-12' style={{display:'flex',justifyContent:'center', height:'500px', alignItems:'center', flexDirection:'column'}}>
              <div>
                <img src={lock} height={200} width={200} />
              </div>
              <input style={{border:'2px solid grey', borderRadius:'8px',margin:'4px', marginTop:'40px'}} onChange={(e)=>{setcheckpass(e.target.value)}} type="password" className="form__input" name="mediaSource" placeholder="Admin password" value={checkpass} required="" />
              <span onClick={onSubmit} style={{fontSize:'22px', padding:'3px 20px', color:'white', backgroundColor:'black', cursor:'pointer',borderRadius:'8px'}}>Submit</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
