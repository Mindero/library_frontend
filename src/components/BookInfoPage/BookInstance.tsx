import { useEffect, useRef, useState } from "react"
import { addInstanceToReader, getAllFreeInstances, Instance } from "./Instance";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userAuthSelector, userJwtSelector } from "../../reducer/userStore/reducer";
import Modal from "react-modal";

export const BookInstance =  ({ id_book }: { id_book: number }) : JSX.Element => {
  const [instances, setInstances] = useState<Instance[]>([]);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна
  const [selectedInstance, setSelectedInstance] = useState<Instance | null>(null); // Выбранный экземпляр
  const [pickupDate, setPickupDate] = useState<string>(""); // Дата получения
  const [returnDate, setReturnDate] = useState<string>(""); // Дата возврата
  const isAuth = useSelector(userAuthSelector);
  const jwt = useSelector(userJwtSelector);

  const [doFetch, setDoFetch] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
      setDoFetch(true);
  }, []);

  useEffect(() => {
    // console.log(doFetch);
    if (doFetch){
      getAllFreeInstances(id_book, dispatch).then(data => {
        if (data !== undefined)
          setInstances(data);
        setDoFetch(false);
      });
    }
  }, [doFetch]);


  const openModal = (instance: Instance) => {
    console.log(`isAuth = ${isAuth}`)
    if (!isAuth) navigate("/login")
    setSelectedInstance(instance);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInstance(null);
    setPickupDate("");
    setReturnDate("");
  };

  const handleOrder = () => {
    console.log("Instance ordered:", selectedInstance);
    console.log("Pickup Date:", pickupDate);
    console.log("Return Date:", r eturnDate);
    if (selectedInstance === null || pickupDate === "" || returnDate === "") closeModal();
    else{
      addInstanceToReader(selectedInstance.id_instance, new Date(pickupDate), new Date(returnDate), String(jwt), dispatch)
        .then(() => closeModal())
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {(instances === undefined || instances?.length === 0) ? (
        <p style={{ color: "#555", fontSize: "18px", textAlign: "center" }}>
          Доступных экземпляров нет
        </p>
      ) : (
        <>
          <h2 style={{ fontSize: "24px", marginBottom: "20px", textAlign: "center" }}>
            Доступные экземпляры:
          </h2>
          {instances?.map((instance) => (
            <div
              key={instance.id_instance}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "10px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <p>Издатель: {instance.publisher_name}</p>
              <p>Дата привоза: {instance.supply_date.toLocaleString()}</p>
              <button
                style={{
                  padding: "10px 15px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => openModal(instance)}
              >
                Заказать
              </button>
            </div>
          ))}
        </>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Выбор даты"
        style={{
          content: {
            maxWidth: "400px",
            margin: "auto",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            fontFamily: "Arial, sans-serif",
          },
        }}
      >
        <h2 style={{ fontSize: "20px", marginBottom: "20px", textAlign: "center" }}>
          Выберите даты
        </h2>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Дата получения:
          </label>
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Дата возврата:
          </label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={handleOrder}
            style={{
              padding: "10px 15px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Подтвердить
          </button>
          <button
            onClick={closeModal}
            style={{
              padding: "10px 15px",
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Отмена
          </button>
        </div>
      </Modal>
    </div>
  )
}