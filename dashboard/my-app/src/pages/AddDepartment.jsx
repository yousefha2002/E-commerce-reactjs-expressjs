import { Box,Paper,Typography,Button,TextField, styled} from '@mui/material'
import React, { useRef } from 'react'
import { useState } from 'react'
import Layout from '../components/Layout'
import {useSelector} from 'react-redux'
import ImageIcon from '@mui/icons-material/Image';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom'

const Image = styled('img')({
    width:"100%",
    marginTop:"14px",
    borderRadius:"8px"
})

export default function AddDepartment() {
    const {closeSnackbar,enqueueSnackbar} = useSnackbar()
    const {token} = useSelector((state)=>state.admin)
    const title = useRef()
    const [image,setImage] = useState(null)
    const [load,setLoad] = useState(false)
    const navigate = useNavigate()

    async function createDepartment(e)
    {
        closeSnackbar()
        e.preventDefault()
        const formData = new FormData()
        formData.append('image',image)
        formData.append('title',title.current.value.toLowerCase())
        try{
            setLoad(true)
            const response = await fetch(`${process.env.REACT_APP_API}department/create`,{
                method:"POST",
                headers:{
                    "Authorization":token,
                },
                body:formData
            })
            const data = await response.json()
            if(response.status!==200&&response.status!==201)
            {
                setLoad(false)
                enqueueSnackbar(data.message,{variant:"error",autoHideDuration:2500})
                throw new Error('failed occured')
            }
            enqueueSnackbar(data.message,{variant:"success",autoHideDuration:2500})
            navigate('/departments')
            setLoad(false)
        }
        catch(err)
        {
            console.log(err)
        }
    }

    return (
        <Layout>
            <Box sx={{maxWidth:"100%",width:{md:"550px"},marginTop:"30px",marginBottom:"40px"}}>
                <Typography sx={{fontSize:"22px",fontWeight:"600",marginBottom:"10px"}}>Add Department</Typography>
                <Paper sx={{padding:"16px 12px"}}>
                    <TextField label="Title" fullWidth type="text" sx={{marginBottom:"20px"}} inputRef={title}/>
                    <input type="file" id='image' hidden onChange={(e)=>setImage(e.target.files[0])}/>
                    <label htmlFor='image'>
                        <Box sx={{backgroundColor:"#ff5252",width:"45px",height:"45px",borderRadius:"50%",display:"flex",
                        justifyContent:"center",alignItems:"center",cursor:"pointer"}}>
                            <ImageIcon sx={{color:"white"}}/>
                        </Box>
                    </label>
                    {image&&<Box sx={{height:"300px",overflow:"auto",marginTop:"6px"}}><Image src={URL.createObjectURL(image)}/></Box>}
                    {
                        !load?
                        <Button variant="contained" sx={{width:"100%",marginTop:"16px"}} onClick={(e)=>createDepartment(e)}>
                            Add Department
                        </Button>
                        :
                        <Button variant="contained" sx={{width:"100%",marginTop:"16px"}}>load...</Button>
                    }
                </Paper>
            </Box>
        </Layout>
    )
}
