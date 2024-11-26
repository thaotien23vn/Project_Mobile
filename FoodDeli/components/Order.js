import React from 'react';

const Header = () => {
  return (
    <div style={styles.headerContainer}>
      <h1 style={styles.restaurantName}>SuShi Kodomo - Trường Chinh</h1>
      <div style={styles.ratingContainer}>
        <img 
          src="https://placeholder.pics/svg/20x20" 
          alt="star icon" 
          style={styles.starIcon}
        />
        <span style={styles.ratingText}>4.5/5.0 (212 đánh giá)</span>
      </div>
      <span style={styles.distanceText}>7km</span>
    </div>
  );
};

const PromotionSection = () => {
  return (
    <div style={styles.promotionSection}>
      <h2 style={styles.promotionTitle}>Ưu đãi cho bạn</h2>
      <div style={styles.offers}>
        <div style={styles.offer}>
          <img src="https://placeholder.pics/svg/300x200" alt="Offer 1" />
          <p style={styles.offerDescription}>Home PayLater - Giảm 15%, thả...</p>
        </div>
        <div style={styles.offer}>
          <img src="https://placeholder.pics/svg/300x200" alt="Offer 2" />
          <p style={styles.offerDescription}>Home PayLater - Ưu đãi 50%, tối đa...</p>
        </div>
      </div>
      <a href="#" style={styles.viewAll}>Xem tất cả (5)</a>
    </div>
  );
};

const MenuItem = ({ image, name, description, price, sold }) => {
  return (
    <div style={styles.menuItem}>
      <img src={image} alt={name} style={styles.menuItemImage} />
      <div style={styles.menuItemDetails}>
        <h2 style={styles.menuItemTitle}>{name}</h2>
        <p style={styles.menuItemDescription}>{description}</p>
        <div style={styles.menuItemFooter}>
          <span style={styles.menuItemPrice}>{price}</span>
          <span style={styles.menuItemSold}>{sold}</span>
        </div>
      </div>
    </div>
  );
};

const Order = () => {
  return (
    <div style={styles.appContainer}>
      <Header />
      <PromotionSection />
      <div style={styles.menuSection}>
        <h2 style={styles.menuTitle}>Combo Sashimi</h2>
        <MenuItem 
          image="https://placeholder.pics/svg/100x100" 
          name="Sashimi Combo 8" 
          description="Sashimi combo 8 là sự kết hợp mới lạ 2 miếng (topp)"
          price="138.000đ"
          sold="Đã bán 100+"
        />
        <MenuItem 
          image="https://placeholder.pics/svg/100x100" 
          name="Sashimi Combo 8" 
          description="Sashimi combo 8 là sự kết hợp mới lạ 2 miếng (topp)"
          price="138.000đ"
          sold="Đã bán 100+"
        />
      </div>
    </div>
  );
};

const styles = {
  appContainer: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '400px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '10px',
    borderBottom: '1px solid #ccc',
  },
  restaurantName: {
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '16.94px',
    color: '#000000',
    margin: '0',
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '5px',
  },
  starIcon: {
    width: '20px',
    height: '20px',
    marginRight: '5px',
  },
  ratingText: {
    fontSize: '14px',
    color: '#555',
  },
  distanceText: {
    fontSize: '12px',
    color: '#777',
    marginTop: '5px',
  },
  promotionSection: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    textAlign: 'left',
  },
  promotionTitle: {
    fontFamily: 'Cairo, sans-serif',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#000000',
    marginBottom: '10px',
  },
  offers: {
    display: 'flex',
    gap: '10px',
  },
  offer: {
    backgroundColor: '#ffffff',
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '5px',
    textAlign: 'center',
  },
  offerDescription: {
    fontSize: '12px',
    color: '#333',
    marginTop: '5px',
  },
  viewAll: {
    display: 'block',
    marginTop: '20px',
    textAlign: 'right',
    color: '#007bff',
    textDecoration: 'none',
  },
  menuSection: {
    padding: '20px',
  },
  menuTitle: {
    fontSize: '16px',
    marginBottom: '10px',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  menuItemImage: {
    width: '100px',
    height: '100px',
    borderRadius: '5px',
    marginRight: '10px',
  },
  menuItemDetails: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: '14px',
    margin: '0 0 5px 0',
  },
  menuItemDescription: {
    fontSize: '12px',
    color: '#666',
    margin: '0 0 5px 0',
  },
  menuItemFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemPrice: {
    fontSize: '14px',
    color: '#000',
  },
  menuItemSold: {
    fontSize: '12px',
    color: '#999',
  },
};

export default Order;
