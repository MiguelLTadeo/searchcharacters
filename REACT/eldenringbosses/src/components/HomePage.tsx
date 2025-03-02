"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Boss } from "@/interfaces/Bosses";
import { Armor } from "@/interfaces/Armors";
import { Weapon } from "@/interfaces/Weapons";
import { Classe } from "@/interfaces/Classes";
import { useRouter } from "next/navigation";

export default function HomePage() {
  interface GameData {
    bosses: Boss[];
    armors: Armor[];
    weapons: Weapon[];
    classes: Classe[];
  }

  const router = useRouter();

  const [search, setSearch] = useState("");
  const [fetchdata, setFetchdata] = useState<GameData>();

  async function GetData(name: string) {
    try {
      const [bossesResponse, armorsResponse, weaponsResponse, classesResponse] =
        await Promise.all([
          fetch(
            `https://eldenring.fanapis.com/api/bosses?name=${name}&limit=100`
          ),
          fetch(
            `https://eldenring.fanapis.com/api/armors?name=${name}&limit=100`
          ),
          fetch(
            `https://eldenring.fanapis.com/api/weapons?name=${name}&limit=100`
          ),
          fetch(
            `https://eldenring.fanapis.com/api/classes?name=${name}&limit=100`
          ),
        ]);

      const bosses = await bossesResponse.json();
      const armors = await armorsResponse.json();
      const weapons = await weaponsResponse.json();
      const classes = await classesResponse.json();

      setFetchdata({
        bosses: bosses.success && bosses.data.length > 0 ? bosses.data : null,
        armors: armors.success && armors.data.length > 0 ? armors.data : null,
        weapons:
          weapons.success && weapons.data.length > 0 ? weapons.data : null,
        classes:
          classes.success && classes.data.length > 0 ? classes.data : null,
      });
    } catch (error) {
      throw new Error("Erro no servidor!");
    }
  }

  function PrintData(type: keyof GameData) {
    if (!fetchdata || !fetchdata[type]) {
      return <h1>none</h1>;
    }
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {fetchdata[type]
            .filter((item) => item.image != null)
            .map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center text-center"
              >
                <button
                  className="flex flex-col items-center bg-elden-gold rounded m-5 transition-transform duration-200 hover:scale-[1.10] "
                  onClick={() => {
                    console.log(item.id);
                    router.push(`/${type}?item=${encodeURIComponent(item.id)}`);
                  }}
                >
                  <h1 className="text-x w-64 h-10 font-black p-5 m-10 bg-black rounded overflow-hidden">
                    {item.name.toUpperCase()}
                  </h1>
                  <Image
                    src={item.image}
                    alt="elden ring image"
                    width={200}
                    height={200}
                    className="w-[200px] h-[200px] m-5 rounded-full"
                  />
                </button>
              </div>
            ))}
        </div>
      </>
    );
  }
  useEffect(() => {
    GetData("");
    PrintData("bosses");
    PrintData("armors");
    PrintData("weapons");
    PrintData("classes");
  }, []);

  return (
    <>
      <header className="bg-elden-gold">
        <div className="flex justify-between items-center ">
          <div className="flex flex-col items-center rounded m-2">
            <Image
              src="/favicon.ico"
              alt="elden ring image"
              width={100}
              height={100}
            />
          </div>
          <h1 className="hidden sm:block md:block sm:bg-black p-3 rounded text-5xl absolute left-1/2 transform -translate-x-1/2">
            ELDEN WIKI
          </h1>
          <div className="m-2 flex items-center">
            <button
              className="border border-black bg-black rounded-l whitespace-nowrap text-white hover:bg-white transition-transform duration-200 hover:scale-110 hover:bg-white hover:text-black"
              onClick={async () => {
                await GetData("");
              }}
            >
              GET All
            </button>
            <input
              type="text"
              className="w-full w-30 text-black text-center"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            ></input>
            <button
              className="border border-black bg-black rounded-r text-white hover:bg-white transition-transform duration-200 hover:scale-110 hover:bg-white hover:text-black"
              onClick={async () => {
                await GetData(search);
              }}
            >
              SEARCH
            </button>
          </div>
        </div>
      </header>
      <div>
        {fetchdata?.bosses ? (
          <>
            <h1 className="text-center m-5 text-5xl font-black">BOSSES</h1>
            {PrintData("bosses")}
          </>
        ) : (
          <></>
        )}
      </div>
      <div>
        {fetchdata?.armors ? (
          <>
            <h1 className="text-center m-5 text-5xl font-black">ARMORS</h1>
            {PrintData("armors")}
          </>
        ) : (
          <></>
        )}
      </div>
      <div>
        {fetchdata?.weapons ? (
          <>
            <h1 className="text-center m-5 text-5xl font-black">WEAPONS</h1>
            {PrintData("weapons")}
          </>
        ) : (
          <></>
        )}
      </div>
      <div>
        {fetchdata?.classes ? (
          <>
            <h1 className="text-center m-5 text-5xl font-black">Classes</h1>
            {PrintData("classes")}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
