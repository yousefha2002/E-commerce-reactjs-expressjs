import React , {useEffect,useState} from 'react'
import Layout from '../components/Layout'
import {useSelector} from 'react-redux'
import {Box, Typography,Paper,Table,TableBody,TableRow,TableHead,TableContainer,styled, Button} from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useParams,useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Tooltip from '@mui/material/Tooltip';

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

const Image = styled("img")({
    width:"55px",
    height:"65px"
})

export default function Products() {
    const {categoryId} = useParams()
    const {token} = useSelector((state)=>state.admin)
    const [products,setProducts] = useState([])
    const [load,setLoad] = useState(true)
    const navigate = useNavigate()
    
    useEffect(()=>
    {
        async function getProducts()
        {
            let response ; 
            try{
                if(categoryId)
                {
                    response = await fetch(`${process.env.REACT_APP_API}product/all?category=${categoryId}`,{
                        headers:{
                            "Authorization":token,
                        }
                    })
                }
                else{
                    response = await fetch(`${process.env.REACT_APP_API}product/all`,{
                        headers:{
                            "Authorization":token,
                        }
                    })
                }
                const data = await response.json()
                setProducts(data.products)
                setLoad(false)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getProducts()
    },[categoryId])


    async function deleteProduct(id)
    {
        try{
            filterRemoveProduct(id)
            const response = await fetch(`${process.env.REACT_APP_API}product/${id}`,{
                method:"DELETE",
                headers:{
                    'Authorization':token
                }
            })
        }
        catch(err)
        {
            console.log(err)
        }
    }

    function filterRemoveProduct(id)
    {
        setProducts(back=>back.filter(product=>product._id.toString()!==id.toString()))
    }

    return (
        <Layout>
            {!load?
            <Box sx={{maxWidth:"100%",marginTop:"30px",marginBottom:"40px"}}>
                <Typography sx={{fontSize:"22px",fontWeight:"600",marginBottom:"15px"}}>Products</Typography>
                <TableContainer component={Paper} sx={{overflowX:"auto"}}>
                    <Table aria-label="customized table" sx={{minWidth:"500px"}}>
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Title</StyledTableCell>
                            <StyledTableCell>Image</StyledTableCell>
                            <StyledTableCell>Price</StyledTableCell>
                            <StyledTableCell>Actions</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {products?.length>0&&products.map((row,idnex) => (
                            <StyledTableRow key={idnex+'pq'}>
                            <StyledTableCell component="th" scope="row">
                                {row.title}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                <Image src={`${process.env.REACT_APP_API}images/${row.image}`}/>
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {row.price}
                            </StyledTableCell>
                            <StyledTableCell>
                                <Tooltip title="View"><Button color='success' onClick={()=>navigate(`/product/${row._id}`)}><VisibilityIcon/></Button></Tooltip>
                                <Tooltip title="Delete"><Button color='error' onClick={()=>deleteProduct(row._id)}><DeleteIcon/></Button></Tooltip>
                                <Tooltip title="Edit"><Button color='warning' onClick={()=>navigate(`/edit-product/${row._id}`)}><ModeEditIcon/></Button></Tooltip>
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
