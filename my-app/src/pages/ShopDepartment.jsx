import React, { useState } from 'react'
import {FormControl,Select, Grid, Typography,MenuItem,InputLabel, Button} from '@mui/material'
import {useParams} from 'react-router-dom'
import Layout from '../components/Layout'
import { Container } from '@mui/system'
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react'
import Loading from '../components/Loading'
import Product from '../components/Product'

export default function ShopDepartment() {
    const {id,title} = useParams()
    const [conditoions,setConditoions] = useState({color:'all',size:'all',category:'all'})
    function handleChange(e)
    {
        const {name,value} = e.target
        setConditoions(back=>
            {
                return {...back,[name]:value}
            })
    }

    const [products,setProducts] = useState([])
    const [partProducts,setPartProducts] = useState([])
    const [load,setLoad] = useState(true)
    useEffect(()=>
    {
        async function getProducts()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}product/department/${id}/products`)
                const data = await response.json()
                setProducts(data.allProducts)
                setPartProducts(data.allProducts)
                setLoad(false)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getProducts()
    },[id])

    const colors = ['Red','Blue','Green','Yellow','Black','White','Brown','Gray','Pink','Orange'];
    const sizes = ['XL','L','M','S'];

    const [categories,setCategories] = useState([])
    useEffect(()=>
    {
        async function getCategoreis()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}category/user/all?department=${id}`)
                const data = await response.json()
                setCategories(data.Categories)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getCategoreis()
    },[id])

    function filterProducts()
    {
        setLoad(true)
        setPartProducts(products.filter(product=>
            (product.categoryId.title.toLowerCase()===conditoions.category.toLowerCase()||conditoions.category.toLowerCase()==="all")
            &&
            (product.colors.includes(conditoions.color)||conditoions.color.toLowerCase()==="all")
            &&
            (product.sizes.includes(conditoions.size.toLowerCase())||conditoions.size.toLowerCase()==="all")
        ))
        setTimeout(()=>
        {
            setLoad(false)
        },[1000])
    }

    return (
        <Layout>
            <Container sx={{marginY:"30px"}}>
                <Typography sx={{fontSize:"28px",fontWeight:"600",marginBottom:"24px"}}>{title}</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={conditoions.category}
                                label="Category"
                                onChange={(e)=>handleChange(e)}
                                name="category"
                            >
                                <MenuItem value={'all'}>All</MenuItem>
                                {
                                    categories?.map((categ,index)=>
                                    {
                                        return <MenuItem value={categ.title} key={index+'qi3'}>{categ.title}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Size</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={conditoions.size}
                                label="Size"
                                onChange={(e)=>handleChange(e)}
                                name="size"
                            >
                                <MenuItem value={'all'}>All</MenuItem>
                                {
                                    sizes.map((size,index)=>
                                    {
                                        return <MenuItem value={size} key={index+'qi2'}>{size}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Color</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={conditoions.color}
                                label="Color"
                                onChange={(e)=>handleChange(e)}
                                name="color"
                            >
                                <MenuItem value={'all'}>All</MenuItem>
                                {
                                    colors.map((color,index)=>
                                    {
                                        return <MenuItem value={color} key={index+'qi1'}>{color}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Button variant="contained" fullWidth sx={{height:"100%"}} onClick={filterProducts}><SearchIcon/></Button>
                    </Grid>
                </Grid>
                {
                    !load?
                    <>
                    {
                    partProducts?.length>0
                    ?
                    <Grid container spacing={3} sx={{marginTop:"10px"}}>
                        {
                            partProducts.map((item,index)=>
                            {
                                return(
                                    <Grid item xs={6} sm={3} lg={2} key={index+"kq1"}>
                                        <Product item={item}/>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                    :
                    <Typography sx={{minHeight:"28vh",marginTop:"20px"}}>No Porducts Available</Typography>
                    }
                    </>
                    :
                    <Loading/>
                }
            </Container>
        </Layout>
    )
}
