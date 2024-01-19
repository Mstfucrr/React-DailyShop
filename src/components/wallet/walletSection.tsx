import { motion } from "framer-motion";
import CreditCard from "../creditCard/creditCard";
import { FaTimes } from "react-icons/fa";
import Card from "../creditCard/Card";
import { useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { SelectButton } from "primereact/selectbutton";
import { addMoneyToWallet } from "@/services/wallet/wallet.service";
import { SET_TOAST } from "@/store/Toast";
import { IToast } from "@/store/Toast/type";
import to from "await-to-js";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "@/store/auth";

type Props = {
  setIsShowWalletScreen: (value: boolean) => void;
};

const WalletSection = ({ setIsShowWalletScreen }: Props) => {
  const [cardValues, setCardValues] = useState({
    cardNumber: "",
    cardOwner: "",
    LastDate: "",
    cvv: "",
  });

  const [addMoneyValue, setAddMoneyValue] = useState(0);
  const { token } = useSelector(authSelector);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (addMoneyValue <= 5) {
      const toast: IToast = {
        severity: "error",
        summary: "Hata",
        detail: "En az 5 TL yükleyebilirsiniz",
        life: 3000,
      };
      dispatch(SET_TOAST(toast));
      return;
    }

    const [err, res] = await to(
      addMoneyToWallet({ Balance: addMoneyValue }, token),
    );
    if (err) {
      console.log(err);
      const toast: IToast = {
        severity: "error",
        summary: "Hata",
        detail: err.message,
        life: 3000,
      };
      dispatch(SET_TOAST(toast));
      return;
    }
    const toast: IToast = {
      severity: "success",
      summary: "Başarılı",
      detail: res.message,
      life: 3000,
    };
    dispatch(SET_TOAST(toast));
    setIsShowWalletScreen(false);
  };

  return (
    <motion.div
      className="top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center z-[200] fixed overflow-y-auto"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        display: "flex",
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <div className="flex flex-row flex-wrap gap-7 shadow-lg rounded-lg p-5 bg-white">
        <motion.div
          className="flex flex-col gap-y-4"
          initial={{
            opacity: 0,
            x: 500,
            width: 0,
            display: "none",
          }}
          animate={{
            opacity: 1,
            x: 0,
            width: "auto",
            display: "flex",
          }}
          transition={{
            duration: 1,
          }}
        >
          {/* hazır para miktarları buttonları */}

          <div className="flex gap-3 flex-row flex-wrap">
            {/* reset button */}

            {/* money Buttons */}
            <SelectButton
              name="money"
              id="money"
              value={addMoneyValue}
              options={[10, 20, 50, 100, 200, 500]}
              onChange={(e) => {
                setAddMoneyValue(e.value);
              }}
              className="w-auto flex"
              placeholder="Hazır para miktarları"
            />
          </div>
          <span className="text-lg font-semibold text-primaryDark">
            Para Miktarı
          </span>
          <InputNumber
            name="money"
            value={addMoneyValue}
            onChange={(e) => {
              if (e.value) setAddMoneyValue(e.value);
            }}
            className={`w-full ${addMoneyValue <= 5 ? "p-inputnumber-error p-invalid" : ""}`}
          />
          {addMoneyValue <= 5 && (
            <div className="text-red-500">En az 5 TL yükleyebilirsiniz</div>
          )}
        </motion.div>
        {/* credit card */}

        <CreditCard
          setCardValues={setCardValues}
          cardValues={cardValues}
          handleSubmit={handleSubmit}
        />

        <div className="flex flex-col gap-y-4 items-end">
          <FaTimes
            className="float-right text-right text-4xl text-primary cursor-pointer
                                rounded-full bg-white p-1"
            onClick={() => setIsShowWalletScreen(false)}
          />
          <Card values={cardValues} />
        </div>
      </div>
    </motion.div>
  );
};

export default WalletSection;
