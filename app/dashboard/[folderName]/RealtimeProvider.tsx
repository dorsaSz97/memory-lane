"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import supabase from "@/util/subpabaseClient-browser";
import { SupaImage } from "@/types";

const RealtimeProvider = ({
  setServerImages,
  children,
}: {
  setServerImages: Dispatch<
    SetStateAction<
      {
        folder_id: number;
        id: number;
        url: string;
        user_id: string;
      }[]
    >
  >;
  children: ReactNode;
}) => {
  useEffect(() => {
    const channel = supabase
      .channel("realtime images")
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "images" },
        (payload) => {
          setServerImages((prev) =>
            prev.filter((img) => img.id !== (payload.old as SupaImage).id)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return <>{children}</>;
};

export default RealtimeProvider;
