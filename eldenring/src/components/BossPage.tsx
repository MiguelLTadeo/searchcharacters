"use client";
import { Boss } from "@/interfaces/Bosses";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BossPage() {
  const searchParams = useSearchParams();
  const [boss, setBoss] = useState<Boss>();

  async function GetBoss() {
    try {
      const Id = searchParams.get("item");
      if (!Id) {
        return console.log("Sem id para pesquisa!");
      }
      const response = await fetch(
        `https://eldenring.fanapis.com/api/bosses/${Id}`
      );
      if (!response.ok) {
        return console.log("Erro ao buscar boss!");
      }
      const bosses = await response.json();
      setBoss(bosses.data);
    } catch (error) {
      throw new Error("Erro no servidor!");
    }
  }
  useEffect(() => {
    GetBoss();
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
      {boss ? (
        <>
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center min-w-[250px] text-center m-5 bg-elden-gold rounded">
              <Image
                src={boss.image}
                alt="elden ring image"
                width={300}
                height={300}
                className="m-5"
              />
              <h1 className="text-3xl text-black">{boss.name}</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-5">
              <div className="flex-1 min-w-[250px] text-center bg-elden-gold m-5 rounded">
                <h1 className="text-3xl m-5 text-black">
                  Boss Description <br />
                  {boss.description}
                </h1>
              </div>
              <div className="flex-1 min-w-[250px] text-center bg-elden-gold m-5 rounded">
                <h1 className="text-3xl m-5 text-black">
                  Location
                  <br />
                  {boss.location}
                </h1>
              </div>

              <div className="flex-1 min-w-[250px] text-center bg-elden-gold m-5 rounded text-black">
                <div className="m-5">
                  {boss?.drops ? <h1 className="text-3xl">Drops</h1> : <></>}
                  {boss?.drops ? (
                    boss.drops.map((drop, i) => (
                      <div key={i}>
                        <h1 className="text-3xl">{drop}</h1>
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
