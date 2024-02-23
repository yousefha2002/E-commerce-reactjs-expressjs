import React from 'react'
import Departments from '../components/Departments'
import Discounts from '../components/Discounts'
import Layout from '../components/Layout'
import MainHome from '../components/MainHome'
import NewArrival from '../components/NewArrival'
import Sales from '../components/Sales'

export default function Home() {
    return (
        <Layout>
            <MainHome/>
            <Departments/>
            <Discounts/>
            <NewArrival/>
            <Sales/>
        </Layout>
    )
}
