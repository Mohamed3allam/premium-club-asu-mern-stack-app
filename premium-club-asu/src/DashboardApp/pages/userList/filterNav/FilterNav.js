import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import './filterNav.css'

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

const FilterNav = () => {
  return (
    <Nav>
        <NavUl>
            <NavLi>
                <Link to='' className='filter-nav-link'>All</Link>
            </NavLi>
            <NavLi>
                <Link to='highboard' className='filter-nav-link'>Highboard</Link>
            </NavLi>
            <NavLi>
                <Link to='board' className='filter-nav-link'>Board</Link>
            </NavLi>
            <NavLi>
                <Link to='members' className='filter-nav-link'>Members</Link>
            </NavLi>
            <NavLi>
                <Link to='committees' className='filter-nav-link'>Committees</Link>
            </NavLi>
        </NavUl>
    </Nav>
  )
}

export default FilterNav
