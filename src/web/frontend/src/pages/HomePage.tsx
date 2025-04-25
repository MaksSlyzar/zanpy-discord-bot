import React from "react";
import "./HomePage.css";

const HomePage: React.FC = () => {
  return (
    <div className="raidbot-container">
      <header className="raidbot-header">
        <h1>Zanpy Albion Bot</h1>
        <p>
          Спеціалізований Discord-бот для гільдій Albion Online. Допомагає організовувати рейди, планувати івенти та керувати участю гравців.
        </p>
      </header>

      <section className="raidbot-features">
        <FeatureCard
          title="📅 Планування рейдів"
          description="Створи рейд, вкажи дату та час — гравці отримають повідомлення прямо в Discord."
        />
        <FeatureCard
          title="✅ Запис через реакції"
          description="Гравці обирають роль: танк, дамагер, сапорт. Усе через одну реакцію!"
        />
        <FeatureCard
          title="🛡️ Підтримка Albion ролей"
          description="Оптимізовано під Albion Online: компи, роли, локації, паті."
        />
        <FeatureCard
          title="📊 Статистика івентів"
          description="Отримуй звіти про активність гравців і кількість відвіданих рейдів."
        />
      </section>

      <div className="raidbot-buttons">
        <a href="https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&scope=bot" target="_blank">
          ➕ Запросити в Discord
        </a>
        <a href="https://discord.gg/YOUR_INVITE_LINK" target="_blank">
          🧾 Сервер підтримки
        </a>
      </div>

      <footer className="raidbot-footer">
        © 2025 Albion RaidCommander. Створено фанатом Albion Online 🇺🇦
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => (
  <div className="feature-card">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default HomePage;

