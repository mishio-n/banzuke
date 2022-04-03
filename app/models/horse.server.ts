export type Horse = {
  name: string;
  owner: {
    name: string;
    colors?: string;
  };
  netkibaLink: string;
  gateNumber?: number;
};

export const getHorses = async (raceId: string): Promise<Horse[]> => {
  // const race = db.race.get()
  return [
    {
      name: "レッドジェネシス",
      owner: {
        name: "東京ホースレーシング",
      },
      netkibaLink: "https://db.netkeiba.com/horse/2018105343",
      gateNumber: 2,
    },
    {
      name: "ジャックドール",
      owner: {
        name: "前原敏行",
      },
      netkibaLink: "https://db.netkeiba.com/horse/2018100274",
      gateNumber: 4,
    },
    {
      name: "アカイイト",
      owner: {
        name: "岡浩二",
      },
      netkibaLink: "https://db.netkeiba.com/horse/2017106203",
      gateNumber: 5,
    },
    {
      name: "エフフォーリア",
      owner: {
        name: "キャロットファーム",
      },
      netkibaLink: "https://db.netkeiba.com/horse/2018105027",
      gateNumber: 6,
    },
    {
      name: "ポタジェ",
      owner: {
        name: "金子真人ホールディングス",
      },
      netkibaLink: "https://db.netkeiba.com/horse/2017105376",
      gateNumber: 8,
    },
    {
      name: "アリーヴォ",
      owner: {
        name: "シルクレーシング",
      },
      netkibaLink: "https://db.netkeiba.com/horse/2018104960",
      gateNumber: 9,
    },
    {
      name: "レイパパレ",
      owner: {
        name: "キャロットファーム",
      },
      netkibaLink: "https://db.netkeiba.com/horse/2017105335",
      gateNumber: 14,
    },
  ];
};
