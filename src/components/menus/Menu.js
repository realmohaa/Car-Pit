/* eslint-disable @next/next/no-img-element */

import { FaHome, FaCar, FaCalendarAlt, FaChartArea, FaSignOutAlt } from 'react-icons/fa';
import profilePic from '../../assets/pp.png'
import Link from "next/link";
import styled from 'styled-components';
import { useState } from 'react';
import Image from "next/image";
import { keyframes } from 'styled-components';

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
const Button = styled.button`
    background-color: black;
    color: white;
    border: none;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    margin: 0.5rem 0 0 0.5rem;
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
const Container = styled.div`
    background-color: black;
    color: white;
    width: 3.5rem; 
    height:80vh;
    margin-top: 2rem;
    border-radius: 0 30px 30px 0;
    padding: 1rem 0;
    position: relative;
    box-shadow: 5px 10px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;
const SlideBar = styled.ul`
    color: white;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0 1.5rem 1.5rem 0;

    position: absolute;
    top: 12rem;
    left: 0;

    width:${props => props.clicked ? "14rem" : "3.5rem"};
`;
const MenuItem = styled.li`
    width: 100%;
    height: 4rem;
    padding: 0 .5rem;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    position: relative;
    z-index:2;
    &:hover{
        border-right: 4px solid white;
    };
`;
const Title = styled.span`
    width:${props => props.clicked ? "100%" : "0"};
    margin-left: ${props => props.clicked ? "3rem" : "0"};
    background-color: black;
    padding: 1rem;
    border-radius: 0 1rem 1rem 0;
    opacity: ${props => props.clicked ? "1" : "0"};
    flex-direction: column;
    justify-content: center;
    align-items: start;
    position: absolute;
    transition: all .5s ease;
    &:hover{
        transform: scale(1.05);
    };
`;
const ProfileImg = styled.div`
    position: absolute;
    z-index: 2;
    width: 2.5rem;
    heioght: 2.5rem;
    bottom: 1.5rem;
    left: 0
    display: flex;
    flex-direction: column;
    align-items: center;
`
const StyledImage = styled(Image)`
    border-radius: 50%;
`
const ProfileSlider = styled.div`
   width: ${props => props.clicked ? "25rem" : "3rem"};
   height: 2.5rem;
   border-radius: 0 20px 20px 0;
   padding: 2rem 0;
   display: flex;
   align-items: center;
   justify-content: center; 

   background-color: black;
   transition: all .5s ease;
`
const UserBox = styled.div`
    display: ${props => props.clicked ? "flex" : "none"};
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
   margin-left: ${props => props.clicked ? "14rem" : "0"};
   transition: all .2s ease;
   h4 {
       display: inline-block;
   };

   a {
       color: rgb(156 163 175);
       &:hover {
           color: rgb(59 130 246);
       }
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

    const handleClick = () => {
        setClick(!click);
        setProfileOpen(!profileOpen)
    };
    const handleProfileOpen = () => setProfileOpen(!profileOpen);;
    return (
        <>
        <Button clicked={click} onClick={() => handleClick()}></Button>

        <Container>
            <FaChartArea className="text-2xl text-blue-300 cursor-pointer opacity-0"/>
            <SlideBar clicked={click}>
                <MenuItem>
                    <FaHome className="text-gray-400 text-2xl absolute z-10"/>
                    <Title clicked={click}>Home</Title>
                </MenuItem>
                <MenuItem>
                    <FaCar className="text-gray-400 text-2xl absolute z-10"/>
                    <Title clicked={click}>My Cars</Title>
                </MenuItem>
                <MenuItem>
                    <FaCalendarAlt className="text-gray-400 text-2xl absolute z-10"/>
                    <Title clicked={click}>My Appointments</Title>
                </MenuItem>
                <MenuItem> 
                    <FaHome className="text-gray-400 text-2xl absolute z-10"/>
                    <Title clicked={click}>About</Title>
                </MenuItem>
            </SlideBar>

            <ProfileImg>
                <StyledImage width={100} height={100} onClick={() => handleProfileOpen()} src={profilePic} alt="Profile Picture"/>
            </ProfileImg>

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

        </Container>
        </>
    )
}

export default Menu