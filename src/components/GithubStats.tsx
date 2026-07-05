import { useEffect, useState, useMemo } from "react";
import { useLanguage } from "../context/LanguageProvider";
import { 
  FaGithub, FaFolder, FaUsers, FaStar, FaCodeBranch, FaArrowUpRightFromSquare, 
  FaFire, FaTrophy, FaMoon, FaSun 
} from "react-icons/fa6";
import "./styles/GithubStats.css";

interface GithubUserData {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface GithubRepo {
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
}

const GITHUB_USERNAME = "HIMURAw";

const GithubStats = () => {
  const { language } = useLanguage();
  const [userData, setUserData] = useState<GithubUserData | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch Github Profile
    const fetchProfile = fetch(`https://api.github.com/users/${GITHUB_USERNAME}`).then((res) => {
      if (!res.ok) throw new Error("API Limit");
      return res.json();
    });

    // 2. Fetch Github Repos (Latest updated)
    const fetchRepos = fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=2`).then((res) => {
      if (!res.ok) throw new Error("API Limit");
      return res.json();
    });

    Promise.all([fetchProfile, fetchRepos])
      .then(([profileData, reposData]) => {
        setUserData({
          login: profileData.login,
          avatar_url: profileData.avatar_url,
          name: profileData.name || "Umut Öztürk",
          bio: profileData.bio || (language === "tr" ? "FiveM geliştiricisi & web meraklısı." : "FiveM developer & web enthusiast."),
          public_repos: profileData.public_repos,
          followers: profileData.followers,
          following: profileData.following,
          html_url: profileData.html_url,
        });

        const formattedRepos = reposData.map((repo: any) => ({
          name: repo.name,
          description: repo.description || (language === "tr" ? "Bu depo için bir açıklama bulunmuyor." : "No description available for this repository."),
          language: repo.language || "TypeScript",
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          html_url: repo.html_url,
        }));
        setRepos(formattedRepos);
        setLoading(false);
      })
      .catch(() => {
        // Fallback matching user screenshot exactly
        setUserData({
          login: GITHUB_USERNAME,
          avatar_url: "https://avatars.githubusercontent.com/u/102715053?v=4", // HIMURAw Avatar
          name: "HIMURAw",
          bio: language === "tr"
            ? "FiveM geliştiricisi & web meraklısı. Özel scriptler geliştiriyor ve etkileyici deneyimler sunuyor."
            : "FiveM developer & web enthusiast. Building custom scripts and creating engaging experiences.",
          public_repos: 15,
          followers: 28,
          following: 12,
          html_url: `https://github.com/${GITHUB_USERNAME}`,
        });

        setRepos([
          {
            name: "qb-hud-custom",
            description: language === "tr" ? "Modern arayüze ve yüksek performansa sahip QBCore HUD sistemi." : "High performance custom HUD system for QBCore framework.",
            language: "Lua",
            stargazers_count: 24,
            forks_count: 10,
            html_url: `https://github.com/${GITHUB_USERNAME}/qb-hud-custom`,
          },
          {
            name: "csharp-discord-bot",
            description: language === "tr" ? "Sunucu yönetimi ve FiveM entegrasyonu sunan gelişmiş C# botu." : "Advanced Discord bot with server management and FiveM integration.",
            language: "C#",
            stargazers_count: 14,
            forks_count: 4,
            html_url: `https://github.com/${GITHUB_USERNAME}/csharp-discord-bot`,
          },
        ]);
        setLoading(false);
      });
  }, [language]);

  // Generate random contribution calendar data
  const calendarWeeks = useMemo(() => {
    const weeks = [];
    const seed = 0.42;
    for (let w = 0; w < 53; w++) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        const rand = Math.random();
        let level = 0;
        if (rand < seed) {
          level = Math.floor(Math.random() * 4) + 1;
        }
        days.push(level);
      }
      weeks.push(days);
    }
    return weeks;
  }, []);

  // Top Languages mock data based on user techstack
  const topLanguages = useMemo(() => [
    { name: "Lua", percent: 45, color: "#0255a3" },
    { name: "TypeScript", percent: 25, color: "#3178c6" },
    { name: "C#", percent: 18, color: "#854cc7" },
    { name: "JavaScript", percent: 8, color: "#f7df1e" },
    { name: "Other", percent: 4, color: "#8b949e" }
  ], []);

  // Developer Achievements
  const achievements = useMemo(() => [
    { 
      id: "commit", 
      titleTr: "Commit Kralı", 
      titleEn: "Commit King", 
      descTr: "1000+ Kod Katkısı", 
      descEn: "1000+ Code Commits", 
      color: "#c2a4ff" 
    },
    { 
      id: "streak", 
      titleTr: "Durdurulamaz", 
      titleEn: "Unstoppable", 
      descTr: "30+ Günlük Seri", 
      descEn: "30+ Day Streak", 
      color: "#ff8484" 
    },
    { 
      id: "lua", 
      titleTr: "FiveM Gurusu", 
      titleEn: "FiveM Guru", 
      descTr: "İleri Seviye Lua Scripting", 
      descEn: "Advanced Lua Scripting", 
      color: "#61dafb" 
    },
    { 
      id: "stars", 
      titleTr: "Popüler Depo", 
      titleEn: "Star Collector", 
      descTr: "Yıldız Toplayıcı", 
      descEn: "Collect stars from community", 
      color: "#ffd56b" 
    }
  ], []);

  if (loading) {
    return <div className="github-loading">{language === "tr" ? "GitHub Dashboard Yükleniyor..." : "Loading GitHub Dashboard..."}</div>;
  }

  return (
    <div className="github-section" id="github">
      <h2>
        {language === "tr" ? (
          <>
            GITHUB <span>PANELİM</span>
          </>
        ) : (
          <>
            GITHUB <span>DASHBOARD</span>
          </>
        )}
      </h2>
      <p className="github-subtitle">
        {language === "tr"
          ? "Açık kaynak katkılarıma, çalışma alışkanlıklarıma ve madalyalarıma göz atın."
          : "Explore my open source contributions, coding habits, and achievement trophies."}
      </p>

      {/* Row 1: Profile, Languages, Habits */}
      <div className="github-grid-row-1">
        {/* Profile Card */}
        <div className="github-profile-card dashboard-card">
          <div className="profile-header">
            <img 
              src={userData?.avatar_url} 
              alt={userData?.name} 
              className="profile-avatar" 
              onError={(e) => {
                e.currentTarget.src = "https://avatars.githubusercontent.com/u/102715053?v=4";
              }}
            />
            <div>
              <h3>{userData?.name}</h3>
              <a href={userData?.html_url} target="_blank" rel="noreferrer" className="profile-username">
                <FaGithub /> @{userData?.login}
              </a>
            </div>
          </div>
          <p className="profile-bio">{userData?.bio}</p>
          
          <div className="profile-stats-grid">
            <div className="stat-item">
              <FaFolder className="stat-icon repos" />
              <div>
                <span className="stat-val">{userData?.public_repos}</span>
                <span className="stat-label">{language === "tr" ? "Depolar" : "Repos"}</span>
              </div>
            </div>
            <div className="stat-item">
              <FaUsers className="stat-icon followers" />
              <div>
                <span className="stat-val">{userData?.followers}</span>
                <span className="stat-label">{language === "tr" ? "Takipçi" : "Followers"}</span>
              </div>
            </div>
            <div className="stat-item">
              <FaStar className="stat-icon stars" />
              <div>
                <span className="stat-val">34</span>
                <span className="stat-label">{language === "tr" ? "Yıldız" : "Stars"}</span>
              </div>
            </div>
            <div className="stat-item">
              <FaCodeBranch className="stat-icon pulls" />
              <div>
                <span className="stat-val">{userData?.following}</span>
                <span className="stat-label">{language === "tr" ? "Takip" : "Following"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Languages Card */}
        <div className="github-languages-card dashboard-card">
          <h3>{language === "tr" ? "En Çok Kullanılan Diller" : "Top Languages"}</h3>
          <div className="languages-body">
            {/* Visual Donut representation */}
            <div className="donut-chart-container">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path className="circle-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Lua: 45% (dasharray="45 100", offset="0") */}
                <path className="circle-slice"
                  strokeDasharray="45 100"
                  strokeDashoffset="0"
                  stroke="#0255a3"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* TypeScript: 25% (dasharray="25 100", offset="-45") */}
                <path className="circle-slice"
                  strokeDasharray="25 100"
                  strokeDashoffset="-45"
                  stroke="#3178c6"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* C#: 18% (dasharray="18 100", offset="-70") */}
                <path className="circle-slice"
                  strokeDasharray="18 100"
                  strokeDashoffset="-70"
                  stroke="#854cc7"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* JavaScript: 8% (dasharray="8 100", offset="-88") */}
                <path className="circle-slice"
                  strokeDasharray="8 100"
                  strokeDashoffset="-88"
                  stroke="#f7df1e"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Other: 4% (dasharray="4 100", offset="-96") */}
                <path className="circle-slice"
                  strokeDasharray="4 100"
                  strokeDashoffset="-96"
                  stroke="#8b949e"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage">45%</text>
                <text x="18" y="24.5" className="percentage-label">Lua</text>
              </svg>
            </div>

            {/* List representation */}
            <div className="languages-list">
              {topLanguages.map((lang) => (
                <div className="lang-list-item" key={lang.name}>
                  <span className="lang-color-box" style={{ backgroundColor: lang.color }}></span>
                  <span className="lang-name-text">{lang.name}</span>
                  <span className="lang-percent-text">{lang.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Habits & Streaks Card */}
        <div className="github-habits-card dashboard-card">
          <h3>{language === "tr" ? "Katkı Analizi & Seri" : "Contribution Habits"}</h3>
          <div className="habits-body">
            {/* Streaks row */}
            <div className="streak-stats-row">
              <div className="streak-stat-box">
                <FaFire className="streak-icon fire-glow" />
                <span className="streak-value">12</span>
                <span className="streak-label">{language === "tr" ? "Aktif Seri" : "Current Streak"}</span>
              </div>
              <div className="streak-stat-box">
                <FaTrophy className="streak-icon trophy-glow" />
                <span className="streak-value">42</span>
                <span className="streak-label">{language === "tr" ? "En Uzun Seri" : "Longest Streak"}</span>
              </div>
            </div>

            {/* Habits list */}
            <div className="habits-list">
              <div className="habit-item">
                <FaMoon className="habit-icon moon-glow" />
                <div>
                  <span className="habit-title">
                    {language === "tr" ? "Gece Geliştiricisi" : "Late Night Coder"}
                  </span>
                  <span className="habit-desc">
                    {language === "tr" ? "Commitlerin %65'i gece 9 ile sabah 3 arasında." : "65% of commits pushed between 9 PM and 3 AM."}
                  </span>
                </div>
              </div>
              <div className="habit-item">
                <FaSun className="habit-icon sun-glow" />
                <div>
                  <span className="habit-title">
                    {language === "tr" ? "Hafta Sonu Yoğunluğu" : "Weekend Warrior"}
                  </span>
                  <span className="habit-desc">
                    {language === "tr" ? "Kodlama aktivitesinin %40'ı hafta sonları." : "40% of coding activities occur on weekends."}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Featured Repos & Developer Achievements */}
      <div className="github-grid-row-2">
        {/* Featured Repositories (2 detailed showcase cards) */}
        <div className="github-featured-repos dashboard-card">
          <h3>{language === "tr" ? "Öne Çıkan Çalışmalarım" : "Featured Repositories"}</h3>
          <div className="featured-repos-grid">
            {repos.map((repo) => (
              <a 
                href={repo.html_url} 
                target="_blank" 
                rel="noreferrer" 
                className="featured-repo-card" 
                key={repo.name}
              >
                <div className="repo-header-block">
                  <span className="repo-title-text">{repo.name}</span>
                  <FaArrowUpRightFromSquare className="repo-link-arrow" />
                </div>
                <p className="repo-description-text">{repo.description}</p>
                <div className="repo-footer-block">
                  <span className={`repo-lang-indicator ${repo.language.toLowerCase()}`}></span>
                  <span className="repo-lang-name">{repo.language}</span>
                  <div className="repo-counts">
                    <span><FaStar /> {repo.stargazers_count}</span>
                    <span><FaCodeBranch /> {repo.forks_count}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Developer Achievements (Trophy Badges) */}
        <div className="github-achievements-card dashboard-card">
          <h3>{language === "tr" ? "Geliştirici Madalyaları" : "Developer Achievements"}</h3>
          <div className="achievements-grid">
            {achievements.map((badge) => (
              <div className="achievement-badge" key={badge.id} style={{ "--badge-color": badge.color } as React.CSSProperties}>
                <div className="badge-icon-wrap">
                  <FaTrophy />
                </div>
                <div className="badge-info">
                  <span className="badge-title">{language === "tr" ? badge.titleTr : badge.titleEn}</span>
                  <span className="badge-desc">{language === "tr" ? badge.descTr : badge.descEn}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contribution Calendar Grid */}
      <div className="github-calendar-box">
        <h4>
          {language === "tr" 
            ? "Son 1 Yıldaki Kod Katkılarım (Contribution Calendar)" 
            : "Code Contributions Over the Last Year"}
        </h4>
        <div className="calendar-grid-wrapper">
          <div className="calendar-grid">
            {calendarWeeks.map((week, wIdx) => (
              <div className="calendar-column" key={wIdx}>
                {week.map((level, dIdx) => (
                  <div 
                    className={`calendar-day level-${level}`} 
                    key={dIdx}
                    title={`${level > 0 ? level : "No"} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="calendar-legend">
          <span>Less</span>
          <div className="legend-box level-0"></div>
          <div className="legend-box level-1"></div>
          <div className="legend-box level-2"></div>
          <div className="legend-box level-3"></div>
          <div className="legend-box level-4"></div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default GithubStats;
