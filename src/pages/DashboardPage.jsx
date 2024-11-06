import React from "react";
import Container from "../components/Container";
import ModuleBtn from "../components/ModuleBtn";
import {
  HiCircleStack,
  HiComputerDesktop,
  HiDocumentDuplicate,
} from "react-icons/hi2";

const DashBoardPage = () => {
  return (
    <section>
      <Container>
        <div className="grid grid-cols-1 grid-rows-3 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="col-span-1 row-span-1 ">
            <ModuleBtn
              url={"/product"}
              name={"Product Module"}
              icon={<HiCircleStack className="size-14" />}
            />
          </div>
          <div className="col-span-1 row-span-1">
            <ModuleBtn
              url={"/sale"}
              name={"Sale Module"}
              icon={<HiComputerDesktop className="size-14" />}
            />
          </div>
          <div className="col-span-1 row-span-1">
            <ModuleBtn
              url={"/voucher"}
              name={"Voucher Module"}
              icon={<HiDocumentDuplicate className="size-14" />}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DashBoardPage;
