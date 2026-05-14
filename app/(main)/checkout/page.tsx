import CheckoutPage from "@/components/checkout/checkout";
import StripeProvider from "@/components/providers/StripeProvider";

export default function Page() {
  return (
    <StripeProvider>
      <CheckoutPage />
    </StripeProvider>
  );
}