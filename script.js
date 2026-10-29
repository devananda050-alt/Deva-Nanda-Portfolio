// =====================================
// DEVANANDA'S COSMIC PORTFOLIO
// JavaScript interactions
// =====================================

document.addEventListener("DOMContentLoaded", () => {

  // 1. ANIMATED STARFIELD

  const starsContainer = document.getElementById("stars");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!reduceMotion) {
    for (let i = 0; i < 100; i++) {
      const star = document.createElement("span");

      star.className = "star-particle";

      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";

      star.style.animationDuration =
        (2 + Math.random() * 5) + "s";

      star.style.animationDelay =
        (Math.random() * -5) + "s";

      starsContainer.appendChild(star);
    }
  }


  // 2. SCROLL REVEAL ANIMATIONS

  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !reduceMotion) {

    const observer = new IntersectionObserver((entries, obs) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          obs.unobserve(entry.target);
        }

      });

    }, {
      threshold: 0.12
    });

    revealItems.forEach(item => {
      observer.observe(item);
    });

  } else {

    revealItems.forEach(item => {
      item.classList.add("visible");
    });

  }


  // 3. MOBILE NAVIGATION

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";

  });

  // Close the menu after clicking a section.

  navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("open");

      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "☰";

    });

  });


  // 4. LIGHT / DARK THEME

  const themeToggle = document.getElementById("themeToggle");

  const savedTheme = localStorage.getItem("devananda-theme");

  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
  }

  updateThemeButton();

  themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");

    const isLight =
      document.body.classList.contains("light-theme");

    localStorage.setItem(
      "devananda-theme",
      isLight ? "light" : "dark"
    );

    updateThemeButton();

  });

  function updateThemeButton() {

    const isLight =
      document.body.classList.contains("light-theme");

    themeToggle.textContent = isLight ? "☾" : "☼";

    themeToggle.setAttribute(
      "aria-label",
      isLight
        ? "Switch to dark theme"
        : "Switch to light theme"
    );

  }


  // 5. INTERACTIVE SKILL CONSTELLATION

  const skills = {

    html: {
      title: "HTML & CSS",
      icon: "⌘",
      level: 62,
      levelText: "Growing",
      description:
        "Learning to create responsive web pages with semantic HTML, attractive layouts, and polished CSS styling.",
      note:
        "Current focus: responsive layouts, spacing, and accessibility."
    },

    design: {
      title: "UI / UX Design",
      icon: "✧",
      level: 55,
      levelText: "Exploring",
      description:
        "Exploring user-friendly interfaces, visual hierarchy, wireframes, and thoughtful digital experiences.",
      note:
        "Current focus: Figma, wireframes, and prototyping."
    },

    js: {
      title: "JavaScript",
      icon: "JS",
      level: 40,
      levelText: "Building foundations",
      description:
        "Learning to make websites interactive using events, functions, and the Document Object Model.",
      note:
        "Current focus: DOM manipulation and event handling."
    },

    python: {
      title: "Python",
      icon: "Py",
      level: 38,
      levelText: "Building foundations",
      description:
        "Exploring Python for programming fundamentals, problem-solving, and small practical projects.",
      note:
        "Current focus: variables, functions, and core concepts."
    },

    tools: {
      title: "Tools & Git",
      icon: "⌁",
      level: 48,
      levelText: "Practising",
      description:
        "Learning the tools used to create, manage, and publish digital projects.",
      note:
        "Current focus: VS Code, GitHub, and Figma."
    }

  };

  const skillButtons = document.querySelectorAll(".skill-star");

  skillButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

      const skill = skills[button.dataset.skill];

      if (!skill) return;

      // Update the active star.

      skillButtons.forEach(other => {

        const active = other === button;

        other.classList.toggle("active", active);

        other.setAttribute(
          "aria-pressed",
          String(active)
        );

      });

      // Update the information panel.

      document.getElementById("skillIcon").textContent =
        skill.icon;

      document.getElementById("skillNumber").textContent =
        `SKILL ${String(index + 1).padStart(2, "0")} / 05`;

      document.getElementById("skillTitle").textContent =
        skill.title;

      document.getElementById("skillDescription").textContent =
        skill.description;

      document.getElementById("skillLevelText").textContent =
        skill.levelText;

      document.getElementById("skillLevelBar").style.width =
        skill.level + "%";

      document.getElementById("skillNote").textContent =
        skill.note;

    });

  });


  // 6. EXPANDABLE PROJECT CARDS

  document.querySelectorAll(".expand-btn").forEach(button => {

    button.addEventListener("click", () => {

      const details = button.nextElementSibling;

      const isExpanded =
        button.getAttribute("aria-expanded") === "true";

      button.setAttribute(
        "aria-expanded",
        String(!isExpanded)
      );

      details.hidden = isExpanded;

      button.querySelector("span").textContent =
        isExpanded ? "＋" : "−";

      button.childNodes[0].textContent =
        isExpanded
          ? "Explore project "
          : "Close details ";

    });

  });


  // 7. DEVELOPER TERMINAL

  const terminalForm =
    document.getElementById("terminalForm");

  const terminalInput =
    document.getElementById("terminalInput");

  const terminalOutput =
    document.getElementById("terminalOutput");

  const clearButton =
    document.getElementById("clearTerminal");


  // Available terminal commands.

  const commands = {

    help:
      "Available commands: help, about, projects, skills, contact, clear.",

    about:
      "Devananda is a BCA student exploring technology, UI/UX design, and creative digital experiences.",

    projects:
      "Project log: Digital Literacy Hub, StudyMate Planner, and Cosmic Portfolio.",

    skills:
      "Skills in progress: HTML, CSS, JavaScript, UI/UX design, Python, Git, and GitHub.",

    contact:
      "Open the Contact section to find the email button and social profile links."

  };


  function addTerminalLine(message, className = "") {

    const line = document.createElement("p");

    line.textContent = message;

    if (className) {
      line.className = className;
    }

    terminalOutput.appendChild(line);

    terminalOutput.scrollTop =
      terminalOutput.scrollHeight;

  }


  function runCommand(input) {

    const command = input.trim().toLowerCase();

    if (!command) return;

    // Clear the terminal.

    if (command === "clear") {

      terminalOutput.replaceChildren();

      return;

    }

    addTerminalLine(
      "visitor@cosmos:~$ " + command
    );

    if (commands[command]) {

      addTerminalLine(
        commands[command],
        "terminal-result"
      );

    } else {

      addTerminalLine(
        `Command not found: "${command}". Type "help" for commands.`,
        "terminal-error"
      );

    }

  }


  terminalForm.addEventListener("submit", event => {

    event.preventDefault();

    runCommand(terminalInput.value);

    terminalInput.value = "";

  });


  // Quick command buttons.

  document.querySelectorAll(
    ".terminal-shortcuts button"
  ).forEach(button => {

    button.addEventListener("click", () => {

      runCommand(button.dataset.command);

      terminalInput.focus();

    });

  });


  // Clear button.

  clearButton.addEventListener("click", () => {

    terminalOutput.replaceChildren();

    addTerminalLine(
      "Terminal cleared. Type help to begin."
    );

  });


  // 8. GLOWING CURSOR EFFECT

  const cursorGlow =
    document.querySelector(".cursor-glow");

  if (
    cursorGlow &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !reduceMotion
  ) {

    window.addEventListener("pointermove", event => {

      cursorGlow.style.left =
        event.clientX + "px";

      cursorGlow.style.top =
        event.clientY + "px";

    }, {
      passive: true
    });

  }


  // 9. AUTOMATIC COPYRIGHT YEAR

  document.getElementById("year").textContent =
    new Date().getFullYear();

});