import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import logo from '../logo.ico';

import { NavLink, Link } from "react-router-dom"

export default function NavigationBar() {

    return (
        <Navbar bg="dark" variant="dark">


            <img alt='' src={logo} width="30" height="30" className="d-inline-block align-top"/>

            <Navbar.Brand href="/astronhips">&nbsp;ASTRON - HIPS </Navbar.Brand>
        </Navbar>

    );
}