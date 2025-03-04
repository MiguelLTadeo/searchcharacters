"use client";
import WeaponPage from "@/components/WeaponPage";
import { Suspense } from "react";

export default function () {
  return (
    <>
      <Suspense fallback={<div>Carregando...</div>}>
        <WeaponPage />
      </Suspense>
    </>
  );
}
