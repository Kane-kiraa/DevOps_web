"use client";
import { useEffect, useState } from "react";

type QuizItem = { q: string; a: string; options: string[] };
type Flashcard = { term: string; def: string };
type Module = {
  id: number; title: string; titleKH: string; icon: string; color: string;
  bgGrad: string; duration: string; difficulty: "Beginner"|"Intermediate"|"Advanced"|"Expert";
  xp: number; content: string; code: string; points: string[];
  keyTakeaways: string[]; quiz: QuizItem[]; flashcards: Flashcard[]; tips: string[];
};

const DIFFICULTY_COLOR: Record<Module["difficulty"], string> = {
  Beginner: "#22c55e", Intermediate: "#f59e0b", Advanced: "#ec4899", Expert: "#8b5cf6",
};
const DIFFICULTY_OPTIONS: Array<"All" | Module["difficulty"]> = ["All","Beginner","Intermediate","Advanced","Expert"];

const MODULES: Module[] = [
  {
    id: 0,
    title: "DevOps & SRE Foundation",
    titleKH: "មូលដ្ឋានគ្រឹះ DevOps & SRE",
    icon: "🚀",
    color: "#06b6d4",
    bgGrad: "from-cyan-500 to-blue-600",
    duration: "1 សប្តាហ៍",
    difficulty: "Beginner",
    xp: 100,
    content: `DevOps មិនមែនជា Tool ឬភាសាសរសេរកូដទេ — វាជា "វប្បធម៌ (Culture)" ភ្ជាប់ Dev & Ops ដើម្បី Deliver Software លឿន, ស្ថិរ, សុវត្ថិភាព។ SRE (Site Reliability Engineering) ដែលបង្កើតដោយ Google ជាការអនុវត្ត DevOps ជាក់ស្ដែង ប្រើ Software Engineering Skills ដោះស្រាយ Ops Problems ដើម្បីកាត់ Downtime ឱ្យទាបបំផុត។`,
    code: `// CAMS Framework - សសរស្ដម្ភ DevOps
1. Culture     - ទម្លាយជញ្ជាំង Dev vs Ops
2. Automation  - លុបការងារដោយដៃ
3. Measurement - DORA Metrics + SLI/SLO/SLA
4. Sharing     - ចែករំលែក Knowledge + Tools

// SLA → SLO → SLI (ផ្ទៀងផ្ទាត់ប្រព័ន្ធ)
SLA: ការសន្យា Uptime 99.9%/ឆ្នាំ (Contract)
SLO: គោលដៅ Response Time < 300ms (Internal)
SLI: Real Measurement = 250ms (Actual Data)

// DORA Metrics - មាត្រដ្ឋានវាស់ Team DevOps
- Deployment Frequency   : Deploy ញឹកញាប់ប៉ុណ្ណា?
- Lead Time for Changes  : Code → Production = ?
- MTTR                   : ចំណាយពេលប៉ុន្មានដើម្បី Recover?
- Change Failure Rate    : Deploy ខ្សោយ = ?%`,
    points: [
      "DevOps Culture & CAMS Framework",
      "SRE (Site Reliability Engineering) គំនិត",
      "SLA → SLO → SLI Hierarchy",
      "DORA Metrics: 4 Golden Team Metrics",
      "Value Stream Mapping (VSM) Bottleneck"
    ],
    keyTakeaways: [
      "DevOps = វប្បធម៌ (Culture)",
      "SRE = ការអនុវត្ត DevOps ដោយប្រើ Code",
      "SLA → SLO → SLI = Reliability Framework",
      "DORA = វាស់ Team Performance",
      "VSM = ស្វែងរក Bottleneck ក្នុងការផ្គត់ផ្គង់"
    ],
    quiz: [
      { q: "DevOps ជាអ្វី?", a: "វប្បធម៌ភ្ជាប់ Dev & Ops", options: ["Tool", "ភាសាកូដ", "វប្បធម៌ភ្ជាប់ Dev & Ops", "ប្រព័ន្ធប្រតិបត្តិការ"] },
      { q: "SRE ខុសពី DevOps យ៉ាងណា?", a: "SRE ជាការអនុវត្ត DevOps ដោយប្រើ Software Engineering", options: ["SRE ជា Tool", "SRE ជាការអនុវត្ត DevOps ដោយប្រើ Software Engineering", "SRE = DevOps ពេញ", "SRE គ្មានទំនាក់ DevOps"] },
      { q: "MTTR ក្នុង DORA Metrics ជាអ្វី?", a: "Mean Time To Recovery - ពេលជាមធ្យម Recover ប្រព័ន្ធ", options: ["Metric Test Run Rate", "Mean Time To Recovery - ពេលជាមធ្យម Recover ប្រព័ន្ធ", "Max Transaction Rate", "Monitoring Tool Result"] }
    ],
    flashcards: [
      { term: "DevOps", def: "វប្បធម៌ការងារភ្ជាប់ Dev & Ops ដើម្បី Deliver Software លឿន, ស្ថិរ, ចាត់ចែងល្អ" },
      { term: "SRE", def: "Site Reliability Engineering - Google's approach: ប្រើ Code ដោះស្រាយ Ops Problems" },
      { term: "SLA", def: "Service Level Agreement - Contract Uptime ជាមួយ Customer (ប្រសិនបើខូច → សសង)" },
      { term: "SLO", def: "Service Level Objective - Target Internal (Response < 300ms) ប្រុងប្រយ័ត្ន SLA" },
      { term: "SLI", def: "Service Level Indicator - Measurement ជាក់ស្ដែង (Actual Latency = 250ms)" },
      { term: "DORA Metrics", def: "4 Metrics: Deployment Frequency, Lead Time, MTTR, Change Failure Rate" },
      { term: "VSM", def: "Value Stream Mapping - គូរ Workflow ពីដើមមកចុង ស្វែងរក Waste & Bottleneck" }
    ],
    tips: [
      "ចាប់ផ្តើម Culture ជាមុន Tools — DevOps ≠ Jenkins ឬ Kubernetes",
      "SLO ត្រូវតែ ≥ SLA (Stricter) ដើម្បីមាន Buffer",
      "MTTR ចង់ LOW, Deployment Frequency ចង់ HIGH = Healthy Team",
      "Error Budget = 100% - SLO% ពេល Budget អស់ → Stop Feature, Fix Reliability"
    ]
  },
  {
    id: 1,
    title: "Linux & Networking",
    titleKH: "លីនុច និងបណ្តាញ",
    icon: "🐧",
    color: "#10b981",
    bgGrad: "from-green-500 to-emerald-700",
    duration: "3 សប្តាហ៍",
    difficulty: "Intermediate",
    xp: 200,
    content: `Server ជាង 90% ពិភពលោករត់លើ Linux ។ DevOps Engineer ត្រូវចេះ File System, Permissions, Systemd, SSH, Networking (DNS, TCP, Subnetting) និង Troubleshooting Tools (htop, lsof, strace, journalctl) ដើម្បីអាចរៀបចំ Server, Debug Incidents, និង Secure Production Environment ។`,
    code: `# Linux Troubleshooting Toolkit
htop              # CPU/RAM/Process real-time monitor
lsof -i :8080     # Process ណាប្រើ Port 8080?
strace -p <PID>   # Trace System Calls (debug hang)
journalctl -u nginx -f  # Follow nginx logs

# DNS Records (ចំណេះជ្រៅ)
# A Record  : kiraa.dev → 203.0.113.10 (IP)
# CNAME     : www.kiraa.dev → kiraa.dev (Alias)
# TXT       : ប្រើ Domain Ownership Verification

# Subnetting: /24 = 256 IPs (254 usable)
# TCP 3-Way Handshake:
# Client → SYN → Server
# Server → SYN-ACK → Client
# Client → ACK → Server (Connected!)

# SSH Enterprise Security
PasswordAuthentication no  # /etc/ssh/sshd_config
PermitRootLogin no
Port 2222                  # ប្ដូរពី Default 22`,
    points: [
      "Linux File System & Permissions",
      "DNS Records (A, CNAME, TXT) & Subnetting /CIDR",
      "TCP 3-Way Handshake Deep Dive",
      "Troubleshooting: htop, lsof, strace, journalctl",
      "SSH Hardening & Firewall Default-Deny Policy"
    ],
    keyTakeaways: [
      "DNS = Domain → IP Translator",
      "TCP = ចាប់ដៃ 3 ជំហាន (SYN, SYN-ACK, ACK)",
      "SSH = Key Only + Disable Password + Change Port",
      "Firewall = Default Deny (បិទទាំងអស់ បើកតែត្រូវការ)",
      "strace = Debug Kernel System Calls"
    ],
    quiz: [
      { q: "DNS A Record ធ្វើអ្វី?", a: "ចង្អុល Domain → IP Address ផ្ទាល់", options: ["ចង្អុល Domain → Domain", "ចង្អុល Domain → IP Address ផ្ទាល់", "ចង្អុល IP → Domain", "ផ្ញើ Email"] },
      { q: "TCP 3-Way Handshake ជំហានត្រឹមត្រូវ?", a: "SYN → SYN-ACK → ACK", options: ["ACK → SYN → FIN", "SYN → SYN-ACK → ACK", "CONNECT → ACCEPT → DATA", "GET → POST → PUT"] },
      { q: "Default Deny Firewall Policy មានន័យថាអ្វី?", a: "បិទ Traffic ទាំងអស់ ហើយបើកតែ Rules ជាក់លាក់", options: ["Allow Everything", "Block Nothing", "បិទ Traffic ទាំងអស់ ហើយបើកតែ Rules ជាក់លាក់", "Block Inbound Only"] }
    ],
    flashcards: [
      { term: "DNS A Record", def: "Map Domain Name ទៅ IPv4 Address ផ្ទាល់ (kiraa.dev → 203.0.113.10)" },
      { term: "CNAME Record", def: "Alias - Map Domain → Domain (www.example.com → example.com)" },
      { term: "CIDR /24", def: "256 IPs (254 usable) - First 24 bits = Network, Last 8 bits = Hosts" },
      { term: "TCP Handshake", def: "SYN → SYN-ACK → ACK: 3-step reliable connection establishment" },
      { term: "lsof -i :PORT", def: "List Open Files/Processes ដែលប្រើ Network Port ណាមួយ" },
      { term: "strace", def: "System Call Tracer - Debug programs stuck at kernel level" },
      { term: "journalctl", def: "Read systemd Journal Logs: -u service -f (follow) --since (time filter)" }
    ],
    tips: [
      "ហាម chmod 777 ក្នុង Production — 755 (executable) ឬ 644 (config) គ្រប់គ្រាន់",
      "ssh-keygen -t ed25519 -C 'comment' — Ed25519 ល្អជាង RSA 2048",
      "ufw default deny incoming → ufw allow 443 → ufw enable",
      "Memorize: /etc (config), /var/log (logs), /proc (kernel), /tmp (temp)"
    ]
  },
  {
    id: 2,
    title: "Git & GitHub",
    titleKH: "Git, GitHub & Versioning",
    icon: "🌿",
    color: "#f97316",
    bgGrad: "from-orange-500 to-red-600",
    duration: "2 សប្តាហ៍",
    difficulty: "Beginner",
    xp: 150,
    content: `Git ជា Single Source of Truth នៃ DevOps — Code, Infrastructure YAML, Configs ទាំងអស់ Versioned ក្នុង Git ។ ចេះ Branching Strategy, Recovery (reflog, bisect), Git Hooks (Automation), Semantic Versioning (SemVer) ហើយ Collaborate ជាក្រុម Enterprise ។`,
    code: `# Feature Branch Workflow
git checkout -b feature/oauth-login
git commit -m "feat(auth): add OAuth2 flow"
git push origin feature/oauth-login

# Advanced Recovery
git reflog                  # ប្រវត្តិ Commits សម្ងាត់ (RI-COVER!)
git bisect start            # ស្វែងរក Bad Commit (Binary Search)
git cherry-pick abc123      # រើស Commit ជាក់លាក់

# Git Hooks (pre-commit scan)
# .git/hooks/pre-commit → Run linter/security scan
# ហាម Commit ប្រសិនបើរកឃើញ SECRET ក្នុង Code

# Semantic Versioning
v1.0.0  → MAJOR.MINOR.PATCH
v2.0.0  → Breaking Change (MAJOR++)
v1.3.0  → New Feature (MINOR++)
v1.0.7  → Bug Fix (PATCH++)`,
    points: [
      "Feature Branching & GitFlow Strategy",
      "Git Hooks: Automation Pre/Post Commit",
      "Advanced Recovery: reflog, bisect, cherry-pick",
      "Semantic Versioning (SemVer) MAJOR.MINOR.PATCH",
      "Pull Requests, Code Review & Squash Merging"
    ],
    keyTakeaways: [
      "Git Hooks = Automation ដំណើរការ Script ជា Auto",
      "git reflog = ឧបករណ៍សង្គ្រោះ Commit ដែលបាត់",
      "git bisect = Binary Search Bug-causing Commit",
      "SemVer = ស្ដង់ដារ MAJOR.MINOR.PATCH",
      "git cherry-pick = ជ្រើស Commit មួយ → Branch ផ្សេង"
    ],
    quiz: [
      { q: "git reflog ជួយអ្វី?", a: "ស្ដារ Branch/Commit ដែលបានលុបច្រឡំ", options: ["Merge Branches", "ស្ដារ Branch/Commit ដែលបានលុបច្រឡំ", "Show Remote", "Clean Cache"] },
      { q: "git bisect ប្រើដើម្បីអ្វី?", a: "ស្វែងរក Commit ដែលបង្ក Bug ដោយ Binary Search", options: ["Backup Commits", "ស្វែងរក Commit ដែលបង្ក Bug ដោយ Binary Search", "Merge Conflicts", "Clone Repo"] },
      { q: "SemVer v2.1.3 - 2 ជាអ្វី?", a: "MAJOR - Breaking Change", options: ["PATCH", "MINOR", "MAJOR - Breaking Change", "Build Number"] }
    ],
    flashcards: [
      { term: "git reflog", def: "Secret log of ALL HEAD movements — ស្ដារ commit ដែលបាត់ ឬ reset ច្រឡំ" },
      { term: "git bisect", def: "Binary search ស្វែងរក bad commit: bisect start → bisect bad/good → auto-find" },
      { term: "git cherry-pick", def: "Copy a specific commit SHA onto current branch ដោយមិន merge ទាំងមូល" },
      { term: "Git Hooks", def: "Scripts ក្នុង .git/hooks/ ដំណើរ Auto មុន/ក្រោយ git actions (pre-commit, post-push)" },
      { term: "SemVer MAJOR", def: "Breaking change — API ចាស់ NOT compatible (v1→v2)" },
      { term: "SemVer MINOR", def: "New feature, backward compatible (v1.2→v1.3)" },
      { term: "SemVer PATCH", def: "Bug fix only, backward compatible (v1.0.1→v1.0.2)" }
    ],
    tips: [
      "git commit --amend — កែ Commit Message ចុងក្រោយ (មុន push)",
      "Conventional Commits: feat: fix: chore: docs: perf: refactor:",
      "Protect main branch: require PR + 1 Review + Pass CI",
      "git tag v1.0.0 && git push --tags → Release Versioning"
    ]
  },
  {
    id: 3,
    title: "Bash Scripting",
    titleKH: "Bash Scripting & Automation",
    icon: "⚡",
    color: "#eab308",
    bgGrad: "from-yellow-500 to-orange-500",
    duration: "2 សប្តាហ៍",
    difficulty: "Intermediate",
    xp: 180,
    content: `Bash Script ជា Automation Foundation ក្នុង Linux — លុបការងារ Manual (Backup, Cleanup, Alert, Deploy) ចោល។ Text Processing Tools (grep, awk, sed, jq) ជួយ Parse Logs ធំៗ ស្រង់ Data ពី APIs, ហើយ Automate Database Backups, Telegram Alerts, ​ Disk Watchdogs ។`,
    code: `#!/bin/bash
set -euo pipefail   # Stop on Error | Undefined Var | Pipe Fail

# Text Processing Power Tools
grep "ERROR" /var/log/app.log      # ស្វែងរកបន្ទាត់
awk '{print $1,$7}' access.log     # ស្រង់ Column 1,7
sed -i 's/v1.0/v2.0/g' config.yaml # Replace ទូទាំង File

# JSON Processing (API → Script)
curl -s https://api.github.com/repos/kiraa/app/releases/latest \
  | jq -r '.tag_name'   # ស្រង់ "v1.5.2" ចេញពី JSON

# Telegram Alert Function
send_alert() {
  curl -s "https://api.telegram.org/bot$BOT_TOKEN/sendMessage" \
    -d "chat_id=$CHAT_ID&text=🚨 $1" > /dev/null
}

# Disk Watchdog + Auto Alert
DISK_USAGE=$(df / | awk 'NR==2{print $5}' | tr -d '%')
if [ "$DISK_USAGE" -gt 85 ]; then
  send_alert "Disk $DISK_USAGE% FULL on $(hostname)!"
fi`,
    points: [
      "Text Processing: grep, awk, sed (Log Parsing)",
      "JSON Processing ជាមួយ jq (API → Script)",
      "Error Handling: set -euo pipefail",
      "Cron Jobs Scheduling & Automation Patterns",
      "Telegram API Alert Integration"
    ],
    keyTakeaways: [
      "grep = ស្វែងរកពាក្យ (Search Pattern)",
      "awk = ស្រង់ Column ពី Text/CSV",
      "sed = Find & Replace ក្នុង Files",
      "jq = Parse JSON ក្នុង Bash Script",
      "set -euo pipefail = Strict Safe Mode"
    ],
    quiz: [
      { q: "jq ប្រើធ្វើអ្វីក្នុង Bash?", a: "Parse/Query JSON Data", options: ["Compress Files", "Parse/Query JSON Data", "Monitor CPU", "Install Packages"] },
      { q: "awk '{print $3}' file.log ធ្វើអ្វី?", a: "Print Column 3 (word 3) of each line", options: ["Delete line 3", "Print Column 3 (word 3) of each line", "Count 3 lines", "Filter 3 chars"] },
      { q: "set -u ក្នុង Bash ធ្វើអ្វី?", a: "Error ប្រសិនបើ Variable ដែល Undefined ត្រូវប្រើ", options: ["Enable Unicode", "Disable Errors", "Error ប្រសិនបើ Variable ដែល Undefined ត្រូវប្រើ", "Enable uto-update"] }
    ],
    flashcards: [
      { term: "grep -E 'pattern'", def: "Extended Regex Search — ស្វែងរកបន្ទាត់ដែលត្រូវ Pattern" },
      { term: "awk '{print $NF}'", def: "Print last column (NF=Number of Fields) — ងាយ Extract Data" },
      { term: "sed 's/old/new/g'", def: "Global Find & Replace ក្នុង Stream/File — -i flag edits in-place" },
      { term: "jq '.key'", def: "Extract JSON field: echo '{\"name\":\"kiraa\"}' | jq '.name' → kiraa" },
      { term: "$(( ))", def: "Arithmetic: TOTAL=$(( DISK + 10 )) — Integer Math ក្នុង Bash" },
      { term: "trap 'cmd' EXIT", def: "Run cleanup command when script exits (ERR, INT, TERM, EXIT)" }
    ],
    tips: [
      "ប្រើ shellcheck (shellcheck.net) ពិនិត្យ Script ជានិច្ច",
      "Log ទៅ /var/log/ + timestamp: echo \"[$(date)] message\" >> /var/log/app.log",
      "ជម្រើស jq '.[] | select(.status == \"active\")' — Filter Array Elements",
      "Crontab syntax: Minute Hour Day Month Weekday (0 2 * * * = 2AM daily)"
    ]
  },
  {
    id: 4,
    title: "Docker",
    titleKH: "Docker Container",
    icon: "🐳",
    color: "#0ea5e9",
    bgGrad: "from-sky-500 to-blue-700",
    duration: "3 សប្តាហ៍",
    difficulty: "Intermediate",
    xp: 250,
    content: `Docker ដោះស្រាយ "Works on my machine" ដោយ Package App + Dependencies ចូល Container ។ ស្វែងយល់ Image vs Container, Volumes (Bind/Named), Networking (Bridge/Overlay), Multi-Stage Builds, និង Distroless Images (Security Maximum)។`,
    code: `# Multi-Stage Dockerfile (Production-Ready)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Distroless Final Image (No Shell = Max Security)
FROM gcr.io/distroless/nodejs20-debian12
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
# No USER needed - distroless has no root shell!
EXPOSE 3000
CMD ["dist/server.js"]

# Docker Volumes
# Named Volume (DB - Managed by Docker, Secure)
docker run -v pg_data:/var/lib/postgresql/data postgres

# Bind Mount (Dev - Local folder sync)
docker run -v $(pwd)/src:/app/src node:20-alpine

# Networking
# Bridge: default, same-host containers talk
# Overlay: multi-host (used by Swarm/K8s)
docker network create --driver overlay prod-net`,
    points: [
      "Docker Image (Blueprint) vs Container (Instance)",
      "Volumes: Bind Mounts vs Named Volumes",
      "Networking: Bridge, Host, Overlay",
      "Distroless Images: Security Maximum (No Shell!)",
      "Multi-Stage Build Optimization"
    ],
    keyTakeaways: [
      "Docker Image = Template (Static/Blueprint)",
      "Docker Container = Running Instance (Active)",
      "Named Volume = DB Storage (Managed, Safe)",
      "Bind Mount = Dev Sync (Local Folder)",
      "Distroless = Image ដែល Security ខ្ពស់បំផុត"
    ],
    quiz: [
      { q: "Docker Named Volume vs Bind Mount ខុសគ្នាយ៉ាងណា?", a: "Named Volume គ្រប់គ្រងដោយ Docker (Safe for DB), Bind Mount = Local Folder", options: ["គ្មានភាពខុស", "Named Volume គ្រប់គ្រងដោយ Docker (Safe for DB), Bind Mount = Local Folder", "Bind Mount Safe ជាង", "Named Volume លឿនជាង"] },
      { q: "Distroless Image ផ្ដល់អ្វី?", a: "Security ខ្ពស់ — Image គ្មាន Shell/Package Manager", options: ["Build លឿនជាង", "Security ខ្ពស់ — Image គ្មាន Shell/Package Manager", "Network លឿន", "Logging ល្អ"] },
      { q: "Overlay Network ប្រើនៅពេលណា?", a: "Containers ផ្ដេករត់ Server ច្រើន (Multi-Host)", options: ["Container តែ 1", "Containers ផ្ដេករត់ Server ច្រើន (Multi-Host)", "Local Development", "No Internet needed"] }
    ],
    flashcards: [
      { term: "Docker Image", def: "Read-only Blueprint/Template — Build ម្ដង, Run ច្រើន, គ្មានដំណើរការ" },
      { term: "Docker Container", def: "Running Instance of an Image — Process ដែលកំពុង Active ក្នុង Isolated Environment" },
      { term: "Named Volume", def: "Docker-managed persistent storage: -v name:/path — Recommended for Databases" },
      { term: "Bind Mount", def: "Map host directory into container: -v /host/path:/container/path — Good for Dev" },
      { term: "Distroless Image", def: "Google's minimal image — No shell, no package manager, only your app + runtime" },
      { term: "Overlay Network", def: "Multi-host container network — Used by Docker Swarm and Kubernetes" }
    ],
    tips: [
      "COPY package*.json BEFORE COPY . . → Layer Cache + Fast Rebuild",
      ".dockerignore: exclude node_modules, .git, .env, logs",
      "docker system prune -af ← សម្អាត Dangling Images/Cache",
      "trivy image IMAGE:TAG → Scan CVEs ក្នុង Image មុន Push"
    ]
  },
  {
    id: 5,
    title: "CI/CD Pipelines",
    titleKH: "CI/CD & Deployment Strategy",
    icon: "🔄",
    color: "#ec4899",
    bgGrad: "from-pink-500 to-rose-700",
    duration: "3 សប្តាហ៍",
    difficulty: "Advanced",
    xp: 300,
    content: `CI/CD ជា Automation Engine ស្នូលរបស់ DevOps ។ Code Push → Tests → Build Artifact → Quality Gate (SonarQube) → Push Registry → Deploy — ទាំងស្រុងស្វ័យប្រវត្ត ។ Artifact Registry (ECR, Docker Hub) ផ្ទុក Build Output ។ Deployment Strategies: Blue/Green (Zero Downtime), Canary (Gradual 5%→100%), Rolling Update ។`,
    code: `# .github/workflows/deploy.yml
name: Enterprise Production Pipeline
on:
  push:
    branches: [main]
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Install & Test
      run: npm ci && npm test
    - name: Quality Gate (SonarQube)
      run: sonar-scanner -Dsonar.projectKey=app
    - name: Scan Image (Trivy)
      run: trivy image --exit-code 1 $IMAGE
    - name: Push to AWS ECR
      uses: docker/build-push-action@v5
      with:
        push: true
        tags: \${{ secrets.ECR_REGISTRY }}/app:\${{ github.sha }}

# Canary Deployment (Kubernetes)
# Step 1: Deploy 5% traffic → new version
# Step 2: Monitor Error Rate, Latency (15min)
# Step 3: Promote 25% → 50% → 100%
# Step 4: If anomaly → Auto Rollback!`,
    points: [
      "CI: Automated Test + Quality Gate (SonarQube)",
      "Artifact & Artifact Registry (ECR, Harbor)",
      "Deployment: Blue/Green, Canary, Rolling Update",
      "GitHub Actions Workflow, Secrets & Runners",
      "Pipeline Security: SAST, Image Scan in CI"
    ],
    keyTakeaways: [
      "Artifact = Build Output Ready to Deploy",
      "Artifact Registry = Versioned Storage (ECR, DockerHub)",
      "Blue/Green = ប្ដូរ Environment ភ្លាម (Zero Downtime)",
      "Canary = Release 5% → Monitor → Expand Gradually",
      "Quality Gate = Stop Pipeline ប្រសិនបើ Code Quality ខ្សោយ"
    ],
    quiz: [
      { q: "Artifact Registry ប្រើធ្វើអ្វី?", a: "ផ្ទុក & Version Build Outputs (Docker Images, JARs)", options: ["Monitor Deployments", "ផ្ទុក & Version Build Outputs (Docker Images, JARs)", "Source Code Storage", "Test Runner"] },
      { q: "Canary Release 5% មានន័យថាអ្វី?", a: "បញ្ជូន 5% Users ទៅ Version ថ្មី Monitor Error ហើយ Rollout", options: ["Deploy to 5 Servers", "Build 5 Images", "បញ្ជូន 5% Users ទៅ Version ថ្មី Monitor Error ហើយ Rollout", "5 Pipeline Steps"] },
      { q: "Quality Gate ក្នុង CI Pipeline ធ្វើអ្វី?", a: "Block Pipeline ប្រសិនបើ Code Quality/Security ខ្សោយ", options: ["Speed up Build", "Block Pipeline ប្រសិនបើ Code Quality/Security ខ្សោយ", "Monitor Traffic", "Update Docker"] }
    ],
    flashcards: [
      { term: "Artifact", def: "Build Output (Docker Image, JAR, binary) ដែល Tested ហើយ Ready for Deploy" },
      { term: "Artifact Registry", def: "Versioned Storage: AWS ECR, Docker Hub, Harbor, GitHub Registry" },
      { term: "Blue/Green Deploy", def: "Run 2 identical environments, swap DNS in seconds = Zero Downtime" },
      { term: "Canary Release", def: "Deploy to 5% users → Monitor → Expand gradually → 100% or Rollback" },
      { term: "Rolling Update", def: "Replace old instances one-by-one with new version — Gradual, no downtime" },
      { term: "Quality Gate", def: "SonarQube checkpoint: Stop pipeline if Code Coverage < X% or Vulnerabilities found" }
    ],
    tips: [
      "github.sha ជា Tag ជំនួស 'latest' → Immutable + Traceable",
      "actions/cache@v4 → Cache node_modules → Pipeline 2x faster",
      "Environment Protection Rules: require approval before Production deploy",
      "Rolling Update K8s: maxSurge=1, maxUnavailable=0 → Safe Zero-downtime"
    ]
  },
  {
    id: 6,
    title: "Cloud Computing (AWS)",
    titleKH: "AWS Cloud Architecture",
    icon: "☁️",
    color: "#6366f1",
    bgGrad: "from-indigo-500 to-purple-700",
    duration: "4 សប្តាហ៍",
    difficulty: "Advanced",
    xp: 350,
    content: `AWS ជា Cloud Provider ធំជាងគេ — ជ្រើស Infrastructure On-Demand ។ ចេះ VPC Architecture, NAT Gateway & Bastion Host, Security Groups (Stateful) vs NACLs (Stateless), RDS (Managed DB: Multi-AZ, Read Replicas), Lambda (Serverless), CloudFront (CDN) ជា Enterprise Standard ។`,
    code: `# VPC Enterprise Architecture
VPC (10.0.0.0/16)
├── Public Subnet (10.0.1.0/24)
│   ├── Internet Gateway (IGW) → Internet
│   ├── Application Load Balancer
│   └── Bastion Host (SSH Jump Box)
└── Private Subnet (10.0.2.0/24)
    ├── App Servers (EC2)
    ├── RDS Database (MySQL)
    └── NAT Gateway → Outbound only

# Security Groups vs NACL (Interview Question!)
Security Group: Stateful (Instance-level)
  → Allow 443 Inbound → 443 Outbound AUTO
NACL: Stateless (Subnet-level)
  → Must define Inbound AND Outbound separately

# RDS Multi-AZ
Primary (ap-southeast-1a) ←sync→ Standby (ap-southeast-1b)
Read Replica → Scale Read Workloads

# Serverless: Lambda
aws lambda invoke --function-name my-fn output.json`,
    points: [
      "VPC: Subnets, Route Tables, IGW, NAT Gateway",
      "Security Groups (Stateful) vs NACL (Stateless)",
      "Bastion Host & NAT Gateway Architecture",
      "RDS: Multi-AZ, Read Replicas, Managed DB",
      "Lambda (Serverless) & CloudFront (CDN)"
    ],
    keyTakeaways: [
      "Security Group = Stateful Firewall, Instance-level",
      "NACL = Stateless Firewall, Subnet-level",
      "NAT Gateway = Private Subnet → Internet (Outbound Only)",
      "Bastion Host = SSH Jump Server ក្នុង Public Subnet",
      "RDS Multi-AZ = HA Database (Auto Failover)"
    ],
    quiz: [
      { q: "Security Group ខុសពី NACL យ៉ាងណា?", a: "SG: Stateful Instance-level; NACL: Stateless Subnet-level", options: ["SG ដំណើរនៅ Subnet", "SG: Stateful Instance-level; NACL: Stateless Subnet-level", "NACL លឿនជាង SG", "គ្មានភាពខុស"] },
      { q: "NAT Gateway ធ្វើអ្វី?", a: "ឱ្យ Private Subnet Servers ចេញ Internet (Outbound) បានតែ", options: ["Allow Inbound Traffic", "ឱ្យ Private Subnet Servers ចេញ Internet (Outbound) បានតែ", "Load Balance Traffic", "Encrypt Data"] },
      { q: "RDS Multi-AZ ផ្ដល់អ្វី?", a: "High Availability — Auto Failover ពេល Primary Fails", options: ["More Storage", "Faster Queries", "High Availability — Auto Failover ពេល Primary Fails", "CDN Caching"] }
    ],
    flashcards: [
      { term: "Security Group", def: "Stateful Firewall ដំណើរ Instance-level — Allow Inbound → Outbound Auto" },
      { term: "NACL", def: "Stateless Firewall ដំណើរ Subnet-level — Must define In + Out separately" },
      { term: "NAT Gateway", def: "Allows Private Subnet EC2s to reach Internet (Outbound only, no Inbound)" },
      { term: "Bastion Host", def: "SSH Jump Box ក្នុង Public Subnet → SSH to Private Servers via Bastion" },
      { term: "RDS Multi-AZ", def: "Primary + Standby in different AZs — Auto failover ~60s when primary fails" },
      { term: "Read Replica", def: "Copy of DB for READ workloads only — Scale reads, reduce Primary load" },
      { term: "Lambda", def: "Serverless compute — Run code without managing servers, pay per invocation" }
    ],
    tips: [
      "ហាម Store AWS Access Keys ក្នុង Code → Use IAM Roles for EC2/Lambda",
      "Enable CloudTrail: Log all API Calls (Audit Trail)",
      "ap-southeast-1 (Singapore) = Region ជិតបំផុតសំរាប់ KH",
      "VPC Flow Logs → CloudWatch → Detect unusual network traffic"
    ]
  },
  {
    id: 7,
    title: "Kubernetes (K8s)",
    titleKH: "Kubernetes Orchestration",
    icon: "☸️",
    color: "#3b82f6",
    bgGrad: "from-blue-500 to-indigo-800",
    duration: "5 សប្តាហ៍",
    difficulty: "Advanced",
    xp: 400,
    content: `Kubernetes គ្រប់គ្រង Containers Enterprise-scale: Deployment (Stateless Apps) vs StatefulSet (DB/Stateful), Service Types (ClusterIP/NodePort/LoadBalancer), Health Probes (Liveness/Readiness/Startup), HPA Auto-scaling, PV/PVC Storage, Ingress Routing, RBAC Security ។`,
    code: `# Deployment vs StatefulSet
# Deployment = Stateless (Web, API) - Pods interchangeable
# StatefulSet = Stateful (MySQL, Redis) - Pod has stable identity

# Production Deployment
apiVersion: apps/v1
kind: Deployment
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: app
        image: kiraa/app:v2.0.1
        resources:
          limits: {cpu: "500m", memory: "512Mi"}
          requests: {cpu: "250m", memory: "256Mi"}
        livenessProbe:       # Restart if unhealthy
          httpGet: {path: /healthz, port: 3000}
          failureThreshold: 3
        readinessProbe:      # Send traffic only when ready
          httpGet: {path: /ready, port: 3000}
        startupProbe:        # Grace period for slow-start apps
          httpGet: {path: /startup, port: 3000}
          failureThreshold: 30   # 5min startup allowed

# HPA: Auto-scale based on CPU
kubectl autoscale deploy app --cpu-percent=70 --min=2 --max=10`,
    points: [
      "Deployment (Stateless) vs StatefulSet (DB/Stateful)",
      "Service: ClusterIP, NodePort, LoadBalancer",
      "Health Probes: Liveness, Readiness, Startup",
      "HPA: Horizontal Pod Autoscaler",
      "PV, PVC, Ingress, RBAC Enterprise Concepts"
    ],
    keyTakeaways: [
      "Deployment = Stateless Apps (Web, API, Microservices)",
      "StatefulSet = Stateful Apps (MySQL, Redis, Kafka)",
      "Liveness = Restart ពេលគាំង",
      "Readiness = Send Traffic Only When Ready",
      "Startup Probe = Grace Period for Slow Boot Apps"
    ],
    quiz: [
      { q: "StatefulSet ប្រើសំរាប់អ្វី?", a: "Stateful Apps ដូចជា Database (MySQL, Redis, Kafka)", options: ["Web Servers", "Stateful Apps ដូចជា Database (MySQL, Redis, Kafka)", "Load Balancers", "CDN Caches"] },
      { q: "Readiness Probe vs Liveness Probe ខុសគ្នាយ៉ាងណា?", a: "Readiness: Block Traffic if not ready; Liveness: Restart if unhealthy", options: ["Readiness លឿនជាង", "Readiness: Block Traffic if not ready; Liveness: Restart if unhealthy", "Liveness = CPU Monitor", "Readiness = Memory Check"] },
      { q: "Startup Probe ប្រើនៅពេលណា?", a: "Apps ដែល Boot យូរ — ការពារ Liveness Probe Kill មុន Ready", options: ["Fast Apps only", "Apps ដែល Boot យូរ — ការពារ Liveness Probe Kill មុន Ready", "Scaling Apps", "Debug Mode"] }
    ],
    flashcards: [
      { term: "Deployment", def: "Manages stateless app Pods — interchangeable, scalable, rolling update" },
      { term: "StatefulSet", def: "Manages stateful Pods — stable identity, ordered boot, persistent storage (DBs)" },
      { term: "Liveness Probe", def: "Is app ALIVE? If fail → K8s restarts Pod automatically" },
      { term: "Readiness Probe", def: "Is app READY for traffic? If fail → Remove from Service endpoint (no traffic)" },
      { term: "Startup Probe", def: "Protection for slow-starting apps — disables liveness until startup succeeds" },
      { term: "HPA", def: "Horizontal Pod Autoscaler — scales replicas based on CPU/Memory/Custom metrics" },
      { term: "RBAC", def: "Role-Based Access Control — Role + RoleBinding controls who can do what in K8s" }
    ],
    tips: [
      "ALWAYS set resource requests & limits — ការពារ OOM Kill",
      "Use livenessProbe initialDelaySeconds: 30 ជៀសវាង Restart loop",
      "kubectl top pods/nodes → Real-time resource usage",
      "Helm = Package Manager for K8s Apps — helm install ingress-nginx"
    ]
  },
  {
    id: 8,
    title: "Terraform (IaC)",
    titleKH: "Terraform Infrastructure as Code",
    icon: "🏗️",
    color: "#8b5cf6",
    bgGrad: "from-violet-500 to-purple-800",
    duration: "3 សប្តាហ៍",
    difficulty: "Advanced",
    xp: 300,
    content: `Terraform ឱ្យ DevOps Engineer Provision Infrastructure ទាំងស្រុងជា Code: Write → Init → Plan → Apply ។ Remote State (S3+DynamoDB Locking) ឱ្យ Team Collaborate ។ Workspaces (Dev/Staging/Prod Isolation) ។ Drift Detection ចាប់ Manual Changes ។ Policy as Code (OPA/Sentinel) = Governance Automation ។`,
    code: `# main.tf - Enterprise Setup
terraform {
  backend "s3" {
    bucket         = "tf-state-prod"
    key            = "prod/terraform.tfstate"
    region         = "ap-southeast-1"
    dynamodb_table = "tf-state-lock"  # State Locking!
  }
}

resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr
  tags = { Name = "prod-vpc", ManagedBy = "Terraform" }
}

# Workspaces: Isolate Dev/Staging/Prod
terraform workspace new staging
terraform workspace select prod

# Drift Detection: Who changed what manually?
terraform plan  # Shows real Cloud vs Code differences!

# Policy as Code (OPA) - Block bad infra
# Rule: "Deny any EC2 without Tags"
# Rule: "Deny public S3 buckets"`,
    points: [
      "Workflow: Write → Init → Plan → Apply → Destroy",
      "Remote State: S3 Backend + DynamoDB Locking",
      "Workspaces: Dev/Staging/Prod State Isolation",
      "Drift Detection: Manual Change Detection",
      "Policy as Code: OPA / Sentinel Governance"
    ],
    keyTakeaways: [
      "Workspaces = ប្រើ Code ដដែល, State Isolation",
      "Drift Detection = ចាប់ Manual Changes ក្នុង Cloud",
      "Policy as Code = OPA/Sentinel Guard Rules",
      "Remote State = S3 + DynamoDB Lock = Team Safe",
      "terraform plan = Preview Before Destroy/Create"
    ],
    quiz: [
      { q: "Terraform Workspaces ប្រើធ្វើអ្វី?", a: "Isolate State ពី Dev/Staging/Prod ដោយប្រើ Code ដដែល", options: ["UI Interface", "Isolate State ពី Dev/Staging/Prod ដោយប្រើ Code ដដែល", "Store Secrets", "Connect to Cloud"] },
      { q: "Drift Detection ក្នុង Terraform ចាប់អ្វី?", a: "Resources ដែលត្រូវ Manual Edit នៅ Cloud ដោយគ្មាន Terraform", options: ["Code Errors", "Resources ដែលត្រូវ Manual Edit នៅ Cloud ដោយគ្មាន Terraform", "Network Issues", "Database Changes"] },
      { q: "DynamoDB Table ក្នុង Remote Backend ធ្វើអ្វី?", a: "State Locking — ការពារ 2 People Apply ជាន់គ្នា", options: ["Store Backups", "State Locking — ការពារ 2 People Apply ជាន់គ្នា", "Log Activities", "Encrypt Data"] }
    ],
    flashcards: [
      { term: "terraform workspace", def: "Isolated state environments: dev/staging/prod using same codebase" },
      { term: "Remote State", def: "Store state in S3 (shared) + DynamoDB (locking) for team collaboration" },
      { term: "Drift Detection", def: "terraform plan shows differences between code and actual cloud state" },
      { term: "Policy as Code", def: "OPA/Sentinel: automated governance rules that block non-compliant infra" },
      { term: "terraform import", def: "Import existing cloud resources into Terraform management" },
      { term: "Data Source", def: "Read existing resources (not created by this Terraform) as reference" }
    ],
    tips: [
      "terraform fmt + terraform validate → ជានិច្ចមុន git commit",
      "ហាម Edit State File ដោយដៃ — ប្រើ terraform state mv/rm",
      "Module Registry: registry.terraform.io ← Reusable AWS Modules",
      "terragrunt = DRY Terraform — ដំណើរ Multiple Modules ងាយស្រួល"
    ]
  },
  {
    id: 9,
    title: "Monitoring & Observability",
    titleKH: "ការតាមដានប្រព័ន្ធ",
    icon: "📊",
    color: "#14b8a6",
    bgGrad: "from-emerald-500 to-teal-700",
    duration: "3 សប្តាហ៍",
    difficulty: "Advanced",
    xp: 280,
    content: `Observability = Metrics + Logs + Traces (3 Pillars) ។ Google's 4 Golden Signals (L/T/E/S) + RED Method (Rate/Errors/Duration) សំរាប់ Apps + USE Method (Utilization/Saturation/Errors) សំរាប់ Infrastructure ។ OpenTelemetry (OTel) ជា Vendor-Agnostic Standard — Push ទៅ Prometheus, Datadog ឬ Grafana ។`,
    code: `# Prometheus Alert Rule
- alert: HighErrorRate
  expr: rate(http_errors_total[5m]) / rate(http_requests_total[5m]) > 0.05
  for: 2m
  annotations:
    summary: "Error rate > 5% for 2min!"

# RED Method (App Monitoring)
rate(http_requests_total[5m])              # Rate
rate(http_errors_total[5m])                # Errors
histogram_quantile(0.99, request_duration) # Duration P99

# USE Method (Infrastructure Monitoring)
# Utilization: node_cpu_seconds_total > 80%
# Saturation:  node_memory_MemAvailable < 10%
# Errors:      node_disk_io_time_seconds (error rate)

# OpenTelemetry (Vendor-Agnostic)
# Instrument once → Export to Prometheus/Datadog/Jaeger
# OTEL Collector → Route signals to multiple backends`,
    points: [
      "3 Pillars: Metrics, Logs, Traces",
      "4 Golden Signals: Latency, Traffic, Errors, Saturation",
      "RED Method (Apps) vs USE Method (Infrastructure)",
      "OpenTelemetry: Vendor-Agnostic Observability",
      "PLG Stack: Prometheus + Loki + Grafana (K8s-native)"
    ],
    keyTakeaways: [
      "RED Method = Application Monitoring (Request-driven)",
      "USE Method = Infrastructure Monitoring (Hardware)",
      "OpenTelemetry = Vendor-Agnostic Standard",
      "PLG Stack = Prometheus + Loki + Grafana",
      "P99 Latency = 99% Requests ត្រូវ < Threshold"
    ],
    quiz: [
      { q: "RED Method ជាអ្វីសំរាប់?", a: "Monitoring Request-driven Apps (Rate/Errors/Duration)", options: ["Infrastructure Monitoring", "Monitoring Request-driven Apps (Rate/Errors/Duration)", "Network Monitoring", "Database Monitoring"] },
      { q: "USE Method U = Utilization ជាអ្វី?", a: "ភាគរយ Resource ដែលប្រើ (CPU 70%, Memory 80%)", options: ["User Count", "ភាគរយ Resource ដែលប្រើ (CPU 70%, Memory 80%)", "Uptime %", "Update Rate"] },
      { q: "OpenTelemetry ជាអ្វី?", a: "Vendor-Agnostic Standard ប្រមូល Metrics/Logs/Traces", options: ["Monitoring Tool", "Vendor-Agnostic Standard ប្រមូល Metrics/Logs/Traces", "Cloud Provider", "CI/CD Tool"] }
    ],
    flashcards: [
      { term: "RED Method", def: "For services/APIs: Rate (requests/sec), Errors (fail rate), Duration (latency)" },
      { term: "USE Method", def: "For resources/infra: Utilization (%), Saturation (queue/wait), Errors (hw errors)" },
      { term: "OpenTelemetry", def: "Open standard for Traces, Metrics, Logs — vendor-agnostic, instrument once" },
      { term: "P99 Latency", def: "99th percentile response time — 99% requests served faster than this threshold" },
      { term: "PLG Stack", def: "Prometheus (metrics) + Loki (logs) + Grafana (visualization) — lightweight K8s stack" },
      { term: "Error Budget", def: "Allowable downtime = 100% - SLO% — When budget exhausted, stop features, fix reliability" }
    ],
    tips: [
      "Alert on RED Signals (Error Rate, Latency) ជំនួស CPU directly",
      "Error Budget Policy: Budget < 50% → freeze new features",
      "Use Exemplars: Link Metrics → Traces (Prometheus → Jaeger)",
      "High Cardinality Labels (user_id, order_id) → Avoid in Prometheus!"
    ]
  },
  {
    id: 10,
    title: "GitOps & ArgoCD",
    titleKH: "GitOps & Multi-Cluster",
    icon: "🛠️",
    color: "#ef4444",
    bgGrad: "from-red-500 to-orange-700",
    duration: "2 សប្តាហ៍",
    difficulty: "Expert",
    xp: 320,
    content: `GitOps = Git ជា Single Source of Truth — Infrastructure State ផ្លាស់ប្ដូរ via PRs ប៉ុណ្ណោះ ។ ArgoCD Watch Git + Auto-Sync + Anti-Drift ។ ApplicationSets Automate Multi-App/Multi-Cluster Deployments ។ Enterprise: Management Cluster (ArgoCD) → Workload Clusters (Apps) ។`,
    code: `# ArgoCD Application
apiVersion: argoproj.io/v1alpha1
kind: Application
spec:
  source:
    repoURL: https://github.com/kiraa/manifests
    targetRevision: HEAD
    path: k8s/production
  syncPolicy:
    automated:
      prune: true      # Remove deleted K8s resources
      selfHeal: true   # Revert manual kubectl changes!

# ApplicationSets - Deploy to Multiple Clusters at once
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
spec:
  generators:
  - clusters: {}  # Auto-detect all registered clusters
  template:
    spec:
      destination:
        server: '{{server}}'
        namespace: prod

# Multi-Cluster Architecture
Management Cluster: ArgoCD Controller (Central)
  ├── Workload Cluster A: Production
  ├── Workload Cluster B: Staging
  └── Workload Cluster C: DR (Disaster Recovery)`,
    points: [
      "GitOps Principles & Single Source of Truth",
      "ArgoCD: Auto Sync, Self-Heal, Drift Detection",
      "ApplicationSets: Multi-App/Multi-Cluster Automation",
      "Management Cluster vs Workload Clusters Architecture",
      "Rollback via git revert → ArgoCD Auto-Sync"
    ],
    keyTakeaways: [
      "ApplicationSets = Deploy Apps ច្រើន ឬ Clusters ក្នុងពេលតែមួយ",
      "Management Cluster = ArgoCD Central Control",
      "Workload Cluster = App Execution (Dev/Prod/DR)",
      "selfHeal = Revert Manual kubectl Changes Auto",
      "Drift Detection = ArgoCD ចាប់ Out-of-Sync State"
    ],
    quiz: [
      { q: "ArgoCD ApplicationSets ប្រើធ្វើអ្វី?", a: "Deploy Applications ច្រើន ឬ Clusters ច្រើនក្នុងពេលតែមួយ", options: ["Single App Deploy", "Deploy Applications ច្រើន ឬ Clusters ច្រើនក្នុងពេលតែមួយ", "Monitor CPU", "Store Secrets"] },
      { q: "Management Cluster ក្នុង GitOps Architecture ជាអ្វី?", a: "ArgoCD Central — គ្រប់គ្រង Deploy ទៅ Workload Clusters", options: ["Production Cluster", "ArgoCD Central — គ្រប់គ្រង Deploy ទៅ Workload Clusters", "Database Cluster", "Dev Cluster"] },
      { q: "selfHeal: true ក្នុង ArgoCD ធ្វើអ្វី?", a: "Revert Manual kubectl Changes ឱ្យត្រឡប់ Git State", options: ["Restart App", "Revert Manual kubectl Changes ឱ្យត្រឡប់ Git State", "Scale Pods", "Backup Data"] }
    ],
    flashcards: [
      { term: "GitOps", def: "Git as Single Source of Truth — all changes via PRs, ArgoCD auto-syncs to cluster" },
      { term: "ArgoCD", def: "K8s-native GitOps CD tool — watches Git, syncs to cluster, detects drift" },
      { term: "ApplicationSet", def: "ArgoCD resource for templating multiple apps or multi-cluster deployments" },
      { term: "Management Cluster", def: "Hosts ArgoCD — controls and deploys to all Workload Clusters" },
      { term: "Workload Cluster", def: "Clusters running actual apps — managed by Management Cluster via ArgoCD" },
      { term: "Drift", def: "When cluster actual state differs from Git desired state — ArgoCD detects & alerts/heals" }
    ],
    tips: [
      "Separate Repos: App Code Repo + Manifest/Config Repo (GitOps best practice)",
      "ArgoCD Image Updater → Auto-bump image tag when new image pushed",
      "Sync Waves: database (wave 0) → migrations (wave 1) → app (wave 2)",
      "Use Projects in ArgoCD: isolate team access to specific namespaces"
    ]
  },
  {
    id: 11,
    title: "DevSecOps",
    titleKH: "DevSecOps & Supply Chain",
    icon: "🔐",
    color: "#6b7280",
    bgGrad: "from-gray-700 to-slate-900",
    duration: "3 សប្តាហ៍",
    difficulty: "Expert",
    xp: 350,
    content: `DevSecOps = Security Embedded ក្នុងគ្រប់ Steps CI/CD (Shift Left) ។ 4 Security Layers: SAST (Code Scan), DAST (Runtime Attack), Dependency Scan, Container Scan ។ Enterprise Secrets Management (Vault Auto-Rotation) ។ IAM Least Privilege (Zero Trust) ។ Supply Chain Security: SBOM + Image Signing (Cosign) ។`,
    code: `# DevSecOps Complete Pipeline
# 1. SAST - Scan Source Code
sonarqube-scanner -Dsonar.projectKey=app

# 2. Dependency Scanning
npm audit --audit-level=high
trivy fs . --security-checks vuln

# 3. Container Image Scanning
trivy image --exit-code 1 \
  --severity HIGH,CRITICAL kiraa/app:latest

# 4. Secret Detection (prevent credential leak)
trufflehog git https://github.com/kiraa/repo
gitleaks detect --source . --report-format json

# 5. HashiCorp Vault (Auto-Rotation)
vault write database/roles/app-role \
  db_name=mysql \
  creation_statements="CREATE USER..." \
  default_ttl="1h" max_ttl="24h"  # Short-lived creds!

# 6. Image Signing (Cosign)
cosign sign --key cosign.key kiraa/app:latest
cosign verify --key cosign.pub kiraa/app:latest

# 7. SBOM Generation
syft kiraa/app:latest -o spdx-json > sbom.json`,
    points: [
      "Shift-Left: SAST, DAST, Dependency, Container Scanning",
      "Enterprise Secrets: Vault Auto-Rotation (TTL)",
      "IAM Least Privilege / Zero Trust Model",
      "Supply Chain: SBOM (Bill of Materials)",
      "Image Signing with Cosign (Digital Signature)"
    ],
    keyTakeaways: [
      "Secrets Management = Vault/AWS Auto-Rotation",
      "IAM Least Privilege = Zero Trust Permissions",
      "SBOM = បញ្ជីគ្រឿងផ្សំ Software ទាំងអស់",
      "Image Signing (Cosign) = Verify Official Build",
      "Shift Left = Security Early > Late (Cheaper)"
    ],
    quiz: [
      { q: "SBOM ជាអ្វី?", a: "Software Bill of Materials — បញ្ជីផ្សំ Libraries/Dependencies ទាំងអស់", options: ["Security Build Output Monitor", "Software Bill of Materials — បញ្ជីផ្សំ Libraries/Dependencies ទាំងអស់", "System Backup Mechanism", "Subnet Boundary Object Map"] },
      { q: "Cosign ប្រើធ្វើអ្វី?", a: "Sign Docker Image ជា Digital Signature ការពារ Tampering", options: ["Scan Image", "Sign Docker Image ជា Digital Signature ការពារ Tampering", "Deploy Image", "Compress Image"] },
      { q: "Vault Dynamic Secrets ផ្ដល់ TTL មានន័យថាអ្វី?", a: "Credentials Expire ស្វ័យប្រវត្ត (Short-lived) — ការពារ Credential Theft", options: ["Time To Launch", "Credentials Expire ស្វ័យប្រវត្ត (Short-lived) — ការពារ Credential Theft", "Total Traffic Limit", "Test Token Level"] }
    ],
    flashcards: [
      { term: "SAST", def: "Static Application Security Testing — Scan source code for vulnerabilities BEFORE running" },
      { term: "DAST", def: "Dynamic Application Security Testing — Attack running app like a real hacker (OWASP ZAP)" },
      { term: "SBOM", def: "Software Bill of Materials — Complete ingredient list of all libraries/versions in your app" },
      { term: "Cosign", def: "Sign Docker images with cryptographic key — Verify image came from official CI pipeline" },
      { term: "Vault Dynamic Secrets", def: "Generate short-lived credentials on-demand (TTL 1h) — auto-expire, never reuse" },
      { term: "Zero Trust", def: "Never trust, always verify — every request authenticated + authorized regardless of location" }
    ],
    tips: [
      "ហាម Hardcode Secrets ក្នុង Code — use environment variables + Vault",
      "Enable Dependabot ក្នុង GitHub Auto PR for dependency updates",
      "OWASP Top 10 ដឹង = DevSecOps Foundation Knowledge",
      "Sign + Verify policy: Block unsigned images in K8s via Admission Controller"
    ]
  }
];

