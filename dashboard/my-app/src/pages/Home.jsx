import { Typography,Box, Grid, Paper,styled } from '@mui/material'
import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import DepartmentsChart from '../components/DepartmentsChart';
import LastTransications from '../components/LastTransications';
import { useSelector } from 'react-redux';
import { useState } from 'react';
const IconWrapper = styled(Box)({
    height:"45px",
    width:"45px",
    borderRadius:"50%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
})

export default function Home() {
    const {token} = useSelector((state)=>state.admin)
    const [info,setInfo] = useState({})
    useEffect(()=>
        {
            async function getOrders()
            {
                try{
                    const response = await fetch(`${process.env.REACT_APP_API}user/main/details`,{
                        headers:{
                            "Authorization":token,
                        }
                    })
                    const data = await response.json()
                    setInfo(data)
                }
                catch(err)
                {
                    console.log(err)
                }
            }
            getOrders()
    },[])
    return (
        <Layout>
            <Box sx={{marginY:"40px"}}>
                <Typography sx={{fontSize:"28px",fontWeight:"700",marginBottom:"20px"}}>Dashboard</Typography>
                <Grid container spacing={3}>
                    <Grid item md={4} xs={12}>
                        <Paper sx={{display:"flex",alignItems:"center",padding:"16px 12px",columnGap:"8px"}}>
                            <IconWrapper sx={{backgroundColor:"#066ac91a"}}><PersonIcon sx={{color:"#066ac9"}}/></IconWrapper>
                            <Box>
                                <Typography sx={{fontSize:"14px",fontWeight:"600"}}>Total Users</Typography>
                                <Typography sx={{fontSize:"14px",fontWeight:"600"}}>{info?.users}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Paper sx={{display:"flex",alignItems:"center",padding:"16px 12px",columnGap:"8px"}}>
                            <IconWrapper sx={{backgroundColor:"#0cbc871a"}}><LocalGroceryStoreIcon sx={{color:"#0cbc87"}}/></IconWrapper>
                            <Box>
                                <Typography sx={{fontSize:"14px",fontWeight:"600"}}>Total Orders</Typography>
                                <Typography sx={{fontSize:"14px",fontWeight:"600"}}>{info?.orders}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Paper sx={{display:"flex",alignItems:"center",padding:"16px 12px",columnGap:"8px"}}>
                            <IconWrapper sx={{backgroundColor:"#d6293e1a"}}><ShoppingBasketIcon sx={{color:"#d6293e"}}/></IconWrapper>
                            <Box>
                                <Typography sx={{fontSize:"14px",fontWeight:"600"}}>Total Products</Typography>
                                <Typography sx={{fontSize:"14px",fontWeight:"600"}}>{info?.products}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={3} sx={{marginTop:"15px",marginBottom:"30px"}}>
                    <Grid item lg={5} xl={4} xs={12}>
                        <DepartmentsChart/>
                    </Grid>
                    <Grid item lg={7} xl={8} xs={12}>
                        <LastTransications/>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    )
}
