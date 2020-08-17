import React, { FC } from "react";
import { styled } from "linaria/react";

import Option from "./Option";

const OptionWrapper = styled.div`
    padding-bottom: 0.9rem;
`;

interface OptionsInputProps {
    options: Map<string, string>;
    defaults?: string[];
    answers?: string[];
    multiple?: boolean;
    onChangeAnswers?: (answers: string[]) => void;
}

const OptionsInput: FC<OptionsInputProps> = (props) => {
    const options: string[] = [];
    props.options.forEach((_, optKey, __) => {
        options.push(optKey);
    });

    return (
        <div>
            {options.map((opt) => {
                return (
                    <OptionWrapper key={opt}>
                        <Option
                            key={opt}
                            text={props.options.get(opt) || opt}
                            selected={props.answers?.includes(opt)}
                            onClick={() => {
                                if (props.onChangeAnswers) {
                                    if (props.multiple) {
                                        if (props.answers?.includes(opt)) {
                                            const newAnswers = (props.answers || []).filter((i) => i !== opt);
                                            props.onChangeAnswers(newAnswers);
                                            return;
                                        }
                                        props.onChangeAnswers([...(props.answers || []), opt]);
                                    } else {
                                        props.onChangeAnswers([opt]);
                                        return;
                                    }
                                }
                            }}
                        ></Option>
                    </OptionWrapper>
                );
            })}
        </div>
    );
};

export default OptionsInput;
