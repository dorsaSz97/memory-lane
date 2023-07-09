"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import { User } from "@supabase/supabase-js";
import supabase from "@/util/subpabaseClient-browser";
import { AnimatePresence, motion } from "framer-motion";

const FolderUploader = ({ user }: { user: User }) => {
  const [showForm, setShowForm] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [nameError, setNameError] = useState(false);
  const [infoValue, setInfoValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addNewFolder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nameValue) {
      setNameError(true);
      return;
    }

    try {
      setIsLoading(true);

      const { error } = await supabase.from("folders").insert({
        name: nameValue,
        user_id: user.id,
        info: infoValue ? infoValue : null,
      });
      if (error) throw new Error(error.message);
    } catch (err) {
      alert("Something went wrong with uploading the folder" + err);
    } finally {
      setNameValue("");
      setInfoValue("");
      setShowForm(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex fixed bottom-0 right-1/2 translate-x-1/2 justify-center">
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={addNewFolder}
            className="flex flex-col gap-5 absolute bottom-full left-1/2 -translate-x-1/2 bg-primary p-4 rounded-lg shadow-2xl"
          >
            <input
              type="text"
              name="folder-name"
              id="folder-name"
              placeholder={`${
                nameError ? "You have to enter a name!!" : "Enter a folder name"
              }`}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNameValue(e.target.value)
              }
              value={nameValue}
              className={`rounded-[5px] p-[0.4rem] ${
                nameError && "border-2 border-red-500 placeholder:text-red-400"
              }`}
            />
            <textarea
              name="folder-info"
              id="folder-info"
              placeholder="Enter a description..."
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setInfoValue(e.target.value)
              }
              rows={10}
              cols={40}
              value={infoValue}
              className="rounded-[5px] p-[0.4rem]"
            />

            <button
              type="submit"
              className="text-lg font-bold capitalize whitespace-nowrap"
              disabled={isLoading}
            >
              Add folder
            </button>
          </motion.form>
        )}
      </AnimatePresence>
      <button className="text-6xl" onClick={() => setShowForm(!showForm)}>
        +
      </button>
    </div>
  );
};

export default FolderUploader;
