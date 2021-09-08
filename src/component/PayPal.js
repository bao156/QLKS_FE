import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

export default function Paypal(props) {
  const [value,setValue]=useState(1);
  const paypal = useRef();

  useEffect(() => {
    setValue((e)=>props.payAmount.tempDeposit/23200);
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Cool looking table",
                amount: {
                  currency_code: "USD",
                  value:value ,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log();
          const temp =
            Number(props.payAmount.tempDeposit) +
            Number(props.payAmount.deposit);
          const article = {
            deposit: temp,
          };
          await axios
            .put("http://localhost:8084/api/booking-cards/deposit", article)
            .then((response) => {
              props.deposit(temp);
              console.log(order);
            })
            .catch(function (error) {
              console.log(error.response.data.errorCode);
            });
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
