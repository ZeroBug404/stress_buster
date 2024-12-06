import App from "@/App";
import { HomePage, Login, SignUp } from "@/pages";
import ChartAndSuggestion from "@/pages/ChartAndSuggestion"
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
        path:"/questions",
        element:<ChartAndSuggestion />
      }
    ],
  },
]);

export default router;
