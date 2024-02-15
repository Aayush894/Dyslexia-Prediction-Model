

export default function Corousel() {
    return (
        <div>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
               
                <div className="carousel-inner">
                    <div className="carousel-caption" style={{zIndex:"10"}}>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-success text-white" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="carousel-item">
                        <img src="../assets/disgraphia1.png" className="rounded mx-auto d-block w-75 h-75 img-thumbnail img-fluid" style={{filter: "brightness(50%)", height: "120px", objectFit: "fill"}} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="../assets/disgraphia2.png" className="rounded mx-auto d-block w-75 h-75 img-thumbnail img-fluid" style={{filter: "brightness(50%)" , height: "120px", objectFit: "fill"}} alt="..." />
                    </div>
                    <div className="carousel-item active">
                        <img src="../assets/disgraphia3.png" className="rounded mx-auto d-block w-75 h-75 img-thumbnail img-fluid" style={{filter: "brightness(50%)", height: "120px", objectFit: "fill"}} alt="..." />
                    </div>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
