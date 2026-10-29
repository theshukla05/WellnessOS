/**
 * WellnessOS - Main Application Controller
 */
(function () {
  'use strict';

  const data = window.wellnessData;
  let activeTab = 'Dashboard';
  let activeWorkoutKey = 'hiit';
  let isDarkMode = false;
  let isSyncing = false;

  // Initialize Application
  function init() {
    renderSidebarNav();
    renderStatCards();
    renderWorkoutSection();
    renderHabitMatrix();
    renderTrendPills();
    renderSleepBars();
    renderGoalsProgress();
    renderReminders();
    renderAssistant();
    renderEducationalResources();
    bindEvents();
    
    // Lucide Icons Render
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // =========================================================
  // RENDER: SIDEBAR NAVIGATION WITH 3D BULGE
  // =========================================================
  function renderSidebarNav() {
    const navContainer = document.getElementById('sidebar-nav');
    if (!navContainer) return;

    navContainer.innerHTML = data.navItems.map(item => {
      const isActive = activeTab === item.name;
      return `
        <button
          onclick="window.app.scrollToSection('${item.sectionId}', '${item.name}')"
          class="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer text-left transition-all ${
            isActive 
              ? 'sidebar-bulge-active text-white font-bold' 
              : 'sidebar-item-idle text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B]'
          }"
        >
          <i data-lucide="${item.icon}" class="w-4 h-4 shrink-0 ${isActive ? 'text-[#5EEAD4]' : 'text-[#94A3B8]'}"></i>
          <span class="truncate">${item.name}</span>
          ${isActive ? '<div class="ml-auto w-1.5 h-1.5 rounded-full bg-[#5EEAD4] animate-ping"></div>' : ''}
        </button>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  // =========================================================
  // RENDER: STAT CARDS
  // =========================================================
  function renderStatCards() {
    const container = document.getElementById('section-metrics');
    if (!container) return;

    container.innerHTML = data.statCards.map(card => {
      const val = data.metrics[card.key];
      const displayVal = typeof val === 'number' ? val.toLocaleString() : val;

      return `
        <div 
          onclick="window.app.scrollToSection('${card.sectionTarget}')"
          class="bg-white dark:bg-[#131C31] ${card.borderLight} dark:border-[#1E293B] p-4 rounded-2xl border-2 shadow-xs flex flex-col justify-between card-3d-hover relative overflow-hidden group cursor-pointer transition-colors duration-300"
        >
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient}"></div>
          <div class="flex items-center justify-between relative z-10">
            <div class="w-11 h-11 rounded-xl bg-gradient-to-br ${card.iconBg} flex items-center justify-center text-white shadow-md animate-float-3d">
              <i data-lucide="${card.icon}" class="w-5 h-5"></i>
            </div>
            <svg class="w-12 h-5 text-[${card.color}]" viewBox="0 0 50 20" fill="none">
              <path d="${card.path}" stroke="${card.color}" stroke-width="2.5" fill="none" stroke-linecap="round" />
            </svg>
          </div>

          <div class="mt-3 relative z-10">
            <span class="text-[11px] font-bold uppercase tracking-wider text-[${card.color}]">${card.title}</span>
            <p class="text-2xl font-black font-medical-heading text-[#0F172A] dark:text-white tracking-tight">
              ${displayVal} <span class="text-sm font-semibold text-[#64748B]">${card.unit}</span>
            </p>
            <div class="flex items-center gap-1 text-[10px] text-[${card.color}] font-bold mt-1 ${card.badgeBg} px-2 py-0.5 rounded-md w-fit">
              <i data-lucide="trending-up" class="w-3 h-3"></i>
              <span>${card.delta}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  // =========================================================
  // RENDER: WORKOUT SECTION
  // =========================================================
  function renderWorkoutSection() {
    const tabsContainer = document.getElementById('workout-tabs');
    const contentContainer = document.getElementById('workout-featured-container');
    if (!tabsContainer || !contentContainer) return;

    // Render Pills
    tabsContainer.innerHTML = Object.values(data.workouts).map(cat => {
      const isSelected = activeWorkoutKey === cat.id;
      return `
        <button
          onclick="window.app.selectWorkout('${cat.id}')"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            isSelected 
              ? `${cat.badgeColor} text-white shadow-md scale-105` 
              : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white'
          }"
        >
          ${cat.label}
        </button>
      `;
    }).join('');

    // Active Workout Detail
    const cur = data.workouts[activeWorkoutKey];
    contentContainer.innerHTML = `
      <div class="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-lg border border-[#E2E8F0] dark:border-[#334155] group h-72 lg:h-80">
        <img 
          src="${cur.image}" 
          alt="${cur.title}" 
          class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/30 to-transparent"></div>
        
        <div class="absolute top-3.5 left-3.5">
          <span class="px-3 py-1 rounded-full text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md ${cur.badgeColor}">
            ${cur.intensity}
          </span>
        </div>

        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-14 h-14 rounded-full bg-white/90 text-[#0F172A] flex items-center justify-center shadow-2xl backdrop-blur-sm group-hover:scale-110 transition cursor-pointer">
            <i data-lucide="play" class="w-6 h-6 fill-[#0F172A] ml-1"></i>
          </div>
        </div>

        <div class="absolute bottom-3.5 left-3.5 right-3.5 text-white">
          <span class="text-[10px] text-[#A5F3FC] font-bold block">${cur.coachName}</span>
          <h4 class="text-base font-extrabold font-medical-heading">${cur.title}</h4>
        </div>
      </div>

      <div class="lg:col-span-7 flex flex-col justify-between space-y-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-extrabold text-[#00897B] bg-[#E6F4F2] px-3 py-1 rounded-full">
              Physiology Match: 96% Compatible
            </span>
            <span class="text-xs text-[#64748B] font-medium">Recommended for 1 Jan 2026 morning</span>
          </div>

          <h4 class="text-2xl font-black font-medical-heading text-[#0F172A] dark:text-white mt-2">
            ${cur.title}
          </h4>
          <p class="text-xs sm:text-sm text-[#475569] dark:text-slate-300 mt-2 leading-relaxed font-medium">
            ${cur.description}
          </p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div class="p-3 bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-xl text-center">
            <i data-lucide="clock" class="w-4 h-4 text-[#00897B] mx-auto mb-1"></i>
            <span class="text-[10px] text-[#64748B] font-bold uppercase block">Duration</span>
            <span class="text-sm font-black text-[#0F172A] dark:text-white">${cur.duration}</span>
          </div>

          <div class="p-3 bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-xl text-center">
            <i data-lucide="flame" class="w-4 h-4 text-[#EA580C] mx-auto mb-1"></i>
            <span class="text-[10px] text-[#64748B] font-bold uppercase block">Burn Est.</span>
            <span class="text-sm font-black text-[#0F172A] dark:text-white">${cur.calories}</span>
          </div>

          <div class="p-3 bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-xl text-center">
            <i data-lucide="target" class="w-4 h-4 text-[#4F46E5] mx-auto mb-1"></i>
            <span class="text-[10px] text-[#64748B] font-bold uppercase block">Target Zones</span>
            <span class="text-xs font-extrabold text-[#0F172A] dark:text-white truncate block">${cur.targetZones}</span>
          </div>

          <div class="p-3 bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-xl text-center">
            <i data-lucide="rotate-ccw" class="w-4 h-4 text-[#10B981] mx-auto mb-1"></i>
            <span class="text-[10px] text-[#64748B] font-bold uppercase block">Rep Cadence</span>
            <span class="text-xs font-bold text-[#0F172A] dark:text-white truncate block">Intervals</span>
          </div>
        </div>

        <div class="p-3.5 bg-gradient-to-r from-[#F0FDF4] via-[#ECFDF5] to-[#F0FDFA] dark:bg-[#042F2E]/70 border border-[#A7F3D0] dark:border-[#00897B]/40 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span class="text-[10px] font-black uppercase tracking-wider text-[#065F46] dark:text-[#2DD4BF] block">Prescribed Interval Tempo</span>
            <p class="text-xs font-bold text-[#047857] dark:text-white">${cur.repTempo}</p>
          </div>
          <button class="px-5 py-2.5 bg-[#00897B] hover:bg-[#00796B] text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 shrink-0 cursor-pointer">
            <i data-lucide="play" class="w-3.5 h-3.5 fill-white"></i>
            <span>Begin Guided Session</span>
          </button>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  // =========================================================
  // RENDER: HABIT MATRIX
  // =========================================================
  function renderHabitMatrix() {
    const container = document.getElementById('habits-matrix-container');
    if (!container) return;

    container.innerHTML = data.habits.map(h => {
      const dayLetters = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
      return `
        <div class="p-5 rounded-2xl border-2 bg-gradient-to-b from-white to-[#F8FAFC] dark:bg-[#1E293B] border-[#E2E8F0] dark:border-[#334155] hover:border-[#00897B]/40 dark:hover:border-[#00897B] shadow-xs hover:shadow-md transition card-3d-hover relative overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${h.color}"></div>
          
          <div class="flex items-start justify-between gap-3">
            <div>
              <span class="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md ${h.accentBg} ${h.textColor}">
                ${h.category}
              </span>
              <h4 class="text-base font-black font-medical-heading text-[#0F172A] dark:text-white mt-1.5">
                ${h.title}
              </h4>
              <p class="text-xs text-[#64748B] font-medium">${h.target}</p>
            </div>

            <button
              onclick="window.app.toggleHabit(${h.id})"
              class="w-12 h-12 rounded-2xl flex flex-col items-center justify-center transition-all shadow-md shrink-0 cursor-pointer ${
                h.todayDone 
                  ? `bg-gradient-to-br ${h.color} text-white scale-105 ring-4 ring-emerald-500/20` 
                  : 'bg-[#F1F5F9] dark:bg-[#0B1120] border-2 border-dashed border-[#CBD5E1] dark:border-[#475569] text-[#94A3B8] hover:border-[#00897B]'
              }"
              title="Click to toggle today's completion"
            >
              ${h.todayDone ? `
                <i data-lucide="check-circle-2" class="w-5 h-5 text-white"></i>
                <span class="text-[8px] font-black uppercase tracking-tighter mt-0.5">Done</span>
              ` : `
                <span class="text-[10px] font-extrabold text-[#64748B]">Log</span>
              `}
            </button>
          </div>

          <div class="mt-4 pt-3 border-t border-[#F1F5F9] dark:border-[#334155] flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              ${dayLetters.map((d, idx) => {
                const isDone = h.completedDays[idx];
                return `
                  <div class="flex flex-col items-center gap-1">
                    <div class="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-extrabold transition ${
                      isDone 
                        ? `bg-gradient-to-tr ${h.color} text-white shadow-xs` 
                        : 'bg-[#F1F5F9] dark:bg-[#0B1120] text-[#CBD5E1] dark:text-[#475569]'
                    }">
                      ${isDone ? '✓' : '·'}
                    </div>
                    <span class="text-[9px] text-[#94A3B8] font-bold">${d}</span>
                  </div>
                `;
              }).join('')}
            </div>

            <div class="flex items-center gap-1 text-right">
              <i data-lucide="flame" class="w-4 h-4 text-orange-500 fill-orange-500"></i>
              <div>
                <span class="text-xs font-black text-[#0F172A] dark:text-white block">${h.currentStreak} Days</span>
                <span class="text-[9px] text-[#64748B] font-bold uppercase">Active Streak</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  // =========================================================
  // RENDER: TREND SELECTOR PILLS
  // =========================================================
  function renderTrendPills() {
    const container = document.getElementById('trend-selector-pills');
    if (!container) return;

    const pills = ['Steps', 'Active Minutes', 'Sleep', 'Calories'];
    container.innerHTML = pills.map((p, idx) => `
      <button 
        class="px-3 py-1 rounded-lg transition cursor-pointer ${idx === 0 ? 'bg-[#00897B] text-white shadow-xs' : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white'}"
      >
        ${p}
      </button>
    `).join('');
  }

  // =========================================================
  // RENDER: SLEEP ANALYSIS BARS
  // =========================================================
  function renderSleepBars() {
    const container = document.getElementById('sleep-bars-container');
    if (!container) return;

    const days = [
      { day: 'Mon', hrs: 6.8 },
      { day: 'Tue', hrs: 6.5 },
      { day: 'Wed', hrs: 7.2 },
      { day: 'Thu', hrs: 8.5 },
      { day: 'Fri', hrs: 7.1 },
      { day: 'Sat', hrs: 7.8 },
      { day: 'Sun', hrs: 7.3 }
    ];

    container.innerHTML = days.map(d => `
      <div class="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer">
        <div 
          class="w-full max-w-[24px] bg-gradient-to-t from-[#4F46E5] to-[#818CF8] rounded-t-lg group-hover:from-[#3730A3] group-hover:to-[#6366F1] transition shadow-xs"
          style="height: ${(d.hrs / 10) * 100}%"
          title="${d.hrs} hours"
        ></div>
        <span class="text-[10px] text-[#94A3B8] mt-2 font-medium group-hover:text-[#4F46E5] transition">${d.day}</span>
      </div>
    `).join('');
  }

  // =========================================================
  // RENDER: GOALS & PROGRESS
  // =========================================================
  function renderGoalsProgress() {
    const container = document.getElementById('goals-progress-container');
    if (!container) return;

    container.innerHTML = `
      <div>
        <div class="flex items-center justify-between text-xs mb-1">
          <div class="flex items-center gap-1.5">
            <i data-lucide="activity" class="w-3.5 h-3.5 text-[#00897B]"></i>
            <span class="text-[#475569] text-[11px] font-medium">Daily Steps</span>
          </div>
          <span class="text-[#0F172A] dark:text-white font-bold text-[11px]">${data.metrics.steps.toLocaleString()} / 10,000</span>
        </div>
        <div class="w-full bg-[#F1F5F9] dark:bg-[#1E293B] h-2 rounded-full overflow-hidden">
          <div class="bg-gradient-to-r from-[#00897B] to-[#2DD4BF] h-full rounded-full transition-all duration-700" style="width: 78%"></div>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between text-xs mb-1">
          <div class="flex items-center gap-1.5">
            <i data-lucide="droplet" class="w-3.5 h-3.5 text-[#0284C7]"></i>
            <span class="text-[#475569] text-[11px] font-medium">Water Intake</span>
          </div>
          <span class="text-[#0F172A] dark:text-white font-bold text-[11px]">${data.metrics.water} / 2.5 L</span>
        </div>
        <div class="w-full bg-[#F1F5F9] dark:bg-[#1E293B] h-2 rounded-full overflow-hidden">
          <div class="bg-gradient-to-r from-[#0284C7] to-[#38BDF8] h-full rounded-full transition-all duration-700" style="width: 84%"></div>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between text-xs mb-1">
          <div class="flex items-center gap-1.5">
            <i data-lucide="moon" class="w-3.5 h-3.5 text-[#6366F1]"></i>
            <span class="text-[#475569] text-[11px] font-medium">Sleep Duration</span>
          </div>
          <span class="text-[#0F172A] dark:text-white font-bold text-[11px]">${data.metrics.sleep} / 8 hrs</span>
        </div>
        <div class="w-full bg-[#F1F5F9] dark:bg-[#1E293B] h-2 rounded-full overflow-hidden">
          <div class="bg-gradient-to-r from-[#4F46E5] to-[#818CF8] h-full rounded-full transition-all duration-700" style="width: 95%"></div>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between text-xs mb-1">
          <div class="flex items-center gap-1.5">
            <i data-lucide="flame" class="w-3.5 h-3.5 text-[#F59E0B]"></i>
            <span class="text-[#475569] text-[11px] font-medium">Active Minutes</span>
          </div>
          <span class="text-[#0F172A] dark:text-white font-bold text-[11px]">${data.metrics.activeMinutes} / 60 min</span>
        </div>
        <div class="w-full bg-[#F1F5F9] dark:bg-[#1E293B] h-2 rounded-full overflow-hidden">
          <div class="bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] h-full rounded-full transition-all duration-700" style="width: 97%"></div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  // =========================================================
  // RENDER: REMINDERS LIST
  // =========================================================
  function renderReminders() {
    const container = document.getElementById('reminders-list-container');
    const countEl = document.getElementById('reminders-completion-count');
    if (!container) return;

    container.innerHTML = data.reminders.map(r => `
      <div 
        onclick="window.app.toggleReminder(${r.id})"
        class="flex items-center justify-between p-2 rounded-xl hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] cursor-pointer transition border border-transparent"
      >
        <div class="flex items-center gap-2.5">
          <div class="w-4 h-4 rounded-full border flex items-center justify-center transition ${
            r.completed 
              ? 'bg-[#10B981] border-[#10B981] text-white shadow-xs' 
              : 'border-[#CBD5E1]'
          }">
            ${r.completed ? '<i data-lucide="check" class="w-3 h-3 stroke-[3]"></i>' : ''}
          </div>
          <span class="text-xs ${r.completed ? 'line-through text-[#94A3B8]' : 'text-[#334155] dark:text-slate-200'} font-medium">
            ${r.text}
          </span>
        </div>
        <span class="text-[10px] text-[#94A3B8] font-mono">${r.time}</span>
      </div>
    `).join('');

    const completed = data.reminders.filter(r => r.completed).length;
    if (countEl) countEl.innerText = `${completed} / ${data.reminders.length} Done`;

    if (window.lucide) window.lucide.createIcons();
  }

  // =========================================================
  // RENDER: ASSISTANT CHAT & PROMPTS
  // =========================================================
  function renderAssistant() {
    const chatBox = document.getElementById('chat-messages-container');
    const promptsBox = document.getElementById('quick-prompts-container');

    if (chatBox) {
      chatBox.innerHTML = `
        <div class="flex gap-2.5 items-start">
          <div class="w-6 h-6 rounded-full bg-[#E6F4F2] text-[#00897B] flex items-center justify-center shrink-0 mt-0.5">
            <i data-lucide="bot" class="w-3.5 h-3.5"></i>
          </div>
          <div class="p-3 rounded-2xl text-xs leading-relaxed bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] text-[#334155] dark:text-slate-200 rounded-bl-none">
            Hi Emily! I can help you understand your wellness data, suggest general tips, and answer health-related questions.
          </div>
        </div>
      `;
    }

    if (promptsBox) {
      const prompts = [
        "How was my activity this month?",
        "Give me tips to improve sleep",
        "Suggest a hydration routine",
        "Show my progress summary"
      ];
      promptsBox.innerHTML = prompts.map(p => `
        <button
          onclick="window.app.sendQuickPrompt('${p}')"
          class="w-full flex items-center justify-between px-3 py-2 bg-[#F8FAFC] dark:bg-[#1E293B] hover:bg-[#F1F5F9] dark:hover:bg-[#334155] border border-[#E2E8F0] dark:border-[#334155] text-[#475569] dark:text-[#CBD5E1] rounded-xl text-[11px] font-medium transition text-left group cursor-pointer"
        >
          <span>${p}</span>
          <i data-lucide="arrow-right" class="w-3 h-3 text-[#94A3B8] group-hover:text-[#00897B] group-hover:translate-x-0.5 transition"></i>
        </button>
      `).join('');
    }

    if (window.lucide) window.lucide.createIcons();
  }

  // =========================================================
  // RENDER: EDUCATIONAL RESOURCES MODAL
  // =========================================================
  function renderEducationalResources() {
    const grid = document.getElementById('modal-resources-grid');
    if (!grid) return;

    grid.innerHTML = data.educationalResources.map(res => `
      <div class="rounded-2xl border border-[#E2E8F0] dark:border-[#334155] hover:border-[#00897B]/50 dark:hover:border-[#00897B] bg-[#F8FAFC] dark:bg-[#1E293B] overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between">
        <div class="h-32 w-full relative overflow-hidden">
          <img src="${res.image}" alt="${res.title}" class="w-full h-full object-cover" />
          <span class="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-[#0F172A]/85 backdrop-blur-md text-white text-[10px] font-bold">
            ${res.category}
          </span>
          <span class="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-white/90 text-[#0F172A] text-[10px] font-extrabold flex items-center gap-1 shadow-xs">
            <i data-lucide="clock" class="w-3 h-3 text-[#00897B]"></i>
            ${res.readTime}
          </span>
        </div>

        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h4 class="text-sm font-black font-medical-heading leading-tight">${res.title}</h4>
            <p class="text-xs text-[#475569] dark:text-slate-300 mt-1.5 leading-relaxed">${res.summary}</p>
          </div>

          <div class="mt-3 pt-3 border-t border-[#E2E8F0] dark:border-[#334155] flex items-center justify-between text-[11px]">
            <span class="text-[#00897B] font-bold truncate max-w-[150px]">${res.source}</span>
            <button class="flex items-center gap-1 text-[#00897B] font-bold hover:underline cursor-pointer">
              <span>Read Protocol</span>
              <i data-lucide="external-link" class="w-3 h-3"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  // =========================================================
  // BIND EVENT LISTENERS
  // =========================================================
  function bindEvents() {
    // Theme Switchers
    document.getElementById('btn-theme-light')?.addEventListener('click', () => setTheme(false));
    document.getElementById('btn-theme-dark')?.addEventListener('click', () => setTheme(true));

    // Telemetry Sync Buttons
    document.getElementById('btn-sync-watch')?.addEventListener('click', triggerWatchSync);
    document.getElementById('btn-hero-sync')?.addEventListener('click', triggerWatchSync);

    // Profile Click Jump
    document.getElementById('nav-profile-badge')?.addEventListener('click', () => {
      window.app.scrollToSection('section-profile', 'Your Profile');
    });

    // Modal Triggers
    document.getElementById('btn-explore-sidebar')?.addEventListener('click', () => openModal(true));
    document.getElementById('btn-close-modal')?.addEventListener('click', () => openModal(false));
    document.getElementById('btn-close-modal-bottom')?.addEventListener('click', () => openModal(false));

    // Assistant Form Submit
    document.getElementById('assistant-chat-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('assistant-input');
      if (!input || !input.value.trim()) return;
      appendChatMessage('user', input.value.trim());
      input.value = '';
      setTimeout(() => {
        appendChatMessage('assistant', "Emily, your 2025 synthesis shows 18% improvement in aerobic minutes compared to your Q1 baseline! (Non-medical general wellness observation).");
      }, 500);
    });
  }

  // =========================================================
  // ACTIONS & INTERACTIONS
  // =========================================================
  function setTheme(dark) {
    isDarkMode = dark;
    if (dark) {
      document.documentElement.classList.add('dark');
      document.getElementById('btn-theme-dark')?.classList.add('bg-[#00897B]', 'text-white', 'shadow-xs');
      document.getElementById('btn-theme-dark')?.classList.remove('text-[#94A3B8]');
      document.getElementById('btn-theme-light')?.classList.remove('bg-white', 'shadow-xs');
    } else {
      document.documentElement.classList.remove('dark');
      document.getElementById('btn-theme-light')?.classList.add('bg-white', 'text-[#F59E0B]', 'shadow-xs');
      document.getElementById('btn-theme-dark')?.classList.remove('bg-[#00897B]', 'text-white', 'shadow-xs');
      document.getElementById('btn-theme-dark')?.classList.add('text-[#94A3B8]');
    }
  }

  function triggerWatchSync() {
    if (isSyncing) return;
    isSyncing = true;
    const icon = document.getElementById('sync-icon');
    const text = document.getElementById('sync-text');
    if (icon) icon.classList.add('animate-spin');
    if (text) text.innerText = 'Syncing...';

    setTimeout(() => {
      data.metrics.steps += Math.floor(Math.random() * 250) + 50;
      data.metrics.activeMinutes += Math.floor(Math.random() * 6) + 1;
      data.metrics.calories += Math.floor(Math.random() * 35) + 10;
      
      renderStatCards();
      renderGoalsProgress();
      
      const stepDonut = document.getElementById('donut-step-total');
      if (stepDonut) stepDonut.innerText = data.metrics.steps.toLocaleString();

      if (icon) icon.classList.remove('animate-spin');
      if (text) text.innerText = 'Sync Watch';
      isSyncing = false;
    }, 900);
  }

  function openModal(show) {
    const modal = document.getElementById('resources-modal');
    if (!modal) return;
    if (show) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    } else {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  function appendChatMessage(role, text) {
    const box = document.getElementById('chat-messages-container');
    if (!box) return;

    const div = document.createElement('div');
    div.className = `flex gap-2.5 items-start ${role === 'user' ? 'justify-end' : ''}`;
    div.innerHTML = role === 'user' ? `
      <div class="p-3 rounded-2xl text-xs leading-relaxed bg-[#00897B] text-white rounded-br-none shadow-sm">
        ${text}
      </div>
    ` : `
      <div class="w-6 h-6 rounded-full bg-[#E6F4F2] text-[#00897B] flex items-center justify-center shrink-0 mt-0.5">
        <i data-lucide="bot" class="w-3.5 h-3.5"></i>
      </div>
      <div class="p-3 rounded-2xl text-xs leading-relaxed bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] text-[#334155] dark:text-slate-200 rounded-bl-none">
        ${text}
      </div>
    `;

    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
    if (window.lucide) window.lucide.createIcons();
  }

  // =========================================================
  // PUBLIC GLOBAL API (window.app)
  // =========================================================
  window.app = {
    scrollToSection: function(sectionId, tabName) {
      if (tabName) {
        activeTab = tabName;
        renderSidebarNav();
      }
      if (sectionId === 'resources-modal') {
        openModal(true);
        return;
      }
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },

    selectWorkout: function(id) {
      activeWorkoutKey = id;
      renderWorkoutSection();
    },

    toggleHabit: function(id) {
      const h = data.habits.find(item => item.id === id);
      if (h) {
        h.todayDone = !h.todayDone;
        h.currentStreak = h.todayDone ? h.currentStreak + 1 : Math.max(0, h.currentStreak - 1);
        h.completedDays[6] = h.todayDone;
        renderHabitMatrix();
      }
    },

    toggleReminder: function(id) {
      const r = data.reminders.find(item => item.id === id);
      if (r) {
        r.completed = !r.completed;
        renderReminders();
      }
    },

    sendQuickPrompt: function(text) {
      appendChatMessage('user', text);
      setTimeout(() => {
        const reply = text.includes('activity') 
          ? "Your activity peaked in mid-July with 9,842 daily average steps! Over the last 7 days of 2025 (Dec 25-31), you maintained a steady 7,842 steps/day." 
          : text.includes('sleep')
          ? "To enhance sleep efficiency, aim for a consistent wind-down window 30 minutes before your typical 10:30 PM bedtime."
          : text.includes('hydration')
          ? "You've reached 2.1L out of your 2.5L target today. Try adding one glass with your afternoon routine!"
          : "Emily, your 2025 synthesis shows 18% improvement in aerobic minutes compared to your Q1 baseline!";
        appendChatMessage('assistant', reply);
      }, 500);
    }
  };

  // Run on DOM ready
  document.addEventListener('DOMContentLoaded', init);
})();