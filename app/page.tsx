"use client";
import { useEffect, useState } from "react";

type QuizItem = {
  q: string;
  a: string;
  options: string[];
};

type Flashcard = {
  term: string;
  def: string;
};

type Module = {
  id: number;
  title: string;
  titleKH: string;
  icon: string;
  color: string;
  bgGrad: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  xp: number;
  content: string;
  code: string;
  points: string[];
  quiz: QuizItem[];
  flashcards: Flashcard[];
  tips: string[];
};

const DIFFICULTY_COLOR: Record<Module["difficulty"], string> = {
  Beginner: "#22c55e",
  Intermediate: "#f59e0b",
  Advanced: "#ec4899",
  Expert: "#8b5cf6",
};

const DIFFICULTY_OPTIONS: Array<"All" | Module["difficulty"]> = ["All", "Beginner", "Intermediate", "Advanced", "Expert"];

const MODULES: Module[] = [
  {
    id: 0,
    title: "Introduction to DevOps",
    titleKH: "ណែនាំអំពី DevOps",
    icon: "🚀",
    color: "#06b6d4",
    bgGrad: "from-cyan-500 to-blue-600",
    duration: "1 សប្តាហ៍",
    difficulty: "Beginner",
    xp: 100,
    content: `DevOps មិនមែនជា Tool ឬភាសាសរសេរកូដទេ វាគឺជា "វប្បធម៌ការងារ (Culture)" និងជាស្ពានចម្លងផ្សារភ្ជាប់ក្រុមអភិវឌ្ឍន៍ (Development) និងក្រុមគ្រប់គ្រងប្រព័ន្ធ (Operations) ក្នុងគោលបំណងធ្វើឱ្យការ Deliver កម្មវិធីមានល្បឿនលឿន ស្ថេរភាព និងមានសុវត្ថិភាពខ្ពស់បំផុត។`,
    code: `// គោលការណ៍ស្នូល CAMS នៃ DevOps
1. Culture    - រៀនសូត្ររួមគ្នា Dev & Ops
2. Automation - ស្វ័យប្រវត្តកម្មកាត់បន្ថយ Error
3. Measurement- វាស់ MTTR, Deployment Frequency
4. Sharing    - ចែករំលែកចំណេះដឹង Tools ក្នុងក្រុម`,
    points: [
      "Automation Culture & Collaboration",
      "CI/CD Continuous Integration & Deployment",
      "High Availability & System Reliability",
      "Infrastructure as Code (IaC) Architecture",
      "Microservices & Cloud Native Paradigm"
    ],
    quiz: [
      { q: "DevOps ជាអ្វី?", a: "វប្បធម៌ការងារ (Culture)", options: ["Tool", "ភាសាកូដ", "វប្បធម៌ការងារ (Culture)", "ប្រព័ន្ធប្រតិបត្តិការ"] },
      { q: "CAMS តំណាងឱ្យអ្វី?", a: "Culture, Automation, Measurement, Sharing", options: ["Code, App, Merge, Scale", "Culture, Automation, Measurement, Sharing", "Cloud, AWS, Monitor, Security", "CI/CD, Ansible, Maven, Shell"] },
      { q: "CI/CD ជាអ្វី?", a: "Continuous Integration / Continuous Deployment", options: ["Code Import / Code Deploy", "Continuous Integration / Continuous Deployment", "Create Image / Create Docker", "Check Infrastructure / Check Database"] }
    ],
    flashcards: [
      { term: "DevOps", def: "វប្បធម៌ការងារភ្ជាប់ Dev & Ops ដើម្បី Deliver Software លឿន និងមានស្ថិរភាព" },
      { term: "CI/CD", def: "Continuous Integration / Continuous Deployment ប្រព័ន្ធ Deploy ស្វ័យប្រវត្ត" },
      { term: "CAMS", def: "Culture, Automation, Measurement, Sharing - សសរស្តម្ភ ៤ នៃ DevOps" },
      { term: "IaC", def: "Infrastructure as Code - គ្រប់គ្រង Server តាមរយៈការសរសេរកូដ" }
    ],
    tips: ["ចាប់ផ្តើមពីការយល់ដឹង Culture មុន Tools", "DevOps ≠ Job Title វាជា Mindset", "MTTR (Mean Time To Recovery) វាស់ ល្អប៉ុណ្ណាក្រុម Recover ពីបញ្ហា"]
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
    content: `Linux គឺជាឆ្អឹងខ្នងនៃប្រព័ន្ធ DevOps ព្រោះម៉ាស៊ីន Server ជាង ៩០% នៅលើពិភពលោកគឺរត់នៅលើ Linux។ ការយល់ដឹងពី File System Hierarchy និងការគ្រប់គ្រង Permission គឺជារឿងដាច់ខាតដែលត្រូវតែចេះ។`,
    code: `# /etc     -> ផ្ទុក Config Files
# /var/log -> ផ្ទុក System Logs
# /home    -> Folder របស់ Users

# File Permissions (rwx = 4+2+1)
chmod 755 deploy.sh        # Owner=7, Group=5, Others=5
chown -R nginx /var/www    # ផ្លាស់ Ownership

# Systemd
systemctl enable --now nginx  # Start + Auto-boot
ss -tulnp                      # List Open Ports
ssh -i ~/.ssh/id_rsa user@ip  # SSH Key Login`,
    points: ["File System Hierarchy", "chmod/chown Permissions", "Systemd Service Control", "SSH Key Authentication", "Network Diagnostics"],
    quiz: [
      { q: "Config files ស្ថិតនៅ Directory ណា?", a: "/etc", options: ["/bin", "/etc", "/home", "/tmp"] },
      { q: "chmod 755 មានន័យថាអ្វី?", a: "Owner=rwx, Group=r-x, Others=r-x", options: ["Owner=rwx, Group=rwx, Others=rwx", "Owner=rwx, Group=r-x, Others=r-x", "Owner=rw, Group=rw, Others=r", "Owner=r, Group=r, Others=r"] },
      { q: "Command ណាចាប់ nginx ចូល systemd?", a: "systemctl enable --now nginx", options: ["nginx start", "service nginx on", "systemctl enable --now nginx", "init nginx"] }
    ],
    flashcards: [
      { term: "/etc", def: "Directory ផ្ទុកឯកសារ Configuration ទាំងអស់នៃ Linux System" },
      { term: "chmod 755", def: "ផ្តល់ Permission Owner=rwx (7), Group=r-x (5), Others=r-x (5)" },
      { term: "systemctl", def: "Command គ្រប់គ្រង Services នៅក្នុង systemd (enable, start, stop, status)" },
      { term: "SSH Key", def: "Public/Private Key Pair ជំនួស Password ក្នុងការ Login Server" },
      { term: "ss -tulnp", def: "Command ពិនិត្យ Ports ដែលកំពុង Listen នៅលើ Server" }
    ],
    tips: ["ហាមប្រើ chmod 777 ក្នុង Production", "ប្រើ ssh-keygen -t ed25519 ជំនួស RSA", "alias ll='ls -alF' ជួយ Developer ជំហានច្រើន"]
  },
  {
    id: 2,
    title: "Git & GitHub",
    titleKH: "Git និង GitHub",
    icon: "🌿",
    color: "#f97316",
    bgGrad: "from-orange-500 to-red-600",
    duration: "2 សប្តាហ៍",
    difficulty: "Beginner",
    xp: 150,
    content: `Git ដើរតួជា "Single Source of Truth" នៅក្នុងពិភព DevOps។ មិនថាតែកូដ ឬ Infrastructure Configs សុទ្ធតែត្រូវគ្រប់គ្រងនៅលើ Git ទាំងអស់ ដើម្បីអាច Rollback, Track Changes, និង Collaborate ជាក្រុម។`,
    code: `# Feature Branch Workflow
git checkout -b feature/oauth-login
git add .
git commit -m "feat(auth): add OAuth2 flow"
git push origin feature/oauth-login

# Advanced Operations
git fetch --all --prune      # Sync + cleanup
git merge --no-ff feature/x  # Keep history
git rebase -i HEAD~3         # Squash commits
git log --oneline --graph    # Visual history`,
    points: ["Git Branching Strategy", "Feature / GitFlow / Trunk-Based", "Pull Requests & Code Review", "Merge Conflicts Resolution", "Git Hooks & Automation"],
    quiz: [
      { q: "Command ណាបង្កើត Branch ថ្មី?", a: "git checkout -b branch-name", options: ["git branch new", "git create branch", "git checkout -b branch-name", "git new branch"] },
      { q: "git rebase -i HEAD~3 ធ្វើអ្វី?", a: "Squash 3 commits ចុងក្រោយ", options: ["លុប 3 branches", "Squash 3 commits ចុងក្រោយ", "ត្រឡប់ 3 versions", "Reset branch"] },
      { q: "Conventional Commits prefix ណាសម្រាប់ Feature ថ្មី?", a: "feat:", options: ["add:", "new:", "feat:", "feature:"] }
    ],
    flashcards: [
      { term: "git rebase", def: "ការចម្លង Commits ពី Branch មួយ ទៅ Branch មួយទៀត ធ្វើឱ្យ History ស្អាត" },
      { term: "git stash", def: "រក្សាទុក Changes បណ្តោះអាសន្ន ដើម្បីប្តូរ Branch ដោយគ្មាន Commit" },
      { term: "Pull Request", def: "Request ដើម្បីបញ្ចូល Code ពី Branch ទៅ Main ហើយឱ្យ Review" },
      { term: "git cherry-pick", def: "ចម្លង Commit ពិសេសមួយ ពី Branch ណាមួយ ដាក់ Current Branch" }
    ],
    tips: ["ប្រើ Conventional Commits: feat: fix: chore: docs:", "ហាមរុញ Directly ទៅ main branch", "1 PR = 1 Feature = 1 Review"]
  },
  {
    id: 3,
    title: "Bash Scripting",
    titleKH: "ការសរសេរ Bash",
    icon: "⚡",
    color: "#eab308",
    bgGrad: "from-yellow-500 to-orange-500",
    duration: "2 សប្តាហ៍",
    difficulty: "Intermediate",
    xp: 180,
    content: `Bash Scripting ជាឧបករណ៍ Automation ចម្បងលើ Linux ដែលជួយលុបបំបាត់ការងារដដែលៗ ដូចជា Backup, Cleanup, Monitoring Alerts, Log Rotation, Health Checks, និង Deployment Scripts ប្រចាំថ្ងៃ។`,
    code: `#!/bin/bash
set -euo pipefail  # ឈប់ភ្លាម បើ Error

BACKUP_DIR="/var/backups/mysql"
DATE=$(date +%Y-%m-%d_%H-%M)
DB="production_db"

mkdir -p "$BACKUP_DIR"
if mysqldump -u root "$DB" > "$BACKUP_DIR/db_$DATE.sql"; then
    echo "[✅ OK] Backup created at $DATE"
else
    echo "[🚨 FAIL] Backup failed!" && exit 1
fi
# Retention: លុប Backup ចាស់ > 7 ថ្ងៃ
find "$BACKUP_DIR" -mtime +7 -name "*.sql" -delete
echo "[🧹 DONE] Old backups purged."`,
    points: ["Variables & Arguments Parsing", "if/else, case, Loops", "Error Handling (set -euo pipefail)", "Cron Jobs Scheduling", "Log Rotation & Watchdogs"],
    quiz: [
      { q: "set -e ធ្វើអ្វីក្នុង Bash?", a: "Exit ភ្លាម បើ Command ណាមួយ Error", options: ["Enable Debug Mode", "Exit ភ្លាម បើ Command ណាមួយ Error", "Enable sudo", "Set Environment"] },
      { q: "Cron Job '0 2 * * *' ដំណើរការពេលណា?", a: "ម៉ោង 2 AM រាល់ថ្ងៃ", options: ["រៀង 2 ម៉ោង", "ម៉ោង 2 AM រាល់ថ្ងៃ", "រៀង 2 នាទី", "ពេល CPU > 2%"] },
      { q: "$? មានន័យថាអ្វី?", a: "Exit code នៃ Command ចុងក្រោយ", options: ["Process ID", "Exit code នៃ Command ចុងក្រោយ", "Script Name", "User ID"] }
    ],
    flashcards: [
      { term: "set -euo pipefail", def: "Strict mode: exit on error, undefined var, pipe failure - Essential ក្នុង Production scripts" },
      { term: "crontab -e", def: "កែ Cron Jobs - '0 2 * * *' = ម៉ោង 2AM រាល់ថ្ងៃ" },
      { term: "$(command)", def: "Command Substitution - ដំណើរ Command ហើយប្រើ Output ជា Variable" },
      { term: "trap", def: "Catch Signals/Errors: trap 'cleanup' EXIT - ដំណើរ cleanup function នៅពេល Script ចប់" }
    ],
    tips: ["ចាប់ផ្តើម Scripts ជានិច្ចជាមួយ set -euo pipefail", "ប្រើ shellcheck Tool ពិនិត្យ Script", "Log Everything ទៅ /var/log/"]
  },
  {
    id: 4,
    title: "Docker",
    titleKH: "ដូករ័ (Containers)",
    icon: "🐳",
    color: "#0ea5e9",
    bgGrad: "from-sky-500 to-blue-700",
    duration: "3 សប្តាហ៍",
    difficulty: "Intermediate",
    xp: 250,
    content: `Docker បដិវត្តការ Deliver Software ដោយវេចខ្ចប់ App + Dependencies ទាំងអស់ក្នុង Container តែមួយ ធ្វើឱ្យ "Works on my machine" លែងកើតឡើងទៀត។ Container ធ្ងន់ជាង Process តែស្រាលជាង VM ច្រើន។`,
    code: `# Multi-Stage Production Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app .
USER node          # ហាម Root!
EXPOSE 3000
CMD ["npm","start"]

# Docker Compose
docker compose up -d     # Start all services
docker compose logs -f   # Follow logs
docker stats             # Monitor resources`,
    points: ["Container vs VM Architecture", "Dockerfile & Image Layers", "Multi-stage Build Optimization", "Docker Compose for Local Lab", "Security (Non-root, Scan)"],
    quiz: [
      { q: "Multi-stage Build ចំណេញអ្វី?", a: "Image Size តូចជាង", options: ["Build លឿនជាង", "Image Size តូចជាង", "Memory ចំណេញ", "Network លឿនជាង"] },
      { q: "ហេតុអ្វីគួរប្រើ USER node?", a: "Security - ហាម Container ដំណើរការជា Root", options: ["ចំណេញ Memory", "Security - ហាម Container ដំណើរការជា Root", "ធ្វើឱ្យ Build លឿន", "Save Disk Space"] },
      { q: "docker compose up -d ធ្វើអ្វី?", a: "Start services ក្នុង Background (detach)", options: ["Download images", "Start services ក្នុង Background (detach)", "Delete containers", "Debug mode"] }
    ],
    flashcards: [
      { term: "Layer Caching", def: "Docker cache ម្តង Layers ដែលមិនផ្លាស់ COPY package.json ជានិច្ចមុន COPY . ." },
      { term: ".dockerignore", def: "ប្រហែល .gitignore - ហាម Files ខ្លះ (node_modules, .git) ចូល Image" },
      { term: "ENTRYPOINT vs CMD", def: "ENTRYPOINT = fixed command, CMD = default arguments (overridable)" },
      { term: "docker inspect", def: "មើល Low-level JSON info: IP, Volumes, Config, Labels របស់ Container/Image" }
    ],
    tips: ["ប្រើ Alpine images (node:20-alpine) ដើម្បី Size តូច", "ដាក់ COPY package.json ជា Layer ផ្ទាល់ RUN npm install", "trivy image <name> ស្កែន Vulnerabilities"]
  },
  {
    id: 5,
    title: "CI/CD Pipelines",
    titleKH: "បំពង់ CI/CD",
    icon: "🔄",
    color: "#ec4899",
    bgGrad: "from-pink-500 to-rose-700",
    duration: "3 សប្តាហ៍",
    difficulty: "Advanced",
    xp: 300,
    content: `CI/CD គឺជាម៉ាស៊ីន Automation ស្នូលនៃ DevOps។ Developer Push Code → Tests Run → Build Docker Image → Deploy ទៅ Server ដោយស្វ័យប្រវត្ត ពុំមានការ Manual ដោយដៃ ធ្វើឱ្យ Delivery លឿន ០ Error ហើយ Repeat-able។`,
    code: `# .github/workflows/deploy.yml
name: Production Pipeline
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Run Tests
      run: npm test
    - name: Build & Push Image
      uses: docker/build-push-action@v5
      with:
        push: true
        tags: \${{ secrets.REGISTRY }}/app:\${{ github.sha }}
    - name: Deploy to Server
      run: ssh deploy@server 'docker pull && restart'`,
    points: ["CI: Automated Testing", "GitHub Actions / GitLab CI", "Secrets & Environment Vars", "Artifact & Registry Management", "Blue-Green / Canary Deploy"],
    quiz: [
      { q: "CI មានន័យថាអ្វី?", a: "Continuous Integration", options: ["Cloud Infrastructure", "Continuous Integration", "Code Import", "Container Initialization"] },
      { q: "Secrets ក្នុង GitHub Actions ត្រូវប្រើ Syntax ណា?", a: "${{ secrets.MY_SECRET }}", options: ["${MY_SECRET}", "${{ secrets.MY_SECRET }}", "env.MY_SECRET", "#secrets.MY_SECRET"] },
      { q: "Blue-Green Deploy ចំណេញអ្វី?", a: "Zero-downtime deployment", options: ["Fast Build", "Zero-downtime deployment", "Cheap Cost", "Small Image"] }
    ],
    flashcards: [
      { term: "GitHub Actions", def: "Platform CI/CD ក្នុង GitHub - Workflow ជា YAML, ដំណើរលើ Runner (VM)" },
      { term: "Artifact", def: "ឯកសារ Output ពី Build (jar, exe, docker image) ដែលរក្សាទុកក្នុង Registry" },
      { term: "Blue-Green Deploy", def: "ដំណើរ 2 Environments ស្ទួន - Blue live, Green test - Swap DNS ដើម្បី Zero Downtime" },
      { term: "Canary Release", def: "Deploy ចំពោះ Users ត្រឹម 5-10% ជាមុន ពិនិត្យ Error ហើយ Rollout ទូទៅ" }
    ],
    tips: ["Cache dependencies (actions/cache) ជួយ Pipeline លឿន ២-៣ ដង", "ប្រើ github.sha ជា Image Tag ជំនួស 'latest'", "Test ក្នុង Pipeline = Shift Left Testing"]
  },
  {
    id: 6,
    title: "Cloud (AWS)",
    titleKH: "ពពក AWS",
    icon: "☁️",
    color: "#6366f1",
    bgGrad: "from-indigo-500 to-purple-700",
    duration: "4 សប្តាហ៍",
    difficulty: "Advanced",
    xp: 350,
    content: `AWS (Amazon Web Services) ជា Cloud Provider ធំជាងគេ ផ្តល់ Infrastructure On-Demand ទូទាំងពិភពលោក។ DevOps Engineer ត្រូវចេះ VPC Networking, Security Groups, IAM, EC2, S3, RDS, ELB, Auto Scaling ជាមូលដ្ឋាន។`,
    code: `# AWS Core Architecture
VPC (Virtual Private Cloud)
├── Public Subnet  → Load Balancer, Bastion
│   └── Internet Gateway (IGW)
└── Private Subnet → App Servers, Database
    └── NAT Gateway (Outbound only)

# Security Groups = Firewall
aws ec2 authorize-security-group-ingress \
  --group-id sg-xxx \
  --protocol tcp --port 443 --cidr 0.0.0.0/0

# IAM Least Privilege
aws iam create-policy --policy-document \
  '{"Effect":"Allow","Action":"s3:GetObject","Resource":"arn:aws:s3:::my-bucket/*"}'`,
    points: ["VPC, Subnets, Route Tables", "IAM Roles & Least Privilege", "EC2 & Security Groups", "S3 Storage & Versioning", "ALB & Auto Scaling Groups"],
    quiz: [
      { q: "Private Subnet ខុសពី Public Subnet យ៉ាងណា?", a: "Private Subnet គ្មាន IGW ផ្ទាល់ - Internet ចូលមិនបាន", options: ["Private ថោកជាង", "Private Subnet គ្មាន IGW ផ្ទាល់ - Internet ចូលមិនបាន", "Private Subnet លឿនជាង", "Private Subnet ធំជាង"] },
      { q: "IAM Principle of Least Privilege ជាអ្វី?", a: "ផ្តល់សិទ្ធិតូចបំផុតដែលត្រូវការ", options: ["ហាម Login ពីក្រៅ", "ផ្តល់សិទ្ធិតូចបំផុតដែលត្រូវការ", "ប្រើ Root Account", "បិទ MFA"] },
      { q: "S3 ជាអ្វី?", a: "Object Storage Service - ផ្ទុក Files គ្មានដែនកំណត់", options: ["Database Service", "Compute Service", "Object Storage Service - ផ្ទុក Files គ្មានដែនកំណត់", "Networking Service"] }
    ],
    flashcards: [
      { term: "VPC", def: "Virtual Private Cloud - Network ឯកជនរបស់អ្នកលើ AWS Cloud" },
      { term: "Security Group", def: "Stateful Firewall ជ្រើស Inbound/Outbound Traffic ជា Port/Protocol" },
      { term: "IAM Role", def: "Permission ដាក់លើ AWS Service/User - ប្រើ Role ជំនួស Access Keys" },
      { term: "Auto Scaling", def: "Scale EC2 ឡើងចុះ Automatically ប្រើ CPU Utilization, Schedule ឬ Custom Metrics" }
    ],
    tips: ["ហាម Store Access Keys ក្នុង Code - ប្រើ IAM Roles", "Enable CloudTrail: Log API calls ទាំងអស់", "ប្រើ ap-southeast-1 (Singapore) ជា Region ជិតបំផុត"]
  },
  {
    id: 7,
    title: "Kubernetes (K8s)",
    titleKH: "គ្រប់គ្រង Containers",
    icon: "☸️",
    color: "#3b82f6",
    bgGrad: "from-blue-500 to-indigo-800",
    duration: "5 សប្តាហ៍",
    difficulty: "Advanced",
    xp: 400,
    content: `Kubernetes គ្រប់គ្រង Container កម្រិត Enterprise ដោយ Scale ស្វ័យប្រវត្ត, Self-Heal ពេល Pod ដូត, Load Balance Traffic, Roll Back ដោយ Zero-Downtime ហើយ Manage Config/Secrets ប្រកបដោយ Security ។`,
    code: `# Deployment YAML
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3        # 3 Pods for HA
  selector:
    matchLabels: {app: web}
  template:
    spec:
      containers:
      - name: web
        image: kiraa/app:v1.2.0
        resources:
          limits: {cpu: "500m", memory: "512Mi"}
          requests: {cpu: "250m", memory: "256Mi"}
        livenessProbe:
          httpGet: {path: /health, port: 3000}`,
    points: ["Control Plane & Worker Nodes", "Pods, Deployments, Services", "HPA - Horizontal Pod Autoscaler", "Helm Charts Packaging", "ConfigMaps & Secrets"],
    quiz: [
      { q: "Pod ក្នុង Kubernetes ជាអ្វី?", a: "Unit ទាបបំផុត - ផ្ទុក 1+ Containers", options: ["ម៉ាស៊ីន Server", "Unit ទាបបំផុត - ផ្ទុក 1+ Containers", "Network Rule", "Storage Volume"] },
      { q: "livenessProbe ធ្វើអ្វី?", a: "Check Pod Health - Restart ប្រសិនបើ Fail", options: ["Monitor CPU", "Check Pod Health - Restart ប្រសិនបើ Fail", "Scale Pods", "Log Events"] },
      { q: "HPA ជាអ្វី?", a: "Horizontal Pod Autoscaler - Scale Pods ស្វ័យប្រវត្ត", options: ["Health Probe Agent", "Horizontal Pod Autoscaler - Scale Pods ស្វ័យប្រវត្ត", "Helm Package Archive", "High Priority Access"] }
    ],
    flashcards: [
      { term: "Pod", def: "Unit ដ៏តូចក្នុង K8s - Container 1+ ចែករំលែក IP, Storage, Network" },
      { term: "Service", def: "Stable IP/DNS ដែលស្ថិរ Load Balance Traffic ចូល Pods ជំនួស Pod IP (ប្តូរ)" },
      { term: "Namespace", def: "Virtual Cluster ក្នុង Cluster - បែងចែក Resources ជា dev/staging/prod" },
      { term: "kubectl", def: "CLI Tool គ្រប់គ្រង Kubernetes: get, describe, apply, delete, logs, exec" }
    ],
    tips: ["kubectl get pods -w ដើម្បី Watch Pods Real-time", "ប្រើ Resource Limits ជានិច្ច - ការពារ OOM Kill", "Helm = Package Manager ក្នុង K8s"]
  },
  {
    id: 8,
    title: "Terraform (IaC)",
    titleKH: "ហេដ្ឋារចនាសម្ព័ន្ធជាកូដ",
    icon: "🏗️",
    color: "#8b5cf6",
    bgGrad: "from-violet-500 to-purple-800",
    duration: "3 សប្តាហ៍",
    difficulty: "Advanced",
    xp: 300,
    content: `Terraform ឱ្យ DevOps Engineer សរសេរ Infrastructure (Network, Server, Database) ជា Code ហើយ Provision ទាំងស្រុងតាមបញ្ជា ២-៣ Commands ប៉ុណ្ណោះ ងាយ Replicate, Version Control, Review, Test, និង Destroy Infrastructure ដូចកូដ Software។`,
    code: `# main.tf - AWS Infrastructure
terraform {
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
  backend "s3" {         # Remote State (Team)
    bucket = "tf-state-bucket"
    key    = "prod/terraform.tfstate"
    region = "ap-southeast-1"
  }
}
resource "aws_instance" "web" {
  ami           = "ami-01811d4914144e3a3"
  instance_type = var.instance_type
  tags = { Name = "Prod-Web", ManagedBy = "Terraform" }
}`,
    points: ["Providers, Resources, Variables", "State File & Remote Backend", "Terraform Modules", "Plan, Apply, Destroy Lifecycle", "Drift Detection"],
    quiz: [
      { q: "terraform plan ធ្វើអ្វី?", a: "បង្ហាញ Changes ដែលនឹងកើតឡើងដោយមិន Apply", options: ["Apply infrastructure", "Create State file", "បង្ហាញ Changes ដែលនឹងកើតឡើងដោយមិន Apply", "Delete resources"] },
      { q: "State File ផ្ទុកអ្វី?", a: "Current State នៃ Infrastructure ទាំងអស់ Terraform គ្រប់គ្រង", options: ["SSH Keys", "Terraform Code", "Current State នៃ Infrastructure ទាំងអស់ Terraform គ្រប់គ្រង", "User Passwords"] },
      { q: "ហេតុអ្វីប្រើ Remote Backend (S3)?", a: "Team Collaboration - State ចែករំលែករហើយ Lock ការងារ", options: ["លឿនជាង Local", "Team Collaboration - State ចែករំលែករហើយ Lock ការងារ", "ចំណេញ Disk", "Security ល្អ"] }
    ],
    flashcards: [
      { term: "terraform init", def: "ទាញ Plugins/Providers, Setup Backend, Initialize Working Directory" },
      { term: "State Lock", def: "Lock State File ពេល Apply - ការពារ 2 People Apply ទន្ទឹមគ្នា (Race Condition)" },
      { term: "terraform module", def: "Reusable Code Block - ដូច Function ក្នុង Programming - ប្រើ Input Variables" },
      { term: "data source", def: "Read Existing Resources (already-created) ចូល Terraform ជា Reference" }
    ],
    tips: ["ប្រើ terraform fmt ជានិច្ចមុន Commit", "terraform validate ពិនិត្យ Syntax ឬ Error", "ហាម Edit State File ដោយដៃ"]
  },
  {
    id: 9,
    title: "Monitoring & Logging",
    titleKH: "ការត្រួតពិនិត្យប្រព័ន្ធ",
    icon: "📊",
    color: "#14b8a6",
    bgGrad: "from-emerald-500 to-teal-700",
    duration: "3 សប្តាហ៍",
    difficulty: "Advanced",
    xp: 280,
    content: `Production Systems ត្រូវការ Observability - ដឹងស្ថានភាពប្រព័ន្ធ Real-time មុននឹង Users ប្រទះបញ្ហា។ Stack: Prometheus (Collect Metrics) + Grafana (Visualize) + Loki (Logs) + Alertmanager (Alert Telegram/PagerDuty)។`,
    code: `# Prometheus Alert Rule (alerts.yml)
groups:
- name: production_alerts
  rules:
  - alert: HighCPUUsage
    expr: cpu_usage_percent > 90
    for: 5m
    labels: {severity: critical}
    annotations:
      summary: "CPU > 90% for 5 minutes!"
      description: "Host {{ $labels.instance }}"

# PromQL Useful Queries
rate(http_requests_total[5m])  # Request/sec
histogram_quantile(0.99, http_request_duration)  # P99 Latency`,
    points: ["4 Golden Signals (L/T/E/S)", "Prometheus & PromQL", "Grafana Dashboard Design", "Centralized Logging (Loki)", "Alerting & On-Call Strategy"],
    quiz: [
      { q: "4 Golden Signals ក្នុង SRE ជាអ្វី?", a: "Latency, Traffic, Errors, Saturation", options: ["Load, Time, Events, Size", "Latency, Traffic, Errors, Saturation", "Log, Test, Execute, Store", "Linux, Tools, Env, System"] },
      { q: "PromQL rate(http_requests[5m]) ធ្វើអ្វី?", a: "Calculate Requests per second ក្នុង 5 នាទី", options: ["Count total requests", "Calculate Requests per second ក្នុង 5 នាទី", "Show latest request", "Reset counter"] },
      { q: "Loki ខុសពី Elasticsearch យ៉ាងណា?", a: "Loki Index Labels Only (ថោក+លឿន), ES Index All Content", options: ["Loki ធំជាង ES", "Loki Index Labels Only (ថោក+លឿន), ES Index All Content", "ES Open Source, Loki Paid", "Loki SQL-based"] }
    ],
    flashcards: [
      { term: "MTTR", def: "Mean Time To Recovery - ពេលជាមធ្យម Recover ពី Incident - ចង់ LOW" },
      { term: "SLO/SLA", def: "Service Level Objective/Agreement - ការសន្យា Uptime: 99.9% = 8.7h downtime/year" },
      { term: "P99 Latency", def: "99th Percentile - 99% Users ទទួល Response លឿនជាង Threshold នេះ" },
      { term: "Cardinality", def: "ចំនួន Unique Values ក្នុង Label - High Cardinality (user_id) → ចៀសវាង Prometheus" }
    ],
    tips: ["Alert on Symptoms (Latency, Error Rate) មិនមែន Causes (CPU)", "ប្រើ Grafana On-Call ឬ PagerDuty On-Call Rotation", "Log Level: ERROR > WARN > INFO > DEBUG"]
  },
  {
    id: 10,
    title: "GitOps & ArgoCD",
    titleKH: "GitOps ស្វ័យប្រវត្ត",
    icon: "🛠️",
    color: "#ef4444",
    bgGrad: "from-red-500 to-orange-700",
    duration: "2 សប្តាហ៍",
    difficulty: "Expert",
    xp: 320,
    content: `GitOps បង្ហាញ Git Repository ជា Single Source of Truth សម្រាប់ Infrastructure & Application State។ ArgoCD ជា Kubernetes Controller ដែលដំណើរ Watch Git ហើយ Sync ស្វ័យប្រវត្ត - Anti-Configuration Drift ដ៏ល្អ។`,
    code: `# ArgoCD Application Manifest (app.yaml)
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: production-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/kiraa/app-manifests
    targetRevision: HEAD
    path: k8s/production
  destination:
    server: https://kubernetes.default.svc
    namespace: prod
  syncPolicy:
    automated:        # Auto-sync
      prune: true     # Remove deleted resources
      selfHeal: true  # Revert manual changes`,
    points: ["GitOps Principles", "ArgoCD Install & Configure", "Automated Sync & Self-Healing", "App of Apps Pattern", "Rollback via Git Revert"],
    quiz: [
      { q: "GitOps Single Source of Truth ជាអ្វី?", a: "Git Repository", options: ["Database", "Git Repository", "ArgoCD UI", "Kubernetes etcd"] },
      { q: "selfHeal: true ក្នុង ArgoCD ធ្វើអ្វី?", a: "Revert Manual Changes ត្រឡប់ Git State", options: ["Restart Pods", "Revert Manual Changes ត្រឡប់ Git State", "Heal Network", "Fix Memory Leak"] },
      { q: "Rollback ក្នុង GitOps ធ្វើតាមរបៀបណា?", a: "git revert commit → Push → ArgoCD Sync", options: ["kubectl rollout undo", "git revert commit → Push → ArgoCD Sync", "Delete Pod", "Edit YAML ដោយដៃ"] }
    ],
    flashcards: [
      { term: "GitOps", def: "Paradigm: Git = Infrastructure Truth, Changes via PRs, Automated Deployment via Git Events" },
      { term: "ArgoCD", def: "K8s-native CD tool ដែល Sync Manifests ពី Git ទៅ Cluster ស្វ័យប្រវត្ត" },
      { term: "Configuration Drift", def: "ស្ថានភាព Server ខុសពី Desired State (Git) - GitOps ការពារ Drift" },
      { term: "App of Apps", def: "ArgoCD Pattern - 1 Application ហៅ Applications ច្រើន - ងាយ Manage ច្រើន Services" }
    ],
    tips: ["Separate App Code Repo vs Manifest Repo", "ប្រើ ArgoCD Image Updater - Auto update Image Tag", "Sync Waves: ដំណើរ Resources ក្នុង Order (DB first, App second)"]
  },
  {
    id: 11,
    title: "DevSecOps",
    titleKH: "សុវត្ថិភាព DevOps",
    icon: "🔐",
    color: "#6b7280",
    bgGrad: "from-gray-700 to-black",
    duration: "3 សប្តាហ៍",
    difficulty: "Expert",
    xp: 350,
    content: `Security ត្រូវ Embed ក្នុងគ្រប់ Steps CI/CD (Shift Left)។ ស្កែន Code, Dependencies, Container Images មុន Deploy ហើយ Manage Secrets ជាប្រព័ន្ធ ហ៊ានគ្នាពីការ Expose Credentials ក្នុង Git ។`,
    code: `# DevSecOps Pipeline Integration

# 1. SAST - Code Analysis
sonarqube-scanner analyze \
  -Dsonar.projectKey=my-app

# 2. Container Scanning (in CI)
trivy image --exit-code 1 \
  --severity CRITICAL kiraa/app:latest

# 3. Secret Detection
trufflehog git https://github.com/kiraa/repo

# 4. HashiCorp Vault (Secrets Management)
vault kv put secret/db password=SuperSecure
vault kv get -field=password secret/db`,
    points: ["Shift-Left Security", "SAST (SonarQube)", "Container Scanning (Trivy)", "Secrets Vault (HashiCorp)", "Network Policies & Compliance"],
    quiz: [
      { q: "Shift-Left Security ជាអ្វី?", a: "ដាក់ Security ក្នុង Early Stages (Code, Build) ជំនួស Production", options: ["ប្រើ Security ក្រោយ Deploy", "ដាក់ Security ក្នុង Early Stages (Code, Build) ជំនួស Production", "Hire Security Team", "ប្រើ Firewall ប៉ុណ្ណោះ"] },
      { q: "Trivy ប្រើធ្វើអ្វី?", a: "ស្កែន Container Images រកចន្លោះប្រហោង (CVEs)", options: ["Monitor CPU", "ស្កែន Container Images រកចន្លោះប្រហោង (CVEs)", "Manage Secrets", "Test APIs"] },
      { q: "HashiCorp Vault ដោះស្រាយបញ្ហាអ្វី?", a: "Manage & Rotate Secrets/Credentials Securely", options: ["Container Orchestration", "Log Management", "Manage & Rotate Secrets/Credentials Securely", "Network Monitoring"] }
    ],
    flashcards: [
      { term: "SAST", def: "Static Application Security Testing - ស្កែន Source Code រក Vulnerabilities (SQL Injection, XSS)" },
      { term: "DAST", def: "Dynamic Application Security Testing - Test Running App ដូច Attacker (OWASP ZAP)" },
      { term: "CVE", def: "Common Vulnerabilities and Exposures - ID ប្រព័ន្ធកំណត់ Security Bugs (CVE-2024-XXXX)" },
      { term: "Vault Dynamic Secrets", def: "Generate Short-lived Credentials On-demand - DB Password ផ្លាស់ Every Hour" }
    ],
    tips: ["ហាម Hardcode Passwords ក្នុង Code/Dockerfile", "Enable Dependabot ក្នុង GitHub - Auto PR Update Dependencies", "OWASP Top 10 ដឹង = DevSecOps Foundation"]
  }
];

