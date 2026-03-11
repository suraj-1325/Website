// =============================================
// FIX #2: Removed duplicate EmailJS handler from index.html
// FIX #6: Old invalid EmailJS user ID removed — now using the correct key from index.html
// FIX #9: Removed developer tools blocking (bad practice, harms accessibility & SEO)
// =============================================

$(document).ready(function () {

    // Mobile menu toggle
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // Scroll spy — highlight active nav link
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // Smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear');
    });

    // FIX #2 & #6: Single, clean EmailJS form handler using the correct public key
    // Initialize EmailJS once here with the working key from index.html
    emailjs.init('NFmBulCNn4v1bbvBZ');

    $("#contact-form").submit(function (event) {
        event.preventDefault();

        emailjs.sendForm('service_uerxitf', 'template_rt2lfuv', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Message sent successfully!");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Failed to send message. Please try again.");
            });
    });

});

// Tab visibility: change title & favicon when user switches tabs
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Portfolio | Suraj Tamang";
        $("#favicon").attr("href", "assets/images/hero2.png");
    } else {
        document.title = "Return To Portfolio";
        $("#favicon").attr("href", "assets/images/backs.png");
    }
});


// Typed.js effect
var typed = new Typed(".typing-text", {
    strings: ["SOC Analyst/Engineer", "Information Technology"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});


// Fetch skills or projects from JSON
async function fetchData(type = "skills") {
    let response = type === "skills"
        ? await fetch("skills.json")
        : await fetch("./projects/projects.json");
    const data = await response.json();
    return data;
}

// Render skills into the skills section
function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
            <div class="info">
                <img src="${skill.icon}" alt="${skill.name}" />
                <span>${skill.name}</span>
            </div>
        </div>`;
    });
    skillsContainer.innerHTML = skillHTML;
}

// Render projects into the projects section
function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category !== "android").forEach(project => {
        projectHTML += `
        <div class="box tilt">
            <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="${project.name}" />
            <div class="content">
                <div class="tag">
                    <h3>${project.name}</h3>
                </div>
                <div class="desc">
                    <p>${project.desc}</p>
                    <div class="btns">
                        <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                        <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
                    </div>
                </div>
            </div>
        </div>`;
    });
    projectsContainer.innerHTML = projectHTML;

    VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });

    const srtop = ScrollReveal({ origin: 'top', distance: '80px', duration: 1000, reset: true });
    srtop.reveal('.work .box', { interval: 200 });
}

fetchData().then(data => showSkills(data));
fetchData("projects").then(data => showProjects(data));

// Tilt effect on all .tilt elements
VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });


// =============================================
// FIX #5: Removed server-side nodemailer code that was incorrectly placed in app.js.
// nodemailer runs on Node.js servers only — it cannot run in the browser.
// Your contact form already works via EmailJS (client-side). No nodemailer needed.
// =============================================


// Tawk.to Live Chat
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });
srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .instagram', { interval: 600 });

/* ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });

/* SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });
