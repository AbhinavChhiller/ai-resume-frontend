import React, { use, useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../../service/GlobalApi";
import { useParams } from "react-router";
import { toast } from "sonner";

const Skills = () => {
    // 	const params = useParams();

	// const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
	// const [loading, setLoading] = useState(false);
	// const [skillsList, setSkillsList] = useState([
	// 	{
	// 		name: "",
	// 		rating: 0,
	// 	},
	// ]);
	// const AddNewSkills = () => {
	// 	setSkillsList([
	// 		...skillsList,
	// 		{
	// 			name: "",
	// 			rating: 0,
	// 		},
	// 	]);
	// };
	// const RemoveSkills = () => {
	// 	setSkillsList((skillsList) => skillsList.slice(0, -1));
	// };

	// const onSave = () => {
	// 	setLoading(true);
	// 	const data = {
    //         data: {
    //             skills: skillsList.map(({ id, ...rest }) => rest)			,
    //         },
    //     };
    //     GlobalApi.UpdateResumeDetail(params.resumeId, data)
    //         .then((res) => {    
                
    //             setLoading(false);
    //             setResumeInfo((prev) => ({
    //                 ...prev,
    //                 skills: skillsList,
    //             }));
    //             toast.success("Skills updated successfully");
    //         })
    //         .catch((err) => {
    //             setLoading(false);
    //             console.error("Error updating skills:", err);
    //             toast.error("Failed to update skills");
    //         }
    //     );
	// };

	// const hanldeChange = (index, name, value) => {
	// 	const newSkills = [...skillsList];
	// 	newSkills[index][name] = value;
	// 	setSkillsList(newSkills);
	// };
	// useEffect(() => {
	// 	setResumeInfo((prev) => ({
	// 		...prev,
	// 		skills: skillsList,
	// 	}));
	// }, [skillsList]);
    // useEffect(() => {
    //     resumeInfo?.skills?.length > 0 &&
    //         setSkillsList(resumeInfo?.skills);
    // }, [resumeInfo]);
	    const [skillsList,setSkillsList]=useState([{
        name:'',
        rating:0
    }])
    const {resumeId}=useParams();

    const [loading,setLoading]=useState(false);
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
   
    useEffect(()=>{
        resumeInfo&&setSkillsList(resumeInfo?.skills)
      },[])
   
    const handleChange=(index,name,value)=>{
        const newEntries=skillsList.slice();
      
        newEntries[index][name]=value;
        setSkillsList(newEntries);
    }

    const AddNewSkills=()=>{
        setSkillsList([...skillsList,{
            name:'',
        rating:0 
        }])
    }
    const RemoveSkills=()=>{
        setSkillsList(skillsList=>skillsList.slice(0,-1))
    }

    const onSave=()=>{

        setLoading(true);
        const data={
            data:{
                skills:skillsList.map(({ id, ...rest }) => rest)
            }
        }

        GlobalApi.UpdateResumeDetail(resumeId,data)
        .then(resp=>{
            console.log(resp);
            setLoading(false);
            toast('Details updated !')
        },(error)=>{
            setLoading(false);
            toast('Server Error, Try again!')
        })
    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            skills:skillsList
        })
    },[skillsList])
	return (
		<div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-4">
			<h2 className="font-bold text-lg">Skills</h2>
			<p>Add your top professional Skills</p>
			<div>
				{skillsList.map((skill, index) => (
					<div
						key={index}
						className="flex justify-between border p-3 rounded-lg my-3">
						<div>
							<label className="text-xs">Name</label>
							<input
								type="text"
								name="name"
								defaultValue={skill?.name}
								onChange={(e) => hanldeChange(index, "name", e.target.value)}
								className="w-full p-2 border rounded"
							/>
						</div>
						<Rating
							style={{ maxWidth: 120 }}
							defaultValue={skill?.rating}
							onChange={(v) => hanldeChange(index, "rating", v)}
						/>
					</div>
				))}
				<div className="flex justify-between">
					<div className="flex gap-2">
						<Button onClick={AddNewSkills}>+ Add more skills</Button>
						<Button onClick={RemoveSkills}>- Remove</Button>
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
		</div>
	);
};

export default Skills;
