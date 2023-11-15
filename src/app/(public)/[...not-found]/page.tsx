import {notFound} from "next/navigation";

// Dynamic catch-all route. Fixes problem with not-found.tsx opening.
export default function Home() {
    notFound();
}
