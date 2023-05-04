import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import './pagesNav.css'
import { mobile } from '../../../responsive'

const Nav = styled.nav`
    display: flex;
    align-items: center;
    background-color: white;
    box-shadow: none;
    background-image: none;
`

const NavUl = styled.ul`
    list-style: none;
    display: flex;
    gap: 50px;

    ${mobile({
        gap:'20px'
    })}
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
                <Link to='committee-edit' className='website-nav-link'>Committees</Link>
            </NavLi>
            
        </NavUl>
    </Nav>
  )
}

export default PagesNav
