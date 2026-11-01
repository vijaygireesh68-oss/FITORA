/**
 * FITORA — Elite Fitness & Nutrition Management System
 * Multi-User State Engine & Interactive Logic
 */

// Safe DOM Helper Functions (Guarantees no unhandled DOM exceptions)
function safeText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function safeHtml(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function safeVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val;
}

function safeStyle(id, prop, val) {
  const el = document.getElementById(id);
  if (el) el.style[prop] = val;
}

// Master Food Encyclopedia
const FOOD_DATABASE = [
  { name: 'Chicken Breast (Cooked, Boneless)', category: 'Poultry', serving: '150 g', calories: 247, protein: 46.5, carbs: 0, fats: 5.4 },
  { name: 'Atlantic Salmon Fillet (Baked)', category: 'Fish', serving: '150 g', calories: 312, protein: 39.0, carbs: 0, fats: 16.5 },
  { name: 'Large Whole Egg (Boiled)', category: 'Eggs', serving: '1 Egg (50g)', calories: 78, protein: 6.3, carbs: 0.6, fats: 5.3 },
  { name: 'Egg Whites (Liquid/Cooked)', category: 'Eggs', serving: '100 g', calories: 52, protein: 11.0, carbs: 0.7, fats: 0.2 },
  { name: 'Whey Protein Isolate Powder', category: 'Supplements', serving: '1 Scoop (30g)', calories: 115, protein: 26.0, carbs: 1.5, fats: 0.5 },
  { name: 'Greek Yogurt (Plain, 0% Fat)', category: 'Dairy', serving: '170 g (1 Cup)', calories: 100, protein: 18.0, carbs: 6.0, fats: 0.0 },
  { name: 'Paneer / Indian Cottage Cheese', category: 'Dairy', serving: '100 g', calories: 265, protein: 18.3, carbs: 3.5, fats: 20.8 },
  { name: 'Low Fat Tofu (Firm, Soy)', category: 'Plant', serving: '150 g', calories: 120, protein: 15.0, carbs: 3.0, fats: 6.0 },
  { name: 'Rolled Oats (Dry)', category: 'Grains', serving: '60 g', calories: 228, protein: 8.0, carbs: 40.0, fats: 4.2 },
  { name: 'Brown Rice (Cooked)', category: 'Grains', serving: '150 g', calories: 165, protein: 3.5, carbs: 35.0, fats: 1.2 },
  { name: 'Sweet Potato (Baked with Skin)', category: 'Tubers', serving: '180 g', calories: 160, protein: 3.6, carbs: 37.0, fats: 0.2 },
  { name: 'Peanut Butter (Natural, No Sugar)', category: 'Nuts', serving: '2 Tbsp (32g)', calories: 190, protein: 8.0, carbs: 7.0, fats: 16.0 },
  { name: 'Almonds (Raw)', category: 'Nuts', serving: '30 g (1 Handful)', calories: 170, protein: 6.0, carbs: 6.0, fats: 15.0 },
  { name: 'Banana (Medium)', category: 'Fruits', serving: '1 Fruit (118g)', calories: 105, protein: 1.3, carbs: 27.0, fats: 0.3 },
  { name: 'Avocado (Fresh)', category: 'Fruits', serving: '1/2 Medium (75g)', calories: 120, protein: 1.5, carbs: 6.0, fats: 11.0 },
  { name: 'Broccoli (Steamed)', category: 'Vegetables', serving: '100 g', calories: 35, protein: 2.8, carbs: 7.0, fats: 0.4 },
  { name: 'Lentils / Dal (Cooked)', category: 'Legumes', serving: '150 g', calories: 175, protein: 13.5, carbs: 30.0, fats: 0.6 },
  { name: 'Canned Tuna (in Spring Water)', category: 'Fish', serving: '100 g', calories: 110, protein: 25.0, carbs: 0, fats: 1.0 },
  { name: 'Olive Oil (Extra Virgin)', category: 'Oils', serving: '1 Tbsp (14g)', calories: 119, protein: 0, carbs: 0, fats: 13.5 }
];

// Exercise Directory
const EXERCISE_CATALOG = [
  { name: 'Barbell Flat Bench Press', muscle: 'Chest', setsReps: '4 x 8', defaultWeight: 75, burn: 120, desc: 'Compound chest press targeting sternal head, front delts, and triceps.' },
  { name: 'Incline Dumbbell Press', muscle: 'Chest', setsReps: '3 x 10', defaultWeight: 26, burn: 90, desc: 'Upper pectoralis clavicular fibers focus with full range stretch.' },
  { name: 'Chest Cable Flyes', muscle: 'Chest', setsReps: '3 x 15', defaultWeight: 18, burn: 65, desc: 'Constant tension isolation for maximum inner-chest pump.' },
  { name: 'Push-Ups (Strict Form)', muscle: 'Chest', setsReps: '3 x 20', defaultWeight: 0, burn: 70, desc: 'Bodyweight core and chest stability drill.' },
  { name: 'Deadlift (Conventional Barbell)', muscle: 'Back', setsReps: '4 x 5', defaultWeight: 120, burn: 180, desc: 'Full posterior chain powerhouse: lats, erectores, glutes, hamstrings.' },
  { name: 'Barbell Bent-Over Rows', muscle: 'Back', setsReps: '4 x 8', defaultWeight: 70, burn: 110, desc: 'Upper back thickness, rhomboids, latissimus dorsi contraction.' },
  { name: 'Lat Pulldown (Wide Grip)', muscle: 'Back', setsReps: '4 x 10', defaultWeight: 60, burn: 85, desc: 'V-taper lat width builder with controlled scapular depression.' },
  { name: 'Pull-Ups / Chin-Ups', muscle: 'Back', setsReps: '3 x 10', defaultWeight: 0, burn: 95, desc: 'King of upper-body bodyweight pulling strength.' },
  { name: 'Barbell Back Squats', muscle: 'Legs', setsReps: '4 x 8', defaultWeight: 95, burn: 160, desc: 'Quadriceps, adductors, gluteus maximus primary compound movement.' },
  { name: 'Romanian Deadlift (RDL)', muscle: 'Legs', setsReps: '3 x 10', defaultWeight: 80, burn: 110, desc: 'Deep hamstring stretch and posterior hip hinge mastery.' },
  { name: 'Bulgarian Split Squats', muscle: 'Legs', setsReps: '3 x 12 each', defaultWeight: 18, burn: 115, desc: 'Unilateral quad & glute stabilizer that burns huge energy.' },
  { name: 'Standing Calf Raises', muscle: 'Legs', setsReps: '4 x 20', defaultWeight: 50, burn: 50, desc: 'Gastrocnemius full contraction with 2-second peak pause.' },
  { name: 'Overhead Barbell Military Press', muscle: 'Shoulders', setsReps: '4 x 8', defaultWeight: 45, burn: 100, desc: 'Strict vertical pressing for 3D shoulder deltoid power.' },
  { name: 'Dumbbell Lateral Raises', muscle: 'Shoulders', setsReps: '4 x 15', defaultWeight: 12, burn: 60, desc: 'Side lateral delts width isolation without swinging.' },
  { name: 'Face Pulls (Cable)', muscle: 'Shoulders', setsReps: '4 x 15', defaultWeight: 22, burn: 65, desc: 'Rear delts and rotator cuff postural bulletproofing.' },
  { name: 'Barbell Bicep Curls', muscle: 'Arms', setsReps: '3 x 10', defaultWeight: 32, burn: 65, desc: 'Biceps brachii peak contraction with strict elbow pin.' },
  { name: 'Incline Dumbbell Bicep Curls', muscle: 'Arms', setsReps: '3 x 12', defaultWeight: 14, burn: 60, desc: 'Maximum stretch on long head bicep fibers.' },
  { name: 'Triceps Overhead Extension', muscle: 'Arms', setsReps: '3 x 12', defaultWeight: 24, burn: 65, desc: 'Long head tricep elongation and hypertrophy.' },
  { name: 'Dips (Parallel Bars)', muscle: 'Arms', setsReps: '3 x 12', defaultWeight: 0, burn: 85, desc: 'Compound chest and tricep press.' },
  { name: 'Hanging Leg Raises', muscle: 'Core', setsReps: '3 x 15', defaultWeight: 0, burn: 60, desc: 'Lower rectus abdominis and hip flexor strength.' },
  { name: 'HIIT Treadmill Sprints', muscle: 'Cardio', setsReps: '10 Rounds x 30s', defaultWeight: 0, burn: 220, desc: 'High-intensity interval sprinting for maximum VO2 max and EPOC burn.' },
  { name: 'Rowing Machine Intervals', muscle: 'Cardio', setsReps: '2000 Meters', defaultWeight: 0, burn: 190, desc: 'Full-body cardiovascular stamina builder.' },
  { name: 'Jump Rope High Speed', muscle: 'Cardio', setsReps: '15 Minutes', defaultWeight: 0, burn: 180, desc: 'Footwork, coordination, calf endurance, and fat oxidation.' }
];

