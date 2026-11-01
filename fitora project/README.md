# FITORA — Elite Fitness & Nutrition Management System

![Theme](https://img.shields.io/badge/Design-Luxury%20Black%20%26%20Gold-F5B725?style=for-the-badge)
![Tech](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20ES6%20%7C%20Python%20%7C%20SQLite-000000?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-2.0%20Pro-gold?style=for-the-badge)

**Fitora** is a premier web-based fitness and nutrition management platform designed to help individuals reach peak physical performance, maintain balanced dietary adherence, and conquer their health goals. Built with a signature **black obsidian & vibrant gold/yellow class aesthetic**, Fitora brings all essential fitness calculations, macro tracking, hydration tools, workout planning, and personal health vitals together into a unified, lightning-fast dashboard.

---

## ⚡ Key Highlights & Core Features

### 1. 📊 Centralized Command Dashboard
- **Live Health Monitor:** Real-time KPI cards for Daily Calories, Protein Intake, Water Hydration, and Active Workout Burn.
- **Dynamic Macro Distribution Ring:** Real-time SVG donut visualization calculating percentage splits for Protein, Carbohydrates, and Healthy Fats.
- **Interactive Timeline:** Tracks meals, water logs, and completed workouts with exact timestamps and nutritional totals.
- **Smart Adaptive Recommendations:** Algorithmic tips analyzing whether your protein, water, or calorie balance needs immediate adjustment.

### 2. ⚖️ WHO-Calibrated BMI Calculator
- Supports both **Metric (kg / cm)** and **Imperial (lbs / ft-in)** with real-time conversion.
- Computes BMI using standard World Health Organization criteria.
- **Visual Meter Scale:** Smooth pointer slider across Underweight, Normal, Overweight, and Obese categories.
- **Healthy Weight Window:** Computes your target healthy weight boundary and median difference in kilograms.
- One-click **"Save Metrics to Profile"** synchronization.

### 3. 🔥 Calorie & TDEE Expenditure Calculator
- Uses the scientifically validated **Mifflin-St Jeor formula**:
  - **Men:** `BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5`
  - **Women:** `BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161`
- Computes **Total Daily Energy Expenditure (TDEE)** with 5 selectable activity multipliers (Sedentary to Elite Athlete).
- Selectable physique trajectories:
  - *Aggressive Fat Loss* (-500 kcal/day)
  - *Moderate Fat Loss* (-300 kcal/day)
  - *Maintenance* (0 kcal/day)
  - *Lean Muscle Bulk* (+300 kcal/day)
  - *Aggressive Muscle Bulk* (+500 kcal/day)
- Automatically computes recommended gram splits for Protein (2.2g/kg), Healthy Fats (25%), and Carbohydrates.

### 4. 🥗 Comprehensive Nutrition & Macro Tracking
- Dedicated meal slots: **Breakfast**, **Lunch**, **Dinner**, and **Snacks & Recovery**.
- **Searchable Verified Food Library:** Pre-seeded with 19+ staple fitness foods (e.g. Chicken breast, salmon, eggs, whey isolate, Greek yogurt, paneer, tofu, oats, sweet potatoes, avocado, almonds).
- **Custom Meal Logger:** Log any home-cooked dish or recipe with calorie, protein, carb, and fat entries.
- Real-time progress bars vs. daily targets with instant recalculation.

### 5. 🥩 Anabolic Protein Intake Monitor
- High-visibility radial progress gauge displaying consumed grams vs. target grams.
- Evaluates **g / kg bodyweight** against hypertrophy standards (1.6 – 2.2 g/kg).
- Curated high-protein food suggestions with protein density per 100g.
- Quick-log buttons for rapid recovery additions (+25g Whey, +12g Eggs, +17g Greek Yogurt).

### 6. 💧 Cellular Water & Hydration Tracker
- **Animated Water Container:** Responsive liquid fill animation with wave physics showing current hydration percentage.
- One-touch quick addition: **+250ml (Cup)**, **+500ml (Bottle)**, and **+1,000ml (Liter)**.
- Daily milestone markers: Morning activation, Pre-workout prime, Intra-workout replenishment, and Evening balance.
- Fully customizable daily hydration goals (default: 3,000 – 3,200 ml).

### 7. 🏋️‍♂️ Workout Planner & Routine Builder
- **3 Pre-Built Power Routines:**
  - *Push Power* (Chest, Front Delts, Triceps)
  - *Pull Dominance* (Back & Biceps)
  - *Leg Annihilation* (Quads, Hamstrings & Calves)
- **Active Session Checklist:** Interactive checkboxes for completed sets, weight adjustments, and burn calculations.
- **Built-in Workout Stopwatch:** Live timer to track duration.
- **40+ Exercise Encyclopedia:** Filterable by muscle group (Chest, Back, Legs, Shoulders, Arms, Core, Cardio).
- **Custom Exercise Creator:** Add personal variations with custom sets, reps, and estimated calorie burn.

### 8. 👤 Personal Profile & Biometrics Management
- Manage name, age, biological sex, height, current weight, target weight, activity tier, and dietary preferences (Omnivore, Vegetarian, Vegan, Keto).
- Complete data portability:
  - **JSON Data Backup Export**
  - **JSON Data Backup Import**
  - **Reset to Default Demo State**

---

## 🎨 Visual Design & Aesthetics

The interface is styled in a **Classy Black and Gold** luxury theme:
- **Obsidian Dark Surface:** `#070709` and `#0c0d12` with subtle radial lighting.
- **Vibrant Gold Accents:** Electric gold `#F5B725` & `#FFD54F` with warm glowing drop shadows (`rgba(245, 183, 37, 0.28)`).
- **Typography:** `Space Grotesk` for geometric numerals and headers, paired with `Plus Jakarta Sans` for body copy.
- **Glassmorphism:** Translucent frosted overlays, hairline gold borders, and glowing active state indicators.
- **Fully Responsive:** Adapts to widescreen desktops, laptops, tablets, and smartphones with a sliding mobile drawer menu.

---

## 🚀 How to Run FITORA

### Option 1: One-Click Launcher (Windows)
Double-click `start_fitora.bat` in the project folder. It will detect your setup and open FITORA automatically.

### Option 2: Run via Python Server & SQLite Database
If Python 3 is installed on your system:
```bash
python app.py
```
Open your browser to:
```
http://localhost:8000
```
This automatically initializes the SQLite database `fitora.db` with full CRUD REST API endpoints (`/api/state`, `/api/profile`, `/api/meals`, `/api/water`, `/api/workouts`).

### Option 3: Direct Standalone Browser Mode (Zero Installation)
Simply double-click `index.html` or drag it into any web browser (Chrome, Edge, Firefox, Safari).
The app runs completely standalone with **LocalStorage persistence**, full calculations, SVG charts, and JSON data export/import!

---

## 📁 File Structure

```
c:\Users\vijay8848\Downloads\fitora project\
├── index.html          # Main application interface with 8 views & modals
├── css\
│   └── style.css       # Luxury black and gold stylesheet & responsive layouts
├── js\
│   └── app.js          # Core JavaScript application engine & state management
├── app.py              # Python 3 HTTP server with embedded SQLite REST API
├── start_fitora.bat    # Windows double-click automated launch script
└── README.md           # Project documentation & reference
```
