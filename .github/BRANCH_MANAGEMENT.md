# Branch Management & Protection Guide

To ensure high code quality and prevent accidental direct commits to critical branches, we follow a strict Pull Request (PR) workflow for `dev-fe` and `prod-fe`.

## GitHub Configuration (Action Required)

As the repository owner, please follow these steps on GitHub to enforce this management:

### 1. Enable Branch Protection
1. Go to your repository on GitHub.
2. Click **Settings** > **Branches**.
3. Under **Branch protection rules**, click **Add rule**.
4. **Branch name pattern**: `prod-fe` (and repeat for `dev-fe`).
5. Check the following options:
   - [x] **Require a pull request before merging**: This prevents direct commits.
   - [x] **Require approvals**: Set "Required number of approvals before merging" to **1**.
   - [x] **Restrict who can push to matching branches**: Ensure only authorized users/apps (like yourself) can merge, but NO ONE can push directly.
   - [x] **Require status checks to pass before merging**: Select `Build and Test` (from `ci.yml`). This ensures only passing code enters these branches.

### 2. Code Owners
The `.github/CODEOWNERS` file is already configured to automatically request a review from `@adityaxrawal` for all changes.

## Workflow

1. **Create a Feature Branch**: `git checkout -b feature/your-feature-name`
2. **Commit Changes**: Follow the project style guidelines.
3. **Push to GitHub**: `git push origin feature/your-feature-name`
4. **Open a Pull Request**: Targeted at `dev-fe` (for development) or `prod-fe` (for production).
5. **CI Checks**: Wait for the GitHub Actions (`ci.yml`) to pass.
6. **Review & Approval**: Only `@adityaxrawal` can approve and merge the PR.
