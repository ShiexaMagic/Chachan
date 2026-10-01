// Shared helpers for portfolio.html and talent.html.
// Profiles live in talents/talents.json — see talents/README.md for the format.
(function () {
    const LANG_KEY = 'shuqi_lang';

    const STRINGS = {
        ka: {
            home: 'მთავარი',
            portfolio: 'პორტფოლიო',
            back: 'პორტფოლიო',
            subtitle: 'მსახიობების მონაცემთა ბაზა',
            searchPlaceholder: 'სახელით ძებნა...',
            allGenders: 'ყველა სქესი',
            male: 'მამრობითი',
            female: 'მდედრობითი',
            allAges: 'ყველა ასაკი',
            under18: '18-მდე',
            yearsOld: 'წლის',
            cm: 'სმ',
            kg: 'კგ',
            video: 'ვიდეო',
            noResults: 'შესაბამისი პროფილი არ მოიძებნა',
            comingSoon: 'პროფილები მალე დაემატება',
            loadError: 'მონაცემების ჩატვირთვა ვერ მოხერხდა. სცადეთ გვერდის განახლება.',
            loading: 'იტვირთება...',
            actor: 'მსახიობი',
            age: 'ასაკი',
            gender: 'სქესი',
            height: 'სიმაღლე',
            weight: 'წონა',
            eyeColor: 'თვალის ფერი',
            hairColor: 'თმის ფერი',
            city: 'ქალაქი',
            languages: 'ენები',
            personal: 'პირადი მონაცემები',
            appearance: 'გარეგნობა',
            overview: 'მიმოხილვა',
            bio: 'ბიოგრაფია',
            education: 'განათლება',
            skills: 'უნარები',
            photos: 'ფოტოები',
            photoGallery: 'ფოტო გალერეა',
            showreel: 'შოურილი',
            showreels: 'შოურილი / ვიდეოები',
            cv: 'CV',
            cvTitle: 'CV / გამოცდილება',
            downloadCv: 'CV-ის ჩამოტვირთვა',
            contact: 'კონტაქტი',
            contactBtn: 'დაუკავშირდი',
            email: 'ელფოსტა',
            phone: 'ტელეფონი',
            agency: 'წარმომადგენელი',
            notFoundTitle: 'პროფილი ვერ მოიძებნა',
            notFoundText: 'სამწუხაროდ, მოთხოვნილი გვერდი არ არსებობს.',
            backToPortfolio: '← პორტფოლიოში დაბრუნება',
            rights: 'ყველა უფლება დაცულია.',
            close: 'დახურვა',
            prev: 'წინა',
            next: 'შემდეგი'
        },
        en: {
            home: 'Home',
            portfolio: 'Portfolio',
            back: 'Portfolio',
            subtitle: 'Actor Database',
            searchPlaceholder: 'Search by name...',
            allGenders: 'All genders',
            male: 'Male',
            female: 'Female',
            allAges: 'All ages',
            under18: 'Under 18',
            yearsOld: 'y.o.',
            cm: 'cm',
            kg: 'kg',
            video: 'Video',
            noResults: 'No matching profiles found',
            comingSoon: 'Profiles coming soon',
            loadError: 'Could not load profiles. Please refresh the page.',
            loading: 'Loading...',
            actor: 'Actor',
            age: 'Age',
            gender: 'Gender',
            height: 'Height',
            weight: 'Weight',
            eyeColor: 'Eye color',
            hairColor: 'Hair color',
            city: 'City',
            languages: 'Languages',
            personal: 'Personal details',
            appearance: 'Appearance',
            overview: 'Overview',
            bio: 'Biography',
            education: 'Education',
            skills: 'Skills',
            photos: 'Photos',
            photoGallery: 'Photo gallery',
            showreel: 'Showreel',
            showreels: 'Showreels / Videos',
            cv: 'CV',
            cvTitle: 'CV / Experience',
            downloadCv: 'Download CV',
            contact: 'Contact',
            contactBtn: 'Get in touch',
            email: 'Email',
            phone: 'Phone',
            agency: 'Representation',
            notFoundTitle: 'Profile not found',
            notFoundText: 'Sorry, the page you requested does not exist.',
            backToPortfolio: '← Back to portfolio',
            rights: 'All rights reserved.',
            close: 'Close',
            prev: 'Previous',
            next: 'Next'
        }
    };

    function getLang() {
        try {
            const saved = localStorage.getItem(LANG_KEY);
            if (saved === 'ka' || saved === 'en') return saved;
        } catch (e) { /* storage blocked */ }
        return 'ka';
    }

    function setLang(lang) {
        try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* storage blocked */ }
        document.documentElement.lang = lang;
    }

    function str(key, lang) {
        return STRINGS[lang][key] || STRINGS.ka[key] || key;
    }

    // Fields may be a plain string/array or a { ka, en } object.
    function localized(value, lang) {
        if (value == null) return '';
        if (typeof value === 'object' && !Array.isArray(value)) {
            return value[lang] || value.ka || value.en || '';
        }
        return value;
    }

    function list(value, lang) {
        const v = localized(value, lang);
        if (Array.isArray(v)) return v.map(s => String(s).trim()).filter(Boolean);
        return v ? String(v).split(',').map(s => s.trim()).filter(Boolean) : [];
    }

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // Only allow relative paths and http(s)/mailto/tel links into href/src.
    function safeUrl(url) {
        const u = String(url || '').trim();
        if (/^(https?:|mailto:|tel:)/i.test(u)) return u;
        if (/^[a-z][a-z0-9+.-]*:/i.test(u)) return '';
        return u;
    }

    // birthDate/birthYear keep the age current; a fixed "age" is accepted as a fallback.
    function getAge(talent) {
        const born = /^(\d{4})-(\d{2})-(\d{2})$/.exec(talent.birthDate || '');
        if (born) {
            const now = new Date();
            let age = now.getFullYear() - Number(born[1]);
            const month = now.getMonth() + 1;
            if (month < Number(born[2]) || (month === Number(born[2]) && now.getDate() < Number(born[3]))) age--;
            return age;
        }
        if (talent.birthYear) return new Date().getFullYear() - Number(talent.birthYear);
        const age = parseInt(talent.age, 10);
        return isNaN(age) ? null : age;
    }

    function getYouTubeId(url) {
        const match = String(url || '').match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|v\/))([\w-]{11})/);
        return match ? match[1] : null;
    }

    function getVimeoId(url) {
        const match = String(url || '').match(/vimeo\.com\/(?:video\/)?(\d+)/);
        return match ? match[1] : null;
    }

    function isVideoFile(url) {
        return /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(String(url || ''));
    }

    function videoEmbedHtml(url) {
        const yt = getYouTubeId(url);
        if (yt) {
            return `<iframe src="https://www.youtube.com/embed/${yt}" title="YouTube video" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
        }
        const vimeo = getVimeoId(url);
        if (vimeo) {
            return `<iframe src="https://player.vimeo.com/video/${vimeo}" title="Vimeo video" allow="fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
        }
        if (isVideoFile(url)) {
            return `<video src="${escapeHtml(safeUrl(url))}" controls preload="metadata" playsinline></video>`;
        }
        return '';
    }

    function getPhotos(talent) {
        return (talent.photos || []).map(safeUrl).filter(Boolean);
    }

    function getVideos(talent) {
        return (talent.videos || []).filter(url => videoEmbedHtml(url));
    }

    function getSlug(talent) {
        return talent.slug;
    }

    let cache = null;
    function loadTalents() {
        if (!cache) {
            cache = fetch('talents/talents.json', { cache: 'no-cache' })
                .then(res => {
                    if (!res.ok) throw new Error('HTTP ' + res.status);
                    return res.json();
                })
                .then(data => (Array.isArray(data) ? data : []).filter(t => t && t.slug && t.name));
        }
        return cache;
    }

    window.ShuqiTalents = {
        STRINGS, getLang, setLang, str, localized, list, escapeHtml, safeUrl,
        getAge, videoEmbedHtml, getPhotos, getVideos, getSlug, loadTalents,
        placeholderPhoto: './images/web.png'
    };
})();
