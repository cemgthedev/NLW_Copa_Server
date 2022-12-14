import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            email: "john.doe@gmail.com",
            avatarUrl: "https://github.com/diego3g.png"
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Exampli Pool',
            code: 'mdl123',
            ownerId: user.id,
        
            participants: {
                create: {
                    userId: user.id,
                }
            }
        }
    })
    
    await prisma.game.create({
        data: {
            date: '2022-11-02T12:00:00.201Z',
            firstTimeCountryCode: 'DE',
            secondTimeCountryCode: 'BR'
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-02T12:00:00.201Z',
            firstTimeCountryCode: 'BR',
            secondTimeCountryCode: 'AR',

            guesses: {
                create: {
                    firstTimePoints: 2,
                    secondTimePoints: 1,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })
}

main();