document.addEventListener('DOMContentLoaded', () => {


    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                cookie = cookie.trim();
                if (cookie.startsWith(name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.main-nav');

    if (burger && nav) {
        const links = nav.querySelectorAll('a');
    

        burger.addEventListener('click', () => {
            nav.classList.toggle('open');
            burger.classList.toggle('open');
            document.body.classList.toggle('menu-open');
        });

        links.forEach(link => {
           link.addEventListener('click', () => {
               nav.classList.remove('open');
               burger.classList.remove('open');
               document.body.classList.remove('menu-open');
    });
  });
}
const form= document.getElementById('contactForm');
const successMessage = document.querySelector('.form-success');
const formHero = document.querySelector('.form-hero');

if (form && successMessage) {
   form.addEventListener('submit', function(e)  {
        e.preventDefault();
        const firstname = form.querySelector('[name="first-name"]').value.trim();
        const lastname = form.querySelector('[name="last-name"]').value.trim();
        const email = form.querySelector('[name="email"]').value.trim();
        const message = form.querySelector('[name="message"]').value.trim();

        const projectTypeInput = form.querySelector('input[name="projekt-type"]:checked');
        const project_type = projectTypeInput ? projectTypeInput.value : null;

        if (!firstname || !lastname || !email) {
            alert("Bitte füllen Sie alle Pflichtfelder aus");
            return;
        }
        if (!project_type) {
            alert ("Bitte wählen Sie die Art des Projekts");
            return;
        }
        const formData ={
            name:`${firstname} ${lastname}`,
            email: email,
            project_type: project_type,
            message: message
        };
        console.log("Sending:", formData);

        fetch("/api/contact/", {
            method:"POST",
            headers: {"Content-Type": "application/json",
                    "X-CSRFToken": getCookie("csrftoken"),
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Server error");
            }
            return response.json();
        })
        .then(data => {
            console.log("SUCCESS", data);

            form.style.display = "none";

            if (formHero) {
                formHero.style.display = "none";
            }
            successMessage.classList.add("show");
        })
        .catch(error => {
            console.error(error);
            alert("Serverfehler");
        });
    });
}

const newsletterForm = document.getElementById("newsletterForm");
const newsletterContent = document.getElementById("newsletterContent");
const newsletterSuccess = document.getElementById("newsletterSuccess");

if (newsletterForm && newsletterContent && newsletterSuccess) {
    newsletterForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const emailInput = newsletterForm.querySelector('input[name="email"]');
        const email = emailInput.value.trim();

        if (!email) {
            alert("Bitte Email eingeben");
            return;
        }
        fetch("/api/newsletter/", {
            method:"POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify({email: email})
        })
        .then(response => response.json())
        .then( data => {
            console.log("Newsletter OK:", data);
            newsletterContent.style.display = "none";
            newsletterSuccess.style.display = "block";
        })
        .catch(error => {
            console.error(error);
            alert("Serverfehler");
        });
        
    });
}

const cards = document.querySelectorAll('.card');
if (cards.length > 0) {
    let currentIndex = 0;
    let intervalId = null;

    function startAutoHighlight(){
        intervalId = setInterval(() =>{
            cards.forEach(card => card.classList.remove('is-active'));
            cards[currentIndex].classList.add('is-active');
            currentIndex = (currentIndex + 1) % cards.length;
        },2000)
    }

function stopAutoHighlight() {
    clearInterval(intervalId);
    cards.forEach(card => card.classList.remove('is-active'));
}

cards.forEach(card => {
    card.addEventListener('mouseenter', stopAutoHighlight);
    card.addEventListener('mouseleave', startAutoHighlight);
});

startAutoHighlight();
}
const shortForm = document.getElementById("contactShortForm");
const shortContent = document.getElementById("contactContent");
const shortSuccess = document.getElementById("contactSuccess");

if (shortForm && shortContent && shortSuccess) {
    shortForm.addEventListener("submit", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const name = shortForm.querySelector('input[name="name"]').value.trim();
        const email = shortForm.querySelector('input[name="email"]').value.trim();
        const message = shortForm.querySelector('textarea[name="message"]').value.trim();

        if (!name || !email || !message) {
            alert("Bitte alle felder ausfüllen");
            return;
        }
        fetch("http://127.0.0.1:8000/api/short/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Server error");
            }
            console.log("Success");

            shortContent.style.display ="none";
            shortSuccess.classList.add("show");
        })
        .then(data => {
            console.log("Short contact Ok:", data);
            
        })
        .catch(error => {
            console.error("REAL error:", error);
        });
    });
   }
});
