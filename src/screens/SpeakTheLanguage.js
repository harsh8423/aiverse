import React,{useState} from 'react'
import { toast, Toaster } from "react-hot-toast";

import cardaz from "../images/cardaz.webp"
import stl1 from "../images/stl1.webp"
import stl2 from "../images/stl2.webp"
import stl3 from "../images/gBBZmcuhk7tK8WVXA94UdpjFwtk.svg"
import lock from "../images/lock (1).png"
import robot from "../images/robot.webp"

export default function SpeakTheLanguage() {

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
    <div style={{backgroundColor:'black', textAlign:'left'}}>
              <Toaster toastOptions={{ duration: 2000 }} />

      <div className='p-5'><h4><strong>AIverse</strong></h4></div>
      <div className='container'>
        <div className='row'>
          <div className='col-8 mt-2' style={{color:'rgb(176, 176, 176)', fontSize:'14px'}}>
            <div className='' >
              <div style={{borderRadius:'12px', backgroundColor:'#fdca41',width:'80px',color:" #a884db", padding:'2px 10px', fontSize:'10px'}}><span>MINI GUIDE</span></div>
            </div>
            <h1 style={{color:'white', fontWeight:900}}><strong>Speak the language</strong></h1>
            <p >An A-Z visual guide for the buzz word of the decade "AI".</p>
            <br/>
            <p><span style={{color:'white'}}><strong>Things are changing again.</strong></span><span>Things are changing again. AI is bringing in a new era, and yes, it’s got its own set of tricky words. We’re not just about choosing the right colours anymore; it’s time to get smart with tech words! We can’t just be the 'can we have it green and on the right?' squad. We need to level up!</span></p>
            <p><span style={{color:'white'}}><strong>But we've been here before.. we learned to design while keeping business needs in mind, thinking about the KPIs, the outcomes, increasing retention and much more.</strong></span><span>We learned these terms. Now it's just another dictionary to help us share our ideas in terms that the techies understand. It’s like learning a new language just to order your favourite food without any unwanted surprises!</span></p>
          </div>
          <div className='col-4'>
            <img src={cardaz} width="100%" height='auto'/>
          </div>
        </div>
        <div className='row' style={{fontSize:'12px'}}>
          <div className='col-3' style={{borderRadius:'12px', backgroundColor:'white', border:'7px solid black',}}>
            <div style={{borderRadius:'12px', margin:'12px'}}><img style={{borderRadius:'12px',}} src={stl1} width='100%' height="auto"/></div>
            <p style={{borderRadius:'12px', margin:'12px'}}><strong>Tokens</strong> <br/>Basic units that can be encoded. Words are converted to language machines understand.</p>
          </div>
          <div className='col-6' style={{borderRadius:'12px', backgroundColor:'rgb(232, 247, 247)', border:'7px solid black'}}>
            <div style={{margin:'12px'}}>
              <p><strong>Large Language Model or LLMs</strong></p>
              <p>
                Okay, everyone is using this abbreviation left and right! It stands for <strong>Large Language Models</strong>. Huh? <br/><br/>
                What that means is that the language we humans speak, AI can now train on that vast amount of data and even generate. It's essentially limited to everything we do through conversations, through language (which is basically everything!)<br/><br/>
                In short, AI hacked the Operating System of a human = LLM.
              </p>
            </div>
          </div>
          <div className='col-3' style={{borderRadius:'12px', backgroundColor:'white', border:'7px solid black'}}>
          <div style={{borderRadius:'12px', margin:'12px'}}><img style={{borderRadius:'12px',}} src={stl2} width='100%' height="auto"/></div>
            <p style={{margin:'12px'}}><strong>Self attention</strong> <br/>To understand the relationship between words. Each word is given importance based on other words.</p>

          </div>
          <div className='col-8' style={{borderRadius:'12px', backgroundColor:'rgb(238, 232, 247)', border:'7px solid black'}}>
          <p className='mt-4' style={{margin:'12px'}}><strong>GPT 4</strong>vs<strong>Hugging face</strong>vs<strong>Llama 2?</strong></p>
              <p style={{margin:'12px'}}>
                All these are different types of LLMs, not chat, just different models. <br/><br/>
                <strong>ChatGPT</strong> runs on GPT4 created by OpenAI <br/><br/>
                <strong>Hugging chat</strong> is the first open source alternative, created by Huggingface.<br/><br/>
                Llama 2 is just an LLM created by Meta. But according to their recent release, they now have multiple personality chatbots running on Llama 2.
              </p>
          </div>
          <div className='col-4' style={{ border:'7px solid black',paddingRight:'0px', paddingLeft:'0px'}}>
            <img style={{borderRadius:'12px',}} src={stl3} width='100%' height="100%"/>
          </div>
          <div className='col-12' style={{fontSize:'18px',borderRadius:'12px',color:'white', backgroundColor:'#a884db', border:'7px solid black', position:'relative', height:'auto', overflow:'hidden'}}>
          <p style={{margin:'12px', fontWeight:900}}><strong>Bridging the gap between Design and AI</strong></p>
          <p style={{margin:'12px'}}>
          using simple visuals (+aesthetic) and real-life examples, <br/>you know, the way we designers learn!  
          </p>
          <p style={{margin:'12px'}}>
                <strong>More coming soon,</strong> get notified & 
                <strong>subscribe to the Voyager</strong> 
          </p>
          <div className='mb-4' style={{width:'auto'}}>
          <iframe src="https://embeds.beehiiv.com/a3e9c954-5128-4d3d-9b41-ac9567390374?slim=true" data-test-id="beehiiv-embed" width="450px" height="52" frameBorder="0"  style={{zIndex:10, margin: '0px', borderRadius: '0px', backgroundColor: "transparent"}}></iframe>

          </div>

          <div style={{position:'absolute', backgroundColor:'white', zIndex:10, borderRadius:'500px', padding:'100px', top:-40, right:-40, bottom:-40}}>
            <img src={robot} width={180} height={160}/>
          </div>

          </div>
          <div className='col-4' style={{borderRadius:'12px', backgroundColor:'rgb(255, 237, 199)', border:'7px solid black'}}>
          <p className='mt-4' style={{margin:'12px'}}><strong>Supervised learning</strong></p>
              <p style={{margin:'12px'}}>
                Start with labelled data set. <br/><br/>
                Eg: Analyzing a picture & having a human expert label it as a cat or a dog. Then separating it into training and validation data set.
                </p>
                <ol>
                  <li>Train the machine on the pattern which you know is correct, then,</li>
                  <li>Machine predicts if it’s a cat or a dog.</li>
                </ol>              
          </div>
          <div className='col-4' style={{borderRadius:'12px', backgroundColor:'rgb(255, 237, 199)', border:'7px solid black'}}>
          <p className='mt-4' style={{margin:'12px'}}><strong>Unsupervised Learning</strong></p>
              <p style={{margin:'12px'}}>
                Unlike the previous approach, in unsupervised leaning, the algorithm finds “natural” groupings, without known outcomes or labels. <br/><br/>
                It finds observations and patterns that may not be obvious to human being.
              </p>
          </div>
          <div className='col-4' style={{borderRadius:'12px', backgroundColor:'rgb(255, 237, 199)', border:'7px solid black'}}>
          <p className='mt-4' style={{margin:'12px'}}><strong>Reinforcement Learning (RL)</strong></p>
              <p style={{margin:'12px'}}>
                You don’t start with a data set or try to recognize patterns, like the previous two, you just have <strong>a starting point</strong> and <strong>a performance metric</strong>.<br/><br/>
                Start somewhere, probe around (<strong><i>explore</i></strong>), chose one (<strong><i>exploit</i></strong>), check if the performance improved or worsened, then continue or go back to try again.
              </p>
          </div>
            <div className='col-6' style={{textAlign:'center',borderRadius:'12px',border:'7px solid black',height:'250px',borderRadius:'20px', backgroundColor:'#262626',display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
              <img src={lock} style={{filter: 'grayscale(100%)'}} width={28} height={28}/>
              <p style={{color:'rgb(79, 79, 79)', fontSize:'15px', padding:'20px'}}>Coming soon.<br/>Subscribe above to get notified.</p>
          </div>
            <div className='col-3' style={{textAlign:'center',borderRadius:'12px',border:'7px solid black',height:'250px',backgroundColor:'#262626',display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
            <img src={lock} style={{filter: 'grayscale(100%)'}} width={28} height={28}/>
              <p style={{color:'rgb(79, 79, 79)', fontSize:'15px', padding:'10px'}}>Coming soon.<br/>Subscribe above to get notified.</p>
          </div>
            <div className='col-3' style={{textAlign:'center',borderRadius:'12px',border:'7px solid black',height:'250px',borderRadius:'20px', backgroundColor:'#262626',display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
            <img src={lock} style={{filter: 'grayscale(100%)'}} width={28} height={28}/>
            <p style={{color:'rgb(79, 79, 79)', fontSize:'15px', padding:'10px'}}>Coming soon.<br/>Subscribe above to get notified.</p>
          </div>
        </div>
        <div className='row' style={{textAlign:'center'}}>
          <div className='col-12 mt-5 mb-5' style={{fontSize:'14px'}}>
              <span style={{color:'white'}}>© 2023 AIverse</span><br/>
              <span style={{color:'rgb(156, 156, 156)'}}>Designing for AI, Augmenting with AI</span>
          </div>
        </div>
      </div>
    </div>
  )
}
