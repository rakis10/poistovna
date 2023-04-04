import React from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Vypocet from "./components/Vypocet";
import {Container} from "react-bootstrap";

function App() {

    return (
        <div className={'vw-100 vh-100'}>
            <Container style={{maxWidth: 750}} >
                <img src={viteLogo} alt="Your SVG" />
                <p>Hello Vite + React!</p>
                <Vypocet/>

            </Container >
        </div>


    )
}

export default App
