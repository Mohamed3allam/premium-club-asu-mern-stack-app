import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    flex: 5;
    height: 100%;
    width: 100%;
    max-width: 1400px !important;
`
const Wrapper = styled.div`
    padding: 30px;
    background-color: white;
    height: 100%;
    box-shadow: 5px 0 15px black !important;
`


const Profile = () => {
    return (
        <Container>
            <Wrapper>
                Hello
            </Wrapper>
        </Container>
    )
}

export default Profile
