import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import logo from '../assets/astron-vo-logo.jpg';

import { NavLink, Link } from "react-router-dom"

export default function NavigationBar() {

    return (
        <Navbar bg="dark" variant="dark">


            <img alt='' src={logo} width="150" height="50" className="d-inline-block align-top"/>

        </Navbar>

    );
}