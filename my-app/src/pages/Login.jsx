import React from 'react'
import { TextField, Typography,Button, Paper,Box,Container } from '@mui/material'
import {startUser} from '../redux/user'
import { useState } from 'react';
import {useSnackbar} from 'notistack'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import Layout from '../components/Layout';

export default function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {closeSnackbar,enqueueSnackbar} = useSnackbar()
    const [email,setEmail] = useState(null)
    const [password,setPassword] = useState(null)
    const [load,setLoad] = useState(false)

    async function loginUser(e)
    {
        e.preventDefault()
        closeSnackbar()
        try{
            setLoad(true)
            const response = await fetch(`${process.env.REACT_APP_API}auth/user/login`,{
                method:"POST",
                headers:{
                    'Content-Type':"application/json",
                },
                body:JSON.stringify({email,password})
            })
            const data = await response.json()
            if(response.status!==200&&response.status!==201)
            {
                enqueueSnackbar(data.message,{variant:"error",autoHideDuration:2500})
                setLoad(false)
                throw new Error('failed occured')
            }
            setLoad(false)
            dispatch(startUser({user:data.user,token:data.token}))
            navigate('/')
            enqueueSnackbar("success login",{variant:"success",autoHideDuration:2500})
        }
        catch(err)
        {
            console.log(err);
        }
    }
    return (
        <>
        <Layout>
            <Container>
                <form>
                    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",height:"90vh"}}>
                        <Paper sx={{width:{md:"500px",xs:"100%"},display:"flex",flexDirection:"column",alignItems:"center",padding:"30px"}}>
                            <Typography sx={{fontSize:"28px",fontWeight:"500",marginBottom:"20px"}}>Login</Typography>
                            <TextField name="email" label="Email" onChange={(e)=>setEmail(e.target.value)}
                            sx={{width:"100%",marginBottom:"15px"}} required/>
                            <TextField name="password" label="Password" type="password"
                            sx={{width:"100%",marginBottom:"15px"}} required onChange={(e)=>setPassword(e.target.value)}/>
                            {!load?
                            <Button variant='contained' sx={{width:"100%"}} type="submit" onClick={(e)=>loginUser(e)}>login</Button>
                            :
                            <Button variant='contained' sx={{width:"100%"}}>Load ...</Button>
                            }
                        </Paper>
                    </Box>
                </form>
            </Container>
        </Layout>
        </>
    )
}
