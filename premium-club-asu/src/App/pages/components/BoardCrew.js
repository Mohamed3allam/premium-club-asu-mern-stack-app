import React from 'react'
import { TreeNode, Tree } from 'react-organizational-chart'
import styled from 'styled-components'
import { mobile } from '../../responsive'

const HeadDiv = styled.div`    
    width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    ${mobile({
        width: '60px',
    })}
`
const HeadPic = styled.img`
    /* clip-path: circle(50% at 50% 46%) ; */
    border: solid white 3px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 12px;
    ${mobile({
        marginBottom:'10px'
    })}
`
const HeadName = styled.h4`
    color: white;
    font-weight: bold;
    font-size: 17px;
    width: max-content;
    margin-bottom: 0;
    ${mobile({
        fontSize:'12px'
    })}
`
const HeadPosition = styled.h5`
    color: lightgray;
    font-weight: 500;
    font-size: 12px;
    width: max-content;
    ${mobile({
        fontSize:'10px'
    })}
`


const ViceHeadDiv = styled.div`    
    width: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 50px;
    margin-right: 50px;
    ${mobile({
        width: '60px',
        marginLeft:'30px',
        marginRight:'30px',
    })}
    `
const ViceHeadPic = styled.img`
    /* clip-path: circle(50% at 50% 46%) ; */
    border: solid white 3px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 12px;
    ${mobile({
        marginBottom:'10px'
    })}
`
const ViceHeadName = styled.h4`
    color: white;
    font-weight: bold;
    font-size: 17px;
    width: max-content;
    margin-bottom: 0;
    ${mobile({
        fontSize:'12px'
    })}
`
const ViceHeadPosition = styled.h5`
    color: lightgray;
    font-weight: 500;
    font-size: 12px;
    width: max-content;
    ${mobile({
        fontSize:'10px'
    })}
`

