import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { AuthContextType } from "@/contexts/auth-context";
import {
	HeadContent,
	Outlet,
	createRootRouteWithContext
} from "@tanstack/react-router";
import "../index.css";

export interface RouterAppContext {
	auth: AuthContextType;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
	component: RootComponent,
	head: () => ({
		meta: [
			{
				title: "Nexu",
			},
			{
				name: "description",
				content: "Nexu é uma plataforma de estudos online que conecta alunos e professores.",
			},
		],
		links: [
			{
				rel: "icon",
				href: "/favicon.ico",
			},
		],
	}),
});

function RootComponent() {

	return (
		<>
			<HeadContent />
			<ThemeProvider
				defaultTheme="dark"
				storageKey="vite-ui-theme"
			>
				<div className="grid grid-rows-[auto_1fr] h-svh">
					<main className="svh">
						<Outlet />
					</main>
				</div>
				<Toaster richColors />
			</ThemeProvider>
		</>
	);
}
