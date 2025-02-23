"use client";

import { useState, useEffect } from "react";
import LogoutButton from "./LogoutButton";

export default function AdminPanel() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const fetchOrders = async () =>
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setOrders(data.orders);
        }
      })
      .catch((err) => setError("Ошибка при загрузке заказов"));

  useEffect(() => {
    fetchOrders();
  }, []);

  async function updateStatus(id, status) {
    try {
      const response = await fetch("/api/orders/update-status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_order: id,
          newStatus: status,
          id_role: 2,
        }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === updatedOrder.id
              ? { ...order, ...updatedOrder }
              : order
          )
        );

        fetchOrders();
        
      } else {
        const data = await response.json();
        setError(data.error || "Не удалось обновить статус");
      }
    } catch (err) {
      console.error("Ошибка при обновлении статуса:", err);
      setError("Ошибка при обновлении статуса");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Админ-панель</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <li key={order.id} style={{ marginBottom: "1rem" }}>
              <strong>
                Заказ #{index + 1} (код заказа в базе: {order.id})
              </strong>
              <br />
              Пользователь: {order.full_name} (код пользователя: {order.id_user}
              )<br />
              Адрес доставки: {order.address} <br />
              Продукт: {order.product_name}
              <br />
              Количество: {order.count}
              <br />
              Статус заказа: {order.status_name} <br />
              {order.id_status === 1 && (
                <>
                  <button onClick={() => updateStatus(order.id, 2)}>
                    Принять
                  </button>
                  <button onClick={() => updateStatus(order.id, 3)}>
                    Отклонить
                  </button>
                </>
              )}
            </li>
          ))
        ) : (
          <li>У вас нет заказов.</li>
        )}
      </ul>
      <LogoutButton />
    </div>
  );
}
