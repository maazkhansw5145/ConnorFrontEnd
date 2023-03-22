export const CheckPremium = (bought_at) => {
  const storedDate = new Date(bought_at);
  const currentDate = new Date();
  const differenceMs = currentDate.getTime() - storedDate.getTime();
  const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
  const daysLeft = 30 - differenceDays;
  console.log(daysLeft)
  return daysLeft > 0;
};