const BoardCrew = ({images}) => {
  return (
    <div style={{overflowX:'scroll',height:'fit-content'}}>
        <Tree 
            lineWidth={'4px'}
            lineColor={'white'}
            lineHeight={'30px'}
        >

            {/* MEDIA */}
            <TreeNode label={
                <HeadDiv>
                    <HeadName>Media</HeadName>
                    <HeadPic src={images['HeadMd.jpeg']} className="img-fluid" />
                    <HeadName>
                        Abdelrahman Gamal
                    </HeadName>
                    <HeadPosition>
                        Head
                    </HeadPosition>
                </HeadDiv>
            } >
                <TreeNode label={
                    <ViceHeadDiv>
                        <ViceHeadPic src={images['ViceMd.jpeg']} className="img-fluid" />
                        <ViceHeadName>
                            Kyrolos Samy
                        </ViceHeadName>
                        <ViceHeadPosition>
                            Vice Head
                        </ViceHeadPosition>
                    </ViceHeadDiv>
                } />
            </TreeNode>


                {/* MARKETING */}
            <TreeNode label={
                <HeadDiv>
                    <HeadName>Marketing</HeadName>
                    <HeadPic src={images['HeadMarketing.jpeg']} className="img-fluid" />
                    <HeadName>
                        Sama Omar
                    </HeadName>
                    <HeadPosition>
                        Head
                    </HeadPosition>
                </HeadDiv>
            }>
                <TreeNode label={
                    <ViceHeadDiv>
                        <ViceHeadPic src={images['ViceMarketing.jpeg']} className="img-fluid" />
                        <ViceHeadName>
                            Mariam Eid
                        </ViceHeadName>
                        <ViceHeadPosition>
                            Vice Head
                        </ViceHeadPosition>
                    </ViceHeadDiv>
                } />
                <TreeNode label={
                    <ViceHeadDiv>
                        <ViceHeadPic src={images['ViceMarketing1.jpeg']} className="img-fluid" />
                        <ViceHeadName>
                            Hagar Emad
                        </ViceHeadName>
                        <ViceHeadPosition>
                            Vice Head
                        </ViceHeadPosition>
                    </ViceHeadDiv>
                } />
            </TreeNode>


            {/* EVENTS */}
            <TreeNode label={
                <HeadDiv>
                    <HeadName>Events</HeadName>
                    <HeadPic src={images['HeadEv.jpeg']} className="img-fluid" />
                    <HeadName>
                        Yara Waleed
                    </HeadName>
                    <HeadPosition>
                        Head
                    </HeadPosition>
                </HeadDiv>
            }>
                <TreeNode label={
                    <ViceHeadDiv>
                        <ViceHeadPic src={images['ViceEv.jpeg']} className="img-fluid" />
                        <ViceHeadName>
                            Gehan Salah
                        </ViceHeadName>
                        <ViceHeadPosition>
                            Vice Head
                        </ViceHeadPosition>
                    </ViceHeadDiv>
                } />
            </TreeNode>


                {/* LOGISTICS */}
            <TreeNode label={
                <HeadDiv>
                    <HeadName>Logistics</HeadName>
                    <HeadPic src={images['HeadLog.jpeg']} className="img-fluid" />
                    <HeadName>
                        Mai Rashwan
                    </HeadName>
                    <HeadPosition>
                        Head
                    </HeadPosition>
                </HeadDiv>
            } >
                <TreeNode label={
                    <ViceHeadDiv>
                        <ViceHeadPic src={images['ViceLog.jpeg']} className="img-fluid" />
                        <ViceHeadName>
                            Nourhan Alaa
                        </ViceHeadName>
                        <ViceHeadPosition>
                            Vice Head
                        </ViceHeadPosition>
                    </ViceHeadDiv>
                } />
                <TreeNode label={
                    <ViceHeadDiv>
                        <ViceHeadPic src={images['ViceLog1.jpeg']} className="img-fluid" />
                        <ViceHeadName>
                            Anaheed Amr
                        </ViceHeadName>
                        <ViceHeadPosition>
                            Vice Head
                        </ViceHeadPosition>
                    </ViceHeadDiv>
                } />
            </TreeNode>


            {/* HR */}
            <TreeNode label={
                <HeadDiv>
                    <HeadName>Human resources</HeadName>
                    <HeadPic src={images['HeadHr.jpeg']} className="img-fluid" />
                    <HeadName>
                        Maya Mohamed
                    </HeadName>
                    <HeadPosition>
                        Head
                    </HeadPosition>
                </HeadDiv>
            }>
                <TreeNode label={
                    <ViceHeadDiv>
                        <ViceHeadPic src={images['ViceHr.jpeg']} className="img-fluid" />
                        <ViceHeadName>
                            Omar Tharwat
                        </ViceHeadName>
                        <ViceHeadPosition>
                            Vice Head
                        </ViceHeadPosition>
                    </ViceHeadDiv>
                } />
            </TreeNode>


            {/* PR */}
            <TreeNode label={
                <HeadDiv>
                    <HeadName>Public Relations</HeadName>
                    <HeadPic src={images['HeadPr.jpeg']} className="img-fluid" />
                    <HeadName>
                        Toqa Mahmoud
                    </HeadName>
                    <HeadPosition>
                        Head
                    </HeadPosition>
                </HeadDiv>
            }>
                <TreeNode label={
                    <ViceHeadDiv>
                        <ViceHeadPic src={images['VicePr1.jpeg']} className="img-fluid" />
                        <ViceHeadName>
                            Abdulrahman Aziz
                        </ViceHeadName>
                        <ViceHeadPosition>
                            Vice Head
                        </ViceHeadPosition>
                    </ViceHeadDiv>
                } />
                <TreeNode label={
                    <ViceHeadDiv>
                        <ViceHeadPic src={images['VicePr.jpeg']} className="img-fluid" />
                        <ViceHeadName>
                            Salimeen Tarek
                        </ViceHeadName>
                        <ViceHeadPosition>
                            Vice Head
                        </ViceHeadPosition>
                    </ViceHeadDiv>
                } />
            </TreeNode>



            {/* ACADEMIC */}
            <TreeNode label={
                <HeadDiv>
                    <HeadName>Academic</HeadName>
                    <HeadPic src={images['HeadAc.jpeg']} className="img-fluid" />
                    <HeadName>
                        Nayra Ayman
                    </HeadName>
                    <HeadPosition>
                        Head
                    </HeadPosition>
                </HeadDiv>
            }>
                <TreeNode label={
                    <ViceHeadDiv>
                        <ViceHeadPic src={images['ViceAc.jpeg']} className="img-fluid" />
                        <ViceHeadName>
                            Yasmina Osama
                        </ViceHeadName>
                        <ViceHeadPosition>
                            Vice Head
                        </ViceHeadPosition>
                    </ViceHeadDiv>
                } />
                <TreeNode label={
                    <ViceHeadDiv>
                        <ViceHeadPic src={images['ViceAc1.jpeg']} className="img-fluid" />
                        <ViceHeadName>
                            Dareen Ahmed
                        </ViceHeadName>
                        <ViceHeadPosition>
                            Vice Head
                        </ViceHeadPosition>
                    </ViceHeadDiv>
                } />
            </TreeNode>
        </Tree>
    </div>
  )
}

export default BoardCrew
