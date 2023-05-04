import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import './committeeNav.css'
import { mobile } from '../../../../responsive'

const Nav = styled.nav`
    display: flex;
    align-items: center;
    background-color: white;
    box-shadow: none;
    background-image: none;
    max-width: 100%;
`
const NavUl = styled.ul`
    list-style: none;
    display: flex;
    gap: 50px;
    ${mobile({
        overflowX: 'scroll'
    })} 
`
const NavLi = styled.li`
    position: relative;
    display: inline-block;
    font-size: 10px;

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

const CommitteeNav = ({ committees }) => {

  return (
    <Nav>
        <NavUl>
            {
                committees && committees.map((committee) => (
                    <NavLi key={committee._id}>
                        <Link to={`${committee.committee_name.replace(/\s+/g, '-').toLowerCase()}`} className='committee-nav-link'>{committee.committee_name}</Link>
                    </NavLi>
                ))
            }
        </NavUl>
    </Nav>
  )
}

export default CommitteeNav
