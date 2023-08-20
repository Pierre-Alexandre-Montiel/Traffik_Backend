import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    email: 'jon.agostini+stylist@gmail.com',
	user_type:'Stylist',
	password:'12345',
	user_status: 'Active',
	phone: '3104029428'
  },
  {
    email: 'jon.agostini+brand@gmail.com',
	user_type:'Brand',
	password:'12345',
	user_status: 'Active',
	phone: '3104029428'
  },
  {
    email: 'jon.agostini+traffik@gmail.com',
	user_type:'Stylist',
	password:'12345',
	user_status: 'Active',
	phone: '3104029428'
  },
  {
    email: 'jon.agostini+talent@gmail.com',
	user_type:'Talent',
	password:'12345',
	user_status: 'Inactive',
	phone: '3104029428'
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
