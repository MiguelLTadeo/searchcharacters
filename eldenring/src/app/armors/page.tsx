"use client";
import ArmorPage from "@/components/ArmorPage";
import { Suspense } from "react";

export default function () {
  return (
    <>
      <Suspense fallback={<div>Carregando...</div>}>
        <ArmorPage />
      </Suspense>
    </>
  );
}
