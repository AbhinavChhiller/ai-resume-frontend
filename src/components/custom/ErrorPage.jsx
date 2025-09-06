import { useRouteError } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	const errorMessage =
		error?.statusText || error?.message || "An unexpected error occurred.";

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50 px-6">
			<div className="max-w-md text-center bg-white p-8 rounded-2xl shadow-xl">
				<div className="flex justify-center mb-4">
					<div className="bg-red-100 text-red-600 p-3 rounded-full">
						<AlertTriangle className="w-8 h-8" />
					</div>
				</div>
				<h1 className="text-3xl font-bold text-gray-800">
					Oops! Something went wrong.
				</h1>
				<p className="mt-4 text-gray-600">{errorMessage}</p>
				<a
					href="/"
					className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-xl transition duration-200">
					Go back home
				</a>
			</div>
		</div>
	);
}
