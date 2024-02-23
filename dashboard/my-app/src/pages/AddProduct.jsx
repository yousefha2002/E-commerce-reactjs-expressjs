import React from 'react'
import Layout from '../components/Layout'
import {Box, Paper, TextField, Typography, FormControlLabel,Chip, Checkbox, FormLabel,styled, Button,InputLabel,FormControl
,Select,OutlinedInput,MenuItem} from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'
import { useSnackbar } from 'notistack';
import { useRef } from 'react';
const Input = styled("input")({})
const Image = styled('img')({
    width:"100%",
    marginBottom:"14px",
    borderRadius:"8px"
})

export default function AddProduct() {
    const navigate = useNavigate()
    const {closeSnackbar,enqueueSnackbar} = useSnackbar()
    const {token} = useSelector((state)=>state.admin)
    const theme = useTheme();
    const [load,setLoad] = useState(false)
    const [colors, setColors] = useState([]);
    
    /** desing and handle with colors input */
    function getStyles(name, personName, theme) {
            return {
            fontWeight:
                colors.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
            };
        }
    const handleChange = (event) => {
        const {
        target: { value },
        } = event;
        setColors(
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };

    const [categories,setCategories] = useState([])
    const names = ['Red','Blue','Green','Yellow','Black','White','Brown','Gray','Pink','Orange'];
    const [sizes,setSizes] = useState([])
    const [product,setProduct] = useState({image:"",categoryId:""})
    const price = useRef()
    const title = useRef()

    const handleChangeProduct = (e)=>
    {
        const {type,name,value} = e.target
        type==="file"?
        setProduct(back=>{
            return{...back,[name]:e.target.files[0]}
        }):
        setProduct(back=>{
            return{...back,[name]:value}
        })
    }

    const handleChangeSizes = (event) => {
        event.target.checked?
        setSizes(back=>[...back,event.target.name])
        :
        setSizes(back=>back.filter(size=>size!==event.target.name))
    };

    useEffect(()=>
    {
        async function getCategoreis()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}category/all`,{
                    headers:{
                        "Authorization":token,
                    }
                })
                const data = await response.json()
                setCategories(data.Categories)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getCategoreis()
    },[])

    async function createProduct(e)
    {
        closeSnackbar()
        e.preventDefault()
        const formData = new FormData()
        formData.append('image',product.image)
        formData.append('title',title.current.value)
        formData.append('price',price.current.value)
        formData.append('colors',colors)
        formData.append('categoryId',product.categoryId)
        formData.append('sizes',sizes)
        try{
            setLoad(true)
            const response = await fetch(`${process.env.REACT_APP_API}product/create`,{
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
            enqueueSnackbar('product has created',{variant:"success",autoHideDuration:2500})
            navigate('/products')
        }
        catch(err)
        {
            console.log(err)
        }
    }

    return (
        <Layout>
            <Box sx={{maxWidth:"100%",width:{md:"550px"},marginTop:"30px",marginBottom:"40px"}}>
                <Typography sx={{fontSize:"22px",fontWeight:"600",marginBottom:"10px"}}>Add Product</Typography>
                <Paper sx={{padding:"16px 12px"}}>
                    <TextField label="Title" fullWidth type="text" sx={{marginBottom:"20px"}} name="title"
                    inputRef={title} required/>
                    <TextField label="Price" fullWidth type="number" sx={{marginBottom:"20px"}} name="price"
                    inputRef={price} required/>
                    <FormControl sx={{marginBottom:"14px"}} fullWidth>
                        <InputLabel id="demo-multiple-chip-label">Color</InputLabel>
                        <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={colors}
                        required
                        onChange={handleChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                        {names.map((name) => (
                        <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, colors, theme)}>
                            {name}
                        </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    <Box sx={{display:'flex',flexDirection:"column",marginBottom:"15px"}}>
                        <FormLabel>Size : </FormLabel>
                        <Box>
                            <FormControlLabel control={<Checkbox name="xl" onChange={handleChangeSizes}/>} label="XL" />
                            <FormControlLabel control={<Checkbox name="l" onChange={handleChangeSizes}/>} label="L" />
                            <FormControlLabel control={<Checkbox name="m" onChange={handleChangeSizes}/>} label="M" />
                            <FormControlLabel control={<Checkbox name="s" onChange={handleChangeSizes}/>} label="S" />
                        </Box>
                    </Box>
                    <FormControl fullWidth sx={{marginBottom:"14px"}}>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={product.categoryId}
                        label="Department"
                        onChange={(e)=>handleChangeProduct(e)}
                        name="categoryId"
                        required
                        >
                        {
                            categories?.map((categ,index)=>
                            {
                                return <MenuItem key={index+'ma1'} value={categ._id}>{categ.title} - {categ.departmentId.title}</MenuItem>
                            })
                        }
                        </Select>
                    </FormControl>
                    <Box sx={{display:"flex",flexDirection:"column",columnGap:"8px",marginBottom:"12px"}}>
                        <FormLabel sx={{marginBottom:"4px"}}>Image : </FormLabel>
                        <Input required name="image" type="file" sx={{width:"100%",border:"1px solid #dde0e3",padding:"8px 5px"}}
                        onChange={(e)=>handleChangeProduct(e)}/>
                    </Box>
                    {product.image&&<Box sx={{height:"300px",overflow:"auto"}}><Image src={URL.createObjectURL(product.image)}/></Box>}
                    {
                    !load?
                    <Button variant="contained" sx={{width:"100%"}} onClick={(e)=>createProduct(e)}>Add Product</Button>
                    :
                    <Button variant="contained" sx={{width:"100%"}}>load ...</Button>
                    }
                </Paper>
            </Box>
        </Layout>
    )
}