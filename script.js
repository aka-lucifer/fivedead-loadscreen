const LoadScreen = new Vue({
  el: "#container",
  data: {
    // Strings
    currentTip: "",

    // Arrays
    tips: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut est at massa ultricies venenatis. Fusce bibendum erat velit, sed porta nisl gravida vitae.",
      "Cras bibendum orci in leo congue, eget dignissim quam molestie. Morbi venenatis, elit sed semper fringilla, diam dui blandit dolor, eu lacinia ex ex pellentesque quam. Mauris volutpat non orci ac convallis. Quisque congue metus sit amet viverra mollis.",
      "Maecenas vestibulum tempor tincidunt. Nulla iaculis, lacus nec tempus tempus, arcu eros ullamcorper eros, eu sodales dui mauris nec ligula.",
      "Hi there sir",
      "What you doing there sir?"
    ],

    // Objects
    player: {
      id: 1,
      name: "akaLucifer",
      rank: "Admin",
      playtime: "2d 15h 47m"
    },

    kills: {
      playerKills: 13,
      zombieKills: 252
    },

    stats: {
      level: 5,
      xp: 11732,
      skills: [
        {label: "Stamina", identifier: "MP0_STAMINA", value: 23.7, type: "gta", icon: `<i class="fas fa-running icon"></i>`},
        {label: "Strength", identifier: "MP0_STRENGTH", value: 45.2, type: "gta", icon: `<i class="fas fa-dumbbell icon"></i>`},
        {label: "Lung Capacity", identifier: "MP0_LUNG_CAPACITY", value: 63.5, type: "gta", icon: `<i class="fas fa-brain icon"></i>`},
        {label: "Shooting", identifier: "MP0_SHOOTING_ABILITY", value: 40.9, type: "gta", icon: `<i class="fas fa-fire icon"></i>`},
        {label: "Driving", identifier: "MP0_DRIVING_ABILITY", value: 32.9, type: "gta", icon: `<i class="fas fa-car icon"></i>`},
        {label: "Wheelie", identifier: "MP0_WHEELIE_ABILITY", value: 35.5, type: "gta", icon: `<i class="fas fa-motorcycle icon"></i>`},
        {label: "Mining", identifier: "mining", level: 1, type: "other", icon: `<i class="fas fa-gem icon"></i>`},
        {label: "Crafting", identifier: "crafting", level: 19, type: "other", icon: `<i class="fas fa-tools icon"></i>`},
        {label: "Lockpicking", identifier: "lockpicking", level: 7, type: "other", icon: `<i class="fas fa-lock-open icon"></i>`},
        {label: "Lumberjacking", identifier: "lumberjacking", level: 14, type: "other", icon: `<i class="fas fa-tree icon"></i>`}
      ],
      health: 184,
      maxHealth: 300,
      temperature: 97,
      food: 34,
      drink: 56,
      lastPosition: {x: 0.0, y: 0.0, z: 0.0}
    }
  },

  methods: {
    CalculateData() {
      
    },

    NextTip() {
      $("#tip-container").fadeOut(1000);
      setTimeout(() => {
        const lastTip = this.currentTip;
        let newTip = this.tips[Math.floor(Math.random() * this.tips.length)]; // Pick the next tip
        while (lastTip == newTip) { // Run a while loop, to make sure our new tip isn't the same as our last tip
          newTip = this.tips[Math.floor(Math.random() * this.tips.length)]; // Pick the next tip as our current one matches, our original one.
        }

        $("#tip-container").fadeIn(1000); // Fade back in.
        this.currentTip = newTip; // Update our tip
      }, 1000);
    },

    FormatXP() {
      this.stats.xp = this.stats.xp.toString();
      var pattern = /(-?\d+)(\d{3})/;
      while (pattern.test(this.stats.xp))
      this.stats.xp = this.stats.xp.replace(pattern, "$1,$2");
      return this.stats.xp;
    }
  },
  computed: {},
  mounted() {
    this.currentTip = this.tips[Math.floor(Math.random() * this.tips.length)]; // Pick the first tip
    this.FormatXP();
    $("body").focus();
    console.log("Loading Screen Loaded!");

    window.addEventListener("keydown", function(event) { // Listen for spacebar to change our loading screen tip
      if (event.keyCode == 32) {
        console.log("Spacebar Pressed!");
        LoadScreen.NextTip();
      }
    });

    window.addEventListener('DOMContentLoaded', () => {
      console.log(`Handover Data: ${JSON.stringify(window.nuiHandoverData)}`);
      LoadScreen.player = window.nuiHandoverData.player;
      LoadScreen.kills = window.nuiHandoverData.kills;
      LoadScreen.stats = window.nuiHandoverData.stats;
    });
  }
})