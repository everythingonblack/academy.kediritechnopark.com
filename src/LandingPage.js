import React, { useState, useEffect } from 'react';
import ProductDetailPage from './ProductDetailPage';
import styles from './Styles.module.css';

const TechnoAcademyWebsite = () => {
    const [selectedProduct, setSelectedProduct] = React.useState({});
    const [hoveredCard, setHoveredCard] = React.useState(null);
    const [hoveredNav, setHoveredNav] = React.useState(null);

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
    const [products, setProducts] = useState([]);

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
                <img src="https://kediritechnopark.com/assets/images/kediri-technopark-logo.png"className={styles.logo}>
                </img>

                <nav className={styles.nav}>
                    {['HOME', 'COURSES', 'USER'].map((item, index) => (
                        <a
                            key={item}
                            className={`${styles.navLink} ${hoveredNav === index ? styles.navLinkHover : ''}`}
                            onMouseEnter={() => setHoveredNav(index)}
                            onMouseLeave={() => setHoveredNav(null)}
                        >
                            {item}
                        </a>
                    ))}
                </nav>

                <div className={styles.authButtons}>
                    <button className={styles.searchButton}>🔍</button>
                    <button className={styles.userButton}>👤</button>
                    <button className={styles.loginButton}>LOGIN/SIGN UP</button>
                </div>
            </header>
            <div>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <div className={styles.heroContainer}>
                        <div className={styles.heroContent}>
                            <h1 className={styles.heroTitle}>
                                Unlock The Infinite{' '}
                                <span style={{ color: '#fbbf24' }}>Possibility</span>
                            </h1>
                            <p className={styles.heroDescription}>
                                Akademi Kediri Techno Park hadir untuk menjembatani dunia
                                belajar dan dunia kerja. Dengan pendekatan praktis dan kurikulum
                                berbasis industri, kami bantu kamu siap talenta siap pakai.
                            </p>
                            <button className={styles.joinButton}>
                                JOIN FOR FREE
                            </button>
                        </div>
                    </div>
                </section>

                {/* Courses Section */}
                <section className={styles.coursesSection}>
                    <div className={styles.coursesContainer}>
                        <h2 className={styles.coursesTitle}>OUR COURSES</h2>

                        <div className={styles.coursesGrid}>
                            {products &&
                                products[0]?.name &&
                                products.map(product => (
                                    <div
                                        key={product.id}
                                        onClick={() => setSelectedProduct(product)}
                                        className={`${styles.courseCard} ${hoveredCard === product.id ? styles.courseCardHover : ''}`}
                                        onMouseEnter={() => setHoveredCard(product.id)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                    >
                                        <div className={styles.courseImage}>
                                            {product.price === 0 && (
                                                <span className={styles.courseLabel}>Free</span>
                                            )}
                                            <div></div>
                                        </div>

                                        <div className={styles.courseContent}>
                                            <h3 className={styles.courseTitle}>{product.name}</h3>
                                            <p className={styles.courseDesc}>{product.description}</p>

                                            <div className={styles.courseStats}>
                                                <div className={styles.courseStat}>
                                                    🕒 Duration:{' '}
                                                    {product.duration.days
                                                        ? `${product.duration.days} days`
                                                        : `${product.duration.seconds} seconds`}
                                                </div>
                                            </div>

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
                <section className={styles.featuresSection}>
                    <div className={styles.featuresContainer}>
                        <h2 className={styles.featuresTitle}>Mengapa Memilih Akademi Kami?</h2>
                        <p className={styles.featuresDescription}>
                            Di era digital yang terus berubah, Akademi kami hadir sebagai
                            ruang tumbuh untuk siapa saja yang ingin berkembang. Baik pelajar,
                            profesional, UMKM, hingga pemula teknologi—kami bantu kamu naik
                            level dengan materi praktis, akses mudah, dan komunitas suportif.
                        </p>

                        <div className={styles.featuresList}>
                            {features.map((feature, index) => (
                                <div key={index} className={styles.featureItem}>
                                    <div className={styles.featureIcon}>{feature.icon}</div>
                                    <div className={styles.featureContent}>
                                        <h3 className={styles.featureTitle}>{feature.title}</h3>
                                        <p className={styles.featureDescription}>
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className={styles.ctaSection}>
                    <div className={styles.ctaContainer}>
                        <div className={styles.ctaCard}>
                            <div className={styles.ctaIcon}>😊</div>
                            <h3 className={styles.ctaTitle}>Murid Daftar Disini</h3>
                            <p className={styles.ctaDescription}>
                                Ambil langkah pertama menuju karier impian atau hobi barumu
                                bersama Akademi Kami. Belajar dengan cara yang menyenangkan,
                                fleksibel, dan penuh manfaat.
                            </p>
                            <button className={styles.ctaButton}>
                                START LEARNING
                            </button>
                        </div>

                        <div className={styles.ctaCard}>
                            <div className={styles.ctaIcon}>👨‍🏫</div>
                            <h3 className={styles.ctaTitle}>Guru Daftar Disini</h3>
                            <p className={styles.ctaDescription}>
                                Ajarkan apa yang kamu cintai. Akademi kami memberikan semua alat
                                dan dukungan yang kamu butuhkan untuk membuat kursusmu sendiri.
                            </p>
                            <button className={styles.ctaButton}>
                                START TEACHING
                            </button>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className={styles.footer}>
                    <div className={styles.footerContent}>
                        <p className={styles.footerText}>
                            Created by Academy Kediri Techno Park
                        </p>

                        <div className={styles.socialLinks}>
                            <a href='#' className={styles.socialLink}>📷</a>
                            <a href='#' className={styles.socialLink}>📱</a>
                            <a href='#' className={styles.socialLink}>📧</a>
                        </div>
                    </div>
                </footer>
                {Object.keys(selectedProduct).length > 0 && (
                    <div
                        className={styles.modal}
                        onClick={() => setSelectedProduct({})}
                    >
                        <div
                            className={styles.modalBody}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ProductDetailPage product={selectedProduct} onClose={() => setSelectedProduct({})} />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default TechnoAcademyWebsite;