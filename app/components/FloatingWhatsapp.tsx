"use client";

import React, { Suspense } from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import Delayed from "./Delayed";

const FloatingWhatsapp = () => {
  return (
    <div>
      <Delayed waitBeforeShow={2000}>

      <FloatingWhatsApp phoneNumber="+2348038095687" accountName="Alfasim" messageDelay={5}/>
      </Delayed>
    </div>
  );
};

export default FloatingWhatsapp;
