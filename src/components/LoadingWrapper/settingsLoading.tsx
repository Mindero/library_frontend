import { useSelector } from "react-redux"
import { settingsLoading, settingsShowModal } from "../../reducer/settingsStore/reducer";
import { AppDispatch } from "../../store";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";

interface LoadingWrapperPros {
  children: React.ReactNode,
  dispatch : AppDispatch
}

export const LoadingWrapper : React.FC<LoadingWrapperPros> = ({children, dispatch}) => {
  const loading = useSelector(settingsLoading);
  const showModal = useSelector(settingsShowModal);
  return (
    <div>
      {loading ? (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#007bff'
        }}>
          Загрузка...
        </div>
      ) : showModal ? (
        <ModalWrapper dispatch={dispatch} />
      ) : (
        children
      )}
    </div>
  )
}