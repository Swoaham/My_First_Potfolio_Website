// Portfolio Main JavaScript
class PortfolioApp {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.geometries = [];
        this.projects = [
            {
                id: 1,
                title: "Trekz Treaking Website",
                description: "Treaking Website helps users explore travel niches.",
                technologies: ["HTML", "CSS", "JAVA", "Dockerfile"],
                url: "https://treaking-website-travel-niche-8xmg.onrender.com/treks/",
                image: "resources/Treaking_website.png",
                color: "#00d4ff"
            },
            {
                id: 2,
                title: "Beauty Product",
                description: "A responsive Beauty Product E-Commerce Website in Angular 📱 with 🛒 Add to Cart and 💰 real-time total price calculation",
                technologies: ["HTML", "CSS", "Typescript"],
                url: "https://swoaham.github.io/Beauty-Product-E-Commerce-Website/#/home",
                image: "resources/Beauty-product_website.png",
                color: "#ff6b6b"
            },
            // {
            //     id: 3,
            //     title: "AI Chat Interface",
            //     description: "Smart conversational AI with natural language processing",
            //     technologies: ["React", "OpenAI", "Node.js"],
            //     url: "https://example.com/project3",
            //     image: "resources/project-1.jpg",
            //     color: "#00d4ff"
            // },
            // {
            //     id: 4,
            //     title: "Mobile Game Hub",
            //     description: "Cross-platform gaming platform with social features",
            //     technologies: ["Unity", "Firebase", "React Native"],
            //     url: "https://example.com/project4",
            //     image: "resources/project-2.jpg",
            //     color: "#ff6b6b"
            // },
            // {
            //     id: 5,
            //     title: "Blockchain Wallet",
            //     description: "Secure cryptocurrency wallet with DeFi integration",
            //     technologies: ["Web3.js", "Solidity", "React"],
            //     url: "https://example.com/project5",
            //     image: "resources/project-1.jpg",
            //     color: "#00d4ff"
            // },
            // {
            //     id: 6,
            //     title: "Social Media Analytics",
            //     description: "Comprehensive social media tracking and analysis tool",
            //     technologies: ["Python", "D3.js", "MongoDB"],
            //     url: "https://example.com/project6",
            //     image: "resources/project-2.jpg",
            //     color: "#ff6b6b"
            // }
        ];
        this.isAdmin = false;
        this.adminPassword = "admin123"; // In production, use secure authentication
        
