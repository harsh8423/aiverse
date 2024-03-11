import React,{useContext, useEffect, useState, useRef} from 'react'
import { useNavigate, useLocation, useParams} from "react-router-dom";
import {ContextApi} from "../components.js/ContextApi";
import DisplayVideo from '../components.js/DisplayVideo';
import DisplayMedia from '../components.js/DisplayMedia';
import { toast, Toaster } from "react-hot-toast";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


export default function Interactions() {

  const { id } = useParams();
  const [uploadDate, setuploadDate] = useState("")
  const [morePattern, setmorePattern] = useState([])
  const [moreAppname, setmoreAppname] = useState([])
  const [interactions, setinteractions] = useState([])
  const [video, setvideo] = useState(null)
  const cdnURL='https://d3wqbogi93pb3.cloudfront.net/';
  let navigate = useNavigate();
  
  
  const getInteraction = async(id)=>{
    
    const response = await fetch("https://aiverse-backend.vercel.app/api/getAll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id:id,
      }),
    });
    const json = await response.json();
    if (json.success) {

      console.log(json.video,json.data)
      setvideo(json.video)
      setinteractions(json.data)
      console.log(interactions);
    }
    
    if (!json.success) {
      toast.error("Error in getting Admin data");
    }
  }
  
  useEffect(() => {
    const inputString = id;
    const extractedString = inputString.match(/[a-zA-Z0-9]+$/)[0];
    console.log(extractedString)
    getInteraction(extractedString)
  }, [id])


  const targetDivRef = useRef(null);

  useEffect(() => {
    // Scroll the target div into view when the component mounts
    if (targetDivRef.current) {
      targetDivRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    var dateObj = new Date(video?.uploadDate);
    var options = { year: 'numeric', month: 'short', day: 'numeric' };
    var formattedDate = dateObj.toLocaleDateString('en-US', options);
    setuploadDate(formattedDate)
  }, [video])

  useEffect(() => {
    const updatedPattern = interactions?.filter((item) => item?.pattern == video?.pattern && item?.name!==video.name);
    const updatedapp = interactions?.filter((item) => item?.appName == video?.appName && item?.name!==video.name);
    setmorePattern(updatedPattern)
    setmoreAppname(updatedapp)
  }, [interactions,video])


  return (
    <div className='container-fluid' style={{textAlign:'left'}}>
      {interactions && video && <div className='row p-4'>
        <div className='col-12 p-3 text-center' style={{backgroundColor:'#faf6ff', border:'1px solid lightgrey',borderRadius:'12px'}}>
          <div style={{fontWeight:545}}>{video.pattern} AI-UX Interaction &nbsp;<span style={{color:'grey'}}>from&nbsp;</span> <span style={{fontWeight:700, fontSize:'18px'}}>{video.appName}</span><span style={{color:'grey', fontSize:'14px', float:'right'}}>Captured on {uploadDate}</span>
          <hr/></div>
          <div>
            
          </div>
              <Swiper
            cssMode={true}
            slidesPerView={1.3}
            spaceBetween={30}
            centeredSlides={true}
            navigation={true}
            // pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div style={{maxHeight:''}} ref={targetDivRef}>
                <DisplayVideo url={`${cdnURL}${video.videoUrl}`}/>
              </div>
            </SwiperSlide>
            {video?.images?.map((item)=>{
              return(
                <SwiperSlide><img  src={`${cdnURL}${item}`} width="100%" height='80%' alt="Image" /></SwiperSlide>

              )
            })}
          </Swiper>
          <div className='p-2' style={{fontWeight:545, textAlign:'left'}}>{video.name}<span>&nbsp;- {video.content}</span><br/><small style={{color:'grey', fontWeight:'bolder' }}>Media source: {video.mediaSource}</small></div>
        </div>
        <div className='container-fluid'>
          <div className='row'>
          {moreAppname && <div className='col-12 mt-5'>
        <h3>More <span style={{fontWeight:700}}>{video.appName} </span> pattern</h3>
        </div>}
          {moreAppname && moreAppname.map((item,index)=>{
            return(
              <div className='col-4 p-3 shover' onClick={() => {navigate(`../Browse/${item.urlSlug}-${item._id}`, {state: item});window.location.reload();}} style={{cursor:'pointer'}} key={index}>
                <div className='mt-1'>
                  <DisplayMedia url={`${cdnURL}${item.gifUrl}`}/>
                </div>
                <div style={{fontWeight:550, fontSize:'13px', display:'flex', justifyContent:'space-between', margin:'4px 10px'}}>
                  <span style={{color:'rgb(99, 99, 99)'}}>{item.name}</span><span style={{color:'rgb(166, 166, 166)'}}>{item.pattern}</span>
                </div>
              </div>
            )
          })}
        </div>
        </div>
        <div className='container-fluid'>
          <div className='row'>
          {morePattern && <div className='col-12 mt-5'>
          <h3>More <span style={{fontWeight:700}}>{video.pattern} </span>AI-UX Interactions</h3>
          </div>}
          {morePattern && morePattern.map((item,index)=>{
            return(
              <div className='col-4 p-3 shover' onClick={() => {navigate(`../Browse/${item.urlSlug}-${item._id}`, {state: item});window.location.reload()}} style={{cursor:'pointer'}} key={index}>
                <div className='mt-1'>
                  <DisplayMedia url={`${cdnURL}${item.gifUrl}`}/>
                </div>
                <div style={{fontWeight:550, fontSize:'13px', display:'flex', justifyContent:'space-between', margin:'4px 10px'}}>
                  <span style={{color:'rgb(99, 99, 99)'}}>{item.name}</span><span style={{color:'rgb(166, 166, 166)'}}>{item.pattern}</span>
                </div>
              </div>
            )
          })}
          </div>
        </div>
      </div>}
    </div>
  )
}


















































































