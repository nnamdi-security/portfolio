/* ================================================================
   NNAMDI — PORTFOLIO JAVASCRIPT
   script.js
   ================================================================
   TABLE OF CONTENTS
   ---------------------------------------------------------
   1.  DOM SELECTION — grab all elements we need
   2.  NAVBAR SCROLL EFFECT — shadow on scroll
   3.  MOBILE HAMBURGER MENU
   4.  ACTIVE NAV LINK — highlights current section
   5.  SCROLL FADE-IN ANIMATIONS (Intersection Observer)
   6.  HERO ROLE TEXT TYPEWRITER EFFECT
   7.  BACK-TO-TOP BUTTON
   8.  CONTACT FORM VALIDATION
   9.  FOOTER YEAR — auto-updates the copyright year
   ================================================================ */

/* ================================================================
   A NOTE ON HOW THIS FILE IS STRUCTURED
   ----------------------------------------------------------------
   All the code runs inside DOMContentLoaded. This event fires once
   the HTML has been fully parsed — so we know every element we
   target with querySelector actually exists before we try to use it.
   ================================================================ */
document.addEventListener('DOMContentLoaded', function () {


  /* ==============================================================
     1. DOM SELECTION
     --------------------------------------------------------------
     We collect references to all the elements we'll interact with
     at the top of the file. This is cleaner than scattering
     querySelector calls throughout the code.
  ============================================================== */
  const navbar      = document.querySelector('.navbar');
  const hamburger   = document.getElementById('hamburger');
  const navMenu     = document.getElementById('nav-menu');
  const navLinks    = document.querySelectorAll('.nav-link');
  const sections    = document.querySelectorAll('main section[id]');
  const fadeEls     = document.querySelectorAll('.fade-in');
  const backToTop   = document.getElementById('back-to-top');
  const contactForm = document.getElementById('contact-form');
  const footerYear  = document.getElementById('footer-year');
  const roleTextEl  = document.getElementById('role-text');


  /* ==============================================================
     2. NAVBAR SCROLL EFFECT
     --------------------------------------------------------------
     We listen to the window "scroll" event. When the user has
     scrolled more than 20px, we add the "scrolled" class to the
     navbar, which applies a box-shadow in CSS.
  ============================================================== */
  window.addEventListener('scroll', handleNavbarScroll);

  function handleNavbarScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Run once on load in case the page is already scrolled (e.g. after refresh)
  handleNavbarScroll();


  /* ==============================================================
     3. MOBILE HAMBURGER MENU
     --------------------------------------------------------------
     Clicking the hamburger button toggles the .open class on both
     the button (to animate the X) and the nav-menu (to slide it in).
     We also update aria-expanded for accessibility — screen readers
     announce "expanded" or "collapsed" to the user.
  ============================================================== */
  if (hamburger && navMenu) {

    hamburger.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      // Update aria-expanded to match open state
      hamburger.setAttribute('aria-expanded', isOpen.toString());
    });

    // Close the menu when any nav link is clicked (smooth scroll then close)
    navLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close the menu if the user clicks anywhere outside the nav
    document.addEventListener('click', function (event) {
      const clickedOutside =
        !navbar.contains(event.target);
      if (clickedOutside) {
        closeMenu();
      }
    });
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }


  /* ==============================================================
     4. ACTIVE NAV LINK — highlights the current section
     --------------------------------------------------------------
     We use IntersectionObserver to watch each section. When a
     section is at least 40% visible in the viewport, we mark its
     corresponding nav link as "active" by adding the CSS class.

     This is better than using the scroll event for this purpose
     because IntersectionObserver is handled off the main thread —
     it doesn't cause jank when the user scrolls fast.
  ============================================================== */
  const sectionObserverOptions = {
    // rootMargin shrinks the "trigger zone" so the link activates
    // when the section is well into view, not just barely visible.
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Find the nav link whose href matches this section's id
        const activeLink = document.querySelector(
          `.nav-link[href="#${entry.target.id}"]`
        );

        // Remove active from all links first
        navLinks.forEach(function (link) {
          link.classList.remove('active');
        });

        // Add active to the matching link (if it exists in nav)
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, sectionObserverOptions);

  // Start observing each section
  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });


  /* ==============================================================
     5. SCROLL FADE-IN ANIMATIONS
     --------------------------------------------------------------
     Elements with the class "fade-in" start at opacity:0 and
     shifted down (defined in CSS). When they enter the viewport,
     we add the "visible" class which triggers the CSS transition.

     threshold: 0.15 means the animation fires when 15% of the
     element is visible — feels natural and not too early.
  ============================================================== */
  const fadeObserverOptions = {
    threshold: 0.15
  };

  const fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Once animated in, we stop observing — no need to watch it anymore.
        // This is a performance optimisation.
        fadeObserver.unobserve(entry.target);
      }
    });
  }, fadeObserverOptions);

  // Observe all elements that should fade in on scroll
  fadeEls.forEach(function (el) {
    fadeObserver.observe(el);
  });


  /* ==============================================================
     6. HERO ROLE TEXT — TYPEWRITER EFFECT
     --------------------------------------------------------------
     We cycle through an array of phrases, "typing" each one out
     character by character, then deleting it before moving to the
     next. This creates the classic developer portfolio typewriter.

     Key concepts used:
     - setTimeout: delays code execution by a given milliseconds
     - Closures: the inner functions remember `phraseIndex` and
       `charIndex` from their surrounding scope
  ============================================================== */
  if (roleTextEl) {
    // The phrases to cycle through
    const phrases = [
      'web experiences.',
      'clean interfaces.',
      'accessible code.',
      'ideas into products.',
      'the future of Nigeria.'
    ];

    let phraseIndex = 0;   // Which phrase we're currently on
    let charIndex   = 0;   // How many characters have been typed so far
    let isDeleting  = false;

    // Typing speed in milliseconds
    const TYPE_SPEED   = 80;
    const DELETE_SPEED = 40;
    const PAUSE_END    = 1800;  // Pause at end of a phrase before deleting
    const PAUSE_START  = 400;   // Pause before typing the next phrase

    function typeWriter() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        // Remove one character
        charIndex--;
        roleTextEl.textContent = currentPhrase.substring(0, charIndex);

        if (charIndex === 0) {
          // Finished deleting — move to next phrase and start typing
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(typeWriter, PAUSE_START);
          return;
        }
        setTimeout(typeWriter, DELETE_SPEED);

      } else {
        // Add one character
        charIndex++;
        roleTextEl.textContent = currentPhrase.substring(0, charIndex);

        if (charIndex === currentPhrase.length) {
          // Finished typing — pause then start deleting
          isDeleting = true;
          setTimeout(typeWriter, PAUSE_END);
          return;
        }
        setTimeout(typeWriter, TYPE_SPEED);
      }
    }

    // Start the typewriter after a short initial delay
    setTimeout(typeWriter, 1000);
  }


  /* ==============================================================
     7. BACK-TO-TOP BUTTON
     --------------------------------------------------------------
     The button appears after scrolling 400px down, and smoothly
     returns the user to the top when clicked.
  ============================================================== */
  if (backToTop) {

    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        // Remove hidden attribute first so CSS transition can run
        backToTop.removeAttribute('hidden');
        // Small delay so the browser renders the element before animating
        requestAnimationFrame(function () {
          backToTop.classList.add('show');
        });
      } else {
        backToTop.classList.remove('show');
        // Wait for the fade-out transition to finish before adding hidden
        backToTop.addEventListener('transitionend', function handler() {
          if (!backToTop.classList.contains('show')) {
            backToTop.setAttribute('hidden', '');
          }
          backToTop.removeEventListener('transitionend', handler);
        });
      }
    });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ==============================================================
     8. CONTACT FORM VALIDATION
     --------------------------------------------------------------
     We validate the form manually rather than relying on browser
     defaults, so we can:
     - Show styled error messages in our own design
     - Control exactly when and how errors appear
     - Provide a better experience for keyboard / screen reader users

     Steps:
     1. Intercept the submit event with preventDefault()
     2. Validate each field
     3. If errors exist, show them and stop
     4. If valid, simulate sending and show success message
  ============================================================== */
  if (contactForm) {

    contactForm.addEventListener('submit', function (event) {
      // Prevent the default form submission (which would reload the page)
      event.preventDefault();

      // Clear any previous error state
      clearErrors();

      // Run validation — returns true if all fields are valid
      const isValid = validateForm();

      if (isValid) {
        // In a real project you'd send data to a server here using fetch().
        // For now, we simulate a successful send.
        simulateSend();
      }
    });

    // --- Validation helper functions ---

    /**
     * Validates all form fields.
     * Returns true if everything is valid, false if any errors found.
     */
    function validateForm() {
      let valid = true;

      // Get current values, trimming whitespace
      const name    = document.getElementById('name').value.trim();
      const email   = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      // Name: required, minimum 2 characters
      if (name.length < 2) {
        showError('name', 'Please enter your name (at least 2 characters).');
        valid = false;
      }

      // Email: required, must match a basic email pattern
      // This regex checks for: something@something.something
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showError('email', 'Please enter a valid email address.');
        valid = false;
      }

      // Subject: required, minimum 3 characters
      if (subject.length < 3) {
        showError('subject', 'Please enter a subject (at least 3 characters).');
        valid = false;
      }

      // Message: required, minimum 10 characters
      if (message.length < 10) {
        showError('message', 'Please enter a message (at least 10 characters).');
        valid = false;
      }

      return valid;
    }

    /**
     * Shows an error message for a given field.
     * Also adds the .error CSS class to the input for visual styling.
     *
     * @param {string} fieldId - The id of the input element
     * @param {string} message - The error text to display
     */
    function showError(fieldId, message) {
      const input    = document.getElementById(fieldId);
      const errorEl  = document.getElementById(fieldId + '-error');

      if (input)   input.classList.add('error');
      if (errorEl) errorEl.textContent = message;
    }

    /**
     * Clears all error messages and removes .error class from inputs.
     */
    function clearErrors() {
      // Remove error class from all inputs
      contactForm.querySelectorAll('.form-input').forEach(function (input) {
        input.classList.remove('error');
      });

      // Clear all error message elements
      contactForm.querySelectorAll('.form-error').forEach(function (el) {
        el.textContent = '';
      });
    }

    /**
     * Simulates sending the form.
     * In production: replace this with a real fetch() POST request.
     */
    function simulateSend() {
      const submitBtn  = document.getElementById('submit-btn');
      const successMsg = document.getElementById('form-success');

      // Show loading state on the button
      submitBtn.disabled = true;
      submitBtn.querySelector('.btn-text').textContent = 'Sending...';

      // After 1.5 seconds, show success and reset the form
      setTimeout(function () {
        // Hide the submit button
        submitBtn.hidden = true;

        // Show the success message
        successMsg.removeAttribute('hidden');

        // Reset the form fields
        contactForm.reset();

        // After 5 seconds, restore the original button state
        setTimeout(function () {
          submitBtn.disabled = false;
          submitBtn.hidden   = false;
          submitBtn.querySelector('.btn-text').textContent = 'Send Message';
          successMsg.setAttribute('hidden', '');
        }, 5000);

      }, 1500);
    }

    // --- Real-time validation: clear error when user starts typing ---
    // This gives instant positive feedback as the user corrects mistakes.
    contactForm.querySelectorAll('.form-input').forEach(function (input) {
      input.addEventListener('input', function () {
        // Remove error state as soon as the user types anything
        input.classList.remove('error');
        const errorEl = document.getElementById(input.id + '-error');
        if (errorEl) errorEl.textContent = '';
      });
    });

  }
  // END contact form


  /* ==============================================================
     9. FOOTER YEAR — auto-updates copyright year
     --------------------------------------------------------------
     Instead of hardcoding "2024" in HTML (which gets stale),
     we inject the current year dynamically.
  ============================================================== */
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }


}); // END DOMContentLoaded
