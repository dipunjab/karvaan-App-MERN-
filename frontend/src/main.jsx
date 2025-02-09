import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from "./store/store.js"
import { Provider } from 'react-redux'

import { Home,
         Tweets,
         Playlists,
         LikedVideos,
         Subscriptions,
         YourVideos,
         History,
         WatchVideo,
         Profile,
         Login,
         Signup
         } from "./pages/index.js"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/tweets",
        element: <Tweets/>
      },
      {
        path: "/playlists",
        element: <Playlists/>
      },
      {
        path: "/liked-videos",
        element: <LikedVideos/>
      },
      {
        path: "/subscriptions",
        element: <Subscriptions/>
      },
      {
        path: "/uservideos",
        element: <YourVideos/>
      },
      {
        path: "/watch-history",
        element: <History/>
      },
      {
        path: "/watchvideo/:videoId",
        element: <WatchVideo/>
      },
      {
        path: "/profile/:userId",
        element: <Profile/>
      }
    ]
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <Signup/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
