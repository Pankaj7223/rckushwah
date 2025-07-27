// DOM Elements
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const navbar = document.getElementById("navbar")
const advisorForm = document.getElementById("advisor-form")
const contactForm = document.getElementById("contact-form")
const modal = document.getElementById("success-modal")
const modalMessage = document.getElementById("modal-message")

// Mobile Menu Toggle
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  hamburger.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    hamburger.classList.remove("active")
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
    navbar.style.backdropFilter = "blur(10px)"
  } else {
    navbar.style.backgroundColor = "#ffffff"
    navbar.style.backdropFilter = "none"
  }
})

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const offsetTop = element.offsetTop - 80 // Account for fixed navbar
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// Add click event listeners to navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const targetId = this.getAttribute("href").substring(1)
    scrollToSection(targetId)
  })
})

// WhatsApp functionality
function openWhatsApp() {
  const phoneNumber = "919893711903"
  const message = "Hello! I am interested in LIC insurance plans. Please provide more information."
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, "_blank")
}

// Form validation
function validateForm(form) {
  const requiredFields = form.querySelectorAll("[required]")
  let isValid = true

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      field.style.borderColor = "#ef4444"
      isValid = false
    } else {
      field.style.borderColor = "#e2e8f0"
    }
  })

  // Email validation
  const emailFields = form.querySelectorAll('input[type="email"]')
  emailFields.forEach((field) => {
    if (field.value && !isValidEmail(field.value)) {
      field.style.borderColor = "#ef4444"
      isValid = false
    }
  })

  // Phone validation
  const phoneFields = form.querySelectorAll('input[type="tel"]')
  phoneFields.forEach((field) => {
    if (field.value && !isValidPhone(field.value)) {
      field.style.borderColor = "#ef4444"
      isValid = false
    }
  })

  return isValid
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function isValidPhone(phone) {
  const phoneRegex = /^[+]?[\d\s\-()]{10,}$/
  return phoneRegex.test(phone)
}

// Show loading state
function showLoading(button) {
  const originalText = button.innerHTML
  button.innerHTML = '<span class="spinner"></span>Submitting...'
  button.disabled = true
  return originalText
}

// Hide loading state
function hideLoading(button, originalText) {
  button.innerHTML = originalText
  button.disabled = false
}

// Show success modal
function showModal(message) {
  modalMessage.textContent = message
  modal.style.display = "block"
}

// Close modal
function closeModal() {
  modal.style.display = "none"
}

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal()
  }
})

// Advisor form submission
if (advisorForm) {
  advisorForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    if (!validateForm(advisorForm)) {
      showModal("Please fill in all required fields correctly.")
      return
    }

    const submitButton = advisorForm.querySelector('button[type="submit"]')
    const originalText = showLoading(submitButton)

    try {
      const formData = new FormData(advisorForm)

      const response = await fetch("/submit_advisor_application", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      hideLoading(submitButton, originalText)

      if (result.success) {
        showModal(result.message)
        advisorForm.reset()
      } else {
        showModal(result.message || "There was an error submitting your application. Please try again.")
      }
    } catch (error) {
      hideLoading(submitButton, originalText)
      showModal("There was an error submitting your application. Please try again.")
      console.error("Error:", error)
    }
  })
}

// Contact form submission
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    if (!validateForm(contactForm)) {
      showModal("Please fill in all required fields correctly.")
      return
    }

    const submitButton = contactForm.querySelector('button[type="submit"]')
    const originalText = showLoading(submitButton)

    try {
      const formData = new FormData(contactForm)

      const response = await fetch("/submit_contact_form", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      hideLoading(submitButton, originalText)

      if (result.success) {
        showModal(result.message)
        contactForm.reset()
      } else {
        showModal(result.message || "There was an error sending your message. Please try again.")
      }
    } catch (error) {
      hideLoading(submitButton, originalText)
      showModal("There was an error sending your message. Please try again.")
      console.error("Error:", error)
    }
  })
}

// Plan benefits modal (placeholder functionality)
document.querySelectorAll(".plan-btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    const planCard = e.target.closest(".plan-card")
    const planTitle = planCard.querySelector(".plan-title").textContent
    showModal(`Detailed benefits for ${planTitle} will be displayed here. Contact us for more information!`)
  })
})

// Blog read more functionality
document.querySelectorAll(".blog-read-more").forEach((button) => {
  button.addEventListener("click", (e) => {
    const blogCard = e.target.closest(".blog-card")
    const blogTitle = blogCard.querySelector(".blog-title").textContent
    showModal(`Full article "${blogTitle}" would be displayed here. This is a demo version.`)
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".plan-card, .testimonial-card, .blog-card, .feature-item")
  animateElements.forEach((el) => observer.observe(el))
})

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)
  const timer = setInterval(() => {
    start += increment
    if (start >= target) {
      element.textContent = target + (element.textContent.includes("+") ? "+" : "")
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(start) + (element.textContent.includes("+") ? "+" : "")
    }
  }, 16)
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = Number.parseInt(entry.target.textContent)
      animateCounter(entry.target, target)
      counterObserver.unobserve(entry.target)
    }
  })
})

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-number, .achievement-number")
  counters.forEach((counter) => counterObserver.observe(counter))
})

// Form field focus effects
document.querySelectorAll("input, select, textarea").forEach((field) => {
  field.addEventListener("focus", () => {
    field.parentElement.classList.add("focused")
  })

  field.addEventListener("blur", () => {
    field.parentElement.classList.remove("focused")
  })
})

// Error handling for images
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", () => {
    img.src =
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4="
  })
})

console.log("LIC Agent Portfolio website loaded successfully!")
