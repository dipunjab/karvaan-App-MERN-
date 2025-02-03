import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice"

function App() {
  const dispatch = useDispatch()
  const authentication = useSelector((state) => state.auth.status);

  useEffect(() => {
    if(authentication){
      (async () => {
        try {
          const response = await axios.get(
            
            `${import.meta.env.VITE_API_BACKEND}/users/current-user`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
              }
            }
          );
          
          const userData = response.data;
          
          dispatch(login({
            userData: userData,
            accessToken: localStorage.getItem('accessToken')
          }));
          
        } catch (error) {
          dispatch(logout());
        }
      })();
    }
  }, []);


  return (
    <div className="w-full h-screen">
      <div>
        <Header />
      </div>

      <div className="flex pt-16">
        <aside className="fixed top-22 md:top-16 left-0  h-[calc(100vh-4rem)] sm:w-50 w-18 sm:shadow sm:shadow-gray-100 z-10 md:p-6 p-4">
          <SideBar />
        </aside>

        <main className="ml-16 sm:ml-52 w-full h-[calc(100vh-4rem)] overflow-y-auto p-6 sm:p-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
