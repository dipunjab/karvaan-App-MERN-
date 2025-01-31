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
        <aside className="fixed top-22 md:top-16 left-0  h-[calc(100vh-4rem)] sm:w-50 w-18 sm:shadow sm:shadow-gray-100 z-10 md:p-6 p-4">
          <SideBar />
        </aside>

        <main className="ml-6 sm:ml-52 w-full h-[calc(100vh-4rem)] overflow-y-auto p-6 sm:p-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
