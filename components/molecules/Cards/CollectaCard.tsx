import React, { FC, useEffect } from "react";
import { styled } from "linaria/react";
import Layout from "./Layout";
import { useTheme } from "../../../general/theming";
import { css } from "linaria";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";
import {
  BaseButton,
  Icon
} from 'components';

const Container = styled.div`
    padding-top: 1.5em;
    padding-bottom: 1.2em;
    padding-left: 1.2em;
    padding-right: 1.2em;
    text-align: left;
    border: 1px solid #F0F0F7;
    border-radius: 5px;
    box-sizing: border-box;
    @media (min-width: 601px) {
      min-height: 14.85rem;
  }
`;

const textdueDate = css`
    color: var(--text-color);
    font-family: "Montserrat";
    font-style: normal;
    font-weight: normal;
    font-size: 0.55em;
    line-height: 0.94em;
    font-size: 0.85em;
    padding-bottom: 1.2em;
`;

const textSurveyName = css`
    color: var(--text-color);
    font-family: Lora;
    font-style: normal;
    font-weight: normal;
    font-size: 1.35em;
    line-height: 1.5em;
    padding-bottom: 1.1em;
    @media (max-width: 600px) {
        font-weight: 500;
    }
`;

const textTags = css`
    color: var(--text-color);
    font-family: var(--font-family);
    background-color: var(--background-color);
    font-size: 0.7em;
    font-weight: 300;
    padding: 0.55em 0.8em;
    margin-bottom: 0.5em;
    line-height: 100%;
    text-transform: uppercase;
    border-radius: 25px;
    width: fit-content;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: normal;
    font-size: 0.75em;
    line-height: 0.94em;
    margin-right: 0.5em;
`;


const TagsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    flex-wrap: wrap;
`;

const ButtonWrapper = styled.div`
    padding-top: 1em;
    @media (max-width: 600px) {
      padding-top: 0;
    }
`;

const WrapperBottom = styled.div`
    display: block;
    @media (max-width: 600px) {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
`;

interface CardProps {
  id: string | number;
  onSelected: (id?: string | number) => void;
  dueDate?: string;
  title?: string;
  tags?: string[];
  isShadow?: boolean;
  disable?: boolean;
}

dayjs.extend(relativeTime);
dayjs.locale("es");

const CollectaCard: FC<CardProps> = (props: CardProps) => {
  const theme = useTheme();
  const expiredIn = dayjs().to(dayjs(props.dueDate));
  const handleClick = (id: string | number) => {
    props.onSelected(id);
  };
  const isMobile: boolean = window.innerWidth < 600;

  return (
    <Layout disable={props.disable}>
      <Container style={{ cursor: !props.disable ? "cursor" : "arrow" }} onClick={() => { if (!props.disable) { handleClick(props.id) } }}>
        <div
          className={textdueDate}
          style={{
            //@ts-ignore
            "--text-color": "#023146",
          }}
        >
          Expira {expiredIn}
        </div>
        <div
          className={textSurveyName}
          style={{
            //@ts-ignore
            "--text-color": "#023146",
          }}
        >
          {props.title}
        </div>
        <WrapperBottom>
          <TagsWrapper>
            {props.tags
              ? props.tags.map((tag, i) => (
                <div
                  key={i}
                  className={textTags}
                  style={{
                    //@ts-ignore
                    "--background-color": `${theme.primaryColor}20`,
                    "--text-color": "#023146",
                  }}
                >
                  {tag}
                </div>
              ))
              : null}
          </TagsWrapper>
          {!props.disable &&
            <ButtonWrapper>
              <BaseButton
                iconElement={<Icon name='arrow-right' color={theme.primaryColor} size={20} />}
                text={isMobile ? 'INICIAR' : 'INICIAR'}
                colorText={theme.primaryColor}
                backgroundColor='transparent'
              />
            </ButtonWrapper>
          }

        </WrapperBottom>
      </Container>

    </Layout>
  );
};

export default CollectaCard;
