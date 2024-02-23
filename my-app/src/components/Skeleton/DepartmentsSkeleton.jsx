import { Grid, Skeleton } from '@mui/material'
import React from 'react'

export default function DepartmentsSkeleton() {
    return (
        <Grid container spacing={5} justifyContent="center">
            <Grid md={3} xs={6} item>
                <Skeleton variant="circle" sx={{borderRadius:"50%",width:{xl:"250px",lg:"220px",md:"180px",sm:"250px",xs:"140px"},height:{xl:"250px",lg:"220px",md:"180px",sm:"250px",xs:"140px"}}}/>
                <Skeleton varinat="rectangular" sx={{height:"80px"}}/>
            </Grid>
            <Grid md={3} xs={6} item>
                <Skeleton variant="circle" sx={{borderRadius:"50%",width:{xl:"250px",lg:"220px",md:"180px",sm:"250px",xs:"140px"},height:{xl:"250px",lg:"220px",md:"180px",sm:"250px",xs:"140px"}}}/>
                <Skeleton varinat="rectangular" sx={{height:"80px"}}/>
            </Grid>
            <Grid md={3} xs={6} item>
                <Skeleton variant="circle" sx={{borderRadius:"50%",width:{xl:"250px",lg:"220px",md:"180px",sm:"250px",xs:"140px"},height:{xl:"250px",lg:"220px",md:"180px",sm:"250px",xs:"140px"}}}/>
                <Skeleton varinat="rectangular" sx={{height:"80px"}}/>
            </Grid>
            <Grid md={3} xs={6} item>
                <Skeleton variant="circle" sx={{borderRadius:"50%",width:{xl:"250px",lg:"220px",md:"180px",sm:"250px",xs:"140px"},height:{xl:"250px",lg:"220px",md:"180px",sm:"250px",xs:"140px"}}}/>
                <Skeleton varinat="rectangular" sx={{height:"80px"}}/>
            </Grid>
        </Grid>
    )
}
