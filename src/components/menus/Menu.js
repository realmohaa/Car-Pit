/* eslint-disable @next/next/no-img-element */

import { FaHome, FaCar, FaCalendarAlt, FaChartArea, FaSignOutAlt } from 'react-icons/fa';
import profilePic from '../../assets/pp.png'
import Link from "next/link";
import styled from 'styled-components';
import { useState } from 'react';
import Image from "next/image";
import { keyframes } from 'styled-components';
import {useRouter} from 'next/router';


const Container = styled.div`
position: fixed;
z-index: 10;
`;
const PageName = styled.h6`
    color: white;
    position: absolute;
    left: 4.5rem;
    top: 1.5rem;
    text-transform: capitalize;
`
const Button = styled.button`
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(200%);
    background-color: rgba(17, 25, 40, 0.6);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.150);

    color: white;
    border: none;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    margin: 1rem 0 0 1rem;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-content: center;

    position: relative;

    &::before,
    &::after{
        content:"";
        background-color: white;
        height: 2px; 
        width: 1rem;
        position: absolute;
        transition: all 0.3s ease;
    };

    &::before {
        top: ${props => props.clicked ? "1.1rem" : "1rem"};
        transform: ${props => props.clicked ? "rotate(135deg)" : "rotate(0)"}
    };

    &::after {
        top: ${props => props.clicked ? "1.1rem" : "1.5rem"};
        transform: ${props => props.clicked ? "rotate(-135deg)" : "rotate(0)"}
    }
`;
const MenuContainer = styled.div`
    width: 4rem; 
    height:40vh;

    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(200%);
    background-color: rgba(17, 25, 40, 0.4);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.050);

    border-radius: 0 5rem 5rem 0;
    padding: 1rem 0;
    position: relative;

    transform: translate(0,50%);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    z-index:90;
`;
const SlideBar = styled.ul`
    color: white;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    border-radius: 0 1.5rem 1.5rem 0;

    position: absolute;
    top: 0;
    left: 0;
    transform: translate(0,50%);

    width:${props => props.clicked ? "14rem" : "3.5rem"};
`;
const MenuItem = styled.li`
    width: 100%;
    height: 3rem;
    padding: 0 .5rem;
    cursor: pointer;

    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;

    position: relative;
    z-index:2;
`;
const Icon = styled.div`
    color: rgba(255,255,255,0.5);
    display: flex;
    justify-content: end;
    align-items: center;
    margin-left:2rem;
    transition: all .2s ease;
    &:hover{
        transform: scale(1.1);
        color: rgba(255,255,255,0.8);
    };
`;
const Title = styled.span`
    width:11rem;
    margin-left: ${props => props.clicked ? "3.5rem" : "-22rem"};
    opacity: ${props => props.clicked ? "1" : "0"};

    backdrop-filter: blur(2px) saturate(140%);
    -webkit-backdrop-filter: blur(2px) saturate(150%);
    background-color: rgba(17, 25, 40, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.050);

    padding: .5rem;
    border-radius: 1rem;
    flex-direction: column;
    position: absolute;
    transform: translate(10%,-45%);
    transition: all .5s ease;
    &:hover{
        font-size: 1.1rem;
        border-right: 8px solid gray;
    };
`;
const ProfileImg = styled.div`
    position: absolute;
    z-index: 2;
    width: 2.5rem;
    height: 2.5rem;
    top: 2rem;
    left: 0
    display: flex;
    flex-direction: column;
    align-items: center;
`
const StyledImage = styled(Image)`
    border-radius: 50%;
`
const ProfileSlider = styled.div`
   width: ${props => props.clicked ? "18rem" : "0"};
   height: 2.5rem;
   border-radius: 1.5rem;
   padding: 2rem 0;
   display: flex;
   align-items: center;
   justify-content: center;
   color: white; 
   margin-left: ${props => props.clicked ? "12rem" : "-20rem"};

   backdrop-filter: blur(8px) saturate(180%);
   -webkit-backdrop-filter: blur(8px) saturate(200%);
   background-color: rgba(17, 25, 40, 0.3);
   border: 1px solid rgba(255, 255, 255, 0.025);

   z-index:-1;
   position: absolute;
   transition: all .5s ease;
`
const slideIn = keyframes`
    0% {
        margin-left:-20rem;
        opacity: 0;
    },
    80% {
        opacity: 0;
    },
    100% {
        margin-left: 22rem;
        opacity: 1;
    }
`
const UserBox = styled.div`
    display: ${props => props.clicked ? "flex" : "none"};
    margin-left: 2rem;
    animation: ${slideIn} .35s linear;
`;
const Username = styled.div`
    flex:1;
    padding: 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;

    width: 10rem;
    transition: all .2s ease;
    h4 {
        display: inline-block;
    };

    a {
        font-size: .8rem;
        font-weight: bold;
        color: rgba(0, 0, 0,.6);
    }
`;
const Logout = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: all .2s ease;
    cursor: pointer;
    font-size: 1.3rem;
    &:hover {
        font-size: 1.5rem;
        color: red;
    }
`;

const Menu = () => {
    const [click, setClick] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const router = useRouter();

    const handleClick = () => {
        setClick(!click);
        profileOpen ? setProfileOpen(!profileOpen) : null
    };
    const handleProfileOpen = () => setProfileOpen(!profileOpen);;
    return (
        <Container>
            <Button className='bg-blue-500' clicked={click} onClick={() => handleClick()}></Button>
            <PageName>
                {
                    router.pathname === ('/dashboard') ? 'Home' : router.pathname.replace('/dashboard/','')            
                }
            </PageName>
            <MenuContainer>
                <ProfileImg>
                    <StyledImage width={100} height={100} onClick={() => handleProfileOpen()} src={profilePic} alt="Profile Picture"/>
                </ProfileImg>

                <SlideBar clicked={click}>
                    <MenuItem>
                        <Link href="/dashboard/">
                            <a>
                                <Icon>
                                    <FaHome activeClassName='active' className="text-2xl absolute z-10"/>
                                </Icon>
                                <Title clicked={click}>Home</Title>
                            </a>
                        </Link>
                    </MenuItem>

                    <MenuItem>
                        <Link href="/dashboard/profile">
                            <a>
                                <Icon>
                                    <FaCar className="text-2xl absolute z-10 active:bg-violet-700"/>
                                </Icon>
                                <Title clicked={click}>My Cars</Title>
                            </a>
                        </Link>
                    </MenuItem>

                    <MenuItem>
                        <Link href="/dashboard/appointment">
                            <a>
                                <Icon>
                                    <FaCalendarAlt className="text-2xl absolute z-10"/>
                                </Icon>
                                <Title clicked={click}>My Appointments</Title>
                            </a>
                        </Link>
                    </MenuItem>

                    <MenuItem>
                        <Link href="/dashboard/">
                            <a>
                                <Icon>
                                    <FaChartArea className="text-2xl absolute z-10"/>
                                </Icon>
                                <Title clicked={click}>Tools</Title>
                            </a>
                        </Link>
                    </MenuItem>
                </SlideBar>

                <ProfileSlider clicked={profileOpen}>
                    <UserBox clicked={profileOpen}>
                        <Username clicked={profileOpen}>
                            <h4>ABCDEFGHIJK</h4>
                            <Link href="/">
                                <a>
                                View Profile
                                </a>
                            </Link>
                        </Username>
                        <Logout>
                            <FaSignOutAlt/>
                        </Logout>
                    </UserBox>
                </ProfileSlider>

        </MenuContainer>
        </Container>
    )
}

export default Menu