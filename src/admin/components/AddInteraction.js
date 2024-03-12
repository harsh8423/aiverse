import React,{useState} from 'react'
import { toast, Toaster } from "react-hot-toast";
import cancel from "../../images/cancel.png"
import { ThreeCircles } from 'react-loader-spinner'
import ContextStat from '../../components.js/ContetxStat';


export default function AddInteraction(props) {

  const [spinner, setspinner] = useState(false)

  const {industryx, patternx, appNamex}=props
  const [appName, setappName] = useState("")
  const [pattern, setpattern] = useState("")
  const [industry, setindustry] = useState("")
  const [images, setimages] = useState([])
  const [img, setimg] = useState("")
    const [credentials, setcredentials] = useState({
        name: "",
        mediaSource: "",
        videoUrl:'',
        gifUrl:'',
        iconUrl:'',
        content:'',
      });
      const onChangeHander = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value });
      };
      const setnull = ()=>{
        setcredentials({
          name: "",
          mediaSource: "",
          videoUrl:'',
          gifUrl:'',
          iconUrl:'',
          content:'',
        })
        setappName('')
        setimages([])
        setpattern('')
        setindustry('')
        setspinner(false)
      }

      const addcontext=(Interactions)=>{
        return(<ContextStat Interactions={Interactions}/>)
      }
      
      const addInteraction = async()=>{
        
        const response = await fetch("http://localhost:5000/api/addInteraction", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
          name:credentials.name,
          mediaSource:credentials.mediaSource,
          industry:industry,
          appName:appName,
          pattern:pattern,
          gifUrl:credentials.gifUrl,
          iconUrl:credentials.iconUrl,
          content:credentials.content,
          videoUrl:credentials.videoUrl,
          images:images
        }),
      });
      const json = await response.json();
      setnull()
      console.log(json);
      if (json.success) {
        addcontext(json.data)
        toast.success("Added successfully");
        console.log("Added successfully")
        
      }
      
      if (!json.success) {
        toast.error("Something went wrong");
      }
    }



    const onSubmit=()=>{
      if(appName && industry && pattern && credentials.name && credentials.gifUrl && credentials.videoUrl && credentials.iconUrl && credentials.mediaSource){
        setspinner(true)
        addInteraction()
      }else{
        toast.error("Input field is empty");
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
    
  return (
    <div className='container' style={{textAlign:'left'}}>
      <Toaster toastOptions={{ duration: 2000 }} />
      <div className='row'>
        <div className='col-12 mt-3'>
        <h2 style={{fontWeight:700}}>Add Interaction</h2>
          <div style={{display:'flex',alignItems:'center', flexWrap:'wrap'}}>
            <input style={{border:'2px solid grey', borderRadius:'8px',margin:'4px'}} onChange={onChangeHander} type="text" className="form__input" name="name" placeholder="video name" value={credentials.name} required="" />
            <input style={{border:'2px solid grey', borderRadius:'8px',margin:'4px'}} onChange={onChangeHander} type="text" className="form__input" name="mediaSource" placeholder="Media Source" value={credentials.mediaSource} required="" />
          </div>
          <div style={{display:'flex',alignItems:'center', flexWrap:'wrap'}}>
            <input style={{border:'2px solid grey', borderRadius:'8px',margin:'4px',}} onChange={onChangeHander} type="text" className="form__input" name="videoUrl" placeholder="video Url" value={credentials.videoUrl} required="" />
            <input style={{border:'2px solid grey', borderRadius:'8px',margin:'4px',}} onChange={onChangeHander} type="text" className="form__input" name="gifUrl" placeholder="gif Url" value={credentials.gifUrl} required="" />
          </div>
          <div>
            <input style={{border:'2px solid grey', borderRadius:'8px',margin:'4px'}} onChange={onChangeHander} type="text" className="form__input" name="iconUrl" placeholder="Icon Url" value={credentials.iconUrl} required="" />
            <br/>
            <h5 style={{fontWeight:700, marginTop:'5px'}}>Content (Optional)</h5>
            <textarea style={{border:'2px solid grey', borderRadius:'8px', margin:'5px', width:'90%'}} rows={3} onChange={onChangeHander} value={credentials.content} className="form__input" name="content" placeholder="describe...." required="" />
          </div>
          
        </div>
        <div className='col-12'>
            <h5 style={{fontWeight:700, marginTop:'20px'}}>App Name</h5>
                {appNamex.map((item,index)=>{
                    return(
                        <span onClick={()=>{setappName(item)}} key={index} className={`hovered ${appName===item ? 'clicked' : '' }`}style={{cursor:'pointer',fontSize:'22px', border:'2px solid grey', padding:'5px 20px', borderRadius:'8px', margin:'5px'}}>{item}</span>
                    )
                })}
            <h5 style={{fontWeight:700, marginTop:'20px'}}>Industry</h5>
            {industryx.map((item, index)=>{
                    return(
                        <span onClick={()=>{setindustry(item)}} key={index} className={`hovered ${industry===item ? 'clicked' : ''}`} style={{cursor:'pointer',fontSize:'22px', border:'2px solid grey', padding:'5px 20px', borderRadius:'8px', margin:'5px'}}>{item}</span>
                    )
                })}
            <h5 style={{fontWeight:700, marginTop:'20px'}}>Pattern</h5>
            {patternx.map((item, index)=>{
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
            <span onClick={onSubmit} style={{fontSize:'22px', padding:'7px 20px', color:'white', backgroundColor:'black', cursor:'pointer',borderRadius:'8px'}}>Submit</span>
          )}
        </div>
      </div>
    </div>
  )
}
