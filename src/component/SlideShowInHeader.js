import React from "react";
const colors = ["../../image/doco.jpg", "../image/pikachu.jpg", "./sensei.jpg"];
const delay = 4000;

function SlideInHeader() {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);
  const myArray = [
    {
      title: "Users",
      image: "c1",
    },
    {
      title: "Clients",
      image: "c2",
    },
    {
      title: "Admin",
      image: "c3",
    },
  ];

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow" style={{marginTop:"-50px",height:"492px",width:"1800px",marginLeft:"-50px"}}>
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {myArray.map((backgroundColor, index) => (
          <div className="slide">
            <img
              key={index}
              alt="hotel-img"
              style={{
                opacity: "0.5",
                width: 2400,
                height: 1600,
                marginTop: "-600px",
              }}
              src={
                require("../image/" +
                  backgroundColor.image + //no nhan path roi ne
                  ".jpg").default
              }
            />
          </div>
        ))}
      </div>

      <div className="slideshowDots">
      <img
        style={{ marginTop: "-90px" }}
        src="assets/images/logos/mainlogo.png"
        width="450px"
        alt="logo"
        height="450px"
      ></img>
        {colors.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export { SlideInHeader };
