"use client";
import { Armor } from "@/interfaces/Armors";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ArmorPage() {
  const searchParams = useSearchParams();
  const [armor, setArmor] = useState<Armor>();

  async function GetArmor() {
    try {
      const Id = searchParams.get("item");
      if (!Id) {
        return console.log("Sem id para pesquisa!");
      }
      const response = await fetch(
        `https://eldenring.fanapis.com/api/armors/${Id}`
      );
      if (!response.ok) {
        return console.log("Erro ao buscar armadura!");
      }
      const bosses = await response.json();
      setArmor(bosses.data);
    } catch (error) {
      throw new Error("Erro no servidor!");
    }
  }
  useEffect(() => {
    GetArmor();
  }, [searchParams]);

  return (
    <>
      <header className="bg-elden-gold">
        <div className="flex justify-between items-center ">
          <div className="flex flex-col items-center m-2">
            <Image
              src="/logo.svg"
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
      {armor ? (
        <>
          <div className="flex flex-col items-center">
            <div className="flex justify-center items-center">
              <div className="flex flex-col items-center text-center m-0">
                <Image
                  src={armor.image}
                  alt="elden ring image"
                  width={200}
                  height={200}
                />
                <h1 className="text-3xl">{armor.name}</h1>
              </div>
              <div className="grid grid-cols-1 m-5">
                <h1 className="flex-1 min-w[250px] text-center bg-elden-gold m-5 rounded p-4 text-xl md:text-3xl">
                  CATEGORY {armor.category}
                </h1>

                <h1 className="flex-1 min-w[250px] text-center bg-elden-gold m-5 rounded p-4 text-xl md:text-3xl">
                  WEIGHT {armor.weight}
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-5">
              <div className="flex-1 min-w-[250px] text-center bg-elden-gold m-5 rounded">
                <h1 className="text-3xl">
                  DESCRIPTION
                  <br />
                  {armor.description}
                </h1>
              </div>
              <div className="flex-1 min-w-[250px] text-center bg-elden-gold m-5 rounded">
                {armor?.dmgNegation ? (
                  <h1 className="text-3xl">Damage Negation</h1>
                ) : (
                  <></>
                )}
                {armor?.dmgNegation ? (
                  armor.dmgNegation.map((dmg) => (
                    <div key={dmg.name}>
                      <h1 className="text-3xl">
                        {dmg.name}:{dmg.amount}
                      </h1>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
              <div className="flex-1 min-w-[250px] text-center bg-elden-gold m-5 rounded">
                {armor?.dmgNegation ? (
                  <h1 className="text-3xl">Resistance</h1>
                ) : (
                  <></>
                )}
                {armor?.resistance ? (
                  armor.resistance.map((res) => (
                    <div key={res.name}>
                      <h1 className="text-3xl">
                        {res.name}:{res.amount}
                      </h1>
                    </div>
                  ))
                ) : (
                  <></>
                )}
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
