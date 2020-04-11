import React, { FC, useState } from "react";
import { styled } from "linaria/react";

interface WrapperProps {
  hover?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
	background-color: #ffffff;
	margin: 0.2rem;
  //@ts-ignore
  box-shadow: ${props => (props.hover ? "2px 5px 22.6515px rgba(91, 91, 91, 0.15)" : "none")};
	border-radius: 5px;
	transition: 0.3s;
`;

interface LayoutProps {
  children?: any;
}

const Layout: FC<LayoutProps> = (props: LayoutProps) => {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <Wrapper hover={hover} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {props.children}
    </Wrapper>
  );
};

export default Layout;
