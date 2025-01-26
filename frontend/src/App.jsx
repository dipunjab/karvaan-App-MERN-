import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";

function App() {
  return (
    <div className="w-full h-screen">
      <div>
         <Header />
      </div>

      <div className="flex pt-16">
        <aside className="fixed top-22 left-0 h-[calc(100vh-4rem)] md:w-56 w-24 shadow shadow-gray-100 z-10 md:p-7 p-4">
          <SideBar />
        </aside>

        <main className="ml-24 w-full h-[calc(100vh-4rem)] overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
