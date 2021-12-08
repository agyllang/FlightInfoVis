import {React,useState,useEffect} from 'react'
import { Container, Row, Col } from "react-bootstrap";


const TripListOverview = ({...props}) => {
    const {tripsCurrentMonth} = props
    console.log("tripsCurrentMonth",tripsCurrentMonth)
    useEffect(() => {
        
      
    }, [tripsCurrentMonth])
    return (
        <Container>
            <Col>
            
            </Col>
            
        </Container>
    )
}

export default TripListOverview
