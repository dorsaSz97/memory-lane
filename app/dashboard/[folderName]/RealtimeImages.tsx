"use client";
import { useEffect, useState } from "react";
import supabase from "@/util/subpabaseClient-browser";
import { SupaImage } from "@/types";
import ImageSlider from "./ImageSlider";

const RealtimeImages = ({ serverImages }: { serverImages: SupaImage[] }) => {
  const [images, setImages] = useState(serverImages);

  useEffect(() => {
    const channel = supabase
      .channel("realtime images")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "images" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setImages((prev) => [...prev, payload.new as SupaImage]);
          }
          if (payload.eventType === "DELETE") {
            setImages((prev) =>
              prev.filter((img) => img.id !== (payload.old as SupaImage).id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return <ImageSlider images={images} />;
};

export default RealtimeImages;
