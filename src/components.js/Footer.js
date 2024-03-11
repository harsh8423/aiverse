import React from 'react'
import rocket from "../gifs/rocket.gif"
import { useNavigate} from "react-router-dom";

export default function Footer() {
    let navigate = useNavigate();
  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-12 mt-5'>
                {/* <img style={{filter: 'grayscale(100%)', transform: 'rotate(-45deg)'}}height={80} width={80} src={rocket}/> */}
            </div>
            <div className='col-12 mt-4' style={{fontSize:'14px'}}>
                <span className='p-2' onClick={()=>{navigate('../Sponsor')}} style={{cursor:'pointer'}}>Sponsor</span>
                <span className='p-2' onClick={()=>{navigate('../Submit')}} style={{cursor:'pointer'}}>Submit</span>
                <span className='p-2' onClick={()=>{navigate('../')}} style={{cursor:'pointer'}}>Newsletter</span>
            </div>
            <div className='col-12 mt-5 mb-5' style={{fontSize:'14px'}}>
                <span>© 2024 AIverse. All right reserved</span><br/>
                <span style={{color:'rgb(156, 156, 156)'}}>Designing for AI, Augmenting with AI</span>
            </div>
        </div>
    </div>
  )
}
