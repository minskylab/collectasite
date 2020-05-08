import React, { FC, useState } from "react";
import { styled } from "linaria/react";

interface WrapperProps {
  hover?: boolean;
  isShadow?: boolean;
  disable?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
	background-color: #ffffff;
	margin: 0.2rem;
  //@ts-ignore
  box-shadow: ${props => (props.disable ? "none" : props.isShadow || props.hover ? "2px 5px 22.6515px rgba(91, 91, 91, 0.15)" : "none")};
	border-radius: 5px;
	transition: 0.3s;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  @media (max-width: 600px) {
      margin: 0;
  }
`;

interface LayoutProps {
  children?: any;
  isShadow?: boolean;
  disable?: boolean;
  onClick?: () => void;
}

const Layout: FC<LayoutProps> = (props: LayoutProps) => {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <Wrapper disable={props.disable} onClick={props.onClick} isShadow={props.isShadow} hover={hover} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {props.children}
    </Wrapper>
  );
};

export default Layout;
