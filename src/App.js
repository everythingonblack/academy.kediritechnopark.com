import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import CoursePage from './CoursePage';
import { useState, useEffect } from 'react';
import styles from './Styles.module.css';
import ProductDetailPage from './ProductDetailPage';
import Login from './Login';

// Fungsi simple untuk parsing token JWT dan mengembalikan payload JSON
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

function AppWrapper() {
  const [hoveredNav, setHoveredNav] = useState(null);
  const [username, setUsername] = useState(null);
  const [showedModal, setShowedModal] = useState(null);
  
  const [postLoginAction, setPostLoginAction] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState({});

  const navigate = useNavigate();

  const scrollToCourse = () => {
    const courseSection = document.getElementById('courses');
    if (courseSection) {
      courseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

    useEffect(() => {
        // Ambil token dari cookies
        const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
        if (match) {
            const token = match[2];

            fetch('https://bot.kediritechnopark.com/webhook/user-dev/data', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token

                },
            })
                .then(res => res.json())
                .then(data => {

                    if (data && data[0] && data[0].token) {
                        // Update token with data[0].token
                        document.cookie = `token=${data[0].token}; path=/`;
                    } else {
                        console.warn('Token tidak ditemukan dalam data.');
                    }
                })
                .catch(err => console.error('Fetch error:', err));

            const payload = parseJwt(token);
            if (payload && payload.username) {
                setUsername(payload.username);
            }
        }
    }, []);

  return (
    <div className="App">
      <header className={styles.header}>
        <img src="./kediri-technopark-logo.png" className={styles.logo} alt="Logo" />

        <nav className={styles.nav}>
          <a
            className={`${styles.navLink} ${hoveredNav === 1 ? styles.navLinkHover : ''}`}
            onMouseEnter={() => setHoveredNav(1)}
            onMouseLeave={() => setHoveredNav(null)}
            onClick={() => navigate('/')}
          >
            HOME
          </a>
          <a
            className={`${styles.navLink} ${hoveredNav === 2 ? styles.navLinkHover : ''}`}
            onMouseEnter={() => setHoveredNav(2)}
            onMouseLeave={() => setHoveredNav(null)}
            onClick={() => {
              if (username == null) {
                scrollToCourse();
              } else {
                navigate('/courses');
              }
            }}
          >
            {username == null ? "COURSES" : "MY COURSES"}
          </a>
          <a
            className={`${styles.navLink} ${hoveredNav === 3 ? styles.navLinkHover : ''}`}
            onMouseEnter={() => setHoveredNav(3)}
            onMouseLeave={() => setHoveredNav(null)}
          >
            USER
          </a>
        </nav>

        <div className={styles.authButtons}>
          {username ? (
            <span style={{ color: '#2563eb', fontWeight: '600' }}>
              Halo, {username}
            </span>
          ) : (
            <button className={styles.loginButton} onClick={() => setShowedModal('login')}>
              LOGIN
            </button>
          )}
        </div>
      </header>

      <Routes>
        <Route path="/" element={<LandingPage setShowedModal={setShowedModal} setSelectedProduct={setSelectedProduct}/>} />
        <Route path="/courses" element={<CoursePage setShowedModal={setShowedModal} showedModal={setShowedModal} />} />
      </Routes>
      
            {/* Unified Modal */}
            {showedModal && (
                <div
                    className={styles.modal}
                    onClick={() => {
                        setShowedModal(null);
                    }}
                >
                    <div
                        className={styles.modalBody}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {showedModal === 'product' && (
                            <ProductDetailPage
                                setPostLoginAction={setPostLoginAction}
                                setShowedModal={setShowedModal}
                                product={selectedProduct}
                                onClose={() => {
                                    setShowedModal(null);
                                }}
                            />
                        )}
                        {showedModal === 'login' && (
                            <Login postLoginAction={postLoginAction} setPostLoginAction={setPostLoginAction} onClose={() => setShowedModal(null)} />
                        )}
                    </div>
                </div>
            )}
    </div>
  );
}

// Wrap AppWrapper in Router
function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
