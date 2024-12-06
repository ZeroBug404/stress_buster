import App from "@/App";
import { ChatMessage, HomePage, Login, SignUp } from "@/pages";
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
        path: "/message",
        element: <ChatMessage />,
      },
    ],
  },
]);

export default router;
