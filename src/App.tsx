/*
 * @Author: xiaoman
 * @Date: 2025-03-05 09:15:31
 * @LastEditors: xiaoman
 * @Description: 
 */
import { Suspense } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import Loading from "./views/Loading/index.tsx";
import router from "./routes/route.tsx";
function App() {
  return (
    <Suspense fallback={<Loading delay={300} />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
