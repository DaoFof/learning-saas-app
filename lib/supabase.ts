import { auth } from "@clerk/nextjs/server"
import { createClient } from "@supabase/supabase-js"

// For authenticated requests (server actions that need user context)
export const createSupabaseClient = () => {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            async accessToken() {
                return ((await auth()).getToken())
            }
        }
    )
}

// For public requests (no authentication required)
export const createPublicSupabaseClient = () => {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}