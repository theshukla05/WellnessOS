/**
 * WellnessOS - Initial State & Static Data Models
 */
window.wellnessData = {
  // Navigation Menu Registry
  navItems: [
    { name: 'Dashboard', icon: 'layout-dashboard', sectionId: 'section-dashboard' },
    { name: 'Health Metrics', icon: 'activity', sectionId: 'section-metrics' },
    { name: 'Workout Suggestions', icon: 'dumbbell', sectionId: 'section-workouts' },
    { name: 'Activity & Fitness', icon: 'flame', sectionId: 'section-activity' },
    { name: 'Sleep & Recovery', icon: 'moon', sectionId: 'section-sleep' },
    { name: 'Nutrition & Hydration', icon: 'droplet', sectionId: 'section-nutrition' },
    { name: 'Mood & Wellness', icon: 'smile', sectionId: 'section-mood' },
    { name: 'Analytics & Reports', icon: 'file-bar-chart', sectionId: 'section-analytics' },
    { name: 'Habit Tracker', icon: 'trophy', sectionId: 'section-habits' },
    { name: 'Educational Resources', icon: 'book-open', sectionId: 'resources-modal' },
    { name: 'Wellness Assistant', icon: 'bot', sectionId: 'section-assistant' },
    { name: 'Your Profile', icon: 'user', sectionId: 'section-profile' },
    { name: 'Settings', icon: 'settings', sectionId: 'section-settings' }
  ],

  // Live Wearable Telemetry (Emily Park)
  metrics: {
    steps: 7842,
    activeMinutes: 58,
    calories: 320,
    sleep: 7.6,
    water: 2.1,
    mood: 8
  },

  // Stat Cards Config
  statCards: [
    {
      id: 'steps',
      title: 'Steps Walked',
      key: 'steps',
      unit: '',
      delta: '+12% vs National',
      color: '#0284C7',
      gradient: 'from-cyan-400 to-sky-500',
      iconBg: 'from-[#0284C7] to-[#38BDF8]',
      badgeBg: 'bg-sky-50 dark:bg-sky-950/50',
      borderLight: 'border-[#E0F2FE]',
      icon: 'activity',
      path: 'M0 15 Q 12 5, 25 10 T 50 4',
      sectionTarget: 'section-analytics'
    },
    {
      id: 'activeMinutes',
      title: 'Active Minutes',
      key: 'activeMinutes',
      unit: 'min',
      delta: '+18% target',
      color: '#7C3AED',
      gradient: 'from-purple-500 to-indigo-600',
      iconBg: 'from-[#7C3AED] to-[#A78BFA]',
      badgeBg: 'bg-purple-50 dark:bg-purple-950/50',
      borderLight: 'border-[#EDE9FE]',
      icon: 'flame',
      path: 'M0 12 Q 15 2, 30 14 T 50 3',
      sectionTarget: 'section-workouts'
    },
    {
      id: 'calories',
      title: 'Calories Burned',
      key: 'calories',
      unit: 'kcal',
      delta: '+8% active',
      color: '#EA580C',
      gradient: 'from-amber-500 to-orange-600',
      iconBg: 'from-[#EA580C] to-[#FB923C]',
      badgeBg: 'bg-orange-50 dark:bg-orange-950/50',
      borderLight: 'border-[#FFEDD5]',
      icon: 'zap',
      path: 'M0 16 Q 15 14, 30 6 T 50 2',
      sectionTarget: 'section-activity'
    },
    {
      id: 'sleep',
      title: 'Sleep Quality',
      key: 'sleep',
      unit: 'hrs',
      delta: 'AASM Benchmark',
      color: '#4F46E5',
      gradient: 'from-blue-600 to-indigo-700',
      iconBg: 'from-[#4F46E5] to-[#818CF8]',
      badgeBg: 'bg-indigo-50 dark:bg-indigo-950/50',
      borderLight: 'border-[#E0E7FF]',
      icon: 'moon',
      path: 'M0 10 Q 15 16, 30 8 T 50 5',
      sectionTarget: 'section-sleep'
    },
    {
      id: 'water',
      title: 'Hydration Level',
      key: 'water',
      unit: 'L',
      delta: '84% of Goal',
      color: '#0D9488',
      gradient: 'from-teal-400 to-emerald-500',
      iconBg: 'from-[#0D9488] to-[#2DD4BF]',
      badgeBg: 'bg-teal-50 dark:bg-teal-950/50',
      borderLight: 'border-[#CCFBF1]',
      icon: 'droplet',
      path: 'M0 14 Q 20 6, 35 12 T 50 4',
      sectionTarget: 'section-nutrition'
    },
    {
      id: 'mood',
      title: 'Mental Well-being',
      key: 'mood',
      unit: '/ 10',
      delta: 'High Resiliency',
      color: '#16A34A',
      gradient: 'from-emerald-400 to-green-600',
      iconBg: 'from-[#16A34A] to-[#4ADE80]',
      badgeBg: 'bg-green-50 dark:bg-green-950/50',
      borderLight: 'border-[#DCFCE7]',
      icon: 'smile',
      path: 'M0 12 Q 15 4, 30 9 T 50 3',
      sectionTarget: 'section-mood'
    }
  ],

  // Workout Suggestion Catalogue
  workouts: {
    hiit: {
      id: 'hiit',
      label: 'Metabolic HIIT',
      title: 'Full-Body Metabolic Ignite',
      intensity: 'High Intensity',
      duration: '24 mins',
      calories: '285 kcal',
      targetZones: 'Core · Glutes · Cardio',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
      coachName: 'Coach Elena Vance',
      repTempo: '45s work / 15s rest × 4 rounds',
      badgeColor: 'bg-gradient-to-r from-rose-500 to-orange-500',
      description: 'Interval training with dynamic kettlebell lunges and explosive bodyweight movements to elevate VO2 max and burn calories.'
    },
    strength: {
      id: 'strength',
      label: 'Strength & Core',
      title: 'Functional Kinetic Strength',
      intensity: 'Moderate - Heavy',
      duration: '35 mins',
      calories: '220 kcal',
      targetZones: 'Posterior Chain · Delts',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
      coachName: 'Coach Marcus Thorne',
      repTempo: '3 sets × 10 reps (RPE 7-8)',
      badgeColor: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      description: 'Compound dumbbell deadlifts and clean press variations engineered to strengthen joints and reinforce posture alignment.'
    },
    mobility: {
      id: 'mobility',
      label: 'Deep Mobility',
      title: 'Spinal Flow & Deep Recovery',
      intensity: 'Gentle Flow',
      duration: '20 mins',
      calories: '95 kcal',
      targetZones: 'Hip Openers · Thoracic',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
      coachName: 'Yogi Clara Kim',
      repTempo: '60s continuous isometric holds',
      badgeColor: 'bg-gradient-to-r from-emerald-500 to-teal-500',
      description: 'Restorative deep fascia decompression combining breathwork and yoga flow to drop cortisol and release lower back compression.'
    }
  },

  // Interactive Habit Matrix
  habits: [
    { 
      id: 1, 
      title: "Morning Sun & Hydration", 
      category: "Circadian", 
      target: "500ml + 10m sun", 
      currentStreak: 14, 
      completedDays: [true, true, true, true, true, true, true],
      color: "from-amber-400 to-orange-500",
      accentBg: "bg-amber-500/10",
      textColor: "text-amber-600",
      todayDone: true
    },
    { 
      id: 2, 
      title: "Core & Posture Reset", 
      category: "Movement", 
      target: "15 min active mobility", 
      currentStreak: 9, 
      completedDays: [true, false, true, true, true, true, true],
      color: "from-cyan-400 to-blue-600",
      accentBg: "bg-blue-500/10",
      textColor: "text-blue-600",
      todayDone: true
    },
    { 
      id: 3, 
      title: "Digital Sunset Wind-Down", 
      category: "Sleep Hygiene", 
      target: "No screens 45m before bed", 
      currentStreak: 6, 
      completedDays: [true, true, true, false, true, true, false],
      color: "from-indigo-400 to-purple-600",
      accentBg: "bg-purple-500/10",
      textColor: "text-purple-600",
      todayDone: false
    },
    { 
      id: 4, 
      title: "Mindful Breathwork", 
      category: "Stress Resilience", 
      target: "Box breathing 4-4-4-4", 
      currentStreak: 21, 
      completedDays: [true, true, true, true, true, true, true],
      color: "from-emerald-400 to-teal-600",
      accentBg: "bg-emerald-500/10",
      textColor: "text-emerald-600",
      todayDone: true
    }
  ],

  // Reminders Checklist
  reminders: [
    { id: 1, text: "Log today's wellness data", time: "08:00 PM", completed: false },
    { id: 2, text: "Weekly progress review", time: "Sun, 8:00 PM", completed: false },
    { id: 3, text: "Hydration reminder", time: "Every 3 hours", completed: true }
  ],

  // Peer-Reviewed Educational Protocols (Ethics Compliance)
  educationalResources: [
    {
      id: 1,
      title: "Circadian Light Timing & Melatonin Secretion",
      category: "Sleep Architecture",
      readTime: "6 min read",
      author: "Dr. Matthew Walker Lab",
      source: "AASM Clinical Journal",
      summary: "How morning lux exposure resets the suprachiasmatic nucleus and optimizes stage 3 slow-wave sleep depth.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "Zone 2 Cardiovascular Base vs HIIT Dynamics",
      category: "Exercise Physiology",
      readTime: "8 min read",
      author: "Dr. Inigo San Millan",
      source: "Sports Medicine International",
      summary: "Mitochondrial biogenesis, lactate clearance rates, and why 80% of volume belongs below aerobic threshold.",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "Cellular Hydration & Electrolyte Osmolality",
      category: "Biochemistry",
      readTime: "5 min read",
      author: "Stanford Health & Physiology",
      source: "ICMR & WHO Consensus",
      summary: "Why water volume without adequate sodium and potassium can cause intracellular dehydration.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      title: "Habit Stacking & The Dopamine Habit Loop",
      category: "Behavioral Science",
      readTime: "7 min read",
      author: "James Clear & B.J. Fogg",
      source: "Behavioral Medicine Reports",
      summary: "Designing identity-based habits, environmental prompts, and frictionless streak acceleration.",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=600&q=80"
    }
  ]
};