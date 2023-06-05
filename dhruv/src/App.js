import { BrowserRouter, Route, Routes } from "react-router-dom";
import Task from "./Task";
import Task1 from "./Task1";


function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Task/>}></Route>
      <Route path="/task1" element={<><Task1/></>}></Route>
     </Routes>
     </BrowserRouter>
     
    </>
  );
}

export default App;