const MOTIVATIONAL_QUOTES = [
  "“Consistency is the foundation of peak performance. Let's conquer today's targets!”",
  "“The body achieves what the mind believes. Push beyond your comfort zone.”",
  "“Discipline is choosing between what you want now and what you want most.”",
  "“You don't have to be extreme, just consistent. Every rep and meal counts.”",
  "“Champion physiques are built through relentless execution day in and day out.”",
  "“Fuel your body with intention, train with ferocity, rest with purpose.”"
];

class FitoraApp {
  constructor() {
    this.bmiUnit = 'metric';
    this.bmiGender = 'male';
    this.tdeeSex = 'male';
    this.activeWorkoutFilter = 'all';
    this.regInitialType = 'clean';
    this.timerInterval = null;

    // Load Multi-User Accounts
    this.users = this.loadUsers();
    this.currentUserId = this.loadActiveUserId();

    // Verify current user
    if (!this.currentUserId || !this.getCurrentUser()) {
      if (this.users.length > 0) {
        this.currentUserId = this.users[0].id;
      } else {
        this.currentUserId = null;
      }
    }

    this.init();
  }

  // Multi-User Storage Management
  loadUsers() {
    // Purge any legacy cached data containing 'Alex Mercer'
    try {
      ['fitora_state_v1', 'fitora_multi_users_v1', 'fitora_multi_users_v2', 'fitora_active_user_id'].forEach(key => {
        const item = localStorage.getItem(key);
        if (item && item.includes('Alex')) {
          localStorage.removeItem(key);
        }
      });
    } catch (e) {}

    try {
      const saved = localStorage.getItem('fitora_athletes_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const clean = parsed.filter(u => u && u.profile && !u.profile.name.includes('Alex'));
          if (clean.length > 0) {
            return clean;
          }
        }
      }
    } catch (e) {
      console.warn('Could not load user list from localStorage', e);
    }

