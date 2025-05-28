// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Fermer le menu mobile lors du clic sur un lien
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('active');
    navMenu?.classList.remove('active');
  });
});

// Carrousel de témoignages
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.classList.toggle('active', i === index);
  });
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
  showTestimonial(currentTestimonial);
}

function prevTestimonial() {
  currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
  showTestimonial(currentTestimonial);
}

// Contrôles du carrousel
document.querySelector('.next-btn')?.addEventListener('click', nextTestimonial);
document.querySelector('.prev-btn')?.addEventListener('click', prevTestimonial);

// Auto-play du carrousel (optionnel)
setInterval(nextTestimonial, 8000);

// FAQ Système
document.querySelectorAll('.faq-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // Retirer la classe active de tous les onglets
    document.querySelectorAll('.faq-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.faq-category').forEach(c => c.classList.remove('active'));
    
    // Ajouter la classe active à l'onglet cliqué
    tab.classList.add('active');
    
    // Afficher la catégorie correspondante
    const category = tab.getAttribute('data-category');
    document.getElementById(category)?.classList.add('active');
  });
});

// FAQ Questions
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Fermer toutes les autres questions
    document.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('active');
    });
    
    // Ouvrir/fermer la question cliquée
    if (!isActive) {
      faqItem.classList.add('active');
    }
  });
});

// Système de réservation (toggle entre Calendly et formulaire)
document.querySelectorAll('.booking-method').forEach(method => {
  method.addEventListener('click', () => {
    // Retirer active de toutes les méthodes
    document.querySelectorAll('.booking-method').forEach(m => m.classList.remove('active'));
    document.querySelectorAll('.booking-content').forEach(c => c.classList.remove('active'));
    
    // Activer la méthode sélectionnée
    method.classList.add('active');
    const methodType = method.getAttribute('data-method');
    document.getElementById(`${methodType}-booking`)?.classList.add('active');
  });
});

// Formulaire de réservation
document.querySelector('.reservation-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Ici vous pouvez ajouter la logique d'envoi du formulaire
  // Par exemple, envoi via EmailJS ou vers votre backend
  
  alert('Merci pour votre demande ! Nous vous contacterons dans les plus brefs délais.');
  
  // Réinitialiser le formulaire
  e.target.reset();
});

// Animation au scroll (Intersection Observer)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observer les éléments à animer
document.querySelectorAll('.service-card, .gallery-item, .testimonial, .cert-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Smooth scroll pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Gestion du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
  // Fermer le menu mobile si on passe en desktop
  if (window.innerWidth > 768) {
    hamburger?.classList.remove('active');
    navMenu?.classList.remove('active');
  }
});

// Lazy loading pour les images (si pas de support natif)
if ('loading' in HTMLImageElement.prototype) {
  // Le navigateur supporte le lazy loading natif
  console.log('Lazy loading natif supporté');
} else {
  // Fallback pour les navigateurs plus anciens
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Gestion des erreurs JavaScript
window.addEventListener('error', (e) => {
  console.error('Erreur JavaScript:', e.error);
  // En production, vous pourriez envoyer ces erreurs à un service de monitoring
});

// Performance: Preload des ressources critiques
const preloadLinks = [
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@300;400;600;700&display=swap'
];

preloadLinks.forEach(href => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = href;
  document.head.appendChild(link);
});

console.log('🌸 Site Instant Beauté chargé avec succès !');
