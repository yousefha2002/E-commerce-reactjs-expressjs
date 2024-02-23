import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useForm, Controller } from "react-hook-form";
import { Box  , styled ,  Typography , TextField, Paper, Button, Container} from '@mui/material';
import { useDispatch } from 'react-redux';
import {saveCard,clearShipping} from '../redux/shipping'
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'

const steps = [
    'Shipping',
    'Payment',
    'Status',
];

const Form = styled('form')({
    width:"500px",
    maxWidth:"100%",
    margin:"80px auto"
})

const ErrorText = styled(Typography)({
    color:"#d32f2f",
    marginTop:"8px"
})

export default function PaymentOrder() {
    const { control, handleSubmit  , formState: { errors }} = useForm({
    defaultValues: {
    card_number:"",
    card_expiry:"",
    card_cvc:"",
    }
});

const dispatch = useDispatch();
const navigate = useNavigate();

useEffect(()=>{
    window.scrollTo({
        top:0, behavior:"smooth"
    })
});

    const {shipping} = useSelector((state)=>state.shipping)
    const {user,token} = useSelector((state)=>state.userLogin)

    const onSubmit = async(data) => {
        dispatch(saveCard({card:data}));
        dispatch(clearShipping())
        try{
            const response = await fetch(`${process.env.REACT_APP_API}order/create`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":token
                },
                body:JSON.stringify({shipping,userId:user._id})
            })
        }
        catch(err)
        {
            console.log(err)
        }
        navigate('/order/success')
    };

    return (
        <Layout>
        <Container sx={{marginTop:"50px"}}>
            <Stepper activeStep={1} alternativeLabel>
            {steps.map((label) => (
                <Step key={label}>
                <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Paper sx={{padding:"20px 15px"}}>
                    <Box sx={{marginBottom:"12px"}}>
                        <Controller
                            name="card_number"
                            control={control}
                            rules={{required:true}}
                            render={({ field }) => <TextField variant="standard" label="Card Number" {...field} fullWidth />}
                        />
                        <ErrorText>
                            {
                            errors.card_number?.type === "required" && "Card Number is required"
                            }
                        </ErrorText>
                    </Box>
                    <Box sx={{marginBottom:"12px"}}>
                        <Controller
                            name="card_expiry"
                            control={control}
                            rules={{required:true }}
                            render={({ field }) => <TextField variant="standard" label="Card Expiry" type={"date"} {...field} fullWidth/>}
                        />
                        <ErrorText>
                            {
                            errors.card_expiry?.type === "required" && "Card Expiry is required"
                            }
                        </ErrorText>
                    </Box>
                    <Box sx={{marginBottom:"12px"}}>
                        <Controller
                            name="card_cvc"
                            control={control}
                            rules={{required:true }}
                            render={({ field }) => <TextField variant="standard" label="Card CVC" type={"text"} {...field} fullWidth/>}
                        />
                        <ErrorText>
                            {
                            errors.card_cvc?.type === "required" && "Card CVC is required"
                            }
                        </ErrorText>
                    </Box>
                    <Button variant="contained" type="submit" fullWidth sx={{marginTop:"20px"}}>Pay</Button>
                </Paper>
            </Form>
        </Container>
    </Layout>
    );
}
