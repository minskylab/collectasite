import React, { FC, ReactPropTypes } from "react";
import { styled } from "linaria/react";
import { css } from "linaria";
import { useTheme } from "../../../general/theming";
import { motion } from "framer-motion";
import { ChoiceButton } from "../../atoms/Button";
import { OptionValue } from "../../atoms/Button/ChoiceButton";

const WrapperChoiceButton = styled.div`
    padding-bottom: 0.9rem;
`;

interface DefaultChoicesProps {
    options: OptionValue[];
    onChange: (options: OptionValue[]) => void;
    multiple?: boolean;
}

const Choices: FC<DefaultChoicesProps> = (props: DefaultChoicesProps) => {
    return (
        <motion.div>
            {props.options.map((option) => (
                <WrapperChoiceButton key={option.key}>
                    <ChoiceButton
                        option={option}
                        onClick={() => {
                            const _options = [...props.options];
                            if (props.multiple) {
                                _options.forEach((_option) => {
                                    if (option.key === _option.key) _option.checked = !option.checked;
                                });
                            } else {
                                _options.forEach((_option) => {
                                    if (option.key === _option.key) {
                                        if (_option.checked) {
                                            _option.checked = false;
                                        } else {
                                            _option.checked = true;
                                        }
                                    } else {
                                        _option.checked = false;
                                    }
                                });
                            }
                            props.onChange(_options);
                        }}
                    />
                </WrapperChoiceButton>
            ))}
        </motion.div>
    );
};

export default Choices;
