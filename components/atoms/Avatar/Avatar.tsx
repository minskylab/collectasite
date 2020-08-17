import React, { FC } from "react";

import { styled } from "linaria/react";
import { css } from "linaria";

interface AvatarProps {
    image?: string;
    size?: string | number;
}

const WrapperLogin = styled.div<AvatarProps>`
    background-image: ${(props) => (props.image ? `url(${props.image})` : "")};
    height: ${(props) => (props.size ? props.size : "3rem")};
    width: ${(props) => (props.size ? props.size : "3rem")};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-color: #bebebe;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
`;

const Avatar: FC<AvatarProps> = (props) => {
    return <WrapperLogin image={props.image} size={props.size} />;
};

export default Avatar;
