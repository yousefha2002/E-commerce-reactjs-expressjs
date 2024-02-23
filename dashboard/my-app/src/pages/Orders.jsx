import React , {useEffect,useState} from 'react'
import Layout from '../components/Layout'
import {useSelector} from 'react-redux'
import {Box, Typography,Paper,Table,TableBody,TableRow,TableHead,TableContainer,styled, Button} from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Loading from '../components/Loading';
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        },
    }));
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
        border: 0,
        },
}));

export default function Orders() {
    const {token} = useSelector((state)=>state.admin)
    const [orders,setOrders] = useState([])
    const [load,setLoad] = useState(true)
    const navigate = useNavigate()
    
    useEffect(()=>
    {
        async function getOrders()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}order/all`,{
                    headers:{
                        "Authorization":token,
                    }
                })
                const data = await response.json()
                setOrders(data.orders)
                setLoad(false)
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
            {!load?
            <Box sx={{maxWidth:"100%",marginTop:"30px",marginBottom:"40px"}}>
                <Typography sx={{fontSize:"22px",fontWeight:"600",marginBottom:"15px"}}>Orders</Typography>
                <TableContainer component={Paper} sx={{overflowX:"auto"}}>
                    <Table aria-label="customized table" sx={{minWidth:"800px"}}>
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Total Price</StyledTableCell>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders?.length>0&&orders.map((row,idnex) => (
                            <StyledTableRow key={idnex+'pq'}>
                            <StyledTableCell component="th" scope="row">
                                {row.userId.name}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {row.userId.email}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                ${row.totalPrice}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {moment(row.createdAt).format("MMM Do yyyy")}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                <Box sx={{color:"white",backgroundColor:row.isDelivered?"#0cbc87":"#24292d",width:"fit-content",padding:"3px 9px",borderRadius:"4px"}}>
                                    {row.isDelivered?"Delivered":"Not Delivered"}
                                </Box>
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                <Button sx={{minWidth:"10px"}} onClick={()=>navigate(`/orders/${row._id}`)}><VisibilityIcon/></Button>
                            </StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            :
            <Loading/>}
        </Layout>
    )
}
