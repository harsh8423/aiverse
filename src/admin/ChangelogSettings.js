import React, { useEffect, useState } from 'react'
import cancel from "../images/cancel.png"
import { Bars } from 'react-loader-spinner'
import { toast, Toaster } from "react-hot-toast";
import Modal from 'react-modal';
import trash from "../images/trash.png"
import cancelIcon from "../images/cancel.png"


export default function ChangelogSettings() {

    const [add, setadd] = useState(false)
    const [loglist, setloglist] = useState([])
    const [clog, setclog] = useState("")
    const [logdate, setlogdate] = useState("")
    const [pageState, setpageState] = useState("")
    const [spinner, setspinner] = useState(false)
    const [changelogs, setchangelogs] = useState([])
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [id, setid] = useState("")

    const addchangelog = async()=>{
        
        const response = await fetch("https://aiverse-backend.vercel.app/api/addchangelog", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
          uploadDate:logdate,
          loglist:loglist
        }),
      });
      const json = await response.json();
      setpageState("")
      setlogdate("")
      setloglist([])
      console.log(json);
      if (json.success) {
        setchangelogs(json.data)
        toast.success("Added successfully");
        console.log("Added successfully")
      }
      if (!json.success) {
        toast.error("Something went wrong");
      }
    }

    const deletechangelog = async()=>{
      setspinner(true)
      const response = await fetch(`https://aiverse-backend.vercel.app/api/deletechangelog`, {
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
        setchangelogs(json.data)
        closeModal()
        toast.success("Deleted successfully");
        console.log("Deleted successfully")
        
      }
      if (!json.success) {
        toast.error("Something went wrong");
      }
    }

    const getData = async()=>{
        
        const response = await fetch("https://aiverse-backend.vercel.app/api/getchangelog", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
        const json = await response.json();
        if (json.success) {
          console.log(json);
          setchangelogs(json.data)          
        }
        if (!json.success) {
          toast.error("Error in getting Admin data");
        }
      }
    
      useEffect(() => {
        getData()
      }, [])

      function getdate(utcDateStr){
        var dateObj = new Date(`${utcDateStr}`);
        var options = { year: 'numeric', month: 'short', day: 'numeric' };
        var formattedDate = dateObj.toLocaleDateString('en-US', options);        
        return(formattedDate)
    }

    const addImg=()=>{
        if (clog) {
          setloglist([...loglist, clog]); // Update images array with the new image
          setclog(""); // Reset img state
        }
      }
      const onCancel = (item) => {
        const updatedImages = loglist.filter((log) => log !== item);
        setloglist(updatedImages);
      };

      const handleupload=()=>{
        console.log(logdate,loglist)
        if(logdate&&loglist){
            addchangelog()
        }
      }
      const handleDateChange = (event) => {
        setlogdate(event.target.value);
      };

      function openModal(id) {
        setid(id)
      setIsOpen(true);
    }
    function closeModal() {
      setspinner(false)
    //   setid('')
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
    <div className='container' style={{textAlign:'left'}}>
        <Toaster toastOptions={{ duration: 2000 }} />
      <div className='row'>
      <div className='col-12'>
        <div className='mt-4' style={{display:'flex', alignItems:'center'}}>
            <div onClick={()=>{setpageState('addChangelog')}} style={{cursor:'pointer',padding:'3px 10px',borderRadius:'12px', boxShadow:'0 1px 20px -6px #f6f0ff)', backgroundColor:'#f6f0ff', color:'#a884db', fontWeight:300, fontSize:'16px', margin:'0px 5px'}}>Add Changelog</div>
          </div>
        </div>
        <div className='col-12'>
          {pageState==="addChangelog" && <div style={{display:'flex',alignItems:'center', flexWrap:'wrap',flexDirection:'column',textAlign:'left'}}>
            <input style={{border:'2px solid grey', borderRadius:'8px',margin:'4px'}} onChange={handleDateChange} type="date" className="form__input" name="date" value={logdate} required="" />
            <br/><h5 style={{fontWeight:700}}>Add Changelog list</h5>
            {loglist?.map((log, index)=>{
              return(
                <div style={{fontSize:'14px', fontWeight:700, color:'grey', display:'flex', alignItems:'center'}}>
                  <img key={index} className="scale" onClick={()=>{onCancel(log)}} style={{cursor:'pointer', margin:'2px'}}  src={cancel} width={12} height={12}/>
                  <span>{log}</span>
                </div>
              )
            })}
            <div style={{display:'flex',alignItems:'center', flexWrap:'wrap'}}>
              <textarea style={{border:'2px solid grey', borderRadius:'8px', margin:'5px'}} onChange={(event)=>{setclog(event.target.value)}} type="text" className="form__input" name="log" placeholder="Enter the log detail" width="90%" value={clog} required="" />
              <span onClick={addImg} style={{fontSize:'22px', padding:'3px 8px', color:'white', backgroundColor:'grey', cursor:'pointer',borderRadius:'8px'}}>Add</span>
            </div>
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
                <div className='mt-3'>
                    <span onClick={handleupload} style={{margin:'25px',fontSize:'22px', padding:'5px 10px', color:'white', backgroundColor:'black', cursor:'pointer',borderRadius:'8px',}}>Upload</span>
                    <span onClick={()=>{setpageState("")}} style={{margin:'25px',fontSize:'22px', padding:'5px 10px', color:'white', backgroundColor:'grey', cursor:'pointer',borderRadius:'8px',}}>Cancel</span>
                </div>
              )}          
            </div>}
        </div>
        {changelogs && <div className='col-12'>
            <div className='container-fluid mt-3'>
                <div className='row'>
                {changelogs?.map((item)=>{
                    let date = getdate(`${item.uploadDate}`)
                return(
                    <div className='normal-box col-3 p-3 m-2'>
                        
                        <span style={{float:'right'}}><img onClick={()=>{openModal(item._id)}} style={{cursor:'pointer'}} src={trash} width={18} height={18}/></span><strong style={{fontWeight:700, color:'grey'}}>{date}</strong>
                        <ul>
                        {item?.loglist?.map((log)=>{
                            return(
                                <li>{log}</li>
                            )
                        })}
                        </ul>
                    </div>
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
                <div className='mt-3'><span onClick={deletechangelog} style={{margin:'25px',fontSize:'22px', padding:'5px 10px', color:'white', backgroundColor:'black', cursor:'pointer',borderRadius:'8px',}}>Delete</span></div>
              )}
            </div>
            </Modal>
      </div>
    </div>
  )
}
