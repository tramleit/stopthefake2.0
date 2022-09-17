import AuthProvider from "contexts/AuthContext";
import FullscreenProvider from "contexts/FullscreenContext";
import MyRouter from "routers/index";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>
      <FullscreenProvider>
        <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
          <ToastContainer
            position="top-right"
            theme="colored"
            hideProgressBar={true}
            toastStyle={{ top: "65px" }}
          />
          <MyRouter />
        </div>
      </FullscreenProvider>
    </AuthProvider>
  );
}

export default App;
