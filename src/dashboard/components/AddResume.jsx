import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "./../../../service/GlobalApi";
import { useNavigate } from "react-router";

const AddResume = () => {
	const [openDialog, setOpenDialog] = useState(false);
	const [resumeTitle, setResumeTitle] = useState("");
	const [loading, setLoading] = useState(false);
	const { user } = useUser();
	const navigate = useNavigate()
	const onCreate = () => {
		setLoading(true);
		const uuid = uuidv4();
		const data = {
			data: {
				title: resumeTitle,
				resumeID: uuid,
				userEmail: user?.primaryEmailAddress?.emailAddress,
				userName: user?.fullName,
			},
		};
		GlobalApi.CreateNewResume(data).then(
			(res) => {
				console.log(res);
				if (res) {
					setLoading(false);
					navigate("/dashbaord/resume/"+res.data.data.documentId+"/edit")
				}
			},
			(error) => {
				setLoading(false);
			}
		);
	};
	return (
		<div>
			<div
				onClick={() => setOpenDialog(true)}
				className="p-14 py-24 border flex justify-center items-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointe border-dashed">
				<PlusSquare />
			</div>
			<Dialog open={openDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create New Resume</DialogTitle>
						<DialogDescription>
							<span>Add a title for your new resume</span>
							<Input
								className="my-2"
								placeholder="E.g. Full Stack Resume"
								onChange={(e) => setResumeTitle(e.target.value)}
							/>
						</DialogDescription>
						<div className="flex justify-end gap-5">
							<Button onClick={() => setOpenDialog(false)} variant="ghost">
								Cancel
							</Button>
							<Button
								disabled={!resumeTitle || loading}
								onClick={() => onCreate()}>
								{loading ? <Loader2 className="animate-spin" /> : "Create"}
							</Button>
						</div>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default AddResume;
