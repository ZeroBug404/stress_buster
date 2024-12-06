import App from "@/App";
<<<<<<< HEAD
import { ChatMessage, HomePage, Login, SignUp } from "@/pages";
=======
import { HomePage, Login, SignUp } from "@/pages";
import ChartAndSuggestion from "@/pages/ChartAndSuggestion"
>>>>>>> a66ee36e54951ae081d98435c2cff604735a94f1
import { createBrowserRouter } from "react-router-dom";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/",
        element: <HomePage />,
      },
      {
<<<<<<< HEAD
        path: "/message",
        element: <ChatMessage />,
      },
=======
        path:"/questions",
        element:<ChartAndSuggestion />
      }
>>>>>>> a66ee36e54951ae081d98435c2cff604735a94f1
    ],
  },
]);

export default router;
