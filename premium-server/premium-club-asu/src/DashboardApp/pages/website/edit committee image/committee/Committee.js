import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import EditImage from '../imageEditor/ImageEditor'
import { useAuthContext } from '../../../../hooks/useAuthContext'
import { useState } from 'react'
import DescriptionControl from '../descriptionControl/DescriptionControl'
import AllSections from '../allSections/AllSections'
import NewSection from '../newsection/NewSection'
import { mobile } from '../../../../responsive'

const Container = styled.div`
    padding: 30px;

    ${mobile({
        padding:'15px'
    })}
`
const Wrapper = styled.div``
const CommitteeName = styled.h1`
    font-weight: bold;
    margin-bottom: 2%;

    ${mobile({
        fontSize:'16px !important'
    })}
`
const Board = styled.div`
    position: relative;
`
const BoardContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: space-evenly;

    ${mobile({
        flexDirection:'column'
    })}
`
const BoardMemberCard = styled.div`
    padding: 4%;
    width: 20%;
    height: fit-content;
    box-shadow: 2px 4px 10px 1px rgba(201,201,201,0.47);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: auto;
    border-radius: 10px;
    gap: 5px;
    
    ${mobile({
        width: '100%',
        overflow:'hidden',
        flexDirection:'row',
        height:'100px',
        justifyContent:'left',
        gap:0
    })}
`
const BoardMemberPP = styled.img`
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 50%;
    max-width: 100%;
    ${mobile({
        maxHeight:'100%',
        padding:'10px',
        flex: 2
    })}
`
const BoardMemberName = styled.h5`
    font-weight: bold;

    ${mobile({
        fontSize:'15px !important',
        textAlign:'left',
        flex:3
    })}
`
const BoardMemberTitle = styled.h6`
    color: gray;
    ${mobile({
        fontSize:'12px !important',
        flex:2
    })}

`
const BoardMemberEditButton = styled.button`
    background-color: gray;
    border-radius: 3px;
    padding: 5px;
    border: none;
    color: white;
    width: 50%;

    &:hover {
        background-color: rgba(0,0,0,0.6);
    }
    ${mobile({
        flex:2
    })}
`

const CommitteeSections = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px;
    gap: 5px;

    ${mobile({
        flexDirection:'column-reverse',
        margin:'0'
    })}
`

const ImageControl = styled.div``


const Committee = ({ committee }) => {
    const { user } = useAuthContext()



    return (
    <Container>
        <Wrapper>
            <CommitteeName>
                {committee && committee.committee_name} Committee
            </CommitteeName>
            <Board>
                {
                    committee && (
                        <>
                            {
                                (committee.committee_vice_heads.length === 1) && (
                                    <BoardContainer>
                                        <BoardMemberCard>
                                            <BoardMemberPP src={committee.committee_head.profilePicUrl} className='img-fluid' />
                                            <hr style={(window.innerWidth<768) ? {color:'gray', height:'100%'} : {color:'gray',width:'100%'}}/>
                                            <BoardMemberName>{`${committee.committee_head.name.firstName} ${committee.committee_head.name.lastName}`}</BoardMemberName>
                                            <BoardMemberTitle>{committee.committee_head.title}</BoardMemberTitle>
                                            <BoardMemberEditButton>
                                                <Link to={`/dashboard/user/${committee.committee_head._id}`} style={{textDecoration:'none', color:'unset'}}>
                                                    Edit
                                                </Link>
                                            </BoardMemberEditButton>
                                        </BoardMemberCard>
                                        {
                                            committee.committee_vice_heads.map((vice_head) => (
                                                <BoardMemberCard key={vice_head._id}>
                                                    <BoardMemberPP src={vice_head.profilePicUrl} className='img-fluid' />
                                                    <hr style={(window.innerWidth<768) ? {color:'gray', height:'100%'} : {color:'gray',width:'100%'}}/>
                                                    <BoardMemberName>{`${vice_head.name.firstName} ${vice_head.name.lastName}`}</BoardMemberName>
                                                    <BoardMemberTitle>{vice_head.title}</BoardMemberTitle>
                                                    <BoardMemberEditButton>
                                                        <Link to={`/dashboard/user/${vice_head._id}`} style={{textDecoration:'none', color:'unset'}}>
                                                            Edit
                                                        </Link>
                                                    </BoardMemberEditButton>
                                                </BoardMemberCard>
                                            ))
                                        }
                                    </BoardContainer>
                                )
                            }
                            {
                                (committee.committee_vice_heads.length !== 1) && (
                                    <>
                                        {
                                            committee.committee_head && (
                                                <BoardContainer>
                                                    <BoardMemberCard>
                                                        <BoardMemberPP src={committee.committee_head.profilePicUrl} className='img-fluid' />
                                                        <hr style={(window.innerWidth<768) ? {color:'gray', height:'100%'} : {color:'gray',width:'100%'}}/>
                                                        <BoardMemberName>{`${committee.committee_head.name.firstName} ${committee.committee_head.name.lastName}`}</BoardMemberName>
                                                        <BoardMemberTitle>{committee.committee_head.title}</BoardMemberTitle>
                                                        <BoardMemberEditButton>
                                                            <Link to={`/dashboard/user/${committee.committee_head._id}`} style={{textDecoration:'none', color:'unset', width:'100%'}}>
                                                                Edit
                                                            </Link>
                                                        </BoardMemberEditButton>
                                                    </BoardMemberCard>
                                                    
                                                </BoardContainer>
                                            )
                                        }
                                        {
                                            committee.committee_vice_heads && (
                                                <BoardContainer>
                                                    {
                                                        committee.committee_vice_heads.map((vice_head) => (
                                                            <BoardMemberCard key={vice_head._id}  style={{marginTop:(window.innerWidth < 768) ? '0' : '-25%'}}>
                                                                <BoardMemberPP src={vice_head.profilePicUrl} className='img-fluid' />
                                                                <hr style={(window.innerWidth<768) ? {color:'gray', height:'100%'} : {color:'gray',width:'100%'}}/>
                                                                <BoardMemberName>{`${vice_head.name.firstName} ${vice_head.name.lastName}`}</BoardMemberName>
                                                                <BoardMemberTitle>{vice_head.title}</BoardMemberTitle>
                                                                <BoardMemberEditButton>
                                                                    <Link to={`/dashboard/user/${vice_head._id}`} style={{textDecoration:'none', color:'unset'}}>
                                                                        Edit
                                                                    </Link>
                                                                </BoardMemberEditButton>
                                                            </BoardMemberCard>
                                                        ))
                                                    }
                                                </BoardContainer>
                                            )
                                        }
                                    </>
                                )
                            }
                        </>
                    )
                }
                
            </Board>

            <ImageControl>
                <EditImage committee={committee} />
            </ImageControl>

            <DescriptionControl committee={committee} />

            <CommitteeSections>
                <div style={{display:'flex',flexDirection:'column',gap:'5px',flex:3}}>
                    {
                        committee && committee.committee_sections.map((committee_section) => (
                            <AllSections key={committee_section._id} committee_section={committee_section} />
                        ))
                    }
                </div>
                <NewSection committee={committee}/>
            </CommitteeSections>
        </Wrapper>
    </Container>
  )
}

export default Committee
