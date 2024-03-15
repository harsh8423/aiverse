import React, { useState } from 'react'
import robot from "../images/robot2.png"
import spons from "../images/sponsor.png"
import Footer from './Footer'
import { toast, Toaster } from "react-hot-toast";
import { ThreeCircles } from 'react-loader-spinner'


export default function Sponsor() {

  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    detail: "",
  });
  const [spinner, setspinner] = useState(false)


  const onChangeHander = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const addsponsor = async()=>{
    setspinner(true)  
    const response = await fetch("https://aiverse-backend.vercel.app/api/addsponsor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:credentials.name,
        detail:credentials.detail,
        email:credentials.email
      }),
    });
    const json = await response.json();
    setcredentials({
      name: "",
      email: "",
      detail: "",
    })
    setspinner(false)
    console.log(json);
    if (json.success) {
      toast.success("Added successfully");
      console.log("Added successfully")
      
    }

    if (!json.success) {
      toast.error("Bug credentials Missing");
    }
  }



  return (
    <div className='container' style={{textAlign:'left'}}>
      <Toaster toastOptions={{ duration: 2000 }} />
      <div className='row mt-5 p-4'>
        <div className='col-12'><img src={robot} width={100} height={100}/></div>
        <div className='col-12 col-md-8 mt-5'>
          <h1 style={{fontWeight:900, fontFamily:'Maven Pro', letterSpacing: '-0.02'}}>Sponsor the AIverse Gallery</h1>
          <p className='mt-5'>
            You must have seen our library of AI-UX interactions, the largest out there? We breathe and sleep AI and add new interactions every week! <br/> <br/>
            We believe the AI hype wouldn't have existed if ChatGPT wasn't launched, but here's the thing, ChatGPT wouldn't have taken off if it wasn't "chatting". The chat interface, conversational UX, is only one type of AI-UX interaction.  <br/> <br/>
            There's more coming. We're going to grow.  <br/> <br/>
            Get in early before you're left just browsing. <br/> <br/>
          </p>
          <p>
            <strong>Some statistics you might like:</strong>
            <ul>
              <li>Traffic monthly: <strong>3.4k+</strong></li>
              <li>Growth rate:  <strong>25%</strong></li>
            </ul>
          </p>
          <p>
            <strong>What you get</strong>
            <ul>
              <li>
                <p>A spot on the AI-UX gallery</p>
               
              </li>
            </ul>
            <img src={spons} width={'80%'} height={"auto"}/>
          </p>
          <br/> <br/>
          <hr/>
        </div>
        <div className='col-12 col-md-8'>
          <p>If you're keen, get in touch with us and we'll reach out to you really soon!</p>
          <h6><strong>Your Info</strong></h6>
          <input style={{border:'1px solid lightgrey', borderRadius:'8px', margin:'5px'}} onChange={onChangeHander} value={credentials.name} type="text" className="form__input" name='name' placeholder="Name" required="" />
          <input style={{border:'1px solid lightgrey', borderRadius:'8px', margin:'5px'}} onChange={onChangeHander} value={credentials.email} type="text" className="form__input" name="email" placeholder="Email address" required="" />
          <br/>
          <h6><strong>Additional details</strong></h6>
          <textarea style={{border:'1px solid lightgrey', borderRadius:'8px', margin:'5px', width:'90%'}} onChange={onChangeHander} value={credentials.detail} type="textarea" className="form__input" name='detail' placeholder="Tell us more about your company or product!" required="" />
          <br/><br/>
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
            <span onClick={addsponsor}  style={{fontSize:'22px', padding:'5px 20px', color:'white', backgroundColor:'black', cursor:'pointer',borderRadius:'8px'}}>Submit</span>
          )}
        </div>
        <div className='col-12' style={{textAlign:'center'}}><Footer/></div>
      </div>
    </div>
  )
}
