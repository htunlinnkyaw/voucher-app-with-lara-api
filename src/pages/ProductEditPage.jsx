import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import ProductEditCard from "../components/ProductEditCard";
import Container from "../components/Container";

const ProductEditPage = () => {
  return (
    <section>
      <Container>
        <Breadcrumb
          currentPage={"Edit Product"}
          links={[{ path: "/product", title: "Product Page" }]}
        />
        <ProductEditCard />
      </Container>
    </section>
  );
};

export default ProductEditPage;
