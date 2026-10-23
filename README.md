# 🌉 CampusBridge — Complete Project Platform

> **Discover Colleges · Compare Opportunities · Connect Campuses**  
> A centralized platform for verified college discovery, multi-campus event broadcasting, college-approved student lab & resource access, and inter-college team collaboration.

---

## 🌟 The 3 Main Core Features (As Defined in PPT)

### 1. 🎓 Feature 1: College Discovery & Comparison
- **Comprehensive College Directory**: Verified profiles for regional colleges (MITS Meerut, NIET Greater Noida, GEA Ghaziabad, DTU Delhi, COEP Pune).
- **Multi-Factor Filters**: Filter by City/Region (Meerut, Noida, Delhi, etc.), Degree/Branch (B.Tech CSE, AI/ML, IT, Mechanical, MBA), Max Tuition Fee, and Institute Type.
- **Side-by-Side Comparison**: Compare up to 3 colleges side-by-side across Annual Tuition, Average & Highest Placements, Accreditation, Campus Size, Hostel Costs, and Accepted Entrance Exams.
- **Transparency & Disclosures**: Every college card displays official disclosure source links and "Last Audited" timestamps.

### 2. 🏛️ Feature 2: College Admin & Cross-College Events (Multi-Campus Targeting)
- **College Admin Dashboard**: Authenticated portal for registered college admins (e.g., *Dr. R.K. Sharma* for MITS Meerut, *Prof. Sunita Mehra* for NIET Greater Noida).
- **Update Campus Data**: Admins can update program fees, intake seats, admission deadlines, and hostel charges in real-time.
- **Cross-Campus Event Broadcasting**:
  - College Admin creates an event (e.g., *North India Inter-College Hackathon 2026* with ₹2,50,000 prize pool).
  - **Target College Selection**: Admin selects target partner campuses (e.g., Meerut college broadcasts specifically to Noida & Ghaziabad colleges).
  - Students from invited colleges see an "Invited Campus" badge and can register immediately.
- **Attendee Tracking**: Real-time table of all registered participants, home campuses, and entry tokens.

### 3. 🛡️ Feature 3: Student Access & Participation (Permission System & QR Passes)
- **Restricted Campus Permissions**:
  - Students from partner colleges can request access to specialized high-spec labs (Robotics Arm, Apple Vision Pro workstation, Supercomputing clusters) or digital libraries.
  - College Admin reviews requests and can **Approve** or **Reject** with custom remarks and digital security passes.
- **Cryptographic Single-Use QR Passes**:
  - Upon event registration, students receive a digital QR Pass with a unique ticket token.
- **Duplicate-Resistant Check-in Scanner**:
  - Event organizers at the gate can scan or paste the token.
  - **First Scan**: Authenticates and marks the pass as used with timestamp and organizer credentials.
  - **Duplicate Scan**: Strongly rejects duplicate entry attempts to prevent badge sharing.

---

## 🚀 Additional Integrated Features

- **🤖 AI Admission & College Counselor**: Built-in intelligent AI assistant grounded in college disclosures, answering questions about fees, cutoff comparisons, scholarships, and campus facilities.
- **🤝 Inter-College Team Finder**: Students can post hackathon recruitment requests and form cross-college squads across Meerut, Noida, Ghaziabad, and Delhi.
- **⚡ Fast Role Switcher**: Interactive 1-click persona switcher in the navbar to test both Student view and College Admin view seamlessly during live hackathon demos.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 18 + Vite 5 |
| **Styling & UI** | Tailwind CSS + Custom Glassmorphism |
| **Icons** | Lucide React |
| **QR Code Engine** | QRCodeSVG (`qrcode.react`) |
| **State & Persistence** | Local-First Architecture (`localStorage` cache + Reactive Context) |
| **Confetti & FX** | Canvas Confetti |

---

## 🏃‍♂️ How to Run the Project Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

Open your browser at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```

---

## 🎭 Step-by-Step Hackathon Demo Walkthrough (3-Minute Script)

1. **Start on Home Page**:
   - Show the hero section, the regional search bar, and the 3 Core Feature cards.
2. **Demo Feature 1 (Discovery & Compare)**:
   - Click **Explore Colleges**, filter by "Meerut" or "Greater Noida".
   - Click **Compare** on *MITS Meerut* and *NIET Greater Noida*.
   - Navigate to the **Compare** page to view side-by-side fees (₹1.15L vs ₹1.48L) and placement statistics.
3. **Demo Feature 2 (College Admin & Event Broadcast)**:
   - Click the profile switcher in the top right and select **Dr. R.K. Sharma (MITS Meerut Admin)**.
   - Go to **Admin Portal** → **Broadcast Cross-College Event**.
   - Notice the **Target Campuses** selector where Meerut Admin selects partner colleges in Noida and Ghaziabad.
4. **Demo Feature 3 (Student Pass & Gate Scanner)**:
   - Switch back to **Aarav Sharma (Student)**.
   - Go to **Inter-College Events** → Register for the Hackathon.
   - Click **View Full QR Pass** to see the single-use ticket.
   - Click **Copy Token** or go to **Gate Scanner**.
   - Paste the token: **Scan 1** confirms "CHECK-IN SUCCESSFUL".
   - Click "Validate Check-in" again: **Scan 2** triggers **"REJECTED: Pass Already Used"** duplicate protection!
5. **Show AI Advisor & Team Finder**:
   - Ask AI Counselor: *"Compare Meerut vs Noida fees"* to show immediate answers.
