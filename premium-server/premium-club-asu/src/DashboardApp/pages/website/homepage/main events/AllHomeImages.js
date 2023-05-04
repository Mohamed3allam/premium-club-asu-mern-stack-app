import React from 'react'
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../../../../hooks/useAuthContext';
import { useHomeImgsContext } from '../../../../hooks/useHomeImgsContext';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { AddCircle, Delete, Edit, Queue, Upgrade } from '@mui/icons-material';
import './allHomeImages.css'
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import EditPopup from './editPopup/EditPopup';
import SingleUploadPopup from './uploadPopup/SingleUploadPopup';
import MultipleUploadPopup from './multipleUpload/MultipleUploadPopup';
import config from '../../../../../config';
import { mobile } from '../../../../responsive';


const Container = styled.div`
    flex: 3;
    overflow: hidden;
    position: relative;
`

const Wrapper = styled.div`
    display: flex;
    max-width: 100%;
    transition: all 1.5s ease;
`
const EditWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    transition: all 1.5s ease;

    ${mobile({
        justifyContent:'unset',
        margin:'0'
    })}
`
const EditDiv = styled.div`
    position: relative;
    border-radius: 20px;
    margin: 10px;
    height: fit-content;

    &:hover {
        -webkit-box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.47);
        box-shadow: 0px 0px 30px rgba(0,0,0, 0.47); 
    }
`
const EditButton = styled.button`
    padding: 20px;
    background-color: transparent;
    border-radius: 10px;
    color: gray;

    &:hover {
        color: black;

        &:last-child p {
            visibility: visible;
            opacity: 1;
        }
    }

    ${mobile({
        fontSize:'12px !important',
        padding:'5px'
    })}
`

const UploadIcon = styled.h3`
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: solid white 2px;
`
const DataContainer = styled.div`
    opacity: 0;
    transition: 0.5s;
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;

    &:hover {
        opacity: 1;
        transition: 0.5;
        backdrop-filter: brightness(0.4);
        border-radius: 5px;
    }
`


const AllHomeImages = () => {
    // console.log(window.matchMedia('(prefers-color-scheme:dark)').matches)

    const [error, setError] = useState(null)
    const [updated, setUpdated] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [emptyFields, setEmptyFields] = useState([])

    const [editPopupVisibility, setEditPopupVisibility] = useState('none')

    const { homeImgs,dispatch } = useHomeImgsContext();
    const { user } = useAuthContext();

    const premiumApi = config.premiumApi

    const [slideIndex, setSlideIndex] = useState(1)
    const [mainImg, setMainImg] = useState(1);
    const [prevImg, setPrevImg] = useState(0);
    const [nextImg, setNextImg] = useState(2);

    const [panelVisiblity, setPanelVisibility] = useState(false)
    
    useEffect(() => {

        const fetchHomeImgs = async () => {
            const response = await fetch(`${premiumApi}/home-api/home-main-events-images/json`, {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok) {
                await dispatch({type: 'SET_HOME_IMGS', payload:json})
            }
        }
        fetchHomeImgs()

        
        homeImgs && setPrevImg(homeImgs.length - 1) 
        homeImgs && loadGallery()

    }, [dispatch, user])



    const loadGallery = () => {
        let eventName = document.getElementById("eventName")
        eventName.innerText = homeImgs[mainImg].eventName

        let orderNumber = document.getElementById("orderNumber")
        orderNumber.innerText = homeImgs[mainImg].ordering
    };
    const scrollRight = () => {
        setPrevImg(mainImg)
        setMainImg(nextImg)
        setSlideIndex(mainImg)
        if (nextImg >= (homeImgs.length -1)) {
            setNextImg(0)
        } else {
            setNextImg(nextImg + 1);
        }; 
        loadGallery();
    };
    const scrollLeft = () => {
        setNextImg(mainImg)
        setMainImg(prevImg)
        setSlideIndex(mainImg)
        if (prevImg === 0) {
            setPrevImg(homeImgs.length - 1)
        } else {
            setPrevImg(prevImg - 1);
        };
        loadGallery();
    };

    const showEditPopup = () => {
        const editPopup = document.getElementById('editPopup')
        console.log(editPopup.style.display)
        editPopup.style.display = 'block'
        console.log('popup changed')
    }
    const showAddImagePopup = () => {
        const singleUpload = document.getElementById('single-upload-popup')
        singleUpload.style.display = 'block'
    }
    const showAddBulkPopup = () => {
        const multipleUpload = document.getElementById('multiple-upload-popup')
        multipleUpload.style.display = 'block'
    }
  return (
    <>
    <Container>
        <Wrapper slideIndex={slideIndex}>
        {
            !homeImgs && (
                <>
                    <h1>No Images</h1>
                </>
            )
        }
        {homeImgs && (
            <div id="container">
                <div id="galleryView">
                    <div id="galleryContainer">
                        <>
                            {homeImgs[prevImg] && (
                                <>
                                    <div id="leftView" onClick={() => scrollLeft()} style={{background:`url("${homeImgs[prevImg].imageUrl}")`}}></div>
                                    <button id="navLeft" className="navBtns" onClick={()=> scrollLeft()}>
                                        <KeyboardArrowLeftIcon style={{color:'black',fontSize:'40px'}}/>
                                    </button>
                                </>
                            )}

                            {homeImgs[mainImg] && (
                                <>
                                    <a onClick={showEditPopup} id='linkTag'>
                                        <div id="mainView" style={{background:`url("${homeImgs[mainImg].imageUrl}")`}}>
                                            <DataContainer>
                                                <h3 id='eventName'>{homeImgs[mainImg].eventName}</h3>
                                                <UploadIcon><Upgrade /></UploadIcon>
                                                <h3 id='orderNumber'>{homeImgs[mainImg].ordering}</h3>
                                            </DataContainer>
                                        </div>
                                    </a>
                                </>
                            )}

                            {homeImgs[nextImg] && (
                                <>
                                    <div id="rightView" onClick={() => scrollRight()} style={{background:`url("${homeImgs[nextImg].imageUrl}")`}}></div>
                                    <button id="navRight" className="navBtns" onClick={() => scrollRight()}>
                                        <KeyboardArrowRightIcon style={{color:'black',fontSize:'40px'}}/>
                                    </button>
                                </>
                            )}
                        </>
                    </div>
                    <div style={{textAlign:'center',fontWeight:'bold',width:'100%'}}>
                        <p>{slideIndex} of {homeImgs && homeImgs.length -1}</p>
                    </div>

                        <EditWrapper>
                            <EditDiv>
                                <EditButton onClick={showAddImagePopup}>
                                    <AddCircle className='uploading-icons' style={{width:'50px',height:'50px'}}/>
                                    <br/>
                                    Upload Image
                                </EditButton>
                            </EditDiv>
                            <EditDiv>
                                <EditButton onClick={showAddBulkPopup}>
                                    <Queue className='uploading-icons' style={{width:'50px',height:'50px'}}/>
                                    <br/>
                                    Upload Multiple Images
                                </EditButton>
                            </EditDiv>
                        </EditWrapper>
                </div>

                {/* Popups */}
                <div id="editPopup">
                    <EditPopup key={homeImgs[mainImg]._id} homeImg={homeImgs[mainImg]}/>
                </div>
                <div id="single-upload-popup">
                    <SingleUploadPopup />
                </div>
                <div id="multiple-upload-popup">
                    <MultipleUploadPopup />
                </div>
            </div>
            )}
        </Wrapper>
        
        
    </Container>
    </>
  )
}

export default AllHomeImages;
