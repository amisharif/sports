import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MatchScore from './components/MatchScore/MatchScore.jsx';
import MatchDetails from './components/MatchDetails/MatchDetails.jsx';
import AuthProvider from './components/Auth/AuthProvider/AuthProvider.jsx';
import OfficeRegister from './components/AccessControl/Register/OfficeRegister.jsx';
import OfficeLogin from './components/AccessControl/Login/OfficeLogin.jsx';
import PrivateRoute from './components/Route/PrivateRoute.jsx';
import Admin from './components/Admin/Admin.jsx';
import AddSchool from './components/Admin/AddSchool/AddSchool.jsx';
import { element } from 'prop-types';
import ShowSchool from './components/Admin/ShowSchool/ShowSchool.jsx';
import SchoolInfo from './components/Admin/SchoolInfo/SchoolInfo.jsx';
import ShowTeamInfo from './components/SchoolMain/ShowTeamInfo/ShowTeamInfo.jsx';
import UpdatePlayerInfo from './components/SchoolMain/UpdatePlayerInfo/UpdatePlayerInfo.jsx';
import AddPlayer from './components/SchoolMain/AddPlayer/AddPlayer.jsx';
import Statistics from './components/Statistics/Statistics.jsx';
import Stat from './components/Statistics/Stat.jsx';
import Standing from './components/Standing/Standing.jsx';
import AddMatch from './components/AddMatch/AddMatch.jsx';
import Front from './components/Front/Front.jsx';
import MatchesList from './components/Extra/Extra.jsx';
import Fixture from './components/Admin/Fixture/Fixture.jsx';
import Login from './components/AccessControl/Login/Login.jsx';
import KnockoutStage from './components/Standing/KnockoutStage/KnockoutStage.jsx';
import GroupStage from './components/Standing/GroupStage/GroupStage.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Front></Front>,
     
      },
      {
        path: "/matchscore",
        element: <MatchScore></MatchScore>,
        loader: () =>  fetch('http://localhost:3000/matchscore') 
      },
      {
        path: "/matchdetails/:id",
        element: <MatchDetails></MatchDetails>,
      //  loader: ({ params }) => fetch(`http://localhost:3000/matchdetails/${params.id}`)
      },
      {
        path: "/statistics",
        element: <Statistics></Statistics>,
        loader: () => fetch('http://localhost:3000/statistics')
      },
      {
        path: "/standing",
        element: <Standing></Standing>,
        //loader: () => fetch('http://localhost:3000/standing')
       // loader: () => fetch('http://localhost:3000/standdataa')

        children: [
          {
            path: "/standing/groupstage",
            element: <GroupStage></GroupStage>
          },
          {
            path: "/standing/knockoutstage",
            element: <KnockoutStage></KnockoutStage>
          },
         
        ]

  
      },

      {
        path: "/register",
        element: <OfficeRegister></OfficeRegister>,
      }, 
      {
        path: "/addmatch",
        element: <AddMatch></AddMatch>,
      }, 
      {
        path: "/teaminfo",
        element: <PrivateRoute><ShowTeamInfo></ShowTeamInfo></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:3000/teaminfo`)
      },
      {
        path: "/teaminfo/:eiin",
        // element: <PrivateRoute><ShowTeamInfo></ShowTeamInfo></PrivateRoute>,
        element: <ShowTeamInfo></ShowTeamInfo>,
        loader: ({params}) =>  fetch(`http://localhost:3000/teaminfo/${params.eiin}`)
      },
     

      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/updateplayerinfo/:birthid",
        element: <UpdatePlayerInfo></UpdatePlayerInfo>,
        loader: ({ params }) => fetch(`http://localhost:3000/playerinfo/${params.birthid}`)
      },
     
      {
        path: "/addplayer",
        element: <AddPlayer></AddPlayer>,
       
      },

      
     
      {
        path: "/admin",
        // element: <PrivateRoute><Admin></Admin></PrivateRoute>,
        element: <Admin></Admin>,
        children:[
          {
            path:'/admin/addschool',
            element:<AddSchool></AddSchool>
          },
          {
            path: '/admin/createfixture', 
            element: <Fixture></Fixture>,
            loader: () => fetch(`http://localhost:3000/groupclone`)
          },
          {
            path: '/admin/createfixture/:matchid',
            element: <AddMatch></AddMatch>
          },

          {
            path: '/admin/showschool',
            element: <ShowSchool></ShowSchool>,
            loader: ( ) => fetch(`http://localhost:3000/showschool`)
          },
          {
            path: '/admin/showschool/:email',
            loader: ({ params }) => fetch(`http://localhost:3000/showschool/${params.email}`),
            element: <SchoolInfo></SchoolInfo>
          },

         
        ]
      },
    ],
  },

 

]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    
  </React.StrictMode>,
)
