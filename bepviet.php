<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tinh Hoa Bếp Việt | Công Thức Món Ngon</title>
    <link rel="stylesheet" href="vn.css"> 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
</head>
<body>
      <div id="scroll-progress"></div>
    <?php include 'header.php'; ?>
    <main>
        <section class="banner-parallax" id="banner-parallax">
            <div class="banner-overlay">
                <h1 class="banner-title">TINH HOA BẾP VIỆT 🍲</h1>
                <p class="banner-subtitle">Bí quyết, gia vị, và công thức Phở/Bún chuẩn vị Quê Nhà.</p>
                <a href="#featured-video" class="btn-primary-scrolldown">Xem Công Thức Mới Nhất 👇</a>
            </div>
        </section>

        <section class="content-section" id="featured-video">
            <h2>🍜 Công Thức Đặc Biệt: Phở Bò Chuẩn Vị Toronto 🍜</h2>
            <div class="video-container">
                <iframe 
                    width="100%" 
                    height="500" 
                    src="https://www.youtube.com/embed/ninhhuynh" 
                    frameborder="0" 
                    allowfullscreen>
                </iframe>
            </div>
            <p class="video-desc">Hướng dẫn chi tiết từ A-Z cách nấu nước lèo Phở đậm đà bằng các loại gia vị khô có sẵn tại **VIỆT CANADA STORE**.</p>
        </section>
        
        <section class="content-section recipe-grid-section">
            <h2>📖 Các Món Ăn Dễ Làm Từ Gia Vị Việt 🌶️</h2>
            
            <div class="recipe-grid">
                <div class="recipe-card">
                    <img src="placeholder-bunbo.jpg" alt="Bún Bò Huế" class="recipe-img">
                    <div class="card-body">
                        <h3 class="recipe-name">Bún Bò Huế Tự Sôi Nhanh</h3>
                        <p>Chỉ 20 phút với **Gói Gia Vị Bún Bò** và **Nước Mắm**.</p>
                        <a href="#bunbo" class="btn-recipe">Xem chi tiết & Mua Nguyên Liệu</a>
                    </div>
                </div>
                
                <div class="recipe-card">
                    <img src="placeholder-banhtrang.jpg" alt="Bánh Tráng Trộn" class="recipe-img">
                    <div class="card-body">
                        <h3 class="recipe-name">Bánh Tráng Trộn Chuẩn Vị Sài Gòn</h3>
                        <p>Dùng **Bánh Tráng Tây Ninh** và **Tương Ớt** siêu cay.</p>
                        <a href="#banhtrang" class="btn-recipe">Xem chi tiết & Mua Nguyên Liệu</a>
                    </div>
                </div>

                <div class="recipe-card">
                    <img src="placeholder-thitnuong.jpg" alt="Thịt Nướng" class="recipe-img">
                    <div class="card-body">
                        <h3 class="recipe-name">Thịt Nướng Chả Giò Cuối Tuần</h3>
                        <p>Món nướng đơn giản với **Gia vị Ướp Sẵn**.</p>
                        <a href="#thitnuong" class="btn-recipe">Xem chi tiết & Mua Nguyên Liệu</a>
                    </div>
                </div>
                
            </div>
        </section>

    </main>
    
    <?php include 'footer.php'; ?>
    <script src="app.js"></script>
</body>
</html>