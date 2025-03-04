"use client";
import { Weapon } from "@/interfaces/Weapons";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function WeaponPage() {
  const searchParams = useSearchParams();
  const [weapon, setWeapon] = useState<Weapon>();

  async function GetWeapon() {
    try {
      const Id = searchParams.get("item");
      if (!Id) {
        return console.log("Sem id para pesquisa!");
      }
      const response = await fetch(
        `https://eldenring.fanapis.com/api/weapons/${Id}`
      );
      if (!response.ok) {
        return console.log("Erro ao buscar armadura!");
      }
      const wea = await response.json();
      setWeapon(wea.data);
    } catch (error) {
      throw new Error("Erro no servidor!");
    }
  }
  useEffect(() => {
    GetWeapon();
  }, [searchParams]);

  return (
    <>
      <header className="bg-elden-gold">
        <div className="flex justify-between items-center ">
          <div className="flex flex-col items-center m-2">
            <Image
              src="/logo.png"
              alt="elden ring image"
              width={100}
              height={100}
            />
          </div>
          <h1 className="text-center m-2 bg-black p-3 rounded text-xl sm:text-5xl">
            ELDEN WIKI
          </h1>
        </div>
      </header>
      {weapon ? (
        <>
          <div className="flex flex-col items-center">
            <div className="flex justify-center items-center">
              <div className="flex flex-col items-center text-center m-0">
                <Image
                  src={weapon.image}
                  alt="elden ring image"
                  width={200}
                  height={200}
                />
                <h1 className="text-3xl">{weapon.name}</h1>
              </div>
              <div className="grid grid-cols-1 m-5 bg-elden-gold rounded">
                <h1 className="flex-1 min-w[250px] text-center bg-black m-5 rounded p-4 text-xl md:text-3xl">
                  CATEGORY {weapon.category.toUpperCase()}
                </h1>

                <h1 className="flex-1 min-w[250px] text-center bg-black m-5 rounded p-4 text-xl md:text-3xl">
                  WEIGHT {weapon.weight}
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-5">
              <div className="flex flex-col flex-1 min-w-[250px] text-center bg-elden-gold m-5 rounded">
                <h1 className="text-3xl bg-black m-2 p-3 rounded">
                  DESCRIPTION
                  <br />
                </h1>
                <h1 className="flex-1 text-3xl bg-white text-black m-2 p-3 rounded">
                  {weapon.description}
                </h1>
              </div>
              <div className="flex flex-col flex-1 min-w-[250px] text-center bg-elden-gold m-5 rounded">
                {weapon?.attack ? (
                  <h1 className="text-3xl bg-black m-2 p-3 rounded">ATTACK</h1>
                ) : (
                  <></>
                )}
                <div className="flex-1 text-3xl bg-white text-black m-2 p-3 rounded">
                  {weapon?.attack ? (
                    weapon.attack.map((infos, i) => (
                      <div key={i}>
                        <h1 className="text-3xl m-2">
                          {infos.name}:{infos.amount}
                        </h1>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="flex flex-col flex-1 min-w-[250px] text-center bg-elden-gold m-5 rounded">
                {weapon?.defence ? (
                  <h1 className="text-3xl bg-black m-2 p-3 rounded">DEFENSE</h1>
                ) : (
                  <></>
                )}
                <div className="flex-1 text-3xl bg-white text-black m-2 p-3 rounded">
                  {weapon?.defence ? (
                    weapon.defence.map((infos, i) => (
                      <div key={i}>
                        <h1 className="text-3xl m-2">
                          {infos.name}:{infos.amount}
                        </h1>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="flex flex-col flex-1 min-w-[250px] text-center bg-elden-gold m-5 rounded">
                {weapon?.requiredAttributes ? (
                  <h1 className="text-3xl bg-black m-2 p-3 rounded">
                    REQUIRED ATTRIBUTES
                  </h1>
                ) : (
                  <></>
                )}
                <div className="flex-1 text-3xl bg-white text-black m-2 p-3 rounded">
                  {weapon?.requiredAttributes ? (
                    weapon.requiredAttributes.map((infos, i) => (
                      <div key={i}>
                        <h1 className="text-3xl m-2">
                          {infos.name}:{infos.amount}
                        </h1>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="flex flex-col flex-1 min-w-[250px] text-center bg-elden-gold m-5 rounded">
                {weapon?.scalesWith ? (
                  <h1 className="text-3xl bg-black m-2 p-3 rounded">
                    SCALES WITH
                  </h1>
                ) : (
                  <></>
                )}
                <div className="flex-1 text-3xl bg-white text-black m-2 p-3 rounded">
                  {weapon?.scalesWith ? (
                    weapon.scalesWith.map((infos, i) => (
                      <div key={i}>
                        <h1 className="text-3xl m-2">
                          {infos.name}:{infos.scaling}
                        </h1>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
