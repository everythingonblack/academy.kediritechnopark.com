import React, { useEffect, useState } from 'react';

const ProductDetail = ({ product, onClose }) => {

    const [inCart, setInCart] = useState(false);

    useEffect(() => {
        const existingCookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('itemsId='));
        let items = [];
        if (existingCookie) {
            try {
                const value = decodeURIComponent(existingCookie.split('=')[1]);
                items = JSON.parse(value);
                if (!Array.isArray(items)) items = [];
            } catch (e) {
                items = [];
            }
        }
        setInCart(items.includes(product.id));
    }, [product.id]);



  const onSetCart = () => {
    const existingCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('itemsId='));

    let items = [];

    if (existingCookie) {
      try {
        const value = decodeURIComponent(existingCookie.split('=')[1]);
        items = JSON.parse(value);
        if (!Array.isArray(items)) items = [];
      } catch (e) {
        items = [];
      }
    }

    let updatedItems;
    if (items.includes(product.id)) {
      updatedItems = items.filter(id => id !== product.id); // remove
    } else {
      updatedItems = [...items, product.id]; // add
    }

    document.cookie = `itemsId=${JSON.stringify(updatedItems)}; path=/; max-age=${7 * 24 * 60 * 60}`;
    onClose();
  };


    const onCheckout = () => {
        // Ambil token dari cookie
        const tokenCookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('token='));

        const token = tokenCookie ? tokenCookie.split('=')[1] : '';

        // Redirect ke URL dengan token
        window.location.href = `http://localhost:3000/?token=${token}`;
    };

    const styles = {
        container: {
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '2rem',
            maxWidth: '700px',
            margin: '0 auto',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
            fontFamily: 'Inter, system-ui, sans-serif',
        },
        image: {
            width: '100%',
            height: '300px',
            backgroundColor: '#e2e8f0',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b',
            fontSize: '1rem',
            marginBottom: '1.5rem',
        },
        title: {
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: '#1e293b',
            marginBottom: '1rem',
        },
        description: {
            fontSize: '1rem',
            color: '#64748b',
            marginBottom: '1.5rem',
            lineHeight: '1.6',
        },
        price: {
            fontSize: '1.4rem',
            fontWeight: 'bold',
            color: product.price === 0 ? '#059669' : '#2563eb',
            marginBottom: '1.5rem',
        },
        buttonGroup: {
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '1rem',
        },
        button: {
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            fontSize: '0.95rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
        },
        addToCartButton: {
            backgroundColor: '#fbbf24',
            color: '#1e293b',
        },
        checkoutButton: {
            backgroundColor: '#2563eb',
            color: 'white',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.image}>
                📦 {/* Placeholder, ganti dengan gambar jika ada */}
            </div>
            <h2 style={styles.title}>{product.name}</h2>
            <p style={styles.description}>{product.description}</p>
            <div style={styles.buttonGroup}>
                <div style={styles.price}>
                    {product.price === 0
                        ? 'Free'
                        : `Rp ${parseInt(product.price).toLocaleString('id-ID')}`}
                </div>
                <button
                    style={{ ...styles.button, ...styles.addToCartButton }}
                    onClick={onSetCart}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#facc15')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#fbbf24')}
                >
                    {inCart ? 'Hapus dari Keranjang' : 'Tambah ke Keranjang'}
                </button>
                <button
                    style={{ ...styles.button, ...styles.checkoutButton }}
                    onClick={onCheckout}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#1d4ed8')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#2563eb')}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
