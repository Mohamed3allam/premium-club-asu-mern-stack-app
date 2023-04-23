import styled from "styled-components"
import FacebookIcon  from '@mui/icons-material/Facebook';
import InstagramIcon  from '@mui/icons-material/Instagram';
import RoomIcon from '@mui/icons-material/Room';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { mobile } from "../../responsive";

const Container = styled.div`
    box-shadow: 10px 0px 15px black;
    padding:0.5% 1.5%;
    height: fit-content;
    display: flex;
    max-width: 100%;
    background-color: white;
    ${mobile({
        flexDirection: "column"
    })}
`
const SubContainer = styled.div``
const Left = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const Logo = styled.h1``;
const Desc = styled.p`
    margin: 20px 0px;
`;

const Title = styled.h3`
    margin-bottom: 30px;
`

const Center = styled.div`
    flex: 1;
    padding: 20px;

`
const Right = styled.div`
    flex: 1;
    padding: 20px;

    ${mobile({
        backgroundColor: "#eee"
    })}
`

const ContactItem = styled.div``

const Creator = styled.div`
    display: flex;
    flex-direction: row;
`
const CreatorPic = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
`
const CreatorData = styled.div`
    display: flex;
    flex-direction: column;
`
const CreatorName = styled.p`
    font-weight: bold;
    font-size: 16px;
    margin: 0;
`
const CreatorInfo = styled.p`
    font-size: 15px;
    color: gray;
    margin: 0;
`

const FooterNew = ({images}) => {
  return (
    <Container className="container">
        <Left>
            <Logo>Premium Club</Logo>
            <Desc>
                    We are her to help you find your favourite career,
                    to prepare you for the Labor Market and to help you know more people ,
                    more contacts and most important .. have life experience.
            </Desc>
            <ContactItem >
                <a className="link" href="https://www.google.com/maps/place/30%C2%B004'29.7%22N+31%C2%B017'15.8%22E/@30.075452,31.2863393,17.29z/data=!4m5!3m4!1s0x0:0x7d0ecb1a604ed45b!8m2!3d30.0748205!4d31.2878046?coh=164777&entry=tt" target='_blank' rel="noreferrer">
                    <RoomIcon style={{marginRight:"10px"}} />
                    Faculty of Business, Ain Shams University
                </a>
            </ContactItem>
        </Left>
        <Center>
            <Title>Contact</Title>
                <ContactItem>
                    <a className="link" href='https://facebook.com/PremiumClubASU/' target='_blank' rel='noreferrer' >
                        <FacebookIcon style={{marginRight:"10px"}} />
                        premiumclub.asu
                    </a>
                </ContactItem>
                <ContactItem>
                    <a className="link" href='https://www.instagram.com/premium_club_asu/' rel='noreferrer' >
                        <InstagramIcon style={{marginRight:"10px"}} />
                        premium_club_asu
                    </a>
                </ContactItem>
                <ContactItem>
                    <a className="link" href='https://www.tiktok.com/@premiumclubasu?_t=8X6BlERoxlK&_r=1' target='_blank' rel='noreferrer' >
                        <svg className='fontawesomesvg link' style={{margin:0}} width='20px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/></svg>
                        &nbsp;premiumclubasu
                    </a>
                </ContactItem>
                <ContactItem>
                    <a className="link" href='mailto:premiumclub28@gmail.com' target='_blank' rel='noreferrer' >
                        <MailOutlinedIcon style={{marginRight:"10px"}} />
                        premiumclub28@gmail.com
                    </a>
                </ContactItem>

        </Center>
        <Right>
            <Title>Created By:</Title>
            <Creator>
                <CreatorPic src={images['creator.jpeg']} />
                <CreatorData>
                    <CreatorName>Mohamed Abdelrahman</CreatorName>
                    <CreatorInfo>Media Vice Head 2021-2022</CreatorInfo>
                    <CreatorInfo>Web Developer</CreatorInfo>
                </CreatorData>
            </Creator>
        </Right>
    </Container>
  )
}

export default FooterNew
