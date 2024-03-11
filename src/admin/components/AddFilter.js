import React, { useState,useContext } from 'react'
import Modal from 'react-modal';
import { toast, Toaster } from "react-hot-toast";
import { Bars } from 'react-loader-spinner'
import trash from "../../images/trash.png"
import {AdminContext} from "../../components.js/ContextApi";
import ContextAdmin from '../../components.js/ContestAdmin';

import cancelIcon from "../../images/cancel.png"

export default function AddFilter() {

  const a = useContext(AdminContext);

  const [industry, setindustry] = useState(a.admin.industry)
  const [pattern, setpattern] = useState(a.admin.pattern)
  const [appName, setappName] = useState(a.admin.appName)

    const [filterName, setfilterName] = useState("")
    const [category, setcategory] = useState("")
    const [modalIsOpen2, setIsOpen2] = React.useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [spinner, setspinner] = useState(false)
    
    const addcontext=(admin)=>{
      return(<ContextAdmin Admin={admin}/>)
    }

    const addFilterx = async()=>{
        
        const response = await fetch("https://aiverse-backend.vercel.app/api/addFilter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category:category,
            filterName:filterName
          }),
        });
        const json = await response.json();
        console.log(json);
        setfilterName("")
        if (json.success) {
          addcontext(json.data)
          localStorage.setItem("admin", JSON.stringify(json.data)); 
          setappName(json.data.appName)
          setindustry(json.data.industry)
          setpattern(json.data.pattern)
          closeModal()
          toast.success("Added successfully");
          console.log("Added successfully")
          
        }
        if (!json.success) {
          toast.error("Bug credentials Missing");
        }
      }
      
      
      const deletefilter = async()=>{
        setspinner(true)
        const response = await fetch(`https://aiverse-backend.vercel.app/api/delete${category}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filterName:filterName
          }),
        });
        const json = await response.json();
        console.log(json);
        setspinner(false)
        if (json.success) {
          addcontext(json.data)
          localStorage.setItem("admin", JSON.stringify(json.data)); 
          setfilterName("")
          setappName(json.data.appName)
          setindustry(json.data.industry)
          setpattern(json.data.pattern)
          closeModal()
          toast.success("Deleted successfully");
          console.log("Deleted successfully")
          
        }
        if (!json.success) {
          toast.error("Something went wrong");
        }
      }


      function openModal2(category) {
        setcategory(category)
      setIsOpen2(true);
    }
    function openModal(category) {
        setcategory(category)
      setIsOpen(true);
    }
    function closeModal() {
      setspinner(false)
      setIsOpen(false)
      setIsOpen2(false);
    }
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minWidth:'300px'
      },
    };

    const addFilter = ()=>{
        if(filterName && category){
          setspinner(true)
            addFilterx()
        }
    }


  return (
    <div className='container' style={{textAlign:'left'}}>
      <div className='row'>
      <Toaster toastOptions={{ duration: 2000 }} />
        <div className='col-12 mt-5'>
            <h2 style={{fontWeight:700}}>Filters</h2>
            <h5 style={{fontWeight:700, marginTop:'20px'}}>Criteria 1: App Name</h5>
                <div style={{display:'flex', flexWrap:'wrap'}}>
                {appName.map((item)=>{
                    return(
                        <span onClick={()=>{openModal2('appName');setfilterName(item)}} style={{fontSize:'22px', border:'2px solid grey', padding:'5px 20px', borderRadius:'8px', margin:'5px',cursor:'pointer'}}>{item}</span>
                    )
                })}
                <span onClick={()=>{openModal('appName')}} style={{fontSize:'22px', padding:'5px 10px', color:'white', backgroundColor:'black', cursor:'pointer',borderRadius:'8px'}}>Add</span>
                </div>
            <h5 style={{fontWeight:700, marginTop:'40px'}}>Criteria 2: Industry</h5>
            <div style={{display:'flex', flexWrap:'wrap'}}>
            {industry.map((item)=>{
                    return(
                        <span onClick={()=>{openModal2('industry');setfilterName(item)}} style={{fontSize:'22px', border:'2px solid grey', padding:'5px 20px', borderRadius:'8px', margin:'5px',cursor:'pointer'}}>{item}</span>
                    )
                })}
            <span onClick={()=>{openModal('industry')}} style={{fontSize:'22px', padding:'5px 10px', color:'white', backgroundColor:'black', cursor:'pointer',borderRadius:'8px'}}>Add</span>

            </div>
            <h5 style={{fontWeight:700, marginTop:'40px'}}>Criteria 3 Pattern</h5>
            <div style={{display:'flex', flexWrap:'wrap'}}>
            {pattern.map((item)=>{
                    return(
                        <span onClick={()=>{openModal2('pattern');setfilterName(item)}} style={{fontSize:'22px', border:'2px solid grey', padding:'5px 20px', borderRadius:'8px', margin:'5px',cursor:'pointer'}}>{item}</span>
                    )
                })}
            <span onClick={()=>{openModal('pattern')}} style={{fontSize:'22px', padding:'5px 10px', color:'white', backgroundColor:'black', cursor:'pointer',borderRadius:'8px'}}>Add</span>

            </div>
                    </div>
        <Modal
              isOpen={modalIsOpen}
              style={customStyles}

              onRequestClose={closeModal}
              contentLabel="Example Modal"
            >
              <img className="scale" style={{float:'right', cursor:'pointer'}} onClick={closeModal} src={cancelIcon} width={24} height={24}/>
              <h2 style={{fontWeight:700}}>Add Filter</h2>
              <input style={{border:'2px solid grey', borderRadius:'8px', margin:'5px'}} onChange={(event)=>{setfilterName(event.target.value)}} value={filterName} type="text" className="form__input" id="name" placeholder="Filter Name" required="" />
              {spinner? (
                <Bars
                height="50"
                width="50"
                color="#A884DB"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                />
              ):(

              <span onClick={addFilter} style={{margin:'5px',fontSize:'22px', padding:'5px 10px', color:'white', backgroundColor:'black', cursor:'pointer',borderRadius:'8px'}}>Confirm</span>
              )}
            </Modal>
            <Modal
              isOpen={modalIsOpen2}
              style={customStyles}

            //   className={'text-center'}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
            >
            <div style={{display:'flex',flexDirection:'column', justifyContent:'center', textAlign:'center'}}>
            <div><img className="scale" style={{float:'right', cursor:'pointer'}} onClick={closeModal} src={cancelIcon} width={24} height={24}/></div>
              <div><img src={trash} width={50} height={50}/> </div>
              {spinner? (
                <Bars
                height="50"
                width="50"
                color="#A884DB"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                />
              )
              :(
                <div className='mt-3'><span onClick={deletefilter} style={{margin:'25px',fontSize:'22px', padding:'5px 10px', color:'white', backgroundColor:'black', cursor:'pointer',borderRadius:'8px',}}>Delete</span></div>
              )}
            </div>
            </Modal>
      </div>
    </div>
  )
}
