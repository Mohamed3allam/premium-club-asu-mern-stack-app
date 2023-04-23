import React from 'react'
import { DownloadingOutlined } from "@mui/icons-material"
import styled from "styled-components"
import './background.css'


const BackgroundEditPanel = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 20px;
  padding: 30px;
  border-radius: 10px;
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47); 
`
const BackgroundEditTitle = styled.h1`
    font-size: 25px;
    font-weight: bold;
`
const BackgroundLeftPanel = styled.div`
    flex: 3;
    padding: 3%;
    width: min-content;
`
const BackgroundPreview = styled.div`
    border: solid gray 3px;
    border-radius: 5px;
    width: 480px;
    height: 270px;
    position: relative;
    overflow: hidden;
    transition: none;

`
const BackgroundImgPreview = styled.iframe`
    pointer-events: none;
    transform: scale(0.25) translate(-150%,-150%);
    width: 400%;
    height: 400%;
    border-radius: 5px;
    overflow: hidden;
`
const BackgroundRightPanel = styled.div`
    flex: 4;
    padding: 3%;
`
const BackgroundEditImg = styled.div``
const ChangeBackgroundTitle = styled.h4``
const ChangeBackgroundForm = styled.form`
    padding: 1%;
    display: flex;
    flex-direction: column;
`
const ImagePreviewContainer = styled.div`
    position: relative;
    width: 50%;

    &:hover {
        filter: opacity(0.70);
    }
`
const ChangeBackgroundInputLabel = styled.label`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    cursor: pointer;
`
const ChangeBackgroundInput = styled.input`
    display: none;
`
const PreviewedImage = styled.img`
    width: 100%;
    border-radius: 10px;
    cursor: pointer;
`
const ChangeBackgroundButton = styled.button`
    width: fit-content;
    padding: 1.5% 2.5%;
    margin: 3%;
    background-color: rgba(87, 0, 133, 1);
    color: white;
    font-weight: bold;
    border-radius: 4px;
    border: solid 2px rgba(87, 0, 133, 1);

    &:hover {
        color: rgba(87, 0, 133, 1);
        background-color: white;
    }
`

const imageHandle = () => {
    const [file] = document.getElementById('bg-image').files
    if (file) {
        document.getElementById('preview-image').src = URL.createObjectURL(file)
    }
}
const Background = () => {
    // const { user } = useAuthContext()

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    // }
    // const fetchBG = async () => {
    //     await fetch('/upload-bg-image',{
    //         method:'POST',
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //             'Authorization': `Bearer ${user.token}`
    //         }
    //     })
    // }
  return (
    <>
        <BackgroundEditPanel>
            <BackgroundEditTitle>
                Website Background
            </BackgroundEditTitle>
            <div style={{display:'flex', flexDirection:'row'}}>
                <BackgroundLeftPanel>
                    <BackgroundPreview>
                        <BackgroundImgPreview src='http://localhost:3000/' title='Premium Club ASU' id='iframe'></BackgroundImgPreview>
                    </BackgroundPreview>
                </BackgroundLeftPanel>
                <BackgroundRightPanel>
                    <BackgroundEditImg>
                        <ChangeBackgroundTitle>
                            Edit Website Background
                        </ChangeBackgroundTitle>
                        <ChangeBackgroundForm id='img-form' action='/background/upload-bg-image' method='POST' name='bg-image' encType='multipart/form-data'>
                            <ImagePreviewContainer>
                                <ChangeBackgroundInputLabel htmlFor='bg-image'>
                                    <DownloadingOutlined style={{transform:'rotate(180deg)',color:'white',width:'50px',height:'50px'}}/> 
                                </ChangeBackgroundInputLabel>
                                <PreviewedImage width='100%' id='preview-image' src="/background/shownimage/backgroundimage" alt="website background" />
                            </ImagePreviewContainer>
                            <ChangeBackgroundInput onChange={imageHandle} accept='image/*' type="file" name='bg-image' id='bg-image'/>
                            <ChangeBackgroundButton type='submit' name='bg-image'>Change Background</ChangeBackgroundButton>
                        </ChangeBackgroundForm>
                    </BackgroundEditImg>
                </BackgroundRightPanel>
            </div>
        </BackgroundEditPanel>
    </>
  )
}

export default Background
