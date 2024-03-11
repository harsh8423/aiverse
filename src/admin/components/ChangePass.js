import React, { useState } from 'react'
import { toast, Toaster } from "react-hot-toast";
import { ThreeCircles } from 'react-loader-spinner'

export default function ChangePass(props) {

    const {password}=props

    const [currentPass, setcurrentPass] = useState("")
    const [Pass, setPass] = useState("")
    const [confirmPass, setconfirmPass] = useState("")
    const [spinner, setspinner] = useState(false)


    const changePassword = async()=>{
        console.log(Pass)
        const response = await fetch("http://localhost:5000/api/changePassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Pass:Pass,
          }),
        });
        const json = await response.json();
        setconfirmPass("")
        setcurrentPass('')
        setPass((''))
        setspinner(false)
        console.log(json);
        if (json.success) {
          toast.success("Changed successfully");
          console.log("Added successfully")
        }
        if (!json.success) {
          toast.error("Bug credentials Missing");
        }
      }

    const submit =()=>{
      setspinner(true)
        if(currentPass && Pass && confirmPass){
            if(currentPass===password){
                if(Pass===confirmPass){
                    changePassword()
                }else{
                  setspinner(false)
                    toast.error("new and current password should be same");
                }
            }else{
              setspinner(false)
                toast.error("Wrong Password");
            }
        }else{
          setspinner(false)
            toast.error("Credentials Missing");
        }
    }

  return (
    <div className='container'>
      <div className='row'>
      <Toaster toastOptions={{ duration: 2000 }} />
      <div className='col-12 mt-5' style={{textAlign:'left'}}>
                    <h3>Current Password</h3>
                    <input onChange={(event)=>{setcurrentPass(event.target.value)}} value={currentPass} style={{border:'2px solid grey', borderRadius:'8px', margin:'5px'}} type="password" className="form__input" placeholder="Current Password" required="" />
                    <br/>
                    <h3>New Password</h3>
                    <input onChange={(event)=>{setPass(event.target.value)}} value={Pass} style={{border:'2px solid grey', borderRadius:'8px', margin:'5px'}} type="password" className="form__input" placeholder="New Password" required="" />
                    <input onChange={(event)=>{setconfirmPass(event.target.value)}} value={confirmPass} style={{border:'2px solid grey', borderRadius:'8px', margin:'5px'}} type="password" className="form__input" placeholder="Confirm Password" required="" />
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
                      <span onClick={submit} style={{fontSize:'22px', padding:'5px 20px', color:'white', backgroundColor:'black', cursor:'pointer',borderRadius:'8px'}}>Submit</span>
                    )}
                </div>
      </div>
    </div>
  )
}
