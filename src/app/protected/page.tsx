// src/app/protected/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";  // Certifique-se de ajustar o caminho conforme necessário
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        // Redireciona se não estiver autenticado
        redirect("/api/auth/signin");
        return null;
    }

    return <div>This is a protected page. Welcome, {session.user.username}!</div>;
}
