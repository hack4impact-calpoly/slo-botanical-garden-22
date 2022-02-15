import React from "react";
import './home.css'
import '../../App.css'

export default function Home() {
    return(
        <body className="home">
            <div id="announcements">
                <h2>Admin Announcements</h2>
            </div>
            <div id="dashboard">
                <h1>Dashboard</h1>
            </div>
        </body>
    );
}