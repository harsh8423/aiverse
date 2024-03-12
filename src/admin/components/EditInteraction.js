import React, { useEffect, useState, useContext } from 'react'
import { toast, Toaster } from "react-hot-toast";
import { ThreeCircles, Bars } from 'react-loader-spinner'
import Searchbox from '../../components.js/Searchbox';
import { useNavigate, useLocation} from "react-router-dom";
import cancel from "../../images/cancel.png"
import {AdminContext} from "../../components.js/ContextApi";
import Modal from 'react-modal';
import ContextStat from '../../components.js/ContetxStat';


export default function EditInteraction(props) {

    const a = useContext(AdminContext);
    

  const [industryx, setindustryx] = useState(a.admin.industry)
  const [patternx, setpatternx] = useState(a.admin.pattern)
  const [appNamex, setappNamex] = useState(a.admin.appName)
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [pageState, setpageState] = useState("")

    const location = useLocation();
    const [images, setimages] = useState([])
    const [spinner, setspinner] = useState(false)
    const [appName, setappName] = useState("")
    const [pattern, setpattern] = useState("")
    const [industry, setindustry] = useState("")

    const [img, setimg] = useState("")
    const [interactions, setinteractions] = useState(location?.state? location.state:"")
    let navigate = useNavigate();
    const onChangeHander = (event) => {
    setinteractions({ ...interactions, [event.target.name]: event.target.value });
    };

    const addcontext=(Interactions)=>{
        return(<ContextStat Interactions={Interactions}/>)
      }

      
    const editInteraction = async()=>{
        
        setspinner(true)
        const response = await fetch("https://aiverse-backend.vercel.app/api/editInteraction", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
          id:interactions._id,
          name:interactions.name,
          mediaSource:interactions.mediaSource,
          industry:industry,
          appName:appName,
          pattern:pattern,
          gifUrl:interactions.gifUrl,
          content:interactions.content,
          iconUrl:interactions.iconUrl,
          videoUrl:interactions.videoUrl,
          images:images
        }),
      });
      const json = await response.json();
      setspinner(false)
      console.log(json);
      if (json.success) {
        addcontext(json.data)
        toast.success("Updated successfully");
        console.log("Added successfully")
        setTimeout(() => {
            navigate('../Admin')
        }, 1500);
        
      }
      
      if (!json.success) {
        toast.error("Something went wrong");
      }
    }


    const deleteInteraction = async()=>{
        
        setspinner(true)
        const response = await fetch(`http://localhost:5000/api/deleteInteraction/${interactions._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
      });
      const json = await response.json();
      setspinner(false)
      console.log(json);
      if (json.success) {
        addcontext(json.data)
        toast.success(json.message);
        console.log("Added successfully") 
        setTimeout(() => {
            navigate('../Admin')
        }, 1500);

      }
      if (!json.success) {
        toast.error(json.message);
      }
    }


useEffect(() => {
    setappName(interactions.appName)
    setindustry(interactions.industry)
    setpattern(interactions.pattern)
    setimages(interactions.images)
}, [interactions])

const onUpdate=()=>{
    if(appName && industry && pattern && interactions.name && interactions.gifUrl && interactions.videoUrl && interactions.iconUrl && interactions.mediaSource){
      setpageState('Update')
      openModal()
    //   addInteraction()
    }else{
      toast.error("Input field is empty");
    }
  }

const onDelete=()=>{
    if(interactions._id){
        setpageState('Delete')
        openModal()
    }
}
  const addImg=()=>{
    if (img) {
      setimages([...images, img]); // Update images array with the new image
      setimg(""); // Reset img state
      console.log(images);
    }
  }

  const onCancel = (item) => {
    const updatedImages = images.filter((image) => image !== item);
    setimages(updatedImages);
  };

  function openModal(category) {
    // setcategory(category)
  setIsOpen(true);
}
function closeModal() {
  setspinner(false)
  setIsOpen(false)
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


  return (
    <div className='container mt-5'>
      <Toaster toastOptions={{ duration: 2000 }} />
      {interactions ? <div className='row' style={{textAlign:'left'}}>
        <div className='col-12'>
        <h2 style={{fontWeight:700}}>Edit Interaction</h2>
          <div style={{display:'flex',alignItems:'center', flexWrap:'wrap'}}>
            <input style={{border:'2px solid grey', borderRadius:'8px',margin:'4px'}} onChange={onChangeHander} type="text" className="form__input" name="name" placeholder="video name" value={interactions?.name} required="" />
            <input style={{border:'2px solid grey', borderRadius:'8px',margin:'4px'}} onChange={onChangeHander} type="text" className="form__input" name="mediaSource" placeholder="Media Source" value={interactions?.mediaSource} required="" />
          </div>
          <div style={{display:'flex',alignItems:'center', flexWrap:'wrap'}}>
            <input style={{border:'2px solid grey', borderRadius:'8px',margin:'4px',}} onChange={onChangeHander} type="text" className="form__input" name="videoUrl" placeholder="video Url" value={interactions?.videoUrl} required="" />
            <input style={{border:'2px solid grey', borderRadius:'8px',margin:'4px',}} onChange={onChangeHander} type="text" className="form__input" name="gifUrl" placeholder="gif Url" value={interactions?.gifUrl} required="" />
          </div>
          <div>
            <input style={{border:'2px solid grey', borderRadius:'8px',margin:'4px'}} onChange={onChangeHander} type="text" className="form__input" name="iconUrl" placeholder="Icon Url" value={interactions?.iconUrl} required="" />
            <br/>
            <h5 style={{fontWeight:700, marginTop:'5px'}}>Content (Optional)</h5>
            <textarea style={{border:'2px solid grey', borderRadius:'8px', margin:'5px', width:'90%'}} rows={3} onChange={onChangeHander} value={interactions.content} className="form__input" name="content" placeholder="describe...." required="" />
          </div>
          
        </div>
        <div className='col-12'>
            <h5 style={{fontWeight:700, marginTop:'20px'}}>App Name</h5>
                {appNamex?.map((item,index)=>{
                    return(
                        <span onClick={()=>{setappName(item)}} key={index} className={`hovered ${appName===item ? 'clicked' : '' }`}style={{cursor:'pointer',fontSize:'22px', border:'2px solid grey', padding:'5px 20px', borderRadius:'8px', margin:'5px'}}>{item}</span>
                        )
                    })}
            <h5 style={{fontWeight:700, marginTop:'20px'}}>Industry</h5>
            {industryx?.map((item, index)=>{
                return(
                    <span onClick={()=>{setindustry(item)}} key={index} className={`hovered ${industry===item ? 'clicked' : ''}`} style={{cursor:'pointer',fontSize:'22px', border:'2px solid grey', padding:'5px 20px', borderRadius:'8px', margin:'5px'}}>{item}</span>
                    )
                })}
            <h5 style={{fontWeight:700, marginTop:'20px'}}>Pattern</h5>
            {patternx?.map((item, index)=>{
                return(
                    <span onClick={()=>{setpattern(item)}} key={index} className={`hovered ${pattern===item ? 'clicked' : ''}`} style={{cursor:'pointer',fontSize:'22px', border:'2px solid grey', padding:'5px 20px', borderRadius:'8px', margin:'5px'}}>{item}</span>
                    )
                })}
        </div>
        <div className='col-12'>
          <br/>
            <h5 style={{fontWeight:700, marginTop:'20px'}}>Add images</h5>
            {images?.map((img, index)=>{
                return(
                    <div style={{fontSize:'14px', fontWeight:700, color:'grey', display:'flex', alignItems:'center'}}>
                  <img key={index} className="scale" onClick={()=>{onCancel(img)}} style={{cursor:'pointer', margin:'2px'}}  src={cancel} width={12} height={12}/>
                  <span>{img}</span>
                </div>
              )
            })}
            <div style={{display:'flex',alignItems:'center', flexWrap:'wrap'}}>
              <input style={{border:'2px solid grey', borderRadius:'8px', margin:'5px'}} onChange={(event)=>{setimg(event.target.value)}} type="text" className="form__input" name="urlSlug" placeholder="image url" value={img} required="" />
              <span onClick={addImg} style={{fontSize:'22px', padding:'3px 8px', color:'white', backgroundColor:'grey', cursor:'pointer',borderRadius:'8px'}}>Add</span>
            </div>
        </div>
        <div className='col-12 mb-5 text-center'>
        <br/>
        {spinner? (
            <ThreeCircles
            visible={true}
            height="50"
            width="50"
            color="#A884DB"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            />
            ):(
                <div>
                <span onClick={onUpdate} style={{margin:'10px',fontSize:'22px', padding:'7px 20px', color:'white', backgroundColor:'green', cursor:'pointer',borderRadius:'8px'}}>Update</span>
                <span onClick={onDelete} style={{margin:'10px',fontSize:'22px', padding:'7px 20px', color:'white', backgroundColor:'red', cursor:'pointer',borderRadius:'8px'}}>Delete</span>
            </div>
          )}
        </div>
        <Modal
              isOpen={modalIsOpen}
              style={customStyles}

            //   className={'text-center'}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
            >
            <div style={{display:'flex',flexDirection:'column', justifyContent:'center', textAlign:'center'}}>

            <div>
                <img className="scale" style={{float:'right', cursor:'pointer'}} onClick={closeModal} src={cancel} width={24} height={24}/></div>
            <h5 style={{fontWeight:700, marginTop:'20px'}}>Confirm to {pageState}</h5>
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
                      <div className='mt-3'><span onClick={pageState==='Update'? editInteraction:deleteInteraction} style={{margin:'25px',fontSize:'22px', padding:'5px 10px', color:'white', backgroundColor: pageState==='Update'? 'green':'red', cursor:'pointer',borderRadius:'8px',}}>{pageState}</span></div>
                      )}
            </div>
            </Modal>
        </div>:(
            <Searchbox edit={true}/>
            )}
    </div>
  )
}
