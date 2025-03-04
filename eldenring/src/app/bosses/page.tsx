"use client";
import BossPage from "@/components/BossPage";
import { Suspense } from "react";

export default function () {
  return (
    <>
      <Suspense fallback={<div>Carregando...</div>}>
        <BossPage />
      </Suspense>
    </>
  );
}
