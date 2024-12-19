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
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          width: "400px",
        }}
      >
        <p style={{ marginBottom: "20px", color: "#d9534f", fontWeight: "bold" }}>
          Error: {error}
        </p>
        <button
          onClick={() => onClick()}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007BFF")}
        >
          Close
        </button>
      </div>
    </div>
  )
}