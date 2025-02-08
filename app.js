// Function to scroll to home/header section
function scrollToHome() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Scroll to home on page load
window.addEventListener('load', function() {
  window.scrollTo(0, 0);
});

// Also handle when page is refreshed
if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD) {
  window.scrollTo(0, 0);
}

// Handle logo click
document.querySelector('.logo a').addEventListener('click', function(e) {
  e.preventDefault();
  scrollToHome();
});

// Navigation smooth scroll
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    
    // If clicking home link, scroll to top
    if (targetId === '#home') {
      scrollToHome();
      return;
    }
    
    // For other sections
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      const navHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = targetSection.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Mobile menu code
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    const mobileMenu = document.querySelector('.nav-links');
    if (mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
    }
  });
});

// Contact Form Submission
function sendEmail(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // First email: Send the message to you
  emailjs.send("service_78ocuqq", "template_iop4j6j", {
    to_email: "mtonoy1@gmail.com",
    from_name: name,
    from_email: email,
    message: message,
  }).then(
    function(response) {
      console.log("Message sent successfully", response);
      
      // Second email: Send auto-response to the user
      emailjs.send("service_78ocuqq", "template_auto_response", {
        to_email: email,
        to_name: name,
        message: "Hi " + name + ",\n\nThank you for reaching out! I will get back to you as soon as possible.\n\nBest regards,\nNazim Uddin"
      }).then(
        function(response) {
          console.log("Auto-response sent", response);
          showSuccessMessage();
          document.getElementById('contactForm').reset();
        },
        function(error) {
          console.log("Auto-response failed", error);
          showErrorMessage("Message sent, but auto-response failed.");
        }
      );
    },
    function(error) {
      console.log("FAILED", error);
      showErrorMessage("Oops, I'm sorry. Try again later");
    }
  );

  return false;
}

// Function to show success message
function showSuccessMessage() {
  // Create success message element
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.innerHTML = `
    <div class="success-content">
      <i class="fas fa-check-circle"></i>
      <h3>Thank you for your message!</h3>
      <p>I'll get back to you as soon as possible.</p>
    </div>
  `;

  // Add to page
  document.querySelector('.contact-form').appendChild(successDiv);

  // Remove after 5 seconds
  setTimeout(() => {
    successDiv.remove();
  }, 5000);
}

// Add function to show error message
function showErrorMessage(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.innerHTML = `
    <div class="error-content">
      <i class="fas fa-info-circle"></i>
      <h3>Message Not Sent</h3>
      <p>${message}</p>
    </div>
  `;

  document.querySelector('.contact-form').appendChild(errorDiv);

  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
}

// Video hover autoplay functionality
document.addEventListener('DOMContentLoaded', function() {
  // Handle all video containers
  for (let i = 1; i <= 3; i++) {
    const videoContainer = document.getElementById(`videoContainer${i}`);
    const iframe = videoContainer.querySelector('iframe');
    const originalSrc = iframe.src;

    videoContainer.addEventListener('mouseenter', function() {
      // Add autoplay and start from beginning
      iframe.src = originalSrc + '&autoplay=1&start=0';
    });

    videoContainer.addEventListener('mouseleave', function() {
      // Reset video by reloading original source
      iframe.src = originalSrc;
    });
  }
});

// Update Video Slider Functionality
let currentIndex = 0;
const slider = document.querySelector('.video-slider');
const videos = document.querySelectorAll('.slider-video');
let autoSlideInterval;
let isHovered = false;

function updateSlider() {
  videos.forEach((video, index) => {
    video.className = 'slider-video';
    
    if (index === currentIndex) {
      video.classList.add('active');
      if (isHovered) video.classList.add('instant');
    } else if (index === (currentIndex - 1 + videos.length) % videos.length) {
      video.classList.add('prev');
      if (isHovered) video.classList.add('instant');
    } else if (index === (currentIndex + 1) % videos.length) {
      video.classList.add('next');
      if (isHovered) video.classList.add('instant');
    }
  });

  // Update indicator dots
  const dots = document.querySelectorAll('.slider-dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });

  // Remove instant class after transition
  if (isHovered) {
    setTimeout(() => {
      videos.forEach(video => video.classList.remove('instant'));
    }, 50);
  }
}

function slideVideos() {
  if (!isHovered) {
    currentIndex = (currentIndex + 1) % videos.length;
    updateSlider();
  }
}

function startAutoSlide() {
  autoSlideInterval = setInterval(slideVideos, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Initialize slider and start auto-sliding
updateSlider();
startAutoSlide();

// Add hover detection for all videos
document.querySelectorAll('.slider-video').forEach((video) => {
  const iframe = video.querySelector('iframe');
  const originalSrc = iframe.src;

  video.addEventListener('mouseenter', () => {
    // Start playing the video regardless of position
    iframe.src = originalSrc + '&autoplay=1&mute=0';
    isHovered = true;
    stopAutoSlide();  // Stop sliding while video is being watched
  });

  video.addEventListener('mouseleave', () => {
    // Stop the video
    iframe.src = originalSrc;
    isHovered = false;
    startAutoSlide();  // Resume sliding
  });
});

// Add click functionality to dots
document.querySelectorAll('.slider-dot').forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    updateSlider();
  });
});

// Update video hover functionality for folder videos
document.querySelectorAll('.folder-container').forEach(folder => {
  const videos = folder.querySelectorAll('.video-container iframe');
  const originalSrcs = Array.from(videos).map(iframe => iframe.src);

  // Store original video sources
  videos.forEach((iframe, index) => {
    iframe.dataset.originalSrc = originalSrcs[index];
  });

  // Handle folder hover
  folder.addEventListener('mouseleave', () => {
    // Reset all videos in this folder to original state
    videos.forEach(iframe => {
      iframe.src = iframe.dataset.originalSrc;
    });
  });
});

// Handle individual video hover
document.querySelectorAll('.folder-content .video-container').forEach(container => {
  const iframe = container.querySelector('iframe');

  container.addEventListener('mouseenter', () => {
    if (container.closest('.folder-container:hover')) {
      // Only autoplay if folder is still being hovered
      const originalSrc = iframe.dataset.originalSrc;
      
      // Stop other videos
      document.querySelectorAll('.folder-content .video-container iframe').forEach(otherIframe => {
        if (otherIframe !== iframe) {
          otherIframe.src = otherIframe.dataset.originalSrc;
        }
      });
      
      // Play this video
      iframe.src = originalSrc + '&autoplay=1&mute=0';
    }
  });

  container.addEventListener('mouseleave', () => {
    iframe.src = iframe.dataset.originalSrc;
  });
});

// Add character counter functionality
const messageTextarea = document.getElementById('message');
const charCounter = document.querySelector('.char-counter');

messageTextarea.addEventListener('input', function() {
  const remaining = 1000 - this.value.length;
  charCounter.textContent = `${remaining} characters remaining`;
  
  // Optional: Change color when getting close to limit
  if (remaining < 100) {
    charCounter.style.color = 'rgba(255, 193, 7, 0.8)';
  } else {
    charCounter.style.color = 'rgba(255, 255, 255, 0.7)';
  }
});
