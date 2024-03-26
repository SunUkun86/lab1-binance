document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");
    const homeTab = document.getElementById("home-tab");
    const cryptoTab = document.getElementById("crypto-tab");
    const newsTab = document.getElementById("news-tab");
    const aboutTab = document.getElementById("about-tab");
  
    const showHome = () => {
      content.innerHTML = `
        <h1>Ласкаво просимо!</h1>
        <p>Це простий сайт для відображення курсів криптовалют з біржі Binance.</p>
        <p>Виберіть вкладку, щоб переглянути більше інформації.</p>
      `;
      setActiveTab(homeTab);
    };
  
    const showCrypto = () => {
      content.innerHTML = `
        <h1>Курси Криптовалют з Binance</h1>
        <div id="cryptoList"></div>
      `;
      setActiveTab(cryptoTab);
      getCryptoPrices();
    };
  
    const showNews = () => {
      content.innerHTML = `
        <h1>Останні новини</h1>
        <p>Тут буде відображено останні новини про криптовалюти.</p>
      `;
      setActiveTab(newsTab);
    };
  
    const showAbout = () => {
      content.innerHTML = `
        <h1>Про нас</h1>
        <p>Ми команда, що створила цей сайт для вашої зручності.</p>
      `;
      setActiveTab(aboutTab);
    };
  
    const setActiveTab = (tab) => {
      const tabs = [homeTab, cryptoTab, newsTab, aboutTab];
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    };
  
    homeTab.addEventListener("click", showHome);
    cryptoTab.addEventListener("click", showCrypto);
    newsTab.addEventListener("click", showNews);
    aboutTab.addEventListener("click", showAbout);
  
    const getCryptoPrices = async () => {
      const cryptoList = document.getElementById("cryptoList");
  
      try {
        const response = await fetch(
          "https://api.binance.com/api/v3/ticker/price"
        );
        const data = await response.json();
  
        cryptoList.innerHTML = "";
  
        data.forEach((crypto) => {
          const cryptoItem = document.createElement("div");
          cryptoItem.classList.add("crypto-item");
  
          const cryptoName = document.createElement("div");
          cryptoName.classList.add("crypto-name");
          cryptoName.textContent = crypto.symbol;
  
          const cryptoPrice = document.createElement("div");
          cryptoPrice.classList.add("crypto-price");
          cryptoPrice.textContent = `$${crypto.price}`;
  
          if (crypto.priceChange < 0) {
            cryptoPrice.classList.add("crypto-price-negative");
          }
  
          cryptoItem.appendChild(cryptoName);
          cryptoItem.appendChild(cryptoPrice);
          cryptoList.appendChild(cryptoItem);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    showHome(); // Показуємо головну сторінку при завантаженні
  });
  