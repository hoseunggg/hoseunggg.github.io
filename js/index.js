fetch('yml/index.yml')
  .then(res => res.text())
  .then(text => {
    const data = jsyaml.load(text);

    // 이름과 설명
    document.getElementById('name').textContent = data.name;
    document.getElementById('description').textContent = data.description;

    // 링크
    const linksDiv = document.getElementById('links');
    data.links?.forEach(link => {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.label;
      linksDiv.appendChild(a);
    });

    // === 여기서 다크 모드 토글 버튼 추가 ===
    const themeToggle = document.createElement('button');
    themeToggle.textContent = 'White/Dark';
    themeToggle.id = 'theme-toggle';
    linksDiv.appendChild(themeToggle); // .links 안에 버튼 넣기

    // 저장된 테마 불러오기
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(savedTheme);

    // 버튼 클릭 시 테마 전환
    themeToggle.addEventListener('click', () => {
      if (document.body.classList.contains('light')) {
        document.body.classList.replace('light', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.replace('dark', 'light');
        localStorage.setItem('theme', 'light');
      }
    });

    // 업데이트
    const updatesList = document.getElementById('updates');
    data.updates?.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${item.date}</strong> ${item.text}`;
      updatesList.appendChild(li);
    });

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
    const scholarshipsList = document.getElementById('scholarships');
    data.scholarships?.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="entry-header">
          <span class="entry-title">${item.text}</span>
          <span class="entry-period">${item.year}</span>
        </div>
      `;
      scholarshipsList.appendChild(li);
    });

    // 연구
    const researchDiv = document.getElementById('research');
    data.research?.forEach(item => {
      const block = document.createElement('div');
      block.className = 'entry-block';
      block.innerHTML = `
        <div class="entry-header">
          <span class="entry-title">${item.title}</span>
          <span class="entry-period">${item.period}</span>
        </div>
        <div class="entry-description">
          <strong>${item.lab}</strong><br />
          ${item.description}
        </div>
      `;
      researchDiv.appendChild(block);
    });
  })
  .catch(err => {
    console.error('Failed to load home.yml:', err);
  });
