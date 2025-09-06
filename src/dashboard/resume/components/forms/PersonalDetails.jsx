import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";

const PersonalDetails = ({ enabledNext }) => {
	const params = useParams();
	const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
	const [formData, setFormData] = useState({});
	const [loading, setLoading] = useState(false);

	const handleInputChange = (e) => {
		enabledNext(false);
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
		setResumeInfo({
			...resumeInfo,
			[name]: value,
		});
	};
	useEffect(()=>{console.log('personal params:',params);},[])
	const onSave = (e) => {
		setLoading(true);
		e.preventDefault();
		const data = {
			data: formData,
		};
		GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
			(res) => {
				console.log(res);
				enabledNext(true);
				setLoading(false);
				toast("Details Updated");
			},
			(error) => {
				setLoading(false);
				console.log('error in personal save:',error);
			}
		);
		 enabledNext(true);
	};
	return (
		<div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-4">
			<h2 className="font-bold text-lg">PersonalDetails</h2>
			<p>Get Started with the basic information</p>
			<form onSubmit={onSave}>
				<div className="grid grid-cols-2 mt-5 gap-3">
					<div>
						<label className="text-sm">First Name</label>
						<Input
							name="firstName"
							defaultValue={resumeInfo?.firstName}
							required
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label className="text-sm">Last Name</label>
						<Input
							name="lastName"
							required
							defaultValue={resumeInfo?.lastName}
							onChange={handleInputChange}
						/>
					</div>
					<div className="col-span-2">
						<label className="text-sm">Job Title</label>
						<Input
							name="jobTitle"
							required
							defaultValue={resumeInfo?.jobTitle}
							onChange={handleInputChange}
						/>
					</div>
					<div className="col-span-2">
						<label className="text-sm">Address</label>
						<Input
							name="address"
							required
							defaultValue={resumeInfo?.address}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label className="text-sm">Phone</label>
						<Input
							name="phone"
							required
							defaultValue={resumeInfo?.phone}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label className="text-sm">Email</label>
						<Input
							name="email"
							required
							defaultValue={resumeInfo?.email}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="mt-3 flex justify-end">
					<Button disabled={loading} type="submit">
						{loading ? <LoaderCircle className="animate-spin" /> : "Save"}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default PersonalDetails;
