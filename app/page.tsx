
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Pricing from "./components/Pricing";
import Services from "./components/Services";

export default async function page() {


	return (
		<>
			<header>
				<Navbar />
			</header>
			<main className="w-full flex flex-col justify-center items-center mt-20 md:mt-0">
				<Hero />
				<hr className=" w-full"/>
				<Services />
				<hr className="w-full mt-10"/>
				<Pricing />
			</main>
			<footer>
				<Footer />
			</footer>
		</>
	);
}
