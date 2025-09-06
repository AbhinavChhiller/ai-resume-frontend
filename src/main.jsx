import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import SignInPage from "./auth/sign-in";
import Home from "./home";
import Dashboard from "./dashboard";
import EditResume from "./dashboard/resume/[resumeId]/edit";
import { ClerkProvider } from "@clerk/clerk-react";
import ErrorPage from "./components/custom/ErrorPage";
import { View } from "lucide-react";
import ViewResume from "./my-resume/[resumeId]/view";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
	{
		Component: App,
		errorElement: <ErrorPage />, // ← Error boundary for children
		children: [
			{
				path: "/dashboard",
				Component: Dashboard,
				errorElement: <ErrorPage />,
			},
			{
				path: "/dashboard/resume/:resumeId/edit",
				Component: EditResume,
				errorElement: <ErrorPage />,
			},
		],
	},
	{
		path: "/",
		Component: Home,
		errorElement: <ErrorPage />,
	},
	{
		path: "/auth/sign-in",
		Component: SignInPage,
		errorElement: <ErrorPage />,
	},
	{
		path: "/my-resume/:resumeId/view",
		Component: ViewResume,
		errorElement: <ErrorPage />,
	},
	{
		path: "*",
		element: <ErrorPage />,
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
			<RouterProvider router={router} />
		</ClerkProvider>
	</StrictMode>
);
