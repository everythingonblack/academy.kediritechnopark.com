import React, { useState, useEffect,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductDetailPage from './ProductDetailPage';
import Login from './Login';
import styles from './Styles.module.css';

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

const TechnoAcademyWebsite = () => {
    const navigate = useNavigate();
    const [postLoginAction, setPostLoginAction] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [hoveredCard, setHoveredCard] = useState(null);
    const [hoveredNav, setHoveredNav] = useState(null);
    const [showedModal, setShowedModal] = useState(null); // 'product' | 'login' | null
    const [products, setProducts] = useState([]);

    const [username, setUsername] = useState(null);

  const courseSectionRef = useRef(null);

  const scrollToCourse = () => {
    courseSectionRef.current?.scrollIntoView({ behavior: "smooth" });
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

    const features = [
        {
            icon: '🌐',
            title: 'Belajar Langsung dari Mentor Terbaik',
            description:
                'Kursus kami dirancang dan dipandu oleh para praktisi, pengajar, dan mentor yang ahli di bidangnya—mulai dari bisnis digital, teknologi, desain, hingga kecerdasan buatan. Semua materi disemakan dengan bahasa yang sederhana, mudah dipahami, dan langsung bisa dipraktikkan.',
        },
        {
            icon: '⏰',
            title: 'Fleksibel Sesuai Gaya Hidupmu',
            description:
                'Sibuk kerja? Urus anak? Atau lagi nyantai belajar Teknilog, di Akademi ini kamu bisa belajar kapan saja di mana saja, tanpa terikat waktu. Semua kursus kami bisa diakses ulang dan kamu bebas atur ritme belajar mu sendiri. Bebas lekukan, makamali ngatif.',
        },
        {
            icon: '⚡',
            title: 'Belajar Cepat, Dampak Nyata',
            description:
                'Kami percaya proses belajar tidak harus lama lama! Dengan pendekatan yang tepat, kamu bisa menguasai keterampilan baru hanya dalam hitungan minggu—buken bulan! Mulai dari belajar desain, digital marketing, AI, hingga manajemen usaha, semua bisa kamu kuasai dengan cepat dan tepat guna.',
        },
    ];

    useEffect(() => {
        fetch('https://bot.kediritechnopark.com/webhook/store-dev/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type: 'course' }),
        })
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error('Fetch error:', err));
    }, []);

    return (
        <div style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            {/* Header */}

            <header className={styles.header}>
                <img src="./kediri-technopark-logo.png" className={styles.logo} alt="Logo" />

                <nav className={styles.nav}>
                    <a
                            className={`${styles.navLink} ${hoveredNav === 1 ? styles.navLinkHover : ''}`}
                            onMouseEnter={() => setHoveredNav(1)}
                            onMouseLeave={() => setHoveredNav(null)}
                            onClick={() => {
                                navigate('/');
                                
                            }}
                        >
                            HOME
                        </a><a
                            className={`${styles.navLink} ${hoveredNav === 3 ? styles.navLinkHover : ''}`}
                            onMouseEnter={() => setHoveredNav(2)}
                            onMouseLeave={() => setHoveredNav(null)}
                            onClick={() => {
                                if (username == null) {
                                    scrollToCourse();
                                }
                                else {
                                    navigate('/courses');
                                }
                            }}
                        >
                            COURSES
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

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContainer}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>
                            Unlock The Infinite <span style={{ color: '#fbbf24' }}>Possibility</span>
                        </h1>
                        <p className={styles.heroDescription}>
                            Akademi Kediri Techno Park hadir untuk menjembatani dunia belajar dan dunia kerja.
                            Dengan pendekatan praktis dan kurikulum berbasis industri, kami bantu kamu siap talenta siap pakai.
                        </p>
                        <button className={styles.joinButton}>JOIN FOR FREE</button>
                    </div>
                </div>
            </section>

            {/* Courses Section */}
            <section className={styles.Section}>
                <div  className={styles.coursesContainer}>
                    <h2 ref={courseSectionRef} className={styles.coursesTitle}>OUR COURSES</h2>
                    <div className={styles.coursesGrid}>
                        {products &&
                            products[0]?.name &&
                            products.map(product => (
                                <div
                                    key={product.id}
                                    className={`${styles.courseCard} ${hoveredCard === product.id ? styles.courseCardHover : ''}`}
                                    onClick={() => {
                                        setSelectedProduct(product);
                                        setShowedModal('product');
                                    }}
                                    onMouseEnter={() => setHoveredCard(product.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    <div className={styles.courseImage}>
                                        {product.price === 0 && (
                                            <span className={styles.courseLabel}>Free</span>
                                        )}
                                    </div>
                                    <div className={styles.courseContent}>
                                        <h3 className={styles.courseTitle}>{product.name}</h3>
                                        <p className={styles.courseDesc}>{product.description}</p>
                                        <div className={styles.coursePrice}>
                                            <span
                                                className={
                                                    product.price === 0
                                                        ? styles.freePrice
                                                        : styles.currentPrice
                                                }
                                            >
                                                {product.price === 0
                                                    ? 'Free'
                                                    : `Rp ${product.price.toLocaleString('id-ID')}`}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={styles.Section}>
                <div className={styles.featuresContainer}>
                    <h2 className={styles.featuresTitle}>Mengapa Memilih Akademi Kami?</h2>
                    <p className={styles.featuresDescription}>
                        Di era digital yang terus berubah, Akademi kami hadir sebagai ruang tumbuh untuk siapa saja yang ingin berkembang.
                        Baik pelajar, profesional, UMKM, hingga pemula teknologi—kami bantu kamu naik level dengan materi praktis,
                        akses mudah, dan komunitas suportif.
                    </p>
                    <div className={styles.featuresList}>
                        {features.map((feature, index) => (
                            <div key={index} className={styles.featureItem}>
                                <div className={styles.featureIcon}>{feature.icon}</div>
                                <div className={styles.featureContent}>
                                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                                    <p className={styles.featureDescription}>{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.Section}>
                <div className={styles.ctaContainer}>
                    <div className={styles.ctaCard}>
                        <div>
                            <div className={styles.ctaIcon}>😊</div>
                            <h3 className={styles.ctaTitle}>Murid Daftar Disini</h3>
                            <p className={styles.ctaDescription}>
                                Ambil langkah pertama menuju karier impian atau hobi barumu bersama Akademi Kami.
                                Belajar dengan cara yang menyenangkan, fleksibel, dan penuh manfaat.
                            </p>
                        </div>
                        <button className={styles.ctaButton}>START LEARNING</button>
                    </div>

                    <div className={styles.ctaCard}>
                        <div>
                            <div className={styles.ctaIcon}>👨‍🏫</div>
                            <h3 className={styles.ctaTitle}>Guru Daftar Disini</h3>
                            <p className={styles.ctaDescription}>
                                Ajarkan apa yang kamu cintai. Akademi kami memberikan semua alat
                                dan dukungan yang kamu butuhkan untuk membuat kursusmu sendiri.
                            </p>
                        </div>
                        <button className={styles.ctaButton}>START TEACHING</button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <p className={styles.footerText}>Created by Academy Kediri Techno Park</p>
                    <div className={styles.socialLinks}>
                        <a href="#" className={styles.socialLink}>📷</a>
                        <a href="#" className={styles.socialLink}>📱</a>
                        <a href="#" className={styles.socialLink}>📧</a>
                    </div>
                </div>
            </footer>

            {/* Unified Modal */}
            {showedModal && (
                <div
                    className={styles.modal}
                    onClick={() => {
                        setShowedModal(null);
                        setSelectedProduct({});
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
                                    setSelectedProduct({});
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
};

export default TechnoAcademyWebsite;
