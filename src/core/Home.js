import React from 'react'
import '../styles.css';
import {API} from '../backend';

export default function Home() {
    return (
        <div>
            <h1>Hello frontend!!
            {API}
            
            </h1>
        </div>
    )
}
