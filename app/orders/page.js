'use client';

import Orders from "@/app/components/Orders";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      window.location.href = '/login';
    }
  }, []);

  if (!user) {
    return <div>AAAAAA........</div>; 
  }

  return <Orders user={user} />;
}
