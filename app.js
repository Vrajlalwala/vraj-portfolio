let currentPage = 'home';
let currentFilter = 'all';

// ═══ Particle Animation ═══
function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 80;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }

    draw() {
      ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.15 * (1 - distance / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    connectParticles();
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ═══ Cursor Glow Effect ═══
function initCursorGlow() {
  const cursorGlow = document.querySelector('.cursor-glow');
  if (!cursorGlow) return;

  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
    cursorGlow.style.opacity = '0.4';
  });

  document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
  });
}

// ═══ Helper Functions ═══
function badge(type) {
  return `<span class="badge badge-${type}">${type.charAt(0).toUpperCase() + type.slice(1)}</span>`;
}

function toolTags(tools) {
  return tools.map(t => `<span class="tool-tag">${t}</span>`).join('');
}

function cardHTML(item, type) {
  return `
    <div class="card" data-type="${type}" data-title="${item.title.toLowerCase()}" data-summary="${item.summary.toLowerCase()}">
      <div class="card-header">
        <h3 class="card-title">${item.title}</h3>
        ${badge(type)}
      </div>
      <p class="card-summary">${item.summary}</p>
      <div class="card-tools">${toolTags(item.tools)}</div>
      <div class="card-status">${item.status}</div>
    </div>`;
}

function categorySection(title, items, type) {
  if (!items || items.length === 0) return '';
  return `
    <div class="category-group">
      <div class="category-title">${title}</div>
      <div class="cards-grid">
        ${items.map(i => cardHTML(i, type)).join('')}
      </div>
    </div>`;
}

function buildHome() {
  const s1 = DATA.stage1;
  const s2 = DATA.stage2;
  const s1Count = s1.tasks.length + s1.practicals.length + s1.labs.length + s1.theory.length;
  const s2Count = s2.tasks.length + s2.practicals.length + s2.labs.length + s2.theory.length;
  const total = s1Count + s2Count;
  const totalTasks = s1.tasks.length + s2.tasks.length;
  const totalPracticals = s1.practicals.length + s2.practicals.length;
  const totalLabs = s1.labs.length + s2.labs.length;
  const totalTheory = s1.theory.length + s2.theory.length;

  document.getElementById('page-home').innerHTML = `
    <div class="hero">
      <div class="profile-section">
        <div class="profile-image-wrapper">
          <img src="profile.png" alt="Vraj Lalwala" class="profile-image" />
        </div>
        <div>
          <div class="hero-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
            <span>DevOps Engineer</span>
          </div>
          <h1>Vraj Lalwala<br/>DevOps Portfolio</h1>
          <p class="hero-subtitle">
            A comprehensive showcase of all tasks, practicals, labs, and theory documentation 
            from Stage 1 and Stage 2 of the DevOps Build Track internship program.
          </p>
          <div style="display: flex; justify-content: center; gap: 1rem; margin-top: -1rem; margin-bottom: 3rem;">
            <a href="https://www.linkedin.com/in/vraj-lalwala-029bb4284/" target="_blank" class="filter-btn active" style="text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; box-shadow: 0 0 30px rgba(0, 212, 255, 0.4);">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="position: relative; z-index: 2;">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              <span style="position: relative; z-index: 2;">Connect on LinkedIn</span>
              <div class="filter-glow"></div>
            </a>
            <a href="https://github.com/VrajLalwala22" target="_blank" class="filter-btn" style="text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="position: relative; z-index: 2;">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              <span style="position: relative; z-index: 2;">GitHub Profile</span>
              <div class="filter-glow"></div>
            </a>
            <a href="mailto:vrajlalwalawork@gmail.com" class="filter-btn" style="text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="position: relative; z-index: 2;">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span style="position: relative; z-index: 2;">Email Me</span>
              <div class="filter-glow"></div>
            </a>
          </div>
        </div>
      </div>
      
      <div class="hero-stats">
        <div class="stat-card">
          <div class="stat-number">${total}</div>
          <div class="stat-label">Total Items</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${totalTasks}</div>
          <div class="stat-label">Tasks</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${totalPracticals}</div>
          <div class="stat-label">Practicals</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${totalLabs}</div>
          <div class="stat-label">Labs</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${totalTheory}</div>
          <div class="stat-label">Theory</div>
        </div>
      </div>

      <div class="stage-grid">
        <div class="stage-card" onclick="showPage('stage1')">
          <div class="stage-icon">🎯</div>
          <h3>Stage 1</h3>
          <p>${s1Count} items covering AWS fundamentals, Docker, CI/CD pipelines, and monitoring infrastructure.</p>
          <div class="stage-cta">
            <span>Explore Stage 1</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>

        <div class="stage-card" onclick="showPage('stage2')">
          <div class="stage-icon">🚀</div>
          <h3>Stage 2</h3>
          <p>${s2Count} items covering advanced networking, security, GitLab CI/CD, and cloud architecture.</p>
          <div class="stage-cta">
            <span>Explore Stage 2</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>

        <div class="stage-card" onclick="showPage('practicals')">
          <div class="stage-icon">⚡</div>
          <h3>Practicals</h3>
          <p>${totalPracticals} comprehensive practical assessments demonstrating real-world DevOps implementations.</p>
          <div class="stage-cta">
            <span>View Practicals</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
        </div>
      </div>

      <div class="section-header" style="margin-top: 4rem; text-align: center;">
        <h2 style="font-size: 2rem;">Top <span class="brand-accent">GitHub Projects</span></h2>
        <p style="color: var(--text-secondary); margin-top: 0.5rem; max-width: 600px; margin-left: auto; margin-right: auto;">Explore some of my most impactful open-source contributions and personal repositories, dynamically fetched from GitHub based on community stars.</p>
      </div>
      <div class="cards-grid" id="github-projects-grid">
        <!-- Injected via JS -->
      </div>
    </div>`;
}

