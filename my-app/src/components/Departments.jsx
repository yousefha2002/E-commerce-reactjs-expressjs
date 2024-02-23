import { Container, Typography,Grid } from '@mui/material'
import React from 'react'
import { useEffect,useState } from 'react'
import Department from './Department'
import DepartmentsSkeleton from './Skeleton/DepartmentsSkeleton'
export default function Departments() {
    const [departments,setDepartments] = useState([])
    const [load,setLoad] = useState(false);

    useEffect(()=>
    {
        async function getDepartments()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}department/user/all`)
                const data = await response.json()
                setDepartments(data.departments)
                setLoad(true)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getDepartments()
    },[])

    return (
        <Container sx={{marginTop:"40px",marginBottom:"30px"}}>
            <Typography sx={{fontSize:{sm:"30px",xs:"26px"},fontWeight:"600",textAlign:"center",marginBottom:"24px"}}>Shop By Departments</Typography>
            {load?
            <Grid container spacing={5} justifyContent="center">
            {
                departments?.length>0&&departments.map((item,index)=>
                {
                    return(
                        <Grid key={index+'dep1'} md={3} xs={6} item>
                            <Department item={item}/>
                        </Grid>
                        
                    )
                })
            }
            </Grid>
            :
            <DepartmentsSkeleton/>
            }
        </Container>
    )
}
