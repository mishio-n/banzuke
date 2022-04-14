import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const main = async () => {
  // Owner
  const owner1 = await prisma.owner.create({
    data: {
      name: '社台レースホース',
      colors:
        'https://horse-racing-colors.s3.ap-northeast-1.amazonaws.com/shadai-rh.svg',
    },
  });

  // Horse
  const horse1 = await prisma.horse.create({
    data: {
      id: '2018104541',
      name: 'プログノーシス',
      genderCategory: 'MALE',
      link: 'https://db.netkeiba.com/horse/2018104541/',
      birthYear: 2018,
      sire: 'ディープインパクト',
      bloodmare: 'ヴェルダ',
      owner: {
        connect: {
          id: owner1.id,
        },
      },
      stable: {
        create: {
          name: '中内田充',
          region: 'RITTO',
        },
      },
    },
  });

  console.log(owner1);
  console.log(horse1);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
