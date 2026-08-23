export async function onRequest(context) {
    // Ссылка на твой профиль из репозитория WCA
    const wcaUrl = "https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/refs/heads/v1/persons/2024BERE02.json";

    try {
        const response = await fetch(wcaUrl);
        const data = await response.json();
        const clockSingle = data.rank.singles.find(item => item.eventId === "clock");
        const clockAverage = data.rank.averages.find(item => item.eventId === "clock");
        // Выбираем только то, что реально нужно для сайта
        const stats = {
            name: data.name,
            competitions: data.numberOfCompetitions,
            gold: data.medals.gold,
            silver: data.medals.silver,
            bronze: data.medals.bronze,
            country: data.country,
            single: clockSingle ? clockSingle.best : null,
            average: clockAverage ? clockAverage.best : null
        };

        // Отдаем чистый JSON на фронтенд
        return new Response(JSON.stringify(stats), {
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Не удалось получить данные WCA" }), {
            status: 500,
            headers: { "Content-Type": "application/json;charset=UTF-8" }
        });
    }
}
