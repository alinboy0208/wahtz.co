document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. LOGIC CHUNG (Menu Mobile và Mega Menu Hover) --- */
    const menuIcon = document.querySelector('.menu-icon');
    const navbar = document.querySelector('.navbar');
    const dropdown = document.querySelector('.dropdown');
    const megaMenu = document.querySelector('.mega-menu');
    let timeout; 
    
    // Logic Mobile Menu
    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });
    }
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
            }
        });
    });

    // Logic Mega Menu Hover
    if (dropdown && megaMenu) {
        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(timeout); 
            megaMenu.classList.add('open');
        });
        dropdown.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => { megaMenu.classList.remove('open'); }, 200); 
        });
        megaMenu.addEventListener('mouseenter', () => {
            clearTimeout(timeout); 
        });
        megaMenu.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => { megaMenu.classList.remove('open'); }, 200);
        });
    }

    /* --- 2. LOGIC CHO PRODUCT CAROUSEL (Slider) --- */
    const listWrapper = document.querySelector('.product-list-wrapper');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const scrollAmount = 840; 

    if (rightArrow && listWrapper) {
        rightArrow.addEventListener('click', () => {
            listWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    if (leftArrow && listWrapper) {
        leftArrow.addEventListener('click', () => {
            listWrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }

    /* --- 3. LOGIC CHO TRANG SẢN PHẨM: TƯƠNG TÁC GIỎ HÀNG --- */
    const notification = document.getElementById('add-to-cart-notification');

    // Xử lý tăng giảm số lượng
    document.querySelectorAll('.qty-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const field = e.target.closest('.quantity-input').querySelector('.qty-field');
            let qty = parseInt(field.value);
            if (e.target.classList.contains('plus')) {
                field.value = qty + 1;
            } else if (e.target.classList.contains('minus') && qty > 1) {
                field.value = qty - 1;
            }
        });
    });

    // Xử lý nút Thêm vào Giỏ hàng
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const card = e.target.closest('.product-card');
            const productName = card ? card.getAttribute('data-product-name') : 'Sản phẩm';
            const quantityInput = card.querySelector('.qty-field');
            const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

            // Hiệu ứng Highlight thành công
            card.classList.add('added-success');
            setTimeout(() => { card.classList.remove('added-success'); }, 500);

            // Hiển thị thông báo
            if (notification) {
                notification.textContent = `🛒 Đã thêm ${quantity} x "${productName}" vào giỏ hàng!`;
                notification.classList.add('visible');
                setTimeout(() => { notification.classList.remove('visible'); }, 3000);
            }
        });
    });
});


const searchInput = document.getElementById('main-search-input');
const searchButton = document.getElementById('main-search-button');
const searchContainer = document.querySelector('.search-bar-container');

if (searchInput && searchContainer) {
    
    // Hiệu ứng FOCUS/BLUR (Phóng to nhẹ khi người dùng click vào)
    searchInput.addEventListener('focus', () => {
        searchContainer.classList.add('active');
    });

    searchInput.addEventListener('blur', () => {
        searchContainer.classList.remove('active');
    });

    // Xử lý khi nhấn nút TÌM KIẾM
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        handleSearch();
    });

    // Xử lý khi nhấn Enter trong ô nhập liệu
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    });

    // Hàm xử lý logic tìm kiếm
    function handleSearch() {
        const query = searchInput.value.trim();
        if (query.length > 0) {
            // Đây là phần logic tìm kiếm thực tế. 
            // Hiện tại chúng ta chỉ hiển thị một alert để minh họa.
            // Trong thực tế, bạn sẽ chuyển hướng người dùng đến trang kết quả tìm kiếm:
            // window.location.href = `/search-results.html?q=${encodeURIComponent(query)}`;
            
            alert(`Đang tìm kiếm sản phẩm: "${query}".`);

            // Nếu bạn muốn tìm kiếm ngay trên trang này, bạn sẽ gọi một hàm lọc sản phẩm:
            // filterProducts(query); 
            
        } else {
            alert('Vui lòng nhập từ khóa tìm kiếm.');
        }
    }
}




/* --- 5. LOGIC CHO ĐỀ XUẤT CÁ NHÂN HÓA (CROSS-SELLING) --- */

