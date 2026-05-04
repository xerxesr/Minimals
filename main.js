/**
 * MINIMALS - Main Logic
 * Refactored into modular functions
 */

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    initNavigation();
    initLanguage();
    initAnimations();
    initBuyButtons();
    initParallax();
}

/**
 * PAGE NAVIGATION
 */
let currentPage = 'vision';

function showPage(pageId, elementId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }

    currentPage = pageId;

    if (elementId) {
        // Small delay to ensure page is visible before scrolling
        setTimeout(() => {
            const element = document.getElementById(elementId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 50);
    } else {
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

function initNavigation() {
    window.showPage = showPage;

    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    document.addEventListener('keydown', (e) => {
        const pages = ['vision', 'animals', 'habitats'];
        const currentIndex = pages.indexOf(currentPage);

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            const nextIndex = (currentIndex + 1) % pages.length;
            showPage(pages[nextIndex]);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            const prevIndex = currentIndex === 0 ? pages.length - 1 : currentIndex - 1;
            showPage(pages[prevIndex]);
        }
    });
}

/**
 * INTERNATIONALIZATION (I18N)
 */
let currentLanguage = 'de';

const translationData = {
    de: {
        'nav-vision': 'Vision',
        'nav-animals': 'Tiere',
        'nav-habitats': 'Habitate',
        'hero-title': 'Safari-Feeling für Zuhause',
        'hero-subtitle': 'Erleben Sie die Magie der Wildnis in Ihrem Wohnzimmer mit unseren ethisch entwickelten Mini-Wildtieren',
        'story-title': 'Meine Vision',
        'story-intro': 'Als ich das erste Mal in der Serengeti stand und eine Elefantenherde in der Abendsonne beobachtete, war ich überwältigt von der unglaublichen Schönheit und Majestät dieser Geschöpfe.',
        'story-feeling': 'In diesem Moment dachte ich mir: Diese Erfahrung, diese tiefe Verbindung zur Natur und ihren wundervollen Lebewesen – das muss ich allen Menschen näherbringen. Jeder sollte die Möglichkeit haben, die Schönheit der Schöpfung zu erleben und zu verstehen, warum diese Tiere und ihre Habitate unbedingt erhalten werden müssen.',
        'story-science': 'Genau deshalb bin ich Biotechnologe geworden. Jahre der Forschung und Entwicklung haben uns ermöglicht, durch ethische Gentechnik diese wundervollen Miniatur-Versionen zu schaffen – perfekte Begleiter, die das Safari-Feeling direkt in unser Zuhause bringen, ohne der Natur zu schaden.',
        'story-impact': 'Es ist herzzerwärmend zu sehen, wie unser Konzept aufgeht: Kinder, die zum ersten Mal einen Mini-Elefanten streicheln und dabei Respekt für Wildtiere entwickeln. Stadtbewohner, die nach einem stressigen Tag nach Hause kommen und von ihrem Mini-Zebra begrüßt werden. Und besonders bewegend – Bewohner in Altersheimen, deren Augen wieder leuchten, wenn eine Mini-Giraffe sanft an ihrer Hand knabbert.',
        'story-mission': 'MINIMALS ist mehr als nur ein Haustier – es ist eine Brücke zwischen Mensch und Natur, ein Weg, die Wildnis zu ehren und gleichzeitig ihre Schönheit für alle zugänglich zu machen.',
        'signature': '– Dr. Sarah Nakamura, Gründerin & Biotechnologin, MINIMALS',
        'testimonials-title': 'Erfahrungen unserer Kunden',
        'category-child': 'Kinder',
        'testimonial-child': '"Mein Mini-Elefant Peanut ist mein bester Freund! Ich beobachte ihn stundenlang in seinem sicheren Glas-Vivarium. Es ist wie ein eigener kleiner Zoo in meinem Zimmer!"',
        'author-child': '– Emma Schulze, 8 Jahre, München',
        'category-urban': 'Stadtbewohner',
        'testimonial-urban': '"Nach einem 12-Stunden-Tag ist es das Beste, Zara beim fröhlichen Laufen auf dem Teppich zuzusehen. Sie hat ihr großes Habitat auf dem Schreibtisch, aber liebt den Auslauf."',
        'author-urban': '– Marcus Weber, 34, Berlin',
        'category-senior': 'Altersheim-Bewohner',
        'testimonial-senior': '"Lilly streckt ihren Hals oft aus ihrem offenen Habitat, um mich zu begrüßen. Diese sanfte Interaktion gibt mir jeden Tag so viel Lebensfreude."',
        'author-senior': '– Hildegard Schmidt, 78, Seniorenheim Rosengarten',
        'animals-title': 'Unsere Mini-Wildtiere',
        'elephant-name': 'Mini-Elefant',
        'elephant-desc': 'Nur 20cm hoch, aber mit dem vollen Charme eines echten Elefanten. Liebt es, durch Ihr Wohnzimmer zu wandern und kleine Tricks zu lernen.',
        'elephant-buy': 'Jetzt vorbestellen',
        'elephant-habitat': 'Zum passenden Habitat',
        'giraffe-name': 'Mini-Giraffe',
        'giraffe-desc': '20cm Schulterhöhe, perfekt um auf Ihrem Sofa zu entspannen und gelegentlich an Zimmerpflanzen zu knabbern.',
        'giraffe-buy': 'Jetzt vorbestellen',
        'giraffe-habitat': 'Zum passenden Habitat',
        'zebra-name': 'Mini-Zebra',
        'zebra-desc': 'Das perfekte Haustier für alle, die etwas Besonderes suchen. Energiegeladen und verspielt, 20cm Größe.',
        'zebra-buy': 'Jetzt vorbestellen',
        'zebra-habitat': 'Zum passenden Habitat',
        'eagle-name': 'Mini-Adler',
        'eagle-desc': 'Majestätisch wie ein echter Adler, aber nur (20cm). Kann in der Wohnung frei fliegen und ist sehr zutraulich.',
        'eagle-buy': 'Jetzt vorbestellen',
        'eagle-habitat': 'Zum passenden Habitat',
        'tiger-name': 'Mini-Tiger',
        'tiger-desc': 'Alle Eleganz eines Tigers in 20cm Größe. Liebevoll, verspielt und perfekt als Begleiter für gemütliche Abende.',
        'tiger-buy': 'Jetzt vorbestellen',
        'tiger-habitat': 'Zum passenden Habitat',
        'lion-name': 'Mini-Löwe',
        'lion-desc': 'Der König der Tiere in Miniaturformat. 20cm groß, mit einer bezaubernden Mini-Mähne und königlichem Charakter.',
        'lion-buy': 'Jetzt vorbestellen',
        'lion-habitat': 'Zum passenden Habitat',
        'habitats-title': 'Safari-Habitate für Zuhause',
        'for-elephant': 'Für Mini-Elefanten',
        'for-giraffe': 'Für Mini-Giraffen',
        'for-zebra': 'Für Mini-Zebras',
        'for-eagle': 'Für Mini-Adler',
        'for-tiger': 'Für Mini-Tiger',
        'for-lion': 'Für Mini-Löwen',
        'habitats-intro': 'Schaffen Sie die perfekte Umgebung für Ihre Mini-Wildtiere mit unseren maßgeschneiderten Habitat-Sets, komplett mit verkleinerten Pflanzen und natürlichen Elementen.',
        'habitat-elephant-name': 'Savannen-Elefanten-Habitat',
        'habitat-elephant-desc': 'Komplettes Wohnzimmer-Ökosystem für Ihren Mini-Elefanten mit Sandbecken, Mini-Akazien (25cm hoch) und Wasserspiel.',
        'elephant-feature1': '🌳 3x Mini-Akazien',
        'elephant-feature2': '🏖️ Sandbecken (60x40cm)',
        'elephant-feature3': '💧 Wasserspiel',
        'elephant-feature4': '🌾 Mini-Savannengras',
        'elephant-care-title': 'Pflegehinweise:',
        'elephant-care1': 'Sand alle 2 Wochen wechseln',
        'elephant-care2': 'Mini-Bäume täglich besprühen',
        'elephant-care3': 'Wasserspiel täglich reinigen',
        'habitat-giraffe-name': 'Akazien-Giraffen-Habitat',
        'habitat-giraffe-desc': 'Speziell für Mini-Giraffen entwickelt, mit extra hohen Mini-Akazien (25cm) zum Knabbern und weichem Savannenboden.',
        'giraffe-feature1': '🌳 5x Hohe Mini-Akazien',
        'giraffe-feature2': '🌿 Weicher Grasboden',
        'giraffe-feature3': '🪨 Dekorative Felsen',
        'giraffe-feature4': '☀️ LED-Savannenlicht',
        'giraffe-care-title': 'Pflegehinweise:',
        'giraffe-care1': 'Akazienblätter wöchentlich erneuern',
        'giraffe-care2': 'Grasboden monatlich austauschen',
        'giraffe-care3': 'LED-Licht 8-10h täglich',
        'habitat-zebra-name': 'Steppen-Zebra-Habitat',
        'habitat-zebra-desc': 'Weitläufige Mini-Steppe mit verschiedenen Grassorten, Wasserloch und Laufbereich für aktive Mini-Zebras.',
        'zebra-feature1': '🌾 Versch. Mini-Gräser',
        'zebra-feature2': '🏃 Laufbereich (80x50cm)',
        'zebra-feature3': '💧 Mini-Wasserloch',
        'zebra-feature4': '🌱 Selbstwachsende Samen',
        'zebra-care-title': 'Pflegehinweise:',
        'zebra-care1': 'Gräser regelmäßig gießen',
        'zebra-care2': 'Laufbereich täglich säubern',
        'zebra-care3': 'Alle 3 Monate neue Samen',
        'habitat-eagle-name': 'Gebirgs-Adler-Habitat',
        'habitat-eagle-desc': 'Vertikales Habitat mit Mini-Felsen, Nistplatz und Flugraum für Ihren Mini-Adler.',
        'eagle-feature1': '🏔️ Mini-Felswand (40cm hoch)',
        'eagle-feature2': '🪺 Komfortabler Nistplatz',
        'eagle-feature3': '🌪️ Luftzirkulation',
        'eagle-feature4': '🪶 Naturholz-Äste',
        'eagle-care-title': 'Pflegehinweise:',
        'eagle-care1': 'Nistplatz wöchentlich erneuern',
        'eagle-care2': 'Felsen monatlich reinigen',
        'eagle-care3': 'Äste nach Bedarf austauschen',
        'habitat-tiger-name': 'Dschungel-Tiger-Habitat',
        'habitat-tiger-desc': 'Tropisches Mini-Ökosystem mit Dschungelpflanzen, Versteckmöglichkeiten und Klettermöglichkeiten.',
        'tiger-feature1': '🌿 Mini-Dschungelpflanzen',
        'tiger-feature2': '🏠 Versteckhöhle',
        'tiger-feature3': '🌡️ Feuchtigkeitskontrolle',
        'tiger-feature4': '🪵 Kletteräste',
        'tiger-care-title': 'Pflegehinweise:',
        'tiger-care1': 'Pflanzen täglich besprühen',
        'tiger-care2': 'Luftfeuchtigkeit bei 60-70%',
        'tiger-care3': 'Höhle wöchentlich reinigen',
        'habitat-lion-name': 'Königreich-Löwen-Habitat',
        'habitat-lion-desc': 'Majestätisches Savannen-Königreich mit Felsplateaus, Sonnenterrasse und erhöhten Aussichtspunkten für Ihren Mini-Löwen.',
        'lion-feature1': '👑 Königlicher Felsenthron',
        'lion-feature2': '☀️ Beheizte Sonnenterrasse',
        'lion-feature3': '🌾 Goldenes Savannengras',
        'lion-feature4': '🏔️ Aussichtsplateaus',
        'lion-care-title': 'Pflegehinweise:',
        'lion-care1': 'Sonnenterrasse täglich reinigen',
        'lion-care2': 'Felsenthron wöchentlich polieren',
        'lion-care3': 'Savannengras alle 2 Wochen trimmen',
        'footer-contact': 'Projekt-Info',
        'footer-description': 'Ein fiktives Konzeptprojekt für ethisch entwickelte Mini-Wildtiere, das dieses Konzept greifbar macht.',
        'footer-hours': 'Öffnungszeiten',
        'hours-weekday': 'Montag - Freitag: 9:00 - 18:00',
        'hours-saturday': 'Samstag: 10:00 - 16:00',
        'hours-sunday': 'Sonntag: Geschlossen',
        'footer-legal': 'Rechtliches',
        'legal-imprint': 'Impressum',
        'legal-privacy': 'Datenschutz',
        'legal-terms': 'AGB',
        'legal-certificate': 'Tierschutz-Zertifikat',
        'footer-social': 'Folgen Sie uns',
        'copyright': '© 2025 MINIMALS GmbH. Alle Rechte vorbehalten. Safari-Feeling für Zuhause.',
        'disclaimer-title': 'Wichtiger Hinweis',
        'disclaimer-text': 'MINIMALS ist ein rein fiktives Konzeptprojekt. In diesem Projekt geht es darum, das Konzept „Minimals“ (verkleinerte Wildtiere als Haustiere) greifbar zu machen. Es steckt kein Unternehmen dahinter; diese Seite dient allein dazu, diese Vision erlebbar zu machen.'
    },
    en: {
        'nav-vision': 'Vision',
        'nav-animals': 'Animals',
        'nav-habitats': 'Habitats',
        'hero-title': 'Safari Feeling at Home',
        'hero-subtitle': 'Experience the magic of the wilderness in your living room with our ethically developed mini wildlife',
        'story-title': 'My Vision',
        'story-intro': 'When I first stood in the Serengeti and watched a herd of elephants in the evening sun, I was overwhelmed by the incredible beauty and majesty of these creatures.',
        'story-feeling': 'In that moment I thought to myself: This experience, this deep connection to nature and its wonderful creatures – I must bring this closer to all people. Everyone should have the opportunity to experience the beauty of creation and understand why these animals and their habitats must absolutely be preserved.',
        'story-science': 'That\'s exactly why I became a biotechnologist. Years of research and development have enabled us to create these wonderful miniature versions through ethical genetic engineering – perfect companions that bring the safari feeling directly into our homes without harming nature.',
        'story-impact': 'It is heartwarming to see how our concept works: Children who pet a mini elephant for the first time and develop respect for wildlife. City dwellers who come home after a stressful day and are greeted by their mini zebra. And particularly moving – residents in nursing homes whose eyes light up again when a mini giraffe gently nibbles on their hand.',
        'story-mission': 'MINIMALS is more than just a pet – it\'s a bridge between humans and nature, a way to honor the wilderness while making its beauty accessible to everyone.',
        'signature': '– Dr. Sarah Nakamura, Founder & Biotechnologist, MINIMALS',
        'testimonials-title': 'Customer Experiences',
        'category-child': 'Children',
        'testimonial-child': '"My mini elephant Peanut is my best friend! I watch him for hours in his secure glass vivarium. It\'s like having my own little zoo in my room!"',
        'author-child': '– Emma Schulze, 8 years old, Munich',
        'category-urban': 'City Dwellers',
        'testimonial-urban': '"After a 12-hour day, watching Zara run happily on the rug is the best stress relief. She has her large habitat on the desk, but loves the exercise."',
        'author-urban': '– Marcus Weber, 34, Berlin',
        'category-senior': 'Nursing Home Residents',
        'testimonial-senior': '"Lilly often stretches her neck out of her open-top habitat to greet me. This gentle interaction gives me so much joy every day."',
        'author-senior': '– Hildegard Schmidt, 78, Rose Garden Senior Home',
        'animals-title': 'Our Mini Wildlife',
        'elephant-name': 'Mini Elephant',
        'elephant-desc': 'Only 20cm tall, but with the full charm of a real elephant. Loves to wander through your living room and learn small tricks.',
        'elephant-buy': 'Pre-order Now',
        'elephant-habitat': 'To matching habitat',
        'giraffe-name': 'Mini Giraffe',
        'giraffe-desc': '20cm shoulder height, perfect for relaxing on your sofa and occasionally nibbling on houseplants.',
        'giraffe-buy': 'Pre-order Now',
        'giraffe-habitat': 'To matching habitat',
        'zebra-name': 'Mini Zebra',
        'zebra-desc': 'The perfect pet for those looking for something special. Energetic and playful, 20cm size.',
        'zebra-buy': 'Pre-order Now',
        'zebra-habitat': 'To matching habitat',
        'eagle-name': 'Mini Eagle',
        'eagle-desc': 'Majestic like a real eagle, but only (20cm). Can fly freely in apartments and is very tame.',
        'eagle-buy': 'Pre-order Now',
        'eagle-habitat': '🏔️ View matching habitat',
        'tiger-name': 'Mini Tiger',
        'tiger-desc': 'All the elegance of a tiger in 20cm size. Loving, playful and perfect as a companion for cozy evenings.',
        'tiger-buy': 'Pre-order Now',
        'tiger-habitat': '🌿 View matching habitat',
        'lion-name': 'Mini Lion',
        'lion-desc': 'The king of animals in miniature format. 20cm tall, with an enchanting mini mane and royal character.',
        'lion-buy': 'Pre-order Now',
        'lion-habitat': '🌾 View matching habitat',
        'habitats-title': 'Safari Habitats for Home',
        'for-elephant': 'For Mini Elephants',
        'for-giraffe': 'For Mini Giraffes',
        'for-zebra': 'For Mini Zebras',
        'for-eagle': 'For Mini Eagles',
        'for-tiger': 'For Mini Tigers',
        'for-lion': 'For Mini Lions',
        'habitats-intro': 'Create the perfect environment for your mini wildlife with our custom habitat sets, complete with miniaturized plants and natural elements.',
        'habitat-elephant-name': 'Savanna Elephant Habitat',
        'habitat-elephant-desc': 'Complete living room ecosystem for your mini elephant with sand basin, mini acacia trees (25cm tall) and water feature.',
        'elephant-feature1': '🌳 3x Mini Acacias',
        'elephant-feature2': '🏖️ Sand Basin (60x40cm)',
        'elephant-feature3': '💧 Water Feature',
        'elephant-feature4': '🌾 Mini Savanna Grass',
        'elephant-care-title': 'Care Instructions:',
        'elephant-care1': 'Change sand every 2 weeks',
        'elephant-care2': 'Spray mini trees daily',
        'elephant-care3': 'Clean water feature daily',
        'habitat-giraffe-name': 'Acacia Giraffe Habitat',
        'habitat-giraffe-desc': 'Specially designed for mini giraffes with extra tall mini acacias (25cm) for nibbling and soft savanna ground.',
        'giraffe-feature1': '🌳 5x Tall Mini Acacias',
        'giraffe-feature2': '🌿 Soft Grass Floor',
        'giraffe-feature3': '🪨 Decorative Rocks',
        'giraffe-feature4': '☀️ LED Savanna Light',
        'giraffe-care-title': 'Care Instructions:',
        'giraffe-care1': 'Renew acacia leaves weekly',
        'giraffe-care2': 'Replace grass floor monthly',
        'giraffe-care3': 'LED light 8-10 hours daily',
        'habitat-zebra-name': 'Steppe Zebra Habitat',
        'habitat-zebra-desc': 'Expansive mini steppe with various grasses, water hole and running area for active mini zebras.',
        'zebra-feature1': '🌾 Various Mini Grasses',
        'zebra-feature2': '🏃 Running Area (80x50cm)',
        'zebra-feature3': '💧 Mini Water Hole',
        'zebra-feature4': '🌱 Self-growing Seeds',
        'zebra-care-title': 'Care Instructions:',
        'zebra-care1': 'Water grasses regularly',
        'zebra-care2': 'Clean running area daily',
        'zebra-care3': 'New seeds every 3 months',
        'habitat-eagle-name': 'Mountain Eagle Habitat',
        'habitat-eagle-desc': 'Vertical habitat with mini rocks, nesting place and flight area for your mini eagle.',
        'eagle-feature1': '🏔️ Mini Rock Wall (40cm high)',
        'eagle-feature2': '🪺 Comfortable Nesting Place',
        'eagle-feature3': '🌪️ Air Circulation',
        'eagle-feature4': '🪶 Natural Wood Branches',
        'eagle-care-title': 'Care Instructions:',
        'eagle-care1': 'Renew nesting place weekly',
        'eagle-care2': 'Clean rocks monthly',
        'eagle-care3': 'Replace branches as needed',
        'habitat-tiger-name': 'Jungle Tiger Habitat',
        'habitat-tiger-desc': 'Tropical mini ecosystem with jungle plants, hiding places and climbing opportunities.',
        'tiger-feature1': '🌿 Mini Jungle Plants',
        'tiger-feature2': '🏠 Hiding Cave',
        'tiger-feature3': '🌡️ Humidity Control',
        'tiger-feature4': '🪵 Climbing Branches',
        'tiger-care-title': 'Care Instructions:',
        'tiger-care1': 'Spray plants daily',
        'tiger-care2': 'Humidity at 60-70%',
        'tiger-care3': 'Clean cave weekly',
        'habitat-lion-name': 'Kingdom Lion Habitat',
        'habitat-lion-desc': 'Majestic savanna kingdom with rock plateaus, sun terrace and elevated viewpoints for your mini lion.',
        'lion-feature1': '👑 Royal Rock Throne',
        'lion-feature2': '☀️ Heated Sun Terrace',
        'lion-feature3': '🌾 Golden Savanna Grass',
        'lion-feature4': '🏔️ Viewpoint Plateaus',
        'lion-care-title': 'Care Instructions:',
        'lion-care1': 'Clean sun terrace daily',
        'lion-care2': 'Polish rock throne weekly',
        'lion-care3': 'Trim savanna grass every 2 weeks',
        'footer-contact': 'Project Info',
        'footer-description': 'A fictional concept project for ethically developed mini-wildlife, making the concept tangible.',
        'footer-hours': 'Opening Hours',
        'hours-weekday': 'Monday - Friday: 9:00 - 18:00',
        'hours-saturday': 'Saturday: 10:00 - 16:00',
        'hours-sunday': 'Sunday: Closed',
        'footer-legal': 'Legal',
        'legal-imprint': 'Imprint',
        'legal-privacy': 'Privacy',
        'legal-terms': 'Terms',
        'legal-certificate': 'Animal Protection Certificate',
        'footer-social': 'Follow Us',
        'copyright': '© 2025 MINIMALS GmbH. All rights reserved. Safari feeling at home.',
        'disclaimer-title': 'Important Notice',
        'disclaimer-text': 'MINIMALS is a purely fictional concept project. This project is about making the "Minimals" concept (miniature wild animals as pets) tangible. There is no company behind it; this site exists solely to make this vision accessible.'
    }
};

function switchLanguage(lang) {
    currentLanguage = lang;

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === lang) {
            btn.classList.add('active');
        }
    });

    Object.keys(translationData[lang]).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = translationData[lang][key];
        }
    });
}

