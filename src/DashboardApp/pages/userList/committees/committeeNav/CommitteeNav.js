import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import './committeeNav.css'

const Nav = styled.nav`
    display: flex;
    align-items: center;
    gap: 30px;
    background-color: white;
    box-shadow: none;
    background-image: none;
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

const CommitteeNav = () => {
  return (
    <Nav>
        <NavUl>
            <NavLi>
                <Link to='' className='committee-nav-link'>Media</Link>
            </NavLi>
            <NavLi>
                <Link to='marketing' className='committee-nav-link'>Marketing</Link>
            </NavLi>
            <NavLi>
                <Link to='events' className='committee-nav-link'>Events</Link>
            </NavLi>
            <NavLi>
                <Link to='human-resources' className='committee-nav-link'>Human Resources</Link>
            </NavLi>
            <NavLi>
                <Link to='public-relations' className='committee-nav-link'>Public Relations</Link>
            </NavLi>
            <NavLi>
                <Link to='logistics' className='committee-nav-link'>Logistics</Link>
            </NavLi>
            <NavLi>
                <Link to='academic' className='committee-nav-link'>Academic</Link>
            </NavLi>
        </NavUl>
    </Nav>
  )
}

export default CommitteeNav
