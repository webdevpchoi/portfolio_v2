import React from "react";
import styled from "@emotion/styled";
import colors from "styles/colors";
import Logo from "components/_ui/Logo";

const FooterContainer = styled("div")`
    padding-bottom: 3em;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const FooterAuthor = styled("div")`
    font-size: 0.75em;
    color: ${colors.grey700};
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    margin-top: -10px;

     &:hover {
         color: ${colors.blue900};

        .FooterSpooch {
            animation-name: rotate;
            animation-duration: 1.5s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
        }
    }

    @keyframes rotate {
        from {transform: rotate(0deg);}
        to {transform: rotate(360deg);}
    }
`

const Footer = () => (
    <FooterContainer>
        <Logo />
        <FooterAuthor>
            © {new Date().getFullYear()}
        </FooterAuthor>
    </FooterContainer>
)

export default Footer;
