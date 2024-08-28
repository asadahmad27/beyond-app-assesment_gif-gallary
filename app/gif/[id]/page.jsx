"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { Suspense } from "react";
import GifDetailsComponent from "./gifDetailsComponent";

export default function GifDetails({ params }) {
  const { id } = params;
  // const router = useRouter();
  // const { id } = router.query;

  // if (!gif) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Suspense>
      <GifDetailsComponent id={id} />
    </Suspense>
  );
}
