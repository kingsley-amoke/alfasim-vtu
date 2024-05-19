import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./Accordion";

export default function FAQ({
	question,
	answer,
}: {
	question: string;
	answer: string;
}) {
	return (
		<>
			<Accordion type="single" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger>{`${question}?`}</AccordionTrigger>
					<AccordionContent>{answer}</AccordionContent>
				</AccordionItem>
			</Accordion>
		</>
	);
}