document.addEventListener('DOMContentLoaded', () => {

    const newLocal = { name: "Cứt", price: "C$ 8.99", image: "placeholder-phin.jpg" };
    /* --- LOGIC TRÊN TRANG SẢN PHẨM RIÊNG LẺ (VD: nuoc-ngot-soda.html) --- */
    
    // 1. Ánh xạ các sản phẩm liên quan (Bạn có thể thêm nhiều sản phẩm hơn)
    const relatedProductsMap = {
        // key: Tên sản phẩm đang xem (từ data-product-name)
        // value: Mảng các sản phẩm liên quan (Tên sản phẩm, Giá, Ảnh/Link)
        "Trà Bí Đao Wonderfarm": [
            { name: "Xá Xị Chương Dương", price: "C$ 2.49", image: "placeholder-xaxi.jpg" },
            { name: "Bánh Pía Sóc Trăng", price: "C$ 5.99", image: "placeholder-pia.jpg" }
        ],
        "Cà Phê G7 3-in-1": [
            { name: "Kẹo Sữa Dừa Bến Tre", price: "C$ 4.50", image: "placeholder-dua.jpg" },
            { name: "Phin Pha Cà Phê VN", price: "C$ 8.99", image: "placeholder-phin.jpg" }
        ],
        "Nước Giải Khát Xá Xị": [
            { name: "Mì Gói Hảo Hảo", price: "C$ 1.50", image: "placeholder6.jpg" },
            { name: "Soda Kem Cream Soda", price: "C$ 2.25", image: "placeholder-creamsoda.jpg" }
        ],
        // Thêm các cặp liên kết khác ở đây để tăng tính cá nhân hóa
    };

    const productGrid = document.querySelector('.product-grid');
    
    // Nếu đây là trang danh mục sản phẩm (có .product-grid), 
    // chúng ta sẽ chèn phần đề xuất vào cuối trang
    if (productGrid) {
        
        // 2. Lấy tên sản phẩm ngẫu nhiên để mô phỏng trang sản phẩm đang xem
        // (Trong môi trường thực tế, bạn sẽ lấy tên sản phẩm từ URL hoặc thẻ <main>)
        const allCardElements = document.querySelectorAll('.product-card');
        if (allCardElements.length === 0) return; 

        // Lấy tên của sản phẩm đầu tiên trong lưới (chỉ là mô phỏng)
        const currentProductName = allCardElements[0].getAttribute('data-product-name');
        
        const related = relatedProductsMap[currentProductName];

        if (related && related.length > 0) {
            
            // 3. Hàm tạo HTML cho sản phẩm liên quan
            const createRelatedProductHTML = (item) => `
                <div class="related-product-item product-card" data-product-name="${item.name}">
                    <div class="product-image-wrapper">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="quick-view-overlay"><i class="fas fa-eye"></i> Xem Nhanh</div>
                    </div>
                    <div class="card-details">
                        <h3 class="product-title">${item.name}</h3>
                        <p class="product-price">${item.price}</p>
                        <div class="card-interaction">
                             <div class="quantity-input">
                                <button class="qty-btn minus">-</button>
                                <input type="number" value="1" min="1" class="qty-field">
                                <button class="qty-btn plus">+</button>
                            </div>
                            <button class="btn-add-to-cart">
                                <i class="fas fa-cart-plus"></i> Thêm
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            // 4. Tạo container đề xuất
            const relatedSection = document.createElement('section');
            relatedSection.classList.add('related-products-section');
            relatedSection.innerHTML = `
                <div class="section-header" style="text-align: center; margin-top: 40px; border-top: 2px solid #ddd; padding-top: 30px;">
                    <h2>💡 KHÁCH HÀNG THƯỜNG MUA KÈM 💡</h2>
                    <p>Hoàn thiện bữa ăn/công thức của bạn với những sản phẩm được gợi ý!</p>
                </div>
                <div class="related-products-list product-grid" style="grid-template-columns: repeat(3, 1fr); max-width: 1000px; margin: 0 auto; gap: 30px; padding: 20px 0;">
                    ${related.map(createRelatedProductHTML).join('')}
                </div>
            `;

            // 5. Chèn section đề xuất vào sau lưới sản phẩm hiện tại
            productGrid.parentNode.insertBefore(relatedSection, productGrid.nextSibling);
        }
    }
});


const searchToggle = document.getElementById('search-toggle');
    const headerSearchBar = document.getElementById('header-search-bar');
    const headerSearchInput = document.getElementById('header-search-input');
    const headerSearchButton = document.getElementById('header-search-button');

    if (searchToggle && headerSearchBar) {
        
        // Bật/Tắt thanh tìm kiếm khi nhấn vào icon
        searchToggle.addEventListener('click', () => {
            headerSearchBar.classList.toggle('active');
            
            // Tự động focus vào ô nhập liệu khi mở thanh tìm kiếm
            if (headerSearchBar.classList.contains('active')) {
                headerSearchInput.focus();
            }
        });

        // Xử lý khi nhấn nút tìm kiếm trong thanh ẩn
        headerSearchButton.addEventListener('click', (e) => {
            e.preventDefault();
            handleHeaderSearch();
        });

        // Xử lý khi nhấn Enter
        headerSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleHeaderSearch();
            }
        });
        
        function handleHeaderSearch() {
            const query = headerSearchInput.value.trim();
            if (query.length > 0) {
                // THỰC HIỆN LOGIC TÌM KIẾM Ở ĐÂY
                // Trong thực tế, chuyển hướng đến trang kết quả:
                // window.location.href = `/search-results.html?q=${encodeURIComponent(query)}`;
                
                alert(`Tìm kiếm nhanh: "${query}"`);
                
                // Sau khi tìm kiếm, ẩn thanh tìm kiếm
                headerSearchBar.classList.remove('active');
                headerSearchInput.value = ''; // Xóa nội dung tìm kiếm
            } else {
                alert('Vui lòng nhập từ khóa tìm kiếm.');
            }
        }
    }


    document.addEventListener('DOMContentLoaded', () => {
    const parallaxBanner = document.getElementById('banner-parallax');

    if (parallaxBanner) {
        // Tỷ lệ di chuyển: Ảnh di chuyển 1/5 tốc độ cuộn của trang
        const moveRatio = 0.2; 

        // Hàm xử lý hiệu ứng Parallax
        function handleParallaxScroll() {
            // Lấy vị trí cuộn hiện tại của trang (tính từ đỉnh)
            const scrollTop = window.pageYOffset;
            
            // Tính toán mức độ dịch chuyển (càng cuộn xuống, dịch chuyển càng lớn)
            // Dấu trừ (-) làm ảnh di chuyển ngược chiều cuộn (lên trên)
            const yOffset = -(scrollTop * moveRatio); 

            // Áp dụng dịch chuyển cho ảnh nền (background-position)
            // Thay vì dùng transform, dùng background-position-y để dịch chuyển ảnh nền
            parallaxBanner.style.backgroundPositionY = 'calc(50% + ' + yOffset + 'px)';
        }

        // 1. Thêm event listener cho sự kiện cuộn
        window.addEventListener('scroll', handleParallaxScroll);

        // 2. Chạy hàm một lần để thiết lập vị trí ban đầu
        handleParallaxScroll(); 
    }
});




document.addEventListener('DOMContentLoaded', () => {
    const parallaxBanner = document.getElementById('banner-parallax');

    if (parallaxBanner) {
        // Tỷ lệ di chuyển: Ảnh di chuyển 1/5 (0.2) tốc độ cuộn của trang
        const moveRatio = 0.2; 

        function handleParallaxScroll() {
            // Lấy vị trí của banner so với đỉnh viewport
            const rect = parallaxBanner.getBoundingClientRect();
            
            // Tính toán mức độ cuộn đã đi qua phần tử (để ảnh di chuyển chậm lại)
            // rect.top là khoảng cách từ đỉnh banner đến đỉnh viewport
            
            // Tính toán độ dịch chuyển (càng cuộn xuống, yOffset càng âm, ảnh càng đi lên chậm rãi)
            const yOffset = -(rect.top * moveRatio); 

            // Áp dụng dịch chuyển. Dùng 50% là vị trí ngang ổn định.
            parallaxBanner.style.backgroundPosition = `center calc(50% + ${yOffset}px)`;
        }

        // 1. Thêm event listener cho sự kiện cuộn
        window.addEventListener('scroll', handleParallaxScroll);

        // 2. Chạy hàm một lần để thiết lập vị trí ban đầu
        handleParallaxScroll(); 
    }
});



/*Nấu mì/*
/* --- LOGIC HIỆU ỨNG SIDE PARALLAX (Đã tối ưu hóa) --- */

document.addEventListener('DOMContentLoaded', () => {
    // ... Giữ nguyên logic Parallax Banner 1 (topBanner) ...

    const sideDecorContainer = document.getElementById('side-decor-container');
    const leftDecor = document.getElementById('left-decor');
    const rightDecor = document.getElementById('right-decor');
    const mainContentArea = document.querySelector('.main-content-parallax-area');


    if (sideDecorContainer && leftDecor && rightDecor && mainContentArea) {
        
        const sideMoveRatio = 0.3; // Tỷ lệ di chuyển chậm (30% tốc độ cuộn)

        function handleSideParallaxScroll() {
            const scrollTop = window.pageYOffset;
            
            // 1. Lấy vị trí của Section chứa Side Decor so với đỉnh trang (top)
            const containerTop = mainContentArea.offsetTop; 
            
            // 2. Tính toán mức độ cuộn đã đi qua điểm bắt đầu của Section
            //    Giá trị này là độ dịch chuyển của người dùng so với vị trí 0 của Section
            const scrollDelta = scrollTop - containerTop;

            // 3. Tính toán dịch chuyển cho Side Decor
            //    Dịch chuyển background ngược chiều cuộn nhưng chậm lại
            const backgroundYOffset = scrollDelta * sideMoveRatio; 

            // Áp dụng dịch chuyển cho background-position-y của các thanh trang trí
            leftDecor.style.backgroundPositionY = `${-backgroundYOffset}px`;
            rightDecor.style.backgroundPositionY = `${-backgroundYOffset}px`;
        }

        // 1. Thêm event listener cho sự kiện cuộn
        window.addEventListener('scroll', handleSideParallaxScroll);

        // 2. Chạy hàm một lần để thiết lập vị trí ban đầu
        handleParallaxScroll(); 
    }
    
    // ... Giữ nguyên các logic JS khác của bạn ở cuối file ...
});

document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('scroll-progress');

    if (progressBar) {
        window.addEventListener('scroll', () => {
            // Tổng chiều cao nội dung cuộn được
            const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            
            // Tính toán tỷ lệ cuộn
            const scrolled = (document.documentElement.scrollTop / scrollTotal) * 100;

            // Áp dụng lên chiều rộng thanh progress
            progressBar.style.width = scrolled + "%";
        });
    }
});


/*Chanllege mì/*/

document.addEventListener('DOMContentLoaded', () => {
    
    document.querySelectorAll('.btn-vote').forEach(button => {
        button.addEventListener('click', () => {
            
            let currentVotes = button.textContent.match(/\((\d+)\)/);
            let voteCount = currentVotes ? parseInt(currentVotes[1]) : 0;
            const monAn = button.getAttribute('data-mon-an');

            // 1. Tăng số lượng vote
            voteCount++;

            // 2. Cập nhật nội dung nút
            button.textContent = `👍 Vote (${voteCount})`;
            
            // 3. Hiển thị phản hồi
            button.style.backgroundColor = '#4CAF50'; // Màu xanh thành công
            button.style.color = 'white';
            button.style.pointerEvents = 'none'; // Ngăn vote lần nữa

            setTimeout(() => {
                // Khôi phục màu sau 2 giây (để khách hàng thấy vote thành công)
                button.style.backgroundColor = '#FFC300';
                button.style.color = '#333';
                button.style.pointerEvents = 'auto';
            }, 2000); 

            console.log(`Bạn đã vote cho món: ${monAn}. Tổng số vote: ${voteCount}`);
        });
    });
});



// Logic Phóng to ảnh công thức khi hover
document.querySelectorAll('.recipe-img').forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.05)';
        img.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
    });
    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
        img.style.boxShadow = 'none';
    });
});
// Logic Hiệu ứng Video Nổi bật
const videoContainer = document.querySelector('.video-container');

if (videoContainer) {
    videoContainer.addEventListener('mouseenter', () => {
        videoContainer.style.boxShadow = '0 0 30px rgba(255, 69, 0, 0.8)'; // Hiệu ứng glow
        videoContainer.style.transform = 'scale(1.01)';
    });
    videoContainer.addEventListener('mouseleave', () => {
        videoContainer.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)'; // Trở về shadow cũ
        videoContainer.style.transform = 'scale(1)';
    });
    // Thêm transition CSS vào .video-container để hiệu ứng mượt mà hơn (Bước III)
}
  

/*PhẦN CHUNG CHO HIỆU ỨNG POP UP 3D/*/

/* --- 2. LOGIC CHỮ NỔI (3D POP-OUT TEXT) KHI CUỘN --- */
    const jsHeadings = document.querySelectorAll('.js-heading');
    
    const headingObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('pop-out');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.7 
    });

    jsHeadings.forEach(heading => {
        headingObserver.observe(heading);
    });





/*/ Thịt/*/

const spice_keyframes = `@keyframes slow-drift {
    0% { transform: translateY(0vh) translateX(0); }
    100% { transform: translateY(100vh) translateX(50px); }
}
@keyframes slow-rotation {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}`;
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = spice_keyframes;
document.head.appendChild(styleSheet);


document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. BIẾN VÀ HÀM CHUNG --- */
    const topBanners = document.querySelectorAll('.banner-parallax'); 
    const jsHeadings = document.querySelectorAll('.js-heading');
    const bannerRatio = 0.5; // Tỷ lệ Parallax Top Banner


    /* --- 2. LOGIC PARALLAX VÀ HIỆU ỨNG CUỘN --- */

    function handleParallaxScroll() {
        const scrollTop = window.pageYOffset;
        
        // A. Xử lý Parallax cho Banner Chính
        topBanners.forEach(banner => {
            const bannerYOffset = scrollTop * bannerRatio;
            banner.style.backgroundPositionY = `calc(50% - ${bannerYOffset}px)`;
        });
        // (Logic Side Decor Parallax đã được đơn giản hóa bằng CSS background-attachment: fixed)
    }
    
    // B. Xử lý Thanh tiến trình cuộn (Scroll Progress Bar)
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (document.documentElement.scrollTop / scrollTotal) * 100;
            progressBar.style.width = scrolled + "%";
        });
    }

    window.addEventListener('scroll', handleParallaxScroll);
    handleParallaxScroll(); 


    /* --- 3. LOGIC CHỮ NỔI (3D POP-OUT TEXT) KHI CUỘN --- */
    if (jsHeadings.length > 0) {
        const headingObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('pop-out');
                    observer.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.7 });

        jsHeadings.forEach(heading => {
            headingObserver.observe(heading);
        });
    }


    /* --- 4. HIỆU ỨNG VẨY GIA VỊ (SPICE SHAKE) --- */
    const spiceContainer = document.getElementById('spice-shake-container');

    if (spiceContainer) {
        const totalParticles = 40;
        const spiceColors = ['#D42D2D', '#FFD700', '#A0522D', '#555'];
        
        for (let i = 0; i < totalParticles; i++) {
            const particle = document.createElement('div');
            particle.classList.add('spice-particle');
            
            particle.style.left = `${Math.random() * 100}vw`; 
            particle.style.top = `${Math.random() * 100}vh`; 
            particle.style.width = `${Math.random() * 3 + 1}px`;
            particle.style.height = particle.style.width;
            particle.style.backgroundColor = spiceColors[Math.floor(Math.random() * spiceColors.length)];
            
            particle.style.animation = `slow-drift ${Math.random() * 10 + 5}s infinite linear, slow-rotation ${Math.random() * 10 + 5}s infinite linear`;
            particle.style.animationDelay = `${Math.random() * 5}s`;

            spiceContainer.appendChild(particle);
        }
    }
    
    // ... (Giữ lại các logic chung khác của bạn: Cart, Qty, Search, v.v.) ...
});

const startTimerBtn = document.getElementById('start-timer-btn');
const timerDurationSelect = document.getElementById('timer-duration');
const timerDisplay = document.getElementById('timer-display');
let countdownInterval;

if (startTimerBtn && timerDurationSelect && timerDisplay) {
    
    startTimerBtn.addEventListener('click', () => {
        // Lấy thời gian (đơn vị: phút, từ value của option)
        let durationMinutes = parseInt(timerDurationSelect.value);
        if (isNaN(durationMinutes)) return; // Thoát nếu không phải số

        // Dừng timer cũ nếu có
        clearInterval(countdownInterval);

        // Tính toán thời gian kết thúc (thời gian hiện tại + thời gian ướp)
        const endTime = new Date().getTime() + (durationMinutes * 60 * 1000);

        startTimerBtn.disabled = true;
        startTimerBtn.textContent = 'Đang Ướp...';
        timerDurationSelect.disabled = true;

        // Hàm cập nhật mỗi giây
        countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = endTime - now;

            // Tính toán thời gian còn lại
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(countdownInterval);
                timerDisplay.innerHTML = '🎉 THỊT ĐÃ SẴN SÀNG NƯỚNG!';
                startTimerBtn.textContent = 'BẮT ĐẦU ƯỚP LẠI';
                startTimerBtn.disabled = false;
                timerDurationSelect.disabled = false;
                // Thêm thông báo pop-up (tùy chọn)
                alert("Thịt nướng đã ướp xong! Mở lò nướng thôi!"); 
            } else {
                timerDisplay.innerHTML = `${hours}h ${minutes}m ${seconds}s còn lại`;
            }
        }, 1000);
    });
}




const sauceList = document.getElementById('sauce-list');
const stepSauce = document.getElementById('step-sauce');
const stepFinal = document.getElementById('step-final');

if (sauceList && stepSauce && stepFinal) {
    const listItems = sauceList.querySelectorAll('li');
    
    const imageRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const step = entry.target.getAttribute('data-reveal-step');
            
            if (entry.isIntersecting) {
                // Kích hoạt layer tương ứng khi nguyên liệu đi vào viewport
                if (step === 'sauce') {
                    stepSauce.style.opacity = 1;
                } else if (step === 'final') {
                    stepFinal.style.opacity = 1;
                }
            } else {
                 // Ẩn layer khi cuộn ra khỏi viewport (tùy chọn)
                 if (step === 'final') {
                    stepFinal.style.opacity = 0;
                }
            }
        });
    }, {
        threshold: 0.5 // Kích hoạt khi 50% nguyên liệu xuất hiện
    });

    listItems.forEach(item => {
        imageRevealObserver.observe(item);
    });
}



const resetTimerBtn = document.getElementById('reset-timer-btn');
const clockWidget = document.querySelector('.creative-clock');

let durationMilliseconds = 0; // Thời gian ban đầu (tính bằng mili giây)

// Hàm định dạng số thành 2 chữ số (VD: 5 -> 05)
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Hàm cập nhật mỗi giây
function updateTimer(endTime) {
    const now = new Date().getTime();
    let distance = endTime - now;

    if (distance <= 0) {
        clearInterval(countdownInterval);
        distance = 0;
        
        // Hiển thị trạng thái hoàn thành
        timerDisplay.innerHTML = `🎉 ĐÃ SẴN SÀNG!`;
        clockWidget.classList.add('complete');
        startTimerBtn.textContent = 'ƯỚP LẠI';
        startTimerBtn.disabled = false;
        resetTimerBtn.disabled = true;
        timerDurationSelect.disabled = false;
        
        alert("Thịt nướng đã ướp xong! Mở lò nướng thôi!"); 
        return;
    }

    // Tính toán thời gian còn lại (đơn vị: ms)
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timerDisplay.innerHTML = 
        `${formatTime(hours)}<span class="unit">h</span> ` +
        `${formatTime(minutes)}<span class="unit">m</span> ` +
        `${formatTime(seconds)}<span class="unit">s</span>`;
}


if (startTimerBtn && timerDurationSelect && timerDisplay) {
    
    startTimerBtn.addEventListener('click', () => {
        // Lấy thời gian (đơn vị: phút, từ value của option)
        let durationMinutes = parseInt(timerDurationSelect.value);
        if (isNaN(durationMinutes)) return;

        durationMilliseconds = durationMinutes * 60 * 1000;
        const endTime = new Date().getTime() + durationMilliseconds;

        // Bắt đầu timer
        clearInterval(countdownInterval);
        
        startTimerBtn.textContent = 'ĐANG ƯỚP...';
        startTimerBtn.disabled = true;
        resetTimerBtn.disabled = false;
        timerDurationSelect.disabled = true;
        clockWidget.classList.remove('complete');

        countdownInterval = setInterval(() => updateTimer(endTime), 1000);
        updateTimer(endTime); // Chạy lần đầu ngay lập tức
    });

    resetTimerBtn.addEventListener('click', () => {
        clearInterval(countdownInterval);
        timerDisplay.innerHTML = '00<span class="unit">h</span> 00<span class="unit">m</span> 00<span class="unit">s</span>';
        startTimerBtn.textContent = 'BẮT ĐẦU ƯỚP';
        startTimerBtn.disabled = false;
        resetTimerBtn.disabled = true;
        timerDurationSelect.disabled = false;
        clockWidget.classList.remove('complete');
    });

    // Cập nhật hiển thị ban đầu khi chọn thời gian mới
    timerDurationSelect.addEventListener('change', (e) => {
        const minutes = parseInt(e.target.value);
        timerDisplay.innerHTML = `00<span class="unit">h</span> ${formatTime(minutes)}<span class="unit">m</span> 00<span class="unit">s</span>`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.spice-container');
    const particleCount = 10; // Số lượng hạt rắc mỗi lần click

    container.addEventListener('click', (event) => {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;

        for (let i = 0; i < particleCount; i++) {
            createParticle(mouseX, mouseY, container);
        }
    });
});

function createParticle(x, y, container) {
    const particle = document.createElement('div');
    particle.className = 'spice-particle';

    // Đặt vị trí ban đầu
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.opacity = '1';

    // Tạo chuyển động ngẫu nhiên
    const randomX = (Math.random() - 0.5) * 150; // Khoảng cách rắc ngang
    const randomY = (Math.random() - 0.5) * 150; // Khoảng cách rắc dọc
    const duration = 1.5 + Math.random(); // Thời gian bay ngẫu nhiên

    // Áp dụng animation qua JavaScript/CSS Transition
    particle.style.transition = `transform ${duration}s ease-out, opacity ${duration}s ease-in`;
    
    // Gắn vào DOM
    container.appendChild(particle);

    // Bắt đầu hiệu ứng bay và biến mất (sau một thời gian ngắn)
    setTimeout(() => {
        particle.style.transform = `translate(${randomX}px, ${randomY}px) scale(0.1)`;
        particle.style.opacity = '0';
    }, 10); // Độ trễ nhỏ để transition có hiệu lực

    // Xóa phần tử sau khi animation hoàn thành để dọn dẹp bộ nhớ
    setTimeout(() => {
        particle.remove();
    }, duration * 1000 + 500); // Đảm bảo thời gian lâu hơn animation
}

const buyMissingBtn = document.getElementById('buy-missing-btn');
const quickChecklist = document.querySelector('.quick-checklist');

if (buyMissingBtn && quickChecklist) {
    buyMissingBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const missingItems = [];
        let totalItems = 0;

        quickChecklist.querySelectorAll('li').forEach(item => {
            const checkbox = item.querySelector('.ingredient-check');
            const itemName = item.querySelector('.item-name').textContent;
            totalItems++;

            if (!checkbox.checked) {
                // Nếu chưa được check (còn thiếu)
                missingItems.push(itemName);
            }
        });

        if (missingItems.length > 0) {
            // Chuyển hướng đến trang giỏ hàng hoặc trang mua combo
            alert(`Bạn đang thiếu ${missingItems.length}/${totalItems} món: \n- ${missingItems.join('\n- ')}\n\nHệ thống sẽ chuyển bạn đến trang Combo Gia Vị Ướp Thịt!`);
            // window.location.href = 'gia.html#combo-uopthit'; // Kích hoạt mua hàng
        } else {
            alert('🎉 Tuyệt vời! Bạn đã có đủ nguyên liệu để bắt đầu ướp thịt.');
        }
    });

    // Cho phép click vào cả dòng LI để check/uncheck
    quickChecklist.querySelectorAll('li').forEach(listItem => {
        listItem.addEventListener('click', (e) => {
            const checkbox = listItem.querySelector('.ingredient-check');
            // Tránh click đôi nếu click trực tiếp vào input/label
            if (e.target !== checkbox && e.target.tagName !== 'LABEL') {
                checkbox.checked = !checkbox.checked;
            }
        });
    });
}