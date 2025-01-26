// JavaScript for dynamic theme selection
const themeButtons = document.querySelectorAll('.select-theme');
    
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedTheme = button.getAttribute('data-theme');
            localStorage.setItem('selectedTheme', selectedTheme);   
            window.location.href = 'create-portfolio.html';   
        });
    });

// Apply the selected theme from localStorage
document.addEventListener('DOMContentLoaded', function() {
    const selectedTheme = localStorage.getItem('selectedTheme');
    
    if (selectedTheme) {
        document.body.classList.add(selectedTheme);  
    }
});

// Dynamic Preview Updates
document.getElementById('name').addEventListener('input', function (e) {
    document.getElementById('previewName').innerText = e.target.value || '[Your Name]';
});

document.getElementById('bio').addEventListener('input', function (e) {
    document.getElementById('previewBio').innerText = e.target.value || '[Your bio will appear here]';
});

document.getElementById('skills').addEventListener('input', function (e) {
    const skillList = document.getElementById('previewSkills');
    skillList.innerHTML = '';
    if (e.target.value) {
        const skills = e.target.value.split(',').map(skill => skill.trim());
        skills.forEach(skill => {
            const li = document.createElement('li');
            li.innerText = skill;
            skillList.appendChild(li);
        });
    }
});

// Handle Image Upload
document.getElementById('imageUploader').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const imageData = event.target.result;
            const previewImage = document.getElementById('imagePreview');
            previewImage.src = imageData;
            previewImage.style.display = 'block';

            const portfolioPreviewImage = document.getElementById('previewImage');
            portfolioPreviewImage.src = imageData;
            portfolioPreviewImage.style.display = 'block';

            localStorage.setItem('profileImage', imageData);
        };
        reader.readAsDataURL(file);
    }
});

// Handle Clear Button Click
document.getElementById('clearButton').addEventListener('click', function () {
    // Clear the text inputs
    document.getElementById('name').value = '';
    document.getElementById('bio').value = '';
    document.getElementById('skills').value = '';
    document.getElementById('projects').value = '';
    document.getElementById('imageUploader').value = '';

    const previewImage = document.getElementById('imagePreview');
    previewImage.src = '';
    previewImage.style.display = 'none';

    const previewImagePortfolio = document.getElementById('previewImage');
    previewImagePortfolio.src = '';
    previewImagePortfolio.style.display = 'none';
    document.getElementById('previewName').innerText = '[Your Name]';
    document.getElementById('previewBio').innerText = '[Your bio will appear here]';
    document.getElementById('previewSkills').innerHTML = '';
    document.getElementById('previewProjects').innerHTML = '';

    const previewProjects = document.getElementById('previewProjects');
    previewProjects.innerHTML = '';

    const projectsPreview = document.getElementById('projects-preview');
    projectsPreview.innerHTML = '';
});

// Dynamic Preview Updates (for projects)
document.getElementById('projects').addEventListener('input', function (e) {
    const projectsList = document.getElementById('previewProjects');
    projectsList.innerHTML = '';
    if (e.target.value) {
        const projects = e.target.value.split('\n').map(project => project.trim());
        projects.forEach(project => {
            const li = document.createElement('li');
            li.innerText = project;
            projectsList.appendChild(li);
        });
    }
});

function previewImages() {
    const previewDiv = document.getElementById('projects-preview');
    previewDiv.innerHTML = '';  
    const files = document.getElementById('projects').files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;  
            img.style.maxWidth = '100px';  
            img.style.height = 'auto';
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Project Title';
            const div = document.createElement('div');
            div.classList.add('project-item');
            div.appendChild(img);
            div.appendChild(input);
            previewDiv.appendChild(div);
        };
        
        reader.readAsDataURL(file);  
    }
}

