import { Link } from "@tanstack/react-router";
import arrow_back from "../assets/arrow-back.svg"
import { ModeToggle } from "./mode-toggle";

type TypeProps = {
	title?: string
	to?: string
}

export default function Header({ title, to }: TypeProps) {

	return (
		<header className="sticky top-0 z-10 bg-[#774DD6] border-b border-[#6842C2]">
			<div className="flex flex-row items-center justify-between py-4 mx-auto w-full max-w-[1120px] sm:px-4 md:px-0">
				<Link to={to}>
					<img src={arrow_back} alt="Voltar" />
				</Link>
				<div className="flex items-center gap-4">
					<h1 className="text-base text-zinc-200 font-medium">{title}</h1>
				</div>
				<div className="flex items-center gap-2">
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}
