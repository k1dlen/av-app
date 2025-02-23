"use client";

import { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";

export default function Orders({ user }) {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [newOrder, setNewOrder] = useState({
    productId: "",
    count: 0,
    address: "",
  });

  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/orders?userId=${user.id}`);
      const data = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.error("Ошибка при загрузке заказов:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user.id]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Ошибка при загрузке продуктов:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

const handleCreateOrder = async () => {
  try {
    const response = await fetch("/api/orders", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_user: user.id,
        id_product: newOrder.id_product,
        count: newOrder.count,
        address: newOrder.address,
      }),
    });
    if (response.ok) {
      const data = await response.json();

      console.log("Ответ от сервера:", data);

      if (data && data.id) {
        setOrders([...orders, { ...newOrder, id: data.id }]);
        setNewOrder({ id_product: "", count: 0, address: "" });
      } else {
        console.error("Ответ от сервера не содержит id:", data);
      }
    } else {
      console.error("Ошибка при создании заказа:", response.statusText);
    }
  } catch (error) {
    console.error("Ошибка при создании заказа:", error);
  }
};

  return (
    <div>
      <h2>Ваши заказы</h2>
      <ul>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <li key={order.id} style={{ marginBottom: "1rem" }}>
              <strong>Заказ №{index + 1}</strong><br />
              Название товара:{order.product_name}<br /> 
              Количество: {order.count}<br />
              Адрес заказчика: {order.address}<br />
              Статус заказа: {order.status_name}
            </li>
          ))
        ) : (
          <li>У вас нет заказов.</li>
        )}
      </ul>

      <div>
        <h3>Создать новый заказ</h3>
        <select
          value={newOrder.id_product}
          onChange={(e) =>
            setNewOrder({ ...newOrder, id_product: e.target.value })
          }
          required
        >
          <option value="">Выберите товар</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Количество"
          value={newOrder.count}
          onChange={(e) => setNewOrder({ ...newOrder, count: e.target.value })}
        />
        <input
          type="text"
          placeholder="Адрес доставки"
          value={newOrder.address}
          onChange={(e) =>
            setNewOrder({ ...newOrder, address: e.target.value })
          }
        />
        <button onClick={handleCreateOrder}>Создать заказ</button>
      </div>
      <LogoutButton />
    </div>
  );
}
