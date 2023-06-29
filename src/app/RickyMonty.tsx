/** @format */

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function RickyMonty() {
  const [charData, setCharData] = useState<any>([]);
  const [episode, setEpisode] = useState<[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  if (charData == null || charData == undefined) {
    return <div> Loading...</div>;
  }

  useEffect(() => {
    fetchData();
    fetchNext();
  }, []);

  useEffect(() => {
    fetchNext();
    fetchData();
  }, [currentPage]);

  const fetchNext = async () => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${currentPage}`
      );
      const jsonData = await response.json();
      const dataArray: any = Object.values(jsonData);
      setCharData(dataArray);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/episode?page=${currentPage}`
      );
      const jsonData = await response.json();
      const dataArray: any = Object.values(jsonData);

      setEpisode(dataArray);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleClickPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClickNext = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <div className="mx-auto mt-3" style={{ width: "200px" }}>
        <input
          type="text"
          placeholder="Search charatcter"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded-1"
        />
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="grid-container container ">
        {charData &&
          charData[1]
            ?.slice(0, 6)
            ?.filter((val: any) => {
              if (search === "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return val;
              }
            })
            .map((itm: any, idx: any) => {
              return (
                <div className="card">
                  <div className="d-flex justify-content-start bg-secondary bg-gradient text-white check">
                    <div>
                      <Image
                        src={itm.image}
                        alt="pic"
                        width={300}
                        height={150}
                        style={{ borderRadius: "10px 0" }}
                        priority={true}
                      />
                    </div>
                    <div className="ps-3 pt-3 ">
                      <h3>{itm.name}</h3>
                      <div>
                        <span
                          style={{
                            backgroundColor:
                              itm?.status == "Alive"
                                ? "green"
                                : itm?.status == "Dead"
                                ? "red"
                                : "lightGrey",
                            height: "15",
                            width: "15",
                            borderRadius: "25px",
                            color:
                              itm?.status == "Alive"
                                ? "green"
                                : itm?.status == "Dead"
                                ? "red"
                                : "lightGrey",
                            marginRight: "5px",
                          }}
                        >
                          00
                        </span>
                        status : {itm?.status}
                      </div>
                      <div className="mt-2 text">Last known location : </div>
                      <div>{itm?.location?.name}</div>
                      <div className="mt-2 text">First see in : </div>
                      <div>
                        {episode &&
                          episode[1]?.slice(0, 1)?.map((itm: any) => {
                            return <span>{itm?.name}</span>;
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>

      <div className="mx-auto mt-4" style={{ width: "200px" }}>
        <button onClick={handleClickPrevious} className="m-4 bg-light p-2">
          Previous
        </button>

        <button onClick={handleClickNext} className="bg-light p-2">
          next
        </button>
      </div>

      <div className="pagination_datas color">
        <div className="text mx-auto mt-3" style={{ width: "300px" }}>
          Charatcter: {charData[1]?.length} Location: {charData[1]?.length}
          Episode: {episode[1]?.length}
        </div>
      </div>
    </>
  );
}
