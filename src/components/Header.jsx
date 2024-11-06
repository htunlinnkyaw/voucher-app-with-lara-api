import React from "react";
import Container from "./Container";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="mb-5">
      <Container>
        <Link to={"/"} className="text-3xl font-bold">
          Voucher App
        </Link>
        <h2 className="text-gray-500">MMS Software</h2>
      </Container>
    </header>
  );
};

export default Header;
