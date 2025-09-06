import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import GlobalApi from "./../../../../../service/GlobalApi";
import  { getGeminiResponse } from "./../../../../../service/AIModal";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const prompt = 'Job title:{jobTitle}. Depending upon job title, provide summary for my resume in 4-5 lines in JSON format with field experience Level and summary with experience level for fresher, mid-level, experienced.'

const Summary = ({ enabledNext }) => {
	const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
	const [summary, setSummary] = useState();
	const [loading, setLoading] = useState(false);
	const [aiGenSummaryList, setAiGenSummaryList] = useState()
	const params = useParams();

	useEffect(() => {
		summary && setResumeInfo({ ...resumeInfo, summary: summary });
	}, [summary]);

const GenerateSummaryFromAI = async()=>{
  try {
	setLoading(true);
	const PROMPT_AI = await prompt.replace('{jobTitle}',resumeInfo.jobTitle)
	console.log('PROMPT:',PROMPT_AI);
    const response = await getGeminiResponse(PROMPT_AI);
    console.log('Gemini says:', JSON.parse(response));
	setAiGenSummaryList(JSON.parse(response))
	setLoading(false);
  } catch (err) {
    console.error('Error:', err);
	setLoading(false);
  }
}

	const onSave = (e) => {
		setLoading(true);
		e.preventDefault();
		const data = {
			data: {
				summary: summary,
			},
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
			}
		);
	};
	return (
		<div>
			<div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-4">
				<h2 className="font-bold text-lg">Summary</h2>
				<p>Add Summary for your job title</p>

				<form className="mt-7" onSubmit={onSave}>
					<div className="flex justify-between items-end">
						<label>Add Summary</label>
						<Button
							size="sm"
							type='button'
							onClick={GenerateSummaryFromAI}
							// variant='outlined' className='border-primary text-primary'
						>
						<Brain className="h-4 w-4"/>
							Generate from AI
						</Button>
					</div>
					<Textarea
						className="mt-5"
						required
						onChange={(e) => setSummary(e.target.value)}
					/>
					<div className="mt-2 flex justify-end">
						<Button disabled={loading} type="submit">
							{loading ? <LoaderCircle className="animate-spin" /> : "Save"}
						</Button>{" "}
					</div>
				</form>
			</div>
			{aiGenSummaryList && (
  <div>
    <h2 className="font-bold text-lg">Suggestions</h2>
    {(
      Array.isArray(aiGenSummaryList)
        ? aiGenSummaryList
        : aiGenSummaryList.experienceLevels ||
          aiGenSummaryList["Experience Levels"] ||
          aiGenSummaryList.ExperienceLevels ||
          []
    ).map((item, index) => (
      <div key={index} className="font-bold my-1">
        <h2>Level: {item.experienceLevel || item.experience_level}</h2>
        <p>{item.summary || item.Summary}</p>
      </div>
    ))}
  </div>
)}
		</div>
	);
};

export default Summary;
