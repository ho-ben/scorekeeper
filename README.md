# Scorekeeper

Minimal static scorekeeping site ready for GitHub Pages.

## Local preview

Open `index.html` directly in a browser, or serve the directory with any static file server.

## GitHub Pages

This repo includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

1. Create a GitHub repository and push this directory.
2. In GitHub, go to `Settings` -> `Pages`.
3. Set the source to `GitHub Actions`.
4. Push to `main` to trigger deployment.

The workflow deploys the repository root as a static site.
