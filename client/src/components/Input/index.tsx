import React, { useState, useRef } from "react";
import ReturnIcon from "../../assets/svg/return.svg";
import * as S from "./styles";

interface Props {
  onSubmit: (text: string) => void;
  placeholder: string;
}

const Input: React.FC<Props> = ({ onSubmit, placeholder }: Props) => {
  const [active, setActive] = useState(false);

  const inputRef = useRef<string | undefined>();

  const handleBlur = () => setActive(false);
  const handleFocus = (e: any) => {
    inputRef.current = e.target.value;
    e.target.value.length > 0 && setActive(true);
  };

  return (
    <S.Input active={active}>
      <label htmlFor="task" className="visuallyhidden">
        Enter task:
      </label>
      <S.TextInput
        id="task"
        aria-label="task-input"
        placeholder={placeholder}
        onChange={handleFocus}
        onFocusCapture={handleFocus}
        onBlurCapture={handleBlur}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onSubmit(inputRef?.current ?? "");
          }
        }}
      />
      <S.IconWrapper>
        <img src={ReturnIcon} alt={"Return"} />
      </S.IconWrapper>
    </S.Input>
  );
};

export default Input;
