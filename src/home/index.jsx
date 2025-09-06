import Header from "@/components/custom/Header";
import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const Home = () => {
	const { isSignedIn } = useUser();

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
			<Header />
			<div className="flex flex-col items-center justify-center py-24 px-4">
				<h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4 text-center">
					AI Resume Builder
				</h1>
				<p className="text-lg md:text-2xl text-gray-600 mb-8 text-center max-w-2xl">
					Instantly create a professional, modern resume powered by AI. Save
					time, impress recruiters, and land your dream job with ease!
				</p>
				{/* <Link to="/dashboard">
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 text-lg">
            Get Started
          </button>
        </Link> */}
				{isSignedIn ? (
					<Link to="/dashboard">
						<button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 text-lg">
							Go to Dashboard
						</button>
					</Link>
				) : (
					<Link to="/auth/sign-in">
						<button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 text-lg">
							Get Started
						</button>
					</Link>
				)}
				<div className="mt-16 flex flex-col md:flex-row items-center gap-8">
					<img
						src="/cv.png"
						alt="Resume Preview"
						className="w-64 h-64 object-contain rounded-xl shadow-xl border border-gray-200 bg-white"
					/>
					<div className="max-w-md">
						<ul className="space-y-4 text-gray-700 text-base">
							<li>✅ Effortless AI-powered resume generation</li>
							<li>✅ Modern, customizable templates</li>
							<li>✅ Instant download & sharing</li>
							<li>✅ Secure and private</li>
						</ul>
					</div>
				</div>
			</div>
			<footer className="text-center text-gray-400 py-6">
				&copy; {new Date().getFullYear()} AI Resume Builder. All rights
				reserved.
				<br />
				<div className="text-sm text-gray-500">
					Made by <span className="font-bold">Abhinav Chhiller</span>
				</div>
				<div className="text-sm text-gray-500">
					<span className="font-bold">
						{" "}
						Fullstack Developer with 2+ years of Experience
					</span>
				</div>
			</footer>
		</div>
	);
};

export default Home;
