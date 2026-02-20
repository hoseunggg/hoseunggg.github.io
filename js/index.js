fetch('yml/index.yml')
  .then(res => res.text())
  .then(text => {
    const data = jsyaml.load(text);

    document.getElementById('name').textContent = data.name;
    document.getElementById('description').textContent = data.description;

    const linksDiv = document.getElementById('links');
    data.links?.forEach(link => {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.label;
      linksDiv.appendChild(a);
    });

    const themeToggle = document.createElement('button');
    themeToggle.textContent = 'White/Dark';
    themeToggle.id = 'theme-toggle';

    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(savedTheme);


    // 학력
    const educationDiv = document.getElementById('education');
    data.education?.forEach(item => {
      const block = document.createElement('div');
      block.className = 'entry-block';
      block.innerHTML = `
        <div class="entry-header">
          <span class="entry-title">${item.institution}</span>
          <span class="entry-period">${item.period}</span>
        </div>
        <div class="entry-description">${item.title}</div>
      `;
      educationDiv.appendChild(block);
    });

    // 장학금
    const honorsList = document.getElementById('honors');
    data.honors?.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="entry-header">
          <span class="entry-title">${item.text}</span>
          <span class="entry-period">${item.year}</span>
        </div>
        ${item.description ? `<div class="entry-description">${item.description}</div>` : ''}
      `;
      honorsList.appendChild(li);
    });

    const projectsRoot = document.getElementById('projects');
    projectsRoot.innerHTML = "";                
    projectsRoot.classList.add('project-grid');

    (data.projects ?? []).forEach(item => {
      const card = document.createElement('article');
      card.className = 'project-card';


      const title = item.title ?? item.text ?? "";     
      const period = item.period ?? item.year ?? "";
      const desc = item.description ?? "";

      const tags = Array.isArray(item.tags) ? item.tags : [];
      const links = Array.isArray(item.links) ? item.links : [];

      card.innerHTML = `
        <div class="project-top">
          <h3 class="project-title">${title}</h3>
          <span class="project-period">${period}</span>
        </div>

        ${desc ? `<p class="project-desc">${desc}</p>` : ""}

        ${tags.length ? `
          <div class="project-tags">
            ${tags.map(t => `<span class="project-tag">${t}</span>`).join("")}
          </div>
        ` : ""}

        ${links.length ? `
          <div class="project-links">
            ${links.map(l => `<a href="${l.href}" target="_blank" rel="noreferrer">${l.label}</a>`).join("")}
          </div>
        ` : ""}
      `;

      projectsRoot.appendChild(card);
    });
    const badgesRoot = document.getElementById('badges');
    badgesRoot.innerHTML = "";

    (data.badges ?? []).forEach(b => {
      const item = document.createElement('div');
      item.className = 'tech-item';

      const wrap = document.createElement('span');
      wrap.className = 'tech-logo';
      wrap.title = b.name ?? '';

      const img = document.createElement('img');
      img.src = b.icon ?? '';
      img.alt = b.name ?? '';

      const label = document.createElement('div');
      label.className = 'tech-label';
      label.textContent = b.name ?? '';

      wrap.appendChild(img);
      item.appendChild(wrap);
      item.appendChild(label);

      badgesRoot.appendChild(item);
    });
    const bojRoot = document.getElementById('boj');
    bojRoot.innerHTML = "";

    if (data.boj?.href && data.boj?.img) {
      const item = document.createElement('div');
      item.className = 'boj-item';

      const a = document.createElement('a');
      a.className = 'boj-mark';
      a.href = data.boj.href;
      a.target = '_blank';
      a.rel = 'noreferrer';

      a.style.setProperty('--s', `${data.boj.size ?? 44}px`);
      a.style.setProperty('--shift', `${data.boj.shiftX ?? -12}px`);

      const img = document.createElement('img');
      img.src = data.boj.img;
      img.alt = data.boj.name ?? 'Solved.ac';

      const label = document.createElement('div');
      label.className = 'boj-label';
      label.textContent = data.boj.name ?? 'Algorithms';

      a.appendChild(img);
      item.appendChild(a);
      item.appendChild(label);

      bojRoot.appendChild(item);
    }
    
      // Tech Stack
    const skillsRoot = document.getElementById('skills');
    skillsRoot.innerHTML = "";
    skillsRoot.classList.add('skills-grid');

    (data.skills ?? []).forEach(g => {
      const card = document.createElement('div');
      card.className = 'skill-card';

      const items = Array.isArray(g.items) ? g.items : [];

      card.innerHTML = `
        <div class="skill-title">${g.group ?? ''}</div>
        <div class="skill-chips">
          ${items.map(s => `<span class="skill-chip">${s}</span>`).join('')}
        </div>
      `;

      skillsRoot.appendChild(card);
    });
    

    // 연구
    // const researchDiv = document.getElementById('research');
    // data.research?.forEach(item => {
    //   const block = document.createElement('div');
    //   block.className = 'entry-block';
    //   block.innerHTML = `
    //     <div class="entry-header">
    //       <span class="entry-title">${item.title}</span>
    //       <span class="entry-period">${item.period}</span>
    //     </div>
    //     <div class="entry-description">
    //       <strong>${item.lab}</strong><br />
    //       ${item.description}
    //     </div>
    //   `;
    //   researchDiv.appendChild(block);
    // });
  })
  .catch(err => {
    console.error('Failed to load home.yml:', err);
  });
