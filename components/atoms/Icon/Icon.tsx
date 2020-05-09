import React, { FC } from "react";
import icons from './icons';

interface Props {
  name: string,
  color?: string,
  size?: number
}

const Icon: FC<Props> = props => {
  const { name, color, size } = props;
  const icon = icons.find(icon => icon.name === name);

  if (icon) {
    /*const propSize = size ? size : 24;
    const propColor = color ? color : '#000000';*/

    return icon.code(color, size);
  } else {
    return <span>Icon not found!</span>;
  }
};

export default Icon;
