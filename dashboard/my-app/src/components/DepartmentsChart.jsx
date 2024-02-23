import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function DepartmentsChart() {

    const {token} = useSelector((state)=>state.admin)
    const [departments,setDepartments] = useState([])

    useEffect(()=>
    {
        async function getTopDepartments()
        {
            const response = await fetch(`${process.env.REACT_APP_API}department/topDepartments`,{
                headers:{
                    "Authorization":token,
                }
            })
            const data = await response.json()
            setDepartments(data.newDepartments)
        }
        getTopDepartments()
    },[])

    const data = {
        labels: departments?.map((department)=>
        {
            return department._id
        }),
        datasets: [
        {
            label: ' number of categories ',
            data: departments?.map((department)=>
            {
                return department.count
            }),
            backgroundColor: [
                '#F7464A',
                '#1565C0',
                "#F9A825",
                '#2E7D32',
                '#00838F',
                "#6A1B9A"
            ],
            
            borderWidth: 1,
        },
        ],
    };
    return (
        <Paper sx={{padding:"16px 10px"}}>
            <Typography sx={{marginBottom:"8px",fontWeight:"500"}}>Top Departments</Typography>
            <Doughnut data={data}></Doughnut>
        </Paper>
    )
}
