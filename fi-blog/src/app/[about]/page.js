/*Components*/
import { Navbar } from "../components";
import { AboutMeCard } from "../components";

export default function About() {
  return (
    <div>
      <Navbar/>
      <div className="flex-a-j-center height70">
        <AboutMeCard/>
      </div>
    </div>
  );
}
