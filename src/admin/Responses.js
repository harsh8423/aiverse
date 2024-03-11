import React, { useState, useContext } from 'react'
import Modal from 'react-modal';
import trash from "../images/trash.png"
import { Bars } from 'react-loader-spinner'
import cancelIcon from "../images/cancel.png"
import { toast, Toaster } from "react-hot-toast";
import {AdminContext} from "../components.js/ContextApi";
import ContextAdmin from '../components.js/ContestAdmin';


export default function Responses(props) {

  const a = useContext(AdminContext);

    const [emailResponse, setemailResponse] = useState(a.admin.emailResponse)
    const [submitResponse, setsubmitResponse] = useState(a.admin.submitResponse)
    const [sponsorResponse, setsponsorResponse] = useState(a.admin.sponsorResponse)
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [spinner, setspinner] = useState(false)
    const [pageState, setpageState] = useState("")
    const [id, setid] = useState("")
    function getdate(utcDateStr){
        // Given date string in UTC
        var dateObj = new Date(utcDateStr);
        var options = { year: 'numeric', month: 'short', day: 'numeric' };
        var formattedDate = dateObj.toLocaleDateString('en-US', options);

        return(formattedDate)

    }

    const addcontext=(admin)=>{
      return(<ContextAdmin Admin={admin}/>)
    }

    const deleteResponse = async()=>{
        setspinner(true)
        const response = await fetch(`https://aiverse-backend.vercel.app/api/delete${pageState}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id:id
          }),
        });
        const json = await response.json();
        console.log(json);
        setspinner(false)
        if (json.success) {
          addcontext(json.updatedAdmin)
          setemailResponse(json.updatedAdmin.emailResponse)
          setsponsorResponse(json.updatedAdmin.sponsorResponse)
          setsubmitResponse(json.updatedAdmin.submitResponse)
          localStorage.setItem("admin", JSON.stringify(json.updatedAdmin)); 
          closeModal()
          toast.success("Deleted successfully");
          console.log("Deleted successfully")
          
        }
        if (!json.success) {
          toast.error("Something went wrong");
        }
      }


    function openModal(category) {
        setid(category._id)
      setIsOpen(true);
    }
    function closeModal() {
      setspinner(false)
      setid('')
      setIsOpen(false);
    }
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width:'300px'
      },
    };

  return (
    <div className='container-fluid' style={{textAlign:'left'}}>
        <Toaster toastOptions={{ duration: 2000 }} />
      <div className='row'>
        <div className='col-12 mt-4' style={{display:'flex', alignItems:'center'}}>
            <div onClick={()=>{setpageState('email')}} style={{cursor:'pointer',padding:'3px 10px',borderRadius:'12px', boxShadow:'0 1px 20px -6px #f6f0ff)', backgroundColor:'#f6f0ff', color:'#a884db', fontWeight:300, fontSize:'16px', margin:'0px 5px'}}>Email Response</div>
            <div onClick={()=>{setpageState('submit')}} style={{cursor:'pointer',padding:'3px 10px',borderRadius:'12px', boxShadow:'0 1px 20px -6px #f6f0ff)', backgroundColor:'#f6f0ff', color:'#a884db', fontWeight:300, fontSize:'16px', margin:'0px 5px'}}>Submit Response</div>
            <div onClick={()=>{setpageState('sponsor')}} style={{cursor:'pointer',padding:'3px 10px',borderRadius:'12px', boxShadow:'0 1px 20px -6px #f6f0ff)', backgroundColor:'#f6f0ff', color:'#a884db', fontWeight:300, fontSize:'16px', margin:'0px 5px'}}>Sponsor Response</div>
        </div>
        {pageState==='email' && <div className='col-12'>
            <div className='container-fluid mt-3'>
                <div className='row'>
                {emailResponse?.map((item)=>{
                    let date = getdate(`${item.dateStamp}`)
                return(
                    <div className='normal-box col-3 p-3 m-2'><span style={{float:'right'}}><img onClick={()=>{openModal(item)}} style={{cursor:'pointer'}} src={trash} width={18} height={18}/></span><span style={{color:'skyblue',fontWeight:'bold'}}>{item.email}</span><br/><small style={{fontWeight:700, color:'grey'}}>{date}</small></div>
                )
            })}
                </div>
            </div>
        </div>}
        {pageState==='submit' && <div className='col-12'>
        <div className='container-fluid mt-3'>
            <div className='row'>
            {submitResponse?.map((item)=>{
                let date = getdate(`${item.dateStamp}`)
                return(
                    <div className='normal-box col-5 m-2 p-3'><strong><span style={{float:'right'}}><img onClick={()=>{openModal(item)}} style={{cursor:'pointer'}} src={trash} width={18} height={18}/></span>{item.name}</strong><br/><span style={{color:'skyblue'}}>{item.email}</span><br/><span style={{color:'blue'}}>{item.url}</span><br/>{item.desc}<br/><small style={{fontWeight:700, color:'grey'}}>{date}</small></div>
                )
            })}
            </div>
        </div>
            </div>}
        {pageState==='sponsor' && <div className='col-12'>
        <div className='container-fluid mt-3'>
            <div className='row'>
            {sponsorResponse?.map((item)=>{
                let date = getdate(`${item.dateStamp}`)
                return(
                    <div className='normal-box col-5 p-3 m-2'><span style={{float:'right'}}><img onClick={()=>{openModal(item)}} style={{cursor:'pointer'}} src={trash} width={18} height={18}/></span><strong>{item.name}</strong><br/><span style={{color:'skyblue'}}>{item.email}</span><br/>{item.detail}<br/><small style={{fontWeight:700, color:'grey'}}>{date}</small></div>
                )
            })}
            </div>
        </div>
         </div>}
         <Modal
              isOpen={modalIsOpen}
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
                <div className='mt-3'><span onClick={deleteResponse} style={{margin:'25px',fontSize:'22px', padding:'5px 10px', color:'white', backgroundColor:'black', cursor:'pointer',borderRadius:'8px',}}>Delete</span></div>
              )}
            </div>
            </Modal>
      </div>
    </div>
  )
}
