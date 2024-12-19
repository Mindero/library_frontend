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
  // console.log(`Loading = ${loading}, showModal = ${showModal}`)
  return (
    <div>
      {(loading)? (
        <div className="loader">Loading...</div> 
      ) :(
        (showModal)? (
          <ModalWrapper dispatch={dispatch}/>
        ) : (
          children
        )
      )}
    </div>
  )
}