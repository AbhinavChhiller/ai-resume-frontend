import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useContext, useState } from "react";
import Editor, {
	BtnBold,
	BtnItalic,
	BtnUnderline,
	BtnStrikeThrough,
	BtnUndo,
	BtnRedo,
	BtnNumberedList,
	BtnBulletList,
	BtnLink,
	BtnClearFormatting,
	BtnStyles,
	Toolbar,
	Separator,
	HtmlButton,
} from "react-simple-wysiwyg";
import { getGeminiResponse } from "./../../../../../service/AIModal";
import { toast } from "sonner";

const PROMPT =
	// "position title :{positionTitle}.Depending upon posotion title, give me 5-7 bullet points for my experience in resume, give me result is HTML format. Result should be pointed list with bullet points";
	"Position Title: {positionTitle}. Based on this position title, generate 5-7 strong bullet points describing relevant professional experience for a resume. Return the result in HTML format as a bulleted list (<ul><li>...</li></ul>).Provide the result in string wihout using any array or object format. The result should be a string with bullet points in HTML format, like <ul><li>...</li></ul>.";
const RichTextEditor = ({ val, onRichTextEditorChange, index,defaultValue }) => {
	const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
	const [loading, setLoading] = useState(false);

	const GenerateSummaryFromAI = async () => {
		setLoading(true);
		try {
			if (!resumeInfo?.experience[index]?.title) {
				toast.error("Position title is required to generate summary from AI.");
				return;
			}
			const PROMPT_AI = PROMPT.replace(
				"{positionTitle}",
				resumeInfo?.experience[index]?.title
			);
			const response = await getGeminiResponse(PROMPT_AI);
			const result = response.replace("[", "").replace("]", "");
			onRichTextEditorChange({ target: { value: result } }); // update parent
		} catch (error) {
			console.error("Error generating summary from AI:", error);
			toast.error("Failed to generate summary from AI.");
		} finally {
			setLoading(false);
		}
	};

	function onChange(e) {
		onRichTextEditorChange(e); // update parent
	}

	return (
		<div>
			<div className="flex  justify-between my-2">
				<label className="text-xs">Summary</label>
				<Button
					size="sm"
					className="flex gap-2"
					onClick={GenerateSummaryFromAI}>
					{" "}
					<Brain className="h-4 w-4" />
					{loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
					Generate from AI
				</Button>
			</div>
			<Editor value={val} onChange={onChange}>
				<Toolbar>
					<BtnUndo />
					<BtnRedo />
					<Separator />
					<BtnBold />
					<BtnItalic />
					<BtnUnderline />
					<BtnStrikeThrough />
					<Separator />
					<BtnNumberedList />
					<BtnBulletList />
					<Separator />
					<BtnLink />
					<BtnClearFormatting />
					<HtmlButton />
					<Separator />
					<BtnStyles />
				</Toolbar>
			</Editor>
		</div>
	);
};

export default RichTextEditor;
