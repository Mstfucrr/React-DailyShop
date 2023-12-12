import to from "await-to-js";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom"
import Footer from "./components/Footer";
import AppRouter from "./routes/AppRouter"
import { getSiteIcon } from "./services/siteIcon/siteIcon";
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

  // site Icon 
  const fetchAndUpdateSiteIcon = async () => {
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    const [err, data] = await to(getSiteIcon())
    if (err) return console.log(err)
    if (data) {
      link.href = data.data
    }
  }

  useEffect(() => {
    fetchAndUpdateSiteIcon()
  }, [])


  return (
    <BrowserRouter>
      <div className="app">
        <Toast ref={toast} />
        <AppRouter />
        <Footer />
      </div>
    </BrowserRouter>

  )
}

export default App
