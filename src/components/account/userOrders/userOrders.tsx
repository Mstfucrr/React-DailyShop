import { orderStatus } from "@/shared/constants";
import { authSelector } from "@/store/auth";
import { motion } from "framer-motion";
import { Messages } from "primereact/messages";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataView } from "primereact/dataview";
import { Fieldset } from "primereact/fieldset";
import { Steps } from "primereact/steps";
import { Rating } from "primereact/rating";
import { cancelOrder, getOrders } from "@/services/order/order.service";
import to from "await-to-js";
import {
  IOrder,
  IOrderAddress,
  IOrderItem,
  OrderStatus,
} from "@/services/order/types";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { SET_TOAST } from "@/store/Toast";
import { IToast } from "@/store/Toast/type";

const UserOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const { token } = useSelector(authSelector);
  const steps = orderStatus.map((item) => ({ label: item.label }));

  const msgs = useRef<Messages>(null);

  const fetchOrders = async () => {
    const [err, data] = await to(getOrders(token));
    if (err) {
      msgs.current?.clear();
      msgs.current?.show([
        {
          sticky: true,
          severity: "error",
          summary: "Sistematik Hata",
          detail: err.message,
          closable: false,
        },
      ]);
      return;
    }
    if (data.data) {
      setOrders(data.data);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const legendTemplate = (order: IOrder) => {
    return (
      <div className="flex md:flex-row flex-col sm:items-center !text-sm justify-between text-white">
        <span className="ml-1">
          Sipariş No: <span className="text-primary">{order.OrderNumber}</span>
        </span>
        <span className="ml-1">
          Tarih: <span className="text-primary">{order.date}</span>
        </span>
        <span className="ml-1">
          Toplam: <span className="text-primary">{order.totalPrice} ₺</span>
        </span>
        <span className="ml-1">
          Durum:{" "}
          <span className="text-primary">
            {orderStatus.find((item) => item.value === order.status)?.label}
          </span>
        </span>
      </div>
    );
  };

  const orderAddressTemplate = (address: IOrderAddress) => {
    return (
      <div className="w-full flex flex-col gap-2">
        <h3 className="text-2xl text-primaryDark font-semibold">
          Teslimat Adresi
        </h3>
        <div className="w-full flex flex-col gap-2">
          <span className="font-semibold">{address.title}</span>
          <span className="">{address.address}</span>
          <span className="">{address.city}</span>
          <span className="">{address.zipCode}</span>
        </div>
      </div>
    );
  };

  const dispatch = useDispatch();

  const handleCancelOrder = async (orderId: number) => {
    const [err, data] = await to(
      cancelOrder(orderId, OrderStatus.Cancelled, token),
    );
    if (err) {
      const toast: IToast = {
        severity: "error",
        summary: "Hata",
        detail: err.message,
        life: 5000,
      };
      dispatch(SET_TOAST(toast));
      return;
    }
    if (data) {
      const toast: IToast = {
        severity: "success",
        summary: "Başarılı",
        detail: data.message,
        life: 5000,
      };
      dispatch(SET_TOAST(toast));
      fetchOrders();
    }
  };

  const confirm = (event: any, orderId: number) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Siparişi iptal etmek istediğinize emin misiniz?",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Evet",
      rejectLabel: "Hayır",
      acceptIcon: "pi pi-check",
      rejectIcon: "pi pi-times",
      acceptClassName: "p-button-danger",
      rejectClassName: "p-button-secondary",
      accept: () => {
        handleCancelOrder(orderId);
      },
      reject: () => {
        //reject
      },
    });
  };

  const OrderItemTemplate = (orderItem: IOrderItem) => {
    return (
      <div className="flex m-2 shadow-lg px-5 py-8 w-full">
        <div className="flex flex-row flex-wrap gap-5 items-center">
          <Link
            className="sm:w-1/3 w-full hover:scale-110 transition duration-300"
            to={`/product/${orderItem.product.id}`}
          >
            <img
              src={orderItem.product.image}
              alt={orderItem.product.name}
              className="w-full h-auto object-scale-down"
            />
          </Link>
          <div className="">
            <div className="product-name">{orderItem.product.name}</div>
            <Rating
              value={orderItem.product.rating}
              readOnly
              cancel={false}
              pt={{
                onIcon: { className: "!text-primary" },
              }}
            />
            <div className="product-price">{orderItem.price} ₺</div>
            <div className="product-quantity">
              Quantity: {orderItem.quantity}
            </div>
            <div className="product-quantity">Color: {orderItem.color}</div>
            <div className="product-quantity">Size: {orderItem.size}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.4 }}
      className="w-full px-[15px]"
    >
      <h3 className="text-4xl my-4 text-primaryDark ">Siparişlerim</h3>
      <Messages ref={msgs} />

      {/* order */}

      <div className="w-full flex flex-col gap-7">
        {orders?.map((order) => {
          return (
            <Fieldset
              className="w-full flex flex-col shadow-lg gap-9"
              toggleable
              key={"order-" + order.id}
              legend={legendTemplate(order)}
              collapseIcon="pi pi-chevron-down text-white"
              collapsed={false}
              expandIcon="pi pi-chevron-up text-white"
              pt={{
                legend: { className: "w-full !bg-slate-600 " },
                legendTitle: { className: "w-full !flex !flex-col" },
              }}
            >
              <div className="flex flex-col gap-6 sm:max-w-none max-w-xs w-full">
                {/* order items */}
                <div className="w-full flex flex-col">
                  <DataView
                    value={order.orderItems}
                    itemTemplate={OrderItemTemplate}
                    className="flex flex-col gap-4"
                  />
                </div>

                {/* order address */}
                {orderAddressTemplate(order.address)}

                {/* order status */}
                <div className="flex flex-col w-full gap-7 overflow-x-auto">
                  <h3 className="text-2xl text-primaryDark font-semibold">
                    Sipariş Durumu
                  </h3>
                  <Steps
                    model={steps}
                    readOnly
                    activeIndex={orderStatus.findIndex(
                      (item) => item.value === order.status,
                    )}
                    className="w-full min-w-[600px]"
                  />
                </div>

                {/* order cancel */}
              </div>
              <ConfirmPopup />
              <Button
                severity="danger"
                className="sm:w-1/3 w-full float-right !m-9"
                onClick={(e) => confirm(e, order?.id ?? 0)}
                disabled={order.status === OrderStatus.Cancelled}
                label="Siparişi İptal Et"
                icon="pi pi-times"
                iconPos="right"
              />
            </Fieldset>
          );
        })}
      </div>
    </motion.div>
  );
};

export default UserOrders;
