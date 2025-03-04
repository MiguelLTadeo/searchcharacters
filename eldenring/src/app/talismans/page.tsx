"use client";
import TalismanPage from "@/components/TalismanPage";
import { Suspense } from "react";

export default function () {
  return (
    <>
      <Suspense fallback={<div>Carregando...</div>}>
        <TalismanPage />
      </Suspense>
    </>
  );
}
