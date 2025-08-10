#!/bin/bash
# Deploy to GitHub Pages (gh-pages branch)

set -e

# Build the project
npm run build

# Navigate to the build output directory
cd dist

# Always remove any existing .git folder to avoid branch/remote conflicts
rm -rf .git

git init
git remote set-url origin https://github.com/Ashin-Jiyo/pdf.git 2>/dev/null || git remote add origin https://github.com/Ashin-Jiyo/pdf.git
git checkout -b gh-pages
git add .
git commit -m "Deploy to GitHub Pages"
git push -f origin gh-pages

cd ..
echo "Deployed to GitHub Pages!"
