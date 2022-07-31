import React from "react";
import { Container, Row, Col } from "react-bootstrap"
import styled, { createGlobalStyle, css } from "styled-components";
import { GiftFill, Bank2, InboxesFill } from "react-bootstrap-icons";

const StyledComponents = () => {

    const GlobalStyle = createGlobalStyle`
        body {
            background: #000;
            color: #f5f5f5;
        }
    `;

    const IconBox = styled.div`
        padding: 55px 40px  50px;
        border-radius: 6px;
        background: #191919;
        transition: .3s;

        ${(props)=> props.middle ? css`
            transform: scale(1.1);
            background: #111472;
        ` : css``
        }

        &:hover {
            background: #111472;
        }
    `;

    const IconTitle = styled.h3`
        font-size: 20px;
        font-weight: 700;
        text-transform: uppercase;
        margin-top: 40px;
        margin-bottom: 20px;
    `;

    const IconDescrip = styled.p`
        color: #ccc;
        font-size: 16px;
        line-height: 28px;
        margin-bottom: 30px;
    `;

    const IconButton = styled.a`
        color: #55bbff;
        font-weight: 500;
        text-decoration: none;
        transition: .3s;

        &:hover {
            color: #439dd9;
            text-decoration: underline;
        }
    `;

    // This extend components
    // const IconBoxMiddle = styled(IconBox)`
    //     transform: scale(1.1);
    //     background: #111472;
    // `;
    
    return (
        <>
            <GlobalStyle />

            <Container className="mt-5 pt-3">
                <Row>
                    <Col lg={4}>
                        <IconBox>
                            <Bank2 size={60} />
                            <IconTitle>styled components</IconTitle>
                            <IconDescrip>
                                Lorem ipsum dolor amet elit minima quidem ullam aspernatur laudantium mollitia dolor eum placeat commodi atque aliquid consectetur
                            </IconDescrip>
                            <IconButton href="#">View Details</IconButton>
                        </IconBox>
                    </Col>
                    <Col lg={4}>
                        <IconBox middle>
                            <GiftFill size={60} />
                            <IconTitle>styled components</IconTitle>
                            <IconDescrip>
                                Lorem ipsum dolor amet elit minima quidem ullam aspernatur laudantium mollitia dolor eum placeat commodi atque aliquid consectetur
                            </IconDescrip>
                            <IconButton href="#">View Details</IconButton>
                        </IconBox>
                    </Col>
                    <Col lg={4}>
                        <IconBox>
                            <InboxesFill size={60} />
                            <IconTitle>styled components</IconTitle>
                            <IconDescrip>
                                Lorem ipsum dolor amet elit minima quidem ullam aspernatur laudantium mollitia dolor eum placeat commodi atque aliquid consectetur
                            </IconDescrip>
                            <IconButton href="#">View Details</IconButton>
                        </IconBox>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default StyledComponents