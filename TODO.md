# TODO

## CI / Deployment

- [ ] **Switch to official GitHub Actions Pages source**: replace `peaceiris/actions-gh-pages` with `actions/upload-pages-artifact` + `actions/deploy-pages`; change Pages source in repo settings to "GitHub Actions" — eliminates the `gh-pages` branch and gives per-run deployment history.
- [ ] Run `npm audit fix` to resolve the remaining moderate vulnerability.
