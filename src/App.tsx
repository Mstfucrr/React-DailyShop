import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom"
import AppRouter from "./routes/AppRouter"
import { CLEAR_TOAST } from "./store/Toast";
import { IToast } from "./store/Toast/type";


function App() {
  const toast = useRef<Toast>(null);
  const dispatch = useDispatch()

  const toastData = useSelector((state: { toast: IToast }) => state.toast)

  useEffect(() => {
    const toastSeverity = toastData.severity
    const toastSummary = toastData.summary
    const toastDetail = toastData.detail
    const toastLife = toastData.life

    if (toastDetail) {
      toast.current?.show({
        severity: toastSeverity as any,
        summary: toastSummary,
        detail: toastDetail,
        life: toastLife,
      });


    dispatch(CLEAR_TOAST())
    }
  }, [toastData])

  return (
    <BrowserRouter>
      <div className="app">
        <Toast ref={toast} />
        <AppRouter />

      </div>
    </BrowserRouter>

  )
}

export default App
