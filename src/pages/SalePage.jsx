import React from "react";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb";
import VoucherInfo from "../components/VoucherInfo";

const SalePage = () => {
  return (
    <section>
      <Container>
        <Breadcrumb currentPage={"Sale Page"} />
        <VoucherInfo />
      </Container>
    </section>
  );
};

export default SalePage;
