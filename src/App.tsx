import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LayoutSale from "./projectSaleTechnology/Layout";
import FlashSale from "./projectSaleTechnology/FlashSale";
import ProductsManager from "./projectSaleTechnology/Components/ProductsManager";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutSale />} />
          <Route path="FlashSale" element={<FlashSale />} />
          <Route path="ProductsManager" element={<ProductsManager />} />
        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
