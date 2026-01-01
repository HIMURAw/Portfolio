// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (menuClose && mobileMenu) {
    menuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close mobile menu when clicking outside
if (mobileMenu) {
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Blog Posts Data (Sample Data)
const blogPosts = [
    {
        id: 1,
        title: 'Modern Web Geliştirme Teknikleri',
        excerpt: '2024 yılında web geliştirme dünyasında öne çıkan modern teknikleri ve trendleri keşfedin.',
        category: 'Teknoloji',
        date: '20 Ocak 2024',
        readTime: '5 dakika',
        image: 'https://via.placeholder.com/600x300?text=Modern+Web+Development'
    },
    {
        id: 2,
        title: 'CSS Animasyonları ile Etkileyici Tasarımlar',
        excerpt: 'CSS animasyonlarını kullanarak kullanıcı deneyimini artıracak etkileyici tasarımlar oluşturun.',
        category: 'Tasarım',
        date: '18 Ocak 2024',
        readTime: '7 dakika',
        image: 'https://via.placeholder.com/600x300?text=CSS+Animations'
    },
    {
        id: 3,
        title: 'JavaScript ES2024 Yeni Özellikleri',
        excerpt: 'JavaScript\'in en yeni versiyonunda gelen heyecan verici özelliklere göz atın.',
        category: 'Programlama',
        date: '15 Ocak 2024',
        readTime: '6 dakika',
        image: 'https://via.placeholder.com/600x300?text=JavaScript+ES2024'
    },
    {
        id: 4,
        title: 'Responsive Tasarım İlkeleri',
        excerpt: 'Modern web siteleri için responsive tasarım prensiplerini ve en iyi uygulamaları öğrenin.',
        category: 'Tasarım',
        date: '12 Ocak 2024',
        readTime: '8 dakika',
        image: 'https://via.placeholder.com/600x300?text=Responsive+Design'
    },
    {
        id: 5,
        title: 'React Hooks Kullanım Rehberi',
        excerpt: 'React Hooks ile fonksiyonel bileşenlerde state yönetimi ve side effect işlemleri.',
        category: 'Programlama',
        date: '10 Ocak 2024',
        readTime: '10 dakika',
        image: 'https://via.placeholder.com/600x300?text=React+Hooks'
    },
    {
        id: 6,
        title: 'Web Performans Optimizasyonu',
        excerpt: 'Web sitenizin hızını artırmak için kanıtlanmış performans optimizasyon teknikleri.',
        category: 'Teknoloji',
        date: '8 Ocak 2024',
        readTime: '9 dakika',
        image: 'https://via.placeholder.com/600x300?text=Web+Performance'
    }
];

// Load Blog Posts on Index Page
function loadBlogPosts() {
    const blogPostsContainer = document.getElementById('blogPostsGrid');
    if (!blogPostsContainer) return;

    blogPostsContainer.innerHTML = blogPosts.map(post => `
        <article class="blog-card">
            <img src="${post.image}" alt="${post.title}" class="blog-card__image">
            <div class="blog-card__content">
                <div class="blog-card__meta">
                    <span class="blog-card__category">${post.category}</span>
                    <span>${post.date}</span>
                </div>
                <h3 class="blog-card__title">
                    <a href="post.html?id=${post.id}">${post.title}</a>
                </h3>
                <p class="blog-card__excerpt">${post.excerpt}</p>
                <a href="post.html?id=${post.id}" class="blog-card__read-more">
                    Devamını Oku →
                </a>
            </div>
        </article>
    `).join('');
}

// Load Single Post
function loadPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get('id'));
    
    if (!postId) return;

    const post = blogPosts.find(p => p.id === postId);
    if (!post) return;

    // Update page title
    document.title = `${post.title} - Blog`;

    // Update post elements
    const postCategory = document.getElementById('postCategory');
    const postTitle = document.getElementById('postTitle');
    const postDate = document.getElementById('postDate');
    const postAuthor = document.getElementById('postAuthor');
    const postReadTime = document.getElementById('postReadTime');
    const postImage = document.getElementById('postImage');
    const postBody = document.getElementById('postBody');

    if (postCategory) postCategory.textContent = post.category;
    if (postTitle) postTitle.textContent = post.title;
    if (postDate) postDate.textContent = post.date;
    if (postAuthor) postAuthor.textContent = 'Yazar';
    if (postReadTime) postReadTime.textContent = post.readTime;
    if (postImage) {
        postImage.src = post.image;
        postImage.alt = post.title;
    }
    if (postBody) {
        postBody.innerHTML = `
            <p>${post.excerpt}</p>
            <h2>Detaylı İçerik</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                commodo consequat.
            </p>
            <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <h3>Önemli Noktalar</h3>
            <ul>
                <li>İlk önemli nokta</li>
                <li>İkinci önemli nokta</li>
                <li>Üçüncü önemli nokta</li>
                <li>Dördüncü önemli nokta</li>
            </ul>
            <blockquote>
                "${post.title}" konusunda en önemli şey, doğru yaklaşımı benimsemektir.
            </blockquote>
            <h2>Sonuç</h2>
            <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
                veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
        `;
    }
}

// Particle Background Animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = Math.random() > 0.5 
            ? `rgba(99, 102, 241, ${Math.random() * 0.5 + 0.3})` 
            : `rgba(139, 92, 246, ${Math.random() * 0.5 + 0.3})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s infinite ease-in-out`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Add CSS animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
        }
        33% {
            transform: translate(30px, -30px) scale(1.2);
            opacity: 0.6;
        }
        66% {
            transform: translate(-20px, 20px) scale(0.8);
            opacity: 0.4;
        }
    }
`;
document.head.appendChild(style);

// Initialize based on current page
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        loadBlogPosts();
    } else if (window.location.pathname.includes('post.html')) {
        loadPost();
    }

    // Add fade-in animation to elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Observe blog cards and other content
    document.querySelectorAll('.blog-card, .about, .post-content, .stat-card, .feature-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add active state to navigation links
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.header__nav a, .mobile-menu__links a');
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (currentPath.endsWith(linkPath) || 
            (currentPath === '/' && linkPath.includes('index.html'))) {
            link.classList.add('active');
        }
    });
});

