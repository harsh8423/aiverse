import React,{useEffect} from 'react'
import rocket from "../gifs/Animation - 1710248306156.gif"
import { useNavigate} from "react-router-dom";

export default function Footer() {
    let navigate = useNavigate();

        useEffect(() => {
          // Load the script dynamically
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs';
          script.type = 'module';
          document.body.appendChild(script);
      
          return () => {
            // Clean up the script when the component unmounts
            document.body.removeChild(script);
          };
        }, []);

  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-12 mt-5' style={{display:"flex", justifyContent:'center', alignItems:'center'}}>
            <div>
                <dotlottie-player
                    src="https://lottie.host/5022e86d-5114-4048-be50-347a07b87bf1/hePSVNN5s4.json"
                    background="transparent"
                    speed="1"
                    style={{ width: '150px', height: '150px',transform: 'rotate(-41deg)' }}
                    loop
                    autoplay
                ></dotlottie-player>
            </div>
            {/* <iframe src="https://lottie.host/embed/5022e86d-5114-4048-be50-347a07b87bf1/hePSVNN5s4.json"></iframe> */}
                {/* <img style={{filter: 'color(grey)', transform: 'rotate(-47deg)'}}height={100} width={100} src={rocket}/> */}
            </div>
            <div className='col-12 mt-4' style={{fontSize:'14px'}}>
                <span className='p-2' onClick={()=>{navigate('../Sponsor');window.scrollTo(0, 0)}} style={{cursor:'pointer'}}>Sponsor</span>
                <span className='p-2' onClick={()=>{navigate('../Submit');window.scrollTo(0, 0)}} style={{cursor:'pointer'}}>Submit</span>
                <span className='p-2' onClick={()=>{navigate('../');window.scrollTo(0, 0)}} style={{cursor:'pointer'}}>Newsletter</span>
            </div>
            <div className='col-12 mt-5 mb-5' style={{fontSize:'14px'}}>
                <span>© 2024 AIverse. All right reserved</span><br/>
                <span style={{color:'rgb(156, 156, 156)'}}>Designing for AI, Augmenting with AI</span>
            </div>
        </div>
    </div>
  )
}