function initLanguage() {
    window.switchLanguage = switchLanguage;
}

function openModal(htmlContent) {
    const modal = document.getElementById('custom-modal');
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = htmlContent;
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('custom-modal');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

function initBuyButtons() {
    const modal = document.getElementById('custom-modal');
    const closeBtn = document.querySelector('.close-modal');

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('buy-button')) {
            const card = e.target.closest('.animal-card') || e.target.closest('.habitat-card');
            const name = card.querySelector('h3').textContent;
            const price = card.querySelector('.price').textContent;

            const modalHtml = currentLanguage === 'de'
                ? `<h2>🌟 Willkommen bei Minimals!</h2>
                   <p>Vielen Dank für Ihr Interesse an <strong>${name}</strong>.</p>
                   <p style="font-size: 2rem; color: #8B4513; margin: 20px 0;">${price}</p>
                   <p>Lieferzeit: 4-6 Wochen<br>Ethisch entwickelt & nachhaltig.</p>
                   <p style="font-size: 1rem; color: #666; margin-top: 30px;">Ein Mitarbeiter wird sich innerhalb von 24 Stunden bei Ihnen melden.</p>`
                : `<h2>🌟 Welcome to Minimals!</h2>
                   <p>Thank you for your interest in <strong>${name}</strong>.</p>
                   <p style="font-size: 2rem; color: #8B4513; margin: 20px 0;">${price}</p>
                   <p>Delivery time: 4-6 weeks<br>Ethically developed & sustainable.</p>
                   <p style="font-size: 1rem; color: #666; margin-top: 30px;">A team member will contact you within 24 hours.</p>`;

            openModal(modalHtml);
        }
    });
}

function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = (scrolled * 0.5) + 'px';
        }
    });
}

function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animal-card, .habitat-card, .testimonial-card').forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
}
