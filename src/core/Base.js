import React from 'react'

const Base = () =>  (
    <div>
        <div className="container-fluid">
            <div className="jumbotron bg-dark text-white text-center">
                <h2 className="display-4">My Title</h2>
                <p className="lead">My Description</p>
            </div>
            <p>This is our main content</p>
        </div>    
        <footer className="footer bg-dark mt-auto py-3">
            <div className="container-fluid bg-success text-white text-center">
                <h4>If you got any questions, feel free to reach out!</h4>
                <button className="btn btn-warning btn-lg">Contact us</button>
            </div>
            <div className="container">
                <span className="text-muted">
                    An Amazing place to buy and sell
                </span>
            </div>
        </footer>   
    </div>
)

export default Base;
