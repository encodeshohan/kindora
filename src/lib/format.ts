// Event dates are stored as "YYYY-MM-DD"; parsing in UTC keeps the day from shifting.
export const formatEventDate = (date: string): string =>
    new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
    }).format(new Date(`${date}T00:00:00Z`));


// "Today" in Bangladesh time as YYYY-MM-DD. This must match the rule in kindora-server/index.js.
export const getToday = (): string =>
    new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dhaka" }).format(
        new Date(),
    );