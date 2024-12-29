import { useEffect, useState } from "react";
import { addInstanceToReader, getAllFreeInstances, Instance } from "./Instance";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userAuthSelector, userJwtSelector } from "../../reducer/userStore/reducer";
import Modal from "react-modal";
import '../ui/BookInstance.css'

export const BookInstance = ({ id_book }: { id_book: number }): JSX.Element => {
  const [instances, setInstances] = useState<Instance[]>([]);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstance, setSelectedInstance] = useState<Instance | null>(null);
  const [pickupDate, setPickupDate] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");
  const isAuth = useSelector(userAuthSelector);
  const jwt = useSelector(userJwtSelector);

  const [doFetch, setDoFetch] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setDoFetch(true);
  }, []);

  useEffect(() => {
    if (doFetch) {
      getAllFreeInstances(id_book, dispatch).then((data) => {
        if (data !== undefined) setInstances(data);
        setDoFetch(false);
      });
    }
  }, [doFetch]);

  const openModal = (instance: Instance) => {
    if (!isAuth) navigate("/login");
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
    if (selectedInstance === null || pickupDate === "" || returnDate === "") closeModal();
    else {
      addInstanceToReader(
        selectedInstance.id_instance,
        new Date(pickupDate),
        new Date(returnDate),
        String(jwt),
        dispatch
      ).then(() => closeModal());
    }
  };

  return (
    <div className="bookInstance_container">
      {instances === undefined || instances?.length === 0 ? (
        <p className="bookInstance_noInstances">Доступных экземпляров нет</p>
      ) : (
        <>
          <h2 className="bookInstance_instancesHeader">Доступные экземпляры:</h2>
          {instances?.map((instance) => (
            <div key={instance.id_instance} className="bookInstance_instanceCard">
              <p>Издатель: {instance.publisher_name}</p>
              <p>Дата привоза: {instance.supply_date.toLocaleString()}</p>
              <button
                className="bookInstance_orderButton"
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
        className="bookInstance_modalContent"
      >
        <h2 className="bookInstance_modalHeader">Выберите даты</h2>
        <div className="bookInstance_dateInputContainer">
          <label className="bookInstance_dateLabel">Дата получения:</label>
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="bookInstance_dateInput"
          />
        </div>
        <div className="bookInstance_dateInputContainer">
          <label className="bookInstance_dateLabel">Дата возврата:</label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="bookInstance_dateInput"
          />
        </div>
        <div className="bookInstance_modalButtons">
          <button
            className="bookInstance_confirmButton"
            onClick={handleOrder}
          >
            Подтвердить
          </button>
          <button
            className="bookInstance_cancelButton"
            onClick={closeModal}
          >
            Отмена
          </button>
        </div>
      </Modal>
    </div>
  );
};
