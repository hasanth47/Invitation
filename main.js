/* وائل وملاك — إعدادات الدعوة
   غيّر التاريخ ورقم واتساب وبيانات القاعة قبل مشاركة الرابط.
*/
const wedding = {
  date: "2026-10-21T18:00:00+02:00",
  names: "وائل وملاك",
  whatsapp: "31612345678"
};

const target = new Date(wedding.date).getTime();

function updateCountdown() {
  let diff = target - Date.now();
  if (diff < 0) diff = 0;

  const values = {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000)
  };

  Object.entries(values).forEach(([id, value]) => {
    document.getElementById(id).textContent = String(value).padStart(2, "0");
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);

const intro = document.getElementById("intro");
const envelope = document.getElementById("envelope");
const bird = document.getElementById("bird");
let opened = false;

function burstParticles() {
  const rect = envelope.getBoundingClientRect();
  const x0 = rect.left + rect.width / 2;
  const y0 = rect.top + rect.height / 2;

  for (let i = 0; i < 34; i++) {
    const particle = document.createElement("i");
    particle.className = "particle";
    particle.style.left = `${x0}px`;
    particle.style.top = `${y0}px`;

    const angle = Math.random() * Math.PI * 2;
    const distance = 70 + Math.random() * 220;
    particle.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
    particle.style.animationDelay = `${Math.random() * 0.28}s`;

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 2300);
  }
}

function openInvitation() {
  if (opened) return;
  opened = true;

  intro.classList.add("opening");
  document.body.classList.add("opened");
  burstParticles();

  bird.classList.remove("fly");
  void bird.offsetWidth;
  bird.classList.add("fly");

  setTimeout(() => {
    intro.classList.add("gone");
    document.body.classList.remove("locked");
  }, 1850);
}

envelope.addEventListener("click", openInvitation);
envelope.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openInvitation();
  }
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("in-view");
    entry.target.querySelectorAll(".info-card").forEach((card, index) => {
      card.style.transitionDelay = `${index * 0.12}s`;
    });
  });
}, { threshold: 0.17 });

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

/* بتلات ورد متحركة */
for (let i = 0; i < 18; i++) {
  const petal = document.createElement("i");
  petal.className = "float-petal";
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.animationDuration = `${13 + Math.random() * 15}s`;
  petal.style.animationDelay = `${-Math.random() * 24}s`;
  petal.style.setProperty("--drift", `${Math.random() * 130 - 65}px`);
  petal.style.transform = `scale(${0.55 + Math.random() * 0.9})`;

  document.querySelectorAll(".scene").forEach(scene => {
    scene.appendChild(petal.cloneNode(true));
  });
}

/* شريط يوضح مقدار التمرير */
const progress = document.getElementById("progress");
window.addEventListener("scroll", () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${maxScroll > 0 ? window.scrollY / maxScroll * 100 : 0}%`;
}, { passive: true });

function replyLink(message) {
  const text = encodeURIComponent(`مرحباً، بخصوص دعوة زفاف ${wedding.names}: ${message}`);
  return `https://wa.me/${wedding.whatsapp}?text=${text}`;
}
document.getElementById("acceptBtn").href = replyLink("يسعدني تأكيد الحضور.");
document.getElementById("declineBtn").href = replyLink("أعتذر عن الحضور، وأتمنى لكم يوماً جميلاً.");

/* زر الصوت توضيحي إلى أن تضيف ملف موسيقى مرخصاً */
document.getElementById("soundToggle").addEventListener("click", () => {
  alert("الموسيقى اختيارية. أضف ملفاً صوتياً مرخّصاً إلى المشروع واربطه بهذا الزر لتشغيل الموسيقى.");
});