const LEARNING_PATH = [
  { step: 1, title: "DevOps & SRE Foundation", kh: "យល់ដឹងពីវប្បធម៌ និងគោលដៅការងារ", moduleId: 0, reason: "Core Culture & Metrics ជា Foundation ទាំងស្រុង" },
  { step: 2, title: "Linux & Networking", kh: "គ្រឹះស្ថានស្នូលនៃ Server & Network", moduleId: 1, reason: "Server ជាង 90% ដំណើរ Linux — ចេះ OS = ចេះ DevOps" },
  { step: 3, title: "Git & GitHub", kh: "គ្រប់គ្រងជំនាន់កូដ & ការងារជាក្រុម", moduleId: 2, reason: "Code + Config + Infrastructure — ទាំងអស់ Version ក្នុង Git" },
  { step: 4, title: "Bash Scripting", kh: "Automation Script ជំហានដំបូង", moduleId: 3, reason: "ស្វ័យប្រវត្ត Backup/Alert/Deploy ដោយ Script" },
  { step: 5, title: "Docker", kh: "Package App ឱ្យស្រាល & Portable", moduleId: 4, reason: "Container = ស្ពានបន្ទាប់ — K8s ត្រូវការ Docker Images" },
  { step: 6, title: "CI/CD Pipelines", kh: "Build & Deploy ស្វ័យប្រវត្ត", moduleId: 5, reason: "Automate: Test → Build → Push → Deploy គ្រប់ Push" },
  { step: 7, title: "AWS Cloud", kh: "Infrastructure លើ Cloud", moduleId: 6, reason: "Cloud = Production Home — VPC, EC2, RDS, IAM ចាំបាច់" },
  { step: 8, title: "Kubernetes", kh: "Container Orchestration Enterprise", moduleId: 7, reason: "Scale Container Cluster ដោយ K8s = Industry Standard" },
  { step: 9, title: "Terraform IaC", kh: "Cloud ជាកូដ", moduleId: 8, reason: "Infrastructure = Code: Reproducible, Reviewable, Version-controlled" },
  { step: 10, title: "Monitoring & Observability", kh: "ភ្នែកទិព្វតាមដានប្រព័ន្ធ", moduleId: 9, reason: "ដឹងមុន Users — Metrics + Alerts = Production Confidence" },
  { step: 11, title: "GitOps & ArgoCD", kh: "Deploy ស្វ័យប្រវត្តតាម Git", moduleId: 10, reason: "Next-gen CD: Git Push = Auto-Deploy to K8s Cluster" },
  { step: 12, title: "DevSecOps", kh: "Security ក្នុងគ្រប់ជំហាន", moduleId: 11, reason: "Security ≠ Afterthought — SBOM, Signing, Vault, Zero Trust" }
];

