import { headers, cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

export default () => {
  return createServerActionClient<Database>({
    cookies,
  });
};
