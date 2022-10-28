import React, { useState,memo, useEffect } from 'react';
import { Chart } from 'primereact/chart';

   
function BarChart(props){
    // const [rateKeys,setRateKeys]=useState([]);
    // const [rateValues,setRateValues]=useState([]);
    const [basicData, setBasicData]=useState({});
    const chartDisplay=()=>{
        const rateKeys = Object.keys(props.rates).slice(50,55);
        const rateValues = Object.values(props.rates).slice(50,55);
        console.log(rateKeys);
        console.log(rateValues);
        setBasicData({
            labels:rateKeys,
            datasets: [
                {
                    label: 'Rate',
                    backgroundColor: '#42A5F5',
                    data:rateValues
                }, 
            ]
        });
    }
 
    useEffect(() => {
        chartDisplay();
    },[props.rates]);
    

const getLightTheme = () => {
    let basicOptions = {
        maintainAspectRatio: false,
        aspectRatio: .8,
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };
    return basicOptions;
}
const basicOptions = getLightTheme();
    return(
        <div>
            <div className="card">
                <h1>Currency Rates</h1>
                <Chart type="bar" data={basicData} options={basicOptions} />
            </div>
        </div>
    );
}
export default memo(BarChart);