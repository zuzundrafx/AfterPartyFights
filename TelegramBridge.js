// TelegramBridge.js

if (typeof window.Telegram === 'undefined') {
    console.warn("Telegram Web App API not found. Using mock data.");
    window.Telegram = {
        WebApp: {
            initDataUnsafe: {
                user: {
                    id: 123456789,
                    first_name: "John",
                    last_name: "Doe",
                    username: "johndoe",
                    language_code: "en",
                    is_premium: true,
                    allows_write_to_pm: true
                }
            }
        }
    };
}

function sendDataToUnity() {
    console.log("sendDataToUnity called");

    if (window.Telegram && window.Telegram.WebApp) {
        console.log("Telegram Web App API found");

        const user = window.Telegram.WebApp.initDataUnsafe.user;
        if (user) {
            console.log("User data found:", user);

            const jsonData = JSON.stringify({
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                language_code: user.language_code,
                is_premium: user.is_premium || false,
                allows_write_to_pm: user.allows_write_to_pm || false
            });

            console.log("Sending data to Unity:", jsonData);

            // Передаем данные в Unity
            SendMessage('GameManager', 'OnTelegramDataReceived', jsonData);
        } else {
            console.error("User data not available.");
        }
    } else {
        console.error("Telegram Web App API not found.");
    }
}

window.onload = sendDataToUnity;