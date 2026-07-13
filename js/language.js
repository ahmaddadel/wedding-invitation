/**
 * Language System — Arabic / English
 * Saves preference in localStorage
 */

const translations = {
  ar: {
    loading: 'جاري التحميل...',
    navLogo: 'محمد 🤍 روضة',
    navHome: 'الرئيسية',
    navInvitation: 'الدعوة',
    navCountdown: 'العد التنازلي',
    navTimeline: 'الجدول',
    navGallery: 'المعرض',
    navLoveStory: 'قصة الحب',
    navRsvp: 'تأكيد الحضور',
    navWishes: 'التمنيات',
    navLocation: 'الموقع',
    groomName: 'محمد',
    brideName: 'روضة',
    coupleNames: 'محمد 🤍 روضة',
    monogramShort: 'م 🤍 ر',
    footerMonogram: 'محمد 🤍 روضة',
    pageTitle: 'محمد 🤍 روضة | دعوة زفاف',
    pageDescription: 'دعوة زفاف محمد 🤍 روضة — 27 أغسطس 2026',
    heroCardLabel: 'أنتم مدعوون لحضور ليلة الزفاف',
    heroSubtitle: 'يسرنا دعوتكم لمشاركتنا فرحتنا',
    heroBtn: 'عرض الدعوة',
    invitationTag: 'احفظوا التاريخ',
    invitationTitle: 'تفاصيل الدعوة',
    dateLabel: 'تاريخ الزفاف',
    weddingDate: 'الخميس، 27 أغسطس 2026',
    timeLabel: 'وقت الزفاف',
    weddingTime: '9:00 مساءً',
    venueLabel: 'المكان',
    venueName: 'قاعة ريفيرا',
    dressCodeLabel: 'اللباس',
    dressCode: 'رسمي / أنيق',
    specialMessage: 'نتشرف بدعوتكم لمشاركتنا أجمل لحظات حياتنا. حضوركم يضيء فرحتنا ويجعل يومنا لا يُنسى.',
    openMaps: 'فتح خرائط Google',
    addCalendar: 'إضافة للتقويم',
    shareInvite: 'مشاركة الدعوة',
    copyLink: 'نسخ رابط الدعوة',
    downloadInvite: 'تحميل الدعوة',
    countdownTag: 'العد التنازلي',
    countdownTitle: 'العد التنازلي',
    days: 'أيام',
    hours: 'ساعات',
    minutes: 'دقائق',
    seconds: 'ثواني',
    timelineTag: 'الجدول',
    timelineTitle: 'جدول اليوم',
    timeline1Title: 'بداية الأمسية',
    timeline1Desc: 'نرحب بكم بأجمل ابتسامة',
    timeline2Title: 'بداية الحفل',
    timeline2Desc: 'لحظة العمر تبدأ هنا',
    timeline3Title: 'الحلويات',
    timeline3Desc: 'حلويات لذيذة لأحبائنا',
    timeline4Title: 'الرقصة الأولى',
    timeline4Desc: 'أول رقصة كزوجين',
    timeline5Title: 'ختام الحفل',
    timeline5Desc: 'شكراً لحضوركم',
    galleryTag: 'ذكريات',
    galleryTitle: 'معرض الصور',
    loveStoryTag: 'قصتنا',
    loveStoryTitle: 'قصة الحب',
    story1Date: '2024',
    story1Title: 'اللقاء الأول',
    story1Desc: 'التقينا في يوم جميل، ومنذ ذلك الحين بدأت قصة لا تُنسى.',
    story2Date: '2025',
    story2Title: 'الخطوبة',
    story2Desc: 'قررنا أن نكمل حياتنا معاً، ووافقت روضة بابتسامة لا تُنسى.',
    story3Date: '2026',
    story3Title: 'الزفاف',
    story3Desc: 'اليوم الذي ننتظره لنبدأ فصلاً جديداً من حياتنا معاً.',
    rsvpTag: 'تأكيد الحضور',
    rsvpTitle: 'تأكيد الحضور',
    rsvpSubtitle: 'نود معرفة إذا كنتم ستشاركوننا فرحتنا',
    formName: 'الاسم',
    formPhone: 'رقم الهاتف',
    formGuests: 'عدد الضيوف',
    selectGuests: 'اختر العدد',
    formAttendance: 'الحضور',
    attendanceYes: 'سأحضر',
    attendanceNo: 'لن أتمكن',
    formFood: 'تفضيل الطعام',
    foodRegular: 'عادي',
    foodVegetarian: 'نباتي',
    foodVegan: 'نباتي صرف',
    foodAllergy: 'حساسية (اذكر في الرسالة)',
    formMessage: 'رسالة',
    formSubmit: 'إرسال',
    errorName: 'الرجاء إدخال الاسم',
    errorPhone: 'الرجاء إدخال رقم هاتف صحيح',
    errorGuests: 'الرجاء اختيار عدد الضيوف',
    errorAttendance: 'الرجاء تحديد حالة الحضور',
    rsvpSuccessTitle: 'شكراً لك!',
    rsvpSuccessMsg: 'تم استلام تأكيد حضورك بنجاح',
    wishesTag: 'تمنيات',
    wishesTitle: 'تمنياتكم',
    wishName: 'اسمك',
    wishText: 'تمنيتك',
    wishSubmit: 'إرسال التمنية',
    locationTag: 'المكان',
    locationTitle: 'الموقع',
    venueAddress: 'قاعة ريفيرا — مصر',
    openInMaps: 'فتح في الخرائط',
    copyAddress: 'نسخ العنوان',
    qrLabel: 'امسح للموقع',
    footerThanks: 'شكراً لكم',
    footerMade: 'Made with ❤️',
    toastCopied: 'تم النسخ!',
    toastShared: 'تمت المشاركة!',
    toastCalendar: 'تم إضافة الحدث للتقويم',
    toastDownload: 'تم تحميل الدعوة',
    toastWish: 'تم إرسال تمنيتك',
    toastError: 'حدث خطأ، حاول مرة أخرى',
    shareTitle: 'دعوة زفاف محمد 🤍 روضة',
    shareText: 'يسرنا دعوتكم لمشاركتنا فرحتنا',
    calendarTitle: 'زفاف محمد 🤍 روضة',
    calendarDesc: 'يسرنا دعوتكم لمشاركتنا فرحتنا',
    noWishes: 'كن أول من يكتب تمنية جميلة!',
    wishesLoading: 'جاري تحميل التمنيات...',
    wishesError: 'تعذر تحميل التمنيات. حاول مرة أخرى لاحقاً.',
    wishesNotConfigured: 'التمنيات المشتركة تحتاج إعداد Firebase. راجع ملف firebase-config.js',
    navHenna: 'ليلة الحنة',
    hennaTag: 'ليلة الحنة',
    hennaTitle: 'ليلة الحنة',
    hennaSubtitle: 'ليلة من الفرح والبهجة قبل ليلة الزفاف',
    hennaDate: 'الأربعاء، 26 أغسطس 2026',
    hennaTime: '8:00 مساءً',
    hennaVenue: 'قاعة ريفيرا',
    hennaDateLabel: 'تاريخ الحنة',
    hennaTimeLabel: 'وقت الحنة',
    hennaVenueLabel: 'المكان',
    hennaCountdownTitle: 'العد التنازلي لليلة الحنة',
    hennaDesc: 'انضموا إلينا في ليلة الحنة المميزة، ليلة مليئة بالموسيقى والرقص والاحتفال بالعروسين قبل يوم الزفاف.'
  },
  en: {
    loading: 'Loading...',
    navLogo: 'Mohammed 🤍 Rawdah',
    navHome: 'Home',
    navInvitation: 'Invitation',
    navCountdown: 'Countdown',
    navTimeline: 'Timeline',
    navGallery: 'Gallery',
    navLoveStory: 'Love Story',
    navRsvp: 'RSVP',
    navWishes: 'Wishes',
    navLocation: 'Location',
    groomName: 'Mohammed',
    brideName: 'Rawdah',
    coupleNames: 'Mohammed 🤍 Rawdah',
    monogramShort: 'M 🤍 R',
    footerMonogram: 'Mohammed 🤍 Rawdah',
    pageTitle: 'Mohammed 🤍 Rawdah | Wedding Invitation',
    pageDescription: 'Mohammed 🤍 Rawdah Wedding Invitation — August 27, 2026',
    heroCardLabel: "You're Invited to the Wedding Night",
    heroSubtitle: 'We joyfully invite you to share in our happiness',
    heroBtn: 'View Invitation',
    invitationTag: 'Save the Date',
    invitationTitle: 'Invitation Details',
    dateLabel: 'Wedding Date',
    weddingDate: 'Thursday, August 27, 2026',
    timeLabel: 'Wedding Time',
    weddingTime: '9:00 PM',
    venueLabel: 'Venue',
    venueName: 'Riviera Hall',
    dressCodeLabel: 'Dress Code',
    dressCode: 'Formal / Elegant',
    specialMessage: 'We are honored to invite you to share the most beautiful moments of our lives. Your presence will light up our joy and make our day unforgettable.',
    openMaps: 'Open Google Maps',
    addCalendar: 'Add to Calendar',
    shareInvite: 'Share Invitation',
    copyLink: 'Copy Invitation Link',
    downloadInvite: 'Download Invitation',
    countdownTag: 'Counting Down',
    countdownTitle: 'Countdown',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    timelineTag: 'Schedule',
    timelineTitle: 'Day Schedule',
    timeline1Title: 'Start of the Night',
    timeline1Desc: 'We welcome you with our warmest smiles',
    timeline2Title: 'Ceremony Begins',
    timeline2Desc: 'The moment of a lifetime starts here',
    timeline3Title: 'Dessert',
    timeline3Desc: 'Sweet treats for our loved ones',
    timeline4Title: 'First Dance',
    timeline4Desc: 'Our first dance as a couple',
    timeline5Title: 'Closing',
    timeline5Desc: 'Thank you for being with us',
    galleryTag: 'Memories',
    galleryTitle: 'Photo Gallery',
    loveStoryTag: 'Our Story',
    loveStoryTitle: 'Love Story',
    story1Date: '2024',
    story1Title: 'First Meeting',
    story1Desc: 'We met on a beautiful day, and since then an unforgettable story began.',
    story2Date: '2025',
    story2Title: 'Engagement',
    story2Desc: 'We decided to continue our lives together, and Rawdah said yes with an unforgettable smile.',
    story3Date: '2026',
    story3Title: 'The Wedding',
    story3Desc: 'The day we have been waiting for to start a new chapter together.',
    rsvpTag: 'RSVP',
    rsvpTitle: 'Confirm Attendance',
    rsvpSubtitle: 'We would love to know if you will join us',
    formName: 'Name',
    formPhone: 'Phone Number',
    formGuests: 'Number of Guests',
    selectGuests: 'Select count',
    formAttendance: 'Attendance',
    attendanceYes: 'I will attend',
    attendanceNo: 'Unable to attend',
    formFood: 'Food Preference',
    foodRegular: 'Regular',
    foodVegetarian: 'Vegetarian',
    foodVegan: 'Vegan',
    foodAllergy: 'Allergy (mention in message)',
    formMessage: 'Message',
    formSubmit: 'Submit',
    errorName: 'Please enter your name',
    errorPhone: 'Please enter a valid phone number',
    errorGuests: 'Please select number of guests',
    errorAttendance: 'Please select attendance status',
    rsvpSuccessTitle: 'Thank You!',
    rsvpSuccessMsg: 'Your RSVP has been received successfully',
    wishesTag: 'Wishes',
    wishesTitle: 'Your Wishes',
    wishName: 'Your Name',
    wishText: 'Your Wish',
    wishSubmit: 'Send Wish',
    locationTag: 'Venue',
    locationTitle: 'Location',
    venueAddress: 'Riviera Hall — Egypt',
    openInMaps: 'Open in Maps',
    copyAddress: 'Copy Address',
    qrLabel: 'Scan for location',
    footerThanks: 'Thank You',
    footerMade: 'Made with ❤️',
    toastCopied: 'Copied!',
    toastShared: 'Shared!',
    toastCalendar: 'Event added to calendar',
    toastDownload: 'Invitation downloaded',
    toastWish: 'Your wish has been sent',
    toastError: 'Something went wrong, please try again',
    shareTitle: 'Mohammed 🤍 Rawdah Wedding Invitation',
    shareText: 'We joyfully invite you to share in our happiness',
    calendarTitle: 'Mohammed 🤍 Rawdah Wedding',
    calendarDesc: 'We joyfully invite you to share in our happiness',
    noWishes: 'Be the first to write a beautiful wish!',
    wishesLoading: 'Loading wishes...',
    wishesError: 'Could not load wishes. Please try again later.',
    wishesNotConfigured: 'Shared wishes require Firebase setup. See firebase-config.js',
    navHenna: 'Henna Night',
    hennaTag: 'Henna Night',
    hennaTitle: 'Henna Night',
    hennaSubtitle: 'A night of joy and celebration before the wedding',
    hennaDate: 'Wednesday, August 26, 2026',
    hennaTime: '8:00 PM',
    hennaVenue: 'Riviera Hall',
    hennaDateLabel: 'Henna Date',
    hennaTimeLabel: 'Henna Time',
    hennaVenueLabel: 'Venue',
    hennaCountdownTitle: 'Henna Night Countdown',
    hennaDesc: 'Join us for a magical Henna Night, an evening filled with music, dancing, and celebration of the bride and groom before the big day.'
  }
};

const LanguageManager = {
  currentLang: 'en',

  init() {
    this.currentLang = localStorage.getItem('wedding-lang') || 'en';
    this.applyLanguage(this.currentLang);

    const toggle = document.getElementById('lang-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => this.toggle());
    }
  },

  toggle() {
    this.currentLang = this.currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('wedding-lang', this.currentLang);
    this.applyLanguage(this.currentLang);
  },

  applyLanguage(lang) {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('lang-en', lang === 'en');

    const label = document.getElementById('lang-label');
    if (label) label.textContent = lang === 'ar' ? 'EN' : 'AR';

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const key = el.getAttribute('data-i18n-alt');
      if (translations[lang][key]) {
        el.alt = translations[lang][key];
      }
    });

    if (translations[lang].pageTitle) {
      document.title = translations[lang].pageTitle;
    }

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && translations[lang].pageDescription) {
      metaDesc.setAttribute('content', translations[lang].pageDescription);
    }

    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  },

  t(key) {
    return translations[this.currentLang][key] || key;
  }
};

document.addEventListener('DOMContentLoaded', () => LanguageManager.init());
