import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import './pagesNav.css'

const Nav = styled.nav`
    display: flex;
    align-items: center;
    gap: 30px;
    background-color: white;
    box-shadow: none;
    background-image: none;
    padding: 1%;
`

const NavUl = styled.ul`
    list-style: none;
    display: flex;
    gap: 50px;
`
const NavLi = styled.li`
    position: relative;
    display: inline-block;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 3px;
        background-color: #555;
        border-radius: 4px;
        scale: 0 1;
        transform-origin: right;
        transition: scale 0.25s;
    }

    &:hover::before {
        scale: 1;
        transform-origin: left;
    }
`

const PagesNav = () => {
  return (
    <Nav>
        <NavUl>
            <NavLi>
                <Link to='' className='website-nav-link'>Home</Link>
            </NavLi>
            <NavLi>
                <Link to='activities-edit' className='website-nav-link'>Activities</Link>
            </NavLi>
            <NavLi>
                <Link to='media-edit' className='website-nav-link'>Media</Link>
            </NavLi>
            <NavLi>
                <Link to='marketing-edit' className='website-nav-link'>Marketing</Link>
            </NavLi>
            <NavLi>
                <Link to='events-edit' className='website-nav-link'>Events</Link>
            </NavLi>
            <NavLi>
                <Link to='pr-edit' className='website-nav-link'>PR</Link>
            </NavLi>
            <NavLi>
                <Link to='hr-edit' className='website-nav-link'>HR</Link>
            </NavLi>
            <NavLi>
                <Link to='logistics-edit' className='website-nav-link'>Logistics</Link>
            </NavLi>
            <NavLi>
                <Link to='academic-edit' className='website-nav-link'>Academic</Link>
            </NavLi>
            
        </NavUl>
    </Nav>
  )
}

export default PagesNav
