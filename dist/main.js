"use strict";

const setPortfoiloTemplate = (src, mainTitle, gitLink, webLink) => {
    return `
    <div class="portfolio-card opacity-0">
                    <div class="portfolio-img-wrapper">
                        <img src="${src}" alt="project-img-1">
                    </div>
                    <div>
                        <h3 class="portfolio-title">${mainTitle}</h3>
                        <div class="space-x-4">
                            <a href="${gitLink}" class="portfolio-card-btn">github</a>
                            <a href="${webLink}" class="portfolio-card-btn">website</a>
                        </div>
                    </div>
                </div>
                `
},
    portfolioWrapper = document.getElementById("profile-wrapper"),
    title = document.getElementById("main-title"),
    hiElem = document.getElementById("say-hi"),
    skillCards = document.querySelectorAll(".skill-card"),
    skillCardsWrapper = document.getElementById("skill-cards-wrapper"),
    footer = document.querySelector("footer"),
    scrollBtn = document.getElementById("scroll-back"),
    portfolioCards = document.getElementsByClassName("portfolio-card"),
    portfolioData = [
        {
            "id": "1",
            "title": "online shop",
            "img-src": "./images/portfolio/shopping.png",
            "website-link": "#",
            "git-link": "#"
        },
        {
            "id": "2",
            "title": "login page",
            "img-src": "./images/portfolio/login-page.png",
            "website-link": "https://pandacode082.github.io/login-page-3D/",
            "git-link": "https://github.com/pandaCode082/login-page-3D"
        },
        {
            "id": "3",
            "title": "cafee shop",
            "img-src": "./images/portfolio/cafee-shop.png",
            "website-link": "https://pandacode082.github.io/coffe-shop-static-page-after-learn-tailwindcss-/",
            "git-link": "https://github.com/pandaCode082/coffe-shop-static-page-after-learn-tailwindcss-"
        },
        {
            "id": "4",
            "title": "wether app",
            "img-src": "./images/portfolio/whter-app.png",
            "website-link": "#",
            "git-link": "#"
        },
        {
            "id": "5",
            "title": "music player",
            "img-src": "./images/portfolio/music-player.png",
            "website-link": "#",
            "git-link": "#"
        },
        {
            "id": "6",
            "title": "todo app",
            "img-src": "./images/portfolio/todo app.png",
            "website-link": "#",
            "git-link": "#"
        }
    ]
let batteryLevel,
    isCharging;
//  ========================================================> Functions <========================================================  \\
function getboundTop(elem) {
    return elem.getBoundingClientRect().top - (window.innerHeight / 1.5);
}

async function windowLoadHandler() {
    setTimeout(() => {
        title.classList.remove("opacity-0", "translate-y-14");
        hiElem.classList.remove("opacity-0", "-translate-x-24");
    }, 100);

    await setInterval(() => {
        window.navigator.getBattery().then(data => {
            batteryLevel = data["level"];
            isCharging = data["charging"];
        });
    }, 100);
    let batteryCendition = batteryLevel < 0.50 || isCharging;

    document.body.addEventListener("mousemove", event => {

        if (window.innerWidth < 768 || batteryCendition) {
            return false;
        }

        if (window.navigator.deviceMemory < 4) {
            return false;
        }

        document.body.insertAdjacentHTML("beforebegin", `

                    <span class="fallower" style="left:${event.pageX}px;top:${event.pageY}px"></span>
        `);

        for (let item of document.getElementsByClassName("fallower")) {
            item.addEventListener("animationend", event => item.remove());
        }
    });
}

//  ========================================================> Event listeners <========================================================  \\

window.addEventListener("load", () => {

    for (let item of portfolioData) {
        portfolioWrapper.insertAdjacentHTML("beforeend", setPortfoiloTemplate(item["img-src"], item["title"], item["git-link"], item["website-link"]));
    }
})


window.addEventListener("load", windowLoadHandler);

window.addEventListener("scroll", event => {
    // ------------------------------------------------> portfolioCards
    for (let item of portfolioCards) {
        if (getboundTop(item) < 0) {
            item.classList.remove("opacity-0");
        } else {
            item.classList.add("opacity-0");
        }
    }
    //  -----------------------------------------------> skillCards
    if (getboundTop(skillCardsWrapper) < 0) {
        for (let item of skillCards) {
            item.classList.remove("opacity-0", "translate-y-64");
        }
    } else {
        for (let item of skillCards) {
            item.classList.add("opacity-0", "translate-y-64");
        }
    }
    // -------------------------------------------------> footer
    if (footer.getBoundingClientRect().top - (window.innerHeight + 100) < 0) {
        footer.style.cssText = `transform:translateY(0px);`;
    } else {
        footer.style.cssText = `transform:translateY(200px);`;
    }
});
//  =============> smooth scroll
scrollBtn.addEventListener("click", e => {
    window.scrollTo(0, 0);
})