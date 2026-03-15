$(document).ready(function() {
    
    // Hash change observer for SPA routing
    $(window).on('hashchange', function() {
        const hash = location.hash;
        if (hash && hash !== '#') {
            const topicId = hash.replace('#', '');
            if (systemDesigns[topicId]) {
                const data = systemDesigns[topicId];
                
                if (data.isExternal) {
                    // For massive custom pages, redirect them completely to avoid SPA CSS conflicts
                    window.location.href = data.fileName;
                } else {
                    // Render the generic document template
                    renderDetailView(data);
                }
                return;
            }
        }
        renderHomeGallery();
    });

    // Handle home link clicking
    $('#home-link').on('click', function(e) {
        e.preventDefault();
        window.location.hash = ''; 
    });

    // Initial load check
    if (location.hash && location.hash !== '#') {
        $(window).trigger('hashchange');
    } else {
        renderHomeGallery();
    }

    // Render the 50 case study cards
    function renderHomeGallery() {
        $('#detail-view').hide();
        $('#detail-nav-links').hide();
        $('#nav-action-btn').hide();
        $('#gallery-view').fadeIn(300);
        
        const $grid = $('#card-container');
        $grid.empty();
        
        $.each(systemDesigns, function(id, data) {
            
            // Build the tags array
            const tagsHtml = data.techStack.slice(0, 3).map(t => `<span class="card-tag">${t}</span>`).join('');
            
            const cardHtml = `
                <a href="#${id}" class="case-card" data-title="${data.title.toLowerCase()}" data-category="${data.category || 'system'}">
                    <div class="card-header">
                        <span class="tech-badge">${data.techStack[0]}</span>
                    </div>
                    
                    <h3>${data.title}</h3>
                    <p>${data.overview}</p>
                    
                    <div class="card-footer">
                        <div class="card-tags">
                            ${tagsHtml}
                        </div>
                        <span class="read-btn">Read Case <i data-lucide="arrow-right"></i></span>
                    </div>
                </a>
            `;
            $grid.append(cardHtml);
        });
        
        // Re-init lucide icons for newly appended DOM
        if (window.lucide) {
            lucide.createIcons();
        }
    }

    function renderDetailView(data) {
        $('#gallery-view').hide();
        
        let details = data.detail;
        
        // Populate DOM elements defined in index.html
        $('#doc-title').text(data.title);
        $('#doc-overview').text(data.overview);
        $('#doc-architecture-text').text(data.architecture);
        $('#doc-db-text').text(data.database_desc || data.database);
        $('#doc-security-text').text(data.security);
        $('#doc-monitoring-text').text(data.monitoring);
        
        // Tags
        const tagsHtml = data.techStack.map(t => `<span class="card-tag tech-badge" style="background: rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:#fff; font-size: 0.8rem; padding: 0.2rem 0.6rem; border-radius: 4px;">${t}</span>`).join('');
        $('#doc-tags').html(tagsHtml);
        
        // 1. Requirements
        if (details && details.reqs) {
            const reqsHtml = details.reqs.map(r => `
                <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; background: rgba(255,255,255,0.02); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
                    <div style="color: var(--accent);"><i data-lucide="${r.icon}"></i></div>
                    <div>
                        <h4 style="color: #fff; font-family: var(--font-heading); margin-bottom: 0.5rem; font-size: 1.1rem;">${r.title}</h4>
                        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.5;">${r.desc}</p>
                    </div>
                </div>
            `).join('');
            $('#doc-req-features').html(reqsHtml);
        }

        // 2. Architecture Accordion
        if (details && details.arch_layers) {
            const layersHtml = details.arch_layers.map((l, idx) => `
                <button class="arch-layer-btn ${idx === 0 ? 'active' : ''}" data-idx="${idx}" style="background: ${idx === 0 ? 'rgba(56,189,248,0.1)' : 'var(--card-bg)'}; border: 1px solid ${idx === 0 ? 'var(--accent)' : 'var(--card-border)'}; border-radius: 8px; padding: 1rem 1.5rem; text-align: left; display: flex; align-items: center; justify-content: space-between; color: #fff; font-weight: 500; cursor: pointer; transition: all 0.2s;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <span style="color: ${idx === 0 ? 'var(--accent)' : 'var(--text-secondary)'};"><i data-lucide="${l.icon}"></i></span>
                        <span style="font-size: 1rem;">${l.title}</span>
                    </div>
                    <i data-lucide="chevron-right" style="color: var(--text-secondary); width: 16px;"></i>
                </button>
            `).join('');
            $('#doc-arch-accordion').html(layersHtml);
            
            // Setup clicks
            $('.arch-layer-btn').on('click', function() {
                $('.arch-layer-btn').css({'background': 'var(--card-bg)', 'border-color': 'var(--card-border)'}).find('i').first().css('color', 'var(--text-secondary)');
                $(this).css({'background': 'rgba(56,189,248,0.1)', 'border-color': 'var(--accent)'}).find('i').first().css('color', 'var(--accent)');
                const l = details.arch_layers[$(this).attr('data-idx')];
                $('#doc-arch-info').html(`
                    <h3 style="color: #fff; font-family: var(--font-heading); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem; font-size: 1.5rem;"><span style="color: var(--accent);"><i data-lucide="${l.icon}" style="width: 28px; height: 28px;"></i></span> ${l.title}</h3>
                    <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1rem; margin-bottom: 2rem;">${l.desc}</p>
                    <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-secondary); font-weight: 600; margin-bottom: 0.75rem; letter-spacing: 0.05em;">Key Technologies</div>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        ${l.tech.map(t => `<span style="background: rgba(56,189,248,0.05); border: 1px solid rgba(56,189,248,0.2); padding: 0.35rem 0.85rem; border-radius: 6px; color: var(--accent); font-size: 0.85rem; font-weight: 500;">${t}</span>`).join('')}
                    </div>
                `);
                lucide.createIcons();
            });
            // Click first
            $('.arch-layer-btn').first().trigger('click');
        }

        // 3. Microservices Tabs
        if (details && details.microservices) {
            const tabsHtml = details.microservices.map((ms, idx) => `
                <button class="svc-tab-btn ${idx === 0 ? 'active' : ''}" data-idx="${idx}" style="background: transparent; border: 1px solid transparent; border-left: 3px solid ${idx === 0 ? 'var(--accent)' : 'var(--card-border)'}; padding: 1.25rem 1rem; text-align: left; display: flex; align-items: center; gap: 0.75rem; color: ${idx === 0 ? 'var(--accent)' : 'var(--text-secondary)'}; cursor: pointer; transition: all 0.2s; font-weight: 500; font-size: 1rem;">
                    <i data-lucide="${ms.icon}" style="width: 20px;"></i> <span>${ms.title}</span>
                </button>
            `).join('');
            $('#doc-ms-tabs').html(tabsHtml);
            
            $('.svc-tab-btn').on('click', function() {
                $('.svc-tab-btn').css({'border-left-color': 'var(--card-border)', 'color': 'var(--text-secondary)'});
                $(this).css({'border-left-color': 'var(--accent)', 'color': 'var(--accent)'});
                const ms = details.microservices[$(this).attr('data-idx')];
                $('#doc-ms-detail').html(`
                    <div style="display: flex; align-items: flex-start; gap: 1.25rem; padding-bottom: 2rem; border-bottom: 1px solid var(--card-border); margin-bottom: 2rem;">
                        <span style="color: var(--accent); background: rgba(56,189,248,0.1); padding: 1rem; border-radius: 12px;"><i data-lucide="${ms.icon}" style="width: 32px; height: 32px;"></i></span>
                        <div>
                            <h3 style="color: #fff; font-family: var(--font-heading); margin-bottom: 0.5rem; font-size: 1.5rem;">${ms.title}</h3>
                            <p style="color: var(--text-secondary); font-size: 1rem;">${ms.details}</p>
                        </div>
                    </div>
                    
                    <div class="svc-grid-inner" style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-bottom: 2.5rem;">
                        <div>
                            <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-secondary); font-weight: 600; margin-bottom: 1.25rem; letter-spacing: 0.05em; display: flex; align-items: center; gap: 0.5rem;"><i data-lucide="check-circle" style="width: 14px;"></i> Responsibilities</div>
                            <ul style="list-style: none; color: #fff; font-size: 0.95rem; display: flex; flex-direction: column; gap: 0.75rem;">
                                ${ms.responsibilities.map(r => `<li style="display: flex; gap: 0.75rem; line-height: 1.4;"><div style="color: var(--accent); margin-top: 0.2rem;"><i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i></div> <span>${r}</span></li>`).join('')}
                            </ul>
                        </div>
                        <div>
                            <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-secondary); font-weight: 600; margin-bottom: 1.25rem; letter-spacing: 0.05em; display: flex; align-items: center; gap: 0.5rem;"><i data-lucide="zap" style="width: 14px;"></i> API Endpoints</div>
                            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                                ${ms.endpoints.map(e => `
                                    <div style="background: rgba(0,0,0,0.4); padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); font-family: var(--font-mono); font-size: 0.85rem; display: flex; gap: 1rem; align-items: center;">
                                        <span style="color: ${e.method === 'GET' ? '#4ade80' : e.method === 'POST' ? '#38bdf8' : e.method === 'WS' ? '#f472b6' : '#fbbf24'}; font-weight: 700; width: 45px;">${e.method}</span>
                                        <span style="color: #e2e8f0;">${e.path}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; background: rgba(0,0,0,0.2); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.02);">
                        <div>
                            <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-secondary); font-weight: 600; margin-bottom: 0.75rem; letter-spacing: 0.05em;">Data Store</div>
                            <div style="color: #fff; font-size: 1rem; display: flex; align-items: center; gap: 0.75rem;"><span style="color: #94a3b8;"><i data-lucide="database"></i></span> ${ms.db}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-secondary); font-weight: 600; margin-bottom: 0.75rem; letter-spacing: 0.05em;">Caching Strategy</div>
                            <div style="color: #fff; font-size: 1rem; display: flex; align-items: center; gap: 0.75rem;"><span style="color: #facc15;"><i data-lucide="bolt"></i></span> ${ms.cache}</div>
                        </div>
                    </div>
                `);
                lucide.createIcons();
            });
            $('.svc-tab-btn').first().trigger('click');
        }

        // 4. Database Schema
        if (details && details.db_schema) {
            const dbTabsHtml = details.db_schema.map((db, idx) => `
                <button class="db-tab-btn ${idx === 0 ? 'active' : ''}" data-idx="${idx}" style="background: ${idx === 0 ? 'rgba(255,255,255,0.05)' : 'transparent'}; border: 1px solid ${idx === 0 ? 'rgba(255,255,255,0.1)' : 'transparent'}; border-radius: 8px; padding: 1rem; text-align: left; display: flex; justify-content: space-between; align-items: center; color: #fff; cursor: pointer; transition: all 0.2s;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="color: var(--text-secondary);"><i data-lucide="table" style="width: 16px;"></i></span>
                        <span style="font-family: var(--font-mono); font-size: 0.95rem;">${db.title}</span>
                    </div>
                    <span style="background: rgba(0,0,0,0.4); font-size: 0.75rem; padding: 0.25rem 0.5rem; border-radius: 6px; color: var(--text-secondary);">${db.cols}</span>
                </button>
            `).join('');
            $('#doc-db-tabs').html(dbTabsHtml);
            
            $('.db-tab-btn').on('click', function() {
                $('.db-tab-btn').css({'background': 'transparent', 'border-color': 'transparent'});
                $(this).css({'background': 'rgba(255,255,255,0.05)', 'border-color': 'rgba(255,255,255,0.1)'});
                const db = details.db_schema[$(this).attr('data-idx')];
                $('#doc-db-detail').html(`
                    <div style="background: rgba(0,0,0,0.4); padding: 1.5rem 2rem; border-bottom: 1px solid var(--card-border); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                        <h3 style="font-family: var(--font-mono); color: var(--accent); margin: 0; font-size: 1.25rem; display: flex; align-items: center; gap: 0.5rem;"><i data-lucide="table"></i> ${db.title}</h3>
                        ${db.index ? `<span style="background: rgba(56,189,248,0.1); border: 1px solid rgba(56,189,248,0.3); color: var(--accent); padding: 0.35rem 0.75rem; border-radius: 6px; font-size: 0.8rem; font-family: var(--font-mono);"><i data-lucide="key" style="width: 12px; margin-right: 4px;"></i> ${db.index}</span>` : ''}
                    </div>
                    <div style="overflow-x: auto;">
                        <table style="width: 100%; border-collapse: collapse; text-align: left; min-width: 500px;">
                            <thead>
                                <tr style="border-bottom: 1px solid var(--card-border); background: rgba(255,255,255,0.02);">
                                    <th style="padding: 1.25rem 2rem; color: var(--text-secondary); font-size: 0.8rem; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">Column</th>
                                    <th style="padding: 1.25rem 2rem; color: var(--text-secondary); font-size: 0.8rem; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">Type</th>
                                    <th style="padding: 1.25rem 2rem; color: var(--text-secondary); font-size: 0.8rem; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${db.columns.map(c => `
                                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.02); transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.03)'" onmouseout="this.style.background='transparent'">
                                        <td style="padding: 1.25rem 2rem; font-family: var(--font-mono); font-size: 0.95rem; color: #fff; font-weight: 500;">${c.name}</td>
                                        <td style="padding: 1.25rem 2rem; font-family: var(--font-mono); font-size: 0.9rem; color: var(--accent);">${c.type}</td>
                                        <td style="padding: 1.25rem 2rem; font-size: 0.9rem; color: var(--text-secondary); font-style: italic;">${c.notes}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `);
                lucide.createIcons();
            });
            $('.db-tab-btn').first().trigger('click');
        }

        // Update top nav
        $('#detail-nav-links').show();
        $('#nav-action-btn').show();

        // Show View
        $('#detail-view').fadeIn(300);
        
        // Re-init icons
        if (window.lucide) {
            lucide.createIcons();
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
    }

    // --- Filter functionality ---
    $('.filter-tag').on('click', function() {
        $('.filter-tag').removeClass('active');
        $(this).addClass('active');
        applyFilters();
    });

    // --- Search functionality filter ---
    $('#searchInput').on('keyup', function() {
        applyFilters();
    });

    function applyFilters() {
        const query = $('#searchInput').val().toLowerCase();
        const filter = $('.filter-tag.active').attr('data-filter');
        
        $('.case-card').each(function() {
            const title = $(this).attr('data-title');
            const category = $(this).attr('data-category');
            
            let searchMatch = title.includes(query);
            let filterMatch = false;
            
            if (filter === 'all') {
                filterMatch = true;
            } else if (filter === 'distributed' && ['infrastructure', 'system', 'educational'].includes(category)) {
                filterMatch = true;
            } else if (filter === 'social' && ['social', 'messaging', 'ecommerce'].includes(category)) {
                filterMatch = true;
            } else if (filter === 'data' && ['data', 'streaming', 'geospatial', 'storage'].includes(category)) {
                filterMatch = true;
            }
            
            if (filterMatch && searchMatch) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    // Smooth scrolling for sticky nav inside Detail View
    $('#detail-nav-links a').on('click', function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80 // offset for sticky header
            }, 500);
        }
    });
});
