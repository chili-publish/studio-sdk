# Release Pipeline Sequence Diagram

## Regular Release Flow (main branch → UAT → PRD)

```plantuml
@startuml
actor User
participant "create-release.yml" as CreateRelease
participant "deploy-release.yml" as DeployRelease
participant "GitHub" as GitHub
participant "Main Branch" as Main
participant "Hotfix Branch" as HotfixBranch

note over Main: Initial state: main branch\nwith version 1.3.0-alpha.0\n(Minor version reflects Post Production bumping after previous PRD release)

User -> CreateRelease: 1. Create UAT Regular Release\n(environment: uat, release_type: regular,\nengine_version: optional)\nFrom: current branch (main)
CreateRelease -> CreateRelease: Auto-calculate previous tag\n(latest PRD release for UAT regular)
alt Engine version provided
    CreateRelease -> CreateRelease: Update editor-engine.json
end
CreateRelease -> GitHub: Create tag 1.3.0-rc.0 (prerelease)
GitHub -> DeployRelease: Trigger deployment
DeployRelease -> DeployRelease: Deploy to UAT\n(Publish to GitHub Packages,\nDeploy to Azure CDN)

note over CreateRelease,DeployRelease: Optional: UAT Hotfix if issues found

opt UAT Hotfix needed
    User -> HotfixBranch: Create hotfix branch\nfrom tag 1.3.0-rc.0
    HotfixBranch -> HotfixBranch: Apply fixes
    User -> CreateRelease: 1a. Create UAT Hotfix\n(environment: uat, release_type: hotfix)\nFrom: hotfix branch
    CreateRelease -> CreateRelease: Auto-calculate previous tag\n(latest UAT release: 1.3.0-rc.0)
    CreateRelease -> GitHub: Create tag 1.3.0-rc.1 (prerelease)
    GitHub -> DeployRelease: Trigger deployment
    DeployRelease -> DeployRelease: Deploy to UAT
end

User -> CreateRelease: 2. Create PRD Regular Release\n(environment: prd, release_type: regular)
CreateRelease -> CreateRelease: Auto-calculate base UAT tag\n(latest regular UAT: 1.3.0-rc.1 or 1.3.0-rc.0)\nCheckout UAT tag
CreateRelease -> GitHub: Create tag 1.3.0 (production)
GitHub -> DeployRelease: Trigger deployment
DeployRelease -> DeployRelease: Deploy to PRD\n(Publish to NPM public,\nDeploy to Azure CDN)
DeployRelease -> Main: Bump main to 1.4.0-alpha.0\n(for next dev cycle)

@enduml
```

## Hotfix Release Flow (hotfix branch → UAT → PRD)

```plantuml
@startuml
actor User
participant "create-release.yml" as CreateRelease
participant "deploy-release.yml" as DeployRelease
participant "GitHub" as GitHub
participant "Previous PRD" as PRD
participant "Hotfix Branch" as HotfixBranch

note over PRD: Initial state: Previous PRD release\ntag 1.2.3 (production)

User -> HotfixBranch: Create hotfix branch\nfrom previous PRD tag (e.g., 1.2.3)
HotfixBranch -> HotfixBranch: Apply fixes
User -> CreateRelease: 1. Create UAT Hotfix\n(environment: uat, release_type: hotfix)\nFrom: hotfix branch
CreateRelease -> CreateRelease: Auto-calculate previous tag\n(latest PRD release: 1.2.3)
CreateRelease -> GitHub: Create tag 1.2.4-rc.0 (prerelease)
GitHub -> DeployRelease: Trigger deployment
DeployRelease -> DeployRelease: Deploy to UAT\n(Publish to GitHub Packages,\nDeploy to Azure CDN)

note over CreateRelease,DeployRelease: Optional: Additional UAT Hotfix if issues found

opt Additional UAT Hotfix needed
    User -> HotfixBranch: Update hotfix branch\nfrom tag 1.2.4-rc.0
    HotfixBranch -> HotfixBranch: Apply additional fixes
    User -> CreateRelease: 1a. Create UAT Hotfix\n(environment: uat, release_type: hotfix)\nFrom: updated hotfix branch
    CreateRelease -> CreateRelease: Auto-calculate previous tag\n(latest UAT release: 1.2.4-rc.0)
    CreateRelease -> GitHub: Create tag 1.2.4-rc.1 (prerelease)
    GitHub -> DeployRelease: Trigger deployment
    DeployRelease -> DeployRelease: Deploy to UAT
end

User -> CreateRelease: 2. Create PRD Hotfix\n(environment: prd, release_type: hotfix)
CreateRelease -> CreateRelease: Auto-calculate base UAT tag\n(latest hotfix UAT: 1.2.4-rc.1 or 1.2.4-rc.0)\nCheckout UAT tag
CreateRelease -> GitHub: Create tag 1.2.4 (production)
GitHub -> DeployRelease: Trigger deployment
DeployRelease -> DeployRelease: Deploy to PRD\n(Publish to NPM public,\nDeploy to Azure CDN)
note over DeployRelease: No version bump to main\n(preserves patch space)

@enduml
```

For detailed sequence diagrams of individual release flows, see [RELEASE_PIPELINE_DETAILED.md](./RELEASE_PIPELINE_DETAILED.md).