    // Default: Return empty so new users immediately create THEIR own profile
    return [];
  }

  loadActiveUserId() {
    try {
      return localStorage.getItem('fitora_active_athlete_id') || null;
    } catch (e) {
      return null;
    }
  }

  saveUsers() {
    try {
      localStorage.setItem('fitora_athletes_v3', JSON.stringify(this.users));
      if (this.currentUserId) {
        localStorage.setItem('fitora_active_athlete_id', this.currentUserId);
      } else {
        localStorage.removeItem('fitora_active_athlete_id');
      }
    } catch (e) {
      console.error('Failed to save users', e);
    }
  }

  getCurrentUser() {
    return this.users.find(u => u.id === this.currentUserId) || null;
  }

  get state() {
    const user = this.getCurrentUser();
    if (user) return user;
    return {
      id: 'default',
      profile: {
        name: 'New Athlete',
        age: 25,
        gender: 'male',
        height: 175,
        currentWeight: 70,
        targetWeight: 75,
        fitnessGoal: 'Muscle Gain',
        activityLevel: 1.55,
        dietPreference: 'High Protein Omnivore',
        calorieGoal: 2500,
        proteinGoal: 155,
        carbsGoal: 260,
        fatsGoal: 65,
        waterGoal: 3000,
        streakDays: 1
      },
      nutrition: { meals: [] },
      water: { drankMl: 0, targetMl: 3000 },
      workouts: { activeRoutine: 'My First Routine', burnedCalories: 0, completed: false, timerSeconds: 0, timerRunning: false, session: [] },
      timeline: []
    };
  }

  // Core App Initialization
  init() {
    this.populateFoodPresetDropdown();
    this.populateFoodDatabaseTable();
    this.renderExerciseCatalog();

    if (!this.currentUserId || !this.getCurrentUser()) {
      if (this.users.length > 0) {
        this.currentUserId = this.users[0].id;
      } else {
        this.openAuthModal('register');
        safeText('headerUserInitials', '+');
        safeText('headerUserName', 'Create Profile');
        safeText('headerUserGoal', 'Get Started');
        safeText('dashGreetingName', 'Athlete');
        return;
      }
    }

    const authScreen = document.getElementById('authScreen');
    if (authScreen) authScreen.classList.add('hidden');

    this.updateHeaderProfile();
    this.renderMealLogs();
    this.renderActiveWorkoutSession();
    this.renderTimeline();
    this.updateDashboardMetrics();
    this.updateWaterDisplay();
    this.updateProteinMonitor();
    this.calculateBMI();
    this.calculateTDEE();
    this.initProfileForm();
    this.setRandomMotivation();
    this.startStopwatchTick();
  }

  // ==========================================================
  // AUTHENTICATION & MULTI-USER MANAGEMENT
  // ==========================================================
  openAuthModal(tab = 'select') {
    const authScreen = document.getElementById('authScreen');
    if (authScreen) {
      authScreen.classList.remove('hidden');
      this.setAuthTab(tab);
      this.renderAuthUsersList();
    }
  }

  closeAuthModal() {
    if (!this.currentUserId && this.users.length > 0) {
      this.currentUserId = this.users[0].id;
    }
    const authScreen = document.getElementById('authScreen');
    if (authScreen) authScreen.classList.add('hidden');
    this.init();
  }

  setAuthTab(tab) {
    const tabSelect = document.getElementById('tabBtnSelectUser');
    const tabCreate = document.getElementById('tabBtnCreateUser');
    const panelSelect = document.getElementById('authPanelSelect');
    const panelRegister = document.getElementById('authPanelRegister');

    if (tab === 'select') {
      if (tabSelect) tabSelect.classList.add('active');
      if (tabCreate) tabCreate.classList.remove('active');
      if (panelSelect) panelSelect.classList.add('active');
      if (panelRegister) panelRegister.classList.remove('active');
      this.renderAuthUsersList();
    } else {
      if (tabSelect) tabSelect.classList.remove('active');
      if (tabCreate) tabCreate.classList.add('active');
      if (panelSelect) panelSelect.classList.remove('active');
      if (panelRegister) panelRegister.classList.add('active');
    }
  }

  setRegInitialData(type) {
    this.regInitialType = type;
    const cleanOpt = document.getElementById('regCleanTrackerOpt');
    const demoOpt = document.getElementById('regDemoTrackerOpt');
    if (cleanOpt) cleanOpt.classList.toggle('active', type === 'clean');
    if (demoOpt) demoOpt.classList.toggle('active', type === 'demo');
  }

  renderAuthUsersList() {
    const listEl = document.getElementById('authUsersList');
    if (!listEl) return;
    listEl.innerHTML = '';

    if (this.users.length === 0) {
      listEl.innerHTML = `
        <div class="text-center py-4 text-dim">
          <p style="font-size:1.05rem; color:#fff; font-weight:700;">No athlete accounts found yet.</p>
          <p class="text-sm mt-1 text-dim">Create your profile to start tracking your own fitness & nutrition!</p>
          <button class="btn btn-gold btn-sm mt-3" onclick="app.setAuthTab('register')">+ Create Your Profile</button>
        </div>
      `;
      return;
    }

    this.users.forEach(user => {
      const isCurrent = user.id === this.currentUserId;
      const initials = (user.profile.name || 'Athlete').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      const div = document.createElement('div');
      div.className = `user-account-item ${isCurrent ? 'active' : ''}`;
      div.innerHTML = `
        <div class="user-account-info" onclick="app.switchUser('${user.id}')">
          <div class="user-avatar-sm">${initials}</div>
          <div>
            <div class="user-account-name">${user.profile.name} ${isCurrent ? '<span class="badge-tag gold-border text-xs" style="margin-left:6px;">Active</span>' : ''}</div>
            <div class="user-account-sub">${user.profile.fitnessGoal} • ${user.profile.currentWeight}kg • Target: ${user.profile.calorieGoal} kcal</div>
          </div>
        </div>
        <div style="display:flex; gap:0.5rem; align-items:center;">
          <button class="btn btn-outline-sm" onclick="app.switchUser('${user.id}')">Select</button>
          ${this.users.length > 1 ? `<button class="meal-delete-btn" onclick="app.deleteUserAccount('${user.id}')" title="Delete Athlete Account">&times;</button>` : ''}
        </div>
      `;
      listEl.appendChild(div);
    });
  }

  registerNewUser() {
    const name = document.getElementById('regName').value.trim();
    const age = parseInt(document.getElementById('regAge').value, 10) || 25;
    const gender = document.getElementById('regGender').value || 'male';
    const height = parseFloat(document.getElementById('regHeight').value) || 175;
    const currentWeight = parseFloat(document.getElementById('regWeight').value) || 70;
    const targetWeight = parseFloat(document.getElementById('regTargetWeight').value) || 75;
    const fitnessGoal = document.getElementById('regGoal').value || 'Muscle Gain';
    const activityLevel = parseFloat(document.getElementById('regActivity').value) || 1.55;
    const dietPreference = document.getElementById('regDiet').value || 'High Protein Omnivore';

    if (!name) {
      this.toast('Please enter a valid athlete name', '⚠️');
      return;
    }

    // Calculate baseline TDEE for new athlete
    const s = gender === 'male' ? 5 : -161;
    const bmr = Math.round((10 * currentWeight) + (6.25 * height) - (5 * age) + s);
    const tdee = Math.round(bmr * activityLevel);
    
    let goalAdj = 0;
    if (fitnessGoal === 'Muscle Gain') goalAdj = +300;
    else if (fitnessGoal === 'Weight Loss') goalAdj = -400;

    const calorieGoal = tdee + goalAdj;
    const proteinGoal = Math.round(currentWeight * 2.2);
    const fatsCal = Math.round(calorieGoal * 0.25);
    const fatsGoal = Math.round(fatsCal / 9);
    const carbsCal = calorieGoal - (proteinGoal * 4) - fatsCal;
    const carbsGoal = Math.max(50, Math.round(carbsCal / 4));
    const waterGoal = Math.round(currentWeight * 40); // 40ml per kg

    const newUserId = 'athlete_' + Date.now();

    // Clean tracking vs Demo sample data
    let initialMeals = [];
    let initialDrankWater = 0;
    let initialWorkouts = {
      activeRoutine: 'My First Routine',
      burnedCalories: 0,
      completed: false,
      timerSeconds: 0,
      timerRunning: false,
      session: []
    };
    let initialTimeline = [{
      id: Date.now(),
      type: 'account',
      icon: '🏆',
      title: 'Profile Created',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      stat: 'Ready',
      label: 'Welcome to Fitora'
    }];

    if (this.regInitialType === 'demo') {
      initialMeals = [
        { id: 1, meal: 'Breakfast', name: 'Oatmeal & Boiled Eggs', calories: 420, protein: 28, carbs: 45, fats: 10 },
        { id: 2, meal: 'Lunch', name: 'Grilled Chicken & Rice', calories: 520, protein: 45, carbs: 55, fats: 8 }
      ];
      initialDrankWater = 1500;
      initialWorkouts.burnedCalories = 300;
      initialWorkouts.session = [
        { id: 101, name: 'Barbell Flat Bench Press', muscle: 'Chest', setsReps: '4 x 8', weight: 70, burn: 120, done: true },
        { id: 102, name: 'Incline Dumbbell Press', muscle: 'Chest', setsReps: '3 x 10', weight: 24, burn: 90, done: true }
      ];
    }

    const newUser = {
      id: newUserId,
      profile: {
        name,
        age,
        gender,
        height,
        currentWeight,
        targetWeight,
        fitnessGoal,
        activityLevel,
        dietPreference,
        calorieGoal,
        proteinGoal,
        carbsGoal,
        fatsGoal,
        waterGoal,
        streakDays: 1
      },
      nutrition: { meals: initialMeals },
      water: { drankMl: initialDrankWater, targetMl: waterGoal },
      workouts: initialWorkouts,
      timeline: initialTimeline
    };

    this.users.push(newUser);
    this.currentUserId = newUserId;
    this.saveUsers();

    // Close Auth modal & initialize dashboard
    const authScreen = document.getElementById('authScreen');
    if (authScreen) authScreen.classList.add('hidden');

    this.init();
    this.navigate('dashboard');
    this.toast(`Welcome to FITORA, ${name}! Your new tracker is ready.`, '🏆');
  }

  switchUser(userId) {
    if (this.users.some(u => u.id === userId)) {
      this.currentUserId = userId;
      this.saveUsers();
      
      const authScreen = document.getElementById('authScreen');
      if (authScreen) authScreen.classList.add('hidden');

      this.init();
      this.toast(`Switched profile to ${this.state.profile.name}!`, '👥');
    }
  }

  logout() {
    this.currentUserId = null;
    this.saveUsers();
    this.openAuthModal('select');
    this.toast('You have been logged out.', '🚪');
  }

  deleteUserAccount(userId) {
    if (this.users.length <= 1) {
      this.toast('Cannot delete the last remaining account.', '⚠️');
      return;
    }

    if (confirm('Are you sure you want to delete this athlete account and all its logs?')) {
      this.users = this.users.filter(u => u.id !== userId);
      if (this.currentUserId === userId) {
        this.currentUserId = this.users[0].id;
      }
      this.saveUsers();
      this.renderAuthUsersList();
      this.init();
      this.toast('Account removed.', '🗑️');
    }
  }

  // ==========================================================
  // NAVIGATION & UI
  // ==========================================================
  navigate(tabId) {
    document.querySelectorAll('.view-panel').forEach(panel => panel.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

    const targetPanel = document.getElementById(`view-${tabId}`);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }

    const targetNav = document.querySelector(`.nav-btn[data-tab="${tabId}"]`);
    if (targetNav) {
      targetNav.classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navigateMobile(tabId) {
    this.navigate(tabId);
    this.toggleMobileMenu(false);
  }

  toggleMobileMenu(forceState) {
    const drawer = document.getElementById('mobileDrawer');
    if (!drawer) return;
    if (forceState !== undefined) {
      drawer.classList.toggle('open', forceState);
    } else {
      drawer.classList.toggle('open');
    }
  }

  toast(message, icon = '⚡') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  openModal(modalId, contextParam = null) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('open');
      if (modalId === 'addFoodModal' && contextParam) {
        safeVal('foodMealSlot', contextParam);
      }
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('open');
  }

  setRandomMotivation() {
    const idx = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
    safeText('dashMotivation', MOTIVATIONAL_QUOTES[idx]);
  }

  // ==========================================================
  // HEADER & PROFILE FORM LOGIC
  // ==========================================================
  updateHeaderProfile() {
    const prof = this.state.profile;
    const initials = (prof.name || 'Athlete').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'FA';

    safeText('headerUserInitials', initials);
    safeText('headerUserName', prof.name);
    safeText('headerUserGoal', prof.fitnessGoal);

    safeText('dashGreetingName', (prof.name || 'Athlete').split(' ')[0]);
    safeHtml('dashTagGoal', `Goal: ${prof.fitnessGoal}`);
    safeHtml('dashTagCalories', `Target: ${(prof.calorieGoal || 2450).toLocaleString()} kcal`);
    safeHtml('dashTagStreak', `${prof.streakDays || 1} Day Streak`);

    safeText('profLargeInitials', initials);
    safeText('profBadgeName', prof.name);
    safeText('profBadgeGoal', prof.fitnessGoal);
    safeText('profBadgeHeight', `${prof.height} cm`);
    safeText('profBadgeWeight', `${(prof.currentWeight || 70).toFixed(1)} kg`);
    safeText('profBadgeCalGoal', `${(prof.calorieGoal || 2450).toLocaleString()} kcal`);

    safeText('dashCurrentWeight', `${(prof.currentWeight || 70).toFixed(1)} kg`);
    safeText('dashTargetWeight', `${(prof.targetWeight || 75).toFixed(1)} kg`);
  }

  initProfileForm() {
    const prof = this.state.profile;
    safeVal('profName', prof.name);
    safeVal('profAge', prof.age);
    safeVal('profGender', prof.gender);
    safeVal('profHeight', prof.height);
    safeVal('profCurrentWeight', prof.currentWeight);
    safeVal('profTargetWeight', prof.targetWeight);
    safeVal('profFitnessGoal', prof.fitnessGoal);
    safeVal('profActivityLevel', prof.activityLevel);
    safeVal('profDietPref', prof.dietPreference);

    safeVal('waterGoalInput', this.state.water.targetMl);

    // Sync input fields on BMI & TDEE calculators
    safeVal('bmiHeight', prof.height);
    safeVal('bmiWeight', prof.currentWeight);
    safeVal('bmiAge', prof.age);
    safeVal('tdeeHeight', prof.height);
    safeVal('tdeeWeight', prof.currentWeight);
    safeVal('tdeeAge', prof.age);
    safeVal('tdeeActivity', prof.activityLevel);

    this.setBmiGender(prof.gender);
    this.setTdeeSex(prof.gender);
  }

  saveProfile() {
    const name = (document.getElementById('profName') ? document.getElementById('profName').value.trim() : '');
    const age = parseInt(document.getElementById('profAge') ? document.getElementById('profAge').value : 25, 10);
    const gender = document.getElementById('profGender') ? document.getElementById('profGender').value : 'male';
    const height = parseFloat(document.getElementById('profHeight') ? document.getElementById('profHeight').value : 175);
    const currentWeight = parseFloat(document.getElementById('profCurrentWeight') ? document.getElementById('profCurrentWeight').value : 70);
    const targetWeight = parseFloat(document.getElementById('profTargetWeight') ? document.getElementById('profTargetWeight').value : 75);
    const fitnessGoal = document.getElementById('profFitnessGoal') ? document.getElementById('profFitnessGoal').value : 'Muscle Gain';
    const activityLevel = parseFloat(document.getElementById('profActivityLevel') ? document.getElementById('profActivityLevel').value : 1.55);
    const dietPreference = document.getElementById('profDietPref') ? document.getElementById('profDietPref').value : 'High Protein Omnivore';

    if (!name || isNaN(age) || isNaN(height) || isNaN(currentWeight)) {
      this.toast('Please check all input fields', '⚠️');
      return;
    }

    this.state.profile = {
      ...this.state.profile,
      name, age, gender, height, currentWeight, targetWeight,
      fitnessGoal, activityLevel, dietPreference
    };

    this.calculateTDEE();
    this.applyTdeeToProfile(false);
    this.calculateBMI();
    this.updateHeaderProfile();
    this.updateDashboardMetrics();
    this.saveUsers();

    this.toast('Profile vitals successfully updated & targets recalibrated!', '✅');
  }

  // ==========================================================
  // BMI CALCULATOR LOGIC
  // ==========================================================
  setBmiUnits(unit) {
    this.bmiUnit = unit;
    const btnMetric = document.getElementById('bmiUnitMetric');
    const btnImp = document.getElementById('bmiUnitImperial');
    if (btnMetric) btnMetric.classList.toggle('active', unit === 'metric');
    if (btnImp) btnImp.classList.toggle('active', unit === 'imperial');

    safeStyle('bmiMetricInputs', 'display', unit === 'metric' ? 'block' : 'none');
    safeStyle('bmiImperialInputs', 'display', unit === 'imperial' ? 'block' : 'none');
    this.calculateBMI();
  }

  setBmiGender(gender) {
    this.bmiGender = gender;
    const gMale = document.getElementById('bmiGenderMale');
    const gFemale = document.getElementById('bmiGenderFemale');
    if (gMale) gMale.classList.toggle('active', gender === 'male');
    if (gFemale) gFemale.classList.toggle('active', gender === 'female');
    this.calculateBMI();
  }

  calculateBMI() {
    let weightKg = 0;
    let heightCm = 0;

    if (this.bmiUnit === 'metric') {
      const elH = document.getElementById('bmiHeight');
      const elW = document.getElementById('bmiWeight');
      heightCm = elH ? parseFloat(elH.value) || 175 : 175;
      weightKg = elW ? parseFloat(elW.value) || 70 : 70;
    } else {
      const feet = parseFloat(document.getElementById('bmiHeightFeet')?.value) || 5;
      const inches = parseFloat(document.getElementById('bmiHeightInches')?.value) || 9;
      const lbs = parseFloat(document.getElementById('bmiWeightLbs')?.value) || 155;
      heightCm = ((feet * 12) + inches) * 2.54;
      weightKg = lbs * 0.453592;
    }

    if (heightCm <= 0 || weightKg <= 0) return;

    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    const roundedBmi = parseFloat(bmi.toFixed(1));

    safeText('bmiScoreText', roundedBmi);
    safeText('pointerLabel', roundedBmi);
    safeText('dashBmiScore', roundedBmi);
    safeText('profBadgeBmi', roundedBmi);

    const minIdealKg = 18.5 * (heightM * heightM);
    const maxIdealKg = 24.9 * (heightM * heightM);
    const medianIdealKg = 21.7 * (heightM * heightM);
    const diffToMedian = weightKg - medianIdealKg;

    safeText('bmiIdealWeight', `${minIdealKg.toFixed(1)} – ${maxIdealKg.toFixed(1)} kg`);
    const diffSign = diffToMedian >= 0 ? `+${diffToMedian.toFixed(1)}` : `${diffToMedian.toFixed(1)}`;
    safeText('bmiWeightDiff', `${diffSign} kg to Median`);

    let catTitle = '';
    let catDesc = '';
    let catBadge = '';
    let meterPercent = 50;
    let primeCat = 'Athletic Balance';

    ['tableRowUnder', 'tableRowNormal', 'tableRowOver', 'tableRowObese'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('row-highlight-gold');
    });

    if (roundedBmi < 18.5) {
      catTitle = 'Underweight';
      catDesc = 'Your BMI indicates you are below the recommended healthy weight range. Focus on nutrient-dense meals, wholesome protein, and resistance hypertrophy.';
      catBadge = 'Underweight';
      primeCat = 'Lean Surplus Needed';
      meterPercent = Math.max(5, (roundedBmi / 18.5) * 18.5);
      const row = document.getElementById('tableRowUnder');
      if (row) row.classList.add('row-highlight-gold');
      const bEl = document.getElementById('dashBmiCategory');
      if (bEl) bEl.className = 'mini-val text-cyan';
    } else if (roundedBmi <= 24.9) {
      catTitle = 'Normal & Healthy Weight';
      catDesc = 'Your body mass index is in the optimal range. Maintaining this balance reduces cardiovascular risk and supports athletic stamina and longevity.';
      catBadge = 'Optimal Weight';
      primeCat = 'Prime Athlete / Maintain';
      meterPercent = 18.5 + ((roundedBmi - 18.5) / (24.9 - 18.5)) * 28;
      const row = document.getElementById('tableRowNormal');
      if (row) row.classList.add('row-highlight-gold');
      const bEl = document.getElementById('dashBmiCategory');
      if (bEl) bEl.className = 'mini-val text-green';
    } else if (roundedBmi <= 29.9) {
      catTitle = 'Overweight';
      catDesc = 'Your BMI indicates elevated body mass. Implementing a moderate caloric deficit (-300 to -500 kcal) with daily cardio and progressive strength training is recommended.';
      catBadge = 'Overweight';
      primeCat = 'Fat Loss & Conditioning';
      meterPercent = 46.5 + ((roundedBmi - 25.0) / (29.9 - 25.0)) * 25;
      const row = document.getElementById('tableRowOver');
      if (row) row.classList.add('row-highlight-gold');
      const bEl = document.getElementById('dashBmiCategory');
      if (bEl) bEl.className = 'mini-val text-amber';
    } else {
      catTitle = 'Obese Classification';
      catDesc = 'Your BMI is significantly elevated, carrying higher risk for cardiovascular issues and joint fatigue. A structured nutrition plan and sustainable daily movement are advised.';
      catBadge = 'High Risk';
      primeCat = 'Structured Lifestyle Protocol';
      meterPercent = Math.min(95, 71.5 + ((roundedBmi - 30.0) / 10) * 25);
      const row = document.getElementById('tableRowObese');
      if (row) row.classList.add('row-highlight-gold');
      const bEl = document.getElementById('dashBmiCategory');
      if (bEl) bEl.className = 'mini-val text-red';
    }

    safeText('bmiCategoryTitle', catTitle);
    safeText('bmiCategoryDesc', catDesc);
    safeText('bmiStatusBadge', catBadge);
    safeText('dashBmiCategory', catTitle);
    safeText('bmiPrimeCategory', primeCat);
    safeStyle('bmiMeterPointer', 'left', `${meterPercent}%`);
  }

  applyBmiToProfile() {
    let weightKg = parseFloat(document.getElementById('bmiWeight')?.value) || 70;
    let heightCm = parseFloat(document.getElementById('bmiHeight')?.value) || 175;

    if (this.bmiUnit === 'imperial') {
      const feet = parseFloat(document.getElementById('bmiHeightFeet')?.value) || 5;
      const inches = parseFloat(document.getElementById('bmiHeightInches')?.value) || 9;
      const lbs = parseFloat(document.getElementById('bmiWeightLbs')?.value) || 155;
      heightCm = ((feet * 12) + inches) * 2.54;
      weightKg = lbs * 0.453592;
    }

    this.state.profile.height = Math.round(heightCm);
    this.state.profile.currentWeight = parseFloat(weightKg.toFixed(1));
    this.initProfileForm();
    this.updateHeaderProfile();
    this.saveUsers();
    this.toast('Biometrics synced with active athlete profile!', '✅');
  }

  // ==========================================================
  // CALORIE & TDEE LOGIC (Mifflin-St Jeor)
  // ==========================================================
  setTdeeSex(sex) {
    this.tdeeSex = sex;
    const sMale = document.getElementById('tdeeSexMale');
    const sFemale = document.getElementById('tdeeSexFemale');
    if (sMale) sMale.classList.toggle('active', sex === 'male');
    if (sFemale) sFemale.classList.toggle('active', sex === 'female');
    this.calculateTDEE();
  }

  calculateTDEE() {
    const age = parseInt(document.getElementById('tdeeAge')?.value, 10) || 25;
    const height = parseFloat(document.getElementById('tdeeHeight')?.value) || 175;
    const weight = parseFloat(document.getElementById('tdeeWeight')?.value) || 70;
    const activity = parseFloat(document.getElementById('tdeeActivity')?.value) || 1.55;
    const goal = document.getElementById('tdeeGoal')?.value || 'lean_bulk';

    const s = this.tdeeSex === 'male' ? 5 : -161;
    const bmr = Math.round((10 * weight) + (6.25 * height) - (5 * age) + s);
    const tdee = Math.round(bmr * activity);

    let goalAdj = 0;
    let goalLabel = 'Maintenance';
    let goalDesc = 'Calorie balance preserves existing muscle mass and weight.';

    switch (goal) {
      case 'aggressive_cut':
        goalAdj = -500;
        goalLabel = 'Aggressive Fat Loss';
        goalDesc = '500 kcal deficit targets ~0.5kg (1 lb) pure fat reduction per week.';
        break;
      case 'mild_cut':
        goalAdj = -300;
        goalLabel = 'Moderate Fat Loss';
        goalDesc = '300 kcal deficit preserves maximum lean muscle tissue while burning body fat.';
        break;
      case 'maintain':
        goalAdj = 0;
        goalLabel = 'Maintenance';
        goalDesc = 'Weight balance and athletic performance stabilization.';
        break;
      case 'lean_bulk':
        goalAdj = +300;
        goalLabel = 'Lean Muscle Bulk';
        goalDesc = '+300 kcal surplus fuels muscle protein synthesis with minimal fat accumulation.';
        break;
      case 'heavy_bulk':
        goalAdj = +500;
        goalLabel = 'Aggressive Muscle Bulk';
        goalDesc = '+500 kcal surplus accelerates weight and power gains for hardgainers.';
        break;
    }

    const targetCal = tdee + goalAdj;
    const proteinG = Math.round(weight * 2.2);
    const proteinCal = proteinG * 4;
    const fatsCal = Math.round(targetCal * 0.25);
    const fatsG = Math.round(fatsCal / 9);
    const carbsCal = targetCal - proteinCal - fatsCal;
    const carbsG = Math.max(50, Math.round(carbsCal / 4));

    safeText('tdeeBmrVal', bmr.toLocaleString());
    safeText('tdeeTdeeVal', tdee.toLocaleString());
    safeText('tdeeTargetVal', targetCal.toLocaleString());
    safeText('tdeeGoalBadge', goalLabel);
    safeText('tdeeTargetDesc', goalDesc);

    safeText('tdeeMacroProteinG', `${proteinG}g`);
    safeText('tdeeMacroProteinSub', `${proteinCal} kcal (${Math.round((proteinCal/targetCal)*100)}%)`);

    safeText('tdeeMacroCarbsG', `${carbsG}g`);
    safeText('tdeeMacroCarbsSub', `${carbsCal} kcal (${Math.round((carbsCal/targetCal)*100)}%)`);

    safeText('tdeeMacroFatsG', `${fatsG}g`);
    safeText('tdeeMacroFatsSub', `${fatsCal} kcal (${Math.round((fatsCal/targetCal)*100)}%)`);

    return { bmr, tdee, targetCal, proteinG, carbsG, fatsG };
  }

  applyTdeeToProfile(showToast = true) {
    const res = this.calculateTDEE();
    this.state.profile.calorieGoal = res.targetCal;
    this.state.profile.proteinGoal = res.proteinG;
    this.state.profile.carbsGoal = res.carbsG;
    this.state.profile.fatsGoal = res.fatsG;

    this.updateHeaderProfile();
    this.updateDashboardMetrics();
    this.updateProteinMonitor();
    this.saveUsers();

    if (showToast) {
      this.toast(`Applied ${res.targetCal} kcal & ${res.proteinG}g protein target to your plan!`, '🎯');
    }
  }

  // ==========================================================
  // NUTRITION TRACKING LOGIC
  // ==========================================================
  populateFoodPresetDropdown() {
    const select = document.getElementById('foodPresetSelect');
    if (!select) return;
    select.innerHTML = '<option value="">-- Choose verified whole food item --</option>';

    FOOD_DATABASE.forEach((item, idx) => {
      const opt = document.createElement('option');
      opt.value = idx;
      opt.textContent = `${item.name} (${item.serving}) — ${item.protein}g Protein, ${item.calories} kcal`;
      select.appendChild(opt);
    });
  }

  fillFoodFromPreset() {
    const el = document.getElementById('foodPresetSelect');
    if (!el || el.value === '') return;
    const food = FOOD_DATABASE[parseInt(el.value, 10)];
    if (!food) return;

    safeVal('foodNameInput', `${food.name} (${food.serving})`);
    safeVal('foodCaloriesInput', food.calories);
    safeVal('foodProteinInput', food.protein);
    safeVal('foodCarbsInput', food.carbs);
    safeVal('foodFatsInput', food.fats);
  }

  populateFoodDatabaseTable() {
    const tbody = document.getElementById('foodLibraryTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    FOOD_DATABASE.forEach((food) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong class="text-white">${food.name}</strong></td>
        <td><span class="badge-tag">${food.category}</span></td>
        <td>${food.serving}</td>
        <td><span class="gold-text font-bold">${food.calories}</span> kcal</td>
        <td><strong class="text-gold">${food.protein}g</strong></td>
        <td>${food.carbs}g</td>
        <td>${food.fats}g</td>
        <td>
          <button class="btn-micro" onclick="app.quickAddFoodFromTable('${food.name.replace(/'/g, "\\'")}', ${food.calories}, ${food.protein}, ${food.carbs}, ${food.fats})">
            + Log Food
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  filterFoodLibrary() {
    const input = document.getElementById('foodSearchInput');
    const query = input ? input.value.toLowerCase() : '';
    const rows = document.querySelectorAll('#foodLibraryTableBody tr');
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(query) ? '' : 'none';
    });
  }

  quickAddFoodFromTable(name, cal, protein, carbs, fats) {
    this.addFoodItem('Lunch', name, cal, protein, carbs, fats);
  }

  saveCustomFoodEntry() {
    const meal = document.getElementById('foodMealSlot')?.value || 'Breakfast';
    const name = document.getElementById('foodNameInput')?.value.trim() || '';
    const calories = parseFloat(document.getElementById('foodCaloriesInput')?.value) || 0;
    const protein = parseFloat(document.getElementById('foodProteinInput')?.value) || 0;
    const carbs = parseFloat(document.getElementById('foodCarbsInput')?.value) || 0;
    const fats = parseFloat(document.getElementById('foodFatsInput')?.value) || 0;

    if (!name) {
      this.toast('Please provide a food name', '⚠️');
      return;
    }

    this.addFoodItem(meal, name, calories, protein, carbs, fats);
    this.closeModal('addFoodModal');

    const form = document.getElementById('addFoodForm');
    if (form) form.reset();
  }

  addFoodItem(meal, name, calories, protein, carbs, fats) {
    const newItem = {
      id: Date.now(),
      meal,
      name,
      calories: Math.round(calories),
      protein: parseFloat(protein.toFixed(1)),
      carbs: parseFloat(carbs.toFixed(1)),
      fats: parseFloat(fats.toFixed(1))
    };

    if (!this.state.nutrition.meals) this.state.nutrition.meals = [];
    this.state.nutrition.meals.push(newItem);

    this.addTimelineEntry({
      type: 'food',
      icon: meal === 'Breakfast' ? '🌅' : meal === 'Lunch' ? '☀️' : meal === 'Dinner' ? '🌙' : '⚡',
      title: `${meal} Entry Logged`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      stat: `${newItem.calories} kcal`,
      label: `${newItem.name} (+${newItem.protein}g P)`
    });

    this.renderMealLogs();
    this.updateDashboardMetrics();
    this.updateProteinMonitor();
    this.saveUsers();

    this.toast(`Logged ${name} (${newItem.calories} kcal) to ${meal}!`, '🥗');
  }

  deleteMealItem(id) {
    this.state.nutrition.meals = this.state.nutrition.meals.filter(m => m.id !== id);
    this.renderMealLogs();
    this.updateDashboardMetrics();
    this.updateProteinMonitor();
    this.saveUsers();
    this.toast('Meal item removed', '🗑️');
  }

  renderMealLogs() {
    const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
    const sums = { Breakfast: 0, Lunch: 0, Dinner: 0, Snacks: 0 };
    const allMeals = this.state.nutrition.meals || [];

    meals.forEach(m => {
      const listEl = document.getElementById(`${m.toLowerCase()}Items`);
      if (!listEl) return;
      listEl.innerHTML = '';

      const filtered = allMeals.filter(item => item.meal === m);
      if (filtered.length === 0) {
        listEl.innerHTML = `<span class="text-xs text-dim italic">No foods logged for ${m} yet. Click '+ Add Food' above.</span>`;
      } else {
        filtered.forEach(item => {
          sums[m] += item.calories;
          const div = document.createElement('div');
          div.className = 'meal-item-row';
          div.innerHTML = `
            <div>
              <div class="meal-item-title">${item.name}</div>
              <div class="meal-item-macros">
                <span>🔥 ${item.calories} kcal</span>
                <span>🥩 ${item.protein}g P</span>
                <span>🌾 ${item.carbs}g C</span>
                <span>🥑 ${item.fats}g F</span>
              </div>
            </div>
            <button class="meal-delete-btn" onclick="app.deleteMealItem(${item.id})" title="Remove item">&times;</button>
          `;
          listEl.appendChild(div);
        });
      }

      safeText(`${m.toLowerCase()}Calories`, `${sums[m]} kcal`);
    });
  }

  // ==========================================================
  // PROTEIN MONITOR LOGIC
  // ==========================================================
  logQuickProtein(name, proteinG, cal) {
    this.addFoodItem('Snacks', name, cal, proteinG, 2, 1);
  }

  updateProteinMonitor() {
    let totalP = 0;
    (this.state.nutrition.meals || []).forEach(m => totalP += (m.protein || 0));
    totalP = Math.round(totalP);

    const goalP = this.state.profile.proteinGoal || 160;
    const remaining = Math.max(0, goalP - totalP);
    const weight = this.state.profile.currentWeight || 70;
    const ratio = (totalP / weight).toFixed(1);

    safeText('proteinRingVal', totalP);
    safeText('proteinRingGoal', `of ${goalP}g goal`);
    safeText('proteinRemainingVal', `${remaining}g`);
    safeText('proteinOptimalRatio', `${ratio} g / kg`);
    safeText('proteinPerKgVal', `${(goalP / weight).toFixed(1)} g / kg target`);
    safeText('proteinCaloriesVal', `${totalP * 4} kcal (${Math.round((totalP * 4) / Math.max(1, this.getTotalCalories()) * 100)}% of total)`);

    const circumference = 465;
    const pct = Math.min(1, totalP / goalP);
    const offset = circumference - (pct * circumference);
    const ring = document.getElementById('proteinProgressRing');
    if (ring) {
      ring.style.strokeDashoffset = offset;
    }
  }

  // ==========================================================
  // WATER TRACKER LOGIC
  // ==========================================================
  quickAddWater(ml) {
    this.state.water.drankMl = (this.state.water.drankMl || 0) + ml;

    this.addTimelineEntry({
      type: 'water',
      icon: '💧',
      title: 'Water Logged',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      stat: `+${ml} ml`,
      label: `Total: ${this.state.water.drankMl} ml`
    });

    this.updateWaterDisplay();
    this.updateDashboardMetrics();
    this.saveUsers();
    this.toast(`Logged +${ml} ml of water!`, '💧');
  }

  resetWater() {
    this.state.water.drankMl = 0;
    this.updateWaterDisplay();
    this.updateDashboardMetrics();
    this.saveUsers();
    this.toast('Water intake reset for today.', '💧');
  }

  updateWaterGoal() {
    const val = parseInt(document.getElementById('waterGoalInput')?.value, 10);
    if (val && val >= 500) {
      this.state.water.targetMl = val;
      this.updateWaterDisplay();
      this.updateDashboardMetrics();
      this.saveUsers();
      this.toast(`Daily water target set to ${val} ml!`, '🎯');
    }
  }

  updateWaterDisplay() {
    const drank = this.state.water.drankMl || 0;
    const target = this.state.water.targetMl || 3000;
    const pct = Math.min(100, Math.round((drank / target) * 100));
    const remaining = Math.max(0, target - drank);

    safeStyle('waterLiquid', 'height', `${pct}%`);
    safeText('waterBottleVal', drank.toLocaleString());
    safeText('waterBottlePct', `${pct}%`);
    safeText('waterRemainingMl', `${remaining.toLocaleString()} ml`);

    let statusMsg = 'Drink up!';
    if (pct >= 100) statusMsg = '🎉 Daily Goal Crushed!';
    else if (pct >= 75) statusMsg = 'Optimal Cellular Hydration!';
    else if (pct >= 50) statusMsg = 'Great Progress — Halfway!';
    else if (pct >= 25) statusMsg = 'Good Start — Keep Sipping!';
    safeText('waterStatusText', statusMsg);

    const mMorning = document.getElementById('waterMilestoneMorning');
    const mPre = document.getElementById('waterMilestonePreWorkout');
    const mIntra = document.getElementById('waterMilestoneIntra');
    const mEve = document.getElementById('waterMilestoneEvening');

    if (mMorning) mMorning.classList.toggle('completed', drank >= 500);
    if (mPre) mPre.classList.toggle('completed', drank >= 1000);
    if (mIntra) mIntra.classList.toggle('completed', drank >= 1750);
    if (mEve) mEve.classList.toggle('completed', drank >= target);
  }

  // ==========================================================
  // WORKOUT PLANNER LOGIC
  // ==========================================================
  renderExerciseCatalog() {
    const container = document.getElementById('exerciseLibraryCards');
    if (!container) return;
    container.innerHTML = '';

    const filter = this.activeWorkoutFilter;
    const filtered = filter === 'all'
      ? EXERCISE_CATALOG
      : EXERCISE_CATALOG.filter(ex => ex.muscle === filter);

    safeText('exerciseCountTag', `${filtered.length} Exercises Listed`);

    filtered.forEach(ex => {
      const card = document.createElement('div');
      card.className = 'ex-card';
      card.innerHTML = `
        <div>
          <span class="ex-badge">${ex.muscle}</span>
          <h4 class="ex-name">${ex.name}</h4>
          <p class="ex-details">${ex.desc}</p>
        </div>
        <div class="mt-2" style="display:flex; justify-content:space-between; align-items:center;">
          <span class="text-xs gold-text font-bold">${ex.setsReps} ${ex.defaultWeight > 0 ? '• ' + ex.defaultWeight + 'kg' : ''}</span>
          <button class="btn-micro" onclick="app.addExerciseToSession('${ex.name.replace(/'/g, "\\'")}', '${ex.muscle}', '${ex.setsReps}', ${ex.defaultWeight}, ${ex.burn})">
            + Add to Workout
          </button>
        </div>
      `;
      container.appendChild(card);
    });
  }

  filterWorkouts(muscle) {
    this.activeWorkoutFilter = muscle;
    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.classList.toggle('active', chip.textContent.toLowerCase().includes(muscle.toLowerCase()) || (muscle === 'all' && chip.textContent === 'All Exercises'));
    });
    this.renderExerciseCatalog();
  }

  loadPresetRoutine(routineKey) {
    let title = '';
    let exercises = [];

    if (routineKey === 'push') {
      title = 'Push Power (Chest, Delts, Triceps)';
      exercises = [
        { id: Date.now() + 1, name: 'Barbell Flat Bench Press', muscle: 'Chest', setsReps: '4 x 8', weight: 80, burn: 120, done: false },
        { id: Date.now() + 2, name: 'Incline Dumbbell Press', muscle: 'Chest', setsReps: '3 x 10', weight: 28, burn: 90, done: false },
        { id: Date.now() + 3, name: 'Overhead Barbell Military Press', muscle: 'Shoulders', setsReps: '4 x 8', weight: 50, burn: 100, done: false },
        { id: Date.now() + 4, name: 'Dumbbell Lateral Raises', muscle: 'Shoulders', setsReps: '4 x 15', weight: 12, burn: 60, done: false },
        { id: Date.now() + 5, name: 'Dips (Parallel Bars)', muscle: 'Arms', setsReps: '3 x 12', weight: 0, burn: 85, done: false }
      ];
    } else if (routineKey === 'pull') {
      title = 'Pull Dominance (Back & Biceps)';
      exercises = [
        { id: Date.now() + 1, name: 'Deadlift (Conventional Barbell)', muscle: 'Back', setsReps: '4 x 5', weight: 120, burn: 180, done: false },
        { id: Date.now() + 2, name: 'Barbell Bent-Over Rows', muscle: 'Back', setsReps: '4 x 8', weight: 70, burn: 110, done: false },
        { id: Date.now() + 3, name: 'Lat Pulldown (Wide Grip)', muscle: 'Back', setsReps: '4 x 10', weight: 60, burn: 85, done: false },
        { id: Date.now() + 4, name: 'Barbell Bicep Curls', muscle: 'Arms', setsReps: '3 x 10', weight: 32, burn: 65, done: false },
        { id: Date.now() + 5, name: 'Face Pulls (Cable)', muscle: 'Shoulders', setsReps: '4 x 15', weight: 22, burn: 65, done: false }
      ];
    } else if (routineKey === 'legs') {
      title = 'Leg Annihilation (Quads & Hamstrings)';
      exercises = [
        { id: Date.now() + 1, name: 'Barbell Back Squats', muscle: 'Legs', setsReps: '4 x 8', weight: 95, burn: 160, done: false },
        { id: Date.now() + 2, name: 'Romanian Deadlift (RDL)', muscle: 'Legs', setsReps: '3 x 10', weight: 80, burn: 110, done: false },
        { id: Date.now() + 3, name: 'Bulgarian Split Squats', muscle: 'Legs', setsReps: '3 x 12 each', weight: 18, burn: 115, done: false },
        { id: Date.now() + 4, name: 'Standing Calf Raises', muscle: 'Legs', setsReps: '4 x 20', weight: 50, burn: 50, done: false },
        { id: Date.now() + 5, name: 'Hanging Leg Raises', muscle: 'Core', setsReps: '3 x 15', weight: 0, burn: 60, done: false }
      ];
    }

    this.state.workouts.activeRoutine = title;
    this.state.workouts.session = exercises;
    this.state.workouts.completed = false;
    this.state.workouts.timerSeconds = 0;
    this.state.workouts.timerRunning = true;

    this.renderActiveWorkoutSession();
    this.saveUsers();
    this.toast(`Loaded ${title} routine! Get to work.`, '🏋️‍♂️');
  }

  addExerciseToSession(name, muscle, setsReps, weight, burn) {
    const newEx = {
      id: Date.now(),
      name,
      muscle,
      setsReps,
      weight,
      burn,
      done: false
    };

    if (!this.state.workouts.session) this.state.workouts.session = [];
    this.state.workouts.session.push(newEx);
    this.renderActiveWorkoutSession();
    this.saveUsers();
    this.toast(`Added ${name} to active session!`, '⚡');
  }

  saveCustomExercise() {
    const name = document.getElementById('exNameInput')?.value.trim();
    const muscle = document.getElementById('exMuscleSelect')?.value || 'Chest';
    const setsReps = document.getElementById('exSetsInput')?.value.trim() || '3 x 10';
    const weight = parseFloat(document.getElementById('exWeightInput')?.value) || 0;
    const burn = parseInt(document.getElementById('exBurnInput')?.value, 10) || 75;

    if (!name) return;

    this.addExerciseToSession(name, muscle, setsReps, weight, burn);
    this.closeModal('customExerciseModal');
    const form = document.getElementById('customExerciseForm');
    if (form) form.reset();
  }

  toggleExerciseDone(id) {
    const ex = (this.state.workouts.session || []).find(e => e.id === id);
    if (ex) {
      ex.done = !ex.done;
      this.renderActiveWorkoutSession();
      this.saveUsers();
    }
  }

  deleteExerciseFromSession(id) {
    this.state.workouts.session = (this.state.workouts.session || []).filter(e => e.id !== id);
    this.renderActiveWorkoutSession();
    this.saveUsers();
  }

  renderActiveWorkoutSession() {
    safeText('activeRoutineTitle', this.state.workouts.activeRoutine || 'My Daily Routine');
    const tbody = document.getElementById('activeWorkoutList');
    if (!tbody) return;
    tbody.innerHTML = '';

    const session = this.state.workouts.session || [];
    if (session.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center text-dim py-4">No exercises currently in session. Choose a preset program or add an exercise from the catalog above!</td></tr>`;
      return;
    }

    session.forEach(ex => {
      const tr = document.createElement('tr');
      tr.style.opacity = ex.done ? '0.6' : '1';
      tr.innerHTML = `
        <td>
          <input type="checkbox" ${ex.done ? 'checked' : ''} onchange="app.toggleExerciseDone(${ex.id})" style="accent-color: var(--gold-primary); transform: scale(1.2); cursor: pointer;">
        </td>
        <td><strong class="${ex.done ? 'text-dim line-through' : 'text-white'}">${ex.name}</strong></td>
        <td><span class="badge-tag">${ex.muscle}</span></td>
        <td><span class="gold-text font-bold">${ex.setsReps}</span></td>
        <td>${ex.weight > 0 ? ex.weight + ' kg' : 'Bodyweight'}</td>
        <td>~${ex.burn} kcal</td>
        <td>
          <button class="meal-delete-btn" onclick="app.deleteExerciseFromSession(${ex.id})" title="Delete">&times;</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  toggleWorkoutTimer() {
    this.state.workouts.timerRunning = !this.state.workouts.timerRunning;
    const btn = document.getElementById('timerToggleBtn');
    if (btn) {
      btn.textContent = this.state.workouts.timerRunning ? 'Pause' : 'Resume';
    }
  }

  startStopwatchTick() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (this.state.workouts && this.state.workouts.timerRunning) {
        this.state.workouts.timerSeconds = (this.state.workouts.timerSeconds || 0) + 1;
        const totalSec = this.state.workouts.timerSeconds;
        const hrs = String(Math.floor(totalSec / 3600)).padStart(2, '0');
        const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
        const secs = String(totalSec % 60).padStart(2, '0');
        safeText('workoutTimerDisplay', `${hrs}:${mins}:${secs}`);
      }
    }, 1000);
  }

  finishWorkoutSession() {
    let totalBurn = 0;
    (this.state.workouts.session || []).forEach(ex => {
      totalBurn += (ex.burn || 0);
    });
    totalBurn = Math.max(200, totalBurn);

    this.state.workouts.completed = true;
    this.state.workouts.burnedCalories = totalBurn;
    this.state.workouts.timerRunning = false;

    this.addTimelineEntry({
      type: 'workout',
      icon: '🏋️‍♂️',
      title: 'Workout Completed',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      stat: `${totalBurn} kcal burned`,
      label: `${(this.state.workouts.session || []).length} Exercises Finished`
    });

    this.updateDashboardMetrics();
    this.saveUsers();
    this.toast(`Workout finished! Burned ~${totalBurn} kcal. Great work!`, '🏆');
  }

  // ==========================================================
  // DASHBOARD AGGREGATION & METRICS
  // ==========================================================
  getTotalCalories() {
    return (this.state.nutrition.meals || []).reduce((sum, item) => sum + (item.calories || 0), 0);
  }

  getTotalProtein() {
    return (this.state.nutrition.meals || []).reduce((sum, item) => sum + (item.protein || 0), 0);
  }

  getTotalCarbs() {
    return (this.state.nutrition.meals || []).reduce((sum, item) => sum + (item.carbs || 0), 0);
  }

  getTotalFats() {
    return (this.state.nutrition.meals || []).reduce((sum, item) => sum + (item.fats || 0), 0);
  }

  updateDashboardMetrics() {
    const prof = this.state.profile;
    const eatenCal = this.getTotalCalories();
    const targetCal = prof.calorieGoal || 2450;
    const calPct = Math.min(100, Math.round((eatenCal / targetCal) * 100));
    const calRemaining = Math.max(0, targetCal - eatenCal);

    safeText('dashCalEaten', eatenCal.toLocaleString());
    safeText('dashCalGoal', targetCal.toLocaleString());
    safeText('dashCalPercent', `${calPct}%`);
    safeStyle('dashCalBar', 'width', `${calPct}%`);
    safeText('dashCalRemaining', `${calRemaining.toLocaleString()} kcal`);

    safeText('nutriCalTotal', eatenCal.toLocaleString());
    safeText('nutriCalGoal', targetCal.toLocaleString());
    safeStyle('nutriCalBar', 'width', `${calPct}%`);

    const eatenP = Math.round(this.getTotalProtein());
    const targetP = prof.proteinGoal || 160;
    const pPct = Math.min(100, Math.round((eatenP / targetP) * 100));
    const pRemaining = Math.max(0, targetP - eatenP);

    safeText('dashProteinEaten', eatenP);
    safeText('dashProteinGoal', targetP);
    safeText('dashProteinPercent', `${pPct}%`);
    safeStyle('dashProteinBar', 'width', `${pPct}%`);
    safeText('dashProteinRemaining', `${pRemaining}g`);

    safeText('nutriProteinTotal', eatenP);
    safeText('nutriProteinGoal', targetP);
    safeStyle('nutriProteinBar', 'width', `${pPct}%`);

    const eatenC = Math.round(this.getTotalCarbs());
    const targetC = prof.carbsGoal || 260;
    const cPct = Math.min(100, Math.round((eatenC / targetC) * 100));
    safeText('nutriCarbsTotal', eatenC);
    safeText('nutriCarbsGoal', targetC);
    safeStyle('nutriCarbsBar', 'width', `${cPct}%`);

    const eatenF = Math.round(this.getTotalFats());
    const targetF = prof.fatsGoal || 68;
    const fPct = Math.min(100, Math.round((eatenF / targetF) * 100));
    safeText('nutriFatsTotal', eatenF);
    safeText('nutriFatsGoal', targetF);
    safeStyle('nutriFatsBar', 'width', `${fPct}%`);

    const drankWater = this.state.water.drankMl || 0;
    const targetWater = this.state.water.targetMl || 3000;
    const wPct = Math.min(100, Math.round((drankWater / targetWater) * 100));
    const glasses = (drankWater / 250).toFixed(1);

    safeText('dashWaterDrank', drankWater.toLocaleString());
    safeText('dashWaterGoal', targetWater.toLocaleString());
    safeText('dashWaterPercent', `${wPct}%`);
    safeStyle('dashWaterBar', 'width', `${wPct}%`);
    safeText('dashWaterGlasses', glasses);

    const burn = this.state.workouts.burnedCalories || 0;
    safeText('dashBurnedCalories', burn);
    safeStyle('dashWorkoutBar', 'width', this.state.workouts.completed ? '100%' : '50%');
    safeText('dashWorkoutBadge', this.state.workouts.completed ? 'Completed' : 'In Progress');
    safeText('dashWorkoutCount', `${(this.state.workouts.session || []).length} exercises`);

    this.updateMacroDonut(eatenCal, eatenP, eatenC, eatenF);
    this.updateSmartRecommendation(pRemaining, eatenCal, targetCal, drankWater, targetWater);
  }

  updateMacroDonut(totalCal, p, c, f) {
    safeText('donutCenterCal', totalCal.toLocaleString());
    safeText('dashMacroProteinG', `${p}g`);
    safeText('dashMacroCarbsG', `${c}g`);
    safeText('dashMacroFatsG', `${f}g`);

    const calP = p * 4;
    const calC = c * 4;
    const calF = f * 9;
    const sumCal = Math.max(1, calP + calC + calF);

    const pctP = Math.round((calP / sumCal) * 100);
    const pctC = Math.round((calC / sumCal) * 100);
    const pctF = 100 - pctP - pctC;

    safeText('dashMacroProteinPct', `${pctP}%`);
    safeText('dashMacroCarbsPct', `${pctC}%`);
    safeText('dashMacroFatsPct', `${pctF}%`);

    const C = 390;
    const lenP = (pctP / 100) * C;
    const lenC = (pctC / 100) * C;
    const lenF = (pctF / 100) * C;

    const segP = document.getElementById('donutProteinSeg');
    const segC = document.getElementById('donutCarbsSeg');
    const segF = document.getElementById('donutFatsSeg');

    if (segP && segC && segF) {
      segP.style.strokeDasharray = `${lenP} ${C - lenP}`;
      segP.style.strokeDashoffset = '0';

      segC.style.strokeDasharray = `${lenC} ${C - lenC}`;
      segC.style.strokeDashoffset = `-${lenP}`;

      segF.style.strokeDasharray = `${lenF} ${C - lenF}`;
      segF.style.strokeDashoffset = `-${lenP + lenC}`;
    }
  }

  updateSmartRecommendation(pRem, cal, targetCal, water, targetWater) {
    const el = document.getElementById('dashSmartRec');
    if (!el) return;

    if (water < targetWater * 0.5) {
      el.textContent = `Hydration alert: You are below 50% of your water target. Drink 500ml now to preserve endurance and cognitive sharpness!`;
    } else if (pRem > 30) {
      el.textContent = `You are ${pRem}g short of your protein goal. To maximize muscle protein synthesis, consume a scoop of whey isolate, 150g grilled chicken breast, or 1 cup Greek yogurt.`;
    } else if (cal > targetCal + 250) {
      el.textContent = `You have surpassed your daily calorie threshold by ${cal - targetCal} kcal. Consider a light 20-minute post-dinner walk or taper carbs tonight.`;
    } else {
      el.textContent = `Outstanding adherence! Your macronutrient split and hydration balance are directly primed for your ${this.state.profile.fitnessGoal} target.`;
    }
  }

  addTimelineEntry(entry) {
    entry.id = Date.now();
    if (!this.state.timeline) this.state.timeline = [];
    this.state.timeline.unshift(entry);
    if (this.state.timeline.length > 20) {
      this.state.timeline.pop();
    }
    this.renderTimeline();
  }

  renderTimeline() {
    const container = document.getElementById('dashTimeline');
    if (!container) return;
    container.innerHTML = '';

    const list = (this.state.timeline || []).slice(0, 5);
    if (list.length === 0) {
      container.innerHTML = `<span class="text-xs text-dim italic">No activity recorded today yet. Log a meal, workout, or water cup to start!</span>`;
      return;
    }

    list.forEach(item => {
      const div = document.createElement('div');
      div.className = 'timeline-entry';
      div.innerHTML = `
        <div class="timeline-left">
          <div class="timeline-icon-box">${item.icon}</div>
          <div>
            <div class="timeline-title">${item.title}</div>
            <div class="timeline-time">${item.time}</div>
          </div>
        </div>
        <div class="timeline-stats">
          <div class="timeline-stat-val">${item.stat}</div>
          <div class="timeline-stat-lbl">${item.label}</div>
        </div>
      `;
      container.appendChild(div);
    });
  }

  // ==========================================================
  // BACKUP & EXPORT
  // ==========================================================
  exportUserData() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `fitora_${(this.state.profile.name || 'athlete').replace(/\s+/g, '_')}_backup.json`);
    dlAnchorElem.click();
    this.toast('Athlete backup exported to JSON!', '💾');
  }

  importUserData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed.profile && parsed.nutrition) {
          const userIdx = this.users.findIndex(u => u.id === this.currentUserId);
          if (userIdx !== -1) {
            this.users[userIdx] = parsed;
          } else {
            parsed.id = 'imported_' + Date.now();
            this.users.push(parsed);
            this.currentUserId = parsed.id;
          }
          this.saveUsers();
          this.init();
          this.toast('Backup data successfully restored!', '✅');
        } else {
          this.toast('Invalid Fitora backup file structure', '⚠️');
        }
      } catch (err) {
        this.toast('Error reading JSON backup file', '❌');
      }
    };
    reader.readAsText(file);
  }

  resetAllData() {
    if (confirm('Are you sure you want to clear your logs and reset back to initial demo data?')) {
      localStorage.removeItem('fitora_multi_users_v2');
      localStorage.removeItem('fitora_active_user_id');
      this.users = this.loadUsers();
      this.currentUserId = this.users[0].id;
      this.saveUsers();
      this.init();
      this.toast('Reset to default profile', '🔄');
    }
  }
}

// Instantiate globally immediately so all inline HTML onclick listeners are 100% active
let app = new FitoraApp();
window.app = app;

window.addEventListener('DOMContentLoaded', () => {
  if (!window.app) {
    window.app = new FitoraApp();
  }
  window.app.init();
});