function buildStage(stageKey, label, desc) {
  const d = DATA[stageKey];
  return `
    <div class="section-header">
      <h2>${label}</h2>
      <p>${desc}</p>
    </div>
    ${categorySection('Tasks', d.tasks, 'task')}
    ${categorySection('Practicals', d.practicals, 'practical')}
    ${categorySection('Labs', d.labs, 'lab')}
    ${categorySection('Theory', d.theory, 'theory')}`;
}

function buildPracticals() {
  return `
    <div class="section-header">
      <h2>Practical Assessments</h2>
      <p>Comprehensive practical assessments demonstrating hands-on DevOps skills and real-world implementations.</p>
    </div>
    ${categorySection('Stage 1 Practicals', DATA.stage1.practicals, 'practical')}
    ${categorySection('Stage 2 Practicals', DATA.stage2.practicals, 'practical')}`;
}

async function fetchTopProjects() {
  try {
    const res = await fetch('https://api.github.com/users/VrajLalwala22/repos?sort=updated&per_page=20');
    if (!res.ok) return;
    const repos = await res.json();
    const topRepos = repos.filter(r => !r.fork).sort((a,b) => b.stargazers_count - a.stargazers_count).slice(0, 3);
    
    const grid = document.getElementById('github-projects-grid');
    if (!grid) return;
    
    const customDescriptions = {
      'Real-Time-tasks': 'A repository containing various hands-on DevOps implementations, including CI/CD pipelines, cloud orchestration, and containerization tasks.',
      'CloudTier-Terraform': 'A scalable and highly available multi-tier cloud infrastructure architecture provisioned entirely using Terraform.',
      'terraform-multi-tier-deployment': 'An automated, production-ready three-tier architecture deployment on AWS (ALB, ASG, RDS) built with Terraform.'
    };

    grid.innerHTML = topRepos.map(repo => `
      <a href="${repo.html_url}" target="_blank" class="card" style="text-decoration: none; display: flex; flex-direction: column;">
        <div class="card-header">
          <h3 class="card-title" style="word-break: break-all; color: var(--text-primary);">${repo.name}</h3>
          <span class="badge badge-task">⭐ ${repo.stargazers_count}</span>
        </div>
        <p class="card-summary" style="flex: 1; color: var(--text-secondary); margin-top: 0.5rem;">${repo.description || customDescriptions[repo.name] || 'No description provided.'}</p>
        <div class="card-tools" style="margin-top: 1rem;">
          <span class="tool-tag">${repo.language || 'Code'}</span>
        </div>
      </a>
    `).join('');
  } catch (e) {
    console.error('Failed to fetch github repos', e);
  }
}

function showPage(page) {
  currentPage = page;
  currentFilter = 'all';

  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  const firstFilter = document.querySelector('.filter-btn');
  if (firstFilter) firstFilter.classList.add('active');
  
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';

  ['home', 'stage1', 'stage2', 'practicals'].forEach(p => {
    const pageEl = document.getElementById('page-' + p);
    if (pageEl) pageEl.style.display = 'none';
  });

  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const navEl = document.getElementById('nav-' + page);
  if (navEl) navEl.classList.add('active');

  const toolbar = document.getElementById('toolbar');
  if (toolbar) {
    toolbar.style.display = page === 'home' ? 'none' : 'flex';
  }

  const currentPageEl = document.getElementById('page-' + page);
  if (currentPageEl) {
    currentPageEl.style.display = 'block';

    if (page === 'home') {
      buildHome();
      fetchTopProjects();
    } else if (page === 'stage1') {
      currentPageEl.innerHTML = buildStage(
        'stage1',
        'Stage 1 – Foundation',
        'Core AWS services, containerization, CI/CD fundamentals, and monitoring infrastructure. Tasks 1–10 covering essential DevOps practices.'
      );
    } else if (page === 'stage2') {
      currentPageEl.innerHTML = buildStage(
        'stage2',
        'Stage 2 – Advanced',
        'Advanced networking, security implementations, GitLab CI/CD, multi-cloud strategies, and enterprise architecture. Tasks 11–30 covering advanced DevOps concepts.'
      );
    } else if (page === 'practicals') {
      currentPageEl.innerHTML = buildPracticals();
    }
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function filterCards() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    const matchType = currentFilter === 'all' || card.dataset.type === currentFilter;
    const matchSearch = !query || 
      card.dataset.title.includes(query) || 
      card.dataset.summary.includes(query);
    
    card.style.display = matchType && matchSearch ? '' : 'none';
  });

  document.querySelectorAll('.category-group').forEach(group => {
    const visibleCards = [...group.querySelectorAll('.card')].filter(
      c => c.style.display !== 'none'
    );
    group.style.display = visibleCards.length > 0 ? '' : 'none';
  });
}

function setFilter(type, btn) {
  currentFilter = type;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  filterCards();
}

// ═══ Initialize ═══
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initCursorGlow();
  showPage('home');
});
