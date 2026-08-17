import { PedidoClient } from "@/components/site/PedidoClient";

export function generateStaticParams() {
  return [{ id: "demo" }];
}

export default function PedidoPage() {
  return <PedidoClient />;
}
