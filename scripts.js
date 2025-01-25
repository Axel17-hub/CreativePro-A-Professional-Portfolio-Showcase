// JavaScript for dynamic theme selection
const themeButtons = document.querySelectorAll('.select-theme');
    
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedTheme = button.getAttribute('data-theme');
            localStorage.setItem('selectedTheme', selectedTheme);   
            window.location.href = 'create-portfolio.html';   
        });
    });

// JavaScript to apply selected theme
window.onload = function() {
    const selectedTheme = localStorage.getItem('selectedTheme');
    const themePreviewContent = document.getElementById('themePreviewContent');

    if (selectedTheme) {
        switch (selectedTheme) {
            case 'classic':
                themePreviewContent.innerHTML = '<h3>Classic Elegance</h3><p>This is the classic and clean layout with soft colors.</p>';
                break;
            case 'modern':
                themePreviewContent.innerHTML = '<h3>Modern Vibrance</h3><p>This theme uses bright colors and dynamic animations.</p>';
                break;
            case 'dark':
                themePreviewContent.innerHTML = '<h3>Bold & Dark</h3><p>This theme features bold dark backgrounds with vibrant highlights.</p>';
                break;
            default:
                themePreviewContent.innerHTML = '<h3>Default Preview</h3><p>No theme selected.</p>';
                break;
        }
    }
};

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
            // Update the preview
            const previewImage = document.getElementById('imagePreview');
            previewImage.src = imageData;
            previewImage.style.display = 'block';

            const portfolioPreviewImage = document.getElementById('previewImage');
            portfolioPreviewImage.src = imageData;
            portfolioPreviewImage.style.display = 'block';

            // Save image data to localStorage
            localStorage.setItem('profileImage', imageData);
        };
        reader.readAsDataURL(file);
    }
});

// Save Portfolio Data to Local Storage
document.getElementById('portfolio-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const bio = document.getElementById('bio').value;
    const skills = document.getElementById('skills').value;
    const projects = document.getElementById('projects').value;
    const profileImage = localStorage.getItem('profileImage') || '';

    const portfolioData = { name, bio, skills, projects, profileImage };
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
    alert('Portfolio data saved!');
});

// Load Portfolio Data on Page Load
window.onload = function () {
    const portfolioData = JSON.parse(localStorage.getItem('portfolioData'));
    if (portfolioData) {
        document.getElementById('name').value = portfolioData.name;
        document.getElementById('bio').value = portfolioData.bio;
        document.getElementById('skills').value = portfolioData.skills;
        document.getElementById('projects').value = portfolioData.projects;

        if (portfolioData.profileImage) {
            document.getElementById('imagePreview').src = portfolioData.profileImage;
            document.getElementById('imagePreview').style.display = 'block';
            document.getElementById('previewImage').src = portfolioData.profileImage;
            document.getElementById('previewImage').style.display = 'block';
        }

        // Update the preview
        document.getElementById('previewName').innerText = portfolioData.name;
        document.getElementById('previewBio').innerText = portfolioData.bio;
        document.getElementById('previewSkills').innerHTML = portfolioData.skills
            .split(',')
            .map(skill => `<li>${skill.trim()}</li>`)
            .join('');
    }
};

// Export Portfolio as HTML File
document.getElementById('exportBtn').addEventListener('click', function () {
    const name = document.getElementById('name').value || '[Your Name]';
    const bio = document.getElementById('bio').value || '[Your bio]';
    const skills = document.getElementById('skills').value || '';
    const skillsList = skills.split(',').map(skill => `<li>${skill.trim()}</li>`).join('');
    const profileImage = document.getElementById('imagePreview').src || '';

    const portfolioHtml = `
        <html>
        <head>
            <title>${name}'s Portfolio</title>
        </head>
        <body>
            <h1>${name}</h1>
            <img src="${profileImage}" alt="Profile Picture" style="max-width: 150px; border-radius: 50%; margin-bottom: 15px;">
            <p>${bio}</p>
            <h3>Skills:</h3>
            <ul>${skillsList}</ul>
        </body>
        </html>
    `;

    const blob = new Blob([portfolioHtml], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'portfolio.html';
    link.click();
});
