'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import { User } from '@supabase/supabase-js';
import supabase from '@/util/subpabaseClient-browser';
import { AnimatePresence, motion } from 'framer-motion';

const FolderUploader = ({ user }: { user: User }) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const addFolderHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('folders')
        .insert([{ name: inputValue, user_id: user.id }]);

      if (error) throw new Error(error.message);
    } catch (err) {
      console.log('Something went wrong with uploading the folder' + err);
    } finally {
      setInputValue('');
      setShowInput(false);
    }
  };

  return (
    <div className="flex relative justify-center">
      <AnimatePresence>
        {showInput && (
          <motion.form
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            onSubmit={addFolderHandler}
            className="absolute top-[-100%] left-1/2 right-1/2 translate-x-[-50%]  bg-primary flex gap-5 p-[1rem] rounded-[7px] w-fit"
          >
            <input
              type="text"
              name="folder-name"
              id="folder-name"
              placeholder="Enter a name..."
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInputValue(e.target.value)
              }
              value={inputValue}
              className="rounded-[5px] p-[0.4rem]"
            />

            <button
              type="submit"
              className="rounded-[5px] p-[0.4rem] whitespace-nowrap"
            >
              Add folder
            </button>
          </motion.form>
        )}
      </AnimatePresence>
      <button
        type="button"
        className="text-[4rem]"
        onClick={() => setShowInput(!showInput)}
      >
        +
      </button>
    </div>
  );
};

export default FolderUploader;
