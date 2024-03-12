import React, { useState,useEffect, useContext,useRef } from 'react'
import { useNavigate, useParams} from "react-router-dom";
import {ContextApi,AdminContext} from "../components.js/ContextApi";
import { toast, Toaster } from "react-hot-toast";
import { Bars } from 'react-loader-spinner'

import Footer from '../components.js/Footer'
import Browse from './Browse';
import Voyager from './Voyager';
import ContextAdmin from '../components.js/ContestAdmin';


export default function Home() {
    
    const a = useContext(ContextApi);
    const b = useContext(AdminContext);

    
    let navigate = useNavigate();
    const [interactions, setinteractions] = useState([])
    

    const miniguides = useRef(null);
    const newsletter = useRef(null);
    const browse = useRef(null);

    const getminiguidesview=()=>{
        if (miniguides.current) {
            miniguides.current.scrollIntoView({ behavior: 'smooth' });
          }
    }
    const getnewsletterview=()=>{
        if (newsletter.current) {
            newsletter.current.scrollIntoView({ behavior: 'smooth' });
          }
    }
    const getbrowseview=()=>{
        if (browse.current) {
            browse.current.scrollIntoView({ behavior: 'smooth' });
          }
    }
    
    const getInteraction = async()=>{
        
        const response = await fetch("https://aiverse-backend.vercel.app/api/getInteraction", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const json = await response.json();
        if (json.success) {
            setinteractions(json.data)
            localStorage.setItem("interactions", JSON.stringify(json.data));
            console.log(interactions);
        }
    
        if (!json.success) {
          toast.error("Error in getting Admin data");
        }
      }
    
      useEffect(() => {
        setinteractions(a?.interactions)
        getInteraction()
      }, []
      )
      const addcontext=(admin)=>{
        return(<ContextAdmin Admin={admin}/>)
      }
      const [Admin, setAdmin] = useState(b?.admin)
      const getData = async()=>{
            
        const response = await fetch("https://aiverse-backend.vercel.app/api/getAdmin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
        const json = await response.json();
        if (json.success) {
          console.log(json);
          addcontext(json.data)
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

      const [scrollOff, setScrollOff] = useState(false);

      const handleScrollOff = () => {
        setScrollOff(true);
      };

      const [selected, setSelected] = useState([]);

      
  return (
    <>
    <div className='grad'></div>
    {/* <iframe src="https://embeds.beehiiv.com/a3e9c954-5128-4d3d-9b41-ac9567390374?slim=true" data-test-id="beehiiv-embed" width="90%" height="52" frameBorder="0"  style={{zIndex:10, margin: '0px', borderRadius: '0px', backgroundColor: "transparent"}}></iframe> */}
    <div className='container'>
    <Toaster toastOptions={{ duration: 2000 }} />
        <div className='row'>
            <div className='col-12 mt-5 mb-5' style={{fontWeight:'bold', color:'#A884DB', fontSize:'1.2vmax'}}>
            Are you future ready? Welcome to the AI universe!
            </div>
            <div className='col-12 mt-4' style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <div className=' m-3 ' style={{border:'1px solid #fdca41', borderRadius:'30px', padding:'6px 20px', backgroundColor:'#fccb4230', color:'rgb(153, 120, 37)', fontWeight:700, fontSize:'12px', fontFamily:'sans-serif'}}>UPDATED WEEKLY</div>
                <div>
                    <h1 style={{fontWeight:700, fontSize:'4.3vmax'}}>
                        <span>
                            <strong>Largest library of</strong>
                        </span>
                        <span>
                            <strong><br/></strong>
                        </span>
                        <span>
                            <strong style={{color:'#A884DB'}}>AI-UX Interactions</strong>
                        </span>
                    </h1>
                </div>
                <div className='mt-1'>
                    <h1 style={{fontWeight:400, fontSize:'2.1vmax', color:'rgb(171, 171, 171)', fontFamily:'sans-serif'}}>
                        <span>
                            <strong >Are you wondering how companies are</strong>
                        </span>
                        <span>
                            <strong><br/></strong>
                        </span>
                        <span>
                            <strong>designing for AI? What's the latest AI feature?</strong>
                        </span>
                    </h1>
                </div>
                <div  style={{display:'flex', flexWrap:'wrap', justifyContent:'center', alignItems:'center'}}>
                    <div className='mt-4' onClick={getbrowseview} style={{borderRadius:'12px', boxShadow:'0 1px 20px -6px #a884db)', backgroundColor:'#a884db', color:'white', padding:'6px 28px', fontWeight:700, fontSize:'18px', textDecoration:'none', cursor:'pointer'}}>Browse</div>
                    <div className='mt-4' onClick={getminiguidesview} style={{borderRadius:'12px', boxShadow:'0 1px 20px -6px #f6f0ff)', backgroundColor:'#f6f0ff', textDecoration:'none',padding:'6px 28px',position:'relative', marginLeft:'10px', cursor:'pointer'}}>
                        <div style={{color:'#a884db', fontWeight:300, fontSize:'18px',}}>Become a AIxDesigner</div>
                        <div style={{transform: 'rotate(-12deg)', borderRadius:'12px', backgroundColor:'#fdca41', top:'-7px', left:'-3px', fontWeight:'bold', width:'50px', position:'absolute', color:" #a884db",fontSize:'10px'}}><span>Bonus</span></div>
                    </div>
                </div>
                <div className='mt-5' style={{color:'rgb(156, 156, 156)'}}><h2 style={{ fontSize:'1.2vmax', color:'rgb(171, 171, 171)', fontFamily:'sans-serif'}}><span>
                            some curious minds following us are from
                        </span></h2>
                </div>
                <div className='logos xxx' style={{overflow:'hidden', width:'800px'}}>
                            <div className='logos-slide'>

                                    <span className='m-3'><img style={{filter: 'grayscale(100%)'}} width={90} height={20} src='https://framerusercontent.com/images/c5JtGZyQtPE6LJ2fzel0nwnDXr8.png?scale-down-to=2048' alt='.'/></span>
                                    <span className='m-3'><img style={{filter: 'grayscale(100%)'}} width={90} height={50} src='https://framerusercontent.com/images/IV77MhrItS3CPdUHUvJpVoW8Zx0.png?scale-down-to=2048' alt='.'/></span>
                                    <span className='m-3'><img style={{filter: 'grayscale(100%)'}} width={90} height={20} src='https://framerusercontent.com/images/jlxVQ8fBIZaMlGVT68N3sA4jk.png?scale-down-to=1024' alt='.'/></span>
                                    <span className='m-3'><img style={{filter: 'grayscale(100%)'}} width={90} height={20} src='https://framerusercontent.com/images/OajRFQhOaWAsElVarIfrW6qWdjo.png?scale-down-to=512' alt='.'/></span>
                                    <span className='m-3'><img style={{filter: 'grayscale(100%)'}} width={90} height={50} src='https://framerusercontent.com/images/buZs8ZPFXFkLepJ3YBzk4NQAw0.png' alt='.'/></span>
                                    <span className='m-3'><img style={{filter: 'grayscale(100%)'}} width={90} height={40} src='https://framerusercontent.com/images/t8G7CNhQoMsBPqmbs6zyFMyyd54.png?scale-down-to=1024' alt='.'/></span>
                            </div>
                            <div className='logos-slide'>

                                    <span className='m-3'><img style={{filter: 'grayscale(100%)'}} width={90} height={20} src='https://framerusercontent.com/images/c5JtGZyQtPE6LJ2fzel0nwnDXr8.png?scale-down-to=2048' alt='.'/></span>
                                    <span className='m-3'><img style={{filter: 'grayscale(100%)'}} width={90} height={50} src='https://framerusercontent.com/images/IV77MhrItS3CPdUHUvJpVoW8Zx0.png?scale-down-to=2048' alt='.'/></span>
                                    <span className='m-3'><img style={{filter: 'grayscale(100%)'}} width={90} height={20} src='https://framerusercontent.com/images/jlxVQ8fBIZaMlGVT68N3sA4jk.png?scale-down-to=1024' alt='.'/></span>
                                    <span className='m-3'><img style={{filter: 'grayscale(100%)'}} width={90} height={20} src='https://framerusercontent.com/images/OajRFQhOaWAsElVarIfrW6qWdjo.png?scale-down-to=512' alt='.'/></span>
                                    <span className='m-3'><img style={{filter: 'grayscale(100%)'}} width={90} height={50} src='https://framerusercontent.com/images/buZs8ZPFXFkLepJ3YBzk4NQAw0.png' alt='.'/></span>
                                    <span className='m-3'><img style={{filter: 'grayscale(100%)'}} width={90} height={40} src='https://framerusercontent.com/images/t8G7CNhQoMsBPqmbs6zyFMyyd54.png?scale-down-to=1024' alt='.'/></span>
                            </div>
                        </div>
            </div>
        </div>
    </div>
    <div id='browse' ref={browse} className='container-fluid' style={{width:'94vw'}}>
        <div className='row'>
            <div className='col-12'>
                <div className='containerx'>
                    {
                        !Admin? (
                            <div className='text-center' style={{display:'flex', width:'100%', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>

                                <span>
                                <Bars
                            height="100"
                            width="100"
                            color="#A884DB"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            />
                                </span>
                            </div>
                            )
                            :(
                                <Browse industry={Admin.industry} pattern={Admin.pattern} appName={Admin.appName} />
                            )
                    }
                </div>
                <div  style={{display:'flex',justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                    <div className='mt-2' onClick={()=>{navigate('../Browse', {state:Admin});window.scrollTo(0, 0)}} style={{borderRadius:'12px', boxShadow:'0 1px 20px -6px #a884db)', backgroundColor:'#a884db', color:'white', padding:'6px 28px', fontWeight:700, fontSize:'18px', textDecoration:'none', cursor:'pointer'}}>Browse All {">"}</div>
                    <a className='mt-2' href='https://twitter.com/intent/user?screen_name=aiversedesign' style={{borderRadius:'12px', boxShadow:'0 1px 20px -6px #f6f0ff)', backgroundColor:'#f6f0ff', padding:'6px 28px',position:'relative', marginLeft:'10px'}}>
                        <div style={{color:'#a884db', fontWeight:300, fontSize:'18px',}}>Stay updated @aiversedesign on 𝕏 {">"}</div>
                    </a>
                </div>
            </div>
        </div>
    </div>
        {/* <div style={{backgroundColor:'black'}}> */}
            <div id='miniguides' className='container-fluid mt-5'style={{backgroundColor:'black'}} >
                <div className='row'>
                    <div className='col-12 mb-3' style={{padding:'100px 200px',fontSize:'36px',color:'white'}}>
                        <h2 >
                            <span >“We’re transitioning from</span><span><strong> designing pixels to designing patterns, from digital interfaces to experiences” </strong></span>
                        </h2>
                        <div style={{fontSize:'22px'}}>- Noah Levin, VP at Figma</div>
                    </div>
                    <div className='col-12' ref={miniguides}>
                        <div style={{ display:'flex',justifyContent:'center', alignItems:'center'}}>
                            <div style={{borderRadius:'12px', backgroundColor:'#fdca41',fontWeight:'bold', width:'70px',color:" #a884db"}}>Bonus</div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div>
                            <h1 style={{fontWeight:700, fontSize:'3.6vmax',color:'white'}}>
                                <span>
                                    <strong>Mini guides to</strong>
                                </span>
                                <span>
                                    <strong><br/>become an</strong>
                                </span>
                                <span>
                                    <strong style={{color:'#A884DB'}}> AIxDesigner</strong>
                                </span>
                            </h1>
                        </div>
                        <div className='mt-3' style={{color:'rgb(156, 156, 156)'}}><h2 style={{ fontSize:'1.2vmax', color:'rgb(171, 171, 171)', fontFamily:'sans-serif'}}><span>
                                <strong>a series of mini guides to 100x designers and design teams</strong>
                            </span></h2>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexWrap:'wrap'}}>
                            <div className='p-4' style={{cursor:'pointer'}} onClick={()=>{navigate('../SpeakTheLanguage');window.scrollTo(0, 0)}}>
                                <div className='cont' style={{borderRadius:'20px', backgroundColor:'#262626'}}></div>
                                <div className='mt-3' style={{width:'250px', textAlign:'left', lineHeight:1.3}}>
                                    <span style={{fontSize:'24px',color:'white', fontWeight:500}}><strong>Speak the language</strong></span><br/>
                                    <span style={{color:'rgb(176, 176, 176)', fontWeight:400}}>A visual guide to understand AI. To better collaborate with the product team and developers.</span>
                                </div>
                            </div>
                                    <div className='p-4'>
                                        <div className='' style={{height:'250px',width:'250px' ,borderRadius:'20px', backgroundColor:'#262626',display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                                            <p style={{color:'rgb(79, 79, 79)', fontSize:'15px', padding:'20px'}}>Releasing soon.Subscribe below to get notified.</p>
                                        </div>
                                        <div className='mt-3' style={{width:'250px', textAlign:'left', lineHeight:1.3}}>
                                    <span style={{fontSize:'24px',color:'rgb(122, 122, 122)', fontWeight:500}}><strong>Second principles</strong></span><br/>
                                    <span style={{color:'rgb(110, 110, 110)', fontWeight:400}}>A visual guide to understand AI. To better collaborate with the product team and developers.</span>
                                </div>
                                    </div>
                                    <div className='p-4' >
                                        <div style={{height:'250px',width:'250px' ,borderRadius:'20px', backgroundColor:'#262626',display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                                            <p style={{color:'rgb(79, 79, 79)', fontSize:'15px', padding:'20px'}}>Releasing soon.Subscribe below to get notified.</p>
                                        </div>
                                        <div className='mt-3' style={{width:'250px', textAlign:'left', lineHeight:1.3}}>
                                    <span style={{fontSize:'24px',color:'rgb(122, 122, 122)', fontWeight:500}}><strong>Designing a Chatbot </strong>Enterprise Edition</span><br/>
                                    <span style={{color:'rgb(110, 110, 110)', fontWeight:400}}>All AI-UX patterns summarized.</span>
                                </div>
                                    </div>
                        </div>
                        <div className='m-4'>
                            <span style={{ backgroundColor:'#f6f0ff', fontWeight:700, padding:'6px 10px', borderRadius:'8px', cursor:'pointer'}} onClick={getnewsletterview}><span >Subscribe </span><span>to stay up to date and keep levelling up as a <strong>AIxDesigner</strong></span></span>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
            <div id='newsletter' ref={newsletter} className='cantainer'>
                <Voyager/>
            </div>
            <Footer/>
    </>
  )
}