export default function DevOpsRoadmapKH() {
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [tab, setTab] = useState<"learn"|"code"|"quiz"|"flash"|"tips">("learn");
  const [completed, setCompleted] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try { return JSON.parse(window.localStorage.getItem("devops_completed") || "{}"); } catch { return {}; }
  });
  const [quizState, setQuizState] = useState({ idx: 0, selected: null as string|null, score: 0, done: false });
  const [flashIdx, setFlashIdx] = useState(0);
  const [flashFlipped, setFlashFlipped] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState<"All"|Module["difficulty"]>("All");
  const [showPath, setShowPath] = useState(false);

  useEffect(() => {
    if (activeModule) { document.body.style.overflow = "hidden"; }
    else { document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [activeModule]);

  const totalXP = Object.keys(completed).reduce((s, id) => s + (MODULES[parseInt(id)]?.xp || 0), 0);
  const maxXP = MODULES.reduce((s, m) => s + m.xp, 0);
  const completedCount = Object.keys(completed).length;
  const level = totalXP < 500 ? "Newcomer 🌱" : totalXP < 1200 ? "Junior DevOps ⚙️" : totalXP < 2200 ? "Mid DevOps 🔧" : "Senior DevOps 🏆";

  const saveCompleted = (n: Record<string, boolean>) => {
    setCompleted(n);
    try { window.localStorage.setItem("devops_completed", JSON.stringify(n)); } catch {}
  };
  const markComplete = (id: number) => saveCompleted({ ...completed, [id]: true });

  const openModule = (mod: Module) => {
    setActiveModule(mod);
    setTab("learn");
    setQuizState({ idx: 0, selected: null, score: 0, done: false });
    setFlashIdx(0);
    setFlashFlipped(false);
  };

  const handleQuizAnswer = (opt: string) => {
    if (quizState.selected !== null) return;
    const correct = opt === activeModule!.quiz[quizState.idx].a;
    setQuizState(p => ({ ...p, selected: opt, score: correct ? p.score + 1 : p.score }));
  };

  const nextQuestion = () => {
    const isCorrect = quizState.selected === activeModule!.quiz[quizState.idx].a;
    const newScore = quizState.score + (isCorrect ? 1 : 0);
    const next = quizState.idx + 1;
    if (next >= activeModule!.quiz.length) {
      setQuizState(p => ({ ...p, score: newScore, done: true }));
      if (newScore >= 2) markComplete(activeModule!.id);
    } else {
      setQuizState({ idx: next, selected: null, score: newScore, done: false });
    }
  };

  const filtered = MODULES.filter(m => {
    const q = searchQuery.toLowerCase();
    return (m.title.toLowerCase().includes(q) || m.titleKH.includes(searchQuery)) &&
      (filterDifficulty === "All" || m.difficulty === filterDifficulty);
  });

  return (
    <div style={{ minHeight:"100vh", background:"#080810", color:"#fff", fontFamily:"'IBM Plex Mono','Courier New',monospace", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&family=Noto+Sans+Khmer:wght@400;600;700&display=swap');
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-track{background:#111}
        ::-webkit-scrollbar-thumb{background:#333;border-radius:2px}
        .mod-card{transition:transform 0.2s,border-color 0.2s;cursor:pointer}
        .mod-card:hover{transform:translateY(-3px);border-color:rgba(255,255,255,0.2)!important}
        .tab-btn{border:none;cursor:pointer;transition:opacity 0.15s;font-family:inherit}
        .quiz-opt{cursor:pointer;transition:border-color 0.15s,background 0.15s;border:1px solid #333;border-radius:10px;padding:11px 14px;font-size:clamp(11px,2vw,13px)}
        .quiz-opt:hover{border-color:#555;background:#1a1a2e}
        .flip-card{perspective:800px;cursor:pointer;height:190px}
        .flip-inner{transition:transform 0.5s;transform-style:preserve-3d;position:relative;width:100%;height:100%}
        .flip-inner.flipped{transform:rotateY(180deg)}
        .flip-face{backface-visibility:hidden;-webkit-backface-visibility:hidden;position:absolute;inset:0}
        .flip-back{transform:rotateY(180deg)}
        .khmer{font-family:'Noto Sans Khmer',sans-serif}
        .modal-bg{position:fixed;inset:0;background:rgba(0,0,0,0.88);z-index:100;overflow-y:auto;display:flex;align-items:flex-start;justify-content:center;padding:1rem}
        .tip-item{display:flex;align-items:flex-start;gap:8px;padding:9px 13px;background:#111827;border-radius:8px;border-left:3px solid #06b6d4}
        .key-item{display:flex;align-items:center;gap:9px;padding:8px 13px;background:#0f172a;border-radius:8px;border:1px solid #1e293b}
        .path-step{display:flex;gap:12px;align-items:flex-start;padding:12px 14px;background:#0d0d1a;border-radius:10px;border:1px solid #1e293b;cursor:pointer;transition:border-color 0.15s}
        .path-step:hover{border-color:rgba(6,182,212,0.4)}
        .pbar{transition:width 0.6s ease}
      `}</style>

      {/* Header */}
      <header style={{borderBottom:"1px solid #1e293b",background:"rgba(8,8,16,0.95)",position:"sticky",top:0,zIndex:50,backdropFilter:"blur(12px)"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"13px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
          <div>
            <div style={{fontSize:"clamp(16px,3vw,20px)",fontWeight:700,background:"linear-gradient(90deg,#06b6d4,#6366f1)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>DevOps Roadmap KH</div>
            <div className="khmer" style={{fontSize:11,color:"#555",marginTop:1}}>Enterprise Edition • ១២ Modules • SRE Ready</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
            <div style={{background:"#111827",border:"1px solid #1e293b",borderRadius:8,padding:"5px 12px",fontSize:12}}>
              <span style={{color:"#06b6d4"}}>⬡ {totalXP} XP</span>
              <span style={{color:"#444",margin:"0 6px"}}>•</span>
              <span style={{color:"#a78bfa"}}>{level}</span>
            </div>
            <div style={{background:"#111827",border:"1px solid #1e293b",borderRadius:8,padding:"5px 12px",fontSize:12}}>
              <span className="khmer" style={{color:"#10b981"}}>{completedCount}/{MODULES.length} Done</span>
            </div>
            <button onClick={()=>setShowPath(!showPath)}
              style={{background:showPath?"#06b6d4":"#111827",border:`1px solid ${showPath?"#06b6d4":"#1e293b"}`,color:showPath?"#000":"#94a3b8",borderRadius:8,padding:"5px 13px",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>
              🗺️ Path
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section style={{maxWidth:1200,margin:"0 auto",padding:"36px 16px 28px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:24,alignItems:"start",flexWrap:"wrap"}}>
          <div>
            <div style={{display:"inline-block",background:"rgba(6,182,212,0.08)",border:"1px solid rgba(6,182,212,0.2)",borderRadius:20,padding:"3px 14px",fontSize:11,color:"#06b6d4",marginBottom:14}}>
              🚀 DevOps/SRE Enterprise Track
            </div>
            <h1 style={{fontSize:"clamp(26px,4.5vw,52px)",fontWeight:700,lineHeight:1.08,margin:"0 0 10px"}}>
              Master<br/>
              <span style={{background:"linear-gradient(90deg,#06b6d4,#6366f1)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>DevOps</span><br/>
              Engineering
            </h1>
            <p className="khmer" style={{color:"#94a3b8",lineHeight:1.7,fontSize:"clamp(12px,2.2vw,14px)",maxWidth:580,marginBottom:18}}>
              ១២ Modules Enterprise-Grade: Linux, Docker, CI/CD, AWS, K8s, Terraform, GitOps, Monitoring, DevSecOps — ជាមួយ SRE Foundation, RED/USE Methods, OpenTelemetry, ApplicationSets, SBOM, Image Signing — Quizzes + Flashcards + Tips ជាភាសាខ្មែរ។
            </p>
            <div style={{background:"#111827",border:"1px solid #1e293b",borderRadius:12,padding:"14px 16px",maxWidth:480}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:11}}>
                <span className="khmer" style={{color:"#94a3b8"}}>ដំណើររបស់អ្នក</span>
                <span style={{color:"#06b6d4"}}>{Math.round((totalXP/maxXP)*100)}% • {totalXP}/{maxXP} XP</span>
              </div>
              <div style={{background:"#1e293b",borderRadius:4,height:7,overflow:"hidden"}}>
                <div className="pbar" style={{height:"100%",width:`${(totalXP/maxXP)*100}%`,background:"linear-gradient(90deg,#06b6d4,#6366f1)"}}/>
              </div>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,minWidth:180}}>
            {[{l:"Modules",v:MODULES.length,c:"#06b6d4"},{l:"Completed",v:completedCount,c:"#10b981"},{l:"Total XP",v:maxXP,c:"#6366f1"},{l:"Your XP",v:totalXP,c:"#f97316"}].map((s,i)=>(
              <div key={i} style={{background:"#111827",border:"1px solid #1e293b",borderRadius:10,padding:"11px 13px",textAlign:"center"}}>
                <div style={{fontSize:22,fontWeight:700,color:s.c}}>{s.v}</div>
                <div style={{fontSize:10,color:"#475569",marginTop:2}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Panel */}
      {showPath && (
        <section style={{maxWidth:1200,margin:"0 auto",padding:"0 16px 28px"}}>
          <div style={{background:"#0a0a14",border:"1px solid rgba(6,182,212,0.2)",borderRadius:16,padding:"20px 20px 16px",overflow:"hidden"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div>
                <h2 style={{fontSize:"clamp(15px,2.5vw,20px)",fontWeight:700,margin:0}}>🗺️ Recommended Learning Path</h2>
                <p className="khmer" style={{color:"#475569",fontSize:12,margin:"4px 0 0"}}>លំដាប់ Logical Flow — Module នីមួយៗជួយ Module បន្ទាប់</p>
              </div>
              <button onClick={()=>setShowPath(false)} style={{background:"#1e293b",border:"none",color:"#fff",width:30,height:30,borderRadius:6,cursor:"pointer",fontSize:14}}>✕</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:8}}>
              {LEARNING_PATH.map((p) => (
                <div key={p.step} className="path-step" onClick={()=>{openModule(MODULES[p.moduleId]);setShowPath(false);}}>
                  <div style={{width:32,height:32,borderRadius:8,background:completed[p.moduleId]?"#10b981":"#1e293b",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0,color:completed[p.moduleId]?"#fff":"#06b6d4"}}>
                    {completed[p.moduleId]?"✓":p.step}
                  </div>
                  <div>
                    <div style={{fontSize:13,fontWeight:700,color:completed[p.moduleId]?"#10b981":"#fff"}}>{p.title}</div>
                    <div className="khmer" style={{fontSize:11,color:"#475569",marginTop:2,lineHeight:1.5}}>{p.kh}</div>
                    <div style={{fontSize:10,color:"#334155",marginTop:3}}>{p.reason}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="khmer" style={{marginTop:14,padding:"12px 14px",background:"rgba(6,182,212,0.06)",border:"1px solid rgba(6,182,212,0.15)",borderRadius:10,fontSize:12,color:"#64748b",lineHeight:1.6}}>
              💡 <strong style={{color:"#06b6d4"}}>ការវាយតម្លៃ:</strong> ប្រសិនបើអ្នកអាចក្តោបក្តាប់ Concepts ១២ Modules + Hands-on Labs យ៉ាងហ្មត់ចត់ — អ្នកអាច Interview ជោគជ័យ ជា <strong style={{color:"#a78bfa"}}>DevOps Engineer / SRE / Platform Engineer (Junior–Mid)</strong> ហើយអ្នកមានគ្រឹះរឹងមាំសំរាប់ Senior/Enterprise ។
            </div>
          </div>
        </section>
      )}

      {/* Filter Bar */}
      <section style={{maxWidth:1200,margin:"0 auto",padding:"0 16px 20px"}}>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
          <input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="🔍 ស្វែងរក Module..." className="khmer"
            style={{background:"#111827",border:"1px solid #1e293b",color:"#fff",borderRadius:8,padding:"7px 13px",fontSize:13,outline:"none",width:210}}/>
          {DIFFICULTY_OPTIONS.map(d=>(
            <button key={d} onClick={()=>setFilterDifficulty(d)}
              style={{background:filterDifficulty===d?(DIFFICULTY_COLOR[d as keyof typeof DIFFICULTY_COLOR]||"#06b6d4"):"#111827",
                border:`1px solid ${filterDifficulty===d?(DIFFICULTY_COLOR[d as keyof typeof DIFFICULTY_COLOR]||"#06b6d4"):"#1e293b"}`,
                color:filterDifficulty===d?"#fff":"#64748b",borderRadius:8,padding:"6px 12px",fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>
              {d}
            </button>
          ))}
        </div>
      </section>

      {/* Module Grid */}
      <section style={{maxWidth:1200,margin:"0 auto",padding:"0 16px 36px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(275px,1fr))",gap:14}}>
          {filtered.map(mod=>(
            <div key={mod.id} className="mod-card" onClick={()=>openModule(mod)}
              style={{background:"#0d0d1a",border:`1px solid ${completed[mod.id]?mod.color+"44":"#1e293b"}`,borderRadius:14,overflow:"hidden",position:"relative"}}>
              {completed[mod.id]&&<div style={{position:"absolute",top:9,right:9,background:"#10b981",color:"#fff",borderRadius:20,padding:"2px 7px",fontSize:9,fontWeight:700}}>✓ DONE</div>}
              <div style={{height:3,background:`linear-gradient(90deg,${mod.color},${mod.color}66)`}}/>
              <div style={{padding:"16px 16px 14px"}}>
                <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:9}}>
                  <span style={{fontSize:26}}>{mod.icon}</span>
                  <div>
                    <div style={{fontSize:10,color:mod.color,fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>MODULE {String(mod.id+1).padStart(2,"0")}</div>
                    <div style={{fontSize:"clamp(12px,2.5vw,15px)",fontWeight:700,lineHeight:1.2}}>{mod.title}</div>
                  </div>
                </div>
                <p className="khmer" style={{fontSize:11,color:"#475569",lineHeight:1.5,marginBottom:10,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>
                  {mod.titleKH}
                </p>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{display:"flex",gap:5}}>
                    <span style={{background:DIFFICULTY_COLOR[mod.difficulty]+"22",color:DIFFICULTY_COLOR[mod.difficulty],border:`1px solid ${DIFFICULTY_COLOR[mod.difficulty]}44`,borderRadius:5,padding:"2px 6px",fontSize:9}}>{mod.difficulty}</span>
                    <span style={{background:"#1e293b",color:"#475569",borderRadius:5,padding:"2px 6px",fontSize:9}}>{mod.duration}</span>
                  </div>
                  <span style={{color:mod.color,fontSize:11,fontWeight:700}}>+{mod.xp} XP</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6-Month Plan */}
      <section style={{maxWidth:1200,margin:"0 auto",padding:"0 16px 36px"}}>
        <div style={{background:"#0d0d1a",border:"1px solid #1e293b",borderRadius:16,padding:"22px 20px"}}>
          <h2 style={{fontSize:"clamp(15px,3vw,20px)",fontWeight:700,marginBottom:4}}>📅 6-Month Hardcore Plan</h2>
          <p className="khmer" style={{color:"#475569",fontSize:12,marginBottom:16}}>
            ១ → ១២ Modules រៀបចំតាម Logical Flow — Module បន្ទាប់ Constructor Module ចាស់
          </p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(255px,1fr))",gap:10}}>
            {[
              {month:"Month 1",focus:"DevOps Foundation + Linux + Git",modules:[0,1,2]},
              {month:"Month 2",focus:"Bash Scripting + Docker Mastery",modules:[3,4]},
              {month:"Month 3",focus:"CI/CD Pipelines (Enterprise)",modules:[5]},
              {month:"Month 4",focus:"AWS Cloud + K8s Architecture",modules:[6,7]},
              {month:"Month 5",focus:"Terraform IaC + Observability",modules:[8,9]},
              {month:"Month 6",focus:"GitOps + ArgoCD + DevSecOps",modules:[10,11]}
            ].map((p,i)=>(
              <div key={i} style={{background:"#111827",border:"1px solid #1e293b",borderRadius:10,padding:"13px 15px"}}>
                <div style={{color:"#06b6d4",fontSize:10,fontWeight:700,letterSpacing:1}}>{p.month}</div>
                <div style={{fontSize:"clamp(11px,2vw,13px)",fontWeight:600,margin:"4px 0 8px"}}>{p.focus}</div>
                <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                  {p.modules.map(mid=>(
                    <span key={mid} onClick={e=>{e.stopPropagation();openModule(MODULES[mid]);}}
                      style={{background:MODULES[mid].color+"22",color:MODULES[mid].color,borderRadius:5,padding:"2px 7px",fontSize:10,cursor:"pointer",border:`1px solid ${MODULES[mid].color}33`}}>
                      {MODULES[mid].icon} M{mid+1}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capstone */}
      <section style={{maxWidth:1200,margin:"0 auto",padding:"0 16px 56px"}}>
        <div style={{background:"linear-gradient(135deg,rgba(6,182,212,0.07),rgba(99,102,241,0.07))",border:"1px solid rgba(6,182,212,0.15)",borderRadius:18,padding:"26px 22px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:14,flexWrap:"wrap"}}>
            <div>
              <div style={{display:"inline-block",background:"rgba(139,92,246,0.1)",border:"1px solid rgba(139,92,246,0.2)",borderRadius:20,padding:"3px 12px",fontSize:10,color:"#a78bfa",marginBottom:10}}>🏆 CAPSTONE PROJECT</div>
              <h2 style={{fontSize:"clamp(16px,3vw,22px)",fontWeight:700,marginBottom:10}}>End-to-End GitOps Production Architecture</h2>
              <p className="khmer" style={{color:"#94a3b8",lineHeight:1.7,fontSize:"clamp(11px,2vw,13px)",maxWidth:560}}>
                បង្ហាញ Production System ពេញលេញ: Code → Tests → Quality Gate → Docker Build → ECR → ArgoCD Sync → EKS → Prometheus/Grafana/Loki Observability → Telegram Alerts → Auto-Rollback on Error Budget Breach
              </p>
            </div>
            <div style={{fontSize:56}}>🚀</div>
          </div>
          <div style={{marginTop:18,background:"rgba(0,0,0,0.6)",borderRadius:10,padding:"14px 18px",overflowX:"auto"}}>
            <pre style={{fontFamily:"monospace",fontSize:"clamp(10px,1.5vw,12px)",color:"#06b6d4",lineHeight:1.8,margin:0}}>{`[ Code Push ] → [ GitHub Actions CI ]
                        │
            ┌───────────┼───────────┐
       [ Tests ]  [ SonarQube ]  [ Trivy Scan ]
            └───────────┼───────────┘
                        │
           [ Build & Sign Docker Image (Cosign) ]
                        │
              [ Push to AWS ECR Registry ]
                        │
      [ ArgoCD Detects New Tag → Auto-Sync ]
                        │
          [ Deploy to AWS EKS Cluster ]
                        │
    [ Prometheus Scrape → Grafana Dashboard ]
                        │
   [ Error Rate > SLO? → Alertmanager → Telegram ]
                        │
   [ Error Budget Breach → Auto Rollback via Git ]`}</pre>
          </div>
        </div>
      </section>

      {/* Modal */}
      {activeModule && (
        <div className="modal-bg" onClick={e=>{ if(e.target===e.currentTarget) setActiveModule(null); }}>
          <div style={{background:"#0d0d1a",border:"1px solid #1e293b",borderRadius:18,width:"100%",maxWidth:840,overflow:"hidden",margin:"auto"}}>
            {/* Modal Header */}
            <div style={{borderBottom:"1px solid #1e293b",padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:11}}>
                <span style={{fontSize:28}}>{activeModule.icon}</span>
                <div>
                  <div style={{fontSize:9,color:activeModule.color,fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>
                    MODULE {String(activeModule.id+1).padStart(2,"0")} • {activeModule.difficulty} • {activeModule.duration} • +{activeModule.xp} XP
                  </div>
                  <div style={{fontSize:"clamp(14px,2.5vw,18px)",fontWeight:700}}>{activeModule.title}</div>
                  <div className="khmer" style={{fontSize:11,color:"#475569"}}>{activeModule.titleKH}</div>
                </div>
              </div>
              <button onClick={()=>setActiveModule(null)} style={{background:"#1e293b",border:"none",color:"#fff",width:32,height:32,borderRadius:8,cursor:"pointer",fontSize:14}}>✕</button>
            </div>

            {/* Tabs */}
            <div style={{display:"flex",borderBottom:"1px solid #1e293b",background:"#080810",overflowX:"auto"}}>
              {(["learn","code","quiz","flash","tips"] as const).map(t=>{
                const labels:Record<string,string> = {learn:"📖 Learn",code:"💻 Code",quiz:"🧪 Quiz",flash:"🃏 Cards",tips:"💡 Tips"};
                return (
                  <button key={t} className="tab-btn" onClick={()=>setTab(t)}
                    style={{padding:"11px 16px",background:tab===t?"#0d0d1a":"transparent",color:tab===t?"#fff":"#475569",
                      borderBottom:tab===t?`2px solid ${activeModule.color}`:"2px solid transparent",fontSize:"clamp(11px,2vw,13px)",whiteSpace:"nowrap"}}>
                    {labels[t]}
                  </button>
                );
              })}
            </div>

            <div style={{padding:"20px 20px",maxHeight:"72vh",overflowY:"auto"}}>

              {/* LEARN */}
              {tab==="learn" && (
                <div>
                  <p className="khmer" style={{color:"#cbd5e1",lineHeight:1.8,fontSize:"clamp(12px,2.2vw,14px)",marginBottom:20,background:"#111827",borderRadius:10,padding:"14px 17px",borderLeft:`3px solid ${activeModule.color}`}}>
                    {activeModule.content}
                  </p>
                  <h3 style={{fontSize:12,color:activeModule.color,marginBottom:10,textTransform:"uppercase",letterSpacing:1}}>Core Skills</h3>
                  <div style={{display:"grid",gap:7,marginBottom:18}}>
                    {activeModule.points.map((pt,i)=>(
                      <div key={i} style={{display:"flex",alignItems:"center",gap:9,background:"#111827",borderRadius:8,padding:"9px 13px",border:"1px solid #1e293b",fontSize:"clamp(11px,2vw,13px)"}}>
                        <div style={{width:5,height:5,borderRadius:"50%",background:activeModule.color,flexShrink:0}}/>
                        {pt}
                      </div>
                    ))}
                  </div>
                  <h3 style={{fontSize:12,color:"#94a3b8",marginBottom:10,textTransform:"uppercase",letterSpacing:1}}>📌 Key Takeaways</h3>
                  <div style={{display:"grid",gap:6}}>
                    {activeModule.keyTakeaways.map((k,i)=>(
                      <div key={i} className="key-item">
                        <span style={{color:activeModule.color,fontSize:12,flexShrink:0}}>→</span>
                        <span className="khmer" style={{fontSize:"clamp(11px,2vw,13px)",color:"#cbd5e1"}}>{k}</span>
                      </div>
                    ))}
                  </div>
                  {completed[activeModule.id]&&(
                    <div style={{marginTop:16,background:"rgba(16,185,129,0.08)",border:"1px solid rgba(16,185,129,0.25)",borderRadius:10,padding:"11px 15px",color:"#10b981",fontSize:13,textAlign:"center"}} className="khmer">
                      ✅ Module នេះ Completed! {activeModule.xp} XP ទទួលបាន
                    </div>
                  )}
                </div>
              )}

              {/* CODE */}
              {tab==="code" && (
                <div>
                  <div style={{background:"#020617",borderRadius:12,overflow:"hidden",border:"1px solid #1e293b"}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 14px",background:"#0f172a",borderBottom:"1px solid #1e293b"}}>
                      <div style={{display:"flex",gap:5}}>
                        <div style={{width:9,height:9,borderRadius:"50%",background:"#ef4444"}}/>
                        <div style={{width:9,height:9,borderRadius:"50%",background:"#f59e0b"}}/>
                        <div style={{width:9,height:9,borderRadius:"50%",background:"#10b981"}}/>
                        <span style={{marginLeft:7,fontSize:10,color:"#334155"}}>production-lab.sh</span>
                      </div>
                      <span style={{fontSize:9,color:"#1e293b"}}>STRICT CODE</span>
                    </div>
                    <pre style={{padding:"18px",fontSize:"clamp(10px,1.8vw,12px)",color:"#4ade80",lineHeight:1.7,overflowX:"auto",margin:0}}>
                      <code>{activeModule.code}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* QUIZ */}
              {tab==="quiz" && (
                <div>
                  {!quizState.done ? (
                    <div>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:14,fontSize:11,color:"#475569"}}>
                        <span className="khmer">សំណួរ {quizState.idx+1}/{activeModule.quiz.length}</span>
                        <span style={{color:"#10b981"}}>Score: {quizState.score}</span>
                      </div>
                      <div style={{background:"#111827",borderRadius:11,padding:"15px 17px",marginBottom:14,border:"1px solid #1e293b"}}>
                        <p className="khmer" style={{fontSize:"clamp(13px,2.5vw,15px)",fontWeight:600,lineHeight:1.6,margin:0}}>{activeModule.quiz[quizState.idx].q}</p>
                      </div>
                      <div style={{display:"grid",gap:7}}>
                        {activeModule.quiz[quizState.idx].options.map((opt,i)=>{
                          const sel=quizState.selected===opt, correct=opt===activeModule.quiz[quizState.idx].a, show=quizState.selected!==null;
                          let bg="#111827",border="#333",color="#fff";
                          if(show){if(correct){bg="rgba(16,185,129,0.15)";border="#10b981";color="#10b981";}else if(sel){bg="rgba(239,68,68,0.15)";border="#ef4444";color="#ef4444";}}
                          return (
                            <div key={i} className="quiz-opt" onClick={()=>handleQuizAnswer(opt)}
                              style={{background:bg,borderColor:border,color,cursor:show?"default":"pointer"}}>
                              <span style={{color:"#475569",marginRight:7}}>{"ABCD"[i]}.</span>{opt}
                            </div>
                          );
                        })}
                      </div>
                      {quizState.selected&&(
                        <button onClick={nextQuestion}
                          style={{marginTop:13,background:activeModule.color,border:"none",color:"#fff",borderRadius:10,padding:"10px 18px",fontSize:13,cursor:"pointer",width:"100%",fontFamily:"inherit",fontWeight:700}} className="khmer">
                          {quizState.idx+1>=activeModule.quiz.length?"✅ ចប់ Quiz":"▶ សំណួរបន្ទាប់"}
                        </button>
                      )}
                    </div>
                  ):(
                    <div style={{textAlign:"center",padding:"20px 0"}}>
                      <div style={{fontSize:48,marginBottom:10}}>{quizState.score>=2?"🎉":"📚"}</div>
                      <div className="khmer" style={{fontSize:"clamp(16px,3vw,20px)",fontWeight:700,marginBottom:7}}>
                        {quizState.score>=2?"ល្អណាស់!":"ព្យាយាមទៀតនៅ!"}
                      </div>
                      <div style={{color:"#94a3b8",fontSize:13,marginBottom:14}} className="khmer">
                        Score: {quizState.score}/{activeModule.quiz.length} • {quizState.score>=2?`+${activeModule.xp} XP ទទួលបាន!`:"ត្រូវការ ≥ 2/3"}
                      </div>
                      <button onClick={()=>setQuizState({idx:0,selected:null,score:0,done:false})}
                        style={{background:activeModule.color,border:"none",color:"#fff",borderRadius:10,padding:"9px 22px",fontSize:13,cursor:"pointer",fontFamily:"inherit"}} className="khmer">
                        🔄 ចាប់ Quiz ម្តងទៀត
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* FLASHCARDS */}
              {tab==="flash" && (
                <div>
                  <div className="khmer" style={{fontSize:11,color:"#475569",marginBottom:12,textAlign:"center"}}>
                    កាត {flashIdx+1}/{activeModule.flashcards.length} • ចុចលើកាតដើម្បីបង្រលែង
                  </div>
                  <div className="flip-card" onClick={()=>setFlashFlipped(!flashFlipped)}>
                    <div className={`flip-inner${flashFlipped?" flipped":""}`}>
                      <div className="flip-face" style={{background:`linear-gradient(135deg,${activeModule.color}1a,#111827)`,border:`1px solid ${activeModule.color}44`,borderRadius:13,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:18}}>
                        <div style={{fontSize:10,color:activeModule.color,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>TERM</div>
                        <div style={{fontSize:"clamp(15px,3vw,21px)",fontWeight:700,textAlign:"center"}}>{activeModule.flashcards[flashIdx].term}</div>
                        <div style={{fontSize:10,color:"#334155",marginTop:10}}>👆 ចុចដើម្បីមើល</div>
                      </div>
                      <div className="flip-face flip-back" style={{background:"#111827",border:"1px solid #1e293b",borderRadius:13,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:18}}>
                        <div style={{fontSize:10,color:"#10b981",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>DEFINITION</div>
                        <p className="khmer" style={{fontSize:"clamp(11px,2vw,13px)",textAlign:"center",lineHeight:1.7,color:"#e2e8f0",margin:0}}>{activeModule.flashcards[flashIdx].def}</p>
                      </div>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:8,justifyContent:"center",margin:"12px 0 8px"}}>
                    <button onClick={()=>{setFlashIdx(Math.max(0,flashIdx-1));setFlashFlipped(false);}} disabled={flashIdx===0}
                      style={{background:"#111827",border:"1px solid #1e293b",color:flashIdx===0?"#333":"#fff",borderRadius:8,padding:"7px 18px",fontSize:13,cursor:flashIdx===0?"default":"pointer",fontFamily:"inherit"}}>◀</button>
                    <button onClick={()=>{setFlashIdx(Math.min(activeModule.flashcards.length-1,flashIdx+1));setFlashFlipped(false);}} disabled={flashIdx===activeModule.flashcards.length-1}
                      style={{background:flashIdx===activeModule.flashcards.length-1?"#111827":activeModule.color,border:"none",color:"#fff",borderRadius:8,padding:"7px 18px",fontSize:13,cursor:flashIdx===activeModule.flashcards.length-1?"default":"pointer",fontFamily:"inherit"}}>▶</button>
                  </div>
                  <div style={{display:"flex",gap:4,justifyContent:"center"}}>
                    {activeModule.flashcards.map((_,i)=>(
                      <div key={i} onClick={()=>{setFlashIdx(i);setFlashFlipped(false);}} style={{width:7,height:7,borderRadius:"50%",background:i===flashIdx?activeModule.color:"#1e293b",cursor:"pointer"}}/>
                    ))}
                  </div>
                </div>
              )}

              {/* TIPS */}
              {tab==="tips" && (
                <div>
                  <h3 className="khmer" style={{fontSize:13,marginBottom:13,color:"#64748b"}}>💡 Pro Tips & Production Best Practices</h3>
                  <div style={{display:"grid",gap:8}}>
                    {activeModule.tips.map((tip,i)=>(
                      <div key={i} className="tip-item">
                        <span style={{color:"#06b6d4",fontWeight:700,flexShrink:0}}>{i+1}.</span>
                        <span className="khmer" style={{color:"#cbd5e1",lineHeight:1.6,fontSize:"clamp(11px,2vw,13px)"}}>{tip}</span>
                      </div>
                    ))}
                  </div>
                  {!completed[activeModule.id]&&(
                    <button onClick={()=>markComplete(activeModule.id)}
                      style={{marginTop:18,background:`linear-gradient(90deg,${activeModule.color},#6366f1)`,border:"none",color:"#fff",borderRadius:10,padding:"12px 18px",fontSize:"clamp(12px,2vw,14px)",cursor:"pointer",width:"100%",fontFamily:"inherit",fontWeight:700}} className="khmer">
                      ✅ Mark as Complete (+{activeModule.xp} XP)
                    </button>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{borderTop:"1px solid #1e293b",background:"#080810",padding:"22px 16px",textAlign:"center"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{fontSize:"clamp(14px,3vw,18px)",fontWeight:700,background:"linear-gradient(90deg,#06b6d4,#6366f1)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:7}}>
            Become a Professional DevOps/SRE Engineer 🚀
          </div>
          <p className="khmer" style={{color:"#334155",fontSize:"clamp(10px,1.8vw,12px)",maxWidth:480,margin:"0 auto 14px"}}>
            ជំនាញ DevOps/SRE ទទួលបានពីការ Debug Error រាប់រយដង, Incidents ក្នុង Production, Labs, Postmortems
          </p>
          <div style={{display:"flex",gap:5,flexWrap:"wrap",justifyContent:"center"}}>
            {["Linux","Git","Docker","CI/CD","Kubernetes","Terraform","AWS","ArgoCD","Prometheus","OpenTelemetry","DevSecOps","SRE"].map((t,i)=>(
              <span key={i} style={{background:"#0d0d1a",border:"1px solid #1e293b",color:"#334155",borderRadius:5,padding:"3px 8px",fontSize:9}}>{t}</span>
            ))}
          </div>
          <div style={{marginTop:14,fontSize:10,color:"#1e293b"}}>DEVOPS/SRE ROADMAP KH • ENTERPRISE EDITION v2</div>
        </div>
      </footer>
    </div>
  );
}