import React from 'react'
import {styled, Container, Table,TableBody,TableCell,TableHead,TableRow, Button,Box, Typography, Paper} from '@mui/material'
import Layout from '../components/Layout'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import Loading from '../components/Loading'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom'

const Image = styled("img")({
    width:"55px",
    height:"65px"
})

const OrderWrapper = styled(Box)({
    display:"flex"
    ,justifyContent:"space-between",
    alignItems:"center",
    marginBottom:"12px"
})

export default function Cart() {

    const [cartProducts,setCartProducts] = useState(null)
    const [load,setLoad] = useState(false)
    const {user,token} = useSelector((state)=>state.userLogin)
    const navigate = useNavigate()

    useEffect(()=>
    {
        async function getCartProducts()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}user/${user._id}`,{
                    headers:{
                        "Authorization":token
                    }
                })
                const data = await response.json()
                setCartProducts(data.user.cart)
                setLoad(true)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getCartProducts()
    },[])

    async function deleteProductFormCart(cartId)
    {
        filterProducts(cartId)
        try{
            const response = await fetch(`${process.env.REACT_APP_API}cart/user/${user._id}/${cartId}`,{
                method:"DELETE",
                headers:{
                    "Authorization":token
                }
            })
        }
        catch(err)
        {
            console.log(err)
        }
    }

    function filterProducts(cartId)
    {
        setCartProducts(back=>back.filter(product=>product._id.toString()!==cartId.toString()))
    }

    const [totalPrice,setTotalPrice] = useState(0)
    useEffect(()=>
    {
        setTotalPrice(cartProducts?.reduce((acc,value)=>{
            return acc+value.productId.price*value.qty
        },0))
    },[cartProducts])

    return (
        <Layout>
            <Container sx={{marginY:"40px",minHeight:"300px"}}>
                {
                load?
                <>
                    <Typography sx={{fontSize:"28px",fontWeight:"400",marginBottom:"15px"}}>Your Cart</Typography>
                    <Box sx={{overflow:"auto"}}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align='left'>Image</TableCell>
                                    <TableCell align="left">Title</TableCell>
                                    <TableCell align="left">Total Price</TableCell>
                                    <TableCell align="left">Size</TableCell>
                                    <TableCell align="left">Color</TableCell>
                                    <TableCell align="left">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartProducts.length>0?cartProducts.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="left">
                                        <Image src={`${process.env.REACT_APP_API}images/${row.productId.image}`}/>
                                    </TableCell>
                                    <TableCell align="left">{row.productId.title}</TableCell>
                                    <TableCell align="left">{row.qty * row.productId.price}</TableCell>
                                    <TableCell align="left">{row.size}</TableCell>
                                    <TableCell align="left">{row.color}</TableCell>
                                    <TableCell align="left">
                                        <Button color="error" onClick={()=>deleteProductFormCart(row._id)}><CloseIcon/></Button>
                                    </TableCell>
                                </TableRow>
                                ))
                                :
                                <TableRow><TableCell colSpan={6}>No Products In Cart</TableCell></TableRow>}
                            </TableBody>
                        </Table>     
                    </Box>
                    <Paper sx={{padding:"20px",width:{sm:"340px"},maxWidth:"100%",marginTop:"24px"}}>
                        <Typography sx={{textAlign:"center",textTransform:"uppercase",fontSize:"26px",fontWeight:"400",
                        marginBottom:"22px"}}>Order Summary</Typography>
                        <OrderWrapper>
                            <Typography>Subtotal</Typography>
                            <Typography>${totalPrice}</Typography>
                        </OrderWrapper>
                        <OrderWrapper>
                            <Typography>Tax</Typography>
                            <Typography>$5</Typography>
                        </OrderWrapper>
                        <OrderWrapper>
                            <Typography>Total</Typography>
                            <Typography>${totalPrice + 5}</Typography>
                        </OrderWrapper>
                        {cartProducts.length>0&&
                        <Button variant='contained' fullWidth sx={{marginTop:"12px"}} onClick={()=>navigate('/order/shipping')}>Checkout</Button>
                        }
                    </Paper>                   
                </>
                :
                <Loading/>
                }
            </Container>
        </Layout>
    )
}
