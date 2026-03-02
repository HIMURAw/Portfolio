import { projects as initialProjects } from "../../data/projects";
import { certificates as initialCertificates } from "../../data/certificates";

// Initial fake messages and analytics since they don't exist in src/data
const initialMessages = [
    {
        key: '1',
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'İş Teklifi',
        message: 'Merhaba, portfolyonuzu çok beğendim. Sizinle çalışmak isteriz.',
        date: '2024-03-01',
        read: false
    },
    {
        key: '2',
        name: 'Jane Smith',
        email: 'jane@smith.io',
        subject: 'Soru',
        message: 'PX-Guard sistemi hakkında teknik bilgi alabilir miyim?',
        date: '2024-03-02',
        read: true
    }
];

const initialAnalytics = {
    totalVisitors: 1245,
    projectViews: 3840,
    messageRate: 3.2
};

// Helper to get data from localStorage or fallback to defaults
const getStoredData = (key, fallback) => {
    const stored = localStorage.getItem(key);
    if (!stored) return fallback;
    try {
        return JSON.parse(stored);
    } catch (e) {
        return fallback;
    }
};

// Data Service
export const dataService = {
    // Projects
    getProjects: () => getStoredData('admin_projects', initialProjects.map((p, i) => ({
        ...p,
        key: p.id || `p-${i}`,
        name: p.title, // Mapping title to name for UI consistency
        technologies: p.techs || ["React"], // Defaulting if missing
        featured: p.featured || false
    }))),
    saveProjects: (data) => localStorage.setItem('admin_projects', JSON.stringify(data)),

    // Certificates
    getCertificates: () => getStoredData('admin_certificates', initialCertificates.map((c, i) => ({
        ...c,
        key: c.id || `c-${i}`,
        name: c.title,
        organization: c.issuer,
        date: c.date
    }))),
    saveCertificates: (data) => localStorage.setItem('admin_certificates', JSON.stringify(data)),

    // Messages
    getMessages: () => getStoredData('admin_messages', initialMessages),
    saveMessages: (data) => localStorage.setItem('admin_messages', JSON.stringify(data)),

    // Analytics
    getAnalytics: () => getStoredData('admin_analytics', initialAnalytics),
    saveAnalytics: (data) => localStorage.setItem('admin_analytics', JSON.stringify(data))
};
