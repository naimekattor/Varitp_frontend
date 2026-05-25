import OrderHistory from "@/components/orders/OrderHistory";

export const metadata = {
  title: "Order History | Varitp",
  description: "View your past orders and their delivery status.",
};

export default function OrdersPage() {
  return <OrderHistory />;
}
