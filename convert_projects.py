#!/usr/bin/env python3
"""
Script to convert project HTML files to new structure
Updates paths and adds proper HTML boilerplate
"""

import os
import re

def update_project_paths(content):
    """Update all paths in project HTML content"""
    
    # Update CSS imports
    content = re.sub(r'@import url\([\'"]\.\.\/styles\.css[\'"]\);', '', content)
    
    # Update image paths
    content = re.sub(r'\.\.\/images\/', '../assets/images/', content)
    content = re.sub(r'images\/', '../assets/images/', content)
    
    # Update presentation paths
    content = re.sub(r'\.\.\/presentations\/', '../presentations/', content)
    content = re.sub(r'presentations\/', '../presentations/', content)
    
    # Update navigation links
    content = re.sub(r'href="\.\.\/index\.html"', 'href="../index.html"', content)
    content = re.sub(r'href="\.\.\/index\.html#', 'href="../index.html#', content)
    
    # Update script paths
    content = re.sub(r'<script src="\.\.\/script\.js">', '<script src="../assets/js/main.js">', content)
    content = re.sub(r'<script src="script\.js">', '<script src="../assets/js/main.js">', content)
    
    return content

def create_project_template(title, icon, content_body):
    """Create a project page with proper template"""
    
    template = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - Thijn Bakker</title>
    <meta name="description" content="{title} project showcasing data science and AI skills">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="../assets/images/icons/{icon}">
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="../assets/css/main.css">
    <link rel="stylesheet" href="../assets/css/components.css">
    <link rel="stylesheet" href="../assets/css/projects.css">
</head>
<body>
    <div class="bg-animation"></div>

    <!-- Navigation -->
    <nav id="navbar">
        <div class="nav-container">
            <a href="../index.html" class="logo">Thijn Bakker</a>
            <ul class="nav-links">
                <li><a href="../index.html">Home</a></li>
                <li><a href="../index.html#about">About</a></li>
                <li><a href="../index.html#projects">Projects</a></li>
                <li><a href="../index.html#contact">Contact</a></li>
            </ul>
        </div>
    </nav>

    {content_body}

    <!-- Back to Projects -->
    <section class="back-navigation">
        <a href="../index.html#projects" class="btn btn-secondary">← Back to Projects</a>
    </section>

    <!-- Footer -->
    <footer>
        <p>&copy; 2025 Thijn Bakker. Built with passion and lots of coffee ☕</p>
    </footer>

    <!-- JavaScript -->
    <script src="../assets/js/main.js"></script>
    <script src="../assets/js/components/slider.js"></script>
    <script src="../assets/js/components/paper-viewer.js"></script>
</body>
</html>'''
    
    return template

# Project mapping
projects = {
    'emotion-classification.html': {
        'title': 'Emotion Classification from Video Dialogue',
        'icon': 'cloud_icon.png'
    },
    'plant-robotics.html': {
        'title': 'Automated Plant Root Analysis & Robotics',
        'icon': 'robot_icon.png'
    },
    'analytics-translator.html': {
        'title': 'AI Analytics Translator',
        'icon': 'pen_icon.png'
    },
    'road-safety.html': {
        'title': 'AI-Driven Road Safety Analysis',
        'icon': 'car_icon.png'
    },
    'traffic-sign-detection.html': {
        'title': 'Traffic Sign Detection',
        'icon': 'traffic_sign_icon.ico'
    },
    'nac-breda.html': {
        'title': 'Smart Player Recruitment for NAC Breda',
        'icon': 'goal_icon.png'
    },
    'sdg-analysis.html': {
        'title': 'AI for Sustainable Development Goals',
        'icon': 'fork_knife_icon.png'
    },
    'epl-prediction.html': {
        'title': 'EPL Match Prediction & Player Valuation',
        'icon': 'football_icon.ico'
    },
    'graph2table.html': {
        'title': 'Graph2Table: Visual Data Extraction',
        'icon': 'chart_icon.png'
    }
}

print("Project conversion script ready!")
print(f"Will process {len(projects)} project files")
print("\nProjects to convert:")
for filename in projects:
    print(f"  - {filename}")

# Process each project file

for filename, info in projects.items():
    input_path = os.path.join('projects', filename)
    output_path = os.path.join('projects', filename)
    
    if not os.path.isfile(input_path):
        print(f"Warning: {input_path} does not exist, skipping...")
        continue
    
    with open(input_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    updated_content = update_project_paths(content)
    final_content = create_project_template(info['title'], info['icon'], updated_content)
    
    with open(output_path, 'w', encoding='utf-8') as file:
        file.write(final_content)
    
    print(f"Converted {filename} successfully.")
print("All projects converted successfully!")
