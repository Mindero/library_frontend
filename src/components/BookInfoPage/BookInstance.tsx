import { useEffect, useState } from "react"
import { addInstanceToReader, getAllFreeInstances, Instance } from "./Instance";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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


  useEffect(() => {
    getAllFreeInstances(id_book).then(data => {
      // console.log(data);
      setInstances(data);
    });
  }, [id_book]);

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
    console.log("Return Date:", returnDate);
    if (selectedInstance === null || pickupDate === null || returnDate === null) closeModal();
    else{
      addInstanceToReader(selectedInstance.id_instance, new Date(pickupDate), new Date(returnDate), String(jwt))
        .then(() => closeModal())
        .catch((error) => {
          console.log("Error with adding new instance to reader " + error);
        });
    }
  };

  return (
    <div>
      {(instances === undefined || instances?.length === 0 ) ? 
        (<p> Доступных экземпляров нет </p>) :(
         <>
          <h2>Доступные экземпляры: </h2>
           {instances?.map((instance, index) => {
            return (<div key={instance.id_instance} data-index={instance.id_instance}>
              <p> Издатель: {instance.publisher_name} </p>
              <p> Дата привоза: {instance.supply_date.toLocaleString()} </p>
              <button onClick={() => openModal(instance)}> Заказать </button>
            </div>)
           })}
         </>
        )
      }

      {/* Модальное окно */}
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
        },
      }}
    >
      <h2>Выберите даты</h2>
      <div>
        <label>
          Дата получения:
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Дата возврата:
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </label>
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleOrder}>Подтвердить</button>
        <button onClick={closeModal} style={{ marginLeft: "10px" }}>
          Отмена
        </button>
      </div>
    </Modal>
  </div>

  )
}