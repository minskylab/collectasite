import React, { FC } from "react";

import { styled } from "linaria/react";
import { css } from "linaria";

interface AvatarProps {
    image?: string;
    size?: string | number;
}

const WrapperLogin = styled.div<AvatarProps>`
    background-image: ${(props: AvatarProps) => (props.image ? `url(${props.image})` : "")};
    height: ${(props: AvatarProps) => (props.size ? props.size : "3rem")};
    width: ${(props: AvatarProps) => (props.size ? props.size : "3rem")};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-color: #bebebe;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
`;

const Avatar: FC<AvatarProps> = (props: AvatarProps) => {
    return <WrapperLogin image={props.image} size={props.size} />;
};

export default Avatar;
