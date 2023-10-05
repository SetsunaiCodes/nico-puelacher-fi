
export default function Navbar(){

    return(
        <nav className="flex-a-center-j-between">
            <p>Nico Puelacher.</p>

            <div className="flex">
                <ul>
                    <li><a href="">Home</a></li>
                    <li><a href="">Planning</a></li>
                    <li><a href="">Developing</a></li>
                    <li><a href="">Polish</a></li>
                </ul>
                <div>
                    <button>Repo</button>
                    <button>Meine Seite</button>
                </div>
            </div>
        </nav>
    )
}