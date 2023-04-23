import React from 'react';
import '../css/crew.css';
import ScrollHandle from "../js/Scroll";

import {Helmet} from "react-helmet";
import FirebaseActivation from '../js/FirebaseActivation';
import { Tree, TreeNode } from 'react-organizational-chart';

import { useAuthContext } from "../hooks/useAuthContext";
import ClientNavbar from './components/ClientNavbar';
import FooterNew from './components/FooterNew';
import styled from 'styled-components';
import BoardCrew from './components/BoardCrew';
import { mobile } from '../responsive';

// President Styling
const PresidentDiv = styled.div`    
    width: 170px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    ${mobile({
        width:'60px',
    })}
`
const PresidentPic = styled.img`
    border: solid white 3px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 20px;
    ${mobile({
        border:'solid white 2px',
        marginBottom:'10px'
    })}
`
const PresidentName = styled.h4`
    color: white;
    font-weight: bold;
    font-size: 25px;
    width: max-content;
    margin-bottom: 0;
    ${mobile({
        fontSize:'12px'
    })}
`
const PresidentPosition = styled.h5`
    color: lightgray;
    font-weight: 500;
    font-size: 20px;
    width: max-content;
    ${mobile({
        fontSize:'10px'
    })}
`

// Vice Presidents Styling
const HighboardDiv = styled.div`    
    width: 170px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 100px;
    margin-right: 100px;
    ${mobile({
        width: '60px',
        marginLeft:'30px',
        marginRight:'30px',
    })}
    `
const HighboardPic = styled.img`
    border: solid white 3px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 20px;
    ${mobile({
        marginBottom:'10px'
    })}
`
const HighboardName = styled.h4`
    color: white;
    font-weight: bold;
    font-size: 25px;
    width: max-content;
    margin-bottom: 0;
    ${mobile({
        fontSize:'12px'
    })}
`
const HighboardPosition = styled.h5`
    color: lightgray;
    font-weight: 500;
    font-size: 20px;
    width: max-content;
    ${mobile({
        fontSize:'10px'
    })}
`



const Crew = ({images}) => {

    const { user } = useAuthContext()
    

    FirebaseActivation();
                
                  
    //SCROLLING NAVBAR
    ScrollHandle();
    //-----------

    return ( 
        <>

            <div className="wrapper">
                <Helmet>
                    <meta property="og:title" content="Premium Crew" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://www.premium-club-asu.org/creww" />
                    <meta property="og:image" content={images["premiumClubLogoTextMouse.png"]} />
                    
                    <title> Premium Crew </title>

                    <meta charSet="UTF-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <meta name="description" content="Premium Club is a Nonprofit Organization and one of the leading student activities in faculty of Commerce Ain shams University."/>
                    <meta name="keywords" content="premium club,premium, premium club asu, club, asu, بريميم, premium student activity, student activity, كلية تجارة"/>
                </Helmet>
            </div>
            <ClientNavbar images={images} />
            <section className="highBoard  text-light text-center">
                <div className="container">
                    <div className="row py-5"  style={{display:'flex',alignItems:"center"}}>
                        <div className="row pb-5 pt-4 px-0">
                            <h1 className="h1 px-0" style={{fontWeight: 'bold',fontSize:'50px'}}>
                                High Board
                            </h1>
                        </div>
                        <div className="highBoardDivs text-dark">
                            <Tree 
                                lineWidth={'4px'}
                                lineColor={'white'}
                                lineHeight={'30px'}
                                label={
                                    <PresidentDiv>
                                        <PresidentPic src={images['totos.jpeg']} className="img-fluid" />
                                        <PresidentName>
                                            Adham Hesham
                                        </PresidentName>
                                        <PresidentPosition>
                                            President
                                        </PresidentPosition>
                                    </PresidentDiv>
                                }
                            >
                                <TreeNode label={
                                    <HighboardDiv>
                                        <HighboardPic src={images['hamdy.jpeg']} className="img-fluid" />
                                        <HighboardName>
                                            Ahmed Hamdy
                                        </HighboardName>
                                        <HighboardPosition>
                                            Vice President
                                        </HighboardPosition>
                                    </HighboardDiv>
                                } />
                                <TreeNode label={
                                    <HighboardDiv>
                                        <HighboardPic src={images['salma.jpeg']} className="img-fluid" />
                                        <HighboardName>
                                            Salma Yasser
                                        </HighboardName>
                                        <HighboardPosition>
                                            Vice President
                                        </HighboardPosition>
                                    </HighboardDiv>
                                } />
                            </Tree>
                        </div>
                    </div>
                </div>
            </section>

            

            <section className="highBoard  text-light text-center">
                <div className="container">
                    <div className="row py-3"  style={{display:'flex',alignItems:"center"}}>
                        <div className="row pt-0 px-0">
                            <h1 className="h1 px-0" style={{fontWeight: 'bold',fontSize:'50px'}}>
                                Board
                            </h1>
                        </div>
                        <div className="highBoardDivs text-dark">
                            <BoardCrew images={images}/>
                        </div>
                    </div>
                </div>
            </section>

            <FooterNew images={images}/>
        </>
     );
}
 
export default Crew;