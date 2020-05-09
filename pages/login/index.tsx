import React, { FC, useState } from "react";
import Head from "next/head";
import { styled } from "linaria/react";
import { css } from "linaria";
import { motion } from "framer-motion";
import { useTheme } from "../../general/theming";
import {
  BaseInput,
  CollectaLogo,
  GoogleButton,
  BaseButton,
  Icon
} from "components";

interface LoginProps {
  color?: string;
  size?: number;
}

const WrapperLogin = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
`;

const logo = css`position: absolute;`;

const width = css`
	position: relative;
	width: 25vw;
	min-width: 12rem;
	max-width: 13.5rem;
`;

const WrapperBottom = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
`;

const text = css`
	font-family: var(--font-family);
	color: var(--color-text);
	font-size: 0.9rem;
	text-align: center;
`;

const PaddingTop = styled.div`
	position: relative;
	height: 48%;
`;

const codeText = css`
	position: relative;
	/* width: 25vw; */
	min-width: 12rem;
	max-width: 12rem;
`;

const loginButton = css`
	position: relative;
	/* width: 25vw; */
	/* min-width: 12rem; */
	max-width: 12rem;
`;

const WrapperCode = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	min-width: 280px;
`;

const Login: FC<LoginProps> = props => {
  const theme = useTheme();
  const [code, setCode] = useState<string>("");

  return (
    <>
      <Head>
        <title>Login | Collecta Surveys</title>
      </Head>
      <WrapperLogin>
        <motion.div
          className={logo}
          initial={{ transform: "translateY(0) scale(1)", opacity: 1 }}
          animate={{ transform: "translateY(-9rem) scale(0.7)", opacity: 1 }}
          transition={{ delay: 1.1, stiffness: 8, duration: 0.3 }}
        >
          <CollectaLogo scale={0.6} />
        </motion.div>
        <WrapperBottom>
          <PaddingTop />
          <motion.div
            className={width}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, stiffness: 8, duration: 0.4 }}
          >
            <GoogleButton onClick={() => window.location.href = "https://core.collecta.site/auth/google"} />
          </motion.div>
          <motion.div
            className={text}
            style={{
              //@ts-ignore
              "--font-family": theme.fontFamilyText,
              "--color-text": theme.textColor,
              paddingTop: "1.3rem",
              paddingBottom: "1.3rem"
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, stiffness: 8, duration: 0.5 }}
          >
            o
          </motion.div>
          <motion.div
            className={text}
            style={{
              //@ts-ignore
              "--font-family": theme.fontFamilyText,
              "--color-text": theme.textColor,
              paddingBottom: "0.5rem"
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, stiffness: 8, duration: 0.6 }}
          >
            Ingresa como anónimo
          </motion.div>
          <WrapperCode>
            <motion.div
              className={codeText}
              style={{
                //@ts-ignore
                "--font-family": theme.fontFamilyText,
                "--color-text": theme.textColor,
                paddingBottom: "1.5rem"
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, stiffness: 8, duration: 0.7 }}
            >

              <BaseInput
                textAlign={"center"}
                placeholder={"Escribe tu código aquí"}
                type={"text"}
                value={code}
                //@ts-ignore
                onChange={e => setCode(e.target.value)}
              />
            </motion.div>
            <motion.div
              className={loginButton}
              style={{ paddingBottom: "1.5rem" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, stiffness: 8, duration: 0.8 }}
            >
              <BaseButton
                text='Ingresar'
                iconElement={
                  <Icon
                    name='arrow-right'
                    color='#ffffff95'
                    size={20}
                  />
                }
              />
            </motion.div>
          </WrapperCode>
        </WrapperBottom>
      </WrapperLogin>
    </>
  );
};

export default Login;
