import { createOrder, getCart } from "@/services/order/order.service";
import { ICartItem } from "@/shared/types";
import { authSelector } from "@/store/auth";
import to from "await-to-js";
import { Messages } from "primereact/messages";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderAddress from "./orderAddress";
import { Button } from "primereact/button";
import { AnimatePresence } from "framer-motion";
import OrderPayment from "./orderPayment";
import { IUserAddress } from "@/services/auth/types";
import { IOrderAddress, IOrderRequest } from "@/services/order/types";
import { IToast } from "@/store/Toast/type";
import { SET_TOAST } from "@/store/Toast";
import { Link, useNavigate } from "react-router-dom";

const Order = () => {
  const msgs = useRef<Messages>(null);
  const [cartItems, setCartItems] = useState<[] | ICartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [selectAddress, setSelectAddress] = useState<IOrderAddress>();
  const [IsAddressSelectionconfirmed, setIsAddressSelectionconfirmed] =
    useState(false);
  const [cardValues, setCardValues] = useState({
    cardNumber: "",
    cardOwner: "",
    LastDate: "",
    cvv: "",
  });
  const navigate = useNavigate();
  const dispacth = useDispatch();
  const { isAuthorized, auth, token } = useSelector(authSelector);
  const [user, setUser] = useState(auth);
  useEffect(() => {
    setUser(auth);
  }, []);

  const fetchCart = async () => {
    const [err, data] = await to(getCart(token));
    if (err) {
      msgs.current?.clear();
      msgs.current?.show([
        {
          sticky: true,
          severity: "error",
          summary: "Sistematik Hata",
          detail: err.message,
        },
      ]);
      return;
    }
    if (data.data) {
      setCartItems(data.data);
      let total = 0;
      data.data.map((item: ICartItem) => {
        total += item.product.price * item.quantity;
      });
      setCartTotal(total);
    }
  };

  useEffect(() => {
    if (isAuthorized) fetchCart();
  }, []);

  const handleSubmitOrder = async () => {
    console.log(selectAddress);
    console.log(cardValues);
    console.log(cartItems);
    console.log(cartTotal);
    if (!selectAddress) return;
    const orderReq: IOrderRequest = {
      addressId: selectAddress?.id,
      creditCard: {
        cardNumber: cardValues.cardNumber,
        cardOwner: cardValues.cardOwner,
        cvv: cardValues.cvv,
        LastDate: cardValues.LastDate,
      },
      orderItems: cartItems.map((item) => {
        return {
          productId: item.product.id,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
        };
      }),
    };
    console.log(orderReq);

    const [err, data] = await to(createOrder(orderReq, token));
    if (err) {
      const toast: IToast = {
        severity: "error",
        summary: "Hata",
        detail: err.message,
        life: 5000,
      };
      dispacth(SET_TOAST(toast));
      return;
    }
    const toast: IToast = {
      severity: "success",
      summary: "Başarılı",
      detail: data.message,
      life: 5000,
    };
    dispacth(SET_TOAST(toast));
    setTimeout(() => {
      navigate("/account/Siparişlerim");
    }, 1500);
  };

  return (
    <div className="flex lg:flex-row flex-col xl:px-10 px-3 gap-3 mt-20">
      {user?.addresses?.length === 0 ? (
        <div className="flex justify-center items-center w-full h-full">
          <div className="flex flex-col items-center gap-5">
            <h1 className="text-3xl font-semibold">
              Adresiniz Bulunmamaktadır
            </h1>
            <Link
              to={"/account"}
              className="!bg-primary border border-solid border-transparent text-[#212529] py-4 px-3 w-full
                            hover:!bg-primaryDark hover:!border-primaryDark hover:text-white
                            transition duration-300 ease-in-out flex justify-center rounded-xl"
            >
              Lütfen Adres Ekleyiniz
            </Link>
          </div>
        </div>
      ) : (
        <AnimatePresence>
          <OrderAddress
            key={"orderAddress"}
            addresses={user?.addresses}
            IsAddressSelectionconfirmed={IsAddressSelectionconfirmed}
            selectAddress={selectAddress as IUserAddress}
            setSelectAddress={setSelectAddress}
          />
          {IsAddressSelectionconfirmed && (
            <OrderPayment
              key={"orderPayment"}
              cardValues={cardValues}
              setcardValues={setCardValues}
              handleSubmitOrder={handleSubmitOrder}
            />
          )}
        </AnimatePresence>
      )}

      <div className="flex basis-4/12 p-2">
        <div
          className="w-full border border-solid border-secondary
                        flex flex-col relative h-min"
        >
          {/* card header */}
          <div className="py-3 px-5 bg-secondary">
            <h4 className="font-semibold text-2xl text-black">Sipariş Özeti</h4>
          </div>
          {/* card body */}
          <div className="flex-auto p-5">
            <div className="flex flex-col">
              <h5 className="text-2xl font-semibold mb-2">Ürünler</h5>
              <div className="flex flex-col gay-4">
                {cartItems.map((cartItem) => (
                  <div
                    className="flex justify-between"
                    key={"cartItem-" + cartItem.id}
                  >
                    <div className="">
                      {cartItem.product.name} x {cartItem.quantity}
                    </div>
                    <div className="">
                      {cartItem.product.price * cartItem.quantity} ₺
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* card footer */}
          <div className="border border-solid border-secondary py-3 px-5 gap-10 flex flex-col">
            <div className="flex justify-between mt-2 text-black">
              <h5 className="font-bold text-xl">Toplam</h5>
              <h5 className="font-bold text-xl">{cartTotal} ₺</h5>
            </div>

            {!IsAddressSelectionconfirmed ? (
              <Button
                className="!bg-primary border border-solid border-transparent text-[#212529] py-4 px-3 w-full
                            hover:!bg-primaryDark hover:!border-primaryDark hover:text-white
                            transition duration-300 ease-in-out flex justify-center"
                disabled={cartItems.length === 0 || !selectAddress}
                onClick={() => setIsAddressSelectionconfirmed(true)}
              >
                Ödeme İşlemine Geçin
              </Button>
            ) : (
              <Button
                className="border border-solid border-transparent text-[#212529] py-4 px-3 w-full hover:text-white flex justify-center"
                onClick={() => setIsAddressSelectionconfirmed(false)}
                severity="secondary"
                icon="pi pi-arrow-left"
                iconPos="left"
                label="Adres Seçimine Dön"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
