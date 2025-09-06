import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { use, useContext, useEffect, useState } from "react";
import RichTextEditor from "./RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import GlobalApi from "../../../../../service/GlobalApi";
import { useParams } from "react-router";
import { toast } from "sonner";

const formFields = {
	title: "",
	companyName: "",
	city: "",
	state: "",
	startDate: "",
	endDate: "",
	workSummary: "",
};
const Experience = () => {
	const params = useParams();
	const [experienceList, setExperienceList] = useState([formFields]);
	const [loading, setLoading] = useState(false);
	const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
	const handleChange = (e, index) => {
		const newEntries = experienceList.slice();
		newEntries[index][e.target.name] = e.target.value;
		setExperienceList(newEntries);
		console.log("Experience List:", experienceList);
	};
	const AddNewExperience = () => {
		setExperienceList([...experienceList, formFields]);
	};
	const RemoveExperience = () => {
		if (experienceList.length > 1) {
			const newList = [...experienceList];
			newList.pop();
			setExperienceList(newList);
		}
	};
	const handleRichTextEditor = (event, name, index) => {
		const newEntries = experienceList.slice();
		newEntries[index][name] = event.target.value;
		setExperienceList(newEntries);
		console.log("Experience List after Rich Text Editor:", experienceList);
	};
	const onSave = () => {
		setLoading(true);
		const data = {
			data: {
Experience:experienceList.map(({ id, ...rest }) => rest)			},
		};
		setResumeInfo({ ...resumeInfo, experience: experienceList });

		console.log("Experience List on Save:", experienceList);
		// Here you can add the API call to save the resume info
		GlobalApi.UpdateResumeDetail(params.resumeId, data)
			.then((res) => {
				setLoading(true);
				if (res.status === 200) {
					setLoading(false);
					console.log("Experience details saved successfully:", res.data);
					toast.success("Experience details saved successfully!");
				} else {
					setLoading(false);
					console.error("Error saving Experience details:", res);
					toast.error("Failed to save Experience details.");
				}
			})
			.catch((error) => {
				setLoading(false);
				console.error("Error saving Experience details:", error);
				toast.error("Failed to save Experience details.");
			});
	};
	useEffect(() => {
		setResumeInfo({ ...resumeInfo, experience: experienceList });
	}, [experienceList]);
	useEffect(() => {
		resumeInfo?.Experience?.length > 0 &&
			setExperienceList(resumeInfo?.Experience);
	}, []);
	return (
		<div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-4">
			<h2 className="font-bold text-lg">Professional Experience</h2>
			<p>Add your previous job experience</p>
			<div>
				{experienceList.map((item, index) => (
					<div key={index}>
						<div className="grid grid-cols-2 my-5 gap-3 border p-3 rounded-lg">
							<div>
								<label className="text-xs">Position Title</label>
								<Input
									name="title"
									onChange={(e) => {
										handleChange(e, index);
									}}
									defaultValue={item?.title}
								/>
							</div>
							<div>
								<label className="text-xs">Company Name</label>
								<Input
									name="companyName"
									onChange={(e) => {
										handleChange(e, index);
									}}
									defaultValue={item?.companyName}
								/>
							</div>
							<div>
								<label className="text-xs">City</label>
								<Input
									name="city"
									onChange={(e) => {
										handleChange(e, index);
									}}
									defaultValue={item?.city}
								/>
							</div>
							<div>
								<label className="text-xs">State</label>
								<Input
									name="state"
									onChange={(e) => {
										handleChange(e, index);
									}}
									defaultValue={item?.state}
								/>
							</div>
							<div>
								<label className="text-xs">Start Date</label>
								<Input
									type="date"
									name="startDate"
									onChange={(e) => {
										handleChange(e, index);
									}}
									defaultValue={item?.startDate}
								/>
							</div>
							<div>
								<label className="text-xs">End Date</label>
								<Input
									type="date"
									name="endDate"
									onChange={(e) => {
										handleChange(e, index);
									}}
									defaultValue={item?.endDate}
								/>
							</div>
							<div className="col-span-2">
								<RichTextEditor
									val={item.workSummary}
									onRichTextEditorChange={(event) =>
										handleRichTextEditor(event, "workSummary", index)
									}
									defaultValue={item?.workSummary}
									index={index}
								/>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="flex justify-between">
				<div className="flex gap-2">
					<Button onClick={AddNewExperience}>+ Add more experience</Button>
					<Button onClick={RemoveExperience}>- Remove</Button>
				</div>
				<Button disabled={loading} onClick={() => onSave()}>
					{loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : "Save"}
				</Button>
			</div>
		</div>
	);
};

export default Experience;
