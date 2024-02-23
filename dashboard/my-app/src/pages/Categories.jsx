import React , {useEffect,useState} from 'react'
import Layout from '../components/Layout'
import {useSelector} from 'react-redux'
import {Box, Typography,Paper,Table,TableBody,TableRow,TableHead,TableContainer,styled, Button} from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useParams,useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

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

export default function Categories() {
    const {departmentId} = useParams()
    const {token} = useSelector((state)=>state.admin)
    const [categories,setCategories] = useState([])
    const [load,setLoad] = useState(true)
    const navigate = useNavigate()
    
    useEffect(()=>
    {
        async function getCategoreis()
        {
            let response ; 
            try{
                if(departmentId)
                {
                    response = await fetch(`${process.env.REACT_APP_API}category/all?department=${departmentId}`,{
                        headers:{
                            "Authorization":token,
                        }
                    })
                }
                else{
                    response = await fetch(`${process.env.REACT_APP_API}category/all`,{
                        headers:{
                            "Authorization":token,
                        }
                    })
                }
                const data = await response.json()
                setCategories(data.Categories)
                setLoad(false)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getCategoreis()
    },[departmentId])


    return (
        <Layout>
            {!load?
            <Box sx={{maxWidth:"100%",marginTop:"30px",marginBottom:"40px"}}>
                <Typography sx={{fontSize:"22px",fontWeight:"600",marginBottom:"15px"}}>Categories</Typography>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>View Products</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {categories?.length>0&&categories.map((row,idnex) => (
                            <StyledTableRow key={idnex+'pq'}>
                            <StyledTableCell component="th" scope="row">
                                {row.title}
                            </StyledTableCell>
                            <StyledTableCell>
                                <Button onClick={()=>navigate(`/categories/${row._id}/products`)}><VisibilityIcon/></Button>
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
