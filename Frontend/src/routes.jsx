import {
  createBrowserRouter,
} from "react-router";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";
import Home from "./features/auth/pages/Home";
import ProtectedRoute from "./features/auth/hooks/protected";
import Dashboard from "./features/interview/pages/Dashboard";
import History from "./features/interview/pages/history";
import Index from "./features/interview/components";
import NewReport from "./features/interview/pages/newReport";
import InterviewContextProvider from "./features/interview/interviewContexts/interview.context";
import ReportDetails from "./features/interview/pages/ReportDetails";
import { path } from "framer-motion/client";
import Behavioral from "./features/interview/pages/ReportDetailschildRoutes/Behavioral";
import RoadMap from "./features/interview/pages/ReportDetailschildRoutes/RoadMap";
import TechnicalQuestions from "./features/interview/pages/ReportDetailschildRoutes/TechnicalQuestions";
import SkillGaps from "./features/interview/pages/ReportDetailschildRoutes/SkillGaps";
import DetailsIndex from "./features/interview/pages/ReportDetailschildRoutes/DetailsIndex";
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>
    
  },
   {
    path: "/register",
    element: <Register/>
    
  },
  {
    path:"/",
    element: <ProtectedRoute><Home/> </ProtectedRoute> 
  },
  {
    path:"/dashboard",
    element:<ProtectedRoute><InterviewContextProvider>
      <Dashboard/>
      </InterviewContextProvider></ProtectedRoute> 
      
    ,
    children:[
      
      {
        index:true,
        element:<Index/>
      },

      {
    path:"history",
    element:<History/>
  },
  {
    path:"new-report",
    element:<NewReport/>
  }
    ]
  },
  {
    path:"/reportDetails/:id",
    element:<InterviewContextProvider>
      <ReportDetails/>
    </InterviewContextProvider> ,
    children:[{
      index:true,
      element:<DetailsIndex/>
    },
  {
    path:"technical",
    element:<TechnicalQuestions/>

  },
 {
    path:"behavioral",
    element:<Behavioral/>

  },
 {
    path:"gaps",
    element:<SkillGaps/>

  },
 {
    path:"roadmap",
    element:<RoadMap/>

  }]
   
  }
  
]);