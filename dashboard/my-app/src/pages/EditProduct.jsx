import React from 'react'
import Layout from '../components/Layout'
import {Box, Paper, TextField, Typography, FormControlLabel,Chip, Checkbox, FormLabel,styled, Button,InputLabel,FormControl
,Select,OutlinedInput,MenuItem} from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { useState,useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import {useSelector} from 'react-redux'
import { useSnackbar } from 'notistack';
const Input = styled("input")({})
const Image = styled('img')({
    width:"100%",
    marginBottom:"14px",
    borderRadius:"8px"
})

export default function EditProduct() {
    const navigate = useNavigate() 
    const {closeSnackbar,enqueueSnackbar} = useSnackbar()
    const {token} = useSelector((state)=>state.admin)
    const theme = useTheme();
    const [load,setLoad] = useState(false)
    const [colors, setColors] = useState([]);
    const {productId} = useParams()
    const [image,setImage] = useState(null)
    
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

    const names = ['Red','Blue','Green','Yellow','Black','White','Brown','Gray','Pink','Orange'];
    const [sizes,setSizes] = useState([])
    const [product,setProduct] = useState({image:"",price:"",title:""})

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
        async function getProduct()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}product/${productId}`,{
                    headers:{
                        "Authorization":token,
                    }
                })
                const data = await response.json()
                setProduct(data.product)
                setColors(data.product.colors)
                setSizes(data.product.sizes)
                setProduct(back=>
                    {
                        return {...back,image:data.product.image,price:data.product.price,title:data.product.title}
                    })
                setLoad(false)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getProduct()
    },[productId])

    async function editProduct(e)
    {
        closeSnackbar()
        e.preventDefault()
        const formData = new FormData()
        formData.append('image',image)
        formData.append('title',product.title)
        formData.append('price',product.price)
        formData.append('colors',colors)
        formData.append('categoryId',product.categoryId)
        formData.append('sizes',sizes)
        try{
            setLoad(true)
            const response = await fetch(`${process.env.REACT_APP_API}product/${productId}`,{
                method:"PUT",
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
            navigate('/products')
            enqueueSnackbar('product has updated',{variant:"success",autoHideDuration:2500})
        }
        catch(err)
        {
            console.log(err)
        }
    }

    return (
        <Layout>
            <Box sx={{maxWidth:"100%",width:{md:"550px"},marginTop:"30px",marginBottom:"40px"}}>
                <Typography sx={{fontSize:"22px",fontWeight:"600",marginBottom:"10px"}}>Edit Product</Typography>
                <Paper sx={{padding:"16px 12px"}}>
                    <TextField label="Title" fullWidth type="text" sx={{marginBottom:"20px"}} name="title"
                    onChange={(e)=>handleChangeProduct(e)} required value={product.title}/>
                    <TextField label="Price" fullWidth type="number" sx={{marginBottom:"20px"}} name="price"
                    onChange={(e)=>handleChangeProduct(e)} required value={product.price}/>
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
                            <FormControlLabel control={<Checkbox name="xl" checked={sizes.includes('xl')} onChange={handleChangeSizes}/>} label="XL" />
                            <FormControlLabel control={<Checkbox name="l" checked={sizes.includes('l')} onChange={handleChangeSizes}/>} label="L" />
                            <FormControlLabel control={<Checkbox name="m" checked={sizes.includes('m')} onChange={handleChangeSizes}/>} label="M" />
                            <FormControlLabel control={<Checkbox name="s" checked={sizes.includes('s')} onChange={handleChangeSizes}/>} label="S" />
                        </Box>
                    </Box>
                    <Box sx={{display:"flex",flexDirection:"column",columnGap:"8px",marginBottom:"12px"}}>
                        <FormLabel sx={{marginBottom:"4px"}}>Image : </FormLabel>
                        <Input required name="image" type="file" sx={{width:"100%",border:"1px solid #dde0e3",padding:"8px 5px"}}
                        onChange={(e)=>setImage(e.target.files[0])}/>
                    </Box>
                    <Box sx={{height:"300px",overflow:"auto"}}>
                        <Image src={image?URL.createObjectURL(image):`${process.env.REACT_APP_API}images/${product.image}`}/>
                    </Box>
                    {
                    !load?
                    <Button variant="contained" sx={{width:"100%"}} onClick={(e)=>editProduct(e)}>Edit Product</Button>
                    :
                    <Button variant="contained" sx={{width:"100%"}}>load ...</Button>
                    }
                </Paper>
            </Box>
        </Layout>
    )
}