        this.init();
    }
    
    init() {
        this.init3DScene();
        this.initTypewriter();
        this.initProjectGlider();
        this.initSkillsChart();
        this.initScrollAnimations();
        this.initEventListeners();
        this.initInfiniteScroll();
        
        // Start animation loop
        this.animate();
    }
    
    init3DScene() {
        // Create Three.js scene
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: document.getElementById('three-canvas'), 
            alpha: true,
            antialias: true 
        });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Create floating geometries
        this.createFloatingObjects();
        
        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0x00d4ff, 1);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
        
        const pointLight = new THREE.PointLight(0xff6b6b, 0.5);
        pointLight.position.set(-5, -5, 5);
        this.scene.add(pointLight);
        
        // Position camera
        this.camera.position.z = 10;
        
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
    }
    
    createFloatingObjects() {
        const geometries = [
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.SphereGeometry(0.7, 32, 32),
            new THREE.ConeGeometry(0.7, 1.5, 32),
            new THREE.OctahedronGeometry(0.8),
            new THREE.TetrahedronGeometry(0.9)
        ];
        
        for (let i = 0; i < 15; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = new THREE.MeshPhongMaterial({
                color: Math.random() > 0.5 ? 0x00d4ff : 0xff6b6b,
                transparent: true,
                opacity: 0.7,
                shininess: 100
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            
            // Random position
            mesh.position.x = (Math.random() - 0.5) * 20;
            mesh.position.y = (Math.random() - 0.5) * 20;
            mesh.position.z = (Math.random() - 0.5) * 10;
            
            // Random rotation speed
            mesh.rotationSpeed = {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            };
            
            // Random floating motion
            mesh.floatSpeed = Math.random() * 0.5 + 0.5;
            mesh.floatOffset = Math.random() * Math.PI * 2;
            
            this.geometries.push(mesh);
            this.scene.add(mesh);
        }
    }
    
    initTypewriter() {
        const typed = new Typed('#typed-text', {
            strings: [
                'Hello, My-Self',
                'Swoaham Upadhyay',
                'I am Software Developer',
                'Java Developer',
                'Angular Developer',
                'React Developer',
                'Problem Solver',
                'And more..'
            ],
            typeSpeed: 80,
            backSpeed: 60,
            backDelay: 2000,
            loop: true,
            showCursor: false
        });
    }
    
    initProjectGlider() {
        const glider = document.getElementById('projectGlider');
        
        // Create project cards
        this.projects.forEach((project, index) => {
            const card = this.createProjectCard(project, index);
            glider.appendChild(card);
        });
        
        // Duplicate projects for infinite scroll
        this.projects.forEach((project, index) => {
            const card = this.createProjectCard(project, index + this.projects.length);
            glider.appendChild(card);
        });
    }
    
    createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'project-card fade-in';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="project-preview">
                <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover ">
                <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div class="p-4 text-white">
                        <div class="text-sm opacity-75">Click to explore</div>
                    </div>
                </div>
            </div>
            <div class="p-6">
                <h3 class="clash-display text-xl font-bold mb-2 text-white">${project.title}</h3>
                <p class="text-gray-300 text-sm mb-4">${project.description}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${project.technologies.map(tech => 
                        `<span class="jetbrains-mono text-xs px-2 py-1 bg-gray-700 text-cyan-400 rounded">${tech}</span>`
                    ).join('')}
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-xs text-gray-400">Project ${project.id}</span>
                    <button onclick="window.open('${project.url}', '_blank')" 
                            class="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium">
                        View Live →
                    </button>
                </div>
            </div>
        `;
        
        // Add click handler for project preview
        card.addEventListener('click', () => {
            this.showProjectPreview(project);
        });
        
        return card;
    }
    
    showProjectPreview(project) {
        // Create modal for project preview
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-gray-900 border border-gray-700 rounded-2xl max-w-4xl w-full max-h-full overflow-hidden">
                <div class="flex justify-between items-center p-6 border-b border-gray-700">
                    <h3 class="clash-display text-2xl font-bold text-white">${project.title}</h3>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white text-2xl">×</button>
                </div>
                <div class="p-6">
                    <div class="aspect-video bg-gray-800 rounded-lg mb-6 flex items-center justify-center">
                        <iframe 
                            src="${project.url}" 
                            class="w-full h-full"
                            frameborder="0"
                            loading="lazy"
                            sandbox="allow-same-origin allow-scripts allow-popups"
                            allowfullscreen
                            onerror="this.parentElement.innerHTML = '<div class=\'p-8 text-center text-gray-300\'>⚠️ Live preview failed to load. <a href=\'${project.url}\' target=\'_blank\' class=\'text-cyan-400 underline\'>Open in new tab</a></div>'"
                        ></iframe>
                    </div>
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${project.technologies.map(tech => 
                            `<span class="jetbrains-mono text-xs px-3 py-1 bg-gray-700 text-cyan-400 rounded-full">${tech}</span>`
                        ).join('')}
                    </div>
                    <p class="text-gray-300 mb-6">${project.description}</p>
                    <div class="flex gap-4">
                        <button onclick="window.open('${project.url}', '_blank')" class="btn-primary">
                            View Live Project
                        </button>
                        <button onclick="this.closest('.fixed').remove()" class="border border-gray-600 text-gray-300 hover:bg-gray-800 px-6 py-2 rounded-lg transition-colors">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    initSkillsChart() {
        const chartDom = document.getElementById('skillsChart');
        const myChart = echarts.init(chartDom);
        
        const option = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                borderColor: '#00d4ff',
                textStyle: {
                    color: '#ffffff'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                max: 100,
                axisLine: {
                    lineStyle: {
                        color: '#374151'
                    }
                },
                axisLabel: {
                    color: '#9ca3af'
                },
                splitLine: {
                    lineStyle: {
                        color: '#374151'
                    }
                }
            },
            yAxis: {
                type: 'category',
                data: ['HTML/CSS', 'Java/Spring', 'React', 'js/ts', 'UI/UX Design', 'Angular'],
                axisLine: {
                    lineStyle: {
                        color: '#374151'
                    }
                },
                axisLabel: {
                    color: '#9ca3af'
                }
            },
            series: [{
                name: 'Proficiency',
                type: 'bar',
                data: [95, 88, 80, 75, 90, 85],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: '#00d4ff' },
                        { offset: 1, color: '#ff6b6b' }
                    ]),
                    borderRadius: [0, 4, 4, 0]
                },
                emphasis: {
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            { offset: 0, color: '#33ddff' },
                            { offset: 1, color: '#ff8c8c' }
                        ])
                    }
                }
            }]
        };
        
        myChart.setOption(option);
        
        // Handle window resize
        window.addEventListener('resize', () => {
            myChart.resize();
        });
    }
    
    initScrollAnimations() {
        // Scroll progress bar
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            document.getElementById('scrollProgress').style.width = scrollPercent + '%';
        });
        
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }
    
    initInfiniteScroll() {
        const glider = document.getElementById('projectGlider');
        let isScrolling = false;
        let scrollSpeed = 1;
        
        // Auto-scroll functionality
        const autoScroll = () => {
            if (!isScrolling) {
                glider.scrollLeft += scrollSpeed;
                
                // Reset scroll position when reaching the end
                if (glider.scrollLeft >= glider.scrollWidth / 2) {
                    glider.scrollLeft = 0;
                }
            }
            requestAnimationFrame(autoScroll);
        };
        
        autoScroll();
        
        // Pause auto-scroll on user interaction
        glider.addEventListener('mouseenter', () => {
            isScrolling = true;
        });
        
        glider.addEventListener('mouseleave', () => {
            isScrolling = false;
        });
        
        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        glider.addEventListener('touchstart', (e) => {
            isScrolling = true;
            touchStartX = e.changedTouches[0].screenX;
        });
        
        glider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        });
        
        const handleSwipe = () => {
            if (touchEndX < touchStartX - 50) {
                // Swipe left - scroll right
                glider.scrollLeft += 200;
            }
            if (touchEndX > touchStartX + 50) {
                // Swipe right - scroll left
                glider.scrollLeft -= 200;
            }
        };
    }
    
    initEventListeners() {
        // Admin button
        document.getElementById('adminBtn').addEventListener('click', () => {
            this.showAdminModal();
        });
        
        // Admin form
        document.getElementById('adminForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAdminLogin();
        });
        
        // Contact form
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactForm();
        });
        
        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    showAdminModal() {
        document.getElementById('adminModal').classList.remove('hidden');
        document.getElementById('adminModal').classList.add('flex');
        document.getElementById('adminPassword').focus();
    }
    
    closeAdminModal() {
        document.getElementById('adminModal').classList.add('hidden');
        document.getElementById('adminModal').classList.remove('flex');
        document.getElementById('adminPassword').value = '';
    }
    
    handleAdminLogin() {
        const password = document.getElementById('adminPassword').value;
        
        if (password === this.adminPassword) {
            this.isAdmin = true;
            this.closeAdminModal();
            this.showAdminNotification();
            this.enableAdminFeatures();
        } else {
            alert('Incorrect password. Please try again.');
            document.getElementById('adminPassword').value = '';
        }
    }
    
    showAdminNotification() {
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        notification.textContent = '✅ Admin access granted!';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    enableAdminFeatures() {
        // Add edit buttons to project cards
        document.querySelectorAll('.project-card').forEach((card, index) => {
            if (index < this.projects.length) { // Only for original projects, not duplicates
                const editBtn = document.createElement('button');
                editBtn.className = 'absolute top-2 right-2 bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity';
                editBtn.textContent = 'Edit';
                editBtn.onclick = (e) => {
                    e.stopPropagation();
                    this.editProject(index);
                };
                card.style.position = 'relative';
                card.classList.add('group');
                card.appendChild(editBtn);
            }
        });
        
        // Add "Add Project" button
        const addBtn = document.createElement('button');
        addBtn.className = 'project-card min-w-[400px] h-[300px] border-2 border-dashed border-cyan-400 rounded-2xl flex items-center justify-center hover:bg-cyan-400 hover:bg-opacity-10 transition-all duration-300';
        addBtn.innerHTML = `
            <div class="text-center">
                <div class="text-4xl mb-4">➕</div>
                <div class="text-cyan-400 font-medium">Add New Project</div>
            </div>
        `;
        addBtn.onclick = () => this.addNewProject();
        
        document.getElementById('projectGlider').appendChild(addBtn);
    }
    
    editProject(index) {
        const project = this.projects[index];
        const newTitle = prompt('Edit project title:', project.title);
        const newDescription = prompt('Edit project description:', project.description);
        
        if (newTitle && newDescription) {
            project.title = newTitle;
            project.description = newDescription;
            this.refreshProjectGlider();
            alert('Project updated successfully!');
        }
    }
    
    addNewProject() {
        const title = prompt('Enter project title:');
        const description = prompt('Enter project description:');
        const technologies = prompt('Enter technologies (comma-separated):');
        const url = prompt('Enter project URL:');
        
        if (title && description && technologies && url) {
            const newProject = {
                id: this.projects.length + 1,
                title: title,
                description: description,
                technologies: technologies.split(',').map(t => t.trim()),
                url: url,
                image: "resources/project-1.jpg", // Default image
                color: Math.random() > 0.5 ? "#00d4ff" : "#ff6b6b"
            };
            
            this.projects.push(newProject);
            this.refreshProjectGlider();
            alert('New project added successfully!');
        }
    }
    
    refreshProjectGlider() {
        const glider = document.getElementById('projectGlider');
        glider.innerHTML = '';
        this.initProjectGlider();
    }
    
    handleContactForm() {
        // Simulate form submission
        const submitBtn = document.querySelector('#contactForm button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = 'Sending... 📧';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = 'Message Sent! ✅';
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                document.getElementById('contactForm').reset();
            }, 2000);
        }, 1500);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Animate 3D objects
        this.geometries.forEach((mesh, index) => {
            // Rotation
            mesh.rotation.x += mesh.rotationSpeed.x;
            mesh.rotation.y += mesh.rotationSpeed.y;
            mesh.rotation.z += mesh.rotationSpeed.z;
            
            // Floating motion
            const time = Date.now() * 0.001;
            mesh.position.y += Math.sin(time * mesh.floatSpeed + mesh.floatOffset) * 0.002;
        });
        
        // Camera movement based on mouse
        const mouseX = (this.mouseX - window.innerWidth / 2) / window.innerWidth;
        const mouseY = (this.mouseY - window.innerHeight / 2) / window.innerHeight;
        
        this.camera.position.x += (mouseX * 2 - this.camera.position.x) * 0.05;
        this.camera.position.y += (-mouseY * 2 - this.camera.position.y) * 0.05;
        this.camera.lookAt(this.scene.position);
        
        this.renderer.render(this.scene, this.camera);
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Global functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function closeAdminModal() {
    app.closeAdminModal();
}

// Mouse tracking for 3D camera movement
document.addEventListener('mousemove', (e) => {
    if (app) {
        app.mouseX = e.clientX;
        app.mouseY = e.clientY;
    }
});

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new PortfolioApp();
});

// Smooth scrolling polyfill for older browsers
if (!CSS.supports('scroll-behavior', 'smooth')) {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.offsetTop - 80;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}