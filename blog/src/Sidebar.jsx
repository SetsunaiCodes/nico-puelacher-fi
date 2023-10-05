
export default function Sidebar(){

    return(
        <div className="flex-col-a-center-j-start">
            <div className="profile-card flex-a-j-center">
                <img src="/JAKEPB.jpg"/>
                <div>
                    <p>Nico Puelacher</p>
                    <p>Spielentwickler</p>
                </div>
            </div>

            <h1>Quick Links</h1>
            <div className="divider-hor"></div>
            <ul>
                <li><a href="">Artikel 1</a></li>
                <li><a href="">Artikel 2</a></li>
                <li><a href="">Artikel 3</a></li>
                <li><a href="">Artikel 4</a></li>

            </ul>
        </div>
    )

}