"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectGifById } from "@/redux/gifSlice";
import { Button } from "@nextui-org/react";
import { fetchGifDetails } from "@/utils/api";
import Meta from "@/components/meta";

export default function GifDetailsComponent({ id }) {
  const gif = useSelector((state) => selectGifById(state, id));
  const [gifDetails, setGifDetails] = useState();
  const [visited, setVisited] = useState(false);

  // Function to add the GIF ID to localStorage
  const storeVisitedGif = () => {
    let visitedGifs = JSON.parse(localStorage.getItem("visitedGifs")) || [];

    if (!visitedGifs.includes(id)) {
      visitedGifs.push(id);
      localStorage.setItem("visitedGifs", JSON.stringify(visitedGifs));
    }
  };

  // Function to check if the GIF has been visited
  const checkIfVisited = () => {
    let visitedGifs = JSON.parse(localStorage.getItem("visitedGifs")) || [];

    if (visitedGifs.includes(id)) {
      setVisited(true);
    }
  };

  const getDetails = async () => {
    try {
      const response = await fetchGifDetails(id);

      setGifDetails(response); // Store the fetched GIF details in the state
    } catch (error) {
      console.error("Error fetching GIF details:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getDetails();
      checkIfVisited();
    }
    return () => {
      storeVisitedGif();
    };
  }, []);

  return (
    <>
      <div className="container md:p-8 md:max-w-[80%] p-4 mx-auto ">
        <div className="mt-8">
          <Link href="/" className="flex items-center gap-1">
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
            >
              <path
                d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"
                fill="white"
              />
            </svg>
            <p className=" text-white py-2 px-4 rounded shadow">Back to Feed</p>
          </Link>
        </div>
        {/* Main Content */}
        <main className="flex-grow  px-4 py-8 ">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-6 text-white">
              {gifDetails?.title ?? "Loading..."}
            </h1>

            <div className="flex md:flex-row flex-col md:items-center justify-between gap-4 bg-gray-800 rounded-lg p-4 shadow-lg">
              <div className="flex items-center gap-2 mt-2 ">
                <img
                  src={gifDetails?.user?.avatar_url}
                  alt={gifDetails?.user?.display_name}
                  className="w-10 h-10 rounded-xl mr-2"
                />
                <div>
                  <p className="text-white">{gifDetails?.user?.display_name}</p>
                  <p className="text-gray-500 text-tiny md:max-w-[60%]">
                    {gifDetails?.user?.description ?? "No description"}
                  </p>
                </div>
              </div>
              <div>
                <Button>Get in touch</Button>
              </div>
            </div>
          </div>
          <div className=" mx-auto">
            <div className="bg-gray-300 rounded-lg md:p-16 p-4">
              <img
                src={gifDetails?.images?.original?.url}
                alt={gifDetails?.title}
                className="w-full h-auto object-contain  rounded shadow-md max-h-[600px]"
              />
            </div>

            {visited && (
              <p className="text-red-500 font-semibold mt-2">
                {`You've visited this GIF before!`}
              </p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
