import React, { FC, useEffect } from "react";
import { styled } from "linaria/react";
import { useTheme } from "../../general/theming";
import { BaseInput } from "components/atoms";
import CardModeIcon from "components/atoms/Icon/CardModeIcon";
import ListModeIcon from "components/atoms/Icon/ListModeIcon";
import GenericInput from "./Survey/Inputs";
import InputGeneral from "./InputGeneral";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;

const WrapperIcons = styled.div`
    display: flex;
    align-items: center;
    transform: translateY(9px);
    margin-left: 1rem;
`;

const WrapperIcon = styled.div`
    cursor: pointer;
`;

interface TabsProps {
    selected?: string;
    onClick?: (select?: string) => void;
    activeColor?: string;
    disableColor?: string;
}

const Search: FC<TabsProps> = (props: TabsProps) => {
    const theme = useTheme();
    const handleClick = (select: string) => {
        if (props.onClick) {
            props.onClick(select);
        }
    };

    const defaults = {
        disableColor: props.disableColor || "#023146",
        activeColor: props.activeColor || theme.primaryColor,
    };

    return (
        <Wrapper>
            <div style={{ width: "50%" }}>
                <InputGeneral labelText={"Filtrar y buscar"} placeholderText={"Realiza una busqueda aquí"} />
            </div>
            <WrapperIcons>
                <WrapperIcon onClick={() => handleClick("CardMode")}>
                    <CardModeIcon
                        color={props.selected === "CardMode" ? defaults.activeColor : defaults.disableColor}
                    />
                </WrapperIcon>
                <div
                    style={{
                        height: "20px",
                        width: "2px",
                        backgroundColor: "#89A9B7",
                        marginLeft: "0.6rem",
                        marginRight: "0.6rem",
                    }}
                ></div>
                <WrapperIcon onClick={() => handleClick("ListMode")}>
                    <ListModeIcon
                        color={props.selected === "ListMode" ? defaults.activeColor : defaults.disableColor}
                    />
                </WrapperIcon>
            </WrapperIcons>
        </Wrapper>
    );
};

export default Search;
