import React from "react";

type CCTextProp = {
  children: string | string[] | JSX.Element;
  className?: string;
};
function CCText({ children, ...rest }: CCTextProp) {
  const { className = "", ...restProps } = rest;
  return (
    <div className={`text-textColor-default  ${className}`} {...restProps}>
      {children}
    </div>
  );
}

export default CCText;
