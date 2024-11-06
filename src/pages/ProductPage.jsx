import React from "react";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb";
import ProductList from "../components/ProductList";

const ProductPage = () => {
  return (
    <section>
      <Container>
        <Breadcrumb currentPage={"Product Page"} />
        <ProductList />
      </Container>
    </section>
  );
};

export default ProductPage;
