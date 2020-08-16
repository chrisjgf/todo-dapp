import React, { useCallback, useState, useRef } from "react";
import ReturnIcon from "../../assets/svg/return.svg";
import * as S from "./styles";

interface Props {
  onSubmit: (text: string) => void;
  placeholder: string;
}

const Input: React.FC<Props> = ({ onSubmit, placeholder }: Props) => {
  const [active, setActive] = useState(false);

  const inputRef = useRef<string | undefined>();

  const handleBlur = useCallback(() => setActive(false), [active]);
  const handleFocus = useCallback(
    (e) => {
      inputRef.current = e.target.value;
      e.target.value.length > 0 && setActive(true);
    },
    [active]
  );

  return (
    <S.Input active={active}>
      <S.TextInput
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
