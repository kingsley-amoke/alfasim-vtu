
import { createBrowserClient} from "@supabase/ssr";




const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;


const client = createBrowserClient(supabaseUrl, supabaseKey);

export const connectToSupabase = () => client


