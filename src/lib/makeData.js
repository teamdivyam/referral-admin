const names = [
    "Adesh Singh",
    "Joe Rogan",
    "Mike Tyson",
    "William Dofoe",
    "Sans Peterson",
    "Mahtab",
    "Jack Deep",
    "Lex Friedman",
    "Raj Shiman",
    "Winky Chappel",
];

const PACKAGE_PRICE = 85000;
const COMMISSION_PERC = 10;

function GenerateAgentData() {
    this.name = names[Math.ceil(Math.random() * names.length - 1)];
    this.phone = "9555582404";
    this.totalReferrals = Math.ceil(Math.random() * 100);
    this.totalOrders = Math.ceil(Math.random() * this.totalReferrals);
    this.totalCommissionEarned = (PACKAGE_PRICE / COMMISSION_PERC) * this.totalOrders ;
    this.pendingCommission = 12400;
    this.pendingWithdrawal = 8400;
    this.status = "active";
    this.joined = "24 Jan; 2025";
}

export const makeData = (quantity) => {
    const data = [];
    for (let i = 0; i < quantity; i++) {
        const newData = new GenerateAgentData();
        data.push(newData);
    }
    return data;
};

