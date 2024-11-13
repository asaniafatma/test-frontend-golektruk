import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const Soal5 = () => {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const handleBackButton = () => {
      if (openModal) {
        setOpenModal(false);
      }
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [openModal]);

  const toggleModal = () => {
    setOpenModal((prev) => {
      const newState = !prev;
      if (newState) {
        window.history.pushState(null, "", window.location.pathname);
      } else {
        window.history.back();
      }
      return newState;
    });
  };

  return (
    <>
      <div style={{ margin: "1rem" }}>
        {openModal && <Modal />}
        <button
          style={{ padding: "2px 4px", background: "white" }}
          onClick={toggleModal}
        >
          {openModal ? "close" : "open"} modal
        </button>
      </div>

      <iframe
        src="/soal5.mp4"
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          border: "1px solid white",
        }}
      ></iframe>
    </>
  );
};

const Modal = () => {
  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) return null;
  return ReactDOM.createPortal(
    <section
      style={{
        background: "#8f9cb0",
        padding: "3rem",
        position: "fixed",
        margin: "6rem",
      }}
    >
      <div>This is modal</div>
    </section>,
    modalRoot
  );
};

export default Soal5;
