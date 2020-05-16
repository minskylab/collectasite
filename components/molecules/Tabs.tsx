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
  color: ${props => props.active ? props.activeColor || "" : props.disableColor || ""};
  cursor: pointer;
`;

const Name = styled.div <ActiveProps>`
  display: block; 
  font-family: "Montserrat";
  font-style: normal;
  font-weight: ${props => props.active ? "500" : "500"};
  font-size: 1rem;
  line-height: 1.2rem;
  //@ts-ignore
  color: ${props => props.active ? props.activeColor : props.disableColor};
  /* transition: 1.3s; */
`;

const WrapperName = styled.div`
  display: block; 
  margin-left: 0.3rem;
  position: relative;
  @media (max-width: 600px) {
    display: none;
  }
`;

const Line = styled.div <ActiveProps>`
  display: block; 
  width: 100%;
  height: 100%;
  border-radius: 2px;
  //@ts-ignore
  background-color: ${props => props.active ? `${props.activeColor}aa` : `${props.disableColor}dd`};
  transition: 0.3s;
  opacity:  ${props => props.active ? 1 : 0}
`;

const WrapperLine = styled.div`
   width: 100%;
   height: 2px;
`;

const InLine = styled.div`
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
          <WrapperName>
            <Name key={"01"} style={{ opacity: 0, position: "relative" }} active={true} activeColor={defaults.activeColor} disableColor={defaults.disableColor}>{options[0]}</Name>
            <Name key={"10"} style={{ position: "absolute", top: 0 }} active={props.selected === options[0]} activeColor={defaults.activeColor} disableColor={defaults.disableColor}>{options[0]}</Name>
          </WrapperName>
        </InLine>
        <WrapperLine>
          <Line active={props.selected === options[0]} activeColor={defaults.activeColor} disableColor={defaults.disableColor} />
        </WrapperLine>
      </TabItem>
      <TabItem key={options[1]} style={{ paddingRight: "1.5rem" }} onClick={() => handleClick(options[1])} active={props.selected === options[1]}>
        <InLine>
          <Icon
            name='in-progress-surveys'
            color={props.selected === options[1] ? defaults.activeColor : defaults.disableColor}
          />
          <WrapperName>
            <Name key={10} style={{ opacity: 0, position: "relative" }} active={true} activeColor={defaults.activeColor} disableColor={defaults.disableColor}>{options[1]}</Name>
            <Name key={11} style={{ position: "absolute", top: 0 }} active={props.selected === options[1]} activeColor={defaults.activeColor} disableColor={defaults.disableColor}>{options[1]}</Name>
          </WrapperName>
        </InLine>
        <WrapperLine>
          <Line active={props.selected === options[1]} activeColor={defaults.activeColor} disableColor={defaults.disableColor} />
        </WrapperLine>
      </TabItem>
      <TabItem key={options[2]} onClick={() => handleClick(options[2])} active={props.selected === options[2]}>
        <InLine>
          <Icon
            name='completed-surveys'
            color={props.selected === options[2] ? defaults.activeColor : defaults.disableColor}
          />
          <WrapperName>
            <Name key={20} style={{ opacity: 0, position: "relative" }} active={true} activeColor={defaults.activeColor} disableColor={defaults.disableColor}>{options[2]}</Name>
            <Name key={21} style={{ position: "absolute", top: 0 }} active={props.selected === options[2]} activeColor={defaults.activeColor} disableColor={defaults.disableColor}>{options[2]}</Name>
          </WrapperName>
        </InLine>
        <WrapperLine>
          <Line active={props.selected === options[2]} activeColor={defaults.activeColor} disableColor={defaults.disableColor} />
        </WrapperLine>
      </TabItem>
    </Wrapper >
  );
};

export default Tabs;
