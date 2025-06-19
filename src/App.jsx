import "./App.css";
import ProductCard from "./components/productCard";
import SuperProduct from "./components/superproducts";

function App() {
  return (
    <>
      <div className="w-full h-screen bg-blue-300">
        <div className="w-[600px] h-[600px] bg-black flex justify-around items-center flex-col">
          <div className="w-[150px] h-[150px] bg-[red]"></div>
          <div className="w-[150px] h-[150px] bg-green-300"></div>
          <div className="w-[150px] h-[150px] bg-yellow-200"></div>
        </div>
      </div>
    </>
  );
}

export default App;
