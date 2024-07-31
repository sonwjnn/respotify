import { getGenerateImages } from '@/data/images'
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

    await db.delete(schema.likedPlaylists)
    await db.delete(schema.likedSongs)
    await db.delete(schema.playlistSongs)
    await db.delete(schema.songs)
    await db.delete(schema.playlists)
    await db.delete(schema.subscriptions)

    const duplicateCount = 8

    const songs = [
      {
        title: 'Dacing With Your Ghost',
        author: 'Sasha Alex Sloan',
        userId,
        imagePath: '/sounds/dancing-with-your-ghost/sasha-alex-sloan.jpg',
        songPath: '/sounds/dancing-with-your-ghost/Dancing-With-Your-Ghost.mp3',
        duration: Math.ceil(197732.4375),
        createdAt: new Date(),
      },
      {
        title: 'Head In The Clouds',
        author: 'Hayd',
        userId,
        imagePath: '/sounds/head-in-the-cloud/hayd.jpg',
        songPath: '/sounds/head-in-the-cloud/head-in-the-cloud-Hayd.mp3',
        duration: Math.ceil(184559.0625),
        createdAt: new Date(),
      },
      {
        title: 'Falling',
        author: 'Harry Styles',
        userId,
        imagePath: '/sounds/falling/harry-styles.jpg',
        songPath: '/sounds/falling/falling.mp3',
        duration: Math.ceil(240133.333333333),
        createdAt: new Date(),
      },
      {
        title: 'I Love U 3000 II',
        author: '88rising',
        userId,
        imagePath: '/sounds/i-love-u-3000-2/88rising.jpg',
        songPath: '/sounds/i-love-u-3000-2/i-love-u-3000-2.mp3',
        duration: Math.ceil(209642.583333333),
        createdAt: new Date(),
      },
      {
        title: 'You Are The Reason',
        author: 'Alex Porat',
        userId,
        imagePath: '/sounds/You-Are-The-Reason/Alex-Porat.jpg',
        songPath: '/sounds/You-Are-The-Reason/You-Are-The-Reason.mp3',
        duration: Math.ceil(203288),
        createdAt: new Date(),
      },
      {
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
        title: 'Hero',
        author: 'Cash Cash feat. Christina Perri',
        userId,
        imagePath: '/sounds/hero/hero.jpg',
        songPath: '/sounds/hero/Cash Cash - Hero (feat. Christina Perri).mp3',
        duration: Math.ceil(197852.479166667),
        createdAt: new Date(),
      },
      {
        title: 'Like My Father',
        author: 'Jax',
        userId,
        imagePath: '/sounds/like_my_father/likemyfather.jpg',
        songPath: '/sounds/like_my_father/Jax - Like My Father.mp3',
        duration: Math.ceil(183428.5625),
        createdAt: new Date(),
      },
      {
        title: 'Diamonds',
        author: 'Rihanna',
        userId,
        imagePath: '/sounds/diamonds/rihanna.jpg',
        songPath: '/sounds/diamonds/Rihanna-Diamonds-Album-Version.mp3',
        duration: Math.ceil(225163.895833333),
        createdAt: new Date(),
      },
      {
        title: 'Rainy Days',
        author: 'Alf Wardhana',
        userId,
        imagePath: '/sounds/rainy-days/Alf-Wardhana.jpg',
        songPath: '/sounds/rainy-days/Rainy-Days.mp3',
        duration: 218000,
        createdAt: new Date(),
      },
      {
        title: 'Virgo',
        author: 'Jadu Jadu',
        userId,
        imagePath: '/sounds/virgo-jadu-jadu/jadu-jadu.jpg',
        songPath: '/sounds/virgo-jadu-jadu/virgo.mp3',
        duration: 61000,
        createdAt: new Date(),
      },
    ]

    const songsIds = Array.from({ length: songs.length * duplicateCount }, () =>
      uuidv4()
    )

    const duplicateArray = (array: any[], times: number) => {
      return Array.from({ length: times }).flatMap((_, i) =>
        array.map((item, index) => {
          const position = index + i * array.length

          return {
            ...item,
            id: songsIds[position],
          }
        })
      )
    }

    await db.insert(schema.songs).values(duplicateArray(songs, duplicateCount))

    const playlistIds = Array.from({ length: 11 }, () => uuidv4())

    const playlistImages = await getGenerateImages({
      count: 11,
    })

    await db.insert(schema.playlists).values([
      {
        id: playlistIds[1],
        title: 'English playlist',
        description: 'A collection of English songs for IELTS 8.0',
        imagePath: playlistImages[1].urls.thumb,
        bgColor: '#9ca3af',
        userId,
        createdAt: new Date(),
      },
      {
        id: playlistIds[2],
        title: 'Chill Vibes',
        description: 'A collection of chill vibes for relaxation.',
        imagePath: playlistImages[2].urls.thumb,
        bgColor: '#271819',
        userId,
        createdAt: new Date(),
      },
      {
        id: playlistIds[3],
        title: 'Workout Mix',
        description: 'Energetic tracks to boost your workout.',
        imagePath: playlistImages[3].urls.thumb,
        bgColor: '#3f3eba',
        userId,
        createdAt: new Date(),
      },
      {
        id: playlistIds[4],
        title: 'Morning Coffee',
        description: 'Perfect tunes to start your day with a cup of coffee.',
        imagePath: playlistImages[4].urls.thumb,
        bgColor: '#bd151b',
        userId,
        createdAt: new Date(),
      },
      {
        id: playlistIds[5],
        title: 'Late Night Study',
        description: 'Quiet and calm music for late night study sessions.',
        imagePath: playlistImages[5].urls.thumb,
        bgColor: '#525252',
        userId,
        createdAt: new Date(),
      },
      {
        id: playlistIds[6],
        title: 'Road Trip',
        description: 'Best tracks for long drives and road trips.',
        imagePath: playlistImages[6].urls.thumb,
        bgColor: '#65a30d',
        userId,
        createdAt: new Date(),
      },
      {
        id: playlistIds[7],
        title: 'Weekend Relax',
        description: 'Relaxing music to unwind on the weekends.',
        imagePath: playlistImages[7].urls.thumb,
        bgColor: '#16a34a',
        userId,
        createdAt: new Date(),
      },
      {
        id: playlistIds[8],
        title: 'Party Hits',
        description: 'Top hits to get the party started.',
        imagePath: playlistImages[8].urls.thumb,
        bgColor: '#0ea5e9',
        userId,
        createdAt: new Date(),
      },
      {
        id: playlistIds[9],
        title: 'Golden Oldies',
        description: 'A collection of timeless classics.',
        imagePath: playlistImages[9].urls.thumb,
        bgColor: '#db2777',
        userId,
        createdAt: new Date(),
      },
      {
        id: playlistIds[10],
        title: 'Top Charts',
        description: 'The most popular songs right now.',
        imagePath: playlistImages[10].urls.thumb,
        bgColor: '#7c3aed',
        userId,
        createdAt: new Date(),
      },
    ])

    await db.insert(schema.playlistSongs).values([
      {
        playlistId: playlistIds[1],
        songId: songsIds[1],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[1],
        songId: songsIds[2],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[1],

        songId: songsIds[3],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[1],
        songId: songsIds[4],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[1],

        songId: songsIds[5],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[1],
        songId: songsIds[6],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[1],

        songId: songsIds[7],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[1],
        songId: songsIds[8],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[1],
        songId: songsIds[9],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[1],
        songId: songsIds[10],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[1],
        songId: songsIds[11],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[1],
        songId: songsIds[12],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[2],
        songId: songsIds[1],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[2],
        songId: songsIds[2],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[2],

        songId: songsIds[3],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[2],
        songId: songsIds[4],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[2],

        songId: songsIds[5],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[2],
        songId: songsIds[6],
        createdAt: new Date(),
      },

      {
        playlistId: playlistIds[3],

        songId: songsIds[7],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[3],
        songId: songsIds[8],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[3],
        songId: songsIds[9],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[3],
        songId: songsIds[10],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[3],
        songId: songsIds[11],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[3],
        songId: songsIds[12],
        createdAt: new Date(),
      },

      {
        playlistId: playlistIds[4],

        songId: songsIds[3],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[4],
        songId: songsIds[4],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[4],

        songId: songsIds[5],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[4],
        songId: songsIds[6],
        createdAt: new Date(),
      },

      {
        playlistId: playlistIds[4],

        songId: songsIds[7],
        createdAt: new Date(),
      },

      {
        playlistId: playlistIds[5],
        songId: songsIds[2],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[5],

        songId: songsIds[3],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[5],
        songId: songsIds[4],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[6],

        songId: songsIds[5],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[6],
        songId: songsIds[6],
        createdAt: new Date(),
      },

      {
        playlistId: playlistIds[6],

        songId: songsIds[7],
        createdAt: new Date(),
      },

      {
        playlistId: playlistIds[6],
        songId: songsIds[2],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[6],

        songId: songsIds[3],
        createdAt: new Date(),
      },
      {
        playlistId: playlistIds[6],
        songId: songsIds[4],
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
