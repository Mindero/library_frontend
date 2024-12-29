import React from "react";
import { useSelector } from "react-redux";
import { settingsError } from "../../reducer/settingsStore/reducer";
import { clearError, disableModal } from "../../reducer/settingsStore";
import { AppDispatch } from "../../store";
import "../ui/ModalWrapper.css";

interface ModalWrapperProps {
  dispatch: AppDispatch;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({ dispatch }) => {
  const error = useSelector(settingsError);

  const onClick = () => {
    dispatch(clearError());
    dispatch(disableModal());
  };

  return (
    <div className="modalWrapper_overlay">
      <div className="modalWrapper_content">
        <p className="modalWrapper_error">Ошибка: {error}</p>
        <button className="modalWrapper_button" onClick={() => onClick()}>
          Close
        </button>
      </div>
    </div>
  );
};
