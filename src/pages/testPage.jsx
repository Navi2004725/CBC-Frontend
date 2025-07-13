import { useState } from "react";

export default function TestPage() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    setCount(count - 1);
    if (count <= 0) {
      setCount(0);
    }
  }
  // Uncommenting the line below will cause an infinite loop
  // because it will keep updating the state without any condition.
  // setCount(count + 1); // This will cause an infinite loop
  // DO NOT DO THIS
  return (
    <div className="w-full h-screen bg-amber-300 flex items-center justify-center">
      <div className="w-[400px] h-[400px] bg-white flex-col justify-center items-center">
        <h1 className="text-5xl font-bold">{count}</h1>
        <div className="w-full flex justify-center items-center h-[100px]">
          <button
            onClick={decrement}
            className="w-[100px] h-[45px] bg-blue-500 text-white text-3xl mx-2 font-bold justify-center items-center"
          >
            -
          </button>
          <button
            onClick={increment}
            className="w-[100px] h-[45px] bg-blue-500 text-white text-3xl mx-2 font-bold justify-center items-center"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
