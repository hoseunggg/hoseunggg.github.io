fetch('yml/study.yml')
  .then(res => res.text())
  .then(text => {
    const data = jsyaml.load(text);

    document.getElementById('description').textContent = data.description;

    const linksDiv = document.getElementById('links');
    if (data.links) {
      data.links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.label;
        linksDiv.appendChild(a);
      });
    }
    
    const container = document.getElementById('study-content');
    container.innerHTML = ''; 
    
    if (data.fields) {
      data.fields.forEach(field => {
        const section = document.createElement('section');
        const title = document.createElement('h2');
        title.textContent = field.major;
        section.appendChild(title);

        const buttonGrid = document.createElement('div');
        buttonGrid.className = 'button-grid';

        field.courses.forEach(course => {
          const button = document.createElement('a');
          button.className = 'course-button';
          button.href = course.file;
          button.textContent = course.name;
          button.target = "_blank";
          buttonGrid.appendChild(button);
        });

        section.appendChild(buttonGrid);
        container.appendChild(section);
      });
    }

    // ✅ 또는 semesters 기반 리스트 (선택적)
    else if (data.semesters) {
      const ul = document.createElement('ul');
      data.semesters.forEach(entry => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = entry.file;
        a.textContent = `${entry.term}: ${entry.title}`;
        a.target = "_blank";
        li.appendChild(a);
        ul.appendChild(li);
      });
      container.appendChild(ul);
    }
  })
  .catch(err => {
    console.error("Error loading study.yml:", err);
    document.getElementById('study-content').textContent = 'Failed to load data.';
  });
