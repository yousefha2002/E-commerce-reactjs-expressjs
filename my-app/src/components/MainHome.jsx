import { Box ,Button,styled, Typography} from '@mui/material'
import React from 'react'
import slide1 from '../images/ten-signs-you-have-too-many-clothes.jpg'
import slide2 from '../images/definingdresscodeswhattowearforeveryoccasion.jpg'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const Wrapper = styled(Box)({
    backgroundPosition:"center",
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
})

const BoxText = styled(Box)({
    backgroundColor:"#000000d9",
    width:"fit-content",
    position:"absolute",
    bottom:"30%",
    left:"10%",
    padding:"10px",
    color:"white"
})

export default function MainHome() {
    const slides = [
        {
            image:slide1,
            title:"Come and Get it!",
        },
        {
            image:slide2,
            title:"Fit Your Wardrobe",
        }
    ]
    return (
        <Box>
            <Swiper pagination={{clickable:true}} modules={[Pagination]}  className="mySwiper">
                {
                    slides.map((item,index)=>
                    {
                        return(
                            <SwiperSlide key={index+'a1'}>
                                <Wrapper sx={{position:"relative",height:"520px",backgroundImage:`url(${item.image})`}}>
                                    <BoxText>
                                        <Typography sx={{fontBold:"300",fontSize:{md:"28px",sx:"28px",xs:"20px"},
                                        letterSpacing:"1px"}}>{item.title}</Typography>
                                        <Button>Discover More</Button>
                                    </BoxText>
                                </Wrapper>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </Box>
    )
}
