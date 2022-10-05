import React, { useRef } from "react";
import { IconButtonProps, ElementProps } from "./iconbutton.type";

const IconButton: React.FC<IconButtonProps> = ({
  tagName = "button",
  iconstyle,
  iconSize,
  icon,
  className,
  ...props
}) => {
  const htmlEl = useRef<HTMLElement>(null);

  const elementProps: ElementProps<typeof tagName> = {
    ...props,
    ref: htmlEl,
  };

  return React.createElement(
    tagName,
    {
      className: `material-symbols-${iconstyle} size-${iconSize} filled ${className}`,
      ...elementProps,
    },
    icon ? icon : elementProps.children
  );
};

export default IconButton;