// import React,{useContext, useEffect, useState, useRef} from 'react'
// import { useNavigate, useLocation} from "react-router-dom";
// import {ContextApi} from "../components.js/ContextApi";
// import DisplayVideo from '../components.js/DisplayVideo';
// import DisplayMedia from '../components.js/DisplayMedia';

// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';


// export default function Interactions() {

//   const [uploadDate, setuploadDate] = useState("")
//   const [morePattern, setmorePattern] = useState([])
//   const [moreAppname, setmoreAppname] = useState([])
//   const cdnURL='https://d3wqbogi93pb3.cloudfront.net/';
//   let navigate = useNavigate();
//   const location = useLocation();
//   const video= location.state
//   const a = useContext(ContextApi);
//   const interactions= a.interactions

//   const targetDivRef = useRef(null);

//   useEffect(() => {
//     // Scroll the target div into view when the component mounts
//     if (targetDivRef.current) {
//       targetDivRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, []);

//   useEffect(() => {
//     var dateObj = new Date(video.uploadDate);
//     var options = { year: 'numeric', month: 'short', day: 'numeric' };
//     var formattedDate = dateObj.toLocaleDateString('en-US', options);
//     setuploadDate(formattedDate)
//   }, [video])

//   useEffect(() => {
//     const updatedPattern = interactions?.filter((item) => item.pattern == video?.pattern && item.name!==video.name);
//     const updatedapp = interactions?.filter((item) => item.appName == video?.appName && item.name!==video.name);
//     setmorePattern(updatedPattern)
//     setmoreAppname(updatedapp)
//   }, [interactions])
  
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.keyCode === 27) { // Check if the pressed key is Escape (key code 27)
//         window.history.back(); // Navigate to the previous page
//       }
//     };
//     // Add event listener for keydown event
//     document.addEventListener('keydown', handleKeyDown);
//     // Clean up the event listener when the component unmounts
//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, []);


//   return (
//     <div className='container-fluid' style={{textAlign:'left'}}>
//       <div className='row p-4'>
//         <div className='col-12 p-3 text-center' style={{backgroundColor:'#faf6ff', border:'1px solid lightgrey',borderRadius:'12px'}}>
//           <div style={{fontWeight:545}}>{video.pattern} AI-UX Interaction &nbsp;<span style={{color:'grey'}}>from&nbsp;</span> <span style={{fontWeight:700, fontSize:'18px'}}>{video.appName}</span><span style={{color:'grey', fontSize:'14px', float:'right'}}>Captured on {uploadDate}</span>
//           <hr/></div>
//           <div>
            
//           </div>
//               <Swiper
//             cssMode={true}
//             slidesPerView={1.3}
//             spaceBetween={30}
//             centeredSlides={true}
//             // navigation={true}
//             // pagination={true}
//             mousewheel={true}
//             keyboard={true}
//             modules={[Navigation, Pagination, Mousewheel, Keyboard]}
//             className="mySwiper"
//           >
//             <SwiperSlide>
//               <div style={{maxHeight:''}} ref={targetDivRef}>
//                 <DisplayVideo url={`${cdnURL}${video.videoUrl}`}/>
//               </div>
//             </SwiperSlide>
//             {video?.images?.map((item)=>{
//               return(
//                 <SwiperSlide><img  src={`${cdnURL}${item}`} width="100%" height='80%' alt="Image" /></SwiperSlide>

//               )
//             })}
//           </Swiper>
//           <div className='p-2' style={{fontWeight:545, textAlign:'left'}}>{video.name}<span>&nbsp;- {video.content}</span><br/><small style={{color:'grey', fontWeight:'bolder' }}>Media source: {video.mediaSource}</small></div>
//         </div>
//         <div className='container-fluid'>
//           <div className='row'>
//           {moreAppname && <div className='col-12 mt-5'>
//         <h3>More <span style={{fontWeight:700}}>{video.appName} </span> pattern</h3>
//         </div>}
//           {moreAppname && moreAppname.map((item,index)=>{
//             return(
//               <div className='col-4 p-3 shover' onClick={() => {navigate(`../Browse/${item.urlSlug}`, {state: item});window.location.reload()}} style={{cursor:'pointer'}} key={index}>
//                 <div className='mt-1'>
//                   <DisplayMedia url={`${cdnURL}${item.gifUrl}`}/>
//                 </div>
//                 <div style={{fontWeight:550, fontSize:'13px', display:'flex', justifyContent:'space-between', margin:'4px 10px'}}>
//                   <span style={{color:'rgb(99, 99, 99)'}}>{item.name}</span><span style={{color:'rgb(166, 166, 166)'}}>{item.pattern}</span>
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//         </div>
//         <div className='container-fluid'>
//           <div className='row'>
//           {morePattern && <div className='col-12 mt-5'>
//           <h3>More <span style={{fontWeight:700}}>{video.pattern} </span>AI-UX Interactions</h3>
//           </div>}
//           {morePattern && morePattern.map((item,index)=>{
//             return(
//               <div className='col-4 p-3 shover' onClick={() => {navigate(`../Browse/${item.urlSlug}`, {state: item});window.location.reload()}} style={{cursor:'pointer'}} key={index}>
//                 <div className='mt-1'>
//                   <DisplayMedia url={`${cdnURL}${item.gifUrl}`}/>
//                 </div>
//                 <div style={{fontWeight:550, fontSize:'13px', display:'flex', justifyContent:'space-between', margin:'4px 10px'}}>
//                   <span style={{color:'rgb(99, 99, 99)'}}>{item.name}</span><span style={{color:'rgb(166, 166, 166)'}}>{item.pattern}</span>
//                 </div>
//               </div>
//             )
//           })}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
