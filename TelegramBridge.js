// TelegramBridge.js

function sendDataToUnity() {
    if (window.Telegram && window.Telegram.WebApp) {
        const user = window.Telegram.WebApp.initDataUnsafe.user;
        if (user) {
            // Формируем JSON-данные
            const jsonData = JSON.stringify({
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                language_code: user.language_code,
                is_premium: user.is_premium || false, // Если поле отсутствует, используем значение по умолчанию
                allows_write_to_pm: user.allows_write_to_pm || false
            });

            // Передаем данные в Unity
            SendMessage('GameManager', 'OnTelegramDataReceived', jsonData);
        } else {
            console.error("User data not available.");
        }
    } else {
        console.error("Telegram Web App API not found.");
    }
}

// Вызов функции при загрузке
window.onload = sendDataToUnity;