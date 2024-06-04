"use client";

import React, { Suspense } from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import Delayed from "./Delayed";

const FloatingWhatsapp = () => {
  return (
    <div>
      <Delayed waitBeforeShow={2000}>

      <FloatingWhatsApp phoneNumber="+2348051525123" accountName="Alfasim" messageDelay={5} avatar="./logo.jpg" darkMode={true} statusMessage="Contact us now" chatMessage="Welcome to alfasim data. \n How can we help you today. " allowClickAway={true} allowEsc={true}/>
      </Delayed>
    </div>
  );
};

export default FloatingWhatsapp;
