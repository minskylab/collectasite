import React, { FC, useState } from "react";
import { styled } from "linaria/react";
import { css } from "linaria";
import { useTheme } from "../../../general/theming";
import { motion } from "framer-motion";

interface SatisfactionButtonProps {
  focus?: boolean;
  fontFamily?: string;
  textColor?: string;
  textFocusColor?: string;
  borderColor?: string;
  borderFocusColor?: string;
  selected?: boolean;
}

const WrapperSatisfaction = styled.div`
	display: flex;
	justify-content: center;
`;


const SatisfactionButton = styled.div <SatisfactionButtonProps>`
    //@ts-ignore
    font-family: ${props => props.fontFamily};
    //@ts-ignore
    color: ${props => (!props.selected ? props.focus ? props.textFocusColor : props.textColor : props.textFocusColor)};
    //@ts-ignore
    border-color: ${props => (!props.selected ? props.focus ? props.borderFocusColor : props.borderColor : props.borderFocusColor)};
    //@ts-ignore
    background-color: ${props => (props.selected ? props.borderFocusColor : "transparent")};
    transition: 0.3s;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
	  border-style: solid;
	  border-width: 2px;
    /* border-radius: 5px; */
    cursor: pointer;
    user-select: none;
`;

export enum ViewMode {
  Desktop = 1,
  Mobile = 0
}

export enum SatisfactionMode {
  Short = 3,
  Large = 5
}

export enum SatisfactionValue {
  VeryDissatisfied = 1,
  SomewhatDissatisfied = 2,
  Neutral = 3,
  SomewhatSatistied = 4,
  VerySatisfied = 5,
  Undefined = -1
}

interface SatisfactionProps {
  value: SatisfactionValue;
  onChange: ((response: SatisfactionValue) => void);
  viewMode?: ViewMode; // 1 or mobile 0
  satisfactionOptionsSize?: SatisfactionMode; // 3 or 5
  alternativeNames?: string[]; // [Nada, Poco, Regular, Mucho, Bastante]
}

const SatisfactionChoice: FC<SatisfactionProps> = (props: SatisfactionProps) => {
  const theme = useTheme();
  const array = Array.from(Array(props.satisfactionOptionsSize || 5), (_, i) => i + 1);
  const [focus, setFocus] = useState<boolean[]>(Array.from(Array(props.satisfactionOptionsSize || 5), (_, i) => false));

  const handleClick = (value: SatisfactionValue, a: SatisfactionValue) => {
    if (value === a) {
      props.onChange(SatisfactionValue.Undefined);
    } else {
      switch (a) {
        case SatisfactionValue.VeryDissatisfied:
          props.onChange(SatisfactionValue.VeryDissatisfied);
          break;
        case SatisfactionValue.SomewhatDissatisfied:
          props.onChange(SatisfactionValue.SomewhatDissatisfied);
          break;
        case SatisfactionValue.Neutral:
          props.onChange(SatisfactionValue.Neutral);
          break;
        case SatisfactionValue.SomewhatSatistied:
          props.onChange(SatisfactionValue.SomewhatSatistied);
          break;
        case SatisfactionValue.VerySatisfied:
          props.onChange(SatisfactionValue.VerySatisfied);
          break;
        default:
          break;
      }
    }
  }

  return (
    <WrapperSatisfaction>
      {array.map((a, key) => (
        <motion.div key={key} style={{ marginLeft: "-2px" }} animate={props.value === a || focus[key] ? { zIndex: 1 } : { zIndex: 0 }}>
          <SatisfactionButton
            selected={props.value === a}
            onClick={() => handleClick(props.value, a)}
            onMouseOver={() => { const _focus = [...focus]; _focus[key] = true; setFocus(_focus) }}
            onMouseLeave={() => { const _focus = [...focus]; _focus[key] = false; setFocus(_focus) }}
            fontFamily={theme.fontFamilyText}
            textColor={theme.secondaryTextColor}
            textFocusColor={theme.satisfactionTextColors[key]}
            borderColor={theme.satisfactionBorderColor}
            borderFocusColor={theme.satisfactionColors[key]}
            focus={focus[key]}
          >
            {a}
          </SatisfactionButton>
        </motion.div>
      ))}
    </WrapperSatisfaction>
  );
};

export default SatisfactionChoice;
