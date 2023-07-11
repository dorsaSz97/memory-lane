"use client";
import supabase from "@/util/subpabaseClient-browser";

const SignoutButton = () => {
  const signOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    error && alert(error.message);
  };

  return (
    <button
      onClick={signOutHandler}
      className="fixed bottom-4 right-4 w-[120px] aspect-square pt-6 text-primary text-lg capitalize bg-blob bg-no-repeat bg-cover bg-center transition-all hover:text-xl whitespace-nowrap"
    >
      Sign out
    </button>
  );
};

export default SignoutButton;
