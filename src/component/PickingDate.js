import { Modal } from "antd";
import React, { useState, useEffect } from "react";

export function PickingDate(props) {
  const [isModalVisible, setModalVisible] = useState("");
  const [dateBooking, setDateBooking] = useState({
    startDate: "",
    endDate: "",
  });
  const [isChangingDateVisibled, setChangingDateVisibled] = useState("");
  function getStartDate(date) {
    setDateBooking({ ...dateBooking, ["startDate"]: date });
  }
  function getEndDate(date) {
    setDateBooking({ ...dateBooking, ["endDate"]: date });
  }

  function setChangingDateModalInVisibled() {
    setModalVisible(false);
  }
  function setChangingDateModalVisibled() {
    setChangingDateVisibled(!isChangingDateVisibled);
  }
  useEffect(() => {
    if (props.visible == true) {
      setModalVisible(true);
    }
  }, [props]);
  return (
    <div>
      
    </div>
  );
}
