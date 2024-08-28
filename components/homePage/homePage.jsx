"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import Link from "next/link";
import { Button, Spinner } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGifs } from "@/redux/gifSlice";

export default function HomePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { gifs, status, error } = useSelector((state) => state.gif);

  const handleLoadMore = () => {
    if (status !== "loading") {
      dispatch(fetchGifs());
    }
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchGifs());
    }
  }, [status, dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 md:py-16 py-8">
        <div className="flex justify-center mb-16">
          <input
            type="text"
            placeholder="Search GIFs..."
            className="text-black w-full md:w-1/2 p-2 border border-gray-300 rounded shadow focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {gifs?.map((gif, index) => (
            // <Link key={gif.id} href={`/gifs/${gif.id}`}>
            <div
              className="border border-gray-200 rounded overflow-hidden shadow-sm cursor-pointer"
              key={gif.id}
            >
              <img
                src={gif.images.fixed_height.url}
                alt={gif.title}
                className="w-full h-full object-cover"
                onClick={() => router.push(`/gif/${gif.id}`)}
              />
            </div>
            // </Link>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          {status === "loading" ? (
            <Spinner color="primary" size="lg" />
          ) : (
            <Button
              color="primary"
              onClick={handleLoadMore}
              className="w-[350px]"
            >
              Load More
            </Button>
          )}
          {status === "failed" && <p className="text-red-500">{error}</p>}
        </div>
      </main>
    </div>
  );
}
