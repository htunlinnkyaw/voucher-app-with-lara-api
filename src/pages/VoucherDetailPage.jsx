import React from "react";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb";
import { HiDocumentDownload, HiPrinter } from "react-icons/hi";
import VoucherCard from "../components/VoucherCard";

const VoucherDetailPage = () => {
  return (
    <section>
      <Container>
        <Breadcrumb
          currentPage={"Voucher Detail"}
          links={[{ path: "/voucher", title: "Voucher Page" }]}
        />

        <VoucherCard />
      </Container>
    </section>
  );
};

export default VoucherDetailPage;
