import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { use, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import GlobalApi from "../../../../../service/GlobalApi";
import { toast } from "sonner";

const Education = () => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();
	const [educationList, setEducationList] = useState([
		{
			degree: "",
			universityName: "",
			major: "",
			startDate: "",
			endDate: "",
			description: "",
		},
	]);
	const handleChange = (e, index) => {
		const { name, value } = e.target;
		setEducationList((prevList) => {
			const updatedList = [...prevList];
			updatedList[index] = {
				...updatedList[index],
				[name]: value,
			};
			return updatedList;
		});
	};
    const AddNewEducation = () => {
        setEducationList((prevList) => [
            ...prevList,
            {
                degree: "",
                universityName: "",
                major: "",
                startDate: "",
                endDate: "",
                description: "",
            },
        ]);
    }
    const RemoveEducation = () => {
        if (educationList.length > 1) {
            setEducationList((prevList) => prevList.slice(0, -1));
        }
    }
    const [loading, setLoading] = useState(false);
    const onSave = () => {
       const data = {
        data:{
            education: educationList
        }
       }
       GlobalApi.UpdateResumeDetail(params.resumeId,data).then((res) => {
            setLoading(true);
            if (res.status === 200) {
                setLoading(false);
                console.log("Education details saved successfully:", res.data);
                toast.success("Education details saved successfully!");
            } else {
                setLoading(false);
                console.error("Error saving education details:", res);
                toast.error("Failed to save education details.");
            }
        }).catch((error) => {
            setLoading(false);
            console.error("Error saving education details:", error);
            toast.error("Failed to save education details.");
        });
        
    }
  useEffect(()=>{
    resumeInfo&&setEducationList(resumeInfo?.education)
  },[])
  useEffect(()=>{
    setResumeInfo({
      ...resumeInfo,
      education:educationList
    })
  },[educationList])
	return (
		<div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-4">
			<h2 className="font-bold text-lg">Education</h2>
			<p>Add your Education details</p>
			<div>
				{educationList &&
					educationList.map((item, index) => (
						<div>
							<div
								key={index}
								className="grid grid-cols-2 my-5 gap-3 border p-3 rounded-lg">
								<div className="col-span-2">
									<label className="text-xs">University</label>
									<input
										type="text"
										name="universityName"
										defaultValue={item?.universityName}
										onChange={(e) => handleChange(e, index)}
										className="border p-2 rounded w-full"
									/>
								</div>
								<div>
									<label className="text-xs">Degree</label>
									<input
										type="text"
										name="degree"
										defaultValue={item?.degree}
										onChange={(e) => handleChange(e, index)}
										className="border p-2 rounded w-full"
									/>
								</div>
								<div>
									<label className="text-xs">Major</label>
									<input
										type="text"
										name="major"
										defaultValue={item?.major}
										onChange={(e) => handleChange(e, index)}
										className="border p-2 rounded w-full"
									/>
								</div>
								<div>
									<label className="text-xs">Start Date</label>
									<input
										type="date"
										name="startDate"
										defaultValue={item?.startDate}
										onChange={(e) => handleChange(e, index)}
										className="border p-2 rounded w-full"
									/>
								</div>
								<div>
									<label className="text-xs">End Date</label>
									<input
										type="date"
										name="endDate"
										defaultValue={item?.endDate}
										onChange={(e) => handleChange(e, index)}
										className="border p-2 rounded w-full"
									/>
								</div>
								<div className="col-span-2">    
									<label className="text-xs">Description</label>
									<Textarea
										name="description"
										defaultValue={item?.description}
										onChange={(e) => handleChange(e, index)}
										className="border p-2 rounded w-full"></Textarea>
								</div>
							</div>
							
						</div>
					))}
			</div>
            <div className="flex justify-between">
								<div className="flex gap-2">
									<Button onClick={AddNewEducation}>
										+ Add Education
									</Button>
									<Button onClick={RemoveEducation}>- Remove</Button>
								</div>
								<Button disabled={loading} onClick={() => onSave()}>
									{loading ? (
										<LoaderCircle className="h-4 w-4 animate-spin" />
									) : (
										"Save"
									)}
									
								</Button>
							</div>
		</div>
	);
};

export default Education;
