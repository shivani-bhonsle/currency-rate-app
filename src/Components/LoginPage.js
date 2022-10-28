import React, { useEffect, useRef, useState } from "react";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import BarChart from "./barChart";
import Stats from './stats';


export default function LoginPage() {
    const myRef = useRef(null);
    const emailElement = useRef(null);
    const nameElement = useRef(null);
    const [name,setName]=useState("")
    const [email,setEmail]=useState("");
    const [rate,setRate]=useState(() => {
            const item = JSON.parse(window.localStorage.getItem("MY_APP_RATES"));
           return item || {}
    });
    const [errorMsg, setErrorMsg]=useState(false);
    const [responseTime,setResponseTime]=useState(()=>{
        const item = window.localStorage.getItem("Time");
        return item || ""
    })
    const date = new Date();
   async function handleSubmit(e) {
        e.preventDefault();
        var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (!email.match(mailformat)) {
            setErrorMsg(true)
            emailElement.current.focus();
            return false;
        } else if (name===''){
            setErrorMsg(true)
            nameElement.current.focus();
            return false;
        }
        window.localStorage.setItem("Name",name)
        window.localStorage.setItem("Email",email)
        myRef.current.scrollIntoView();
        setErrorMsg(false)
        let response = fetch('https://api.exchangerate.host/latest');
        let value = await response;
        let result = await value.json();
        setRate(result.rates); 
        let time = date.getTime();
        let savedTime = window.localStorage.getItem("Time")
        savedTime==null?setResponseTime(0):setResponseTime(millisToMinutesAndSeconds(time-savedTime));
        console.log(savedTime)
        console.log(time-savedTime)
        window.localStorage.setItem("Time",time)
        setInterval(fetchRate,300000)
    }
    async function fetchRate(){
            let response = fetch('https://api.exchangerate.host/latest');
            let value = await response;
            let result = await value.json();
            setRate(result.rates) ;
            console.log("rate fetched after 5 mins!")
    }

    function millisToMinutesAndSeconds(millis) {
        // var milliseconds = parseInt((millis % 1000) / 100),
        // seconds = Math.floor((millis / 1000) % 60),
        // minutes = (minutes < 10) ? "0" + minutes : minutes;
        // seconds = (seconds < 10) ? "0" + seconds : seconds;
        // return minutes + ":" + seconds + "." + milliseconds;
        // var minutes = Math.floor(millis / 60000);
        var minutes = Math.floor((millis / (1000 * 60)) % 60)
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
      }

    useEffect(() => {
        const data = window.localStorage.getItem('MY_APP_RATES');
        if ( data !== null ) setRate(JSON.parse(data));
      }, []);
    
      useEffect(() => {
        window.localStorage.setItem('MY_APP_RATES',JSON.stringify(rate));
      }, [rate]);
    

    
    return(
        <>
        <div className="surface-card p-8 shadow-2 border-round w-full lg:w-6 m-auto mt-8">
    <div className="text-center mb-5">
        <div className="text-900 text-3xl font-medium mb-3">Currency Rates</div>
    </div>

    <div>
        <div>
        <label htmlFor="name" className="block text-900 font-medium mb-2 text-left">Name</label>
        <InputText id="name" type="text" className="w-full mb-0" placeholder="First Name" required value={name} onChange={e=>setName(e.target.value)} ref={nameElement} />
        {errorMsg && <small id="username2-help" className="p-error block text-left">Enter a Name</small>}
        <label htmlFor="email" className="block text-900 font-medium mb-2 mt-5 text-left">Email</label>
        <InputText type="text" className="w-full mb-0 " placeholder="Email" required value={email} onChange={e=>setEmail(e.target.value)} ref={emailElement}/>
        {errorMsg && <small id="username2-help" className="p-error block text-left">Enter valid Email ID.</small>}
        </div>

        <Button label="Submit" icon="pi pi-arrow-circle-right" className="w-full mt-5" onClick={handleSubmit}/>
    </div>
</div>

<div ref={myRef}>
{(errorMsg===false) && Object.keys(rate).length>0 && <BarChart rates = {rate}/>}
{(errorMsg===false) && Object.keys(rate).length>0 && <h2>Time elapsed between API requests: {responseTime}<small> minutes/seconds</small></h2>}
</div>
{(errorMsg===false) && Object.keys(rate).length>0 &&<Stats rates = {rate}/>}

</>
    
    );
}

