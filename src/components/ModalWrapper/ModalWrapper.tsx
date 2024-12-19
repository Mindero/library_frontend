import { useDispatch, useSelector } from "react-redux"
import { settingsError, settingsLoading, settingsShowModal } from "../../reducer/settingsStore/reducer";
import { clearError, disableModal } from "../../reducer/settingsStore";
import { AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";

interface ModelWrapperPros {
  dispatch : AppDispatch
}

export const ModalWrapper : React.FC<ModelWrapperPros> = ({dispatch}) => {
  const showModal = useSelector(settingsShowModal);
  const error = useSelector(settingsError);
  const navigate = useNavigate();
  const onClick = () => {
    dispatch(clearError());
    dispatch(disableModal());
  }
  return (
    (showModal)? (
      <div className="modal">
        <div className="modal-content">
          <p>Error: {error}</p>
          <button onClick={() => onClick()}>Close</button>
        </div>
      </div>
    ) :(
      <></>
    )
  )
}