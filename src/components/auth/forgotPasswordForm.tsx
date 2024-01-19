import { emailRegex, passwordRegex } from "@/helper/regex";
import { authService } from "@/services/auth/auth.service";
import { SET_TOAST } from "@/store/Toast";
import { IToast } from "@/store/Toast/type";
import to from "await-to-js";
import { Formik } from "formik";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [token, setToken] = useState<string | null>(null);

  const handleSubmit = async (values: { email: string }) => {
    setIsLoading(true);
    const [err, data] = await to(authService.forgotPassword(values.email));
    if (err) {
      const toast: IToast = {
        severity: "error",
        summary: "Hata",
        detail: err.message,
        life: 3000,
      };
      dispatch(SET_TOAST(toast));
      setIsLoading(false);
      return;
    }
    const { message } = data;
    const toast: IToast = {
      severity: "success",
      summary: "Başarılı",
      detail: message,
      life: 3000,
    };
    dispatch(SET_TOAST(toast));
    setIsLoading(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("token")) {
      setToken(params.get("token") as string);
    }
  }, []);

  const handleResetPassword = async (values: { password: string }) => {
    setIsLoading(true);
    if (token == null) return setIsLoading(false);
    const [err, data] = await to(
      authService.resetPassword({ Password: values.password }, token),
    );
    if (err) {
      const toast: IToast = {
        severity: "error",
        summary: "Hata",
        detail: err.message,
        life: 3000,
      };
      dispatch(SET_TOAST(toast));
      setIsLoading(false);
      return;
    }
    const { message } = data;
    const toast: IToast = {
      severity: "success",
      summary: "Başarılı",
      detail: message,
      life: 3000,
    };
    dispatch(SET_TOAST(toast));
    setIsLoading(false);
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  return (
    <div
      className="md:w-[500px] w-full md:my-0 bg-white 
        border border-solid mx-auto md:mt-[110px] "
    >
      <div className="py-7 bg-primary flex justify-center items-center mb-4">
        <h1 className="text-white md:text-4xl text-3xl font-bold text-center">
          Parolamı Unuttum
        </h1>
      </div>
      <div className="w-full flex flex-col items-center h-[300px] ">
        {token == null ? (
          <Formik
            initialValues={{ email: "" }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("E-posta geçersiz")
                .required("E-posta zorunlu")
                .max(50, "E-posta çok uzun")
                .min(2, "E-posta çok kısa")
                .matches(emailRegex(), "E-posta geçersiz"),
            })}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <form
                onSubmit={formik.handleSubmit}
                className="w-4/5 h-auto flex flex-col justify-start py-10 "
              >
                <div className="flex flex-col gap-6">
                  <label
                    htmlFor="email"
                    className="text-primary text-xl font-medium"
                  >
                    E-Posta
                  </label>
                  <InputText
                    id="email"
                    name="email"
                    placeholder="E-Posta"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className={
                      formik.errors.email && formik.touched.email
                        ? "p-inputtext-sm p-invalid w-full"
                        : "p-inputtext-sm w-full"
                    }
                  />

                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="flex flex-col mt-8">
                  <button
                    className="w-full h-12 bg-primary text-white text-xl font-bold rounded-3xl
                            hover:text-primary hover:bg-white hover:border-primary border border-solid border-primary
                            transition duration-300 ease-in-out"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex justify-center items-center w-full">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      </div>
                    ) : (
                      <span>Gönder</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        ) : (
          <Formik
            initialValues={{ password: "" }}
            validationSchema={Yup.object({
              password: Yup.string()
                .required("Parola zorunlu")
                .max(50, "Parola çok uzun")
                .min(2, "Parola çok kısa")
                .matches(passwordRegex(), "Parola geçersiz"),
            })}
            onSubmit={handleResetPassword}
          >
            {(formik) => (
              <form
                onSubmit={formik.handleSubmit}
                className="w-4/5 h-auto flex flex-col justify-start py-10 "
              >
                <div className="flex flex-col gap-6">
                  <label
                    htmlFor="password"
                    className="text-primary text-xl font-medium"
                  >
                    Parola
                  </label>
                  <Password
                    placeholder="Parola"
                    name="password"
                    id="password"
                    pt={{
                      input: {
                        className: "w-full",
                      },
                      showIcon: {
                        className: "relative flex -top-1",
                      },
                      hideIcon: {
                        className: "relative flex -top-1",
                      },
                    }}
                    className={
                      formik.errors.password && formik.touched.password
                        ? "p-inputtext-sm p-invalid w-full"
                        : "p-inputtext-sm w-full"
                    }
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    toggleMask
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <small id="username2-help" className="p-error">
                      {formik.errors.password}
                    </small>
                  ) : null}
                </div>
                <div className="flex flex-col mt-8">
                  <button
                    className="w-full h-12 bg-primary text-white text-xl font-bold rounded-3xl
                            hover:text-primary hover:bg-white hover:border-primary border border-solid border-primary
                            transition duration-300 ease-in-out"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex justify-center items-center w-full">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      </div>
                    ) : (
                      <span>Gönder</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
