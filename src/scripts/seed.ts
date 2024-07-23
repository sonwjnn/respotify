import * as schema from '@/db/schema'
import { neon } from '@neondatabase/serverless'
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/neon-http'
import { v4 as uuidv4 } from 'uuid'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql, { schema })

const main = async () => {
  try {
    console.log('Seeding database...')

    const userId = '4073b79d-2c78-4d67-9124-f8e1e60770d5'

    await db.delete(schema.playlistSongs)
    await db.delete(schema.songs)
    await db.delete(schema.playlists)
    await db.delete(schema.likedPlaylists)
    await db.delete(schema.likedSongs)
    await db.delete(schema.subscriptions)

    const songsIds = Array.from({ length: 13 }, () => uuidv4())

    await db.insert(schema.songs).values([
      {
        id: songsIds[1],
        title: 'Dacing With Your Ghost',
        author: 'Sasha Alex Sloan',
        userId,
        imagePath: '/sounds/dancing-with-your-ghost/sasha-alex-sloan.jpg',
        songPath: '/sounds/dancing-with-your-ghost/Dancing-With-Your-Ghost.mp3',
        duration: Math.ceil(197732.4375),
        createdAt: new Date(),
      },
      {
        id: songsIds[2],
        title: 'Head In The Clouds',
        author: 'Hayd',
        userId,
        imagePath: '/sounds/head-in-the-cloud/hayd.jpg',
        songPath: '/sounds/head-in-the-cloud/head-in-the-cloud-Hayd.mp3',
        duration: Math.ceil(184559.0625),
        createdAt: new Date(),
      },
      {
        id: songsIds[3],
        title: 'Falling',
        author: 'Harry Styles',
        userId,
        imagePath: '/sounds/falling/harry-styles.jpg',
        songPath: '/sounds/falling/falling.mp3',
        duration: Math.ceil(240133.333333333),
        createdAt: new Date(),
      },
      {
        id: songsIds[4],
        title: 'I Love U 3000 II',
        author: '88rising',
        userId,
        imagePath: '/sounds/i-love-u-3000-2/88rising.jpg',
        songPath: '/sounds/i-love-u-3000-2/i-love-u-3000-2.mp3',
        duration: Math.ceil(209642.583333333),
        createdAt: new Date(),
      },
      {
        id: songsIds[5],
        title: 'You Are The Reason',
        author: 'Alex Porat',
        userId,
        imagePath: '/sounds/You-Are-The-Reason/Alex-Porat.jpg',
        songPath: '/sounds/You-Are-The-Reason/You-Are-The-Reason.mp3',
        duration: Math.ceil(203288),
        createdAt: new Date(),
      },
      {
        id: songsIds[6],
        title: 'Killing Me Softly',
        author: 'Joseph Vincent',
        userId,
        imagePath: '/sounds/killing-me-softly/Joseph-Vincent.jpg',
        songPath:
          '/sounds/killing-me-softly/Joseph-Vincent - Killing-Me-Softly.mp3',
        duration: Math.ceil(165703.125),
        createdAt: new Date(),
      },
      {
        id: songsIds[7],
        title: "Can't Help Falling In Love",
        author: 'Alyssa Baker',
        userId,
        imagePath: '/sounds/Cant-Help-Falling-in-Love/Alyssa-Baker.jpg',
        songPath:
          '/sounds/Cant-Help-Falling-in-Love/Cant-Help-Falling-in-Love.mp3',
        duration: Math.ceil(217130.854166667),
        createdAt: new Date(),
      },
      {
        id: songsIds[8],
        title: 'Hero',
        author: 'Cash Cash feat. Christina Perri',
        userId,
        imagePath: '/sounds/hero/hero.jpg',
        songPath: '/sounds/hero/Cash Cash - Hero (feat. Christina Perri).mp3',
        duration: Math.ceil(197852.479166667),
        createdAt: new Date(),
      },
      {
        id: songsIds[9],
        title: 'Like My Father',
        author: 'Jax',
        userId,
        imagePath: '/sounds/like_my_father/likemyfather.jpg',
        songPath: '/sounds/like_my_father/Jax - Like My Father.mp3',
        duration: Math.ceil(183428.5625),
        createdAt: new Date(),
      },
      {
        id: songsIds[10],
        title: 'Diamonds',
        author: 'Rihanna',
        userId,
        imagePath: '/sounds/diamonds/rihanna.jpg',
        songPath: '/sounds/diamonds/Rihanna-Diamonds-Album-Version.mp3',
        duration: Math.ceil(225163.895833333),
        createdAt: new Date(),
      },
      {
        id: songsIds[11],
        title: 'Rainy Days',
        author: 'Alf Wardhana',
        userId,
        imagePath: '/sounds/rainy-days/Alf-Wardhana.jpg',
        songPath: '/sounds/rainy-days/Rainy-Days.mp3',
        duration: 218000,
        createdAt: new Date(),
      },
      {
        id: songsIds[12],
        title: 'Virgo',
        author: 'Jadu Jadu',
        userId,
        imagePath: '/sounds/virgo-jadu-jadu/jadu-jadu.jpg',
        songPath: '/sounds/virgo-jadu-jadu/virgo.mp3',
        duration: 61000,
        createdAt: new Date(),
      },
    ])

    const playlistId = uuidv4()

    await db.insert(schema.playlists).values([
      {
        id: playlistId,
        title: 'Nhạc tiếng anh chill nhẹ',
        description: 'Playlist cho ielts 8.0',
        bgColor: '#e3a882',
        userId,
        createdAt: new Date(),
      },
    ])

    await db.insert(schema.playlistSongs).values([
      {
        playlistId,
        songId: songsIds[1],
        createdAt: new Date(),
      },
      {
        playlistId,
        songId: songsIds[2],
        createdAt: new Date(),
      },
      {
        playlistId,
        songId: songsIds[3],
        createdAt: new Date(),
      },
      {
        playlistId,
        songId: songsIds[4],
        createdAt: new Date(),
      },
      {
        playlistId,
        songId: songsIds[5],
        createdAt: new Date(),
      },
      {
        playlistId,
        songId: songsIds[6],
        createdAt: new Date(),
      },
      {
        playlistId,
        songId: songsIds[7],
        createdAt: new Date(),
      },
      {
        playlistId,
        songId: songsIds[8],
        createdAt: new Date(),
      },
      {
        playlistId,
        songId: songsIds[9],
        createdAt: new Date(),
      },
      {
        playlistId,
        songId: songsIds[10],
        createdAt: new Date(),
      },
      {
        playlistId,
        songId: songsIds[11],
        createdAt: new Date(),
      },
      {
        playlistId,
        songId: songsIds[12],
        createdAt: new Date(),
      },
    ])

    console.log('Seeding completed successfully')
  } catch (error) {
    console.error(error)
    throw new Error('Failed to seed database')
  }
}

main()