// Export Portfolio as HTML File
document.getElementById('exportBtn').addEventListener('click', function () {
    const encodeHTML = (str) => {
        return str.replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
                  .replace(/"/g, "&quot;")
                  .replace(/'/g, "&#039;");
    };

    const name = encodeHTML(document.getElementById('name').value || '[Your Name]');
    const bio = encodeHTML(document.getElementById('bio').value || '[Your bio]');
    const skills = encodeHTML(document.getElementById('skills').value || '');
    const skillsList = skills.split(',').map(skill => `<li>${skill.trim()}</li>`).join('');
    const projectImages = document.getElementById('projects-preview').children;
    let projectsList = '';
    
    if (projectImages.length > 0) {
        Array.from(projectImages).forEach(imageElement => {
            const imgSrc = imageElement.querySelector('img').src;  
            const projectTitle = imageElement.querySelector('input').value || 'Untitled Project';  

            projectsList += `
                <li>
                    <strong>${projectTitle}</strong><br>
                    <img src="${imgSrc}" alt="${projectTitle}" style="max-width: 200px; max-height: 150px; width: 200px; height: 150px; object-fit: cover;">
                </li>
            `;
        });
    } else {
        const projects = encodeHTML(document.getElementById('projects').value || '');
        projectsList = projects.split(',').map(project => `<li>${project.trim()}</li>`).join('');
    }

        const profileImage = document.getElementById('imagePreview').src || 'default-profile.jpg';
        const bodyElement = document.body;
        let activeTheme = 'classic';
        if (bodyElement.classList.contains('modern')) {
            activeTheme = 'modern';
        } else if (bodyElement.classList.contains('dark')) {
            activeTheme = 'dark';
        }

        const themeStyles = {
            classic: `
                body.classic {
                    margin: 10px 0;
                    background-color: white;
                    color: #071952;
                    font-family: 'Georgia', serif;
                }

                body.classic #portfolio {
                    max-width: auto;
                    max-height: 100%;
                    background-image: url('https://img.freepik.com/free-vector/gradient-blue-background_23-2149331354.jpg?t=st=1737894088~exp=1737897688~hmac=aa2fe0419e7f9071a9409db61fd45c8cba76a9f81cbaf3e7849277560fd9f6e1&w=900');
                    background-size: cover;
                    background-position: center;
                    color: lightblue;
                }

                body.classic #Image {
                    margin: 10px 0;
                    display: block;
                    margin: 0 auto;
                    border: 5px solid cyan;
                    border-radius: 50%;
                    max-width: 200px;
                }

                body.classic #Name {
                    text-align: center;
                    font-size: 32px;
                    margin-top: 20px;
                }

                body.classic #Bio {
                    text-align: center;
                    font-size: 20px;
                    margin-top: 10px;
                }

                body.classic h1, body.classic p {
                    text-align: center;
                }

                body.classic h3 {
                    margin-left: 20px;
                }

                body.classic ul {
                    list-style-type: none;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                }
                body.classic ul li {
                    margin: 5px 10px;
                    border: 1px solid lightblue;
                    padding: 5px;
                    border-radius: 5px;
                    transition: 0.3s ease;
                }
                body.classic ul li:hover {
                    background-color: lightblue;
                    color: white;
                }
            `,
            modern: `
                body.modern {
                    font-family: 'Roboto', sans-serif;
                    background-color: #f5f5f5;
                    color: #333;
                }

                body.modern #portfolio {
                    background-image: url('https://img.freepik.com/free-vector/green-abstract-geometric-background_23-2148373478.jpg?t=st=1737893963~exp=1737897563~hmac=d5697a5c552438e9da024fed25c63662695ede2b00a312b94f72ce8c55b7ea6c&w=900');  
                    background-size: cover;
                    background-position: center;
                    color: darkgreen;
                }

                body.modern #Image {
                    margin: 10px 0;
                    display: block;
                    margin: 0 auto;
                    border: 5px solid darkgreen;
                    border-radius: 50%;
                    max-width: 200px;
                }

                body.modern #Name {
                    text-align: center;
                    font-size: 32px;
                    margin-top: 20px;
                }

                body.modern #Bio {
                    text-align: center;
                    font-size: 20px;
                    margin-top: 10px;
                }

                body.modern h1, body.classic p {
                    text-align: center;
                }

                body.modern h3 {
                    margin-left: 20px;
                }

                body.modern ul {
                    list-style-type: none;
                    padding: 0;
                    margin-top: 20px;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                body.modern ul li {
                    font-size: 18px;
                    background-color: green;
                    color: white;
                    margin: 10px 15px;
                    padding: 5px 10px;
                    border: 1px solid green;
                    border-radius: 5px;
                    transition: background-color 0.3s ease;
                }
                body.modern ul li:hover {
                    background-color: darkgreen;
                    color: white;
                }
            `,
            dark: `
                body.dark {
                    font-family: 'Courier New', monospace;
                    background-color: #333;
                    color: #fff;
                }

                body.dark #portfolio {
                    font-family: 'Georgia', serif;
                    background-image: url('https://img.freepik.com/free-vector/abstract-black-texture-background-hexagon_206725-413.jpg?t=st=1737893827~exp=1737897427~hmac=ad93804fa48b1ccb051c8f39aa944bc2a7af1ff4a4a3082e99a2e6c79a644b29&w=900');  
                    background-size: cover;
                    background-position: center;
                    color: white;
                }

                body.dark #Image {
                    margin: 10px 0;
                    display: block;
                    margin: 0 auto;
                    border: 5px solid white;
                    border-radius: 50%;
                    max-width: 200px;
                }

                body.dark #Name {
                    text-align: center;
                    font-size: 36px;
                    margin-top: 15px;
                }

                body.dark #Bio {
                    text-align: center;
                    font-size: 20px;
                    margin-top: 10px;
                }

                body.dark h3 {
                    margin-left: 20px;
                }

                body.dark ul {
                    list-style-type: none;
                    padding: 0;
                    margin-top: 20px;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                body.dark ul li {
                    font-size: 18px;
                    background-color: gray;
                    color: white;
                    margin: 10px 15px;
                    padding: 5px 10px;
                    border: 1px solid black;
                    border-radius: 5px;
                    transition: background-color 0.3s ease;
                }

                body.dark ul li:hover {
                    background-color: darkgrey;
                    color: white;
                }
            `
        };

        const styles = themeStyles[activeTheme] || themeStyles['classic'];

        const portfolioHtml = `
            <html>
            <head>
                <style>
                    ${styles}
                </style>
            </head>
            <body class="${activeTheme}">
                <div id="portfolio">
                    <img id="Image" src="${profileImage}" alt="Profile Picture">
                    <h1 id="Name">${name}</h1>
                    <p id="Bio">${bio}</p>
                    <h3>Skills:</h3>
                    <ul>${skillsList}</ul>
                    <h3>Projects:</h3>
                    <ul>${projectsList}</ul>
                </div>
            </body>
            </html>
        `;

        const blob = new Blob([portfolioHtml], { type: 'text/html' });

        if (window.navigator.msSaveBlob) {  
            window.navigator.msSaveBlob(blob, 'portfolio.html');
        } else {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'portfolio.html';
            link.click();
        }
    
});

// Select the file input and previewProjects container
const fileInput = document.getElementById("projects"); 
const previewProjects = document.getElementById("previewProjects");

fileInput.addEventListener("change", function (event) {
  previewProjects.innerHTML = "";

  const files = event.target.files;

  for (const file of files) {
    if (file.type.startsWith("image/")) {
      const imageURL = URL.createObjectURL(file);

      const imgElement = document.createElement("img");
      imgElement.src = imageURL;
      imgElement.style.width = "150px"; 
      imgElement.style.margin = "10px"; 

      previewProjects.appendChild(imgElement);
    } else {
      alert("Please upload only image files.");
    }
  }
});

