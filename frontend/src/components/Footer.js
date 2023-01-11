const fbLink = 'https://www.facebook.com/profile.php?id=100007712806834';

const Footer = () => {
  return (
    <div style={{ backgroundColor: '#ffd500' }}>
      <div
        className="py-3 d-flex flex-column justify-content-center align-items-center"
        style={{ gap: 8 }}
      >
        <p className="text-center fw-bold mb-0">Copyright © 2023 ShopMacs</p>
        <p className="text-center mb-0" style={{ fontSize: 13 }}>
          0988113999
        </p>
        <p className="text-center mb-0" style={{ fontSize: 13 }}>
          49 Văn Hội, Bắc Từ Liêm, Hà Nội
        </p>
        <img
          src="/fb.png"
          alt="fb"
          width="16px"
          height="16px"
          style={{ cursor: 'pointer' }}
          onClick={() => window.open(fbLink)}
        />
      </div>
    </div>
  );
};

export default Footer;
