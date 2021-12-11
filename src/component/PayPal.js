import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Warning } from "./Notification";

export default function PayPal(props){
  const [value, setValue] = useState(1);
  const [loaded, setLoaded] = useState(false);
  let payPalRef = useRef();

  const product = {
    price: "2.00",
    description: "Test Product",
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=Afwi0e8W49SlhJczo68lfDvW_ur0ed9zIkxXkX6cFEODVlse2n9a63DWpVQZOgho0PTcsb_3R1PLer9c";
    script.addEventListener("load", () => setLoaded(true));
    document.body.appendChild(script);

    if (loaded) {
      setTimeout(() => {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: "Cool looking table",
                    amount: {
                      value: props.payAmount,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              console.log();
              const article = {
                deposit: props.payAmount,
                clientId: props.clientId
              };
              await axios
                .put("http://localhost:8084/api/booking-cards/deposit", article)
                .then((response) => {
                  props.deposit(props.payAmount);
                  console.log(order);
                })
                .catch(function (error) {
                  console.log(error.response.data.errorCode);
                });

              await axios
                .put("http://localhost:8084/api/booking-cards")
                .then((response) => {})
                .catch(function (error) {
                  console.log(error.response.data.errorCode);
                  Warning("Failed", error.response.data.errorCode);
                });
            },
          })
          .render(payPalRef);
      });
    }
  }, [loaded, product.price, product.description]);
  return (
    <div>
      <div ref={(v) => (payPalRef = v)} />
    </div>
  );
};

