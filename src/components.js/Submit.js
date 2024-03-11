import React,{useState} from 'react'
import robot from "../images/robot2.png"
import Footer from './Footer'
import { toast, Toaster } from "react-hot-toast";
import { ThreeCircles } from 'react-loader-spinner'

export default function Submit() {

  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    desc: "",
    url:''
  });

  const [spinner, setspinner] = useState(false)

  const onChangeHander = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const addsubmit = async()=>{
    setspinner(true)    
    const response = await fetch("http://localhost:5000/api/addsubmit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:credentials.name,
        desc:credentials.desc,
        email:credentials.email,
        url:credentials.url
      }),
    });
    const json = await response.json();
    setcredentials({
      name: "",
      email: "",
      desc: "",
      url:''
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
      <div className='row mt-5'>
      <div className='col-12'><img src={robot} width={100} height={100}/></div>
        <div className='col-8 mt-5'>
          <h1 style={{fontWeight:900}}>Submit to AIverse Gallery</h1>
          <p className='mt-5'>
           Got something that excites you? Something that feels magical? We would love to feature what you've worked on or found on the internet.<br/> <br/>
            Share them with the rest of the world through our largest library of AI-UX interactions. <br/> <br/>
            We breathe and sleep AI and add new interactions every week!<br/> <br/>
            We believe the AI hype wouldn't have existed if ChatGPT wasn't launched, but here's the thing, ChatGPT wouldn't have taken off if it wasn't "chatting". The chat interface, conversational UX, is only one type of AI-UX interaction. <br/> <br/>
            There's more coming. We're growing.  <br/> <br/>
          </p>
          <h5>
            <strong>Share your magical POV with the rest of us!</strong>
          </h5>
          <hr/>
        </div>
        <div className='col-8'>
          <p>Don't deprive us any longer.</p>
          <h5>
            <strong>Please describe your AI-UX interaction</strong>
          </h5>
          <textarea style={{border:'2px solid grey', borderRadius:'8px', margin:'5px', width:'90%'}} rows={3} onChange={onChangeHander} value={credentials.desc} className="form__input" name="desc" placeholder="Something magical - what is it, where you found/created it, link to the interaction" required="" />
          <br/>
          <h5>
            <strong>Any screenshots or recordings you'd like to add?</strong>
          </h5>
          <input style={{border:'2px solid grey', borderRadius:'8px', margin:'5px', width:'90%'}} value={credentials.url} onChange={onChangeHander} type="text" className="form__input" name="url" placeholder="Paste the URL or Google Drive link" required="" />
          <br/>
          <h3>Your Info</h3>
          <input style={{border:'2px solid grey', borderRadius:'8px', margin:'5px'}} onChange={onChangeHander} type="text" className="form__input" name="name" placeholder="Name" value={credentials.name} required="" />
          <input style={{border:'2px solid grey', borderRadius:'8px', margin:'5px'}} onChange={onChangeHander} type="text" className="form__input" name='email' placeholder="Email address" value={credentials.email} required="" />
          <p>So we can notify you if your submission is accepted!</p>
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
            <span onClick={addsubmit} style={{fontSize:'22px', padding:'5px 20px', color:'white', backgroundColor:'black', cursor:'pointer',borderRadius:'8px'}}>Submit</span>
          )}
        </div>
        <div className='col-12' style={{textAlign:'center'}}><Footer/></div>
      </div>
    </div>
  )
}
