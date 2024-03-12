import React,{useState} from 'react'
import { Bars } from 'react-loader-spinner'
import robot from "../images/robot.webp"
import { toast, Toaster } from "react-hot-toast";

export default function Voyager(){

    const [email, setemail] = useState("")
    const [spinner, setspinner] = useState(false)

    const submitEmail = async()=>{
        
        if(email){
            setspinner(true)    
            const response = await fetch("https://aiverse-backend.vercel.app/api/addemail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email:email,
          }),
        });
        const json = await response.json();
        setemail("")
        setspinner(false)
        console.log(json);
        if (json.success) {
          toast.success("Sent successfully"); 
        }
        if (!json.success) {
          toast.error("Bug credentials Missing");
        }
        }
      }

  return (
    <div className='row'>
        <Toaster toastOptions={{ duration: 2000 }} />
                    <div className='col-12' style={{padding:'80px 350px 0px 350px',fontSize:'36px'}}>
                        <h2 >
                        <div className='mt-3 mb-3' style={{color:'rgb(156, 156, 156)'}}><h2 style={{ fontSize:'1.4vmax', color:'rgb(171, 171, 171)', fontFamily:'sans-serif'}}><span>
                                <strong>wait wait, that's not all..</strong>
                            </span></h2>
                        </div>
                            <span ><strong>If you're a designer figuring out how to go about the buzz-word of the decade "AI"</strong></span>
                        </h2>
                        <div className='mt-4'>
                            <h1 style={{fontWeight:700, fontSize:'3.6vmax'}}>
                                <span>
                                    <strong>There's an empty seat </strong>
                                </span>
                                <span>
                                    <strong><br/>in</strong>
                                </span>
                                <span>
                                    <strong style={{color:'#A884DB'}}> the Voyager</strong>
                                </span>
                            </h1>
                        </div>
                    </div>
                    <div className='col-12 mt-3' style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <iframe src="https://embeds.beehiiv.com/a3e9c954-5128-4d3d-9b41-ac9567390374?slim=true" data-test-id="beehiiv-embed" width="450px" height="52" frameBorder="0"  style={{zIndex:10, margin: '0px', borderRadius: '0px', backgroundColor: "transparent"}}></iframe>
                    </div>
                    <div className='col-12 mt-3' style={{fontSize:'1.2vmax'}}>
                        <a style={{color:'black', textDecoration:'underline'}} href='https://voyager.beehiiv.com/p/altitudes-of-ai'>(Latest Issue) Altitudes of AI-UX? {">"}</a><br/>
                        <a style={{color:'black', textDecoration:'underline'}} href='https://voyager.beehiiv.com/p/paradigm-shift-aiux'>(First Issue) The paradigm shift in AIxDesign {">"}</a>
                    </div>
                    <div className='col-12 mt-3'>
                        <img src={robot} width={130} height={130}/>
                    </div>
                    
                    <div className='col-12 mt-2'style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                        <div className='mt-5' style={{color:'rgb(156, 156, 156)'}}>
                            <h2 style={{ fontSize:'1.2vmax', color:'rgb(171, 171, 171)', fontFamily:'sans-serif'}}>
                                <span>
                                    some curious minds following us are from
                                </span>
                            </h2>
                        </div>
                        <div className='logos xxx' style={{overflow:'hidden', width:'600px'}}>
                            <div className='logos-slide'>

                                    <span className='m-3'><img style={{filter: 'grayscale(100%)'}} width={90} height={"auto"} src='https://framerusercontent.com/images/c5JtGZyQtPE6LJ2fzel0nwnDXr8.png?scale-down-to=2048' alt='.'/></span>
                                    <span className='m-3'><img style={{filter: 'grayscale(100%)'}} width={90} height={"auto"} src='https://framerusercontent.com/images/IV77MhrItS3CPdUHUvJpVoW8Zx0.png?scale-down-to=2048' alt='.'/></span>
                                    <span className='m-3'><img style={{filter: 'grayscale(100%)'}} width={90} height={"auto"} src='https://framerusercontent.com/images/jlxVQ8fBIZaMlGVT68N3sA4jk.png?scale-down-to=1024' alt='.'/></span>
                                    <span className='m-3'><img style={{filter: 'grayscale(100%)'}} width={90} height={"auto"} src='https://framerusercontent.com/images/OajRFQhOaWAsElVarIfrW6qWdjo.png?scale-down-to=512' alt='.'/></span>
                                    <span className='m-3'><img style={{filter: 'grayscale(100%)'}} width={90} height={"auto"} src='https://framerusercontent.com/images/buZs8ZPFXFkLepJ3YBzk4NQAw0.png' alt='.'/></span>
                                    <span className='m-3'><img style={{filter: 'grayscale(100%)'}} width={90} height={"auto"} src='https://framerusercontent.com/images/t8G7CNhQoMsBPqmbs6zyFMyyd54.png?scale-down-to=1024' alt='.'/></span>
                            </div>
                            <div className='logos-slide'>

                                    <span className='m-3'><img style={{filter: 'grayscale(100%)'}} width={90} height={"auto"} src='https://framerusercontent.com/images/c5JtGZyQtPE6LJ2fzel0nwnDXr8.png?scale-down-to=2048' alt='.'/></span>
                                    <span className='m-3'><img style={{filter: 'grayscale(100%)'}} width={90} height={"auto"} src='https://framerusercontent.com/images/IV77MhrItS3CPdUHUvJpVoW8Zx0.png?scale-down-to=2048' alt='.'/></span>
                                    <span className='m-3'><img style={{filter: 'grayscale(100%)'}} width={90} height={"auto"} src='https://framerusercontent.com/images/jlxVQ8fBIZaMlGVT68N3sA4jk.png?scale-down-to=1024' alt='.'/></span>
                                    <span className='m-3'><img style={{filter: 'grayscale(100%)'}} width={90} height={"auto"} src='https://framerusercontent.com/images/OajRFQhOaWAsElVarIfrW6qWdjo.png?scale-down-to=512' alt='.'/></span>
                                    <span className='m-3'><img style={{filter: 'grayscale(100%)'}} width={90} height={"auto"} src='https://framerusercontent.com/images/buZs8ZPFXFkLepJ3YBzk4NQAw0.png' alt='.'/></span>
                                    <span className='m-3'><img style={{filter: 'grayscale(100%)'}} width={90} height={"auto"} src='https://framerusercontent.com/images/t8G7CNhQoMsBPqmbs6zyFMyyd54.png?scale-down-to=1024' alt='.'/></span>
                            </div>
                        </div>
                    </div>
                </div>
  )
}
