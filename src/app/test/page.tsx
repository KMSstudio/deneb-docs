import { supabase } from "@/lib/supabase";

export default async function TestSupabasePage() {
  const { data, error } = await supabase
    .from("test_items")
    .select("*");

  if (error) {
    return (
      <main>
        <h1>Supabase Error</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </main>
    );
  }

  return (
    <main>
      <h1>Supabase Connection Test</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
