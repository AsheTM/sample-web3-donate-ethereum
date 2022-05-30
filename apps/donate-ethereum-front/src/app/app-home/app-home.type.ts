
export type TAppHomeDonation = {
  amount:       number | string; // Ether (ETH)
  description:  string;
  src:          string;
  alt?:         string;
};

export type TAppHomeDonationList = [
  TAppHomeDonation,
  ...Array<TAppHomeDonation>
];
