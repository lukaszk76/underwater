import { useEffect } from "react";

const addCursorPointer = () => {
  const cursorPointer = document.querySelector(".cursor-pointer");
  let timeout;

  const updateCursor = (e) => {
    let x = e.pageX;
    let y = e.pageY;
    cursorPointer.style.top = y + "px";
    cursorPointer.style.left = x + "px";
    cursorPointer.style.opacity = "0.6";
    cursorPointer.style.setProperty("transform", "scale(1)");
  };

  document.addEventListener("mousemove", (e) => {
    updateCursor(e);
    function mouseStopped() {
      cursorPointer.style.opacity = "0";
      cursorPointer.style.setProperty("transform", "scale(0)");
    }

    clearTimeout(timeout);
    timeout = setTimeout(mouseStopped, 7000);
  });
};

const Cursor = () => {
  useEffect(() => {
    addCursorPointer();
  }, []);

  return <div className="cursor-pointer" />;
};

export default Cursor;
