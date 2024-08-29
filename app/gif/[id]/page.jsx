import { Suspense } from "react";
import GifDetailsComponent from "./gifDetailsComponent";
import { fetchGifDetails } from "@/utils/api";
import Meta from "@/components/meta";

export async function generateMetadata({ params, searchParams }) {
  // read route params
  const id = params.id;

  // fetch data
  const response = await fetchGifDetails(id);
  return {
    title: response.title,
    description: response.title,
    openGraph: {
      images: [
        {
          url: response.images.original.url,
          width: response.images.original.width,
          height: response.images.original.height,
          alt: response.title,
        },
      ],
    },
  };
}

export default function Page({ params, searchParams }) {
  return (
    <Suspense>
      <Meta {...generateMetadata({ params, searchParams })} />
      <GifDetailsComponent id={params.id} />
    </Suspense>
  );
}

// export default function GifDetails({ params }) {
//   const { id } = params;
//   const getDetails = async () => {
//     try {
//       const response = await fetchGifDetails(params.id);

//       return response; // Store the fetched GIF details in the state
//     } catch (error) {
//       console.error("Error fetching GIF details:", error);
//     }
//   };

//   const gifDetails = getDetails();
//   return (
//     <Suspense>
//       <Meta gifDetails={gifDetails} />
//       <GifDetailsComponent id={id} />
//     </Suspense>
//   );
// }
