import React, { useEffect, useState } from "react";


function Stats(props){
    const [historicalData, setHistoricalData]= useState(0);
    const [maxVal,setMaxVal]=useState(0);
    const [perct,setPerct] = useState(0);
    const [currency1,setCurrency1]=useState("");
    const [currency,setCurrency]=useState("");
    const [highestRate, setHighestRate]=useState(0);
    const [convertedValue, setConvertedValue]=useState(0);
    const obj = props.rates;
    async function FetchStatsData(){
            const date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            let day = date.getDate();
            let from = year+"-"+month+"-"+day;
            let url =`https://api.exchangerate.host/${from}`
            let response = fetch(url);
            let value = await response;
            let result = await value.json();
            const rates = result.rates;
            setHistoricalData(rates["USD"])
            let USD=props.rates["USD"];
            let INR = props.rates["INR"];
            if(USD>INR){
                setMaxVal(USD)
                setPerct(((INR/USD)*100).toFixed(2))
                setCurrency1("USD")
            }else{
                setMaxVal(INR)
                setPerct(((USD/INR)*100).toFixed(2))
                setCurrency1("INR")
            }
            const values = Object.values(props.rates);
            let highRate=Math.max(...values);
            setHighestRate(highRate.toFixed(1));
            const key=Object.keys(obj).find(k => obj[k] === highRate);
            setCurrency(key)
            let conversionResponse = fetch('https://api.exchangerate.host/convert?from=USD&to=EUR&amount=1000');
            let conversionValue = await conversionResponse;
            let conversionResult = await conversionValue.json();
            setConvertedValue(conversionResult.result.toFixed(2));
    }
    useEffect(()=>{
        FetchStatsData();
    },[]);                            
    return(
  <>   
<div className="surface-ground px-4 py-5 md:px-6 lg:px-8 mt-8">
<div className="text-900 text-3xl font-medium mb-5">Interesting Stats</div>  
    <div className="grid">
        <div className="col-12 md:col-6 lg:col-3">
            <div className="surface-card shadow-2 p-5 border-round">
                <div className="flex justify-content-between mb-3">
                    <div>
                        <span className="block text-500 font-medium mb-3">Historical Data of United States</span>
                        <div className="text-900 font-medium text-xl">{historicalData}</div>
                    </div>
                    <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                        <i className="pi pi-money-bill text-blue-500 text-xl"></i>
                    </div>
                </div>
                <span className="text-500">Data from </span>
                <span className="text-green-500 font-medium">1999</span>
            </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
            <div className="surface-card shadow-2 p-5 border-round">
                <div className="flex justify-content-between mb-3">
                    <div>
                        <span className="block text-500 font-medium mb-3">Highest Rate between US and India</span>
                        <div className="text-900 font-medium text-xl">{maxVal}<small className="text-orange-500 font-small"> {currency1}</small></div>
                    </div>
                    <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                        <i className="pi pi-caret-up text-orange-500 text-xl"></i>
                    </div>
                </div>
                <span className="text-green-500 font-medium pi pi-arrow-up text-green-500">   {perct}+ </span>
                <span className="text-500">  Higher</span>
            </div>
        </div>
         <div className="col-12 md:col-6 lg:col-3">
            <div className="surface-card shadow-2 p-5 border-round">
                <div className="flex justify-content-between mb-3">
                    <div>
                        <span className="block text-500 font-medium mb-3">Current Highest Exchange Rate</span>
                        <div className="text-900 font-medium text-xl">{highestRate}<small className="text-orange-500 font-small"> {currency}</small></div>
                    </div>
                    <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                        <i className="pi pi-chart-line text-cyan-500 text-xl">  </i>
                    </div>
                </div>
                <span className="text-500"> Highest Exchange Rate</span>
            </div>
        </div> 
        <div className="col-12 md:col-6 lg:col-3">
            <div className="surface-card shadow-2 p-5 border-round">
                <div className="flex justify-content-between mb-3">
                    <div>
                        <span className="block text-500 font-medium mb-3">USD to EUR Conversion</span>
                        <div className="text-900 font-medium text-xl">{convertedValue}<small> EUR</small></div>
                    </div>
                    <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                        <i className="pi pi-step-forward text-purple-500 text-xl"></i>
                    </div>
                </div>
                <span className="text-500">For amount </span>
                <span className="text-green-500 font-medium">1000<small>USD</small></span>
            </div>
        </div>
    </div>
</div>
</>   
    );
}

export default Stats;