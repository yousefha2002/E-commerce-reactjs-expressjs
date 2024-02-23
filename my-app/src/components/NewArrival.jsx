import { Container, Typography } from '@mui/material'
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination} from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Product from './Product';
import { useEffect } from 'react';
import { useState } from 'react';
import ProductSkelton from './Skeleton/ProductSkelton'

export default function NewArrival() {

    const [products,setProducts] = useState([])
    const [load,setLoad] = useState(true)

    useEffect(()=>
    {
        async function getProducts()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}product/user/newAll`)
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
    },[])

    return (
        <Container sx={{marginTop:"60px",marginBottom:"60px"}}>
            <Typography sx={{fontSize:{sm:"30px",xs:"26px"},fontWeight:"600",textAlign:"center",marginBottom:"20px"}}>New Arrival</Typography>
            <Swiper pagination={{clickable:true}} modules={[Pagination]} 
            className="arrivalSwiper"
            slidesPerView={2}
            spaceBetween={20}
            breakpoints={{
                    640: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                    },
                    768: {
                    slidesPerView: 4,
                    spaceBetween: 50,
                    },
                    1024: {
                    slidesPerView: 6,
                    spaceBetween: 20,
                    },
                }}>
                {
                    !load?
                    products?.length>0&&products.map((item,index)=>
                    {
                        return(
                            <SwiperSlide key={index+'a2'}>
                                <Product item={item}/>
                            </SwiperSlide>
                        )
                    })
                    :
                    <>
                        <SwiperSlide >
                            <ProductSkelton/>
                        </SwiperSlide>
                        <SwiperSlide >
                            <ProductSkelton/>
                        </SwiperSlide>
                        <SwiperSlide >
                            <ProductSkelton/>
                        </SwiperSlide>
                        <SwiperSlide >
                            <ProductSkelton/>
                        </SwiperSlide>
                        <SwiperSlide >
                            <ProductSkelton/>
                        </SwiperSlide>
                        <SwiperSlide >
                            <ProductSkelton/>
                        </SwiperSlide>
                        <SwiperSlide >
                            <ProductSkelton/>
                        </SwiperSlide>
                    </>
                }
            </Swiper>
        </Container>
    )
}
