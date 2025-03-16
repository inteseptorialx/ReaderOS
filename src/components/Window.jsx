import React, { useRef, useEffect, useState } from "react";
import { CircleX } from "lucide-react";

// Função para gerenciar o movimento da janela
function useWindowMovement(windowRef) {
  const previousPosition = useRef({ x: 0, y: 0 });
  const mouseMoveListener = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const onGrab = () => {
    previousPosition.current = { x: 0, y: 0 };

    const handleMouseMove = (event) => {
      const currentX = event.clientX;
      const currentY = event.clientY;

      if (
        previousPosition.current.x === 0 &&
        previousPosition.current.y === 0
      ) {
        previousPosition.current = { x: currentX, y: currentY };
        return;
      }

      const deltaX = currentX - previousPosition.current.x;
      const deltaY = currentY - previousPosition.current.y;

      const maxX = window.innerWidth - windowRef.current.offsetWidth;
      const maxY = window.innerHeight - windowRef.current.offsetHeight;

      setPosition((prevPosition) => ({
        top: Math.min(maxY, Math.max(0, prevPosition.top + deltaY)),
        left: Math.min(maxX, Math.max(0, prevPosition.left + deltaX)),
      }));

      previousPosition.current = { x: currentX, y: currentY };
    };

    mouseMoveListener.current = handleMouseMove;
    document.addEventListener("mousemove", handleMouseMove);

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mouseup", handleMouseUp, { once: true });
  };

  useEffect(() => {
    return () => {
      if (mouseMoveListener.current) {
        document.removeEventListener("mousemove", mouseMoveListener.current);
      }
    };
  }, []);

  return { position, onGrab };
}

// Função para gerenciar o redimensionamento da janela
function useWindowResize(windowRef) {
  const handleTRef = useRef(null);
  const handleRRef = useRef(null);
  const handleBRef = useRef(null);
  const handleLRef = useRef(null);
  const [cursor, setCursor] = useState("default");

  const handleMouseMoveCursor = (event) => {
    /*
    const rect = windowRef.current.getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;

    if (y < rect.top + 5) {
      setCursor("ns-resize");
    } else if (x > rect.right - 5) {
      setCursor("ew-resize");
    } else if (y > rect.bottom - 5) {
      setCursor("ns-resize");
    } else if (x < rect.left + 5) {
      setCursor("ew-resize");
    } else {
      setCursor("default");
    }
*/
  };

  const resize = (event) => {
    // Implemente a lógica de redimensionamento aqui
    // Você precisará usar os refs (handleTRef, handleRRef, etc.)
    // e o evento do mouse para calcular as novas dimensões da janela.
  };

  return {
    resize,
    handleMouseMoveCursor,
    handleTRef,
    handleRRef,
    handleBRef,
    handleLRef,
    cursor,
  };
}

function Window({ title = "Window", id = 1, layer = 1 }) {
  const windowName = title;
  const windowRef = useRef(null);
  const handleTRef = useRef(null);
  const handleRRef = useRef(null);
  const handleBRef = useRef(null);
  const handleLRef = useRef(null);
  const { position, onGrab } = useWindowMovement(windowRef);
  const [cursor, setCursor] = useState("default");
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState(null);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (windowRef.current) {
      windowRef.current.style.cursor = cursor;
    }
  }, [cursor]);

  const handleMouseDown = (direction) => {
    setIsResizing(true);
    setResizeDirection(direction);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    setResizeDirection(null);
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isResizing && resizeDirection) {
        const deltaX = event.clientX - previousMousePosition.current.x;
        const deltaY = event.clientY - previousMousePosition.current.y;

        if (
          previousMousePosition.current.x === 0 &&
          previousMousePosition.current.y === 0
        ) {
          previousMousePosition.current = {
            x: event.clientX,
            y: event.clientY,
          };
          return;
        }

        if (resizeDirection === "left" || resizeDirection === "right") {
          console.log(`Redimensionando ${resizeDirection}, Delta X: ${deltaX}`);
        } else if (resizeDirection === "top" || resizeDirection === "bottom") {
          console.log(`Redimensionando ${resizeDirection}, Delta Y: ${deltaY}`);
        }

        previousMousePosition.current = { x: event.clientX, y: event.clientY };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isResizing, resizeDirection]);

  useEffect(() => {
    const globalMouseUp = () => {
      setIsResizing(false);
      setResizeDirection(null);
    };

    window.addEventListener("mouseup", globalMouseUp);

    return () => {
      window.removeEventListener("mouseup", globalMouseUp);
    };
  }, []); // Adicionado useEffect para listener global de mouseup

  return (
    <>
      <div
        id="win0"
        ref={windowRef}
        style={{
          position: "absolute",
          top: position.top,
          left: position.left,
        }}
        className="w-[300px] h-[300px] rounded-lg border-[3px] select-none border-white/30 overflow-hidden"
      >
        <div
          onMouseDown={onGrab}
          className="bg-slate-900/30 backdrop-filter backdrop-blur-lg inset-x-5 h-9 rounded-t-md flex justify-between pt-[5px]"
        >
          <p className="font-medium text-white text-center ml-[15px]">
            {windowName}
          </p>
          <div className="mr-[15px] text-white">
            <CircleX />
          </div>
        </div>
        <div className="bg-white/10 backdrop-filter backdrop-blur-lg h-full w-full rounded-b-md "></div>
        <div>
          <div
            id="handleT"
            ref={handleTRef}
            className="absolute bg-green-500/0 w-full h-2 top-0"
            onMouseEnter={() => setCursor("ns-resize")}
            onMouseLeave={() => setCursor("default")}
            onMouseDown={() => handleMouseDown("top")}
          ></div>
          <div
            id="handleR"
            ref={handleRRef}
            className="absolute bg-green-500/0 w-2 h-full top-0 right-0"
            onMouseEnter={() => setCursor("ew-resize")}
            onMouseLeave={() => setCursor("default")}
            onMouseDown={() => handleMouseDown("right")}
          ></div>
          <div
            id="handleB"
            ref={handleBRef}
            className="absolute bg-green-500/0 w-full h-2 bottom-0"
            onMouseEnter={() => setCursor("ns-resize")}
            onMouseLeave={() => setCursor("default")}
            onMouseDown={() => handleMouseDown("bottom")}
          ></div>
          <div
            id="handleL"
            ref={handleLRef}
            className="absolute bg-green-500/0 w-2 h-full top-0 left-0"
            onMouseEnter={() => setCursor("ew-resize")}
            onMouseLeave={() => setCursor("default")}
            onMouseDown={() => handleMouseDown("left")}
          ></div>
        </div>
      </div>
    </>
  );
}

export default Window;