export default function DevOpsRoadmapKH() {
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [tab, setTab] = useState<"learn" | "code" | "quiz" | "flash" | "tips">("learn");
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [quizState, setQuizState] = useState({ idx: 0, selected: null as string | null, score: 0, done: false });
  const [flashIdx, setFlashIdx] = useState(0);
  const [flashFlipped, setFlashFlipped] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState<"All" | Module["difficulty"]>("All");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("devops_completed");
      if (stored) {
        setCompleted(JSON.parse(stored));
      }
    } catch {
      setCompleted({});
    }
  }, []);

  const totalXP = Object.keys(completed).reduce((sum, id) => sum + (MODULES[parseInt(id)]?.xp || 0), 0);
  const maxXP = MODULES.reduce((s, m) => s + m.xp, 0);
  const completedCount = Object.keys(completed).length;

  const saveCompleted = (newCompleted: Record<string, boolean>) => {
    setCompleted(newCompleted);
    try { window.localStorage.setItem("devops_completed", JSON.stringify(newCompleted)); } catch {}
  };

  const markComplete = (id: number) => {
    const updated = { ...completed, [id]: true };
    saveCompleted(updated);
  };

  const openModule = (mod: Module) => {
    setActiveModule(mod);
    setTab("learn");
    setQuizState({ idx: 0, selected: null, score: 0, done: false });
    setFlashIdx(0);
    setFlashFlipped(false);
  };

  const closeModule = () => setActiveModule(null);

  const handleQuizAnswer = (option: string) => {
    if (!activeModule || quizState.selected !== null) return;
    const correct = option === activeModule.quiz[quizState.idx].a;
    setQuizState(prev => ({ ...prev, selected: option, score: correct ? prev.score + 1 : prev.score }));
  };

  const nextQuestion = () => {
    if (!activeModule) return;
    const next = quizState.idx + 1;
    const currentCorrect = quizState.selected === activeModule.quiz[quizState.idx].a ? 1 : 0;
    if (next >= activeModule.quiz.length) {
      setQuizState(prev => ({ ...prev, done: true }));
      if (quizState.score + currentCorrect >= 2) {
        markComplete(activeModule.id);
      }
    } else {
      setQuizState({ idx: next, selected: null, score: quizState.score + currentCorrect, done: false });
    }
  };

  const filteredModules = MODULES.filter(m => {
    const matchSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || m.titleKH.includes(searchQuery);
    const matchDiff = filterDifficulty === "All" || m.difficulty === filterDifficulty;
    return matchSearch && matchDiff;
  });

  const level = totalXP < 500 ? "Newcomer" : totalXP < 1200 ? "Junior DevOps" : totalXP < 2200 ? "Mid DevOps" : "Senior DevOps";

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#fff", fontFamily: "'IBM Plex Mono', 'Courier New', monospace", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&family=Noto+Sans+Khmer:wght@400;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
        .mod-card:hover { transform: translateY(-3px); border-color: rgba(255,255,255,0.2) !important; }
        .mod-card { transition: all 0.2s; cursor: pointer; }
        .tab-btn { border: none; cursor: pointer; transition: all 0.15s; }
        .tab-btn:hover { opacity: 0.9; }
        .flip-card { perspective: 800px; cursor: pointer; }
        .flip-inner { transition: transform 0.5s; transform-style: preserve-3d; position: relative; }
        .flip-inner.flipped { transform: rotateY(180deg); }
        .flip-face { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .flip-back { transform: rotateY(180deg); }
        .progress-bar { transition: width 0.6s ease; }
        .quiz-opt { cursor: pointer; transition: all 0.15s; border: 1px solid #333; }
        .quiz-opt:hover { border-color: #555; background: #1a1a2e; }
        .khmer { font-family: 'Noto Sans Khmer', sans-serif; }
        .glow-cyan { box-shadow: 0 0 20px rgba(6,182,212,0.15); }
        .modal-bg { position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 100; overflow-y: auto; display: flex; align-items: flex-start; justify-content: center; padding: 1rem; }
        .btn-close:hover { background: #333 !important; }
        .tip-item { display: flex; align-items: flex-start; gap: 8px; padding: 8px 12px; background: #111827; border-radius: 8px; border-left: 3px solid #06b6d4; font-size: 13px; }
      `}</style>

      {/* Header */}
      <header style={{ borderBottom: "1px solid #1e1e2e", background: "rgba(10,10,15,0.9)", position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(10px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, background: "linear-gradient(90deg,#06b6d4,#6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              DevOps Roadmap KH
            </div>
            <div style={{ fontSize: 11, color: "#666", marginTop: 2 }} className="khmer">Enterprise Edition • ១២ Modules</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <div style={{ background: "#111827", border: "1px solid #1e293b", borderRadius: 8, padding: "6px 14px", fontSize: 12 }}>
              <span style={{ color: "#06b6d4" }}>⬡ {totalXP} XP</span>
              <span style={{ color: "#555", margin: "0 6px" }}>•</span>
              <span style={{ color: "#a78bfa" }}>{level}</span>
            </div>
            <div style={{ background: "#111827", border: "1px solid #1e293b", borderRadius: 8, padding: "6px 14px", fontSize: 12 }}>
              <span className="khmer" style={{ color: "#10b981" }}>{completedCount}/{MODULES.length} Module</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px 30px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "inline-block", background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)", borderRadius: 20, padding: "4px 14px", fontSize: 12, color: "#06b6d4", marginBottom: 16 }}>
              🚀 Ultimate Systems Engineering Track
            </div>
            <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, lineHeight: 1.1, margin: "0 0 12px" }}>
              Master<br />
              <span style={{ background: "linear-gradient(90deg,#06b6d4,#6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>DevOps</span><br />
              Engineering
            </h1>
            <p className="khmer" style={{ color: "#94a3b8", lineHeight: 1.7, fontSize: 14, maxWidth: 600, marginBottom: 20 }}>
              ពង្រឹងសមត្ថភាពបែប Production-Ready ចាប់ពី Linux, Docker, CI/CD, Kubernetes, Terraform, GitOps, Monitoring រហូតដល់ DevSecOps – ជាមួយ Quizzes, Flashcards, និង Labs ជាភាសាខ្មែរ!
            </p>
            {/* Overall Progress */}
            <div style={{ background: "#111827", border: "1px solid #1e293b", borderRadius: 12, padding: "14px 18px", maxWidth: 500 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 12 }}>
                <span className="khmer" style={{ color: "#94a3b8" }}>ដំណើររបស់អ្នក</span>
                <span style={{ color: "#06b6d4" }}>{Math.round((totalXP / maxXP) * 100)}% ({totalXP}/{maxXP} XP)</span>
              </div>
              <div style={{ background: "#1e293b", borderRadius: 4, height: 8, overflow: "hidden" }}>
                <div className="progress-bar" style={{ height: "100%", width: `${(totalXP / maxXP) * 100}%`, background: "linear-gradient(90deg,#06b6d4,#6366f1)" }} />
              </div>
            </div>
          </div>
          {/* Stats Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, minWidth: 200 }}>
            {[
              { label: "Modules", val: MODULES.length, color: "#06b6d4" },
              { label: "Completed", val: completedCount, color: "#10b981" },
              { label: "Total XP", val: maxXP, color: "#6366f1" },
              { label: "Your XP", val: totalXP, color: "#f97316" }
            ].map((s, i) => (
              <div key={i} style={{ background: "#111827", border: "1px solid #1e293b", borderRadius: 10, padding: "12px 14px", textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px 24px" }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="🔍 ស្វែងរក Module..."
            className="khmer"
            style={{ background: "#111827", border: "1px solid #1e293b", color: "#fff", borderRadius: 8, padding: "8px 14px", fontSize: 13, outline: "none", width: 220 }}
          />
          {DIFFICULTY_OPTIONS.map(d => {
            const active = filterDifficulty === d;
            const color = d === "All" ? "#64748b" : DIFFICULTY_COLOR[d];
            return (
              <button
                key={d}
                onClick={() => setFilterDifficulty(d)}
                style={{
                  background: active ? color : "#111827",
                  border: `1px solid ${active ? color : "#1e293b"}`,
                  color: active ? "#fff" : "#94a3b8",
                  borderRadius: 8, padding: "7px 14px", fontSize: 12, cursor: "pointer"
                }}
              >{d}</button>
            );
          })}
        </div>
      </section>

      {/* Module Grid */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
          {filteredModules.map((mod, idx) => (
            <div
              key={mod.id}
              className="mod-card glow-cyan"
              onClick={() => openModule(mod)}
              style={{
                background: "#0d0d1a",
                border: `1px solid ${completed[mod.id] ? mod.color + "44" : "#1e293b"}`,
                borderRadius: 14,
                overflow: "hidden",
                position: "relative"
              }}
            >
              {completed[mod.id] && (
                <div style={{ position: "absolute", top: 10, right: 10, background: "#10b981", color: "#fff", borderRadius: 20, padding: "2px 8px", fontSize: 10, fontWeight: 700 }}>✓ DONE</div>
              )}
              <div style={{ height: 4, background: `linear-gradient(90deg, ${mod.color}, ${mod.color}88)` }} />
              <div style={{ padding: "18px 18px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ fontSize: 28 }}>{mod.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, color: mod.color, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>MODULE {String(mod.id + 1).padStart(2, "0")}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.2 }}>{mod.title}</div>
                  </div>
                </div>
                <p className="khmer" style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5, marginBottom: 12, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {mod.content}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <span style={{ background: DIFFICULTY_COLOR[mod.difficulty] + "22", color: DIFFICULTY_COLOR[mod.difficulty], border: `1px solid ${DIFFICULTY_COLOR[mod.difficulty]}44`, borderRadius: 5, padding: "2px 7px", fontSize: 10 }}>{mod.difficulty}</span>
                    <span style={{ background: "#1e293b", color: "#64748b", borderRadius: 5, padding: "2px 7px", fontSize: 10 }}>{mod.duration}</span>
                  </div>
                  <span style={{ color: mod.color, fontSize: 12, fontWeight: 700 }}>+{mod.xp} XP</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6-Month Plan */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px 40px" }}>
        <div style={{ background: "#0d0d1a", border: "1px solid #1e293b", borderRadius: 16, padding: "28px" }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>📅 6-Month Hardcore Plan</h2>
          <p className="khmer" style={{ color: "#64748b", fontSize: 13, marginBottom: 20 }}>កាលវិភាគ ២៤ សប្តាហ៍ ចាប់ពី 0 ដល់ Production-Ready DevOps Engineer</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 12 }}>
            {[
              { month: "Month 1", kh: "ខែទី ១", focus: "Linux + Networking + Git", modules: [0,1,2] },
              { month: "Month 2", kh: "ខែទី ២", focus: "Bash Scripting + Python", modules: [3] },
              { month: "Month 3", kh: "ខែទី ៣", focus: "Docker + Microservices", modules: [4] },
              { month: "Month 4", kh: "ខែទី ៤", focus: "CI/CD + GitHub Actions", modules: [5] },
              { month: "Month 5", kh: "ខែទី ៥", focus: "AWS Cloud + Kubernetes + ArgoCD", modules: [6,7,10] },
              { month: "Month 6", kh: "ខែទី ៦", focus: "Terraform + Monitoring + DevSecOps", modules: [8,9,11] }
            ].map((p, i) => (
              <div key={i} style={{ background: "#111827", border: "1px solid #1e293b", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ color: "#06b6d4", fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>{p.month}</div>
                <div className="khmer" style={{ fontSize: 11, color: "#475569", marginBottom: 6 }}>{p.kh}</div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{p.focus}</div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {p.modules.map(mid => (
                    <span
                      key={mid}
                      onClick={() => openModule(MODULES[mid])}
                      style={{ background: MODULES[mid].color + "22", color: MODULES[mid].color, borderRadius: 5, padding: "2px 7px", fontSize: 10, cursor: "pointer", border: `1px solid ${MODULES[mid].color}33` }}
                    >{MODULES[mid].icon} M{mid + 1}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capstone Section */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px 60px" }}>
        <div style={{ background: "linear-gradient(135deg,rgba(6,182,212,0.08),rgba(99,102,241,0.08))", border: "1px solid rgba(6,182,212,0.2)", borderRadius: 20, padding: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "inline-block", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 20, padding: "4px 14px", fontSize: 11, color: "#a78bfa", marginBottom: 12 }}>🏆 CAPSTONE PROJECT</div>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>End-to-End GitOps Architecture</h2>
              <p className="khmer" style={{ color: "#94a3b8", lineHeight: 1.7, fontSize: 14, maxWidth: 600 }}>
                គម្រោងធំចុងក្រោយ - លើកដំបូងសាងប្រព័ន្ធ Automated Complete Pipeline: Code Push → Tests → Docker Build → ECR → ArgoCD → EKS → Prometheus/Grafana Monitoring → Telegram Alerts
              </p>
            </div>
            <div style={{ fontSize: 64 }}>🚀</div>
          </div>
          <div style={{ marginTop: 20, background: "rgba(0,0,0,0.5)", borderRadius: 12, padding: "16px 20px", overflowX: "auto" }}>
            <pre style={{ fontFamily: "monospace", fontSize: 12, color: "#06b6d4", lineHeight: 1.8, margin: 0 }}>{`[ Push Code ] → [ GitHub Actions CI ] → [ Run Tests + Security Scan ]
       │                                            │
       ▼                                            ▼
[ Build Docker Image ] ────────────────► [ Push to AWS ECR ]
                                                    │
                                                    ▼
[ ArgoCD Detects New Tag ] ──────────► [ Auto-Deploy to EKS Cluster ]
                                                    │
                                                    ▼
[ Prometheus Scrapes Metrics ] ────────► [ Grafana Dashboards ]
                                                    │
                                                    ▼
[ Alert Rules Fired ] ─────────────────► [ Telegram Notification ]`}</pre>
          </div>
        </div>
      </section>

      {/* Module Detail Modal */}
      {activeModule && (
        <div className="modal-bg" onClick={e => e.target === e.currentTarget && closeModule()}>
          <div style={{ background: "#0d0d1a", border: "1px solid #1e293b", borderRadius: 20, width: "100%", maxWidth: 860, overflow: "hidden", margin: "auto" }}>
            {/* Modal Header */}
            <div style={{ borderBottom: "1px solid #1e293b", padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ fontSize: 32 }}>{activeModule.icon}</div>
                <div>
                  <div style={{ fontSize: 10, color: activeModule.color, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>MODULE {String(activeModule.id + 1).padStart(2, "0")} • {activeModule.difficulty} • {activeModule.duration} • +{activeModule.xp} XP</div>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>{activeModule.title}</div>
                  <div className="khmer" style={{ fontSize: 12, color: "#64748b" }}>{activeModule.titleKH}</div>
                </div>
              </div>
              <button className="btn-close" onClick={closeModule} style={{ background: "#1e293b", border: "none", color: "#fff", width: 34, height: 34, borderRadius: 8, cursor: "pointer", fontSize: 16 }}>✕</button>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid #1e293b", background: "#0a0a0f" }}>
              {([
                { id: "learn", label: "📖 Learn" },
                { id: "code", label: "💻 Code" },
                { id: "quiz", label: "🧪 Quiz" },
                { id: "flash", label: "🃏 Flashcards" },
                { id: "tips", label: "💡 Tips" }
              ] as const).map(t => (
                <button
                  key={t.id}
                  className="tab-btn"
                  onClick={() => setTab(t.id)}
                  style={{
                    padding: "12px 18px",
                    background: tab === t.id ? "#0d0d1a" : "transparent",
                    color: tab === t.id ? "#fff" : "#64748b",
                    borderBottom: tab === t.id ? `2px solid ${activeModule.color}` : "2px solid transparent",
                    fontSize: 13,
                    fontFamily: "inherit"
                  }}
                >{t.label}</button>
              ))}
            </div>

            <div style={{ padding: 24, maxHeight: "75vh", overflowY: "auto" }}>

              {/* LEARN TAB */}
              {tab === "learn" && (
                <div>
                  <p className="khmer" style={{ color: "#cbd5e1", lineHeight: 1.8, fontSize: 14, marginBottom: 24, background: "#111827", borderRadius: 10, padding: "16px 20px", borderLeft: `4px solid ${activeModule.color}` }}>
                    {activeModule.content}
                  </p>
                  <h3 style={{ fontSize: 14, color: activeModule.color, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>Core Skills ដែលត្រូវចេះ</h3>
                  <div style={{ display: "grid", gap: 8 }}>
                    {activeModule.points.map((pt, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "#111827", borderRadius: 8, padding: "10px 14px", border: "1px solid #1e293b" }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: activeModule.color, flexShrink: 0 }} />
                        <span style={{ fontSize: 13 }}>{pt}</span>
                      </div>
                    ))}
                  </div>
                  {completed[activeModule.id] && (
                    <div style={{ marginTop: 20, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 10, padding: "12px 16px", color: "#10b981", fontSize: 13, textAlign: "center" }} className="khmer">
                      ✅ អ្នកបានបញ្ចប់ Module នេះ! ({activeModule.xp} XP ទទួលបាន)
                    </div>
                  )}
                </div>
              )}

              {/* CODE TAB */}
              {tab === "code" && (
                <div>
                  <div style={{ background: "#020617", borderRadius: 12, overflow: "hidden", border: "1px solid #1e293b" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: "#0f172a", borderBottom: "1px solid #1e293b" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981" }} />
                        <span style={{ marginLeft: 8, fontSize: 11, color: "#475569" }}>production-lab.sh</span>
                      </div>
                      <span style={{ fontSize: 10, color: "#1e293b" }}>STRICT CODE</span>
                    </div>
                    <pre style={{ padding: "20px", fontSize: 12, color: "#4ade80", lineHeight: 1.7, overflowX: "auto", margin: 0 }}>
                      <code>{activeModule.code}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* QUIZ TAB */}
              {tab === "quiz" && (
                <div>
                  {!quizState.done ? (
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontSize: 12, color: "#64748b" }}>
                        <span className="khmer">សំណួរ {quizState.idx + 1} / {activeModule.quiz.length}</span>
                        <span style={{ color: "#10b981" }}>Score: {quizState.score}</span>
                      </div>
                      <div style={{ background: "#111827", borderRadius: 12, padding: "18px 20px", marginBottom: 16, border: "1px solid #1e293b" }}>
                        <p className="khmer" style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.6, margin: 0 }}>{activeModule.quiz[quizState.idx].q}</p>
                      </div>
                      <div style={{ display: "grid", gap: 8 }}>
                        {activeModule.quiz[quizState.idx].options.map((opt, i) => {
                          const isSelected = quizState.selected === opt;
                          const isCorrect = opt === activeModule.quiz[quizState.idx].a;
                          const showResult = quizState.selected !== null;
                          let bg = "#111827", border = "#1e293b", color = "#fff";
                          if (showResult) {
                            if (isCorrect) { bg = "rgba(16,185,129,0.15)"; border = "#10b981"; color = "#10b981"; }
                            else if (isSelected) { bg = "rgba(239,68,68,0.15)"; border = "#ef4444"; color = "#ef4444"; }
                          }
                          return (
                            <div
                              key={i}
                              className="quiz-opt"
                              onClick={() => handleQuizAnswer(opt)}
                              style={{ background: bg, borderColor: border, color, borderRadius: 10, padding: "12px 16px", fontSize: 13, cursor: showResult ? "default" : "pointer" }}
                            >
                              <span style={{ color: "#475569", marginRight: 8 }}>{"ABCD"[i]}.</span>{opt}
                            </div>
                          );
                        })}
                      </div>
                      {quizState.selected && (
                        <button onClick={nextQuestion} style={{ marginTop: 16, background: activeModule.color, border: "none", color: "#fff", borderRadius: 10, padding: "11px 24px", fontSize: 13, cursor: "pointer", width: "100%", fontFamily: "inherit", fontWeight: 700 }} className="khmer">
                          {quizState.idx + 1 >= activeModule.quiz.length ? "✅ ចប់ Quiz" : "▶ សំណួរបន្ទាប់"}
                        </button>
                      )}
                    </div>
                  ) : (
                    <div style={{ textAlign: "center", padding: "24px 0" }}>
                      <div style={{ fontSize: 56, marginBottom: 12 }}>{quizState.score >= 2 ? "🎉" : "📚"}</div>
                      <div className="khmer" style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
                        {quizState.score >= 2 ? "ល្អណាស់!" : "ព្យាយាមទៀតនៅ!"}
                      </div>
                      <div style={{ color: "#94a3b8", fontSize: 14, marginBottom: 16 }} className="khmer">
                        Score: {quizState.score}/{activeModule.quiz.length} • {quizState.score >= 2 ? `+${activeModule.xp} XP ទទួលបាន!` : "ត្រូវការ ≥ 2/3 ដើម្បីបញ្ចប់"}
                      </div>
                      <button onClick={() => setQuizState({ idx: 0, selected: null, score: 0, done: false })}
                        style={{ background: activeModule.color, border: "none", color: "#fff", borderRadius: 10, padding: "10px 24px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }} className="khmer">
                        🔄 ចាប់ Quiz ម្តងទៀត
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* FLASHCARDS TAB */}
              {tab === "flash" && (
                <div>
                  <div className="khmer" style={{ fontSize: 12, color: "#64748b", marginBottom: 14, textAlign: "center" }}>
                    កាត {flashIdx + 1} / {activeModule.flashcards.length} • ចុចលើកាតដើម្បីបង្រលែង
                  </div>
                  <div className="flip-card" onClick={() => setFlashFlipped(!flashFlipped)} style={{ height: 200, marginBottom: 16 }}>
                    <div className={`flip-inner ${flashFlipped ? "flipped" : ""}`} style={{ width: "100%", height: "100%" }}>
                      <div className="flip-face" style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${activeModule.color}22, #111827)`, border: `1px solid ${activeModule.color}44`, borderRadius: 16, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
                        <div style={{ fontSize: 11, color: activeModule.color, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>TERM</div>
                        <div style={{ fontSize: 22, fontWeight: 700, textAlign: "center" }}>{activeModule.flashcards[flashIdx].term}</div>
                        <div style={{ fontSize: 11, color: "#475569", marginTop: 12 }}>👆 ចុចដើម្បីមើលការពន្យល់</div>
                      </div>
                      <div className="flip-face flip-back" style={{ position: "absolute", inset: 0, background: "#111827", border: "1px solid #1e293b", borderRadius: 16, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
                        <div style={{ fontSize: 11, color: "#10b981", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>DEFINITION</div>
                        <p className="khmer" style={{ fontSize: 14, textAlign: "center", lineHeight: 1.7, color: "#e2e8f0", margin: 0 }}>{activeModule.flashcards[flashIdx].def}</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                    <button onClick={() => { setFlashIdx(Math.max(0, flashIdx - 1)); setFlashFlipped(false); }}
                      disabled={flashIdx === 0}
                      style={{ background: "#111827", border: "1px solid #1e293b", color: flashIdx === 0 ? "#333" : "#fff", borderRadius: 8, padding: "8px 20px", fontSize: 13, cursor: flashIdx === 0 ? "default" : "pointer", fontFamily: "inherit" }}>
                      ◀ មុន
                    </button>
                    <button onClick={() => { setFlashIdx(Math.min(activeModule.flashcards.length - 1, flashIdx + 1)); setFlashFlipped(false); }}
                      disabled={flashIdx === activeModule.flashcards.length - 1}
                      style={{ background: flashIdx === activeModule.flashcards.length - 1 ? "#111827" : activeModule.color, border: "none", color: "#fff", borderRadius: 8, padding: "8px 20px", fontSize: 13, cursor: flashIdx === activeModule.flashcards.length - 1 ? "default" : "pointer", fontFamily: "inherit" }}>
                      បន្ទាប់ ▶
                    </button>
                  </div>
                  <div style={{ display: "flex", gap: 4, justifyContent: "center", marginTop: 12 }}>
                    {activeModule.flashcards.map((_, i) => (
                      <div key={i} onClick={() => { setFlashIdx(i); setFlashFlipped(false); }} style={{ width: 8, height: 8, borderRadius: "50%", background: i === flashIdx ? activeModule.color : "#1e293b", cursor: "pointer" }} />
                    ))}
                  </div>
                </div>
              )}

              {/* TIPS TAB */}
              {tab === "tips" && (
                <div>
                  <h3 className="khmer" style={{ fontSize: 15, marginBottom: 16, color: "#94a3b8" }}>💡 Pro Tips & Best Practices</h3>
                  <div style={{ display: "grid", gap: 10 }}>
                    {activeModule.tips.map((tip, i) => (
                      <div key={i} className="tip-item">
                        <span style={{ color: "#06b6d4", fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                        <span className="khmer" style={{ color: "#cbd5e1", lineHeight: 1.6 }}>{tip}</span>
                      </div>
                    ))}
                  </div>
                  {!completed[activeModule.id] && (
                    <button
                      onClick={() => { markComplete(activeModule.id); }}
                      style={{ marginTop: 24, background: `linear-gradient(90deg,${activeModule.color},#6366f1)`, border: "none", color: "#fff", borderRadius: 10, padding: "13px 24px", fontSize: 14, cursor: "pointer", width: "100%", fontFamily: "inherit", fontWeight: 700 }}
                      className="khmer"
                    >
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
      <footer style={{ borderTop: "1px solid #1e293b", background: "#0a0a0f", padding: "32px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 20, fontWeight: 700, background: "linear-gradient(90deg,#06b6d4,#6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 10 }}>
            Become a Professional DevOps Engineer 🚀
          </div>
          <p className="khmer" style={{ color: "#475569", fontSize: 13, maxWidth: 500, margin: "0 auto 20px" }}>
            ជំនាញ DevOps សន្សំចេញពីការជួប Error រាប់រយដង ការ Debug Logs ហើយការដោះស្រាយបញ្ហាពិតប្រាកដ
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            {["Linux", "Git", "Docker", "K8s", "Terraform", "AWS", "ArgoCD", "Prometheus", "DevSecOps"].map((t, i) => (
              <span key={i} style={{ background: "#111827", border: "1px solid #1e293b", color: "#64748b", borderRadius: 6, padding: "4px 10px", fontSize: 11 }}>{t}</span>
            ))}
          </div>
          <div style={{ marginTop: 20, fontSize: 11, color: "#1e293b" }}>DEVOPS ROADMAP KH • ENTERPRISE EDITION • DESIGNED FOR KHMER DEVELOPERS</div>
        </div>
      </footer>
    </div>
  );
}