import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className='w-100%'>
            <footer className="d-flex flex-wrap justify-content-center align-text-center py-3 border-top" style={{ textAlign: 'center' }}>
                <div className="col-md-4 d-flex align-items-center">
                    <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                        <svg className="bi" width="30" height="24"><use xlinkHref="#bootstrap"></use></svg>
                    </Link>
                    <p className="mx-auto">© 2024 Disgraphia Prediction Model, Inc</p>
                </div>
                
            </footer>
        </div>
    );
}

export default Footer;
