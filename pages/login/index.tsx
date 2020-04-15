import React, { FC } from "react";
import { styled } from "linaria/react";
import { css } from "linaria";
import { GoogleButton } from "../../components/atoms/Button";

interface IconProps {
	color?: string;
	size?: number;
}

const Login: FC<IconProps> = props => {
	return (
		<div>
			<GoogleButton />
		</div>
	);
};

export default Login;
