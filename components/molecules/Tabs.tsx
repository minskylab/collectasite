import React, { FC, useEffect } from "react";
import { styled } from "linaria/react";
import { useTheme } from "../../general/theming";
import { Icon } from 'components';

const Wrapper = styled.div`
  display: flex; 
  align-items: center;
`;

interface ActiveProps {
  active?: boolean;
  activeColor?: string;
  disableColor?: string;
}

const TabItem = styled.div <ActiveProps>`
  display: block;
  //@ts-ignore
  color: ${props => props.active ? props.activeColor : props.disableColor};
  cursor: pointer;
`;

const Name = styled.div <ActiveProps>`
  display: block; 
  font-family: "Montserrat";
  font-style: normal;
  font-weight: ${props => props.active ? "600" : "normal"};
  font-size: 1rem;
  line-height: 1.2rem;
  //@ts-ignore
  color: ${props => props.active ? props.activeColor : props.disableColor};
  padding-left: 0.3rem;
  @media (max-width: 600px) {
    display: none;
  }
`;

const Line = styled.div <ActiveProps>`
  display: block; 
  height: 2px;
  width: 100%;
  border-radius: 2px;
  //@ts-ignore
  background-color: ${props => props.active ? `${props.activeColor}dd` : `${props.disableColor}dd`};
`;

const InLine = styled.dev`
  display: flex; 
  align-items: center;
  padding-bottom: 0.65rem;
`;

interface TabsProps {
  selected?: string;
  onClick?: (select?: string) => void;
  activeColor?: string;
  disableColor?: string;
}

const Tabs: FC<TabsProps> = (props: TabsProps) => {
  const theme = useTheme();
  const handleClick = (select: string) => {
    if (props.onClick) {
      props.onClick(select);
    }
  };

  const defaults = {
    disableColor: props.disableColor || "#023146",
    activeColor: props.activeColor || theme.primaryColor
  }

  const options = ["Nuevos", "En progreso", "Completados"];

  return (
    <Wrapper>
      <TabItem key={options[0]} style={{ paddingRight: "1.5rem" }} onClick={() => handleClick(options[0])} active={props.selected === options[0]}>
        <InLine>
          <Icon
            name='new-surveys'
            color={props.selected === options[0] ? defaults.activeColor : defaults.disableColor}
          />
          <Name active={props.selected === options[0]} activeColor={defaults.activeColor} disableColor={defaults.disableColor}>{options[0]}</Name>
        </InLine>
        {props.selected === options[0] && <Line active={props.selected === options[0]} activeColor={defaults.activeColor} disableColor={defaults.disableColor} />}
      </TabItem>
      <TabItem key={options[1]} style={{ paddingRight: "1.5rem" }} onClick={() => handleClick(options[1])} active={props.selected === options[1]}>
        <InLine>
          <Icon
            name='in-progress-surveys'
            color={props.selected === options[1] ? defaults.activeColor : defaults.disableColor}
          />
          <Name active={props.selected === options[1]} activeColor={defaults.activeColor} disableColor={defaults.disableColor}>{options[1]}</Name>
        </InLine>
        {props.selected === options[1] && <Line active={props.selected === options[1]} activeColor={defaults.activeColor} disableColor={defaults.disableColor} />}
      </TabItem>
      <TabItem key={options[2]} onClick={() => handleClick(options[2])} active={props.selected === options[2]}>
        <InLine>
          <Icon
            name='completed-surveys'
            color={props.selected === options[2] ? defaults.activeColor : defaults.disableColor}
          />
          <Name active={props.selected === options[2]} activeColor={defaults.activeColor} disableColor={defaults.disableColor}>{options[2]}</Name>
        </InLine>
        {props.selected === options[2] && <Line active={props.selected === options[2]} activeColor={defaults.activeColor} disableColor={defaults.disableColor} />}
      </TabItem>
    </Wrapper>
  );
};

export default Tabs;
